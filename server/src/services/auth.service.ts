import bcrypt from 'bcrypt';
import status from 'http-status';

import SECURITY_CONSTANTS from '../constants/security.constant';
import HttpError from '../errors/http.error';
import { LoginRequest, LoginResponse, loginSchema } from '../models/auth.model';
import AuthRepository from '../repositories/auth.repository';
import UserRepository from '../repositories/user.repository';
import JWT from '../utils/jwt';
import Validation from '../utils/validate';

export default class AuthService {
    static async login(request: LoginRequest): Promise<LoginResponse> {
        const { username, password } = Validation.validate(loginSchema, request);

        const user = await UserRepository.findUserByUsername(username);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new HttpError(status.UNAUTHORIZED, 'Invalid credentials');
        }

        const accessToken = JWT.generateAccessToken(user.id);
        const refreshToken = JWT.generateRefreshToken(user.id);
        const refreshTokenHashed = await bcrypt.hash(refreshToken, SECURITY_CONSTANTS.SALT_ROUNDS);

        await AuthRepository.storeRefreshToken(refreshTokenHashed, user.id);

        return {
            accessToken,
            refreshToken,
        };
    }

    static generateAccessToken(userId: string): string {
        return JWT.generateAccessToken(userId);
    }

    static async verifyRefreshToken(token: string): Promise<string | null> {
        try {
            const decoded = JWT.verifyRefreshToken(token);
            const storedToken = await AuthRepository.findRefreshTokenByUserId(decoded.userId);

            return storedToken ? ((await bcrypt.compare(token, storedToken.token)) ? decoded.userId : null) : null;
        } catch (error) {
            return null;
        }
    }

    static async renewRefreshToken(oldToken: string, userId: string): Promise<string> {
        if (!oldToken || !userId) {
            throw new Error('Invalid refresh token');
        }

        const verifiedUserId = await AuthService.verifyRefreshToken(oldToken);
        if (!verifiedUserId || verifiedUserId !== userId) {
            throw new Error('Invalid refresh token');
        }

        try {
            const newRefreshToken = JWT.generateRefreshToken(userId);
            const newRefreshTokenHashed = await bcrypt.hash(newRefreshToken, SECURITY_CONSTANTS.SALT_ROUNDS);

            await AuthRepository.replaceRefreshToken(newRefreshTokenHashed, userId);

            return newRefreshToken;
        } catch (error) {
            throw new Error('Failed to renew refresh token');
        }
    }
}

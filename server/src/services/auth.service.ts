import { compareSync } from 'bcrypt';
import status from 'http-status';

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
        if (!user || !compareSync(password, user.password)) {
            throw new HttpError(status.UNAUTHORIZED, 'Invalid credentials');
        }

        const accessToken = JWT.generateAccessToken(user.id);
        const refreshToken = JWT.generateRefreshToken(user.id);

        await AuthRepository.storeRefreshToken(refreshToken, user.id);

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
            const storedToken = await AuthRepository.findRefreshToken(token);

            return storedToken && storedToken.userId === decoded.userId ? decoded.userId : null;
        } catch (error) {
            return null;
        }
    }

    static async renewRefreshToken(oldToken: string, userId: string): Promise<string> {
        const newRefreshToken = JWT.generateRefreshToken(userId);
        await AuthRepository.replaceRefreshToken(oldToken, newRefreshToken, userId);

        return newRefreshToken;
    }
}

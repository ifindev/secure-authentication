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
    const loginRequest = Validation.validate(loginSchema, request);

    const user = await UserRepository.findUserByUsername(loginRequest.username);
    if (!user || !compareSync(loginRequest.password, user.password)) {
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
}

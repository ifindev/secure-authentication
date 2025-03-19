import { refreshTokens } from '../db/db';
import configs from '../utils/configs';

export default class AuthRepository {
  static async storeRefreshToken(token: string, userId: string) {
    refreshTokens.push({
      token,
      userId,
      expiresAt: new Date(Date.now() + configs.refreshTokenExpiration),
    });
  }
}

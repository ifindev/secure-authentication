import { refreshTokens } from '../db/db';
import configs from '../utils/configs';
import { delay } from '../utils/time';

export default class AuthRepository {
  static async storeRefreshToken(token: string, userId: string) {
    await delay(200); // Simulate 200ms database latency

    refreshTokens.push({
      token,
      userId,
      expiresAt: new Date(Date.now() + configs.refreshTokenExpiration),
    });
  }
}

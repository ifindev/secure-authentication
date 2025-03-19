import db, { RefreshToken } from '../db/db';
import configs from '../utils/configs';
import { delay } from '../utils/time';

export default class AuthRepository {
    private static generateExpirationDate(expirationMs: number = configs.refreshTokenExpiration) {
        return new Date(Date.now() + expirationMs);
    }

    static async findRefreshToken(token: string): Promise<RefreshToken | null> {
        await delay(100); // Simulate 100ms database latency
        return db.refreshTokens.find((rt) => rt.token === token) || null;
    }

    static async storeRefreshToken(token: string, userId: string): Promise<void> {
        await delay(100);

        db.refreshTokens.push({
            token,
            userId,
            expiresAt: AuthRepository.generateExpirationDate(),
        });
    }

    static async replaceRefreshToken(oldToken: string, newToken: string, userId: string): Promise<void> {
        await delay(100);

        const index = db.refreshTokens.findIndex((rt) => rt.token === oldToken);
        if (index === -1) {
            console.warn(`Token not found for replacement: ${oldToken}`);
            return;
        }

        db.refreshTokens.splice(index, 1);
        db.refreshTokens.push({
            token: newToken,
            userId,
            expiresAt: AuthRepository.generateExpirationDate(),
        });
    }
}

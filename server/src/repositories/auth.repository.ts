import db, { RefreshToken } from '../db/db';
import configs from '../utils/configs';
import { delay } from '../utils/time';

export default class AuthRepository {
    private static generateExpirationDate(expirationMs: number = configs.refreshTokenExpiration) {
        return new Date(Date.now() + expirationMs);
    }

    static async findRefreshTokenByUserId(userId: string): Promise<RefreshToken | null> {
        // Simulate 100ms database latency
        await delay(100);

        const storedToken = db.refreshTokens.find((rt) => {
            return rt.userId === userId;
        });

        return storedToken || null;
    }

    static async storeRefreshToken(token: string, userId: string): Promise<void> {
        await delay(100);

        db.refreshTokens.push({
            token,
            userId,
            expiresAt: AuthRepository.generateExpirationDate(),
        });
    }

    static async replaceRefreshToken(newHashedToken: string, userId: string): Promise<void> {
        await delay(100);

        const index = db.refreshTokens.findIndex((rt) => {
            return rt.userId === userId;
        });

        if (index === -1) {
            throw new Error('Token not found');
        }

        db.refreshTokens.splice(index, 1);

        db.refreshTokens.push({
            token: newHashedToken,
            userId,
            expiresAt: AuthRepository.generateExpirationDate(),
        });
    }
}

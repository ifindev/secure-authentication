import jwt from 'jsonwebtoken';
import ms from 'ms';

import configs from './configs';

export default class JWT {
    private static generateToken = (userId: string, secret: string, expiresIn: number | ms.StringValue) => {
        return jwt.sign({ userId }, secret, { expiresIn, algorithm: 'HS256' });
    };

    private static verifyToken = (token: string, secret: string) => {
        return jwt.verify(token, secret) as { userId: string };
    };

    static generateAccessToken = (userId: string) => {
        return JWT.generateToken(userId, configs.accessTokenSecret, '15m');
    };

    static generateRefreshToken = (userId: string) => {
        return JWT.generateToken(userId, configs.refreshTokenSecret, '4h');
    };

    static verifyAccessToken = (token: string) => {
        return JWT.verifyToken(token, configs.accessTokenSecret);
    };

    static verifyRefreshToken = (token: string) => {
        return JWT.verifyToken(token, configs.refreshTokenSecret);
    };
}

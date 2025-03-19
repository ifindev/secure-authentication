import db from '../db/db';
import { omitPassword } from '../utils/helpers';
import { delay } from '../utils/time';

export default class UserRepository {
    static async findUserByUsername(username: string) {
        await delay(100); // Simulate 200ms database latency
        return db.users.find((user) => user.username === username) || null;
    }

    static async findUserByUserId(userId: string) {
        await delay(100);
        const user = db.users.find((user) => user.id === userId);
        return user ? omitPassword(user) : null;
    }
}

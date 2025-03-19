import db from '../db/db';
import { delay } from '../utils/time';

export default class UserRepository {
  static async findUserByUsername(username: string) {
    await delay(100); // Simulate 200ms database latency
    return db.users.find((user) => user.username === username) || null;
  }
}

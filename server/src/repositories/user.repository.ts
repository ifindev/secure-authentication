import { users } from '../db/db';
import { delay } from '../utils/time';

export default class UserRepository {
  static async findUserByUsername(username: string) {
    await delay(200); // Simulate 200ms database latency
    return users.find((user) => user.username === username) || null;
  }
}

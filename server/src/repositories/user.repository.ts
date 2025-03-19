import { users } from '../db/db';

export default class UserRepository {
  static async findUserByUsername(username: string) {
    return users.find((user) => user.username === username) || null;
  }
}

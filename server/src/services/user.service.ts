import { GetUserProfileResponse } from '../models/user.model';
import UserRepository from '../repositories/user.repository';

export default class UserService {
    static async getUserProfile(userId: string): Promise<GetUserProfileResponse | null> {
        return UserRepository.findUserByUserId(userId);
    }
}

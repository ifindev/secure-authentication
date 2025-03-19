import { User } from '../db/db';

export type GetUserProfileResponse = Pick<User, 'id' | 'username' | 'email' | 'firstName' | 'lastName'>;

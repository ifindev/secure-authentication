import httpClient from '../clients/http/http.client';
import { IHttpClient } from '../clients/http/http.client.interface';

export type UserProfile = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export function userRepositoryImpl(http: IHttpClient) {
    const getProfile = async (): Promise<UserProfile> => {
        return http.get<UserProfile>('users/profile');
    };

    return {
        getProfile,
    };
}

const userRepository = userRepositoryImpl(httpClient);
export default userRepository;

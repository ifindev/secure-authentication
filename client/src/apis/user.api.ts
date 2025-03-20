import envConfig from '../configs/env/env.config';

export type UserProfile = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export const getUserProfile = async (accessToken: string): Promise<UserProfile> => {
    const response = await fetch(`${envConfig.apiUrl}/users/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) throw new Error('Failed fetching user profile');
    return (await response.json()) as UserProfile;
};

import envConfig from '../configs/env/env.config';

export type UserProfile = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export const getUserProfile = async (accessToken: string): Promise<UserProfile> => {
    try {
        const response = await fetch(`${envConfig.apiUrl}/users/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed fetching user profile');
        }

        return data as UserProfile;
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : 'An unknown error occurred while fetching profile',
        );
    }
};

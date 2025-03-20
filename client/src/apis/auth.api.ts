import envConfig from '../configs/env/env.config';

export type LoginReq = {
    username: string;
    password: string;
};
export type LoginRes = {
    accessToken: string;
};

export type RefreshTokenRes = {
    accessToken: string;
};

export const login = async ({ username, password }: LoginReq): Promise<LoginRes> => {
    try {
        const response = await fetch(`${envConfig.apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors || 'Login failed');
        }

        return data as LoginRes;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
};

export const refreshToken = async (): Promise<RefreshTokenRes> => {
    try {
        const response = await fetch(`${envConfig.apiUrl}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors || 'Refresh token failed');
        }

        return data as RefreshTokenRes;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : 'An unknown error occurred during refresh',
        );
    }
};

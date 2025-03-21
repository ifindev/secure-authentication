import httpClient from '../clients/http/http.client';
import { IAuthHttpClient } from '../clients/http/http.client.interface';

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

export function authRepositoryImpl(http: IAuthHttpClient) {
    const login = async (req: LoginReq): Promise<LoginRes> => {
        return http.post<LoginRes>('auth/login', req, { credentials: 'include' });
    };

    const refreshToken = async (): Promise<RefreshTokenRes> => {
        return http.refreshToken();
    };

    const logout = async (): Promise<void> => {
        return http.logout();
    };

    return {
        login,
        logout,
        refreshToken,
    };
}

const authRepository = authRepositoryImpl(httpClient);
export default authRepository;

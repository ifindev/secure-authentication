import httpClient from '../clients/http/http.client';
import IHttpClient from '../clients/http/http.client.interface';

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

function creaAuthRepository(http: IHttpClient) {
    const login = async (req: LoginReq): Promise<LoginRes> => {
        return http.post<LoginRes>('auth/login', req, { credentials: 'include' });
    };

    const refreshToken = async (): Promise<RefreshTokenRes> => {
        return http.post<RefreshTokenRes>('auth/refresh', undefined, {
            credentials: 'include',
        });
    };

    return {
        login,
        refreshToken,
    };
}

const authRepository = creaAuthRepository(httpClient);
export default authRepository;

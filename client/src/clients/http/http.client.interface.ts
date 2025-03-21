export interface IHttpClient {
    delete<T>(url: string, config?: object): Promise<T>;
    get<T>(url: string, config?: object): Promise<T>;
    patch<T>(url: string, data?: object, config?: object): Promise<T>;
    post<T>(url: string, data?: object, config?: object): Promise<T>;
    put<T>(url: string, data?: object, config?: object): Promise<T>;
}


export interface IAuthHttpClient extends IHttpClient {
    logout(): Promise<void>;
    refreshToken(): Promise<{accessToken: string }>;
}
import envConfig from '../../configs/env/env.config';
import authStore from '../../stores/auth.store';
import userStore from '../../stores/user.store';
import BasicHttpClient from './basic-http.client';
import { IAuthHttpClient } from './http.client.interface';

interface HttpError extends Error {
    status?: number;
    errors?: string | Record<string, string>;
}

interface QueueItem {
    resolve: (value: unknown) => void;
    reject: (error: HttpError) => void;
    url: string;
    config: RequestInit;
}

export class HttpClient extends BasicHttpClient implements IAuthHttpClient {
    private isRefreshing = false;
    private failedQueue: QueueItem[] = [];
    private readonly REFRESH_TIMEOUT = 10000;

    constructor() {
        super();
        this.updateConfig({ baseUrl: envConfig.apiUrl });
    }

    protected getDefaultHeaders(): Record<string, string> {
        const baseHeader = super.getDefaultHeaders();
        return {
            ...baseHeader,
            ...(authStore.state.accessToken
                ? { Authorization: `Bearer ${authStore.state.accessToken}` }
                : {}),
        };
    }

    protected getDefaultConfig(): RequestInit {
        return { credentials: 'include' };
    }

    async refreshToken(): Promise<{ accessToken: string }> {
        return this.post<{ accessToken: string }>('auth/refresh-token');
    }

    async logout(): Promise<void> {
        return this.post('auth/logout');
    }

    private clearStores(): void {
        authStore.actions.clearToken();
        userStore.actions.clearUser();
    }

    private async handleLogout(): Promise<void> {
        try {
            await this.logout();
        } finally {
            const logoutError = new Error('User logged out') as HttpError;
            logoutError.status = 401;
            this.rejectQueue(logoutError);
            this.clearStores();
        }
    }

    private async handleTokenRefresh(): Promise<string> {
        const refreshPromise = this.refreshToken();
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Refresh timed out')), this.REFRESH_TIMEOUT),
        );

        const { accessToken } = await Promise.race([refreshPromise, timeoutPromise]);
        authStore.actions.setToken(accessToken);
        return accessToken;
    }

    private async processQueue(): Promise<void> {
        for (const { resolve, reject, url, config } of this.failedQueue) {
            try {
                const result = await super.makeRequest(url, config);
                resolve(result);
            } catch (error) {
                reject(error as HttpError);
            }
        }
        this.failedQueue = [];
    }

    private rejectQueue(error: HttpError): void {
        this.failedQueue.forEach(({ reject }) => reject(error));
        this.failedQueue = [];
    }

    protected async makeRequest<T>(url: string, config: RequestInit): Promise<T> {
        const mergedConfig = { ...this.getDefaultConfig(), ...config };
        try {
            return await super.makeRequest<T>(url, mergedConfig);
        } catch (error: unknown) {
            const httpError = error as HttpError;

            // Handle auth errors, but skip for auth-related endpoints
            if (httpError?.status === 401 && !url.includes('auth/')) {
                return this.handleUnauthorizedError<T>(url, mergedConfig);
            }

            // Handle all other errors using handleError
            return this.handleError(error);
        }
    }

    private async handleUnauthorizedError<T>(url: string, config: RequestInit): Promise<T> {
        if (this.isRefreshing) {
            return new Promise<T>((resolve, reject) => {
                this.failedQueue.push({
                    resolve: resolve as (value: unknown) => void,
                    reject,
                    url,
                    config,
                });
            });
        }

        this.isRefreshing = true;
        try {
            await this.handleTokenRefresh();
            await this.processQueue();
            return super.makeRequest<T>(url, config);
        } catch (refreshError: unknown) {
            const httpError = refreshError as HttpError;

            // Check if refresh token is expired or invalid
            if (httpError?.status === 401 || httpError?.status === 403) {
                await this.handleLogout();
                // Throw a specific error to prevent retrying
                const error = new Error('Session expired. Please login again.') as HttpError;
                error.status = 401;
                throw error;
            }
            throw httpError;
        } finally {
            this.isRefreshing = false;
        }
    }

    handleError(error: unknown): never {
        if (typeof error === 'object' && error !== null) {
            const errorObj = error as Record<string, unknown>;
            if ('errors' in errorObj) {
                const errors = errorObj.errors;
                if (typeof errors === 'string') {
                    const err = new Error(errors) as HttpError;
                    throw err;
                } else if (typeof errors === 'object' && errors !== null) {
                    const messages = Object.values(errors as Record<string, string>);
                    const err = new Error(messages.join('\n')) as HttpError;
                    throw err;
                }
            }
            // If it's already an error-like object with status, preserve it
            if ('status' in errorObj && 'error' in errorObj) {
                const err = new Error(errorObj.error as string) as HttpError;
                err.status = errorObj.status as number;
                throw err;
            }
        }
        super.handleError(error);
    }
}

const httpClient = new HttpClient();
export default httpClient;

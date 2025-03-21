import { IHttpClient } from './http.client.interface';

export interface BasicHttpClientConfig {
    baseUrl?: string;
    headers?: Record<string, string>;
}

export default class BasicHttpClient implements IHttpClient {
    protected baseUrl: string;

    protected headers?: Record<string, string>;

    constructor() {
        this.baseUrl = '';
    }

    protected getDefaultHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
        };
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        return response.json() as T;
    }

    updateConfig(config: BasicHttpClientConfig): void {
        if (config.baseUrl) this.baseUrl = config.baseUrl;
        if (config.headers) this.headers = { ...this.headers, ...config.headers };
    }

    private buildHeaders(headers: Record<string, string> = {}): Record<string, string> {
        return { ...this.getDefaultHeaders(), ...this.headers, ...headers };
    }

    protected async makeRequest<T>(url: string, config: RequestInit): Promise<T> {
        try {
            const headers = this.buildHeaders(config.headers as Record<string, string>);
            const requestOptions = {
                ...config,
                headers,
            };

            if (config.method === 'GET' || config.method === 'HEAD') {
                delete requestOptions.body;
            }

            const response = await fetch(`${this.baseUrl}${url}`, requestOptions);

            if (!response.ok) {
                const errorData = await response.json();
                throw {
                    ...errorData,
                    status: response.status,
                };
            }
            return await this.handleResponse<T>(response);
        } catch (error) {
            throw error;
        }
    }

    handleError(error: unknown): never {
        throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }

    async get<T>(url: string, config?: RequestInit): Promise<T> {
        return this.makeRequest<T>(url, {
            ...config,
            method: 'GET',
        });
    }

    async post<T>(url: string, data?: object, config?: RequestInit): Promise<T> {
        return this.makeRequest<T>(url, {
            ...config,
            body: JSON.stringify(data),
            method: 'POST',
        });
    }

    async patch<T>(url: string, data?: object, config?: RequestInit): Promise<T> {
        return this.makeRequest<T>(url, {
            ...config,
            body: JSON.stringify(data),
            method: 'PATCH',
        });
    }

    async delete<T>(url: string, config?: RequestInit): Promise<T> {
        return this.makeRequest<T>(url, {
            ...config,
            method: 'DELETE',
        });
    }

    async put<T>(url: string, data?: object, config?: RequestInit): Promise<T> {
        return this.makeRequest<T>(url, {
            ...config,
            body: JSON.stringify(data),
            method: 'PUT',
        });
    }
}

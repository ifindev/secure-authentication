import envConfig from '../../configs/env/env.config';
import authStore from '../../stores/auth.store';
import BasicHttpClient from './basic-http.client';

export class HttpClient extends BasicHttpClient {
    constructor() {
        super();
        this.baseUrl = envConfig.apiUrl;
    }

    getDefaultHeaders(): Record<string, string> {
        const baseHeader = super.getDefaultHeaders();
        return {
            ...baseHeader,
            ...(authStore.state.accessToken
                ? { Authorization: `Bearer ${authStore.state.accessToken}` }
                : {}),
        };
    }

    handleError(error: unknown): never {
        if (typeof error === 'object' && error !== null) {
            const errorObj = error as Record<string, unknown>;

            // Note: our backend currently returns `errors` field for HTTP error
            if ('errors' in errorObj) {
                const errors = errorObj.errors;
                if (typeof errors === 'string') {
                    throw new Error(errors);
                } else if (typeof errors === 'object' && errors !== null) {
                    // For validation errors with multiple fields
                    const messages = Object.values(errors as Record<string, string>);
                    throw new Error(messages.join('\n'));
                }
            }
        }

        super.handleError(error);
    }
}

const httpClient = new HttpClient();

export default httpClient;

import { proxy } from 'valtio';

import { decryptBoolean,encryptBoolean } from '../utils/crypto.util';

type AuthState = {
    accessToken: string | null;
    isAuthenticated: boolean;
    hydrated: boolean;
};

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    hydrated: false,
};

const isAuthenticatedPersistenceKey = '1adf82bdb6fdf555cdc3';

const state = proxy<AuthState>({ ...initialState });

const actions = {
    setToken: (token: string) => {
        state.accessToken = token;
        state.isAuthenticated = true;
    },

    clearToken: () => {
        state.accessToken = null;
        state.isAuthenticated = false;
    },

    persist: async () => {
        try {
            const encryptedValue = await encryptBoolean(state.isAuthenticated);
            localStorage.setItem(isAuthenticatedPersistenceKey, encryptedValue);
        } catch (error) {
            console.error('Failed to persist authentication state:', error);
            localStorage.removeItem(isAuthenticatedPersistenceKey);
        }
    },

    hydrate: async () => {
        if (state.hydrated) return;

        const fromLocalStorage = localStorage.getItem(isAuthenticatedPersistenceKey);

        if (!fromLocalStorage) {
            state.hydrated = true;
            return;
        }

        try {
            const decryptedValue = await decryptBoolean(fromLocalStorage);
            state.isAuthenticated = decryptedValue;
            state.hydrated = true;
        } catch (error) {
            console.error('Failed to decrypt authentication state:', error);
            state.isAuthenticated = false;
            state.hydrated = true;
            localStorage.removeItem(isAuthenticatedPersistenceKey);
        }
    },
};

type AuthStore = {
    actions: typeof actions;
    initialState: Readonly<typeof initialState>;
    state: Readonly<AuthState>;
};

const authStore: AuthStore = {
    actions,
    initialState,
    state,
};

export default authStore;
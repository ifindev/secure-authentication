import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import authStore from '../stores/auth.store';
import useRefreshToken from './use-refresh-token.hook';

export default function useAuth() {
    const { pathname } = useLocation();
    const { accessToken, isAuthenticated, hydrated } = useSnapshot(authStore.state);

    const refreshToken = useRefreshToken({
        onSuccess: (data) => authStore.actions.setToken(data.accessToken),
        onError: async () => {
            authStore.actions.clearToken();
            try {
                await authStore.actions.persist(); // Persist the cleared state
            } catch (error) {
                console.error('Failed to persist cleared auth state:', error);
            }
        },
    });

    useEffect(() => {
        // Async hydration
        const hydrateAuth = async () => {
            try {
                await authStore.actions.hydrate();
            } catch (error) {
                console.error('Failed to hydrate auth state:', error);
                // Ensure clean state if hydration fails
                authStore.actions.clearToken();
                await authStore.actions.persist();
            }
        };
        
        hydrateAuth();
    }, []);

    useEffect(() => {
        if (hydrated && isAuthenticated && !accessToken && !refreshToken.isPending) {
            refreshToken.execute();
        }
    }, [hydrated, accessToken, pathname, refreshToken, isAuthenticated]);

    return {
        isLoadingRefreshToken: refreshToken.isPending,
    };
}
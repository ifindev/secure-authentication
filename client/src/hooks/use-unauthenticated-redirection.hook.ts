import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import authStore from '../stores/auth.store';
import loginRoute from '../views/login/login.route';

export default function useUnauthenticatedRedirection() {
    const location = useLocation();
    const navigate = useNavigate();
    const { accessToken, isAuthenticated, hydrated } = useSnapshot(authStore.state);
    const [isHydrating, setIsHydrating] = useState(true);

    useEffect(() => {
        const hydrateAndCheckAuth = async () => {
            try {
                await authStore.actions.hydrate();
            } catch (error) {
                console.error('Hydration failed:', error);
                // Ensure clean state if hydration fails
                authStore.actions.clearToken();
                await authStore.actions.persist();
            } finally {
                setIsHydrating(false);
            }
        };

        hydrateAndCheckAuth();
    }, []);

    useEffect(() => {
        if (!isHydrating && hydrated && !accessToken && !isAuthenticated) {
            navigate(loginRoute.path, {
                replace: true,
                state: { from: location },
            });
        }
    }, [isHydrating, hydrated, accessToken, isAuthenticated, navigate, location]);

    return {
        isAuthenticated: !!accessToken,
        isHydrating
    };
}
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import authStore from '../stores/auth.store';
import mainRoute from '../views/main/main.route';

export default function useAuthenticatedRedirection() {
    const { accessToken, isAuthenticated, hydrated } = useSnapshot(authStore.state);
    const navigate = useNavigate();
    const location = useLocation();
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
        if (!isHydrating && hydrated && isAuthenticated && accessToken) {
            const destination = location.state?.from?.pathname || mainRoute.path;
            navigate(destination, { replace: true });
        }
    }, [isHydrating, hydrated, isAuthenticated, accessToken, location, navigate]);

    return { 
        isPublicAccessible: !accessToken,
        isHydrating 
    };
}
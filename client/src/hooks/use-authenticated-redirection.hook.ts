import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import authStore from '../stores/auth.store';
import mainRoute from '../views/main/main.route';

export default function useAuthenticatedRedirection() {
    const { accessToken } = useSnapshot(authStore.state);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (accessToken) {
            // If user came from a specific route, go back there
            // Otherwise, go to main route
            const destination = location.state?.from?.pathname || mainRoute.path;
            navigate(destination, { replace: true });
        }
    }, [accessToken, location, navigate]);

    return { isPublicAccessible: !accessToken };
}

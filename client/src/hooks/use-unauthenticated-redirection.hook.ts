import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import authStore from '../stores/auth.store';
import loginRoute from '../views/login/login.route';

export default function useUnauthenticatedRedirection() {
    // #region GENERAL HOOKS
    const location = useLocation();
    const navigate = useNavigate();

    // #endregion

    // #region AUTH STORE
    const { accessToken } = useSnapshot(authStore.state);
    // #endregion

    useEffect(() => {
        if (!accessToken) {
            navigate(loginRoute.path, {
                replace: true,
                state: { from: location },
            });
        }
    }, [accessToken, navigate]);

    return {
        isAuthenticated: !!accessToken,
    };
}

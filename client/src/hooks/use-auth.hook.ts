import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import authStore from '../stores/auth.store';
import loginRoute from '../views/login/login.route';
import useRefreshToken from './use-refresh-token.hook';

export default function useAuth() {
    const { pathname } = useLocation();
    const { accessToken, wasLoggedOut } = useSnapshot(authStore.state);

    const refreshToken = useRefreshToken({
        onSuccess: (data) => authStore.actions.setToken(data.accessToken),
        onError: () => {
            authStore.actions.clearToken();
        },
    });

    useEffect(() => {
        const isLoginPage = pathname === loginRoute.path;

        if (!isLoginPage && !accessToken && !wasLoggedOut && !refreshToken.isPending) {
            refreshToken.execute();
        }
    }, [accessToken, pathname, refreshToken, wasLoggedOut]);

    return {
        isLoadingRefreshToken: refreshToken.isPending,
    };
}

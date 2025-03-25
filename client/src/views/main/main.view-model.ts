import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import useGetUserProfile from '../../hooks/use-get-user-profile.hook';
import useRefreshToken from '../../hooks/use-refresh-token.hook';
import useUnauthenticatedRedirection from '../../hooks/use-unauthenticated-redirection.hook';
import authStore from '../../stores/auth.store';
import userStore from '../../stores/user.store';
import useLogout from './hooks/use-logout.hook';

export default function useMainViewModel() {
    // #region REDIRECT UNATHENTICATED
    useUnauthenticatedRedirection();
    // #endregion

    // #region LOCATION
    const { pathname } = useLocation();
    // #endregion

    // #region USER
    const { user } = useSnapshot(userStore.state);
    // #endregion

    // #region AUTH STORE
    const { accessToken } = useSnapshot(authStore.state);
    // #endregion

    // #region LOGOUT
    const logout = useLogout({
        onSuccess: () => {
            authStore.actions.clearToken()    
            authStore.actions.persist()
        },
    });
    // #endregion

    // #region REFRESH TOKEN
    const handleRefreshToken = useRefreshToken({});
    // #endregion

    // #region GET USER PROFILE
    const userProfile = useGetUserProfile();
    // #endregion

    return {
        user,
        accessToken,
        logout,
        handleRefreshToken,
        userProfile,
        pathname,
    };
}

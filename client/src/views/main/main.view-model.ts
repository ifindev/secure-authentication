import { useSnapshot } from 'valtio';

import authStore from '../../stores/auth.store';
import userStore from '../../stores/user.store';
import useGetUserProfile from './hooks/use-get-user-profile.hook';
import useRefreshToken from './hooks/use-refresh-token.hook';

export default function useMainViewModel() {
    // #region USER
    const { user } = useSnapshot(userStore.state);
    // #endregion

    // #region AUTH STORE
    const { clearToken: logout } = authStore.actions;
    const { accessToken } = useSnapshot(authStore.state);
    // #endregion

    // #region REFRESH TOKEN
    const handleRefreshToken = useRefreshToken({});
    // #endregion

    // #region GET USER PROFILE
    const userProfile = useGetUserProfile()
    // #endregion

    return {
        user,
        accessToken,
        logout,
        handleRefreshToken,
        userProfile
    };
}

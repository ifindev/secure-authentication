import { useSnapshot } from 'valtio';
import authStore from '../../stores/auth.store';
import userStore from '../../stores/user.store';

export default function useMainViewModel() {
    // #region USER
    const { user } = useSnapshot(userStore.state);
    // #endregion

    // #region AUTH STORE
    const { logout } = authStore.actions;
    const { accessToken } = useSnapshot(authStore.state);
    // #endregion

    return {
        user,
        accessToken,
        logout,
    };
}

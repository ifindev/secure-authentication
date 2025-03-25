import { useNavigate } from 'react-router-dom';

import useAuthenticatedRedirection from '../../hooks/use-authenticated-redirection.hook';
import authStore from '../../stores/auth.store';
import mainRoute from '../main/main.route';
import useLogin from './hooks/use-login.hook';
import useLoginForm from './hooks/use-login-form.hook';

export default function useLoginViewModel() {
    // #region REDIRECT IF AUTHENTICATED
    useAuthenticatedRedirection();
    // #endregion

    // #region NAVIGATION
    const navigate = useNavigate();
    // #endregion

    // #region FORM HANDLER
    const form = useLoginForm();
    // #endregion

    // #region LOGIN ACTION
    const login = useLogin({
        onSuccess: async (res) => {
            authStore.actions.setToken(res.accessToken);
            try {
                await authStore.actions.persist(); // Await the async persist
                navigate(mainRoute.path);
            } catch (error) {
                console.error('Failed to persist authentication state:', error);
                // Handle persistence failure (optional)
                // You might want to show an error message or retry
            }
        },
    });
    // #endregion

    return {
        form,
        login,
    };
}
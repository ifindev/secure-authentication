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
        onSuccess: (res) => {
            authStore.actions.setToken(res.accessToken);
            navigate(mainRoute.path);
        },
    });
    // #endregion

    return {
        form,
        login,
    };
}

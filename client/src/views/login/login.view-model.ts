import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/auth.store';
import mainRoute from '../main/main.route';
import useLoginForm from './hooks/use-login-form.hook';
import useLogin from './hooks/use-login.hook';

export default function useLoginViewModel() {
    // #region NAVIGATION
    const navigate = useNavigate();
    // #endregion

    // #region FORM HANDLER
    const form = useLoginForm();
    // #endregion

    // #region LOGIN ACTION
    const login = useLogin({
        onSuccess: (res) => {
            authStore.actions.login(res.accessToken);
            navigate(mainRoute.path);
        },
    });
    // #endregion

    return {
        form,
        login,
    };
}

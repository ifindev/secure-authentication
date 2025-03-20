import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth.context';
import mainRoute from '../main/main.route';
import useLoginForm from './hooks/use-login-form.hook';
import useLogin from './hooks/use-login.hook';

export default function useLoginViewModel() {
    // #region NAVIGATION
    const navigate = useNavigate();
    // #endregion

    // #region AUTH CONTEXT
    const auth = useAuthContext();
    // #endregion

    // #region FORM HANDLER
    const form = useLoginForm();
    // #endregion

    // #region LOGIN ACTION
    const login = useLogin({
        onSuccess: (res) => {
            auth.login(res.accessToken);
            navigate(mainRoute.path);
        },
    });
    // #endregion

    return {
        form,
        login,
    };
}

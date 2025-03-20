import { useAuthContext } from '../../contexts/auth.context';

export default function useMainViewModel() {
    // #region AUTH CONTEXT
    const auth = useAuthContext();
    // endregion

    return {
        auth,
    };
}

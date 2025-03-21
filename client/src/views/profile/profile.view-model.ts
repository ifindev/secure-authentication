import useGetUserProfile from '../../hooks/use-get-user-profile.hook';

export default function useProfileViewModel() {
    // #region USER PROFILE DATA
    const userProfile = useGetUserProfile();
    // #endregion

    return {
        userProfile,
    };
}

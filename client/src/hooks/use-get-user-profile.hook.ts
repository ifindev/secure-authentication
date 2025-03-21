import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import userRepository, { UserProfile } from '../repositories/user.repository';
import authStore from '../stores/auth.store';

export default function useGetUserProfile() {
    const { accessToken } = useSnapshot(authStore.state);

    return useQuery<UserProfile>({
        enabled: !!accessToken,
        queryKey: ['user-profile'],
        queryFn: () => userRepository.getProfile(),
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

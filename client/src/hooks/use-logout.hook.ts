import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import authRepository from '../repositories/auth.repository';

type UseLogoutProps = {
    onError?: (err: Error) => void;
    onSuccess?: () => void;
};

export default function useLogout({ onError, onSuccess }: UseLogoutProps) {
    const { isPending, mutate, isError, error } = useMutation({
        mutationFn: authRepository.logout,
        onSuccess: () => {
            onSuccess?.();
        },
        onError: (err) => {
            onError?.(err);
        },
    });

    const execute = useCallback(() => {
        mutate();
    }, []);

    return {
        execute,
        isPending,
        isError,
        error,
    };
}

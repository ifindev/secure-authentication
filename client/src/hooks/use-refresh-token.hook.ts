import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import authRepository, { LoginRes } from '../repositories/auth.repository';

type UseRefreshTokenProps = {
    onError?: (err: Error) => void;
    onSuccess?: (data: LoginRes) => void;
};

export default function useRefreshToken({ onError, onSuccess }: UseRefreshTokenProps) {
    const { isPending, mutate, isError, error } = useMutation({
        mutationFn: authRepository.refreshToken,
        onSuccess: (data) => {
            onSuccess?.(data);
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

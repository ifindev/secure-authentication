import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import authRepository, { LoginReq, LoginRes } from '../../../repositories/auth.repository';

type UseLoginProps = {
    onError?: (err: Error) => void;
    onSuccess?: (data: LoginRes) => void;
};

export default function useLogin({ onError, onSuccess }: UseLoginProps) {
    const { isPending, mutate, isError, error } = useMutation({
        mutationFn: authRepository.login,
        onSuccess: (data) => {
            onSuccess?.(data);
        },
        onError: (err) => {
            onError?.(err);
        },
    });

    const execute = useCallback((formData: LoginReq) => {
        mutate(formData);
    }, []);

    return {
        execute,
        isPending,
        isError,
        error,
    };
}

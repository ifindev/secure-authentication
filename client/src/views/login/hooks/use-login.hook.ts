import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { LoginReq, LoginRes, login } from '../../../apis/auth.api';

type UseLoginProps = {
    onError?: (err: Error) => void;
    onSuccess?: (data: LoginRes) => void;
};

export default function useLogin({ onError, onSuccess }: UseLoginProps) {
    const { isPending, mutate, isError, error } = useMutation({
        mutationFn: login,
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

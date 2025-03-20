import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// #region LOGIN FORM SCHEMA & TYPE
const loginFormSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;
// #endregion

export default function useLoginForm() {
    // #region FORM HANDLER
    const form = useForm<LoginFormSchema>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(loginFormSchema),
    });
    // #endregion

    return form;
}

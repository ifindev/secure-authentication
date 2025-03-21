import { twMerge } from 'tailwind-merge';

import useLoginViewModel from './login.view-model';

export default function LoginView() {
    const { form, login } = useLoginViewModel();

    return (
        <main className="h-screen w-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
                <form
                    onSubmit={form.handleSubmit(login.execute)}
                    className="flex flex-col gap-2 w-44"
                >
                    <div className="flex flex-col">
                        <label className="col-span-1 text-xs" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className={twMerge(
                                'border col-span-2 rounded px-2 py-1 text-xs',
                                form.formState.errors.username &&
                                    'border-red-400 focus:outline-red-500',
                            )}
                            required
                            {...form.register('username', { required: true })}
                            id="username"
                            type="text"
                            aria-invalid={form.formState.errors.username ? 'true' : 'false'}
                        />
                        {form.formState.errors.username && (
                            <span role="alert" className="text-[10px] text-red-400">
                                {form.formState.errors.username.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="col-span-1 text-xs" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className={twMerge(
                                'border col-span-2 rounded px-2 py-1 text-xs',
                                form.formState.errors.password &&
                                    'border-red-400 focus:outline-red-500',
                            )}
                            required
                            {...form.register('password', { required: true })}
                            type="password"
                            name="password"
                            id="password"
                            aria-invalid={form.formState.errors.password ? 'true' : 'false'}
                        />
                        {form.formState.errors.password && (
                            <span role="alert" className="text-[10px] text-red-400">
                                {form.formState.errors.password.message}
                            </span>
                        )}
                    </div>
                    {login.error && (
                        <div
                            role="alert"
                            className="bg-red-200 rounded p-2 text-[10px] text-red-900"
                        >
                            {login.error.message}
                        </div>
                    )}
                    <button
                        disabled={login.isPending}
                        className="bg-green-700 text-white text-sm p-2 rounded text-center disabled:bg-green-700/50"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}

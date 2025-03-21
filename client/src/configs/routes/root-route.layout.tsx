import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import LoadingSpinner from '../../components/loading-spinner';
import useAuth from '../../hooks/use-auth.hook';

export default function RootRouteLayout() {
    const { isLoadingRefreshToken } = useAuth();

    if (isLoadingRefreshToken) {
        return (
            <main className="h-screen w-full flex items-center justify-center">
                <LoadingSpinner />
            </main>
        );
    }

    return (
        <Suspense
            fallback={
                <main className="h-screen w-full flex items-center justify-center">
                    <LoadingSpinner />
                </main>
            }
        >
            <Outlet />
        </Suspense>
    );
}

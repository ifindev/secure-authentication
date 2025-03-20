import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode, useState } from 'react';
import NavigationApp from './navigation.app.tsx';

function ContainerApp() {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <NavigationApp />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StrictMode>
    );
}

export default ContainerApp;

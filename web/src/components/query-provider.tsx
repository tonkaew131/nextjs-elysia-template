'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
    children: React.ReactNode;
}

export default function QueryProvider(props: QueryProviderProps) {
    const { children } = props;
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

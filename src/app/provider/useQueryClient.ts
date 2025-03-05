import React, {createContext, useContext} from 'react';

export const QueryClientContext = createContext(null);

export function useQueryClient() {
    const client = useContext(QueryClientContext);

    if (!client) {
        throw new Error('No QueryClient set, use QueryClientProvider to set one');
    }

    return client
}
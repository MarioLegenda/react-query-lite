import React, {createContext, useContext} from 'react';
import {QueryClient} from "../client/queryClient";

export const QueryClientContext = createContext(null);

export function useQueryClient(): QueryClient | never {
    const client = useContext(QueryClientContext);

    if (!client) {
        throw new Error('No QueryClient set, use QueryClientProvider to set one');
    }

    return client
}
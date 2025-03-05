import React, {createContext, useContext} from 'react';
import {QueryClientContext} from "./useQueryClient";

export function useQueryClient() {
    const client = useContext(QueryClientContext);

    if (!client) {
        throw new Error('No QueryClient set, use QueryClientProvider to set one');
    }

    return client
}

export const QueryClientProvider = ({ children, client }) => {
    return (
        <QueryClientContext.Provider value={client}>
            {children}
        </QueryClientContext.Provider>
    )
}
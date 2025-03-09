import React, {useContext, PropsWithChildren} from 'react';
import {QueryClientContext} from "./useQueryClient";
import {QueryClient} from "../client/queryClient";

interface Props {
    client: QueryClient;
}

export function useQueryClient() {
    const client = useContext(QueryClientContext);

    if (!client) {
        throw new Error('No QueryClient set, use QueryClientProvider to set one');
    }

    return client
}

export function QueryClientProvider({ children, client }: PropsWithChildren<any> & Props) {
    return (
        <QueryClientContext.Provider value={client}>
            {children}
        </QueryClientContext.Provider>
    )
}
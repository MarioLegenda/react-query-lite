import {useQueryClient} from "./provider/useQueryClient";
import {QueryFunction, QueryKey, UseQueryResult} from "../types/query";
import {useState, useEffect, useCallback} from 'react';
import {Data} from "./stateMachine/data";

export function useQuery<Result, Error>(params: {
    queryKey: QueryKey,
    queryFn: QueryFunction,
    enabled?: boolean,
}): UseQueryResult {
    const client = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const [queryResult, setQueryResult] = useState<Result>(undefined);
    const [queryError, setQueryError] = useState<Result>(undefined);

    const queryKey = JSON.stringify(params.queryKey);
    const queryFn = params.queryFn;

    client.stateMachine.create(queryKey, new Data(params.enabled));

    const isEnabled = client.stateMachine.isEnabled(queryKey)

    const handleRefetch = useCallback(() => {
        if (!client.stateMachine.isEnabled(queryKey)) {
            return;
        }

        setIsLoading(true);
        if (client.cache.has(queryKey)) {
            setIsLoading(false);
            setQueryError(undefined);
            setQueryResult(client.cache.get(queryKey));

            return;
        }

        queryFn().then((result) => {
            setQueryResult(result);
            setQueryError(undefined);
            setIsLoading(false);

            client.cache.add(queryKey, result);
        }).catch((e) => {
            client.cache.remove(queryKey);

            setQueryError(e);
            setQueryResult(undefined);
        });
    }, [
        isEnabled,
    ]);

    useEffect(() => {
        handleRefetch()
    }, []);

    return {isLoading, data: queryResult, error: queryError, refetch: () => handleRefetch()};
}
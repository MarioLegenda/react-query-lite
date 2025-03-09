import {useQueryClient} from "./provider/useQueryClient";
import {QueryFunction, QueryKey, UseQueryResult} from "../types/query";
import {useState, useEffect} from 'react';

export function useQuery<Result, Error>(params: {
    queryKey: QueryKey,
    queryFn: QueryFunction,
}): UseQueryResult {
    const client = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const [queryResult, setQueryResult] = useState<Result>(undefined);
    const [queryError, setQueryError] = useState<Result>(undefined);

    const queryKey = params.queryKey;
    const queryFn = params.queryFn;

    const handleRefetch = () => {
        setIsLoading(true);
        const resolvedKey = JSON.stringify(queryKey);

        if (client.cache.has(resolvedKey)) {
            setIsLoading(false);
            setQueryError(undefined);
            setQueryResult(client.cache.get(resolvedKey));

            return;
        }

        queryFn().then((result) => {
            setQueryResult(result);
            setQueryError(undefined);
            setIsLoading(false);

            client.cache.add(resolvedKey, result);
        }).catch((e) => {
            client.cache.remove(resolvedKey);

            setQueryError(e);
            setQueryResult(undefined);
        });
    }

    useEffect(() => {
        handleRefetch()
    }, []);

    return {isLoading, data: queryResult, error: queryError, refetch: () => handleRefetch()};
}
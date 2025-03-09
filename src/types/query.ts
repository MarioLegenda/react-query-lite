export declare type QueryKey = string | readonly unknown[];
export declare type QueryFunction<T = unknown> = () => Promise<T>;

export type UseQueryResult<Result = unknown, Error = unknown> = {
    isLoading: boolean;
    data: Result;
    error: Error;
    refetch: () => void;
}

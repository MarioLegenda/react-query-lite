import {useQueryClient} from "./provider/useQueryClient";
import {QueryFunction, QueryKey} from "../types/query";

export function useQuery(params: {
    queryKey: QueryKey,
    queryFn: QueryFunction,
}) {
    const client = useQueryClient();


}
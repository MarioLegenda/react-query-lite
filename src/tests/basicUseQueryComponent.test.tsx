import {QueryClientProvider} from "../app/provider/QueryProvider";
import {useQuery} from "../app/useQuery";
import {render, waitFor, screen} from "@testing-library/react";
import {QueryClient} from "../app/client/queryClient";
import { describe, it, expect, vi } from 'vitest';

function SuccessComponent() {
    const {data} = useQuery({
        queryKey: ['basic success'],
        queryFn: async () => {
            const res = await fetch('https://google.com');
            return await res.text();
        }
    });

    return <>
        {data && <p>Success</p>}
    </>
}

function FailComponent() {
    const {error} = useQuery({
        queryKey: ['basic error'],
        queryFn: async () => {
            const res = await fetch('htps://google.com');

            if (!res.ok) {
                throw new Error('Google could not be fetched: ' + res.statusText);
            }
        }
    });

    return <>
        {error && <p>Failed</p>}
    </>
}

function LoadingComponent() {
    const {isLoading} = useQuery({
        queryKey: ['basic loading'],
        queryFn: async () => {
            const res = await fetch('https://google.com');

            if (!res.ok) {
                throw new Error('Google could not be fetched: ' + res.statusText);
            }
        }
    });

    return <>
        {isLoading && <p>Loading</p>}
    </>
}

describe('Basic query component', () => {
    it('renders success when fetching google', async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <SuccessComponent />
            </QueryClientProvider>
        );

        await waitFor(() => expect(screen.getByText('Success')).toBeInTheDocument(), {
            timeout: 5000,
            interval: 100,
        });
    });

    it('renders failed when fetching google', async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <FailComponent />
            </QueryClientProvider>
        );

        await waitFor(() => expect(screen.getByText('Failed')).toBeInTheDocument(), {
            timeout: 5000,
            interval: 100,
        });
    });

    it('renders isLoading when fetching google', async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <LoadingComponent />
            </QueryClientProvider>
        );

        await waitFor(() => expect(screen.getByText('Loading')).toBeInTheDocument(), {
            timeout: 5000,
            interval: 100,
        });
    });
});
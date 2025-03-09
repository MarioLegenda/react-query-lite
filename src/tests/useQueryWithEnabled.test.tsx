import {QueryClientProvider} from "../app/provider/QueryProvider";
import {useQuery} from "../app/useQuery";
import {render, waitFor, screen} from "@testing-library/react";
import {QueryClient} from "../app/client/queryClient";
import { describe, it, expect, vi } from 'vitest';

function EnabledComponent() {
    const {data} = useQuery({
        queryKey: ['basic success'],
        queryFn: async () => {
            const res = await fetch('https://google.com');
            return await res.text();
        },
    });

    return <>
        {data && <p>Success</p>}
    </>
}

function ExplicitEnabledComponent() {
    const {data} = useQuery({
        queryKey: ['basic success'],
        queryFn: async () => {
            const res = await fetch('https://google.com');
            return await res.text();
        },
        enabled: true,
    });

    return <>
        {data && <p>Success</p>}
    </>
}

function DisabledComponent() {
    const {data} = useQuery({
        queryKey: ['basic success'],
        queryFn: async () => {
            const res = await fetch('https://google.com');
            return await res.text();
        },
        enabled: false,
    });

    return <>
        {data && <p>Success</p>}
        {!data && <p>Nothing</p>}
    </>
}

describe('Enabled query option', () => {
    it('renders as default', async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <EnabledComponent />
            </QueryClientProvider>
        );

        await waitFor(() => expect(screen.getByText('Success')).toBeInTheDocument(), {
            timeout: 5000,
            interval: 100,
        });
    });

    it('renders as explicit enabled', async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <ExplicitEnabledComponent />
            </QueryClientProvider>
        );

        await waitFor(() => expect(screen.getByText('Success')).toBeInTheDocument(), {
            timeout: 5000,
            interval: 100,
        });
    });

    it('renders as disabled', async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <DisabledComponent />
            </QueryClientProvider>
        );

        expect(screen.getByText('Nothing')).toBeInTheDocument()
    });
});
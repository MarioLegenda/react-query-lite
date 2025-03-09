import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {QueryClientProvider} from "../app/provider/QueryProvider";

describe('QueryClientProvider', () => {
    it('should render', () => {
        render(<QueryClientProvider client={{}}>
            <p>some component</p>
        </QueryClientProvider>);

        expect(screen.getByText('some component')).toBeInTheDocument();
    });
});
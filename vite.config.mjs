import path, { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    server: {
        watch: {
            include: ['src/**'],
            exclude: ['node_modules/**', 'build/**'],
        },
    },
    resolve: {
        alias: {
            '@app': join(__dirname, 'src/app'),
            '@lib': join(__dirname, 'src/lib'),
            '@root': join(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'build',
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            fileName: 'index',
            formats: ['es'],
        },
    },
});

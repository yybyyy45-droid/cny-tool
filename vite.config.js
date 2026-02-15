import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8901',
                changeOrigin: true,
            },
        },
    },
});

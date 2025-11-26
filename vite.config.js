import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginRadar } from 'vite-plugin-radar'

export default defineConfig({
    plugins: [
        react(),
        // 只在生产环境加载Google Analytics，避免开发环境的错误
        process.env.NODE_ENV === 'production' ? VitePluginRadar({
            analytics: {
                id: 'G-NGY6H64ENF',
            },
        }) : null
    ].filter(Boolean),
    base: '/helTimeline/', // Use repository name for GitHub Pages default URL structure
});
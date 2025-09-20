import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),

        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Cache static assets
          manifest: {
            name: 'My React PWA',
            short_name: 'ReactPWA',
            description: 'A React Vite PWA for offline use',
            theme_color: '#ffffff',
            icons: [
              {
                src: 'assets/react.svg',
                sizes: '192x192',
                type: 'image/svg',
              },
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,vue,ts}'], // Cache all imports
          },
        }),
  ],
})

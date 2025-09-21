import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),

        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['assets/react.svg'], // Cache static assets
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
            navigateFallback: '/index.html', // IMPORTANT for offline refresh

            runtimeCaching: [
              {
                urlPattern: ({ url }) => url.origin === 'https://projectflaskmvc.onrender.com/api/todos', // Replace with your API origin
                handler: 'CacheFirst', // Cache strategy: try cache first, then network
                options: {
                  cacheName: 'api-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                  },
                  cacheableResponse: {
                    statuses: [0, 200],
                  },
                },
              },
            ],
          },
        }),
  ],
})

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(new URL('.', import.meta.url).pathname, 'index.html').replace(/^\/([a-zA-Z]:)/, '$1'),
        about: resolve(new URL('.', import.meta.url).pathname, 'about.html').replace(/^\/([a-zA-Z]:)/, '$1'),
        benefits: resolve(new URL('.', import.meta.url).pathname, 'benefits.html').replace(/^\/([a-zA-Z]:)/, '$1'),
        screening: resolve(new URL('.', import.meta.url).pathname, 'screening.html').replace(/^\/([a-zA-Z]:)/, '$1'),
      },
    },
  },
})

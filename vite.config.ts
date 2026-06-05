import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind v4 ships as a first-class Vite plugin — no postcss.config / tailwind.config needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

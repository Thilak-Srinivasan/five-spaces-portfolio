import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // served from https://thilak-srinivasan.github.io/five-spaces-portfolio/
  base: '/five-spaces-portfolio/',
})

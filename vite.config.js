import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Deploy lên GitHub Pages dạng project site: https://nguyenletandat.github.io/nguyenletandat-iot-lab/
  // nên cần base = "/<ten-repo>/". Nếu sau này chuyển sang domain riêng hoặc user/org page thì đổi lại thành '/'.
  base: '/nguyenletandat-iot-lab/',
  plugins: [react(), tailwindcss()],
})

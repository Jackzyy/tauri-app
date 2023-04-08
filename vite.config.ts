import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'

const resolve = (dir: string) => path.resolve(__dirname, dir)

export default defineConfig(async () => ({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.js', 'src/*.vue']
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: path.resolve(resolve('src/types'), 'auto-imports.d.ts'),
      eslintrc: {
        enabled: true,
        filepath: './node_modules/.eslintrc-auto-import.json'
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG
  }
}))

/*
 * @Author: lu
 * @Date: 2021-11-23 14:25:40
 * @LastEditTime: 2021-11-30 10:40:57
 * @FilePath: \vue-ts-erp\vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { // 配置host
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "~": path.join(__dirname, "node_modules")
    }
  }
})

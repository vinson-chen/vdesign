import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// 样式文件构建配置
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    lib: {
      entry: "./src/styles.css",
      name: "styles",
      formats: ["es"],
      fileName: "styles",
    },
    outDir: "dist",
  },
})
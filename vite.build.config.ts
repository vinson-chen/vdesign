import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

// 组件库构建配置
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: [
        "src/components/**/*.ts",
        "src/components/**/*.tsx",
        "src/hooks/**/*.ts",
        "src/hooks/**/*.tsx",
        "src/lib/**/*.ts",
        "src/types/**/*.ts",
        "src/index.ts"
      ],
      outDir: "dist",
      exclude: ["src/demo/**/*"]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "Vdesign",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    outDir: "dist",
    sourcemap: true,
  },
})

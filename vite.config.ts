import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"], // when you put both source and dev code in the src directory and you only want to generate types for the source code
    }),
    visualizer({
      filename: "./stats.html", // 生成的报告文件
      open: true, // 打包后自动打开浏览器展示报告
      gzipSize: true, // 显示 gzip 压缩后的大小
      brotliSize: true, // 显示 brotli 压缩后的大小
    }),
  ],
  build: {
    copyPublicDir: false,
    cssCodeSplit: true, // 👀
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MyComponentLibrary",
      formats: ["es", "cjs"],
      fileName: (format) => `my-component-library.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

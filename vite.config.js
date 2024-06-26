import { defineConfig, loadEnv } from "vite"; //loadEnv為取得env資訊
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import html from "vite-plugin-html";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 取得依照build的環境，取得env資料
  return {
    base: "./",
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: "src/quasar-variables.sass",
      }),
      eslintPlugin({
        cache: false,
      }),
      /* 這邊使用 vite-plugin-html在build時可讓index.html抓取環境變數 */
      html({
        inject: {
          data: {
            title: env.VITE_LOGO_NAME,
            keyword: env.VITE_KEYWORD,
            subject: env.VITE_SUBJECT,
            logo: env.VITE_ENV_LOGO,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      extensions: [".vue", ".js"],
    },
    server: {
      port: 8080,
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: "./docs", // 您想要的输出目录
      chunkSizeWarningLimit: 10000,
    },
  };
});

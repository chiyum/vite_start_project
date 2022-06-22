/* 這邊是vite相關檔案設定 defineConfig及vue都是vite在建立時基礎架構 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
/* eslintPlugin的功能是將eslint錯誤訊息顯示在瀏覽器 */
import eslintPlugin from "vite-plugin-eslint";
/* 導入node.js 的path resolve */
/* vite 是使用 rollup bundle 打包 所以除了require不能用以外 其餘node.js自帶模組都可以使用 因為環境是node.js */
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", //build後的路徑 如果要用go live的話要改 ./
  plugins: [
    vue(),
    eslintPlugin({
      cache: false, //緩存與否?
    }),
  ],
  resolve: {
    /* alias 為簡化模塊的路徑名稱 */
    alias: {
      "@": resolve(__dirname, "./src"),
      //resolve的功能是解析路徑 由右到左 dirname 為目前文件所在的絕對路徑 主要用於圖片檔等的路徑導入 @/image/xxx.png
      //所以resolve(_dirname, "./src") 返回的是 目前所在路徑/src
      //PS: resolve會以最後出現的'/'為起點，作為根路徑，忽略前面的片段，而join不會。
    },
    /* extension 功能是在使用import但沒寫上副檔名時會自動帶入後綴（副檔名）去找文件是否存在 */
    extensions: [".vue", ".js"],
  },
  /* 本地run serve時的代理伺服器 網頁默認是8080 */
  server: {
    port: 8080,
  },
  /* build後保留console.log */
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        // prod環境移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});

import { createRouter, createWebHashHistory } from "vue-router";
import createRoutes from "./_app/routes";
/* 設定預設導入頁面 */
const options = {
  defaultPath: "/home",
};
/* 建立router */
const router = createRouter({
  //hash模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //掛載處理好的routes
  routes: createRoutes(options),
});

router.beforeEach(async (to, from, next) => {
  console.log(to, from);
  next();
});

export default router;

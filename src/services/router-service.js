import { createRouter, createWebHashHistory } from "vue-router";
import createRoutes from "@/_app/routes";
// import store from "@/services/store-service";
// import alert from "@/services/alert-service";
// import useCycle, { processNotifyData } from "@/cycle";
// import storage from "store2";
// import { checkPhone, toService } from "@/tool";
// import { isEmpty } from "ramda";
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
  scrollBehavior() {
    /** 換頁捲軸回到上方 */
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  next();
});

export default router;

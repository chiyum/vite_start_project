import { markRaw } from "vue";
import store from "@/services/store-service";
import i18n from "@/services/i18n-service";

export class PopupService {
  constructor() {
    this.initStates = {
      type: "Modal", // 類別
      resolve: () => {},
      title: null, //標題
      text: null, //文字
      component: null, //中間元件
      showCancelButton: false, // 顯示取消按鈕
      showConfirmButton: false, // 顯示確認按鈕
      confirmButtonText: i18n.t("button.confirm"), // 確認預設文案
      cancelButtonText: i18n.t("button.cancel"), // 取消預設文案
      allowOutsideClick: true, // 是否可以點擊外面
      props: {}, // 傳送資料
      timer: null, // 時間
      timerProgress: false, // 時間進度條
      autoClose: false, // 自動關閉
      allowConfirmWhenTimerRunning: false, // 是否可以按下確認 在時間還還在倒數時
      allowDismissWhenTimerRunning: false, // 同上 只是改為關閉
      BackdropStyle: "rgba(0, 0, 0, 0.6)",
    };
  }

  get state() {
    return store.state.app.popupState;
  }

  async modal(option = {}) {
    const {
      title,
      text,
      component = null,
      showCancelButton = true,
      showConfirmButton = true,
      confirmButtonText = i18n.t("button.confirm"),
      cancelButtonText = i18n.t("button.cancel"),
      allowOutsideClick = true,
      props = {},
    } = option;
    /* 這邊使用prmise的原因是因為要使用非異步 */
    return new Promise((resolve) => {
      store.commit("app/set/popup", {
        ...this.initStates,
        type: "Modal",
        resolve,
        title,
        text,
        component: component ? markRaw(component) : null,
        showCancelButton,
        showConfirmButton,
        confirmButtonText,
        cancelButtonText,
        allowOutsideClick,
        props,
      });
    });
  }

  clear() {
    store.commit("app/clear/popup");
  }
}

PopupService.prototype.install = function install(app) {
  const provideName = "popup-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new PopupService();

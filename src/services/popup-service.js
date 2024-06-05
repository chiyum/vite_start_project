import { markRaw } from "vue";
import { usePopupStore } from "@/store/popup-store";
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
    this.store = {};
  }

  get state() {
    return this.store.popupState;
  }

  /** 待vue元件掛載完成後 掛載pinia */
  init() {
    this.store = usePopupStore();
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
      this.store.setPopupState({
        ...this.initStates,
        type: "Modal",
        resolve,
        title,
        text,
        component: component ? markRaw(component) : null, // 這邊使用markRaw防止變成響應式
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
    this.store.clearPopupState();
  }
}
const instance = new PopupService();

/** 會在main.js加載 */
PopupService.prototype.install = function install(app) {
  instance.init();
  const provideName = "popup-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default instance;

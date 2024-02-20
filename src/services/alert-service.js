import { AlertProvider } from "@/providers/alert-provider";
import i18n from "@/services/i18n-service";

export class AlertService {
  constructor() {
    this.provider = new AlertProvider();
  }

  toast(title) {
    return this.provider.fire({
      title,
      toast: true,
      showConfirmButton: false,
      customClass: "swal2-toast",
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
      },
      timer: 2000,
      background: "transparent",
      didOpen: (toast) => {
        toast.addEventListener("click", this.provider.close);
      },
    });
  }

  alert({
    title,
    text,
    willClose = null,
    heightAuto = false,
    html = false,
    confirmButtonText = i18n.t("button.confirm"),
    style = "",
  }) {
    return this.provider.fire({
      title,
      text,
      html,
      customClass: `swal2-alert ${style}`,
      heightAuto,
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
      },
      willClose,
      confirmButtonText,
    });
  }

  showLoading() {
    return this.provider.fire({
      // title: "loading",
      showConfirmButton: false,
      html: `<div class="loader">
      <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
      </svg>
  </div>

  <div class="loader triangle">
      <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
  </div>

  <div class="loader">
      <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
      </svg>
  </div>`,
      customClass: "swal2-loading",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
      background: "none",
      backdrop: "#ffffff",
    });
  }

  confirm({
    title, //標題
    text, //內文
    html,
    confirmButtonText = i18n.t("button.confirm"),
    confirmCallback = null, //確認後callback
    heightAuto = false, //是否啟用heightAuto
  }) {
    return this.provider.fire({
      title,
      text,
      html,
      customClass: "swal2-confirm",
      confirmButtonText,
      heightAuto,
      showCancelButton: true,
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
      },
      preConfirm() {
        confirmCallback?.();
      },
    });
  }

  close() {
    this.provider.close();
  }
}

AlertService.prototype.install = function install(app) {
  const provideName = "alert-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new AlertService();

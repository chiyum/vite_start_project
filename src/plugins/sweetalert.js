/**
 * doc
 * @link https://sweetalert2.github.io/
 */
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import i18n from "@/i18n";
//toast樣式
Swal.toast = function toast(title) {
  return this.fire({
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
      toast.addEventListener("click", Swal.close);
    },
  });
};

//alert樣式
Swal.alert = function alert({
  title,
  text,
  willClose = null,
  heightAuto = false,
  html = false,
  confirmButtonText = i18n.t("button.confirm"),
  style = "",
}) {
  return this.fire({
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
};

//loading
Swal.showLoading = function showLoading() {
  return this.fire({
    title: "winner winner chicken dinner",
    showConfirmButton: false,
    customClass: "swal2-loading",
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOut",
    },
    background: "transparent",
  });
};

//confirm樣式
Swal.confirm = function confirm({
  title, //標題
  text, //內文
  html,
  confirmCallback = null, //確認後callback
  heightAuto = false, //是否啟用heightAuto
}) {
  return this.fire({
    title,
    text,
    html,
    customClass: "swal2-confirm",
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
};

export const swal = Swal.mixin({
  reverseButtons: true, //反轉按鈕
  heightAuto: false, //自適應高度
  focusConfirm: false, //focus確認鈕
  allowOutsideClick: false, //不可點擊範圍外
  allowEnterKey: false, //不可透過enter來操控彈窗
  allowEscapeKey: false,
  customClass: "swal2-wrap", //自定義彈窗樣式
  // width: 300, //寬度
  confirmButtonText: i18n.t("button.confirm"), //確認按鈕文案
  cancelButtonText: i18n.t("button.cancel"), //取消按鈕文案
  didOpen(popup) {
    const cancelBtn = popup.querySelector(".swal2-cancel");
    const confirmBtn = popup.querySelector(".swal2-confirm");
    confirmBtn.blur();
    cancelBtn.blur();
  },
});

//這邊可以嘗試使用exprot 具名來匯出需要的樣式 如上
//預計做個確認彈窗跟等待彈窗 等待為優先

export default swal;

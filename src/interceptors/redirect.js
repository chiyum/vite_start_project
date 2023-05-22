import router from "@/router";
import i18n from "@/i18n";
import store from "@/store";
import swal from "@/plugins/sweetalert";

const redirect = {
  use(instance) {
    window.isAlert = false;
    instance.interceptors.response.use(
      async function (response) {
        const { noredirect = false } = response.config;
        //偵測response.config是否有該屬性noredirect 有就代表登入中。
        if (!noredirect && !window.isAlert) {
          //若沒有登入則根據回傳的代碼跳錯誤訊息
          const data = response.data;
          switch (data.code) {
            case 0:
            case 100002:
            case 200001:
            case 200002:
            case 200003:
            case 200004:
            case 200005: {
              const { isConfirmed } = await swal.alert({
                title: `Error(${data.code})`,
                text: i18n.t(`error.code.${data.code}`),
              });
              if (isConfirmed) {
                await store.dispatch("auth/logout");
                await router.replace("/login");
                // eslint-disable-next-line require-atomic-updates
                window.isAlert = false;
              }
              return Promise.reject(`Error: ${data.code}`);
            }
          }
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default redirect;

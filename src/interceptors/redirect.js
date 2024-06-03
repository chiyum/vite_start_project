import router from "@/router";
import i18n from "@/i18n";
import { useAuthStore } from "@/store/auth-store";
import swal from "@/plugins/sweetalert";
const redirect = {
  use(instance) {
    instance.interceptors.response.use(
      async function (response) {
        const store = useAuthStore();
        const { noredirect = false } = response.config;
        /** 無導向則進入判斷 */
        if (!noredirect) {
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
                await store.logout();
                await router.replace("/login");
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

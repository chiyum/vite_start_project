import i18n from "@/i18n";
import swal from "@/plugins/sweetalert";

const validate = {
  use(instance) {
    instance.interceptors.response.use(
      async function (response) {
        const { novalidate = false } = response.config;
        if (!novalidate) {
          const data = response.data;
          switch (data.code) {
            case 100000:
            case 100001:
            case 100003:
              await swal.alert({
                title: `Error(${data.code})`,
                text: i18n.t(`error.code.${data.code}`),
              });
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

export default validate;

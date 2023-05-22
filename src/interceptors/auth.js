import storage from "store2";

const auth = {
  use(instance) {
    instance.interceptors.request.use(
      function (config) {
        /** 有值就寫入 */
        const accessToken = storage.get("token");
        if (accessToken) {
          /** 寫入 header Authorization */
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default auth;

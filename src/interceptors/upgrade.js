import storage from "store2";
import store from "@/store";

// ! 此處邏輯尚未經過測試
const upgrade = {
  use(instance) {
    instance.interceptors.response.use(
      async function (response) {
        const data = response.data;
        if (data.code === 100004) {
          const res = instance.get("/app/jwt-token", {
            params: {
              account: store.state.auth.user.account,
            },
          });
          if (res.data.code === 1) {
            storage.set("token", res.data.data.jwt_token, true);
          }
          const retryResponse = await instance.request(response.config);
          return retryResponse;
        }

        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default upgrade;

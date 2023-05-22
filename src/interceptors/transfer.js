import { keys, forEach, reduce, isNil, isEmpty, assoc } from "ramda";

const _computedRejectData = (payload, { rejectNil, rejectEmpty }) =>
  reduce(
    (result, key) => {
      const value = payload[key];
      if (rejectNil && isNil(value)) return result;
      if (rejectEmpty && isEmpty(value)) return result;
      return assoc(key, value, result);
    },
    {},
    keys(payload)
  );

const transfer = {
  use(instance) {
    instance.interceptors.request.use(
      function (config) {
        const {
          rejectNil = true /** 過濾 null */,
          rejectEmpty = false /** 過濾空值 */,
          isFormData = false /** 轉換成 FormData */,
        } = config;

        if (config.params) {
          config.params = _computedRejectData(config.params, {
            rejectNil,
            rejectEmpty,
          });
        }

        if (config.data) {
          config.data = _computedRejectData(config.data, {
            rejectNil,
            rejectEmpty,
          });

          if (isFormData) {
            const formData = new FormData();
            forEach((key) => {
              if (config.data[key] instanceof Array) {
                forEach((value) => {
                  formData.append(`${key}[]`, value);
                }, config.data[key]);
              } else {
                formData.append(key, config.data[key]);
              }
            }, keys(config.data));
            config.data = formData;
          }
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      async function (response) {
        return response.data;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default transfer;

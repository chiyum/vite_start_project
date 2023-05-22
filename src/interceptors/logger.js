const logger = {
  use(instance) {
    instance.interceptors.request.use(
      function (config) {
        console.debug(
          "API REQUEST:",
          config.method.toUpperCase(),
          config.url,
          config.params || "",
          config.data || ""
        );
        return config;
      },
      function (error) {
        if (error && error.response) {
          console.error(
            "API REQUEST FAILED:",
            error.response.config.method.toUpperCase(),
            error.response.config.url,
            error.response
          );
        }
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      function (response) {
        console.debug(
          "%cAPI RESPONSE: " +
            `${response.config.method.toUpperCase()} ` +
            `${response.config.url}`,
          "color:green;",
          response
        );
        return response;
      },
      function (error) {
        if (error && error.response) {
          console.error(
            "API RESPONSE FAILED:",
            error.response.config.method.toUpperCase(),
            error.response.config.url,
            error.response
          );
        }
        return Promise.reject(error);
      }
    );
  },
};

export default logger;

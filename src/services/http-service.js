import { HttpProvider } from "@/providers/http-provider";
import logger from "@/interceptors/logger";
import auth from "@/interceptors/auth";
import transfer from "@/interceptors/transfer";
import upgrade from "@/interceptors/upgrade";
import redirect from "@/interceptors/redirect";
import validate from "@/interceptors/validate";

export class HttpService {
  constructor() {
    this.provider = new HttpProvider(import.meta.env.VITE_REMOTE_API);
    this.init();
  }

  init() {
    this.provider.use(
      import.meta.env.DEV ? logger : {},
      auth,
      upgrade,
      redirect,
      validate,
      transfer
    );
  }

  get get() {
    return this.provider.instance.get;
  }

  get post() {
    return this.provider.instance.post;
  }

  get put() {
    return this.provider.instance.put;
  }

  get delete() {
    return this.provider.instance.delete;
  }
}

HttpService.prototype.install = function install(app) {
  const provideName = "http-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new HttpService();

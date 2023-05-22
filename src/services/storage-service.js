import { StorageProvider } from "@/providers/storage-provider";

export class StorageService {
  constructor() {
    this.provider = new StorageProvider();
  }

  destroy() {
    this.provider.clearAll();
  }
}

StorageService.prototype.install = function install(app) {
  const provideName = "storage-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new StorageService();

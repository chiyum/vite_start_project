import { inject } from "vue";

export const useStorage = () => {
  return inject("storage-service");
};

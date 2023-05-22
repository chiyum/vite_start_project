import { inject } from "vue";

export const usePopup = () => {
  return inject("popup-service");
};

import { ref } from "vue";
import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", () => {
  const popupState = ref({});
  function setPopupState(payload) {
    popupState.value = {
      ...payload,
      $display: true,
      $timestamp: Date.now(),
    };
  }
  function clearPopupState() {
    popupState.value = {
      $display: false,
      $timestamp: -1,
    };
  }

  return { popupState, setPopupState, clearPopupState };
});

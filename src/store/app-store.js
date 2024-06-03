import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("counter", () => {
  const i18nLang = ref("");
  const i18nFormat = computed(() => {
    const lang = i18nLang.value;
    switch (lang) {
      case "en":
        return "es-en";
      case "zh-tw":
        return "zh-tw";
      default:
        return lang;
    }
  });

  function changeI18nLang(lang) {
    i18nLang.value = lang;
  }

  return { i18nLang, i18nFormat, changeI18nLang };
});

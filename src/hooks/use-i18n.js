import { ref } from "vue";
import { useI18n as useVue3I18n } from "@arshown/vue3-i18n";
import { split, join } from "ramda";
import storage from "@/services/storage-service";

export const useI18n = () => {
  const i18n = useVue3I18n();
  const prefix = ref({});
  const setPrefix = (str) => {
    if (typeof str === "string") {
      prefix.value = { $current: str };
    } else {
      prefix.value = { ...prefix.value, ...str };
    }
  };

  const transfer = (str, params = {}) => {
    const [PREFIX, ...words] = split(".", str);
    if (PREFIX in prefix.value) {
      return transfer(`${prefix.value[PREFIX]}.${join(".", words)}`, params);
    } else return i18n.t(str, params);
  };

  const change = (lang) => {
    i18n.setLocale(lang);
    storage.provider.set("locale", lang);
  };

  return {
    locale: i18n.locale,
    change,
    setPrefix,
    t: transfer,
    addMessages: i18n.addMessages,
  };
};

export default useI18n;

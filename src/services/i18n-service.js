import { createI18n } from "@arshown/vue3-i18n";
import messages from "@/_app/locales";
import storage from "@/plugins/storage";

const initLocale = (() => {
  const keepLocale = storage.get("locale");
  console.log(keepLocale, "keepLocale");
  if (keepLocale) return keepLocale;

  // 偵測使用者所在地區來去判斷語言
  let userLang =
    navigator.language?.toLowerCase() ??
    navigator.userLanguage?.toLowerCase() ??
    null;

  /** 偵測不到使用預設值 */
  if (!userLang) return import.meta.env.VITE_LOCALE;

  /** 轉換？ */
  if (userLang.includes("ph")) userLang = "en-ph";
  else if (userLang.includes("zh")) userLang = "zh-tw";
  else if (userLang.includes("en")) userLang = "en";

  /** 不支援語系使用預設值 */
  userLang = userLang in messages ? userLang : import.meta.env.VITE_LOCALE;

  return userLang;
})(import.meta.env.VITE_ENV);

const i18n = createI18n({
  initLocale, //使用語系
  fallbackLocale: import.meta.env.VITE_DEFAULT_LANG ?? "zh-tw", //語系無資料時，備用語系
  messages, //語系資料
});

export default i18n;

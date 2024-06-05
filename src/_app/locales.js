/*
  語系處理
  @desc 抓取locales底下的所有js檔案
 */
const files = import.meta.glob("../locales/**/*.js", { eager: true });
import * as R from "ramda";
const messages = {};

for (let path in files) {
  const pathToFile = path
    .replace("../locales/", "")
    .toLowerCase()
    .replace(".js", "");
  const [locale, ...paths] = pathToFile.split("/");
  const messageKey = R.join(".", paths); // 語系key
  const fileObj = files[path].default; // 語系value
  messages[locale] = R.reduce(
    (merge, key) =>
      /** 合併每個 */
      R.mergeDeepRight(merge, {
        [`${messageKey}.${key}`]: fileObj[key],
      }),
    messages[locale] || {},
    R.keys(fileObj)
  );
}

export default messages;

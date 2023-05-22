/* 語系處理 */
const files = import.meta.globEager("../locales/**/*.js");
import * as R from "ramda";
const messages = {};

for (let path in files) {
  const pathToFile = path
    .replace("../locales/", "")
    .toLowerCase()
    .replace(".js", "");
  const [locale, ...paths] = pathToFile.split("/");
  const messageKey = R.join(".", paths);
  const fileObj = files[path].default;
  // console.log(path); //path為該語系資料夾名稱
  messages[locale] = R.reduce(
    (merge, key) =>
      R.mergeDeepRight(merge, {
        [`${messageKey}.${key}`]: fileObj[key],
      }),
    messages[locale] || {},
    R.keys(fileObj)
  );
}

export default messages;

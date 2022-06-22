/* 導入layoyt目錄中的.vue檔 */
const files = import.meta.globEager("../layouts/*.vue");
const modules = [];
// console.log(files);
for (let path in files) {
  /* 導入layoyt目錄中的.vue檔 */
  /* replace是比對字串是否有符合的字串 有就以第二個參數替代replace(正則, 新替代字串) */
  /* 第一次replace先去路徑 接著轉小寫 最後一次replace則是去除副檔名*/
  // console.log(path.replace("../layouts/", ""));
  const name = path
    .replace("../layouts/", "")
    .toLowerCase()
    .replace(".vue", "");
  /* 將處理好的模組push*/
  modules.push({
    componentName: name,
    component: files[path].default,
  });
}
const layouts = {
  /* 將layout新增為component */
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default layouts;

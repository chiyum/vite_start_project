/* 轉換並且導入component中的vue檔 */
const files = import.meta.globEager("../components/*.vue");
const modules = [];

for (let path in files) {
  const name = path
    .replace("../components/", "")
    .toLowerCase()
    .replace(".vue", "");
  modules.push({
    componentName: name,
    component: files[path].default,
  });
}
const components = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default components;

import { getFilename } from "./_rename";
const files = import.meta.glob("../directives/*.js", { eager: true });
const layouts = {
  install: (app) => {
    for (let path in files) {
      const filename = getFilename(path);
      console.log(filename, "filename");
      app.directive(filename, files[path].default);
    }
  },
};

export default layouts;

import { getFilename } from "./_rename";
const files = import.meta.globEager("../directives/*.js");

const layouts = {
  install: (app) => {
    for (let path in files) {
      const filename = getFilename(path);
      app.directive(filename, files[path].default);
    }
  },
};

export default layouts;

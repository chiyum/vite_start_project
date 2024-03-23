const files = import.meta.glob("../services/*.js", { eager: true });

const layouts = {
  install: (app) => {
    for (let path in files) {
      app.use(files[path].default);
    }
  },
};

export default layouts;

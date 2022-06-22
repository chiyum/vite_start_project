const files = import.meta.globEager("../store/**/*.js");
import * as R from "ramda";
let modules = {};

const setMouduleTree = (keyList, key, value) => {
  const [first, ...others] = keyList;
  if (others.length)
    return {
      [first]: {
        namespaced: true,
        modules: setMouduleTree(others, key, value),
      },
    };
  return {
    [first]: {
      namespaced: true,
      [key]: value,
    },
  };
};

for (let path in files) {
  const filepaths = path
    .replace("../store/", "")
    .toLowerCase()
    .replace(".js", "")
    .split("/");
  const currentTree = setMouduleTree(
    R.init(filepaths),
    R.last(filepaths),
    files[path].default
  );
  modules = R.mergeDeepLeft(modules, currentTree);
}

export default modules;

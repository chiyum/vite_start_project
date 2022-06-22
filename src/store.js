import { createStore } from "vuex";
import modules from "./_app/store";
//這個modules 就是createStore的各種功能，
//只不過是利用建立成js檔且使用導入的方式
// console.log(modules);

const store = createStore({
  modules,
  state() {
    return {};
  },
});
export default store;

import { createStore } from "vuex";
import modules from "@/_app/store";
import { sync } from "vuex-router-sync";
import router from "./router-service";

const store = createStore({
  modules,
});

sync(store, router);

export default store;

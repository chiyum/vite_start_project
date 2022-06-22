/* vue 起手 */
import { createApp } from "vue";
import App from "./App.vue";
/* vuex-router-sync只是為了開發者可以訪問route */
import { sync } from "vuex-router-sync";
/* 導入內崁元件及vue */
import layouts from "@/_app/layouts";
import components from "@/_app/components";
import store from "@/store";
import router from "./router";
const app = createApp(App);

app.use(layouts);
app.use(components);
app.use(store);
app.use(router);
sync(store, router);
app.mount("#app");

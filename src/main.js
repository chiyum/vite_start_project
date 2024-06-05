import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Loading, Dialog, Notify } from "quasar";
import App from "./App";

/** plugins */
import jquery from "@/plugins/jquery";
import storage from "@/plugins/storage";
import sweetalert from "@/plugins/sweetalert";
import tabsslider from "@/plugins/tabsslider";
import VueLazyLoad from "vue3-lazyload";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
/** _app */
import layouts from "@/_app/layouts";
import components from "@/_app/components";
import providers from "@/_app/providers";
import directives from "@/_app/directives";
/** other */
import "./assets/main.scss";
import "@fortawesome/fontawesome-free/js/all";

const app = createApp(App);
const pinia = createPinia();
app.provide("$jQuery", jquery);
app.provide("$swal", sweetalert);
app.provide("$storage", storage);
app.provide("$tabsslider", tabsslider);
app.use(pinia);
app.use(layouts);
app.use(directives);
app.use(components);
app.use(VueLazyLoad, {
  loading: "",
  error: "",
});
app.use(Quasar, {
  plugins: {
    Loading,
    Dialog,
    Notify,
  },
});

// app.use(drag);

/** services register / 自定義hook */
app.use(providers);

app.mount("#app");

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="demo">
    <div class="demo-head">
      <div>
        <label class="switch">
          <input type="checkbox" class="cb" />
          <span class="toggle" @click="changeLang">
            <span class="left">CN</span>
            <span class="right">En</span>
          </span>
        </label>
      </div>
      <div class="demo-head-content">lang:{{ lang.current }}</div>
    </div>
    <div class="demo-actions">
      <div class="radio-inputs">
        <label class="radio" @click="toHome">
          <input type="radio" name="radio" checked="" />
          <span class="name">{{ t("$current.router.link") }}</span>
        </label>
        <label class="radio" @click="swalModal">
          <input type="radio" name="radio" />
          <span class="name">{{ t("$current.modal.swal") }}</span>
        </label>

        <label class="radio" @click="popupModal">
          <input type="radio" name="radio" />
          <span class="name">{{ t("$current.popup.use") }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import { useI18n } from "@/hooks/use-i18n";
import { useRouter } from "vue-router";
import { usePopup } from "@/hooks/use-popup";
import { useAlert } from "@/hooks/use-alert";

export default {
  layout: "layout-demo",
  setup() {
    // import storage from "store2";
    const popup = usePopup();
    const { t, locale, setPrefix, change } = useI18n();
    setPrefix({
      $current: "pages.demo",
    });
    const router = useRouter();
    const swal = useAlert();
    const lang = reactive({
      current: locale.value || "zh-tw",
    });
    const popupModal = async () => {
      await popup.modal({
        title: "popup",
        text: "this a popup",
        // props: {
        //   title: t("pages.home.notify.vip.title"),
        //   text: "VIP 1",
        // },
      });
    };
    const toHome = () => {
      router.push("/home");
    };
    const swalModal = () => {
      swal.alert({
        title: t("$current.modal.swal.title"),
        text: t("$current.modal.swal"),
      });
    };
    const changeLang = () => {
      const changed = lang.current === "zh-tw" ? "en" : "zh-tw";
      lang.current = changed;
      change(changed);
      // lang.current = changed;
      // storage.set("locale", changed);
    };
    onMounted(() => {});
    return {
      t,
      lang,
      toHome,
      swalModal,
      changeLang,
      popupModal,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/home.scss";
</style>

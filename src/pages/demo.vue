<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="demo">
    <div class="demo-head">
      <div>
        <q-tabs v-model="lang.current" narrow-indicator dense align="justify">
          <q-tab class="text-primary" name="zh-tw" label="中文" />
          <q-tab class="text-primary" name="en" label="English" />
        </q-tabs>
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

<script setup>
import { defineOptions } from "vue"; // 引入 Vue 核心功能
import { useI18n } from "@/hooks/use-i18n"; // 引入 i18n 鉤子
import { useRouter } from "vue-router"; // 引入路由鉤子
import { usePopup } from "@/hooks/use-popup"; // 引入彈窗鉤子
import { useAlert } from "@/hooks/use-alert"; // 引入警示彈窗鉤子

defineOptions({
  layout: "layout-demo",
});

// 使用 popup 模塊來處理彈窗
const popup = usePopup();

// 使用 i18n 模塊來處理語言切換與翻譯
const { t, locale, setPrefix, change } = useI18n();

// 設定翻譯前綴
setPrefix({
  $current: "pages.demo",
});

// 使用路由功能
const router = useRouter();

// 使用 swal 模塊來處理警示彈窗
const swal = useAlert();

// 設定語言的 reactive 狀態
const lang = reactive({
  current: locale.value || "zh-tw",
});

// 跳轉至首頁的方法
const toHome = () => {
  router.push("/home");
};

// 顯示 Swal 警示彈窗的方法
const swalModal = () => {
  swal.alert({
    title: t("$current.modal.swal.title"),
    text: t("$current.modal.swal"),
  });
};

// 顯示 Popup 彈窗的方法
const popupModal = async () => {
  await popup.modal({
    title: "popup",
    text: "this a popup",
  });
};

// 切換語言的方法
const changeLang = (newLang) => {
  change(newLang); // 更改語言
};

// 監視語言變化
watch(
  () => lang.current,
  (newLang) => {
    changeLang(newLang);
  }
);
</script>

<style lang="scss">
@import "@/assets/scss/home.scss";
</style>

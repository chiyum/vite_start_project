<template>
  <div class="home">
    <div class="home-bg-middle"></div>
    <div class="home-bg-accessory">
      <div>
        <img src="@/assets/images/svg/img_wing.svg" alt="" />
        <img src="@/assets/images/svg/img_wing.svg" alt="" />
      </div>
      <div>
        <img src="@/assets/images/svg/img_wing.svg" alt="" />
        <img src="@/assets/images/svg/img_wing.svg" alt="" />
      </div>
    </div>
    <img class="home-bg-person" src="@/assets/images/home/person.png" alt="" />
    <img class="home-bg-line" src="@/assets/images/home/bg-line.png" alt="" />
    <img
      class="home-bg-left-icon"
      src="@/assets/images/home/bg-left-top.png"
      alt=""
    />
    <img
      class="home-bg-left-string"
      src="@/assets/images/home/bg-left-bottom.png"
      alt=""
    />
    <div class="home-nav">
      <div class="home-nav-shape"></div>
      <svg class="home-nav-svg" width="75" height="75">
        <polygon points="0,0 60,0 0,75" fill="white"></polygon>
      </svg>
      <!-- <div class="home-nav-triangle"></div> -->
    </div>
    <ul class="home-nav-link">
      <li @click="changePage('/about')">{{ t("$current.nav.about") }}</li>
      <li @click="changePage('/home')">{{ t("$current.nav.home") }}</li>
      <li>
        <a href="https://github.com/chiyum/chiyum" target="_blank">{{
          t("$current.nav.more")
        }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getImageUrl } from "@/utils/getImageUrl"; // 用於獲取圖片的工具函數
import { useI18n } from "@/hooks/use-i18n"; // i18n 國際化的 hook
import { useRouter, useRoute } from "vue-router"; // vue-router 中的路由相關方法
import { loadImages } from "@/utils/loadImage"; // 自定義的圖片預載函數
import alertService from "@/services/alert-service"; // 自定義的 alert 服務

// 使用 useI18n 來獲取 t 函數和設定前綴的方法
const { t, setPrefix } = useI18n();
setPrefix({
  $current: "pages.home", // 設定翻譯前綴為 pages.home
});

// 使用 vue-router 的路由方法
const router = useRouter();
const route = useRoute();

// 控制組件是否顯示的狀態
const isComponentVisible = ref(true);

// 頁面重新加載的方法
const reload = () => {
  router.go(0); // 重新加載當前頁面
};

// 切換頁面的方法，根據路徑進行導航
const changePage = (path = "/home") => {
  if (route.path === path) reload(); // 如果當前路徑與目標路徑相同，重新加載頁面
  router.push(path); // 使用 router 導航到新路徑
};

// 重置組件，使其重新渲染一次
const resetComponent = () => {
  isComponentVisible.value = false; // 先將組件設為隱藏
  nextTick(() => {
    isComponentVisible.value = true; // 下一個 DOM 週期內再次顯示組件
  });
};

// 預加載圖片的邏輯
const preloadImages = async () => {
  const imagesToPreload = [
    getImageUrl("home/person.png"),
    getImageUrl("home/bg-master.png"),
    getImageUrl("home/bg-left-top.png"),
    getImageUrl("home/bg-left-bottom.png"),
    getImageUrl("profile/about-cover2.webp"),
    getImageUrl("svg/img_wing.svg"),
  ]; // 定義需要預加載的圖片路徑列表

  alertService.showLoading(); // 顯示載入中的提示
  await loadImages(imagesToPreload); // 等待所有圖片加載完成
  alertService.close(); // 加載完成後關閉載入提示
  resetComponent(); // 重置組件，使動畫重新播放
};

// 頁面加載時預先加載圖片
preloadImages();
</script>

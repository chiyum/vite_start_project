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
<script>
// import { onMounted, reactive } from "vue";
import { getImageUrl } from "@/unit/getImageUrl";
import { useI18n } from "@/hooks/use-i18n";
import { useRouter, useRoute } from "vue-router";
import { ref, nextTick } from "vue";
import { loadImages } from "@/unit/loadImage";
import alertService from "@/services/alert-service";

export default {
  // title: "pages.home.title",
  setup() {
    const { t, setPrefix } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const isComponentVisible = ref(true);
    setPrefix({
      $current: "pages.home",
    });
    const reload = () => {
      router.go(0);
    };

    const changePage = (path = "/home") => {
      if (route.path === path) reload();
      router.push(path);
    };

    const resetComponent = () => {
      isComponentVisible.value = false;
      nextTick(() => {
        isComponentVisible.value = true;
      });
    };
    const preloadImages = async () => {
      // 預加載的圖片路徑
      const imagesToPreload = [
        getImageUrl("home/person.png"),
        getImageUrl("home/bg-master.png"),
        getImageUrl("home/bg-left-top.png"),
        getImageUrl("home/bg-left-bottom.png"),
        getImageUrl("profile/about-cover2.webp"),
        getImageUrl("svg/img_wing.svg"),
      ];
      /** 這邊等待圖片載入完成後 關閉loading頁面 重新顯示一次動畫 */
      alertService.showLoading();
      await loadImages(imagesToPreload);
      alertService.close();
      resetComponent();
    };
    preloadImages();
    return {
      t,
      changePage,
      router,
    };
  },
};
</script>

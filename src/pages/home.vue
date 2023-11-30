<template>
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
    <ul class="home-nav-link">
      <li>{{ t("$current.nav.home") }}</li>
      <li>{{ t("$current.nav.more") }}</li>
      <li>{{ t("$current.nav.about") }}</li>
    </ul>
    <svg class="home-nav-svg" width="75" height="75">
      <polygon points="0,0 60,0 0,75" fill="white"></polygon>
    </svg>
    <!-- <div class="home-nav-triangle"></div> -->
  </div>
</template>
<script>
// import { onMounted, reactive } from "vue";
import preloadImage from "@/unit/preloadImg";
import { getImageUrl } from "@/unit/getImageUrl";
import { useI18n } from "@/hooks/use-i18n";

export default {
  // title: "pages.home.title",
  setup() {
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.home",
    });
    const preloadImages = () => {
      // 預加載的圖片路徑
      const imagesToPreload = [
        getImageUrl("home/person.png"),
        getImageUrl("home/bg-master.png"),
        getImageUrl("home/bg-left-top.png"),
        getImageUrl("home/bg-left-bottom.png"),
        getImageUrl("svg/img_wing.svg"),
      ];
      imagesToPreload.forEach((image) => {
        preloadImage(image);
      });
    };
    preloadImages();
    return {
      t,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/home.scss";
</style>

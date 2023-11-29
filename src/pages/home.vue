<template>
  <div class="home-bg-middle"></div>
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
</template>
<script>
// import { onMounted, reactive } from "vue";
import preloadImage from "@/unit/preloadImg";
import { getImageUrl } from "@/tool";
export default {
  title: "pages.home.title",
  setup() {
    const preloadImages = () => {
      // 預加載的圖片路徑
      const imagesToPreload = [
        getImageUrl("home/person.png"),
        getImageUrl("home/bg-master.png"),
      ];
      imagesToPreload.forEach((image) => {
        preloadImage(image);
      });
    };
    preloadImages();
    return {};
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/home.scss";
</style>

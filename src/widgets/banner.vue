<template>
  <Swiper
    class="banner-swiper"
    :slides-per-view="1"
    :space-between="0"
    :modules="modules"
    @swiper="onSwiper"
    :loop="true"
    pagination
    autoplay
  >
    <SwiperSlide v-for="(item, idx) in images" :key="`banner-${idx}-repeat`">
      <img
        v-lazy="{
          src: item,
          loading: beforeImage,
        }"
        :src="item"
        class="w-full h-full object-cover"
      />
    </SwiperSlide>
  </Swiper>
  <!-- 輪播圖 -->
</template>
<script>
import { ref, onMounted } from "vue";
import useI18n from "@/hooks/use-i18n";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { bannerImage } from "@/imageRouter";
import beforeImage from "@/assets/images/banner/banner_default_sm_bg.png";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const { t } = useI18n();
    const $swiper = ref();
    const images = ref(bannerImage("aPlan"));
    console.log(images);
    /* 取得Swiper 實例 */
    const onSwiper = (swiper) => {
      $swiper.value = swiper;
    };

    /* setSwiper為ios滑動時會卡頓解法 */
    function easeOut(currentTime, startValue, changeValue, duration) {
      currentTime /= duration;
      return -changeValue * currentTime * (currentTime - 2) + startValue;
    }

    function getTransitionSimulator(ele, distance, duration, callback) {
      let handle;
      let resolve;
      return () => {
        let promise = new Promise((res) => {
          resolve = res;
        });
        let startTime = performance.now();
        cancelAnimationFrame(handle);
        function _animation() {
          let current = performance.now();
          // distance to move this frame
          let disVal = easeOut(current - startTime, 0, distance, duration);

          callback(ele, disVal);
          if ((current - startTime) / duration < 1) {
            handle = requestAnimationFrame(_animation);
          } else {
            cancelAnimationFrame(handle);
            resolve();
          }
        }
        handle = requestAnimationFrame(_animation);
        return promise;
      };
    }
    const setSwiper = () => {
      $swiper.value.on("setTranslate", async (swiper, targetTransVal) => {
        const wrapper = swiper.$wrapperEl[0]; // wrapper element
        // when use transition to do animation
        if (wrapper.style.transitionDuration !== "0ms") {
          // get origin translate value
          const curTransVal = $swiper.value.getTranslate();
          // cancel the animation of transition
          wrapper.style.transitionDuration = "";
          wrapper.style.transform = `translate3d(${curTransVal}px, 0px, 0px)`;

          // use requestFrameAnimation to do animation my self
          const transSimulator = getTransitionSimulator(
            wrapper,
            targetTransVal - curTransVal,
            300,
            (el, val) => {
              el.style.transform = `translate3d(${
                curTransVal + val
              }px, 0px, 0px)`;
            }
          );
          await transSimulator();
          // End the transition, call the callback (simulate the internal implementation of Swiper)
          swiper.onSlideToWrapperTransitionEnd.call(wrapper, {
            target: wrapper,
          });
        }
      });
    };

    onMounted(() => {
      setSwiper();
    });

    return {
      images,
      beforeImage,
      modules: [Autoplay, Pagination],
      t,
      onSwiper,
    };
  },
};
</script>
<style>
/* .banner-swiper {
  height: 11rem;
} */
.swiper-pagination {
  line-height: 0;
}
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 6px;
}
.swiper-pagination-bullet {
  width: 10px;
  height: 4px;
  background: #eee;
  border-radius: 9999px;
  transform-origin: center;
  opacity: 0.8;
  transition: width cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms;
}
.swiper-pagination-bullet-active {
  width: 16px;
  background: #fff;
  opacity: 1;
}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 2px;
}
</style>

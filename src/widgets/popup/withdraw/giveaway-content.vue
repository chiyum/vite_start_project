<template>
  <div
    class="giveaway__content__reciprocal"
    v-show="isReady && !isEmptyReciprocal"
  >
    <div
      class="giveaway__content__reciprocal__icon"
      v-if="reciprocal !== t('pages.withdraw.prize.title')"
    ></div>
    <div class="giveaway__content__reciprocal__text"></div>
  </div>
  <canvas ref="animation" class="w-[16rem] h-[8rem]"></canvas>
  <div class="giveaway__content__btn" v-show="isReady">
    <div
      class="full"
      :class="{ 'leading-none': ['en', 'vi', 'en-ph'].includes(locale) }"
    ></div>
  </div>
  <div class="giveaway__content__caption" v-show="isReady">
    <div class="full"></div>
  </div>
  <div class="giveaway__loading" v-show="!isReady && isLoading"></div>
</template>

<script setup>
import { onMounted, ref, inject, computed } from "vue";
import { Rive } from "@rive-app/canvas";
import { isEmpty } from "ramda";
import { useI18n } from "@/hooks/use-i18n";
import { delay } from "@/tool";

const $ = inject("$jQuery");
const { t, locale } = useI18n();

const animation = ref(); // canvas rive載體
let rive = {};
const props = defineProps({
  btnText: String,
  caption: String,
  reciprocal: String,
});
const isEmptyReciprocal = computed(() => isEmpty(props?.reciprocal ?? ""));
// console.log(isEmptyReciprocal.value);
// console.log(props?.reciprocal);
const settingString = () => {
  $(".giveaway__content__btn div").html(props.btnText);
  $(".giveaway__content__caption div").html(props.caption);
  if (!isEmptyReciprocal.value)
    $(".giveaway__content__reciprocal__text").html(props.reciprocal);
};
const isReady = ref(false); // rive跑完才一起出現
const isLoading = ref(false); // 網路太慢才會出現loading

onMounted(async () => {
  rive = new Rive({
    canvas: animation.value,
    src: new URL("../../../assets/video/open_nobtn.riv", import.meta.url).href,
    autoplay: true,
    onLoad: async () => {
      await rive.resizeDrawingSurfaceToCanvas();
      isReady.value = true;
      settingString();
    },
  });
  await delay(1000);
  isLoading.value = true;
});
</script>

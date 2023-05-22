<template>
  <div class="title">{{ title }}</div>
  <div class="text">{{ text }}</div>
</template>

<script setup>
import { getImageUrl } from "@/tool";
import { onMounted } from "vue";

const { level } = defineProps({ text: String, level: Number, title: String });
const setLevel = () => {
  const refs = document.querySelector(".vip-popup-bg");
  console.log(level, "level");
  const image = {
    1: "img_alert_lion.png",
    2: "img_alert_phoenix.png",
    3: "img_alert_dragon.png",
  }[level];
  refs.setAttribute("src", getImageUrl(`home/${image}`));
};
onMounted(() => {
  setLevel();
});
</script>

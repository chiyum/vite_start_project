<template>
  <div class="layout-deafult-header">
    <div class="layout-deafult-header-left">
      <div class="default-icon" @click="changePage('/home')">
        <img src="@/assets/images/svg/home-2.svg" alt="" />
      </div>
      <div class="default-icon mobile-hide" @click="reload">
        <img src="@/assets/images/svg/story.svg" alt="" />
      </div>
    </div>
    <div class="layout-deafult-header-middle">{{ title }}</div>
    <div class="layout-deafult-header-right">
      <div class="default-icon paypal-icon">
        <img src="@/assets/images/svg/paypal.svg" alt="" />
        <a href="https://github.com/chiyum/chiyum" target="_blank"></a>
      </div>
      <div class="default-icon mobile-hide" @click="changeLang">
        <img src="@/assets/images/svg/world_2.svg" alt="" />
      </div>
      <!-- <div class="default-icon" @click="changeLang">
        <div class="default-icon-lang">
          {{ lang }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "@/hooks/use-i18n";

const { t, locale, change } = useI18n();
// const lang = computed(() => {
//   const fullName = locale.value;
//   switch (fullName) {
//     case "en":
//       return "EN";
//     case "zh-tw":
//       return "CN";
//   }
// });
const route = useRoute();
const router = useRouter();
const title = computed(() => t(route.meta.title ?? ""));

const changePage = (path = "/home") => {
  router.push(path);
};
const reload = () => {
  router.go(0);
};

const changeLang = () => {
  const changed = locale.value === "zh-tw" ? "en" : "zh-tw";
  change(changed);
};
</script>

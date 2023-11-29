<template>
  <div class="layout-deafult-header">
    <div class="layout-deafult-header-left">
      <div class="default-icon">
        <img src="@/assets/images/svg/home-2.svg" alt="" />
      </div>
      <div class="default-icon">
        <img src="@/assets/images/svg/story.svg" alt="" />
      </div>
    </div>
    <div class="layout-deafult-header-middle">{{ title }}</div>
    <div class="layout-deafult-header-right">
      <div class="default-icon paypal-icon">
        <img src="@/assets/images/svg/paypal.svg" alt="" />
      </div>
      <div class="default-icon">
        <img src="@/assets/images/svg/apple.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "@/hooks/use-i18n";

const { t } = useI18n();
const route = useRoute();
const title = computed(() => t(route.meta.title ?? ""));
</script>

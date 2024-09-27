<template>
  <div class="layout-demo">
    <slot />
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  layout: "layout-demo",
});
</script>

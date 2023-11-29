<template>
  <LayoutHeader />
  <div class="layout-deafult pb-32">
    <slot />
  </div>
</template>

<script>
import { useI18n } from "@/hooks/use-i18n";
import LayoutHeader from "@/widgets/layout/header.vue";
export default {
  components: {
    LayoutHeader,
  },
  setup() {
    const { t } = useI18n();
    // layout也可以做邏輯處理
    return {
      t,
    };
  },
};
</script>

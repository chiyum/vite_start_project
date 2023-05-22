<template>
  <div class="pb-32">
    <slot />
  </div>
</template>

<script>
import { useI18n } from "@/hooks/use-i18n";

export default {
  setup() {
    const { t } = useI18n();
    // layout也可以做邏輯處理
    return {
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
// @import "@/assets/scss/layout.scss";
.layout-show {
  visibility: visible;
}
.layout-hide {
  visibility: hidden;
}
.notify-tip {
  &::before {
    right: 0.4rem;
    top: 3px;
  }
  &.nav-icon {
    &::before {
      right: -4px;
      top: 2px;
    }
  }
}
</style>

<template>
  <span class="wrap">layout</span>
  <div class="pb-32">
    <slot />
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 16px;
  color: red;
}
</style>

<template>
  <div
    class="popup-modal swal2-popup swal2-modal swal2-confirm"
    tabindex="-1"
    style="display: grid"
  >
    <h2 class="swal2-title" style="display: block">
      <slot name="title"></slot>
    </h2>
    <div class="swal2-html-container" style="display: block">
      <slot name="content"></slot>
    </div>
    <div class="swal2-actions" style="display: flex">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.popup-modal .cancel-button {
  font-size: 1rem;
  padding: 0.2rem;
  flex: 1;
}

.popup-modal .confirm-button {
  color: #526fe8;
  font-size: 1rem;
  padding: 0.2rem;
  flex: 1;
}
</style>

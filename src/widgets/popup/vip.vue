<template>
  <div class="vip-popup">
    <img
      class="vip-popup-bg"
      src="@/assets/images/home/img_alert_lion.png"
      alt=""
    />
    <!-- <div class="vip-popup-title">
      <slot name="title"></slot>
    </div> -->
    <div class="vip-popup-content">
      <slot name="content"></slot>
    </div>
    <div class="vip-popup-button">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.vip-popup {
  position: relative;
  width: 15rem;
  height: 15rem;
  animation: fadeInUp 0.8s linear;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &-button,
  &-title,
  &-content {
    position: absolute;
    left: 0rem;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    color: #5c3f2c;
    text-align: center;
    font-size: 0.3rem;
  }
  &-title {
    bottom: 3.7rem;
  }
  &-content {
    padding: 0 1.27rem;
    bottom: 6.1rem;
    .title {
      margin-bottom: 0.1rem;
      line-height: 1;
    }
    .text {
      font-weight: 700;
      font-size: 0.37rem;
    }
  }
  &-button {
    bottom: 3rem;
    left: 0rem;
    width: 100%;
    .confirm-button {
      font-weight: 500;
    }
  }
}
</style>

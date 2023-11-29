<template>
  <teleport to="body">
    <transition name="popup" duration="600">
      <!-- 透過display來決定顯示與否 -->
      <div
        v-if="state.$display"
        class="fixed z-[1041] inset-0 w-full h-full flex justify-center items-center pointer-events-none"
      >
        <component
          class="popup__inner pointer-events-auto"
          :class="{ 'no-enter-animation': state?.noEnterAnimation }"
          :is="popupComp"
        >
          <template #title>
            {{ state.title }}
          </template>

          <template #content>
            <component
              v-if="state.component"
              :is="state.component"
              ref="compRef"
              v-bind="state.props"
            />
            <div v-else>
              {{ state.text }}
            </div>
          </template>

          <template v-if="state.timer && state.timerProgress" #timer>
            <!-- Date.now() + state.timer 現在時間加上指定時間則為倒數結束時間 -->
            <div
              class="timer-progress"
              :data-timer="state.timer"
              :data-end="Date.now() + state.timer"
            ></div>
          </template>

          <template #actions>
            <button
              v-if="state.showCancelButton"
              type="button"
              class="cancel-button"
              @click="onDismiss"
            >
              {{ state.cancelButtonText }}
            </button>
            <button
              v-if="state.showConfirmButton"
              type="button"
              class="confirm-button"
              @click="onConfirm"
            >
              {{ state.confirmButtonText }}
            </button>
          </template>
        </component>
      </div>
    </transition>
    <transition
      name="popup-backdrop"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-if="state.$display"
        class="popup-backdrop"
        :style="{ background: backdropStyle }"
        @click="onBackdropClick"
      ></div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, ref, markRaw, watch } from "vue";
import { usePopup } from "@/hooks/use-popup";

/** components */
import Modal from "@/widgets/popup/modal";
// import VipModal from "@/widgets/popup/vip.vue";

const popupService = usePopup();
const state = computed(() => popupService.state); // 儲存在全局的彈窗狀態

const resolve = (options) => {
  state.value.resolve({
    isConfirmed: false,
    isDismissed: false,
    dismiss: null,
    result: null,
    ...options,
  });
};

/* 外匡樣式彈窗 */
const popupComp = computed(() => {
  switch (state.value.type) {
    // case "Vip": // vip通知
    //   return markRaw(VipModal);
    default:
      return markRaw(Modal); // 預設使用sweetalert樣式
  }
});

/* 外匡樣式彈窗 */
const backdropStyle = computed(() => state.value.BackdropStyle);

/* contentComponent */
const compRef = ref();
let timerId = null;

/* 停止計時器 */
const stopTimerDesc = () => {
  clearTimeout(timerId);
  timerId = null;
};

/* autoClose or Timer發生變化時觸發 */
watch(
  [() => state.value.autoClose, () => state.value.timer],
  ([autoClose, timer]) => {
    /* 無倒數時間則不執行 */
    if (!timer) return;

    /** 怕重複觸發，先停止計時器 */
    stopTimerDesc();

    /** 計時器開始 */
    timerId = setTimeout(() => {
      stopTimerDesc();
      if (autoClose) _onReasonDismissed("timer");
      return;
    }, timer);
  }
);

/**
 * 各種 dismissed
 * @param {String} dismiss 'cancel' | 'backdrop' | 'timer'
 */
const _onReasonDismissed = async (dismiss) => {
  if (timerId) {
    /** 計時器進行中 則不可關閉*/
    if (!state.value.allowDismissWhenTimerRunning) return;
    stopTimerDesc();
  }
  /* 若元件中有onDismissed函式，則執行 這段就是在關閉的時候不同元件所執行的功能 類似sweetalert2中的willClose */
  if (compRef.value && "onDismissed" in compRef.value) {
    const result = await compRef.value.onDismissed();
    if (result) {
      /* 當resolve觸發時就表示此段promise結束 */
      resolve({
        isDismissed: true,
        dismiss,
        result,
      });
      popupService.clear();
    }
  } else {
    resolve({
      isDismissed: true,
      dismiss,
    });
    popupService.clear();
  }
};

/* 點擊背景 */
const onBackdropClick = async () => {
  /* 當不允許背景時 return */
  if (!state.value.allowOutsideClick) return;
  _onReasonDismissed("backdrop");
};

/* 按下取消 */
const onDismiss = async () => {
  _onReasonDismissed("cancel");
};

/* 按下確認 */
const onConfirm = async () => {
  /* 若倒數中 */
  if (timerId) {
    /* 若不允許倒數關閉 */
    if (!state.value.allowConfirmWhenTimerRunning) return;
    stopTimerDesc();
  }
  /* 若有content有元件 且元件內有onConfirmed屬性 利用的是vue的父直接控制子元件的功能*/
  if (compRef.value && "onConfirmed" in compRef.value) {
    const result = await compRef.value.onConfirmed();
    if (result) {
      resolve({
        isConfirmed: true,
        result,
      });
      popupService.clear();
    }
  } else {
    resolve({
      isConfirmed: true,
    });
    popupService.clear();
  }
};
</script>

<style lang="scss" scoped>
.popup-enter-active .popup__inner {
  animation-name: fadeInUp;
  animation-fill-mode: both;
  &.no-enter-animation {
    animation: none;
  }
}
.popup-leave-active .popup__inner {
  animation-name: fadeOutDown;
  animation-fill-mode: both;
}

.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.popup-backdrop-leave-to {
  animation-delay: 0.3s;
  animation-duration: 0.3s;
}
</style>

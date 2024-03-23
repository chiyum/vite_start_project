// import $ from "jquery";
export default {
  /**
   * options
   * @param {string} parent 監聽scroll的元素
   * @param {string} scrollTopPorM scroll監聽距離增加或減少
   * @param {string} targetTopPorM 監聽的dom位置增加或減少 (可以改成用0~1來處理 只是要計算 待增加
   * @param {string} useTransition 是否用transition動畫 (後續可以改用animation
   * @param {string} transitionMode transition動畫的樣式 暫時只有隱藏後續增加
   * @param {string} transitionSec transition動畫秒數
   */
  async mounted(el, binding) {
    const target = el;
    const { useTransition, transitionSec } = binding.value;
    const scrollDom = binding.value?.parent ?? window;
    const scrollTopPorM = binding.value?.scrollTopPorM ?? 0;
    const callback = binding.value?.callback ?? function () {};
    if (useTransition) el.style.transition = `all ${transitionSec ?? "0.8"}s`;
    scrollDom.addEventListener("scroll", function () {
      const targetPosition = target.offsetTop;
      const scrollPosition = document.documentElement.scrollTop + scrollTopPorM;
      if (scrollPosition >= targetPosition) {
        // 当页面滚动到 target 元素的位置时，执行一些操作
        callback();
        el.style.opacity = 0;
        // 这里可以放置你想要触发的动画或显示逻辑
      } else {
        el.style.opacity = 1;
      }
    });
  },
};

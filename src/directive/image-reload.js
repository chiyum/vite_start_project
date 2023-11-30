import $ from "jquery";
export default {
  async mounted(el, binding) {
    const height = binding.value?.height ?? "";
    const parnet = $(el.parentNode);
    const reloadElement = $(`
    <div class="reload-icon flex items-center justify-center" style="height:${height}">
      <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
      </svg>
    </div>
    `);

    /**
     * 比例的算法先跳過
     * 若要用比例，高度要先為純數字並且多出一個unit的參數？
     * 又或者是高度一樣，但使用方法將數字及單位分開(用include之類的把數字從字串抓出來)
     */
    // const countProportion = () => {
    //   const height = binding.value?.height ?? "";
    //   const proportion = binding.value?.proportion ?? "";
    //   // if (proportion !== "" && height !== ""){
    //   //   const width = proportion.split('/');
    //   //   return "";
    //   // };
    //   if (height !== "") return `height:${height}`;
    //   if (proportion !== "" && "a" === "b") return `height:${height}`;
    //   return "";
    // };

    /** 檢查圖檔URL是否有效（即圖像是否可以加載）*/
    const imageIsExist = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    /** 載入圖檔及狀態處理 */
    const loadImage = async (url) => {
      if (await imageIsExist(url)) {
        /** 若圖檔載入成功則設定src並移除reload事件 */
        el.setAttribute("src", url);
        $(el).show();
        reloadElement.off("click", reloadImage);
        parnet.find(".reload-icon").remove();
      } else {
        /** 如果圖像不存在，隱藏圖像並加入新的reload icon節點 */
        $(el).hide();
        reloadElement.on("click", reloadImage);
        parnet.append(reloadElement);
      }
    };

    /** 當點擊時重新加載圖檔 */
    const reloadImage = () => loadImage(initialImgUrl);

    // 獲取元素當前的src屬性值，即初始圖像的URL
    const initialImgUrl = el.getAttribute("src");
    // 指定重載圖像的URL

    // 如果初始圖像的URL存在
    if (initialImgUrl) {
      // 將元素的src屬性設置為null，以防止瀏覽器加載圖像
      el.src = "";
      // 嘗試加載初始圖像
      await loadImage(initialImgUrl);
    }
  },
};

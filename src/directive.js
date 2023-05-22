export default (app) => {
  app.directive("bg-image-load", {
    created(_, binding) {
      /* 預先加載低畫質圖 */
      let loadImage = new Image();
      loadImage.src = binding.value.old;
    },
    mounted(el, binding) {
      // 這邊code 有點髒 其實可以直接留customStyle就好，待後續優化
      const customStyle = binding.value?.custom ?? ""; //自定義style 可以使用權重蓋過除了圖片外的所有css
      const isCenter = binding.value?.center ?? true; //背景是否置中
      const isOriginSize = binding.value?.originSize ?? false; // 是否維持原本size 不使用滿版
      const isFixed = binding.value?.isFixed ?? false; // 是否使用position fixed
      const isBackground = binding.value?.isBg ?? false; // 是否改使用背景而非img
      const beforeStyle = binding.value?.beforeCss ?? "";
      /* 預設url (低畫質) */
      el.style = `${
        isCenter ? "background-position: center;" : ""
      }background-image: url("${binding.value.old}");position: ${
        isFixed ? "fixed" : "relative"
      };${beforeStyle}`;
      /* 因為是背景，提高同層z-index */
      for (const child of el.children) {
        child.style = `z-index: 1;position: "relative";`;
      }
      /* 因在load後還需要讓圖片完全載入，故待一秒後才使用漸進式顯示 */
      const image = new Image();
      image.addEventListener("load", function () {
        const coverImage = document.createElement(isBackground ? "div" : "img");
        if (!isBackground) coverImage.src = image.src;
        coverImage.style = `${
          isOriginSize ? "" : "width: 100%;height: 100%;object-fit: cover;"
        }z-index: 0;position: absolute;top: 0;left: 0;transition: all 1s linear;opacity: 0;${customStyle}${
          isBackground ? `background-image: url("${image.src}")` : ""
        }`;
        el.appendChild(coverImage);
        setTimeout(() => {
          coverImage.style = `${
            isOriginSize ? "" : "width: 100%;height: 100%;object-fit: cover;"
          }z-index: 0;position: absolute;top: 0;left: 0;transition: all 1s linear;opacity: 1;${customStyle}${
            isBackground ? `background-image: url("${image.src}")` : ""
          }`;
          setTimeout(() => {
            // console.log("關閉transition");
            coverImage.style.transition = "none";
          }, 100);
        }, 1000);
      });
      image.src = binding.value.cover;
    },
  });
  app.directive("image-load", {
    mounted(el, binding) {
      // console.log(el.parentElement);
      const customStyle = binding.value?.custom ?? "";
      const parentPosition = binding.value?.position ?? "relative";
      el.src = binding.value.old;
      // console.log(el.src);
      /* 預設url (低畫質)*/
      el.parentElement.style = `position: ${parentPosition};`;
      el.style = "z-index: 0;";
      const image = new Image();
      image.addEventListener("load", function () {
        console.log("load");
        const coverImage = document.createElement("img");
        coverImage.src = image.src;
        coverImage.style = `position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: -11;transition: all 1s linear;opacity: 0;${customStyle}`;
        el.parentElement.appendChild(coverImage);
        setTimeout(() => {
          coverImage.style = `position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 11;transition: all 1s linear;opacity: 1;${customStyle}`;
        }, 1000);
      });
      image.src = binding.value.cover;
    },
    // update(el) {
    //   console.log("update", el);
    // },
  });
};
// 失敗方案 一樣在show時會緩慢上至下載入
// export default (app) => {
//   app.directive("bg-image-load", {
//     mounted(el, binding) {
//       var image = new Image();
//       el.style.backgroundImage = "url(" + binding.value.old + ")";
//       // 就算使用load後，也會有顯示問題，需要再找其他方式解決
//       // 可以先讓圖片加載，之後再顯示 可以用偽元素
//       image.addEventListener("load", function () {
//         el.style.transition = "all 2s linear";
//         el.style.backgroundImage = `url("${binding.value.cover}")`;
//       });
//       image.src = binding.value.cover;
//     },
//   });
// };

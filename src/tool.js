import swal from "@/plugins/sweetalert";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import storage from "store2";

export const getImageUrl = (router) => {
  return new URL(`./assets/images/${router}`, import.meta.url).href;
};

export const openPage = (url) => {
  if (url === "") return; //空字串則return
  let isAndroid = navigator.userAgent.indexOf("Mac") === -1; //判斷裝置 有掃到Mac為 iPhone and iPad
  if (isAndroid) {
    return window.open(url);
  }
  document.location.href = url;
};

export const checkMobile = () => {
  const mobiles = [
    "Android",
    "webOS",
    "iphone",
    "iPad",
    "iPod",
    "BlackBerry",
    "windows Phone",
  ];
  let isMobile = mobiles.some((e) => {
    return navigator.userAgent.indexOf(e) !== -1;
  });
  return isMobile;
}; //用於偵測是否為行動裝置

export const toService = () => {
  let str = "";
  for (const key in store.state.app.serviceUrl) {
    const value = store.state.app.serviceUrl[key];
    const styleClass = key.split("_")[0]; //取key字串 用於設定icon樣式
    /* url不為空才加入 */
    if (value !== "")
      str += `<a class="service-list-icon ${styleClass}" target="_blank" href="${value}"></a>`;
  }
  swal.alert({
    title: i18n.t("app.page.service"),
    html: `<div class="service-list">${str}</div>`,
    confirmButtonText: i18n.t("pages.home.welcome.close"),
  });
};

export const setLang = (lang, isOrigin) => {
  const haveLangsImage = ["vi", "zh-tw", "en-ph"];
  let setLang = haveLangsImage.includes(lang) ? lang : "zh";
  if (!isOrigin) {
    switch (setLang) {
      case "en-ph":
        setLang = setLang.split("-")[1];
        break;
      case "zh-tw":
        setLang = setLang.split("-")[0];
        break;
    }
  }
  return setLang;
};

export const failprev = (title, text) => {
  swal.alert({
    title: title || i18n.t("app.dialog.system.title"),
    text: text || i18n.t("pages.trade.empty.trade"),
    willClose: () => {
      router.back();
    },
  });
};

export const financial = (x, point = 2) => {
  const hasPoint = x.toString().split(".").length > 1;
  if (hasPoint) return Number.parseFloat(x).toFixed(point);
  return x;
};

export function debounce(func, timeout = 300) {
  let timer; //利用封包儲存的函式
  /* ...args利用其餘參數將args拆成偽陣列 用於讓func接收所接收到的所有參數 因為apply第二個參數必須是陣列，故才攤開成偽陣列 */
  return (...args) => {
    clearTimeout(timer); //每次執行前先清空封包
    timer = setTimeout(() => {
      /* apply將會馬上執行func。而因為settimeout使用箭頭函數，所以apply抓到的this是調用debounce的函式 */
      func.apply(this, args);
    }, timeout);
  };
}

export const openUrl = (url, isBlank = false) => {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  if (isBlank) a.setAttribute("target", "_blank");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const crossDay = () => {
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10); // 格式化為 "YYYY-MM-DD"
  const savedDate = storage.get("crossDay"); // 取得已儲存的日期
  storage.set("crossDay", currentDate); // 設定今日日期
  /* 若無儲存日期，則直接判斷為跨日 */
  if (!savedDate) {
    return true;
  }
  /* 比較當前日期與 localStorage 中的日期 */
  const isCrossDay = currentDate !== savedDate;
  return isCrossDay;
};

export const executeCallback = async (
  callback,
  times,
  timeout = 3000,
  count = 0
) => {
  if (count >= times) {
    return false;
  }
  const result = await callback();
  if (!result) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(executeCallback(callback, times, timeout, count + 1));
      }, timeout);
    });
  }
  return true;
};

export const getNewdata = (localName, newData, judgmentName, judgmentthing) => {
  let already = storage.get(localName) || []; //取得過去存在本地的資料
  let data = [...newData]; //取得新的資料
  //儲存本帳號資訊
  let temp = {
    name: judgmentName,
    ids: [],
    index: -1,
  };
  let never = [];
  //搜尋歷史資料中是否有judgmentName，有代表本帳號有接收過類似的資訊
  let res = already.find((data, i) => {
    if (data.name === judgmentName) {
      temp.index = i; //取得index及返回
      return data;
    }
  });
  if (!res) {
    //若沒有judgmentName資料 直接返回所有新資料
    data.forEach((item) => {
      temp.ids.push(item[judgmentthing]); //儲存本次新資料的value
    });
    never = [...data];
  } else {
    temp.ids = [...res.ids]; //儲存原先歷史資料
    //跑for判斷活動id是否有在歷史資料中
    data.forEach((item) => {
      let num = 0;
      for (const id of res.ids) {
        //若沒有則push到never 用於顯示。
        if (id === item[judgmentthing]) {
          num++; //若找到重複的++
        }
      }
      //若都沒有重複的則push到顯示列表
      if (num === 0) {
        never.push(item);
        temp.ids.push(item[judgmentthing]); //儲存本次通知id，以用於下一次判斷
      }
      num = 0;
    });
  }
  // 儲存本次帳號取得過的資料
  if (temp.index !== -1) {
    already[temp.index] = temp; //若index不為空則使用取代的方式
  } else {
    already.push(temp);
  }
  console.log("寫入");
  storage.set(localName, already);
  return never; //回傳整理完成的資料
};

export const checkPhone = async (option) => {
  const { realName, env, phone } = option;
  const isKo = env === "ko";
  const isAlert = isKo ? realName || phone : phone;
  if (!isAlert) {
    return "/discount";
  }
  const { isConfirmed } = await swal.confirm({
    title: i18n.t(`app.dialog.${isKo ? "setprofile" : "setphone"}.title`),
    text: i18n.t(`app.dialog.${isKo ? "setprofile" : "setphone"}.text`),
  });
  if (!isConfirmed) return "cancel";
  const shouldRedirectToPhone = !isKo || phone;
  if (shouldRedirectToPhone) {
    return "/account/phone";
  } else {
    if (phone && realName) {
      store.commit("auth/set/nextBind", true);
    }
    return "/account/name";
  }
};

export const setString = (str, n = 2, mask = "****") => {
  const first = str.substr(0, n); // 取前 n 個字
  const last = str.substr(-n, n); // 取後 n 個字
  return `${first}${mask}${last}`;
};

export const highlightText = (elementId, searchText, color) => {
  // 獲取 DOM 元素
  let element = document.getElementById(elementId);

  // 確保元素存在並且包含文本
  if (element && element.innerHTML) {
    // 創建一個正則表達式以找到我們要突出顯示的文本
    let regex = new RegExp(searchText, "g");

    // 替換所有匹配的文本以添加高亮顯示
    element.innerHTML = element.innerHTML.replace(
      regex,
      `<span style="color: ${color}">${searchText}</span>`
    );
  }
};

export const keywordSetColor = (inputString, searchText, color) => {
  // 創建一個正則表達式以找到我們要突出顯示的文本
  let regex = new RegExp(searchText, "g");

  // 替換所有匹配的文本以添加高亮顯示
  let highlightedString = inputString.replace(
    regex,
    `<span style="color: ${color}">${searchText}</span>`
  );

  // 返回高亮字符串
  return highlightedString;
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

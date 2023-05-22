<template>
  <div class="game pt-3">
    <div v-if="!game.isDone" class="w-full flex justify-center items-center">
      <span class="loader"></span>
    </div>
    <div class="reget" v-else-if="game.origin.length === 0">
      <span>{{ t("pages.home.empty") }}</span>
      <span @click="getGame">{{ t("pages.home.fetch") }}</span>
    </div>
    <template v-else>
      <div id="game-sidebar" class="sidebar space-y-3 none pb-3">
        <div
          v-if="game.recent.length > 0"
          id="recent"
          class="item"
          @click="scrollTo('recent')"
          :class="{ 'item--active': categoryMenu.active === 'recent' }"
        >
          <span class="icon icon--recent"></span>
          <span class="item__text" :class="{ en__font: locale === 'en' }">
            {{ t("pages.home.game.recent") }}
          </span>
        </div>
        <div
          v-if="game.popular.length > 0"
          id="popular"
          class="item"
          @click="scrollTo('popular')"
          :class="{ 'item--active': categoryMenu.active === 'popular' }"
        >
          <span class="icon icon--popular"></span>
          <span class="item__text" :class="{ en__font: locale === 'en' }">
            {{ t("pages.home.game.popular") }}
          </span>
        </div>
        <div
          v-for="category in categoryMenu.filters"
          :key="category.id"
          :id="category.id"
          class="item"
          :class="{ 'item--active': categoryMenu.active === category.id }"
          @click="scrollTo(category.id)"
        >
          <span class="icon" :class="`icon--${category.icon}`"></span>
          <span class="item__text" :class="{ en__font: locale === 'en' }">
            {{ t(`pages.home.game.${category.id}`) }}
          </span>
        </div>
      </div>
      <div
        id="game-main"
        class="main space-y-3 pb-3"
        @scroll="onGameMainScroll"
      >
        <!-- 最近遊玩 -->
        <div
          v-if="game.recent.length > 0"
          id="recent"
          class="col main__platform"
        >
          <label class="flex items-center my-2">
            <span class="mr-3 w-10 h-10">
              <img
                class="relative w-full h-full"
                src="@/assets/images/game/icon_bookmark.png"
              />
            </span>
            {{ t("pages.home.game.recent") }}
          </label>
          <div class="col__scroll squ">
            <ul class="space-x-7">
              <li
                v-for="game in game.recent"
                :key="game.game"
                :class="{
                  setPosition:
                    game.img ===
                      'https://img-uat.188hub.vip/vivi/Pinnacle%20Sport2.png' ||
                    game.img ===
                      'https://img-uat.188hub.vip/vivi/Super%20Sport2.png',
                }"
                @click="toPlay(game)"
              >
                <img
                  v-lazy="{
                    src: game.img,
                    loading: getImageUrl(`game/game_default.png`),
                  }"
                />
                <div v-if="game.withoutImg" class="without__dom">
                  <div class="title">{{ game.game_lang }}</div>
                  <div class="text">{{ game.game }}</div>
                  <div class="line"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 熱門 -->
        <div
          v-if="game.popular.length > 0"
          id="popular"
          class="col main__platform"
        >
          <label class="flex items-center my-2">
            <span class="mr-3 w-10 h-10">
              <img
                class="relative w-full h-full"
                src="@/assets/images/game/icon_hot.png"
              />
            </span>
            {{ t("pages.home.game.popular") }}
          </label>
          <div class="col__scroll squ">
            <ul class="space-x-7">
              <li
                v-for="game in game.popular"
                :key="game.game"
                :class="{
                  setPosition:
                    game.img ===
                      'https://img-uat.188hub.vip/vivi/Pinnacle%20Sport2.png' ||
                    game.img ===
                      'https://img-uat.188hub.vip/vivi/Super%20Sport2.png',
                }"
                @click="toPlay(game)"
              >
                <img
                  v-lazy="{
                    src: game.img,
                    loading: getImageUrl(`game/game_default.png`),
                  }"
                />
                <div v-if="game.withoutImg" class="without__dom">
                  <div class="title">{{ game.game_lang }}</div>
                  <div class="text">{{ game.game }}</div>
                  <div class="line"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-for="(platform, idx) in game.display"
          :key="`platform--${idx}`"
          :id="platform.id"
          class="col main__platform"
        >
          <label class="flex items-center my-2">
            <span class="mr-3 w-10 h-10">
              <img
                class="relative w-full h-full"
                :src="
                  getImageUrl(`game/icon_category_${platform.category}.svg`)
                "
              />
            </span>
            {{ platform.title }}
          </label>
          <div
            class="col__scroll"
            :class="{
              rec: platform.list.length === 1,
              squ: platform.list.length > 1,
            }"
          >
            <ul class="space-x-7">
              <li
                v-for="game in platform.list"
                :key="game.game"
                class="relative w-full h-full"
                :class="{
                  setPosition:
                    game.img ===
                      'https://img-uat.188hub.vip/vivi/Pinnacle%20Sport2.png' ||
                    game.img ===
                      'https://img-uat.188hub.vip/vivi/Super%20Sport2.png',
                }"
                @click="toPlay(game)"
              >
                <img
                  v-lazy="{
                    src: game.img,
                    loading: getImageUrl(`game/game_default.png`),
                  }"
                />
                <div v-if="game.withoutImg" class="without__dom">
                  <div class="title">{{ game.game_lang }}</div>
                  <div class="text">{{ game.game }}</div>
                  <div class="line"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { inject, ref, onMounted, watch, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "@/hooks/use-i18n";
import { getImageUrl, debounce } from "@/tool";
import bng from "@/assets/images/game/api_placeholder_slot_single_bng.png";

import { categories, defaultImages } from "./constants";
import $ from "jquery";
import {
  trim,
  keys,
  filter,
  find,
  propEq,
  mapObjIndexed,
  groupBy,
  prop,
  reduce,
  map,
  addIndex,
  sort,
  pipe,
  assoc,
  take,
  reject,
} from "ramda";

const props = defineProps({
  status: Boolean,
});

const swal = inject("$swal");
const { locale, t } = useI18n();
const router = useRouter();
const store = useStore();

/** 寫入/轉換圖片 */
const setCover = (defaultImage, type = "default") => (game) => {
  let img = defaultImage;
  let withoutImg = !game.img;
  if (game.img) {
    if (
      type === "default" &&
      game.game === "lobby" &&
      game.platform === "bng"
    ) {
      /** 指定平台要替換圖片 */
      img = bng;
    } else {
      //此行是為了取代url中的空白，讓圖片可以正常顯示。
      if (game.img.indexOf("default") === -1) {
        img = game.img.split(" ").join("%20");
      } else {
        /** 預設圖片當作沒圖片 */
        withoutImg = true;
      }
    }
  }

  return {
    ...game,
    img,
    withoutImg,
  };
};

const game = reactive({
  isDone: false /** 請求狀態 */,
  origin: [] /** 儲存 api 資料 */,
  /** 最近 */
  recent: computed(() =>
    pipe(
      filter(propEq("is_recent", 1)),
      map((game) =>
        pipe(
          /** img_small 取代原本 img */
          assoc("img", game.img_small),
          setCover(defaultImages[1][game.category], "recent")
        )(game)
      ),
      sort((a, b) => +a.recent_sort - +b.recent_sort)
    )(game.origin)
  ),
  /** 熱門 */
  popular: computed(() =>
    pipe(
      filter(propEq("is_popular", 1)) /** 挑出熱門 */,
      reject(propEq("is_recent", 1)) /** 去掉最近 */,
      map((game) =>
        pipe(
          /** img_small 取代原本 img */
          assoc("img", game.img_small),
          setCover(defaultImages[1][game.category], "popular")
        )(game)
      ),
      sort((a, b) => +a.sort - +b.sort) /** 排序 */,
      take(5) /** 顯示前五筆 */
    )(game.origin)
  ),
  /** 其他 */
  display: computed(() => {
    /** 資料群組化 */
    const groupByParams = pipe(
      groupBy(prop("category")),
      mapObjIndexed(groupBy(prop("platform_lang")))
    )(game.origin);

    return reduce(
      (arr, category) => {
        const platforms = groupByParams[category.id];
        return [
          ...arr,
          ...addIndex(map)((platformLang, idx) => {
            const defaultImage =
              defaultImages[+(platforms[platformLang].length > 1)][category.id];
            return {
              id: idx === 0 ? category.id : null,
              category: category.id,
              title: platformLang,
              list: pipe(
                map(setCover(defaultImage)),
                sort((a, b) => +a.sort - +b.sort)
              )(platforms[platformLang]),
            };
          }, keys(platforms)),
        ];
      },
      [],
      categoryMenu.filters
    );
  }), //計算後的右邊遊戲列表
});

/** 左邊選單 */
const categoryMenu = reactive({
  active: "recent" /** 預設為最近 */,
  filters: computed(() => {
    /** 判斷類別存在就顯示 */
    return filter(
      (category) => !!find(propEq("category", category.id), game.origin),
      categories
    );
  }),
});

const store_game = ref("");
const isLoading = ref(false);

/** 遊戲列表 */
const toLang = () => {
  const transferSet = {
    "zh-cn": "tw",
    "zh-tw": "tw",
    en: "en",
  };
  return transferSet[trim(locale.value)] ?? "vn";
};
const getGame = async () => {
  game.isDone = false;
  game.origin = await store.dispatch("app/read/game/list", {
    lang: toLang(),
  });
  game.isDone = true;

  /** 沒有最近資料就改成熱門 */
  if (game.recent.length === 0) {
    categoryMenu.active = "popular";
  }
};

/** Banner 收合效果 */
const toggleBanner = (() => {
  const zoomout = (scrolled) => {
    /** 阻斷重複執行 */
    if ($(".home__banner").data("toggle-type") === "zoomout") return;

    /** 輪播圖收合時不讓遊戲滾動 */
    $("#game-main").css("overflow", "hidden").animate({ scrollTop: scrolled });

    /**  */
    $(".home__banner")
      .data("toggle-type", "zoomout") /** 標記上一動 */
      .data("is-scrolling", true)
      .addClass("set__hide");
    $(".home__game").addClass("set__bg");
    $(".home__marquee").addClass("set__mg");

    /** 等一下後重設 */
    setTimeout(() => {
      $(".home__banner").data("is-scrolling", false);
      $("#game-main").css("overflow", "");
    });
  };

  /** 輪播圖打開 */
  const enlarge = () => {
    /** 阻斷重複執行 */
    if ($(".home__banner").data("toggle-type") === "enlarge") return;

    /** 輪播圖收合時不讓遊戲滾動 */
    $("#game-main").css("overflow", "hidden");

    /**  */
    $(".home__banner")
      .data("toggle-type", "enlarge") /** 標記上一動 */
      .data("is-scrolling", true)
      .removeClass("set__hide");
    $(".home__game").removeClass("set__bg");
    $(".home__marquee").removeClass("set__mg");

    /** 等一下後重設 */
    setTimeout(() => {
      $(".home__banner").data("is-scrolling", false);
      $("#game-main").css("overflow", "");
    });
  };

  return () => {
    if ($(".home__banner").data("is-scrolling")) return;
    const scrolled = $("#game-main").get(0).scrollTop;
    if (scrolled > 0) {
      zoomout(scrolled);
    } else {
      enlarge();
    }
  };
})();

/** 滾動事件與監聽 */
const scrollTo = (() => {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  const cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  let requestTimer = null;
  let miniumDiff = Infinity;

  return (itemId) => {
    /** 中斷上一動 */
    cancelAnimationFrame(requestTimer);
    /** 更新選單 active */
    categoryMenu.active = itemId;
    /** 初始化比對值 */
    miniumDiff = Infinity;

    /** 標示 element 滾動狀態 */
    $("#game-main").data("is-scrolling", true);
    /** 移動 */
    $(`#game-main #${itemId}`).get(0).scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "center",
    });

    /** 檢查移動距離，取代原本的預計時間 */
    const isItemActived = (callback) => {
      const fn = () => {
        const { scrollHeight, scrollTop, clientHeight } = $("#game-main").get(
          0
        );
        /** 滑到底了 */
        if (scrollHeight - scrollTop - clientHeight <= 1) {
          callback();
          return;
        }

        /** 取得目標元件相對父元件的定位 */
        const diffOffset =
          $("#game-main").offset().top -
          $(`#game-main #${itemId}`).offset().top;

        /**
         * 取絕對值是因為上滑跟下滑的差異
         * 有一些樣式造成的小數點誤差
         */
        const absPos = Math.abs(diffOffset);
        if (miniumDiff > absPos) {
          /** 確定已取到最小值 */
          miniumDiff = absPos;
        } else if (parseInt(absPos) === 0) {
          /** 為 0 表示元件移動到目標 */
          callback();
          return;
        }

        requestTimer = requestAnimationFrame(fn);
      };
      return fn;
    };

    const callback = () => {
      toggleBanner();
      $("#game-main").data("is-scrolling", false);
    };

    requestTimer = requestAnimationFrame(isItemActived(callback));
  };
})();

const onGameMainScroll = debounce((e) => {
  /** scrollIntoView 與 onscroll 衝突，加個旗標判斷中斷 */
  if ($("#game-main").data("is-scrolling")) return;

  const { scrollHeight, scrollTop, clientHeight } = e.target;
  const isAtBottom = scrollHeight - scrollTop - clientHeight <= 1;

  /** banner effect */
  toggleBanner();

  /** 滑到底 */
  if (isAtBottom) {
    categoryMenu.active = $("#game-sidebar .item:last-child").attr("id");
    return;
  }

  /** 計算錨點 */
  $("#game-main .main__platform").each(function () {
    const id = $(this).attr("id");
    const diffOffset =
      $(this).offset().top - $("#game-main").offset().top + $(this).height();
    if (diffOffset >= 0) {
      if (id) {
        categoryMenu.active = id;

        /** 移動左選單 */
        $(`#game-sidebar #${id}`).get(0).scrollIntoView({
          block: "start",
          behavior: "smooth",
          inline: "center",
        });
      }

      /** 找到第一個就可以中斷 */
      return false;
    }
  });
}, 0);

/** 進入遊戲 */
const toPlay = async (item) => {
  if (!store.state.auth.user?.data)
    return router.push({ path: "/login", state: { from: "第一層遊戲" } });
  if (item.status === "maintaining")
    return swal.alert({ title: t("app.game.maintaining") });
  if (!props.status) {
    store_game.value = item;
    swal.showLoading();
    isLoading.value = true;
    return;
  }
  if (!isLoading.value) swal.showLoading();
  item.lang = toLang();

  let res = await store.dispatch("app/get/game", item);
  if (res !== 1) {
    let unlocked = await store.dispatch("app/set/unlock");
    if (unlocked) {
      swal.alert({
        title: t(`error.api.title`),
        text: t(`error.code.forward.-1`),
      });
    }
    if (!unlocked) {
      swal.confirm({
        title: t(`error.code.forward.-1`),
        text: t(`error.fetchMyCredit.failed`),
        confirmCallback: async () => {
          let unlocked = await store.dispatch("app/set/unlock");
          if (unlocked) {
            swal.alert({
              title: t(`pages.trade.detail.form.status.withdraw.success`),
            });
            return;
          }
          swal.alert({
            title: t(`pages.trade.detail.form.status.withdraw.fail`),
          });
        },
      });
    }
    return;
  }
  let a = document.createElement("a");
  a.href = store.state.app.gameUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  swal.close();
  // eslint-disable-next-line require-atomic-updates
  isLoading.value = false;
};

watch(
  () => props.status,
  (cur) => {
    if (cur && store_game.value !== "") {
      toPlay(store_game.value);
      store_game.value = "";
    }
  }
);

onMounted(() => {
  getGame();
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/game.scss";

.label__icon {
  width: 0.5rem;
  height: 0.5rem;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #008efd;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  opacity: 0.5;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="home__action" v-if="!isLoggedIn">
    <router-link
      class="home__action__link home__action__link--login"
      v-bg-image-load:image="{
        old: getImageUrl('home/btn_icon_register_sm2.png'),
        cover: getImageUrl('home/btn_icon_register2.png'),
      }"
      :to="{ path: '/login', state: { from: '登入按鈕' } }"
    >
      <span>
        {{ t("pages.login.title") }}
      </span>
    </router-link>
    <router-link
      v-bg-image-load:image="{
        old: getImageUrl('home/btn_icon_login_sm2.png'),
        cover: getImageUrl('home/btn_icon_login2.png'),
      }"
      class="home__action__link home__action__link--register"
      :class="{ ph: lang === 'en-ph' }"
      :to="{ path: '/signup', state: { from: '註冊按鈕' } }"
    >
      <span>
        {{ t("pages.register.title") }}
      </span>
    </router-link>
  </div>
  <!-- 會員顯示介面 -->
  <div class="home__user__action" v-else>
    <div class="user__data">
      <div class="user__account">
        <div class="account">{{ user?.account ?? "" }}</div>
        <div class="vip__bg" :class="`v${user?.vip?.vip ?? '0'}`">VIP</div>
      </div>
      <div class="user__credit">
        <div class="user__icon money"></div>
        <div>{{ parseInt(user?.credit ?? "0") }}</div>
        <div
          class="user__icon refresh"
          :class="{ turn: refreshFlag }"
          @click="onReFresh"
        ></div>
      </div>
    </div>
    <div class="user__action" :class="{ ph: locale.value === 'en-ph' }">
      <router-link to="/withdraw" class="item">
        <div
          class="user__icon withdraw"
          :class="{ 'notify-tip red': tips.withdraw }"
        ></div>
        <div>
          {{ t("app.menu.info.withdraw") }}
        </div>
      </router-link>
      <router-link to="/discount" class="item">
        <div
          class="user__icon promotion"
          :class="{ 'notify-tip red': tips.discount }"
        ></div>
        <div>
          {{ t("app.menu.info.activity") }}
        </div>
      </router-link>
      <router-link to="/recommend" @click="onForwardRecommend" class="item">
        <div
          class="user__icon commission"
          :class="{ 'notify-tip red': tips.promote }"
        ></div>
        <div>
          {{ t("app.menu.info.promote") }}
        </div>
      </router-link>
      <router-link to="/ranking" class="item">
        <div class="user__icon chart"></div>
        <div>
          {{ t("app.menu.info.ranking") }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from "@/tool";
import { useI18n } from "@/hooks/use-i18n";
import { computed, reactive, inject } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  refreshFlag: Boolean,
});
const emit = defineEmits(["update:refreshFlag"]);
const { t, locale } = useI18n();
const store = useStore(); //取得store
const swal = inject("$swal");
const user = computed(() => store.state.auth.user?.data ?? {});
const isLoggedIn = computed(() => store.getters["auth/isLogin"]);
const tips = reactive({
  discount: computed(
    () =>
      store.getters["app/isTip"]("promote") ||
      store.getters["app/isTip"]("promote_map")
  ),
  withdraw: computed(
    () =>
      store.getters["app/isTip"]("wash_amount_complete") ||
      store.getters["app/isTip"]("activity_wash_amount")
  ),
  deposit: computed(() => store.getters["app/isTip"]("deposit")),
  promote: computed(() => store.getters["app/isTip"]("promotion_mia")),
});
const onReFresh = async () => {
  if (props.refreshFlag) return;
  emit("update:refreshFlag", true);
  const unlock = await store.dispatch("app/set/unlock");
  const data = unlock && (await store.dispatch("auth/read/user"));
  const textType = data ? "refreshSuc" : "refreshFail";
  swal.alert({
    title: t("app.dialog.system.title"),
    text: t(`pages.promote.${textType}`),
  });
  emit("update:refreshFlag", false);
};

const onForwardRecommend = () => {
  store.dispatch("app/read/recommendIndex", 1);
};
</script>

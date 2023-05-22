<template>
  <Banner />
  <div class="home">
    <div class="home-head">
      {{ t("pages.home.in.home") }} / lang:{{ locale }}
    </div>
    <div class="home-actions">
      <router-link to="/login" class="home-actions-btn"
        ><span>
          {{ t("pages.home.router.link") }}
        </span></router-link
      >
      <button class="home-actions-btn" @click="toLogin">
        <span>{{ t("pages.home.router.link") }}</span>
      </button>
      <button class="home-actions-btn" @click="swalModal">
        <span>{{ t("pages.home.modal.swal") }}</span>
      </button>
      <button class="home-actions-btn" @click="popupModal">
        <span>
          {{ t("pages.home.modal.vip") }}
        </span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useI18n } from "@/hooks/use-i18n";
import { useRouter } from "vue-router";
import { usePopup } from "@/hooks/use-popup";
import { useAlert } from "@/hooks/use-alert";
import VipContentModal from "@/widgets/popup/home/vip-content.vue";
import Banner from "@/widgets/banner.vue";
const popup = usePopup();
const { t, locale, setPrefix } = useI18n();
setPrefix({
  $current: "pages.home",
});
const router = useRouter();
const swal = useAlert();
const popupModal = async () => {
  await popup.vip({
    component: VipContentModal,
    props: {
      title: t("pages.home.notify.vip.title"),
      text: "VIP 1",
      level: 1,
    },
  });
};
const toLogin = () => {
  router.push("/login");
};
const swalModal = () => {
  swal.alert({
    title: t("$current.modal.swal.title"),
    text: t("$current.modal.swal"),
  });
};
onMounted(() => {});
</script>
<style lang="scss">
@import "@/assets/scss/home.scss";
</style>

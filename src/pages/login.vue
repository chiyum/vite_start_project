<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    {{ t("app.login") }}
  </div>
</template>
<script>
import { reactive, computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
// import storage from "store2";
import { useRouter } from "vue-router";

export default {
  layout: "layout-login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const swal = inject("$swal");
    const storage = inject("$storage");
    const env = computed(() => store.state.app.env);
    const form = reactive({
      invalid: computed(() => form.username === "" || form.password === ""),
      username: "",
      password: "",
      autocompleteList: [],
      isRemember: true,
      find: {},
    });
    const updateUser = () => {
      store.dispatch("auth/read/user").then((data) => {
        if (data) {
          router.push({ path: "/home", query: { loading: true } });
        } else {
          swal.alert({ title: t("error.code.login.-1") });
        }
      });
      // 主要會等action回傳更新成功與否的結果來決定是回首頁還是跳失敗彈窗Ｓ％％
    };

    const onSubmit = async () => {
      if (form.invalid) return false;
      swal.showLoading();
      const isLoggedIn = await store.dispatch("auth/login", {
        account: form.username,
        password: form.password,
      });
      //呼叫action的login 若登入成功會回傳true

      if (isLoggedIn) {
        //因為利用await的關係 所以會等到執行action完成以後才進行判斷
        console.log("logged in");

        // 若有點選記住密碼
        if (form.isRemember) {
          // 篩選出不屬於此次登入的帳密
          let storeList = form.autocompleteList.filter(
            (item) => item.account !== form.username
          );
          // 儲存至local
          storage.set("passwordList", [
            ...storeList,
            { account: form.username, password: form.password },
          ]);
        }

        /**
         * @TODO
         * 拿資料準備導向
         * 1. 個人資料
         * 2. 提款資料
         * 3. 銀行卡
         * 4. 消息
         */
        updateUser();
      } else {
        /**
         * @TODO
         * 不能登入的: 確認是否他站老玩家
         */

        // 登入失敗提示
        await swal.alert({ title: t("error.code.login.-1") });
        clearPassword();
      }
    };

    const clearPassword = () => {
      form.password = "";
    };

    const getStorePassword = () => {
      form.autocompleteList = storage.get("passwordList") || [];
    };

    /* 自動填入 */
    const autofillin = () => {
      // 找尋儲存的陣列中是否有該帳號
      const find = form.autocompleteList.find(
        (item) => item.account === form.username
      );
      // 無則不做任何動作 有則自動填入密碼
      if (!find) return;
      form.find = { ...find };
      form.password = find.password;
    };

    onMounted(() => {
      getStorePassword();
    });
    return {
      t,
      env,
      form,
      onSubmit,
      autofillin,
    };
  },
};
</script>

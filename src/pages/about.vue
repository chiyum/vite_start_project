<template>
  <div>分頁</div>
  <router-link to="/home">到分頁</router-link>
  <div>{{ helloword }}</div>
  <input type="text" v-model="enter" />
  <div class="btn" @click="setInput">改變文字</div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const enter = ref("");
    const helloword = computed(() => store.state.app.helloword);
    const setInput = () => {
      console.log(enter.value);
      store.commit("app/set/helloword", enter);
      console.log(helloword.value);
    };
    return {
      enter,
      helloword,
      setInput,
    };
  },
};
</script>
<style lang="scss">
.home {
  font-size: 16px;
  color: red;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: 100px;
  border: 1px solid;
  border-radius: 9999px;
}
</style>

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { isEmpty } from "ramda";

export const useAuthStore = defineStore("counter", () => {
  const count = ref(0);
  const userData = ref({}); // state variable
  const isLoggedIn = computed(() => !isEmpty(userData)); // getter
  async function login() {
    userData.value = {
      username: "test",
    };
  }
  async function logout() {
    userData.value = {};
  }

  return { count, isLoggedIn, login, logout };
});

// import axios from "@/axios";

const actions = {
  "read/recommendIndex"({ commit }, payload) {
    commit("set/recommendIndex", payload);
  },
};

export default actions;

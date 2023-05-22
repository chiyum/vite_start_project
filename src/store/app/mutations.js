const mutations = {
  /** popup */
  "set/popup"(state, payload) {
    state.popupState = {
      ...payload,
      $display: true,
      $timestamp: Date.now(),
    };
  },
  "clear/popup"(state) {
    state.popupState = {
      $display: false,
      $timestamp: -1,
    };
  },
};

export default mutations;

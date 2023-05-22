const getters = {
  isTip: (state) => (type) => {
    const find = state.tips.findIndex((item) => item.type === type);
    // console.log(find, "find", state.tips);
    return find !== -1;
  },
  getTypeFirstItem: (state) => (type) => {
    return state.tips.find((item) => item.type === type);
  },
  getHadValueTypeFirstItem: (state) => (type) => {
    return state.tips.find((item) => item.type === type && item.msg !== "");
  },
};

export default getters;

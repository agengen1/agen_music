export default {
  namespaced: true,
  state: {
    showSeting: false, //true表示打开设置
  },
  mutations: {
    SETSHOWSETING(state, val) {
      // 设置打开设置
      state.showSeting = val;
    },
  },
};

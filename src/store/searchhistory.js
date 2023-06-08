export default {
  namespaced: true,
  state: {
    searchhistorylist: JSON.parse(localStorage.getItem("SearchHistory")) || [], //搜索历史记录
  },
  mutations: {
    SHIFTSEARCHHISTORY(state, val) {
      // 添加搜索历史
      if (!state.searchhistorylist || state.searchhistorylist.length <= 0) {
        state.searchhistorylist = [val];
      } else {
        let new_arr = state.searchhistorylist.filter((e) => {
          return e != val;
        });
        state.searchhistorylist = [val, ...new_arr];
      }
      // 搜索历史本地储存
      localStorage.setItem(
        "SearchHistory",
        JSON.stringify(state.searchhistorylist)
      );
    },
    DELETESEARCHHISTORY(state, val) {
      // 删除某个搜索历史
      let new_ar = state.searchhistorylist.filter((e) => {
        return e != val;
      });
      state.searchhistorylist = [...new_ar];
      // 搜索历史本地储存
      localStorage.setItem(
        "SearchHistory",
        JSON.stringify(state.searchhistorylist)
      );
    },
    DELETEALLSEARCHHISTORY(state) {
      // 删除全部搜索历史
      state.searchhistorylist = [];
      // 搜索历史本地储存
      localStorage.setItem(
        "SearchHistory",
        JSON.stringify(state.searchhistorylist)
      );
    },
    SETSEARCHHISTORYLIST(state) {
      // 清除缓存
      state.searchhistorylist = [];
    },
  },
};

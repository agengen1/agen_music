import { getLoginStatusapi } from "@/api/user";
export default {
  namespaced: true,
  state: {
    islogin_status: false, //表示账号是否登录 true登录   false未登录
    userinfo: {}, //用户信息
    userPlaylist: [], //用户歌单
    userId: "", //用户ID
  },
  actions: {
    async getlogin_status(contetx) {
      let time = Date.now();
      const { data: res } = await getLoginStatusapi(time);
      if (res.data.code === 200 && res.data.account.status === 0) {
        contetx.commit("SETISLOGIN_STATUS", true);
      } else {
        contetx.commit("SETISLOGIN_STATUS", false);
      }
    },
  },
  mutations: {
    SETISLOGIN_STATUS(state, val) {
      // 设置登录状态
      state.islogin_status = val;
    },
    SETUSERINFO(state, valobj) {
      // 设置用户信息
      state.userinfo = valobj;
    },
    SETUSERPLAYLIST(state, valarr) {
      // 设置用户歌单
      state.userPlaylist = valarr;
    },
    SETUSERID(state, val) {
      // 设置用户id
      state.userId = val;
    },
  },
};

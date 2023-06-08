import { getSingingListLabelapi } from "@/api/playlistApi";
export default {
  namespaced: true,
  state: {
    label: {
      my_SingingListLadel: JSON.parse(
        localStorage.getItem("my_SingingListLadel")
      ) || [
        {
          name: "推荐",
          hot: false,
          isDelete: false,
        },
        {
          name: "官方",
          hot: false,
          isDelete: false,
        },
        {
          name: "精品",
          hot: false,
          isDelete: false,
        },
      ], //我的歌单标签
      languagesLabel: [], //语种 0
      styleLabel: [], //风格 1
      sceneLabel: [], //场景 2
      feelingLabel: [], //情感 3
      themeLabel: [], //主题 4
    },
  },
  actions: {
    async getSingingListLabel(context) {
      const { data: res } = await getSingingListLabelapi();
      if (res.code === 200) {
        context.commit("SETSINGINGLISTADEL", res.sub);
      }
    },
  },
  mutations: {
    SETSINGINGLISTADEL(state, arr) {
      // 设置每个区域的标签
      let obj;
      arr.forEach((e) => {
        if (e) {
          obj = {
            name: e.name,
            hot: e.hot,
            isDelete: true,
          };
          if (e.category == 0) {
            state.label.languagesLabel.push(obj);
          } else if (e.category == 1) {
            state.label.styleLabel.push(obj);
          } else if (e.category == 2) {
            state.label.sceneLabel.push(obj);
          } else if (e.category == 3) {
            state.label.feelingLabel.push(obj);
          } else if (e.category == 4) {
            state.label.themeLabel.push(obj);
          }
        }
      });
    },
    PUSHSINGINGLISTLABEL(state, obj) {
      // 添加歌单标签到我的歌单广场
      let arr = state.label.my_SingingListLadel.filter((e) => {
        return e.name != obj.name;
      });
      state.label.my_SingingListLadel = [...arr, obj];
      // 本地储存歌单标签
      localStorage.setItem(
        "my_SingingListLadel",
        JSON.stringify(state.label.my_SingingListLadel)
      );
    },
    DELETESINGINGLISTLABEL(state, obj) {
      // 删除歌单标签
      let arr = state.label.my_SingingListLadel.filter((e) => {
        return e.name != obj.name;
      });
      state.label.my_SingingListLadel = [...arr];
      // 本地储存歌单标签
      localStorage.setItem(
        "my_SingingListLadel",
        JSON.stringify(state.label.my_SingingListLadel)
      );
    },
    SETMY_SINGINGLISTLABEL(state, arr) {
      // 清除缓存
      state.label.my_SingingListLadel = arr;
    },
  },
};

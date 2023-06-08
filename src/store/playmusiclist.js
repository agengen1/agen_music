export default {
  namespaced: true,
  state: {
    playmusicList: JSON.parse(localStorage.getItem("PlayMusic")) || [], //播放列表储存
    playmusicCount: parseInt(localStorage.getItem("PlayMusicCount")) || 0, //播放音乐下标
    isplayButton: true, //播放按钮状态 true表示暂停
    showMusicdetails: false, // 歌曲详情页显示状态
    showMusicPlaylist: false, // 歌曲播放列表显示状态
    cilckMusicId: 0, //点击歌曲的Id
    musicSongWords: [], //音乐歌词
    playTime: 0, //现在播放进度时间
    playTimeAll: 5, //歌曲完整时长 默认值5
    showSongWords: false, //歌词显示状态
  },
  mutations: {
    SETPLAYMUSICCOUNT(state, val) {
      // 设播放音乐下标
      state.playmusicCount = val;
    },
    SETISPLAYBUTTON(state, val) {
      //修改播放按钮状态
      state.isplayButton = val;
    },
    SETCLICKMUSICID(state, val) {
      //修改点击歌曲的Id
      state.cilckMusicId = val;
    },
    SETSHOWMUSICDETAILS(state, val) {
      //修改歌曲详情页显示状态
      state.showMusicdetails = val;
    },
    SETSHOWMUSICPLAYLIST(state, val) {
      //修改歌曲播放列表显示状态
      state.showMusicPlaylist = val;
    },
    PUSHMUSIC(state, val) {
      // 添加音乐
      let count;
      state.playmusicList.forEach((e, i) => {
        if (e.id === val.id) {
          return (count = i);
        }
      });
      if (count !== undefined) {
        state.playmusicCount = count;
      } else {
        state.playmusicList.push(val);
        state.playmusicCount = state.playmusicList.length - 1;
      }
      // 音乐列表本地储存
      localStorage.setItem("PlayMusic", JSON.stringify(state.playmusicList));
    },
    PUSHALLMUSIC(state, val) {
      // 播放全部，添加全部歌单音乐
      let arr = [];
      state.playmusicList.forEach((e) => {
        if (
          !val.some((ee) => {
            return e.id == ee.id;
          })
        ) {
          arr.push(e);
        }
      });
      state.playmusicList = [...arr, ...val];
      state.playmusicCount = state.playmusicList.length - val.length;
      // 音乐列表本地储存
      localStorage.setItem("PlayMusic", JSON.stringify(state.playmusicList));
    },
    PRESONG(state) {
      // 歌单详情中点击上一首
      let nowIndex = 0;
      let preMusicID = 0;
      state.playmusicList.filter((e, i) => {
        if (e.id == state.cilckMusicId) {
          nowIndex = i;
          return true;
        }
      });
      nowIndex -= 1;
      if (nowIndex < 0) {
        state.playmusicCount = state.playmusicList.length - 1;
      } else {
        state.playmusicCount = nowIndex;
      }

      preMusicID = state.playmusicList[state.playmusicCount].id;
      state.cilckMusicId = preMusicID;
    },
    NEXTSONG(state) {
      // 歌单详情中点击下一首
      let nowIndex = 0;
      let nextMusicID = 0;
      state.playmusicList.filter((e, i) => {
        if (e.id == state.cilckMusicId) {
          nowIndex = i;
          return true;
        }
      });
      nowIndex += 1;
      if (nowIndex > state.playmusicList.length - 1) {
        state.playmusicCount = 0;
      } else {
        state.playmusicCount = nowIndex;
      }
      nextMusicID = state.playmusicList[state.playmusicCount].id;
      state.cilckMusicId = nextMusicID;
    },
    DELETEMUSIC(state, val) {
      // 通过id删除播放音乐列表中此id歌曲
      let arr = state.playmusicList.filter((e) => {
        return e.id != val;
      });
      state.playmusicList = arr;
      // 音乐列表本地储存
      localStorage.setItem("PlayMusic", JSON.stringify(state.playmusicList));
    },
    SETMUSICSONGWORDS(state, val) {
      // 设置音乐歌词
      state.musicSongWords = val;
    },
    SETPLAYTIME(state, val) {
      // 设置现在播放进度时间
      state.playTime = val;
    },
    SETPLAYTIMEALL(state, val) {
      // 设置歌曲完整时长
      state.playTimeAll = val;
    },
    SETSHOWSONGWORDS(state, val) {
      // 设置歌词显示状态
      state.showSongWords = val;
    },
    SETCLEARMUSICLISTCOUNT(state) {
      // 清除缓存
      state.playmusicList = [];
      state.playmusicCount = 0;
    },
  },
};

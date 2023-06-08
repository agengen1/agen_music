<template>
  <div class="musicdetails">
    <van-nav-bar class="header" fixed>
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="downMusic"></i>
        <div class="title">
          <van-notice-bar
            background="transparent"
            color="#fff"
            :speed="30"
            scrollable
            :text="musicInfo.name"
          />
          <span>{{ musicInfo.ar | joinName }}</span>
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-fenxiang"></i>
      </template>
    </van-nav-bar>
    <img :src="musicInfo.al.picUrl" class="backimg" />
    <div class="player" v-show="!this.showSongWords">
      <div class="disc" :class="{ disc_status: !isplayButton }">
        <img :src="musicInfo.al.picUrl" alt="" />
      </div>
      <div class="disc_needle" :class="{ disc_needle_status: !isplayButton }">
        <img src="@/assets/musicPointer.png" alt="" />
      </div>
    </div>
    <div class="songwords" v-show="this.showSongWords" ref="MusicSong">
      <p
        v-for="item in musicSongWords"
        :key="item.now_allmill"
        :class="{
          playWords:
            item.now_allmill <= parseInt(playTime) * 1000 &&
            item.next_allmill >= parseInt(playTime) * 1000,
        }"
      >
        {{ item.words }}
      </p>
    </div>
    <div class="progBar">
      <input type="range" min="0" :max="playTimeAll" :value="playTime" />
      <p>
        <span>{{ playTime | changeTime }}</span
        ><span>{{ playTimeAll | changeTime }}</span>
      </p>
    </div>
    <div class="footerPlay">
      <i
        class="iconfont icon-danchuang_quanpinggeci_sousuogeci_"
        :class="{ red: this.showSongWords }"
        @click="showSongwords"
      ></i>
      <i class="iconfont icon-shangyishouge" @click="perMusic"></i>
      <i v-if="isplayButton" class="iconfont icon-bofang1" @click="play"></i>
      <i v-else class="iconfont icon-zanting" @click="play"></i>
      <i class="iconfont icon-xiayishou" @click="nextMusic"></i>
      <i class="iconfont icon-yinleliebiao"></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authorMinxin from "@/utils/AuthorPocessMixin";
import { getMusicSongWordsapi } from "@/api/playlistApi";
export default {
  name: "musicdetails",
  props: ["play", "id"],
  mixins: [authorMinxin],
  data() {
    return {};
  },
  methods: {
    // 关闭歌曲详情
    downMusic() {
      this.SETSHOWMUSICDETAILS(false);
    },
    // 上一首音乐
    perMusic() {
      this.PRESONG();
    },
    // 下一首音乐
    nextMusic() {
      this.NEXTSONG();
    },
    // 显示、隐藏歌词
    showSongwords() {
      if (this.showSongWords) {
        this.SETSHOWSONGWORDS(false);
      } else {
        this.SETSHOWSONGWORDS(true);
      }
    },
    // 获取歌词及处理
    async getMusicSongWords(id) {
      const { data: res } = await getMusicSongWordsapi(id);
      if (res.code === 200) {
        let lyric_arr = res.lrc.lyric.split("\n");
        lyric_arr.pop();
        let new_arr = [];
        lyric_arr.forEach((e) => {
          let min = e.slice(1, 3);
          let sec = e.slice(4, 6);
          let mill = e.slice(7, 10);
          let words = e.slice(11, e.length);
          if (mill[mill.length - 1] == "]") {
            mill = e.slice(7, 9);
            words = e.slice(10, e.length);
          }
          let now_allmill =
            parseInt(min) * 60000 +
            parseInt(sec) * 1000 +
            parseInt(mill) -
            1500;
          new_arr.push({
            min: parseInt(min),
            sec: parseInt(sec),
            mill: parseInt(mill),
            words,
            now_allmill,
          });
        });
        new_arr = new_arr.filter((e) => {
          return e.words != "";
        });
        new_arr.forEach((e, i) => {
          if (i + 1 >= new_arr.length) {
            e.next_allmill = new_arr[i].now_allmill + 100000;
          } else {
            e.next_allmill = new_arr[i + 1].now_allmill;
          }
        });
        this.SETMUSICSONGWORDS(new_arr);
      }
    },
    ...mapMutations("playmusic", [
      "SETSHOWMUSICDETAILS",
      "PRESONG",
      "NEXTSONG",
      "SETMUSICSONGWORDS",
      "SETSHOWSONGWORDS",
    ]),
  },
  computed: {
    ...mapState("playmusic", [
      "playmusicList",
      "isplayButton",
      "musicSongWords",
      "playTime",
      "showSongWords",
      "playTimeAll",
    ]),
    musicInfo() {
      let arr = this.playmusicList.filter((e) => {
        return e.id == this.id;
      });
      return arr[0];
    },
  },
  watch: {
    id: {
      handler() {
        this.getMusicSongWords(this.id);
      },
      immediate: true,
    },
    playTime() {
      let p = document.querySelector(".playWords");
      if (p) {
        this.$refs.MusicSong.scrollTop = p.offsetTop - 230;
      }
    },
  },
  filters: {
    changeTime(val) {
      // 转换为式分秒
      let m = parseInt((val / 60) % 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt(val % 60);
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  height: 60px;
}
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
/deep/ .van-notice-bar {
  width: 140px;
  height: 24px;
  padding: 0;
  font-size: 18px;
}
.musicdetails {
  padding: 60px 0 0;
  height: 100vh;
  position: relative;
  .header {
    background-color: transparent;
    i {
      font-size: 22px;
      color: #fff;
    }
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        font-size: 12px !important;
        text-align: left;
        font-family: "黑体";
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
    /deep/.van-nav-bar__left {
      i {
        margin-right: 12px;
      }
      span {
        font-size: 16px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
  .backimg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -20;
    filter: blur(40px);
    transform: scale(1.5);
  }
  .player {
    position: relative;
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    .disc {
      width: 250px;
      height: 250px;
      background-image: url("@/assets/musicDisc.png");
      background-repeat: no-repeat;
      background-size: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
      }
    }
    .disc_status {
      animation: playMusicRevolveDisc 20s linear infinite;
    }
    .disc_needle {
      position: absolute;
      top: 0;
      left: 47%;
      transform-origin: 20px 20px;
      transform: rotate(-15deg);
      transition: all 0.5s;
      img {
        height: 160px;
      }
    }
    .disc_needle_status {
      transform: rotate(4deg);
    }
  }
  .songwords {
    width: 100%;
    height: 450px;
    padding: 15px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      padding: 10px 0;
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
    .playWords {
      font-size: 20px;
      color: red;
    }
  }
  .progBar {
    position: absolute;
    left: 0;
    bottom: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
    height: 60px;
    input {
      width: 100%;
      height: 4px;
    }
    p {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      span {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .footerPlay {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    padding: 0 10px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      font-size: 28px;
      color: #fff;
      &:nth-child(3) {
        font-size: 42px;
      }
    }
    .red {
      color: red;
    }
  }
  @keyframes playMusicRevolveDisc {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
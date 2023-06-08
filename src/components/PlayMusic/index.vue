<template>
  <div
    class="playmusic"
    :class="{
      bottomPlay:
        $route.path == '/layout/user' || $route.path == '/layout/music',
    }"
    v-if="playmusicList.length > 0"
  >
    <div class="left">
      <img
        :src="playmusicList[playmusicCount].al.picUrl"
        :class="{ playMusicRev: !isplayButton }"
      />
    </div>
    <p @click="showSet(playmusicList[playmusicCount].id)">
      {{ playmusicList[playmusicCount].name }}
    </p>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playmusicList[playmusicCount].id}.mp3`"
    ></audio>
    <div class="right">
      <i
        v-if="isplayButton"
        @click="musicPlay"
        class="iconfont icon-bofang"
      ></i>
      <i v-else @click="musicPlay" class="iconfont icon-ZanTing"></i>
      <i class="iconfont icon-yinleliebiao" @click="showMusiclist"></i>
    </div>
    <!-- 歌曲详情弹出 -->
    <van-popup
      v-model="showMusicdetails"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      ><MUSICDETAILS
        :play="musicPlay"
        :id="cilckMusicId"
        v-if="showMusicdetails"
    /></van-popup>
    <!-- 歌曲播放列表弹出 -->
    <van-popup
      v-model="showMusicPlaylist"
      position="bottom"
      @click-overlay="downMusicPlay"
      round
      :style="{ height: '70%', width: '100%' }"
      ><MUSICLIST v-if="showMusicPlaylist"
    /></van-popup>
  </div>
</template>

<script>
import MUSICDETAILS from "@/components/MusicDetails/index.vue";
import MUSICLIST from "@/components/MusicList/index.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "playmusic",

  data() {
    return {
      MusicTimer: null,
    };
  },
  computed: {
    ...mapState("playmusic", [
      "playmusicList",
      "playmusicCount",
      "isplayButton",
      "cilckMusicId",
      "playTime",
      "playTimeAll",
    ]),
    showMusicdetails: {
      get() {
        return this.$store.state.playmusic.showMusicdetails;
      },
      set(val) {
        this.SETSHOWMUSICDETAILS(val);
      },
    },
    showMusicPlaylist: {
      get() {
        return this.$store.state.playmusic.showMusicPlaylist;
      },
      set(val) {
        this.SETSHOWMUSICPLAYLIST(val);
      },
    },
  },
  methods: {
    // 设置播放按钮状态等方法
    ...mapMutations("playmusic", [
      "SETISPLAYBUTTON",
      "SETSHOWMUSICDETAILS",
      "SETSHOWMUSICPLAYLIST",
      "SETCLICKMUSICID",
      "SETPLAYTIME",
      "SETPLAYTIMEALL",
      "SETPLAYMUSICCOUNT",
    ]),
    //点击按钮播放或暂停
    musicPlay() {
      if (this.$refs.audio.paused) {
        //true表示暂停了，现在需要播放
        this.$refs.audio.play();
        this.updateRegularTime();
        this.SETISPLAYBUTTON(false);
      } else {
        //false表示在播放了，现在需要暂停
        this.$refs.audio.pause();
        this.SETISPLAYBUTTON(true);
        clearInterval(this.MusicTimer);
      }
    },
    // 点击播放列表 显示与隐藏
    showMusiclist() {
      if (this.showMusicPlaylist) {
        this.SETSHOWMUSICPLAYLIST(false);
      } else {
        this.SETSHOWMUSICPLAYLIST(true);
      }
    },
    // 点击播放列表 遮罩层 隐藏播放列表
    downMusicPlay() {
      this.SETSHOWMUSICPLAYLIST(false);
    },
    //点击显示歌曲详情页
    showSet(id) {
      this.SETCLICKMUSICID(id);
      this.SETSHOWMUSICDETAILS(true);
    },
    // 每隔一秒将进度播放时间保存
    updateRegularTime() {
      this.MusicTimer = setInterval(() => {
        this.SETPLAYTIME(this.$refs.audio.currentTime);
        if (this.playTime >= this.playTimeAll) {
          if (this.playmusicCount + 1 > this.playmusicList.length - 1) {
            this.SETPLAYMUSICCOUNT(0);
          } else {
            this.SETPLAYMUSICCOUNT(this.playmusicCount + 1);
          }
        }
      }, 1000);
    },
  },
  watch: {
    playmusicCount() {
      this.$refs.audio.autoplay = true;
      this.SETCLICKMUSICID(this.playmusicList[this.playmusicCount].id);
      this.updateRegularTime();
      // 播放下标本地储存
      localStorage.setItem("PlayMusicCount", this.playmusicCount);
      if (this.$refs.audio.paused) {
        //true表示暂停了，现在需要播放
        this.SETISPLAYBUTTON(false);
      } else {
        clearInterval(this.MusicTimer);
      }
    },
    cilckMusicId() {
      setTimeout(() => {
        this.SETPLAYTIMEALL(this.$refs.audio.duration);
        if (isNaN(this.playTimeAll)) {
          this.$notify({
            type: "danger",
            message: "此歌曲存在跨域问题！自动播放下一首！",
            duration: 2000,
          });
          if (this.playmusicCount + 1 > this.playmusicList.length - 1) {
            this.SETPLAYMUSICCOUNT(0);
          } else {
            this.SETPLAYMUSICCOUNT(this.playmusicCount + 1);
          }
        }
      }, 2000);
    },
  },
  components: {
    MUSICDETAILS,
    MUSICLIST,
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-popup--right {
  overflow: hidden;
}
/deep/ .van-hairline--top-bottom::after {
  border: 0;
}
.playmusic {
  border-top: 1px solid #f1f1f1;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding-left: 10px;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  background-color: #f8f8f8f2;
  z-index: 1000;
  display: flex;
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    width: 60px;
    img {
      border-radius: 50px;
      object-fit: cover;
      width: 70%;
      height: 70%;
    }
  }
  .playMusicRev {
    animation: playImgRev 20s linear infinite;
  }
  p {
    flex: 1;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
  }
  .right {
    justify-content: space-around;
    width: 100px;
    i {
      font-size: 24px;
      color: red;
    }
  }
}
.bottomPlay {
  bottom: 50px;
}
@keyframes playImgRev {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div class="recommend">
    <van-nav-bar class="header" fixed :class="{ showBack: showHeaderBack }">
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <div class="hNav">
          <p
            :class="{ white: !showRecommend, black: showRecommend }"
            @click="clickShowRecommend"
          >
            推荐音乐
          </p>
          <p
            :class="{ white: showRecommend, black: !showRecommend }"
            @click="clickShowRecommend"
          >
            推荐歌单
          </p>
          <span
            :class="{ toright: !showRecommend, toleft: showRecommend }"
          ></span>
        </div>
      </template>
    </van-nav-bar>
    <div class="recommendMusic" v-if="showRecommend">
      <div class="backimg">
        <p>
          <span>{{ todayTime[1] }}</span> /
          <span>{{ todayTime[0] }}</span>
        </p>
        <p>清晨有光，我在路上，奔向远方。</p>
      </div>
      <div class="musicList">
        <van-sticky :offset-top="46">
          <div class="playAllMuisc">
            <p>
              <van-icon name="play-circle" @click="playAllMusic" />
              <span @click="playAllMusic">播放全部</span>
            </p>
          </div>
        </van-sticky>
        <div
          v-for="item in RecommendMusicList"
          :key="item.id"
          class="music_R"
          @click="clickMusic(item)"
        >
          <div class="left_muisc">
            <img v-lazy="item.picUrl" />
          </div>
          <div class="right_muisc">
            <p>{{ item.name }}</p>
            <p>
              {{ item.song.artists | joinName }} - {{ item.song.album.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="recommendSongSheet" v-else>
      <div class="backimg">
        <p>
          <span>{{ todayTime[1] }}</span> /
          <span>{{ todayTime[0] }}</span>
        </p>
        <p>清晨有光，我在路上，奔向远方。</p>
      </div>
      <div class="songsheetList">
        <div
          v-for="item in RecommendSongSheetList"
          :key="item.id"
          class="songsheet_R"
          @click="goPlaylistDetails(item.id)"
        >
          <img v-lazy="item.picUrl" />
          <p>{{ item.name }}</p>
          <span class="playcount">{{ item.playCount | playCount }}</span>
          <van-icon name="audio" class="playIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRecommendMusicapi,
  getRecommendSongSheetapi,
} from "@/api/recommendApi";
import authorMinxin from "@/utils/AuthorPocessMixin";
import { mapMutations } from "vuex";
export default {
  name: "recommend",
  mixins: [authorMinxin],

  data() {
    return {
      showRecommend: true, //显示那个页面 true-推荐音乐  false-推荐歌单
      RecommendSongSheetList: [], //推荐歌单
      RecommendMusicList: [], //推荐音乐
      showHeaderBack: false, //显示背景
      scrBack: null, //头部导航栏监听事件
    };
  },

  created() {
    this.getRecommendMusic();
    this.getRecommendSongSheet();
  },
  activated() {
    this.scrBack = () => {
      if (window.scrollY >= 150) {
        this.showHeaderBack = true;
      } else {
        this.showHeaderBack = false;
      }
    };
    window.addEventListener("scroll", this.scrBack);
  },
  deactivated() {
    window.removeEventListener("scroll", this.scrBack);
  },
  methods: {
    // 返回上一级
    upperLevel() {
      this.$router.go(-1);
    },
    // 点击切换显示什么推荐
    clickShowRecommend() {
      this.showRecommend = !this.showRecommend;
    },
    // 点击跳转歌单详情
    goPlaylistDetails(id) {
      this.$router.push(`/playlistDetails/${id}`);
    },
    //获取推荐音乐
    async getRecommendMusic() {
      const { data: res } = await getRecommendMusicapi();
      if (res.code === 200) {
        this.RecommendMusicList = [...res.result, ...this.RecommendMusicList];
      }
    },
    //获取推荐歌单
    async getRecommendSongSheet() {
      const { data: res } = await getRecommendSongSheetapi();
      if (res.code === 200) {
        this.RecommendSongSheetList = res.result;
      }
    },
    // 点击音乐播放并添加到播放列表,显示歌曲详情页
    clickMusic(music) {
      let obj = {
        al: {
          id: music.song.album.id,
          name: music.song.album.name,
          pic: music.song.album.pic,
          picUrl: music.song.album.picUrl,
          pic_str: music.song.album.picId_str,
        },
        name: music.name,
        ar: music.song.artists,
        id: music.id,
      };
      this.PUSHMUSIC(obj);
      this.SETCLICKMUSICID(music.id);
      this.SETSHOWMUSICDETAILS(true);
    },
    // 点击播放全部按钮 添加全部歌单，和播放歌曲
    playAllMusic() {
      let arrMusic = [];
      let objM = {};
      this.RecommendMusicList.forEach((e) => {
        objM = {
          al: {
            id: e.song.album.id,
            name: e.song.album.name,
            pic: e.song.album.pic,
            picUrl: e.song.album.picUrl,
            pic_str: e.song.album.picId_str,
          },
          name: e.name,
          ar: e.song.artists,
          id: e.id,
        };
        arrMusic.push(objM);
      });
      this.PUSHALLMUSIC(arrMusic);
    },
    // 添加音乐方法
    ...mapMutations("playmusic", [
      "PUSHMUSIC",
      "SETSHOWMUSICDETAILS",
      "SETCLICKMUSICID",
      "PUSHALLMUSIC",
    ]),
  },
  computed: {
    todayTime() {
      let Month =
        new Date().getMonth() + 1 >= 10
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1);
      let Today =
        new Date().getDate() >= 10
          ? new Date().getDate()
          : "0" + new Date().getDate();
      return [Month, Today];
    },
  },
  filters: {
    // 计算播放数量单位{亿，万}
    playCount(val) {
      if (val >= 100000000) {
        return (val / 100000000).toFixed(1) + "亿";
      } else if (val >= 10000) {
        return (val / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.recommend {
  padding: 0 0 60px;
  .header {
    background-color: transparent;
    i {
      font-size: 22px;
      color: #ffffff;
    }
    /deep/.van-nav-bar__left {
      i {
        margin-right: 12px;
      }
      span {
        font-size: 16px;
        font-weight: 700;
        color: #000;
      }
    }
    .hNav {
      margin-left: 65px;
      position: relative;
      width: 150px;
      display: flex;
      background-color: rgba(0, 0, 0, 0.1);
      height: 70%;
      border-radius: 20px;
      z-index: -2;
      p {
        flex: 1;
        font-weight: 700;
        line-height: 32px;
        text-align: center;
      }
      .white {
        color: #fff;
      }
      .black {
        color: black;
      }
      span {
        position: absolute;
        top: 3px;
        left: 4px;
        border-radius: 20px;
        width: 75px;
        height: 26px;
        background-color: #ffffffb3;
        z-index: -1;
        transition: all 0.3s;
      }
      .toright {
        left: 71px;
      }
      .toleft {
        left: 4px;
      }
    }
  }
  .showBack {
    background-image: url("@/assets/recommend.png");
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .recommendMusic {
    .backimg {
      width: 100%;
      height: 200px;
      background-image: url("@/assets/recommend.png");
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      p {
        padding: 0 20px;
        color: #fff;
        span {
          font: 700 16px "黑体";
          &:nth-child(1) {
            font-size: 30px;
          }
        }
        &:nth-child(2) {
          margin-top: 2px;
          margin-bottom: 30px;
          font: 500 14px "黑体";
        }
      }
    }
    .musicList {
      padding: 0 10px;
      background-color: #fff;
      .playAllMuisc {
        background-color: #fff;
        padding: 0 10px;
        display: flex;
        height: 40px;
        align-items: center;
        p {
          flex: 1;
          font: 700 14px "黑体";
          display: flex;
          align-items: center;
        }
        i {
          margin-right: 6px;
          font-size: 24px;
          color: red;
        }
      }
      .music_R {
        margin: 10px 0;
        width: 100%;
        display: flex;
        .left_muisc {
          width: 50px;
          img {
            width: 100%;
            object-fit: cover;
            border-radius: 10px;
          }
        }
        .right_muisc {
          margin-left: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            padding-right: 10px;
            &:nth-child(1) {
              font: 700 16px "黑体";
            }
            &:nth-child(2) {
              font: 700 12px "黑体";
              color: #919191;
            }
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
      }
    }
  }
  .recommendSongSheet {
    .backimg {
      width: 100%;
      height: 200px;
      background-image: url("@/assets/recommend.png");
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      p {
        padding: 0 20px;
        color: #fff;
        span {
          font: 700 16px "黑体";
          &:nth-child(1) {
            font-size: 30px;
          }
        }
        &:nth-child(2) {
          margin-top: 2px;
          margin-bottom: 30px;
          font: 500 14px "黑体";
        }
      }
    }
    .songsheetList {
      background-color: #f4f4f4b3;
      padding: 0 5px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .songsheet_R {
        position: relative;
        margin: 10px 0;
        width: 31%;
        img {
          width: 100%;
          border-radius: 15px;
          object-fit: cover;
        }
        p {
          margin: 5px 0;
          font: 700 14px "黑体";
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .playcount {
          position: absolute;
          padding: 2px 4px;
          top: 8px;
          right: 5px;
          display: inline-block;
          background-color: #0000003d;
          border-radius: 10px;
          color: #fff;
          font: 700 12px "黑体";
        }
        .playIcon {
          position: absolute;
          top: 28px;
          left: 26px;
          font-size: 60px;
          color: #ffffff87;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
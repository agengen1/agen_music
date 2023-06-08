<template>
  <div class="playlistDetails">
    <van-nav-bar
      class="header"
      fixed
      :class="{ headerscollf: headerScollFalg }"
    >
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <span>歌单</span>
      </template>
      <template #right>
        <i class="iconfont icon-fenxiang"></i>
      </template>
    </van-nav-bar>
    <img :src="playDeta.coverImgUrl" class="backimg" />
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div v-else>
      <div class="playDetailsTop">
        <div class="top">
          <div class="left">
            <img :src="playDeta.coverImgUrl" @click="showDescFn" />
          </div>
          <div class="right">
            <p>{{ playDeta.name }}</p>
            <p>
              <img :src="playDeta?.creator?.avatarUrl" />
              <span>{{ playDeta?.creator?.nickname }}</span>
            </p>
            <p>
              <span v-for="item in playDeta.tags" :key="item"
                >{{ item }}<van-icon name="arrow"
              /></span>
            </p>
          </div>
        </div>
        <div class="middle">
          <p class="desc" v-if="playDeta.description != ''" @click="showDescFn">
            {{ playDeta.description }}
          </p>
          <p class="desc" v-else @click="showDescFn">无</p>
          <span><van-icon name="arrow" /></span>
        </div>
        <div class="footer">
          <button><van-icon name="share" />{{ playDeta.shareCount }}</button>
          <button @click="showCommentFn">
            <i class="iconfont icon-pinglun"></i>{{ playDeta.commentCount }}
          </button>
          <button @click="playAllMusic">
            <i class="iconfont icon-bofang"></i>播放全部({{ musiclist.length }})
          </button>
        </div>
      </div>
      <PLAYLIST :playlist="musiclist" />
    </div>
    <van-popup
      v-model="showComment"
      position="bottom"
      closeable
      :style="{ height: '95%', width: '100%' }"
      ><COMMENT
        :comment-count="playDeta.commentCount"
        :song-sheet-id="playlistDetailID"
      ></COMMENT
    ></van-popup>
    <van-popup
      v-model="showDesc"
      closeable
      position="center"
      round
      :style="{ height: '80%', width: '80%' }"
      ><PLAYDESC :play-details="playDeta"></PLAYDESC
    ></van-popup>
  </div>
</template>

<script>
import { getPlaylistDetailapi, getMusicListapi } from "@/api/playlistApi";
import PLAYLIST from "@/components/PlaylistDetails/playlist/index.vue";
import COMMENT from "@/components/PlaylistDetails/comment/index.vue";
import PLAYDESC from "@/components/PlaylistDetails/playdesc/index.vue";
import { mapMutations } from "vuex";
export default {
  name: "playlistDetails",
  data() {
    return {
      playlistDetailID: this.$route.params.id,
      playDeta: {},
      musiclist: [],
      srcollroll: null,
      headerScollFalg: false,
      showComment: false, //评论显示
      showDesc: false, //说明显示
      loadFlag: true, //加载状态
    };
  },
  created() {
    this.getPlaylistDetail(this.playlistDetailID);
    this.srcollroll = () => {
      if (window.scrollY >= 70) {
        this.headerScollFalg = true;
      } else {
        this.headerScollFalg = false;
      }
    };
    window.addEventListener("scroll", this.srcollroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.srcollroll);
  },
  methods: {
    // 获取歌单详情,歌曲列表
    async getPlaylistDetail(id) {
      this.loadFlag = true;
      const { data: res } = await getPlaylistDetailapi(id);
      this.loadFlag = false;
      if (res.code === 200) {
        this.playDeta = res.playlist;
        let ids = "";
        this.playDeta.trackIds.forEach((e, i) => {
          if (i >= this.playDeta.trackIds.length - 1) {
            ids += e.id;
          } else {
            ids += e.id + ",";
          }
        });
        const { data: ress } = await getMusicListapi(ids);
        if (ress.code === 200) {
          this.musiclist = ress.songs;
        }
      }
    },
    // 点击播放全部按钮 添加全部歌单，和播放歌曲
    playAllMusic() {
      let arrMusic = [];
      let objM = {};
      this.musiclist.forEach((e) => {
        objM = {
          al: e.al,
          name: e.name,
          ar: e.ar,
          id: e.id,
        };
        arrMusic.push(objM);
      });
      this.PUSHALLMUSIC(arrMusic);
    },
    // 添加全部歌单音乐
    ...mapMutations("playmusic", ["PUSHALLMUSIC"]),
    // 返回上一级
    upperLevel() {
      this.$router.go(-1);
    },
    // 点击显示评论区
    showCommentFn() {
      this.showComment = !this.showComment;
    },
    // 点击显示说明
    showDescFn() {
      this.showDesc = !this.showDesc;
    },
  },
  components: {
    PLAYLIST,
    COMMENT,
    PLAYDESC,
  },
};
</script>

<style lang="less" scoped>
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
/deep/ .van-popup__close-icon {
  z-index: 3;
}
.playlistDetails {
  padding: 46px 0 60px 0;
  .header {
    background-color: transparent;
    i {
      font-size: 22px;
      color: #fff;
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
  .headerscollf {
    background-color: #fff;
    span,
    i {
      color: #000 !important;
    }
  }
  .backimg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -20;
    filter: blur(25px);
  }
  .playDetailsTop {
    margin: 10px 0;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      .left {
        margin-right: 15px;
        width: 120px;
        img {
          width: 100%;
          border-radius: 10px;
        }
      }
      .right {
        flex: 1;
        p {
          &:nth-child(1) {
            margin: 0 0 6px;
            font: 500 18px "黑体";
            color: #fff;
          }
          &:nth-child(2) {
            margin: 10px 0;
            display: flex;
            align-items: center;
            font: 700 12px "黑体";
            color: #e7e7e7a1;
          }
          &:nth-child(3) {
            display: flex;
            align-items: center;
            font: 500 12px "黑体";
            color: #ededede7;
            span {
              margin-right: 8px;
              border-radius: 4px;
              display: inline-block;
              padding: 2px 4px;
              background-color: rgba(#dcdcdc, 0.3);
            }
          }
          img {
            margin-right: 8px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
      }
    }
    .middle {
      margin: 10px 0;
      padding-left: 5px;
      position: relative;
      .desc {
        color: #f0f0f0a1;
        padding: 0;
        padding-right: 18px;
        background-color: transparent;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font: 500 14px "黑体";
      }
      span {
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        width: 15px;
        height: 15px;
        font-size: 15px;
        color: #e7e7e7a1;
      }
    }
    .footer {
      display: flex;
      button {
        margin: 5px 5px 0;
        width: 88px;
        height: 40px;
        border-radius: 20px;
        background-color: #efefef77;
        border: none;
        outline: none;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(3) {
          width: 148px;
          background-color: red;
        }
        i {
          margin-right: 5px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="music">
    <div class="header">
      <div>
        <van-icon name="wap-nav" @click="clickShowSeting" />
      </div>
      <van-search
        v-model="musicVal"
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
        @click="clickSkipSearch"
      />
    </div>
    <div class="swipe">
      <van-swipe
        class="my-swipe"
        :autoplay="5000"
        indicator-color="red"
        lazy-render
      >
        <van-swipe-item v-for="item in banner" :key="item.bannerId"
          ><img :src="item.pic" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="fast">
      <van-row>
        <van-col span="8">
          <div @click="clickSkipRecommend">
            <i class="iconfont icon-jinrituijian" />
            <p>今日推荐</p>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="clickSkipSingerSquare">
            <i class="iconfont icon-gedan" />
            <p>歌单</p>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="clickSkipRankingList">
            <i class="iconfont icon-paihangbang" />
            <p>排行榜</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <h4 @click="clickSkipSingerSquare">推荐歌单 <van-icon name="arrow" /></h4>
    <div class="replaylist">
      <ul>
        <li
          v-for="item in replaylist"
          :key="item.id"
          @click="goPlaylistDetails(item.id)"
        >
          <img v-lazy="item.picUrl" />
          <span><van-icon name="play" />{{ item.playCount | playCount }}</span>
          <van-icon name="play" class="playicon" />
          <p>
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>
    <h4 @click="clickSkipSingerList">热门歌手 <van-icon name="arrow" /></h4>
    <div class="hotsinger">
      <van-cell
        is-link
        v-for="item in hotsingerlist"
        :key="item.id"
        @click="clickSkipSingerDetails(item.id)"
      >
        <template #title>
          <div>
            <img v-lazy="item.picUrl" />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import {
  getSwipePicapi,
  getRePlayListapi,
  getHotSingerapi,
} from "@/api/musicApi";
import { mapState, mapMutations } from "vuex";
export default {
  name: "music",

  data() {
    return {
      musicVal: "",
      banner: [],
      replaylist: [],
      hotsingerlist: [],
    };
  },

  created() {
    this.getSwipePic();
    this.getRePlayList();
    this.getHotSinger();
  },
  computed: {
    ...mapState("seting", ["showSeting"]),
  },
  methods: {
    // 获取轮播图
    async getSwipePic() {
      const { data: res } = await getSwipePicapi();
      console.log("获取轮播图----", res);
      if (res.code === 200) {
        this.banner = res.banners;
      }
    },
    // 获取推荐歌单
    async getRePlayList() {
      const { data: res } = await getRePlayListapi();
      console.log("获取推荐歌单----", res);
      if (res.code === 200) {
        this.replaylist = res.result;
      }
    },
    // 获取热门歌手
    async getHotSinger() {
      const { data: res } = await getHotSingerapi();
      console.log("获取热门歌手----", res);
      if (res.code === 200) {
        this.hotsingerlist = res.artists;
      }
    },
    // 点击跳转歌单详情
    goPlaylistDetails(id) {
      this.$router.push(`/playlistDetails/${id}`);
    },
    // 点击跳转 搜索页面
    clickSkipSearch() {
      this.$router.push("/search/  ");
    },
    // 点击跳转 歌单广场
    clickSkipSingerSquare() {
      this.$router.push("/singerSquare");
    },
    // 点击跳转 排行榜
    clickSkipRankingList() {
      this.$router.push("/rankingList");
    },
    // 点击跳转今日推荐
    clickSkipRecommend() {
      this.$router.push("/recommend");
    },
    // 点击跳转歌手分类
    clickSkipSingerList() {
      this.$router.push("/singerList");
    },
    // 点击跳转歌手详情页
    clickSkipSingerDetails(id) {
      this.$router.push(`/singerDetails/${id}`);
    },
    // 点击显示或关闭设置
    clickShowSeting() {
      if (this.showSeting) {
        this.SETSHOWSETING(false);
      } else {
        this.SETSHOWSETING(true);
      }
    },
    ...mapMutations("seting", ["SETSHOWSETING"]),
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
.music {
  padding: 56px 10px 0;
  .header {
    padding: 5px 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 55px;
    z-index: 100;
    display: flex;
    align-items: center;
    div {
      width: 30px;
      i {
        font-size: 28px;
      }
    }
    /deep/ .van-search {
      flex: 1;
      height: 100%;
      .van-icon-search {
        color: #5d5d5d;
        font-weight: 700;
      }
    }
  }
  .swipe {
    img {
      width: 100%;
    }
    /deep/ .van-swipe {
      border-radius: 10px;
    }
  }
  .fast {
    .van-row {
      margin: 10px 0 10px 0;
    }
    /deep/ .van-col--8 {
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        i {
          font-size: 28px;
          color: red;
        }
        p {
          margin-top: 8px;
          font: 700 12px "黑体";
          color: #8c8c8c;
        }
      }
    }
  }
  h4 {
    margin: 12px 0 10px 0;
    font-size: 16px;
  }
  .replaylist {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      display: flex;
      width: 1160px;
      height: 140px;
      li {
        position: relative;
        height: 100%;
        width: 110px;
        margin: 0 5px;
        img {
          width: 100%;
          border-radius: 10px;
        }
        p {
          padding: 0 2px;
          margin: 2px 0;
          font: 600 12px "黑体";
          color: #373737;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        span {
          position: absolute;
          right: 4px;
          top: 6px;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
        .playicon {
          position: absolute;
          right: 5px;
          bottom: 25%;
          color: #fff;
          font-size: 26px;
        }
      }
    }
  }
  .hotsinger {
    /deep/ .van-cell {
      padding: 4px 2px;
      div {
        display: flex;
        align-items: center;
        img {
          margin-right: 8px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .van-cell__right-icon {
        line-height: 40px;
      }
    }
  }
}
</style>
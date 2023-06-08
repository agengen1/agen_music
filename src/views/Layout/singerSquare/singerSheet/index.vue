<template>
  <div class="singersheet">
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div v-else>
      <ul>
        <li
          v-for="item in SingingList"
          :key="item.id"
          @click="skipPlayDetails(item.id)"
        >
          <img v-lazy="item.coverImgUrl" />
          <span><van-icon name="play" />{{ item.playCount | playCountW }}</span>
          <van-icon name="play" class="playicon" />
          <p>
            {{ item.name }}
          </p>
        </li>
      </ul>
      <div v-show="loadDisplay" class="loading" @click="clickLoadSingle">
        <p>点击加载更多</p>
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
</template>
  
<script>
import { getSingingListapi } from "@/api/playlistApi";

export default {
  name: "singersheet",
  props: ["keyword"],

  data() {
    return {
      SingingList: [], //歌单
      SingingListCount: 0, //用于分页，当前为第几页
      loadDisplay: true, //true 表示显示加载按钮
      loadFlag: true, //加载状态
    };
  },
  methods: {
    // 获取搜索结果歌单
    async getSingingList(keyword, offset) {
      const { data: res } = await getSingingListapi(keyword, offset);
      console.log(res);
      this.loadFlag = false;
      if (res.code === 200) {
        if (!res.playlists || res.playlists.length <= 0) {
          this.loadDisplay = false;
        } else {
          this.SingingList.push(...res.playlists);
        }
      }
    },
    //点击加载更多单曲
    clickLoadSingle() {
      this.SingingListCount++;
      this.getSingingList(this.keyword, this.SingingListCount);
    },
    // 点击歌单跳转到歌单详情页
    skipPlayDetails(id) {
      this.$router.push(`/playlistDetails/${id}`);
    },
  },
  watch: {
    keyword: {
      handler(newVal) {
        this.loadFlag = true;
        this.getSingingList(newVal, this.SingingListCount);
      },
      immediate: true,
    },
  },
  filters: {
    playCountW(val) {
      if (val >= 10000) {
        return (val / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>
  
<style lang="less" scoped>
.singersheet {
  > div {
    ul {
      display: flex;
      width: 100%;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        position: relative;
        height: 100%;
        width: 30%;
        margin: 10px 5px;
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
    .loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: none;
      p {
        font: 700 14px "黑体";
        color: #606060be;
      }
      i {
        font-size: 20px;
        color: #606060be;
      }
    }
  }
}
</style>
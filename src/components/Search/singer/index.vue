<template>
  <div class="singer">
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div v-else>
      <div
        v-for="item in singerList"
        :key="item.id"
        @click="clickSkipSingerDetails(item.id)"
      >
        <div class="left">
          <img v-lazy="item.img1v1Url" />
          <img
            v-if="item.identityIconUrl"
            :src="item.identityIconUrl"
            class="Vicon"
          />
        </div>
        <div class="right">
          <span>{{ item.name }}</span>
          <span v-if="item.alias && item.alias.length > 0">
            ({{ item.alias[0] }})</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResultapi } from "@/api/searchApi";

export default {
  name: "singer",
  props: ["keyword"],

  data() {
    return {
      singerList: [], //歌手
      singerCount: 0, //用于分页，当前为第几页
      loadFlag: true, //加载状态
    };
  },
  methods: {
    // 获取搜索结果歌手
    async getSearchResult(keyword, offset) {
      const { data: res } = await getSearchResultapi(keyword, 100, offset);
      this.loadFlag = false;
      if (res.code === 200) {
        this.singerList = res.result.artists;
      }
    },
    // 点击跳转歌手详情页
    clickSkipSingerDetails(id) {
      this.$router.push(`/singerDetails/${id}`);
    },
  },
  watch: {
    keyword: {
      handler(newVal) {
        this.loadFlag = true;
        this.getSearchResult(newVal, this.singerCount);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.singer {
  > div {
    div {
      padding: 3px 0;
      display: flex;
      align-items: center;
      height: 66px;
      .left {
        width: 60px;
        position: relative;
        img {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          object-fit: cover;
        }
        .Vicon {
          position: absolute;
          right: 12px;
          bottom: 10px;
          width: 20%;
          height: 20%;
        }
      }
      .right {
        margin-left: 8px;
        flex: 1;
        display: flex;
        align-items: center;
        border-bottom: 0.5px solid #efefef;
        span {
          color: #aaaaaa;
          font-size: 14px;
          font-weight: 700;
          vertical-align: middle;
          &:nth-child(1) {
            color: #000;
          }
        }
      }
    }
  }
}
</style>
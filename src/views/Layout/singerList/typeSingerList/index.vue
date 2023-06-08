<template>
  <div class="typesingerlist">
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div v-else>
      <div
        v-for="item in typesingerlist"
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
      <div v-show="loadDisplay" class="loading" @click="clickLoadSingle">
        <p>点击加载更多</p>
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getArtistCategoryListapi } from "@/api/musicApi";

export default {
  name: "typesingerlist",
  props: ["keyobj"],

  data() {
    return {
      typesingerlist: [], //类型歌手
      typesingerlistCount: 0, //用于分页，当前为第几页
      loadDisplay: true, //true 表示显示加载按钮
      loadFlag: true, //加载状态
    };
  },
  methods: {
    // 获取搜索结果歌手
    async getArtistCategoryList(keyobj, offset) {
      const { data: res } = await getArtistCategoryListapi(keyobj, offset);
      this.loadFlag = false;
      if (res.code === 200) {
        if (!res.artists || res.artists.length <= 0) {
          this.loadDisplay = false;
        } else {
          this.typesingerlist.push(...res.artists);
        }
      }
    },
    //点击加载更多单曲
    clickLoadSingle() {
      this.typesingerlistCount++;
      this.getArtistCategoryList(this.keyobj, this.typesingerlistCount);
    },
    // 点击跳转歌手详情页
    clickSkipSingerDetails(id) {
      this.$router.push(`/singerDetails/${id}`);
    },
  },
  watch: {
    keyobj: {
      handler(newVal) {
        this.loadFlag = true;
        this.getArtistCategoryList(newVal, this.typesingerlistCount);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
  
  <style lang="less" scoped>
.typesingerlist {
  > div {
    > div {
      padding: 3px 5px;
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
        height: 100%;
        flex: 1;
        line-height: 60px;
        border-bottom: 0.5px solid #efefef;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
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
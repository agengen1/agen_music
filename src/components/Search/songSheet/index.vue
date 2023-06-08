<template>
  <div class="songsheet">
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div v-else>
      <div
        v-for="item in songSheetList"
        :key="item.id"
        @click="skipPlayDetails(item.id)"
      >
        <div class="left">
          <img v-lazy="item.coverImgUrl" />
        </div>
        <div class="right">
          <p>{{ item.name }}</p>
          <p>
            <span>{{ item.trackCount }}首</span>,<span
              >by {{ item.creator.nickname }}</span
            >,<span>播放{{ item.playCount | playCountW }}万次</span>
          </p>
          <p v-if="item.recommendText != null" class="contain">
            {{ item.recommendText }}
          </p>
          <p
            v-if="item.officialTags && item.officialTags.length != 0"
            class="tags"
          >
            <span v-for="(item, index) in item.officialTags" :key="index">{{
              item
            }}</span>
          </p>
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
import { getSearchResultapi } from "@/api/searchApi";

export default {
  name: "songsheet",
  props: ["keyword"],

  data() {
    return {
      songSheetList: [], //歌单
      songSheetCount: 0, //用于分页，当前为第几页
      loadDisplay: true, //true 表示显示加载按钮
      loadFlag: true, //加载状态
    };
  },
  methods: {
    // 获取搜索结果歌单
    async getSearchResult(keyword, offset) {
      const { data: res } = await getSearchResultapi(keyword, 1000, offset);
      this.loadFlag = false;
      if (res.code === 200) {
        if (!res.result.playlists || res.result.playlists.length <= 0) {
          this.loadDisplay = false;
        } else {
          this.songSheetList.push(...res.result.playlists);
        }
      }
    },
    //点击加载更多单曲
    clickLoadSingle() {
      this.songSheetCount++;
      this.getSearchResult(this.keyword, this.songSheetCount);
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
        this.getSearchResult(newVal, this.songSheetCount);
      },
      immediate: true,
    },
  },
  filters: {
    playCountW(val) {
      if (val >= 10000) {
        return (val / 10000).toFixed(1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.songsheet {
  > div {
    div {
      padding: 4px 0;
      display: flex;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font: 700 14px "黑体";
          &:nth-child(2) {
            font-size: 12px;
            color: #606060be;
          }
        }
        .contain {
          font-size: 12px;
          color: #405bf3be;
        }
        .tags {
          display: inline-block;
          span {
            padding: 5px;
            margin: 0 4px;
            font-size: 12px;
            background-color: #ffc584be;
            color: #ff7c1f;
            border-radius: 10px;
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
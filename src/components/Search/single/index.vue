<template>
  <div class="single">
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div v-else>
      <div v-for="item in singleList" :key="item.id" @click="clickMusic(item)">
        <div class="left">
          <p>
            {{ item.name }}
            <span
              class="tag"
              v-if="item.transNames && item.transNames.length != 0"
              >({{ item.transNames[0] }})</span
            >
          </p>
          <p>
            <span>{{ item.artists | joinName }}</span> -
            <span>{{ item.album.name }}</span>
          </p>
          <p v-if="item.alias.length != 0">{{ item.alias[0] }}</p>
        </div>
        <div class="right"><van-icon name="arrow" /></div>
      </div>
      <div v-show="loadDisplay" class="loading" @click="clickLoadSingle">
        <p>点击加载更多</p>
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import authorMinxin from "@/utils/AuthorPocessMixin";
import { getSearchResultapi } from "@/api/searchApi";
export default {
  name: "single",
  props: ["keyword"],
  mixins: [authorMinxin],
  data() {
    return {
      singleList: [], //单曲
      singleCount: 0, //用于分页，当前为第几页
      loadDisplay: true, //true 表示显示加载按钮
      loadFlag: true, //加载状态
    };
  },
  methods: {
    // 获取搜索结果单曲
    async getSearchResult(keyword, offset) {
      const { data: res } = await getSearchResultapi(keyword, 1, offset);
      this.loadFlag = false;
      if (res.code === 200) {
        if (!res.result.songs || res.result.songs.length <= 0) {
          this.loadDisplay = false;
        } else {
          this.singleList.push(...res.result.songs);
        }
      }
    },
    //点击加载更多单曲
    clickLoadSingle() {
      this.singleCount++;
      this.getSearchResult(this.keyword, this.singleCount);
    },
    // 点击音乐播放并添加到播放列表,显示歌曲详情页
    clickMusic(music) {
      let obj = {
        al: {
          id: music.album.id,
          name: music.album.name,
          pic: music.album.picId,
          picUrl: music.album.artist.img1v1Url,
        },
        name: music.name,
        ar: music.artists,
        id: music.id,
      };
      this.PUSHMUSIC(obj);
      this.SETCLICKMUSICID(music.id);
      this.SETSHOWMUSICDETAILS(true);
    },
    // 添加音乐方法
    ...mapMutations("playmusic", [
      "PUSHMUSIC",
      "SETSHOWMUSICDETAILS",
      "SETCLICKMUSICID",
    ]),
  },

  watch: {
    keyword: {
      handler(newVal) {
        this.loadFlag = true;
        this.getSearchResult(newVal, this.singleCount);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.single {
  > div {
    > div {
      padding: 5px 2px;
      border-bottom: 0.5px solid #f2f2f2;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        p {
          margin: 2px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          color: #606060be;
          &:nth-child(1) {
            font: 700 16px "黑体";
            color: #000;
          }
          &:nth-child(2),
          &:nth-child(3) {
            font-size: 12px;
            font-weight: 700;
          }
          .tag {
            color: #606060be;
          }
        }
      }
      .right {
        width: 40px;
        i {
          font-size: 18px;
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
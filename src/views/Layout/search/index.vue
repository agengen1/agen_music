<template>
  <div class="search">
    <div class="header">
      <i class="iconfont icon-NMStubiao-" @click="cilckReturn"></i>
      <van-search
        v-model="musicVal"
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
      />
      <span @click="clickSearchButton">搜索</span>
    </div>
    <div class="Suggestions" v-show="musicVal.trim() != ''">
      <van-loading type="spinner" v-show="loadFlag" color="red" vertical
        >加载中...</van-loading
      >
      <div v-show="!loadFlag">
        <div
          v-for="item in searchSuggestions"
          :key="item.keyword"
          @click="clickSearchRes(item.keyword)"
        >
          <van-icon name="search" />
          <p>{{ item.keyword }}</p>
        </div>
      </div>
    </div>
    <div class="consent" v-show="musicVal.trim() == ''">
      <div
        class="searchhistory"
        v-show="searchhistorylist && searchhistorylist.length > 0"
      >
        <div class="top">
          <h4>搜索历史</h4>
          <i class="iconfont icon-shanchu" @click="DELETEALLSEARCHHISTORY"></i>
        </div>
        <div class="content">
          <van-tag
            v-for="item in searchhistorylist"
            :key="item"
            closeable
            size="medium"
            type="primary"
            @close="DELETESEARCHHISTORY(item)"
            @click="clickSearchRes(item)"
          >
            {{ item }}
          </van-tag>
        </div>
      </div>
      <div class="hotsearch">
        <h3>
          <em>热搜榜</em
          ><img
            src="https://p1.music.126.net/2zQ0d1ThZCX5Jtkvks9aOQ==/109951163968000522.png"
            alt=""
          />
        </h3>
        <van-loading type="spinner" v-show="HotloadFlag" color="red" vertical
          >加载中...</van-loading
        >
        <ul v-if="hotSearchList.length != 0">
          <li
            v-for="(item, index) in hotSearchList"
            :key="item.score"
            @click="clickSearchRes(item.searchWord)"
          >
            <span
              :class="{
                Topthree: index + 1 == 1 || index + 1 == 2 || index + 1 == 3,
              }"
              >{{ index + 1 }}</span
            >
            <p>{{ item.searchWord }}</p>
            <div>
              <img v-if="item.iconUrl != null" :src="item.iconUrl" alt="" />
              <i class="iconfont icon-sousuo"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  getHotSearchListapi,
  getHotSearchSuggestionsapi,
} from "@/api/searchApi";
export default {
  name: "search",
  data() {
    return {
      musicVal: "",
      hotSearchList: [],
      searchSuggestions: [],
      searchTimer: null,
      loadFlag: true, //搜索列表建议加载状态
      HotloadFlag: true, //热搜索列表加载状态
    };
  },
  activated() {
    this.musicVal = this.$route.params.val.trim();
  },
  created() {
    this.getHotSearchList();
    this.musicVal = this.$route.params.val.trim();
  },
  computed: {
    ...mapState("searchhistory", ["searchhistorylist"]),
  },
  methods: {
    // 点击返回按钮 返回上一级路由
    cilckReturn() {
      this.$router.go(-1);
    },
    // 点击搜索按钮
    clickSearchButton() {
      if (this.musicVal.trim() != "") {
        this.clickSearchRes(this.musicVal);
      }
    },
    // 点击跳转搜索结果页面
    clickSearchRes(searchVal) {
      this.$router.replace(`/searchResult/${searchVal}`);
      this.SHIFTSEARCHHISTORY(searchVal);
    },
    // 获取热搜榜
    async getHotSearchList() {
      this.HotloadFlag = true;
      const { data: res } = await getHotSearchListapi();
      if (res.code === 200) {
        this.HotloadFlag = false;
        this.hotSearchList = res.data;
      }
    },
    // 获取热搜建议
    async getHotSearchSuggestions(val) {
      this.loadFlag = true;
      const { data: res } = await getHotSearchSuggestionsapi(val);
      if (res.code === 200) {
        this.searchSuggestions = res.result.allMatch;
        this.loadFlag = false;
      }
    },
    ...mapMutations("searchhistory", [
      "SHIFTSEARCHHISTORY",
      "DELETESEARCHHISTORY",
      "DELETEALLSEARCHHISTORY",
    ]),
  },
  watch: {
    musicVal: {
      handler(newVal) {
        if (newVal != "") {
          if (this.searchTimer != null) {
            clearTimeout(this.searchTimer);
          }
          this.searchTimer = setTimeout(() => {
            this.getHotSearchSuggestions(newVal);
          }, 600);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tag--primary {
  background-color: red;
  border-radius: 10px;
}
.search {
  padding: 55px 10px 60px;
  .header {
    position: fixed;
    padding: 0 10px;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    background-color: #fff;
    i {
      margin-right: 4px;
      font-size: 24px;
      color: #5d5d5d;
    }
    /deep/ .van-search {
      flex: 1;
      .van-icon-search {
        color: #5d5d5d;
        font-weight: 700;
      }
    }
    span {
      font: 500 16px "黑体";
    }
  }
  .Suggestions {
    padding: 5px 10px 5px 5px;
    > div {
      div {
        height: 35px;
        display: flex;
        align-items: center;
        i {
          font-size: 20px;
          color: #5d5d5d;
          z-index: -1;
        }
        p {
          flex: 1;
          height: 100%;
          line-height: 35px !important;
          margin-left: 5px;
          color: #5d5d5d;
          font: 700 14px "黑体";
          border-bottom: 0.5px solid #f2f2f2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 1;
        }
      }
    }
  }
  .consent {
    .searchhistory {
      .top {
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          font-weight: 700;
          font-size: 22px;
          color: #a4a4a4;
        }
        h4 {
          font-size: 14px;
        }
      }
      .content {
        padding: 5px;
        max-height: 100px;
        overflow-y: scroll;
        span {
          margin: 2px 3px;
        }
      }
    }
    .hotsearch {
      padding: 10px 0;
      h3 {
        margin-bottom: 10px;
        padding: 0 0 5px 0;
        border-bottom: 0.5px solid #dfdfdf;
        img {
          margin: 0 0 1px 5px;
          height: 20px;
        }
      }
      ul {
        height: 345px;
        overflow-y: scroll;
        li {
          display: flex;
          align-items: center;
          height: 35px;
          span {
            width: 40px;
            font-size: 20px;
            color: #5d5d5d;
            text-align: center;
            font-weight: 700;
            font-style: italic;
          }
          .Topthree {
            color: red;
          }
          p {
            padding: 0 5px;
            flex: 1;
            overflow: hidden;
            display: -webkit-box;
            line-height: 42px;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            font: 700 16px "黑体";
            color: #5d5d5d;
          }
          div {
            padding: 2px 5px 0 0;
            width: 80px;
            height: 100%;
            position: relative;
            img {
              position: absolute;
              left: 13px;
              top: 50%;
              height: 15px;
              margin-top: -10px;
              color: red;
            }
            .icon-sousuo {
              position: absolute;
              right: 6px;
              top: 50%;
              margin-top: -14px;
              font-size: 26px;
              color: #a4a4a4;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="searchresult">
    <div class="header">
      <i class="iconfont icon-NMStubiao-" @click="cilckReturn"></i>
      <van-search
        v-model="musicResVal"
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="Searchresult">
      <van-tabs
        v-model="active"
        sticky
        animated
        :line-width="20"
        title-inactive-color="rgb(157 157 157)"
        title-active-color="#000"
      >
        <van-tab title="单曲"><SINGLE :keyword="musicResVal" /></van-tab>
        <van-tab title="歌单"><SONGSHEET :keyword="musicResVal" /></van-tab>
        <van-tab title="歌手"><SINGER :keyword="musicResVal" /></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SINGER from "@/components/Search/singer/index.vue";
import SINGLE from "@/components/Search/single/index.vue";
import SONGSHEET from "@/components/Search/songSheet/index.vue";
export default {
  name: "searchresult",

  data() {
    return {
      active: 0,
      musicResVal: this.$route.params.searchVal,
    };
  },
  methods: {
    // 点击返回按钮 返回上一级路由
    cilckReturn() {
      this.$router.replace("/search/  ");
    },
  },
  components: {
    SINGER,
    SINGLE,
    SONGSHEET,
  },
  watch: {
    musicResVal(newVal) {
      this.$router.push(`/search/${newVal}`);
    },
  },
};
</script>

<style lang="less" scoped>
.searchresult {
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
}
</style>
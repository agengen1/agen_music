<template>
  <div class="taggedplaylist">
    <van-nav-bar class="header" fixed>
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <span>{{ $route.params.label }}</span>
      </template>
    </van-nav-bar>
    <SINGERSHEET :keyword="$route.params.label"></SINGERSHEET>
  </div>
</template>

<script>
import SINGERSHEET from "@/views/Layout/singerSquare/singerSheet/index.vue";

export default {
  name: "taggedplaylist",

  components: {
    SINGERSHEET,
  },

  methods: {
    // 返回上一级
    upperLevel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.taggedplaylist {
  padding: 46px 10px 60px;

  .header {
    background-color: #fff;
    i {
      font-size: 22px;
      color: #000;
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
  }
}
</style>
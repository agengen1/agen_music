<template>
  <div class="singerlist">
    <van-nav-bar class="header" fixed>
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <span>歌手分类</span>
      </template>
    </van-nav-bar>
    <van-tabs
      v-model="active"
      sticky
      animated
      title-inactive-color="rgb(157 157 157)"
      title-active-color="#000"
    >
      <van-tab
        v-for="item in singerTypeList"
        :title="item.name"
        :key="item.typeid + '-' + item.area"
        ><TYPESINGERLIST :keyobj="item"></TYPESINGERLIST
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TYPESINGERLIST from "@/views/Layout/singerList/typeSingerList/index.vue";
export default {
  name: "singerlist",

  data() {
    return {
      active: 0,
      singerTypeList: [
        {
          name: "华语男歌手",
          typeid: 1,
          area: 7,
        },
        {
          name: "华语女歌手",
          typeid: 2,
          area: 7,
        },
        {
          name: "华语组合/乐队",
          typeid: 3,
          area: 7,
        },
        {
          name: "欧美男歌手",
          typeid: 1,
          area: 96,
        },
        {
          name: "欧美女歌手",
          typeid: 2,
          area: 96,
        },
        {
          name: "欧美组合/乐队",
          typeid: 3,
          area: 96,
        },
        {
          name: "日本男歌手",
          typeid: 1,
          area: 8,
        },
        {
          name: "日本女歌手",
          typeid: 2,
          area: 8,
        },
        {
          name: "日本组合/乐队",
          typeid: 3,
          area: 8,
        },
        {
          name: "韩国男歌手",
          typeid: 1,
          area: 16,
        },
        {
          name: "韩国女歌手",
          typeid: 2,
          area: 16,
        },
        {
          name: "韩国组合/乐队",
          typeid: 3,
          area: 16,
        },
        {
          name: "其他男歌手",
          typeid: 1,
          area: 0,
        },
        {
          name: "其他女歌手",
          typeid: 2,
          area: 0,
        },
        {
          name: "其他组合/乐队",
          typeid: 3,
          area: 0,
        },
      ], //歌手类型
    };
  },
  components: {
    TYPESINGERLIST,
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
.singerlist {
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
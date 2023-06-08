<template>
  <div class="singersquare">
    <van-nav-bar class="header" fixed>
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <span>歌单广场</span>
      </template>
    </van-nav-bar>
    <div class="whole" @click="clickShowLabel">
      <van-icon name="apps-o" />
    </div>
    <van-tabs
      animated
      sticky
      :line-width="20"
      title-inactive-color="rgb(157 157 157)"
      title-active-color="#000"
    >
      <van-tab
        v-for="item in label.my_SingingListLadel"
        :title="item.name"
        :key="item.name"
      >
        <SINGERSHEET :keyword="item.name"></SINGERSHEET>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="show_ladel"
      closeable
      position="right"
      :style="{ height: '100%', width: '80%' }"
      ><SINGERSHEETLABEL></SINGERSHEETLABEL
    ></van-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SINGERSHEET from "@/views/Layout/singerSquare/singerSheet/index.vue";
import SINGERSHEETLABEL from "@/views/Layout/singerSquare/singerSheetLabel/index.vue";
export default {
  name: "singersquare",

  data() {
    return {
      show_ladel: false, //控制歌单标签页
    };
  },
  created() {
    this.getSingingListLabel();
  },
  computed: {
    ...mapState("singinglistlabel", ["label"]),
  },
  components: {
    SINGERSHEET,
    SINGERSHEETLABEL,
  },
  methods: {
    // 返回上一级
    upperLevel() {
      this.$router.go(-1);
    },
    // 点击打开标签页
    clickShowLabel() {
      this.show_ladel = true;
    },
    ...mapActions("singinglistlabel", ["getSingingListLabel"]),
  },
};
</script>

<style lang="less" scoped>
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.singersquare {
  position: relative;
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
  .whole {
    display: flex;
    align-items: center;
    position: absolute;
    top: 48px;
    right: 10px;
    font-weight: 700;
    flex: 1;
    height: 40px;
    font-size: 24px;
    z-index: 1;
    background-color: #fff;
  }
}
</style>
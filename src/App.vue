<template>
  <div class="app">
    <keep-alive
      :include="[
        'layout',
        'search',
        'singersquare',
        'rankinglist',
        'recommend',
        'singerlist',
      ]"
    >
      <router-view></router-view>
    </keep-alive>

    <PLAYMUSIC />
    <van-tabbar
      v-if="$route.path == '/layout/user' || $route.path == '/layout/music'"
      route
      active-color="red"
    >
      <van-tabbar-item to="/layout/music">
        <span>音乐</span>
        <template #icon="props">
          <i v-if="props.active" class="iconfont icon-yinle"></i>
          <i v-else class="iconfont icon-yinle iconGray"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/user">
        <span>我的</span>
        <template #icon="props">
          <i v-if="props.active" class="iconfont icon-geren-xuanzhong"></i>
          <i v-else class="iconfont icon-geren-xuanzhong iconGray"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model="showSetings"
      closeable
      close-icon-position="top-right"
      position="left"
      :style="{ height: '100%', width: '70%' }"
      ><SETING></SETING
    ></van-popup>
  </div>
</template>

<script>
import PLAYMUSIC from "@/components/PlayMusic/index.vue";
import SETING from "@/components/seting/index.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    PLAYMUSIC,
    SETING,
  },
  computed: {
    showSetings: {
      get() {
        return this.showSeting;
      },
      set(val) {
        this.SETSHOWSETING(val);
      },
    },
    ...mapState("seting", ["showSeting"]),
  },
  methods: {
    ...mapMutations("seting", ["SETSHOWSETING"]),
  },
};
</script>

<style lang="less" scoped>
.app {
  i {
    font-size: 20px;
  }
  .iconGray {
    color: #939393;
  }
}
</style>
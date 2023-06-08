<template>
  <div class="layout">
    <keep-alive include="music,user">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "layout",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.layout {
  padding: 0 0 115px 0;
}
</style>
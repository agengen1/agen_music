<template>
  <div class="playdesc">
    <div class="backdescimg">
      <img v-lazy="playDetails.coverImgUrl" />
    </div>
    <div class="content">
      <div class="top">
        <img v-lazy="playDetails.coverImgUrl" />
        <p>{{ playDetails.name }}</p>
      </div>
      <div class="tag" v-if="playDetails.tags && playDetails.tags.length > 0">
        <p>标签:</p>
        <span v-for="item in playDetails.tags" :key="item">{{ item }}</span>
      </div>
      <div class="tag" v-else>
        <p>标签:</p>
        <span>无</span>
      </div>
      <div class="desc" v-if="playDetails.description != ''">
        {{ playDetails.description }}
      </div>
      <div class="desc" v-else>暂无描述</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playdesc",
  props: ["playDetails"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.playdesc {
  .backdescimg {
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 80vh;
    img {
      width: 100%;
      height: 100%;
      filter: blur(70px);
    }
  }
  .content {
    padding: 30px 0 0;
    color: #fff;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 50%;
        border-radius: 10px;
        object-fit: cover;
      }
      p {
        font: 700 14px "";
        margin: 15px 0;
      }
    }
    .tag {
      font: 500 12px "";
      padding: 0 20px;
      p {
        display: inline-block;
      }
      span {
        padding: 2px 8px;
        display: inline-block;
        border-radius: 40px;
        margin: 0 0 0 10px;
        background-color: rgba(47, 47, 47, 0.167);
      }
    }
    .desc {
      height: 39vh;
      overflow: scroll;
      margin: 15px 0 0 0;
      padding: 0 20px;
      font: 500 14px "黑体";
      line-height: 20px;
    }
  }
}
</style>
<template>
  <div class="singerinfo">
    <div class="basicInfo" v-if="info.user">
      <h3>基本信息</h3>
      <p v-if="info.identify">
        <img v-lazy="info.identify.imageUrl" alt="" /><span>{{
          info.identify.imageDesc
        }}</span>
      </p>
      <p v-if="info.artist.alias.length > 0">
        艺人别名: <span>{{ info.artist.alias[0] }}</span>
      </p>
      <p v-if="info.user.gender != 0">
        性别: <span v-if="info.user.gender == 1">男</span>
        <span v-else>女</span>
      </p>
      <p v-if="info.user.signature">
        个人简介: <span>{{ info.user.signature }}</span>
      </p>
    </div>
    <div class="singerintr">
      <h3>艺人简介</h3>
      <p>{{ desc.briefDesc }}</p>
    </div>
    <div v-if="desc.introduction && desc.introduction.length > 0">
      <div class="other" v-for="item in desc.introduction" :key="item.ti">
        <h3>{{ item.ti }}</h3>
        <p>{{ item.txt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerinfo",
  props: ["info", "desc"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.singerinfo {
  margin: 5px 10px 0;
  border-radius: 10px;

  .basicInfo {
    margin: 10px 0;
    padding: 15px 15px 10px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      font-size: 20px;
      color: #000;
    }
    p {
      margin: 8px 0;
      img {
        margin-right: 3px;
        width: 20px;
        height: 20px;
        object-fit: cover;
      }
      font: 700 14px "黑体";
      color: #9e9e9e;
      span {
        margin-left: 5px;
        color: #5d5d5d;
        line-height: 18px;
      }
      &:nth-child(2) {
        display: flex;
        align-items: center;
      }
    }
  }
  .singerintr {
    border-radius: 10px;
    margin: 10px 0;
    padding: 15px 15px 10px;
    background-color: #fff;
    h3 {
      font-size: 20px;
      color: #000;
    }
    p {
      margin: 8px 0;
      font: 700 15px "黑体";
      color: #5d5d5d;
      line-height: 23px;
    }
  }
  .other {
    border-radius: 10px;
    margin: 10px 0;
    padding: 15px 15px 10px;
    background-color: #fff;
    h3 {
      font-size: 20px;
      color: #000;
    }
    p {
      margin: 8px 0;
      font: 700 15px "黑体";
      color: #5d5d5d;
      line-height: 23px;
    }
  }
}
</style>
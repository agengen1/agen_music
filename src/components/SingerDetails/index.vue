<template>
  <div class="singerdetails">
    <van-nav-bar class="header" fixed ref="header">
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <span v-if="JSON.stringify(singerDetails) != '{}'" class="spanname">{{
          singerDetails.artist.name
        }}</span>
      </template>
    </van-nav-bar>
    <div class="backimg" v-if="JSON.stringify(singerDetails) != '{}'">
      <img
        v-if="singerDetails.user"
        v-lazy="singerDetails.user.backgroundUrl"
      />
      <img v-else v-lazy="singerDetails.artist.cover" />
    </div>
    <div class="singerInfo" v-if="JSON.stringify(singerDetails) != '{}'">
      <img v-lazy="singerDetails.artist.avatar" />
      <p>
        <span>{{ singerDetails.artist.name }}</span>
        <img
          v-if="singerDetails.user"
          v-lazy="singerDetails.user.avatarDetail.identityIconUrl"
        />
      </p>
      <p v-if="singerDetails.artist.alias.length > 0">
        {{ singerDetails.artist.alias[0] }}
      </p>
      <p v-if="singerDetails.identify">
        {{ singerDetails.identify.imageDesc }}
      </p>
    </div>
    <van-tabs
      v-model="active"
      sticky
      animated
      :line-width="20"
      :line-height="5"
      background="transparent"
      title-active-color="#000"
      title-inactive-color="#919191"
      color="red"
      ref="tabhe"
    >
      <van-tab title="主页"
        ><SINGERINFO :info="singerDetails" :desc="singerDesc"></SINGERINFO
      ></van-tab>
      <van-tab title="歌曲"
        ><SINGERDETAILSSONG :singer-id="singerId"></SINGERDETAILSSONG
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getSingerDescapi, getSingerDetailsapi } from "@/api/singerlistApi";
import SINGERINFO from "@/components/SingerDetails/singerInfo/index.vue";
import SINGERDETAILSSONG from "@/components/SingerDetails/singerDetailsSong/index.vue";
export default {
  name: "singerdetails",

  data() {
    return {
      singerId: this.$route.params.singerId,
      singerDetails: {}, //歌手详情
      singerDesc: {}, //歌手描述
      active: 0,
      srcollroll: null, //滚动事件
    };
  },

  created() {
    this.getSingerDetails(this.singerId);
    this.getSingerDesc(this.singerId);
    this.srcollroll = () => {
      if (window.scrollY >= 200) {
        this.$refs.header.$el.style.backgroundColor = "#fff";
      } else {
        this.$refs.header.$el.style.backgroundColor = "transparent";
      }
      if (window.scrollY >= 350) {
        this.$refs.tabhe.$refs.nav.style.backgroundColor = "#fff";
      } else {
        this.$refs.tabhe.$refs.nav.style.backgroundColor = "transparent";
      }
    };
    window.addEventListener("scroll", this.srcollroll);
  },

  methods: {
    // 返回上一级
    upperLevel() {
      this.$router.go(-1);
    },
    // 获取歌手详情
    async getSingerDetails(id) {
      const { data: res } = await getSingerDetailsapi(id);
      if (res.code === 200) {
        this.singerDetails = res.data;
      }
    },
    // 获取歌手描述
    async getSingerDesc(id) {
      const { data: res } = await getSingerDescapi(id);
      if (res.code === 200) {
        this.singerDesc = {
          briefDesc: res.briefDesc,
          introduction: res.introduction,
          topicData: res.topicData,
        };
      }
    },
  },
  components: {
    SINGERINFO,
    SINGERDETAILSSONG,
  },
  destroyed() {
    window.removeEventListener("scroll", this.srcollroll);
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-sticky--fixed {
  top: 45px;
}
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
/deep/ .van-tab--active {
  font-weight: 700;
}
.singerdetails {
  background-color: #f9f9f9;
  padding: 0 0 60px;
  .header {
    background-color: transparent;
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
  .backimg {
    width: 100%;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .singerInfo {
    position: relative;
    padding: 30px 0 10px;
    margin: -10px auto 0;
    width: 94%;
    height: 120px;
    border-radius: 10px;
    transform: translateY(-10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fffffff7;
    > img {
      position: absolute;
      top: -30px;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }
    p {
      font: 700 12px "黑体";
      color: rgb(164, 164, 164);
      &:nth-child(2) {
        display: flex;
        align-items: center;
        span {
          font-size: 18px;
          color: #000;
        }
        img {
          margin-left: 5px;
          width: 20px;
          height: 20px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
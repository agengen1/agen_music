<template>
  <div class="user">
    <div class="header" ref="head">
      <div :class="{ b: !zitiXS, w: zitiXS }">
        <van-icon name="wap-nav" @click="clickShowSeting" />
      </div>
      <div :class="{ b: !zitiXS, w: zitiXS }">
        <van-icon name="search" @click="clickSkipSearch" />
      </div>
    </div>
    <div class="user_info">
      <div class="login_w" v-show="!islogin_status">
        <div class="f">
          暂未登录 <span @click="clickSkipLogin">立即登录</span>
        </div>
      </div>
      <div class="login_s" v-show="islogin_status">
        <div class="backimg" v-if="JSON.stringify(userinfo) != '{}'">
          <img v-lazy="userinfo.profile.backgroundUrl" alt="" />
        </div>
        <div class="top" v-if="userinfo.profile">
          <img v-lazy="userinfo.profile.avatarUrl" alt="" />
          <p>{{ userinfo.profile.nickname }}</p>
          <p>
            <span>{{ userinfo.profile.follows }}关注</span
            ><span>{{ userinfo.profile.followeds }}粉丝</span
            ><span>Lv.{{ userinfo.level }}</span>
          </p>
        </div>
        <div class="songSheet" v-if="userPlaylist.length > 0">
          <h3>歌单(官方数据)</h3>
          <div
            class="ssheet"
            v-for="item in userPlaylist"
            :key="item.id"
            @click="goPlaylistDetails(item.id)"
          >
            <div class="left_l">
              <img v-lazy="item.coverImgUrl" alt="" />
            </div>
            <div class="right_r">
              <p>{{ item.name }}</p>
              <p>
                <span>{{ item.trackCount }}首，</span
                ><span>by {{ item.creator.nickname }}，</span>
                <span v-if="item.playCount > 0"
                  >播放{{ item.playCount | CountEconomize }}次</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { getAccountapi, getUserinfoapi, getUserPlayListapi } from "@/api/user";
export default {
  name: "user",

  data() {
    return {
      zitiXS: false, //未登录false 黑色
      scorllU: null,
    };
  },

  created() {
    this.getlogin_status();
  },
  activated() {
    this.scorllU = () => {
      if (window.scrollY >= 150) {
        this.$refs.head.style.backgroundColor = "#fff";
        this.zitiXS = false;
      } else {
        this.$refs.head.style.backgroundColor = "transparent";
        this.zitiXS = true;
      }
    };
    window.addEventListener("scroll", this.scorllU);
  },
  deactivated() {
    window.removeEventListener("scroll", this.scorllU);
  },
  computed: {
    ...mapState("user", [
      "islogin_status",
      "userId",
      "userinfo",
      "userPlaylist",
    ]),
    ...mapState("seting", ["showSeting"]),
  },
  methods: {
    // 点击跳转登录页面
    clickSkipLogin() {
      this.$router.push("/login");
    },
    // 点击跳转歌单详情
    goPlaylistDetails(id) {
      this.$router.push(`/playlistDetails/${id}`);
    },
    // 点击跳转 搜索页面
    clickSkipSearch() {
      this.$router.push("/search/  ");
    },
    // 点击显示或关闭
    clickShowSeting() {
      if (this.showSeting) {
        this.SETSHOWSETING(false);
      } else {
        this.SETSHOWSETING(true);
      }
    },
    // 获取账号信息
    async getAccount() {
      let time = Date.now();
      const { data: res } = await getAccountapi(time);
      if (res.code === 200) {
        this.zitiXS = true;
        this.SETUSERID(res.profile.userId);
        time = Date.now();
        this.getUserinfo(this.userId, time);
        time = Date.now();
        this.getUserPlayList(this.userId, time);
      }
    },
    // 获取用户信息
    async getUserinfo(id) {
      const { data: res } = await getUserinfoapi(id);
      if (res.code === 200) {
        this.SETUSERINFO(res);
      }
    },
    // 获取用户歌单
    async getUserPlayList(id) {
      const { data: res } = await getUserPlayListapi(id);
      if (res.code === 200) {
        this.SETUSERPLAYLIST(res.playlist);
      }
    },
    ...mapActions("user", ["getlogin_status"]),
    ...mapMutations("user", ["SETUSERID", "SETUSERINFO", "SETUSERPLAYLIST"]),
    ...mapMutations("seting", ["SETSHOWSETING"]),
  },
  watch: {
    islogin_status: {
      handler() {
        if (this.islogin_status) {
          this.getAccount();
        } else {
          this.zitiXS = false;
        }
      },
      immediate: true,
    },
  },
  filters: {
    CountEconomize(val) {
      if (val >= 100000000) {
        return (val / 100000000).toFixed(1) + "亿";
      } else if (val >= 10000) {
        return (val / 10000).toFixed(1) + "万";
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .header {
    padding: 5px 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: transparent;
    height: 55px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: 30px;
      i {
        font-size: 28px;
      }
    }
    .b {
      color: #000000;
    }
    .w {
      color: rgb(255, 255, 255);
    }
  }
  .user_info {
    .login_w {
      margin: 100px auto 0;
      width: 80%;
      height: 50px;
      background-color: rgb(245, 244, 244);
      border-radius: 50px;
      .f {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font: 700 18px "黑体";
        color: #a9a9a9;
        span {
          margin-left: 10px;
          color: #ff0000;
          text-decoration: underline;
        }
      }
    }
    .login_s {
      .backimg {
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .top {
        transform: translateY(-40px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
        p {
          margin: 3px 0;
          font: 700 18px " ";
          &:nth-child(3) {
            display: flex;
            span {
              margin: 0 10px;
              font-size: 12px;
              color: #a4a4a4;
            }
          }
        }
      }
      .songSheet {
        padding: 10px;
        .ssheet {
          margin: 10px 0;
          display: flex;
          height: 60px;
          .left_l {
            margin-right: 10px;
            width: 60px;
            img {
              width: 100%;
              object-fit: cover;
              border-radius: 10px;
            }
          }
          .right_r {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              font: 700 14px "";
              &:nth-child(2) {
                font: 500 12px "";
                color: #797979;
              }
            }
          }
        }
      }
    }
  }
}
</style>
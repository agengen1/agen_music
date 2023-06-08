<template>
  <div class="seting">
    <h3>设置</h3>
    <div class="ClearCache">
      <button @click="clickCache">清除缓存</button>
    </div>
    <div class="exitLogin">
      <button @click="exitLogin">退出登录</button>
    </div>
    <p>
      <span>声明</span
      >:此网站所有api接口为网易云所有，本站只仅提供学习，不可用作商业等谋利行为
    </p>
    <p>
      网易接口提供：<a
        href="https://binaryify.github.io/NeteaseCloudMusicApi/#/"
        >点击跳转</a
      >
    </p>
    <div class="syjs">
      <p>使用技术：</p>
      <p><span>vue2</span><span>vue-router</span><span>vuex</span></p>
      <p><span>axios</span><span>vant</span></p>
    </div>
    <div>
      <p>本站开发作者</p>
      <p>QQ: <span>2073923271</span></p>
    </div>
  </div>
</template>

<script>
import { getLoginOutapi } from "@/api/user";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "seting",

  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["islogin_status"]),
    ...mapState("playmusic", ["playmusicList"]),
  },

  methods: {
    async exitLogin() {
      // 退出登录方法;
      if (this.islogin_status) {
        let time = Date.now();
        const { data: res } = await getLoginOutapi(time);
        if (res.code === 200) {
          this.$toast({ message: "退出成功", position: "bottom" });
          this.getlogin_status();
          this.SETUSERINFO({});
          this.SETUSERPLAYLIST([]);
          this.SETUSERID("");
          this.SETSHOWSETING(false);
          this.$router.replace("/layout/user");
        }
      } else {
        this.$toast({
          message: "暂未登录",
          icon: "warning-o",
          position: "bottom",
        });
      }
    },
    // 点击清除缓存
    clickCache() {
      if (this.playmusicList.length > 0) {
        this.$root.$children[0].$children[0].musicPlay();
        localStorage.clear();
        this.SETSHOWSETING(false);
        this.SETMY_SINGINGLISTLABEL([
          {
            name: "推荐",
            hot: false,
            isDelete: false,
          },
          {
            name: "官方",
            hot: false,
            isDelete: false,
          },
          {
            name: "精品",
            hot: false,
            isDelete: false,
          },
        ]);
        this.SETCLEARMUSICLISTCOUNT();
        this.SETSEARCHHISTORYLIST();
        this.$toast({
          message: "清除缓存完成",
          icon: "success",
          position: "bottom",
        });
      } else {
        this.SETSHOWSETING(false);
        this.$toast({
          message: "清除缓存完成",
          icon: "success",
          position: "bottom",
        });
      }
    },
    ...mapActions("user", ["getlogin_status"]),
    ...mapMutations("user", ["SETUSERINFO", "SETUSERPLAYLIST", "SETUSERID"]),
    ...mapMutations("seting", ["SETSHOWSETING"]),
    // 以下清除缓存方法
    ...mapMutations("singinglistlabel", ["SETMY_SINGINGLISTLABEL"]),
    ...mapMutations("playmusic", ["SETCLEARMUSICLISTCOUNT"]),
    ...mapMutations("searchhistory", ["SETSEARCHHISTORYLIST"]),
  },
};
</script>

<style lang="less" scoped>
.seting {
  width: 100%;
  padding: 10px;
  h3 {
    margin: 5px 0 15px;
  }
  div {
    margin: 20px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      width: 80%;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 20px;
      font: 700 18px "";
      color: #2d2d2d;
    }
  }
  .ClearCache {
    button {
      background-image: linear-gradient(to right bottom, red, #ba90f0);
    }
  }
  .exitLogin {
    button {
      background-image: linear-gradient(
        to left bottom,
        rgb(0, 255, 128),
        #9090f0
      );
    }
  }
  > p {
    padding: 5px;
    width: 100%;
    margin: 5px 0;
    border: 0.5px solid #e3e3e3;
    border-radius: 10px;
    a {
      text-decoration: underline;
    }
    span {
      font: 700 18px "";
    }
  }
  > div {
    flex-direction: column;
    span {
      text-decoration: underline;
      font-size: 18px;
      color: #d8661b;
    }
  }
  .syjs {
    margin: 10px 0;
    display: inline-block;
    p {
      &:nth-child(1) {
        font: 700 18px "";
      }
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>
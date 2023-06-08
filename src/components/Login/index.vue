<template>
  <div class="login">
    <div class="header">
      <div>
        <i class="iconfont icon-NMStubiao-" @click="upskiptop"></i>
      </div>
    </div>
    <div class="content" v-if="loginPic != ''">
      <h3>请扫描二维码(使用网易云)</h3>
      <img :src="loginPic" />
      <p><a :href="Gwlogin">点击跳转网易官网登录</a></p>
      <button v-show="islo" class="btn" @click="loginCreate">
        点击生成新的二维码
      </button>
    </div>
  </div>
</template>

<script>
import { getLoginKeyapi, getLoginPicapi, getLoginisOkapi } from "@/api/user";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "login",

  data() {
    return {
      loginPic: "", //二维码
      Gwlogin: "", //官网登录地址
      loginKey: "", //二维码key
      time: 0, //时间戳
      timer: null, //定时器
      islo: false, //过期是否显示
    };
  },

  created() {
    this.loginCreate();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    // 点击返回上一级
    upskiptop() {
      this.$router.go(-1);
    },
    // 生成key,图片
    async loginCreate() {
      this.islo = false;
      clearInterval(this.timer);
      this.time = Date.now();
      const { data: res1 } = await getLoginKeyapi(this.time);
      if (res1.data.code === 200) {
        this.loginKey = res1.data.unikey;
        this.time = Date.now();
        const { data: res2 } = await getLoginPicapi(this.loginKey, this.time);
        if (res2.code === 200) {
          this.loginPic = res2.data.qrimg;
          this.Gwlogin = res2.data.qrurl;
        }
      }
      this.timer = setInterval(async () => {
        this.time = Date.now();
        const { data: res3 } = await getLoginisOkapi(this.loginKey, this.time);
        if (res3.code === 800) {
          clearInterval(this.timer);
          this.islo = true;
          this.$toast({
            message: res3.message,
            icon: "warning-o",
            position: "bottom",
          });
        } else if (res3.code === 801) {
          console.log(res3.message);
        } else if (res3.code === 802) {
          this.$toast({
            message: "授权中",
            icon: "question-o",
            position: "bottom",
          });
        } else if (res3.code === 803) {
          clearInterval(this.timer);
          this.$toast({
            message: "登录成功",
            icon: "success",
            position: "bottom",
          });
          this.getlogin_status();
          this.$router.replace("/layout/user");
        }
      }, 2000);
    },
    ...mapMutations("user", ["SETISLOGIN_STATUS"]),
    ...mapActions("user", ["getlogin_status"]),
  },
};
</script>

<style lang="less" scoped>
.login {
  padding: 56px 10px 0;
  .header {
    padding: 5px 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 55px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: 30px;
      i {
        font-size: 22px;
      }
    }
  }
  .content {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
    }
    .btn {
      margin-top: 40px;
      width: 80%;
      height: 40px;
      border-radius: 50px;
      border: none;
      outline: none;
      font: 600 18px "";
    }
  }
}
</style>
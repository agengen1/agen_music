<template>
  <div class="singersheetlabel">
    <h3>歌单标签</h3>
    <div v-show="!showEdit" class="content">
      <div class="mylabel">
        <h4 class="myEdit">我的歌单广场 <span @click="clickH">编辑</span></h4>
        <div class="mycontent">
          <span
            v-for="item in label.my_SingingListLadel"
            :key="item.name"
            @click="clickThinge((obj = item))"
          >
            <van-tag size="large" type="primary">
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="languageslabel">
        <h4>语种</h4>
        <div class="languagescontent">
          <span
            v-for="item in label.languagesLabel"
            :key="item.name"
            @click="clickThinge((obj = item))"
          >
            <van-tag size="large" type="primary">
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="stylelabel">
        <h4>风格</h4>
        <div class="stylecontent">
          <span
            v-for="item in label.styleLabel"
            :key="item.name"
            @click="clickThinge((obj = item))"
          >
            <van-tag size="large" type="primary">
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="scenelabel">
        <h4>场景</h4>
        <div class="scenecontent">
          <span
            v-for="item in label.sceneLabel"
            :key="item.name"
            @click="clickThinge((obj = item))"
          >
            <van-tag size="large" type="primary">
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="feelinglabel">
        <h4>情感</h4>
        <div class="feelingcontent">
          <span
            v-for="item in label.feelingLabel"
            :key="item.name"
            @click="clickThinge((obj = item))"
          >
            <van-tag size="large" type="primary">
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="themelabel">
        <h4>主题</h4>
        <div class="themecontent">
          <span
            v-for="item in label.themeLabel"
            :key="item.name"
            @click="clickThinge((obj = item))"
          >
            <van-tag size="large" type="primary">
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
    </div>
    <div v-show="showEdit" class="content">
      <div class="mylabel">
        <h4 class="myEdit">我的歌单广场 <span @click="clickH">完成</span></h4>
        <div class="mycontent">
          <span
            v-for="item in label.my_SingingListLadel"
            :key="item.name"
            @click="clickThinge((obj = item), (type = 0))"
          >
            <van-tag size="large" type="primary">
              <van-icon name="cross" v-if="item.isDelete" />
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="languageslabel">
        <h4>语种</h4>
        <div class="languagescontent">
          <span
            v-for="item in label.languagesLabel"
            :key="item.name"
            @click="clickThinge((obj = item), (type = 1))"
          >
            <van-tag size="large" type="primary">
              <van-icon name="plus" />
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="stylelabel">
        <h4>风格</h4>
        <div class="stylecontent">
          <span
            v-for="item in label.styleLabel"
            :key="item.name"
            @click="clickThinge((obj = item), (type = 1))"
          >
            <van-tag size="large" type="primary">
              <van-icon name="plus" />
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="scenelabel">
        <h4>场景</h4>
        <div class="scenecontent">
          <span
            v-for="item in label.sceneLabel"
            :key="item.name"
            @click="clickThinge((obj = item), (type = 1))"
          >
            <van-tag size="large" type="primary">
              <van-icon name="plus" />
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="feelinglabel">
        <h4>情感</h4>
        <div class="feelingcontent">
          <span
            v-for="item in label.feelingLabel"
            :key="item.name"
            @click="clickThinge((obj = item), (type = 1))"
          >
            <van-tag size="large" type="primary">
              <van-icon name="plus" />
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
      <div class="themelabel">
        <h4>主题</h4>
        <div class="themecontent">
          <span
            v-for="item in label.themeLabel"
            :key="item.name"
            @click="clickThinge((obj = item), (type = 1))"
          >
            <van-tag size="large" type="primary">
              <van-icon name="plus" />
              <i class="iconfont icon-jinrituijian" v-if="item.hot"></i>
              {{ item.name }}
            </van-tag>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "singersheetlabel",

  data() {
    return {
      showEdit: false, //编辑按钮开关
    };
  },

  computed: {
    ...mapState("singinglistlabel", ["label"]),
  },

  methods: {
    // 点击关闭
    clickClose() {
      console.log("关闭！");
    },
    // 点击切换编辑
    clickH() {
      this.showEdit = !this.showEdit;
    },
    // 点击跳转还是添加
    clickThinge(obj, type) {
      if (!this.showEdit) {
        console.log("跳转歌单页面", obj.name);
        this.$router.push(`/taggedPlaylist/${obj.name}`);
      } else {
        if (type === 0) {
          if (obj.name != "推荐" && obj.name != "官方" && obj.name != "精品") {
            this.DELETESINGINGLISTLABEL(obj);
          }
        } else {
          this.PUSHSINGINGLISTLABEL(obj);
        }
      }
    },
    ...mapMutations("singinglistlabel", [
      "PUSHSINGINGLISTLABEL",
      "DELETESINGINGLISTLABEL",
    ]),
  },
};
</script>

<style lang="less" scoped>
.singersheetlabel {
  padding: 10px;
  h3 {
    margin: 5px 0 20px;
  }
  .content {
    > div {
      .myEdit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: red;
        span {
          padding: 2px 8px;
          margin-right: 10px;
          font-size: 14px;

          border-radius: 5px;
          border: 1px solid red;
        }
      }
      > div {
        padding: 5px;
        > span {
          display: inline-block;
          margin: 5px;
          > span {
            border-radius: 10px;
            background-color: rgb(243, 243, 243);
            color: #4c4c4c;
            font-weight: 700;
            i {
              margin-right: 5px;
              font-size: 12px;
              font-weight: 700;
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>
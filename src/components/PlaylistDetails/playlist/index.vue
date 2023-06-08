<template>
  <div class="playlist">
    <div class="top">
      <i class="iconfont icon-gedan"></i>
      <h4>
        歌曲列表 <span>({{ playlist.length }})</span>
      </h4>
    </div>
    <ul class="content">
      <li v-for="(item, index) in playlist" :key="item.id">
        <div class="left">{{ index + 1 }}</div>
        <div class="right" @click="clickMusic(item)">
          <p>{{ item.name }}</p>
          <p v-if="item.ar.length > 0">
            {{ item.ar | joinName }} - {{ item.al.name }}
          </p>
          <p v-else>{{ item.al.name }}</p>
        </div>
        <van-icon name="arrow" class="arrow" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import authorMinxin from "@/utils/AuthorPocessMixin";
export default {
  name: "playlist",
  props: ["playlist"],
  mixins: [authorMinxin],
  data() {
    return {};
  },

  methods: {
    // 点击音乐播放并添加到播放列表,显示歌曲详情页
    clickMusic(music) {
      let obj = {
        al: music.al,
        name: music.name,
        ar: music.ar,
        id: music.id,
      };
      this.PUSHMUSIC(obj);
      this.SETCLICKMUSICID(music.id);
      this.SETSHOWMUSICDETAILS(true);
    },
    // 添加音乐方法
    ...mapMutations("playmusic", [
      "PUSHMUSIC",
      "SETSHOWMUSICDETAILS",
      "SETCLICKMUSICID",
    ]),
  },
};
</script>

<style lang="less" scoped>
.playlist {
  background-color: rgba(#fff, 0.9);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  .top {
    overflow: hidden;
    padding: 10px 0 10px 10px;
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
      font-size: 24px;
      color: red;
    }
    h4 {
      span {
        font-size: 14px;
        color: #585858;
      }
    }
  }
  .content {
    // background-color: #fff;
    // background-color: rgba(#fff, 0.9);
    li {
      background-color: transparent;
      position: relative;
      width: 100%;
      height: 50px;
      display: flex;
      padding: 5px 0;
      padding-right: 40px;
      .left {
        width: 40px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        color: #606060be;
        font-size: 18px;
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: 600;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          &:nth-child(1) {
            font-size: 14px;
          }
          &:nth-child(2) {
            font-size: 12px;
            color: #606060be;
          }
        }
      }
      .arrow {
        font-size: 22px;
        position: absolute;
        top: 14px;
        right: 8px;
        color: #606060be;
      }
    }
  }
}
</style>
<template>
  <div class="musiclist">
    <h3>
      <p>
        当前播放列表 <span>({{ playmusicList.length }})</span>
      </p>
      <van-icon name="cross" @click="downMusicPlay" />
    </h3>
    <ul ref="Musiclist">
      <li v-for="item in playmusicList" :key="item.id">
        <p
          @click="clickMusicChang(item.id)"
          :class="{
            red: item.id == playmusicList[playmusicCount].id,
          }"
        >
          <i
            v-if="item.id == playmusicList[playmusicCount].id"
            class="iconfont icon-icon_zhengzaibofang-xian play"
          ></i>
          {{ item.name }}<span>- {{ item.ar | joinName }}</span>
        </p>
        <van-icon name="cross" @click="deleteMusic(item.id)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authorMinxin from "@/utils/AuthorPocessMixin";
export default {
  name: "musiclist",
  mixins: [authorMinxin],
  mounted() {
    let li_red = document.querySelector(".red");
    if (li_red) {
      this.$refs.Musiclist.scrollTop = li_red.offsetTop - 150;
    }
  },
  computed: {
    ...mapState("playmusic", [
      "playmusicList",
      "playmusicCount",
      "isplayButton",
    ]),
  },
  methods: {
    // 点击关闭 歌曲播放列表
    downMusicPlay() {
      this.SETSHOWMUSICPLAYLIST(false);
    },
    // 点击音乐切换音乐
    clickMusicChang(id) {
      let playCount = 0;
      this.playmusicList.filter((e, i) => {
        if (e.id == id) {
          playCount = i;
          return true;
        }
      });
      this.SETPLAYMUSICCOUNT(playCount);
    },
    // 点击删除音乐播放列表中的此歌曲
    deleteMusic(id) {
      this.DELETEMUSIC(id);
    },
    ...mapMutations("playmusic", [
      "SETSHOWMUSICPLAYLIST",
      "SETPLAYMUSICCOUNT",
      "DELETEMUSIC",
    ]),
  },
};
</script>

<style lang="less" scoped>
.musiclist {
  position: relative;
  padding: 44px 15px 0;
  h3 {
    position: absolute;
    top: 0;
    width: 92%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eaeaea;
    p {
      flex: 1;
    }
    span {
      font-size: 14px;
      color: #606060be;
    }
    i {
      font-size: 24px;
      font-weight: 700;
    }
  }
  ul {
    height: 410px;
    overflow: auto;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      p {
        width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-family: "黑体";
        span {
          font-size: 12px;
          color: #606060be;
        }
      }
      .red {
        color: red;
        i {
          color: red;
          margin-right: -2px;
          vertical-align: bottom;
        }
        span {
          color: red;
        }
      }
      .play {
        animation: playMusic 2s linear infinite;
      }
      i {
        font-size: 24px;
        color: #606060be;
      }
    }
  }
  @keyframes playMusic {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
}
</style>
<template>
  <div class="rankinglist">
    <van-nav-bar class="header" fixed>
      <template #left>
        <i class="iconfont icon-NMStubiao-" @click="upperLevel"></i>
        <span>排行榜</span>
      </template>
    </van-nav-bar>
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div class="rank" v-else>
      <div>
        <div
          class="authority"
          v-for="item in authorityRankList"
          :key="item.id"
          @click="clickSkipPlayDetails(item.id)"
        >
          <h3>
            {{ item.name }}<span>{{ item.updateFrequency }}</span>
          </h3>
          <div>
            <img v-lazy="item.coverImgUrl" />
            <van-icon name="play" />
            <ul>
              <li v-for="(it, index) in item.tracks" :key="index">
                <span>{{ index + 1 }}</span>
                <p>
                  <span>{{ it.first }}</span> -
                  <span>{{ it.second }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div
          class="other"
          v-for="item in otherRankList"
          :key="item.id"
          @click="clickSkipPlayDetails(item.id)"
        >
          <img v-lazy="item.coverImgUrl" />
          <span>{{ item.updateFrequency }}</span>
          <van-icon name="play" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankingListapi } from "@/api/rankinglistApi";
export default {
  name: "rankinglist",

  data() {
    return {
      authorityRankList: [], //官方榜
      otherRankList: [], //其他榜
      loadFlag: true, //加载状态
    };
  },
  created() {
    this.getRankingList();
  },
  methods: {
    // 返回上一级
    upperLevel() {
      this.$router.go(-1);
    },
    // 点击跳转到歌单信息
    clickSkipPlayDetails(id) {
      this.$router.push(`/playlistDetails/${id}`);
    },
    // 获取排行榜信息
    async getRankingList() {
      this.loadFlag = true;
      const { data: res } = await getRankingListapi();
      this.loadFlag = false;
      if (res.code === 200) {
        this.authorityRankList = res.list.filter((e) => {
          if (e.tracks && e.tracks.length > 0) {
            return true;
          }
        });
        this.otherRankList = res.list.filter((e) => {
          if (e.tracks == undefined || e.tracks.length <= 0) {
            return true;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.rankinglist {
  padding: 46px 10px 60px;
  .header {
    background-color: #fff;
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
  .rank {
    > div {
      &:nth-child(2) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
    .authority {
      margin: 10px 0;
      padding: 5px 20px;
      width: 100%;
      height: 130px;
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid #e6e6e6;
      h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        span {
          font-size: 12px;
          color: #acacac;
        }
      }
      > div {
        position: relative;
        display: flex;
        img {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          object-fit: cover;
          margin-right: 20px;
        }
        i {
          position: absolute;
          top: 22%;
          left: 4%;
          font-size: 40px;
          color: #fffc;
        }
        ul {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          li {
            display: flex;
            align-items: center;
            font: 700 16px "黑体";
            > span {
              width: 20px;
            }
            p {
              flex: 1;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              span {
                &:nth-child(2) {
                  color: #5f5f5f;
                }
              }
            }
          }
        }
      }
    }
    .other {
      position: relative;
      margin: 5px 0;
      width: 31%;
      img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
      span {
        width: 100%;
        position: absolute;
        bottom: 15px;
        left: 0;
        text-align: center;
        display: inline-block;
        font: 700 12px "黑体";
        color: #fff;
      }
      i {
        position: absolute;
        right: 28%;
        bottom: 28%;
        font-size: 52px;
        color: #fffc;
      }
    }
  }
}
</style>
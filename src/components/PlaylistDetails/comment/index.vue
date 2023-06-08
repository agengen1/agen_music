<template>
  <div class="comment">
    <h4>
      评论区<span>({{ commentCount }})</span> -  <span>排序(最新)</span>
    </h4>
    <van-loading type="spinner" v-if="loadFlag" color="red" vertical
      >加载中...</van-loading
    >
    <div class="content" v-else>
      <div class="comment" v-for="item in commentList" :key="item.commentId">
        <div class="left">
          <img v-lazy="item.user.avatarUrl" alt="" />
        </div>
        <div class="right">
          <div class="info">
            <p>
              <span>{{ item.user.nickname }}</span>
              <span
                ><em v-if="item.likedCount != 0">{{ item.likedCount }}</em
                ><van-icon name="good-job-o"
              /></span>
            </p>
            <p>
              <span>{{ item.timeStr }}</span
              ><span v-if="item.ipLocation.location != ''">{{
                item.ipLocation.location
              }}</span>
            </p>
          </div>
          <div class="commentdesc">{{ item.content }}</div>
          <div
            class="reply"
            v-if="item.beReplied.length > 0"
            @click="clickShowReply(item)"
          >
            <p>
              <span>{{ item.beReplied.length }}条回复</span
              ><van-icon name="arrow" />
            </p>
          </div>
        </div>
      </div>
      <div v-show="loadDisplay" class="loading" @click="clickLoadcomment">
        <p>点击加载更多</p>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <van-popup
      v-model="showreply"
      position="bottom"
      closeable
      :style="{ height: '90%', width: '100%' }"
      ><REPLY :reply-obj="data_reply"></REPLY
    ></van-popup>
  </div>
</template>

<script>
import { getCommentListapi } from "@/api/playlistApi";
import REPLY from "@/components/PlaylistDetails/comment/reply/index.vue";
export default {
  name: "comment",
  props: ["commentCount", "songSheetId"],
  data() {
    return {
      commentList: [], //评论列表
      pageCount: 0, //分页数
      loadFlag: true, //加载状态
      loadDisplay: true, //true 表示显示加载按钮
      time: 0, //时间戳
      showreply: false, //被回复开启状态
      data_reply: {}, //被回复的对象
    };
  },
  components: {
    REPLY,
  },
  methods: {
    // 获取评论
    async getCommentList(id, count, time) {
      const { data: res } = await getCommentListapi(id, count, time);
      if (res.code === 200) {
        this.loadFlag = false;
        if (res.comments.length <= 0 || res.comments.hotComments <= 0) {
          this.loadDisplay = false;
        } else {
          this.handleComment(res);
        }
      }
    },
    // 处理评论
    handleComment(obj) {
      let arr_All;
      let arr_level1;
      let arr_level2;
      if (
        obj.comments &&
        obj.comments.length > 0 &&
        obj.hotComments &&
        obj.hotComments.length > 0
      ) {
        arr_All = [...obj.comments, ...obj.hotComments];
      } else {
        arr_All = [...obj.comments];
      }
      arr_level1 = arr_All.filter((e) => {
        return e.beReplied.length <= 0;
      });
      // arr_level1 = [...this.commentList, ...arr_level1];
      arr_level2 = arr_All.filter((e) => {
        return e.beReplied.length > 0;
      });

      arr_level1.forEach((e) => {
        arr_level2.forEach((pe) => {
          if (pe.parentCommentId && pe.parentCommentId === e.commentId) {
            e.beReplied.push(pe);
          }
        });
      });
      this.commentList = [...this.commentList, ...arr_level1].sort((a, b) => {
        return b.time - a.time;
      });
    },
    // 点击加载评论
    clickLoadcomment() {
      this.pageCount++;
      this.getCommentList(
        this.songSheetId,
        this.pageCount,
        this.commentList[this.commentList.length - 1].time
      );
    },
    // 点击显示回复
    clickShowReply(obj) {
      this.showreply = !this.showreply;
      this.data_reply = obj;
    },
  },
  watch: {
    songSheetId: {
      handler() {
        this.loadFlag = true;
        this.commentList = [];
        this.time = Date.now();
        if (this.commentList.length > 0) {
          this.getCommentList(
            this.songSheetId,
            this.pageCount,
            this.commentList[this.commentList.length - 1].time
          );
        } else {
          this.getCommentList(this.songSheetId, this.pageCount, this.time);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  padding: 0 10px 10px;
  h4 {
    height: 50px;
    width: 100%;
    line-height: 50px;
    background-color: #fff;
  }
  .content {
    height: 86vh;
    overflow: auto;
    .comment {
      display: flex;
      .left {
        width: 50px;
        img {
          width: 80%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .right {
        border-bottom: 0.5px solid #f3f3f3;
        flex: 1;
        display: flex;
        flex-direction: column;
        .info {
          p {
            margin: 2px 0;
            width: 100%;
            font: 560 12px "";
            color: #9c9c9c;
            &:nth-child(1) {
              font-size: 14px;
              color: #545454;
              display: flex;
              justify-content: space-between;
              > span {
                em {
                  margin-right: 2px;
                  font: 500 12px "";
                  color: #9c9c9c;
                }
                i {
                  font-size: 18px;
                  color: #9c9c9c;
                }
              }
            }
            &:nth-child(2) {
              span {
                margin: 0 3px;
              }
            }
          }
        }
        .commentdesc {
          width: 100%;
          margin: 10px 0;
          font: 600 12px "";
          line-height: 20px;
          word-wrap: break-word;
          word-break: break-all;
        }
        .reply {
          margin: 0 0 5px 0;
          font: 500 12px "";
          display: flex;
          align-items: center;
          i {
            margin-left: 2px;
          }
          color: #2c6fff;
        }
      }
    }

    .loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: none;
      p {
        font: 700 14px "黑体";
        color: #606060be;
      }
      i {
        font-size: 20px;
        color: #606060be;
      }
    }
  }
}
</style>
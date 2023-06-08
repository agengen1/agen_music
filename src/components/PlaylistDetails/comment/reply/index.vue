<template>
  <div class="reply">
    <h4>
      回复<span>({{ replyObj.beReplied.length }})</span>
    </h4>
    <div class="reply__content">
      <div>
        <div class="ycomment">
          <div class="left">
            <img v-lazy="replyObj.user.avatarUrl" alt="" />
          </div>
          <div class="right">
            <div class="info">
              <p>
                <span>{{ replyObj.user.nickname }}</span>
                <span
                  ><em v-if="replyObj.likedCount != 0">{{
                    replyObj.likedCount
                  }}</em
                  ><van-icon name="good-job-o"
                /></span>
              </p>
              <p>
                <span>{{ replyObj.timeStr }}</span>
              </p>
            </div>
            <div class="commentdesc">{{ replyObj.content }}</div>
          </div>
        </div>
      </div>
      <div class="reply_contnet">
        <h5>全部回复</h5>
        <div>
          <div
            class="comment"
            v-for="item in replyObj.beReplied"
            :key="item.commentId"
          >
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
                  <span>{{ item.timeStr }}</span>
                </p>
              </div>
              <div class="commentdesc">{{ item.content }}</div>
              <div class="replyas" v-if="item.beReplied.length > 0">
                <p
                  v-for="itemX in item.beReplied"
                  :key="itemX.commentId"
                  v-show="replyObj.commentId != itemX.beRepliedCommentId"
                >
                  <span>{{ itemX.user.nickname }}</span
                  ><span> : {{ itemX.content }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reply",
  props: ["replyObj"],
  data() {
    return {};
  },

  watch: {
    replyObj: {
      handler() {
        this.replyObj.beReplied.sort((a, b) => {
          return a.time - b.time;
        });
      },
      immediate: true,
    },
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.reply {
  padding: 0 10px 10px;
  h4 {
    background-color: #fff;
    height: 50px;
    width: 100%;
    line-height: 50px;
  }
  .reply__content {
    height: 80vh;
    overflow: scroll;
  }
  .reply_contnet {
    h5 {
      margin: 5px 0;
    }
  }
  .ycomment {
    display: flex;
    border-bottom: 2px solid #f3f3f3;
    .left {
      width: 50px;
      img {
        width: 80%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .right {
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
            font-size: 12px;
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
        margin: 10px 0;
        font: 600 12px "";
        line-height: 20px;
      }
    }
  }
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
      padding: 0 0 10px 0;
      .info {
        p {
          margin: 2px 0;
          width: 100%;
          font: 560 12px "";
          color: #9c9c9c;
          &:nth-child(1) {
            font-size: 12px;
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
        margin: 10px 0;
        font: 600 12px "";
        line-height: 20px;
      }
      .replyas {
        padding-left: 10px;
        border-left: 3px solid #ececec;
        margin: 0 0 5px 0;
        font: 500 12px "";
        display: flex;
        align-items: center;
        color: #2c6fff;
        span {
          &:nth-child(2) {
            color: #9c9c9c;
          }
        }
      }
    }
  }
}
</style>
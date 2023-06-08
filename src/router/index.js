import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    name: "layout",
    meta: {
      title: "主页面",
    },
    redirect: "/layout/music",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "user",
        name: "user",
        meta: {
          title: "我的页面",
        },
        component: () => import("@/views/Layout/user/index.vue"),
      },
      {
        path: "music",
        name: "music",
        meta: {
          title: "音乐页面",
        },
        component: () => import("@/views/Layout/Music/index.vue"),
      },
    ],
  },
  {
    path: "/playlistDetails/:id",
    name: "playlistDetails",
    meta: {
      title: "歌单详情",
    },
    component: () => import("@/components/PlaylistDetails/index.vue"),
    props: true,
  },
  {
    path: "/search/:val",
    name: "search",
    meta: {
      title: "搜索页面",
    },
    component: () => import("@/views/Layout/search/index.vue"),
    props: true,
  },
  {
    path: "/searchResult/:searchVal",
    name: "searchResult",
    meta: {
      title: "搜索结果页面",
    },
    component: () => import("@/views/Layout/search/searchResult/index.vue"),
    props: true,
  },
  {
    path: "/singerSquare",
    name: "singerSquare",
    meta: {
      title: "歌单广场",
    },
    component: () => import("@/views/Layout/singerSquare/index.vue"),
  },
  {
    path: "/taggedPlaylist/:label",
    name: "taggedPlaylist",
    meta: {
      title: "标签歌单",
    },
    component: () =>
      import("@/views/Layout/singerSquare/taggedPlaylist/index.vue"),
    props: true,
  },
  {
    path: "/rankingList",
    name: "rankinglist",
    meta: {
      title: "排行榜",
    },
    component: () => import("@/views/Layout/rankingList/index.vue"),
  },
  {
    path: "/recommend",
    name: "recommend",
    meta: {
      title: "今日推荐",
    },
    component: () => import("@/views/Layout/recommend/index.vue"),
  },
  {
    path: "/singerList",
    name: "singerList",
    meta: {
      title: "歌手分类页",
    },
    component: () => import("@/views/Layout/singerList/index.vue"),
  },
  {
    path: "/singerDetails/:singerId",
    name: "singerDetails",
    meta: {
      title: "歌手详情页",
    },
    component: () => import("@/components/SingerDetails/index.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录页",
    },
    component: () => import("@/components/Login/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

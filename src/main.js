import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入Vant组件库
import Vant from "vant";
// 导入vant lazy 懒加载库
import { Lazyload } from "vant";
//导入Vant组件库样式表
import "vant/lib/index.less";
//导入icon样式表
import "@/assets/iconfont/iconfont.css";
// 导入css初始化样式表
import "../public/restet.css";
Vue.config.productionTip = false;
//注册为插件
Vue.use(Vant);
Vue.use(Lazyload);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

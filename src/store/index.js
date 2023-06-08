import Vue from "vue";
import Vuex from "vuex";
import playmusic from "./playmusiclist";
import searchhistory from "./searchhistory";
import singinglistlabel from "./singinglistlabel";
import user from "./user";
import seting from "./seting";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playmusic,
    searchhistory,
    singinglistlabel,
    user,
    seting,
  },
});

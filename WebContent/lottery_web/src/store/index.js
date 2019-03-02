import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import list from './modules/'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({

  modules: {
    user: list.user,
    member: list.member,
    help: list.help,
    lottery: list.lottery,
    common: list.common,
  },
  
  strict: debug,
  plugins: debug ? [createLogger()] : []
  
});

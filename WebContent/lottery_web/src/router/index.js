import Vue from "vue";
import Router from "vue-router";
import IndexContainer from "@/components/indexContainer";
const Index = resolve => require(["@/components/index/index"], resolve);
const GameList = resolve =>
  require(["@/components/gameList/gameList"], resolve);
const Electronic = resolve =>
  require(["@/components/electronicPage/electronicIndex"], resolve);
const Sport = resolve =>
  require(["@/components/sportPage/sportIndex"], resolve);
const Live = resolve => require(["@/components/livePage/liveIndex"], resolve);
const Fish = resolve => require(["@/components/fishPage/fishIndex"], resolve);
const Mobile = resolve => require(["@/components/mobile/mobile"], resolve);
const HistoryOpenResult = resolve =>
  require(["@/components/historyOpenResult/historyOpenResult"], resolve);
const Rule = resolve => require(["@/components/rule/rule"], resolve);
const SignUp = resolve => require(["@/components/signUp/signUp"], resolve);
const SpreadSignUp = resolve =>
  require(["@/components/spreadSignUp/spreadSignUp"], resolve);
const PromosActive = resolve =>
  require(["@/components/promosActive/promosActive"], resolve);
const OpenWinResult = resolve =>
  require(["@/components/openWinResult/openWinResult"], resolve);
const Spare = resolve => require(["@/components/spare/spare"], resolve);
const LoginNotice = resolve =>
  require(["@/components/loginNotice/loginNotice"], resolve);
import member from "./member";
import lottery from "./lottery";
import help from "./help";
import trend from "./trend";
import store from "store";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: IndexContainer,
      children: [
        {
          path: "/",
          component: Index,
          alias: "/index",
          meta: {
            title: store.getters.l_lotteryWebSiteInfo.siteName
          }
        },
        {
          path: "/gameList",
          name: "gameList",
          component: GameList,
          meta: {
            title: "彩票大厅"
          }
        },
        {
          path: "/electronic",
          name: "electronic",
          component: Electronic,
          meta: {
            title: "电子游戏"
          }
        },
        {
          path: "/live",
          name: "live",
          component: Live,
          meta: {
            title: "真人视讯"
          }
        },
        {
          path: "/sport",
          name: "sport",
          component: Sport,
          meta: {
            title: "体育赛事"
          }
        },
        {
          path: "/fish",
          name: "fish",
          component: Fish,
          meta: {
            title: "对战游戏"
          }
        },
        {
          path: "/openWinResult",
          name: "openWinResult",
          component: OpenWinResult,
          meta: {
            title: "开奖结果"
          }
        },
        {
          path: "/lotts/:lottsCode/historyOpenResult",
          name: "historyOpenResult",
          component: HistoryOpenResult,
          meta: {
            title: "历史开奖结果"
          }
        },
        {
          path: "/rule",
          name: "rule",
          component: Rule,
          meta: {
            title: "帮助中心"
          }
        },
        {
          path: "/mobile",
          name: "mobile",
          component: Mobile,
          meta: {
            title: "手机投注"
          }
        },
        {
          path: "/signUp",
          name: "signUp",
          component: SignUp,
          meta: {
            title: "注册"
          }
        },
        {
          path: "/active",
          name: "active",
          component: PromosActive,
          meta: {
            title: "优惠活动"
          }
        },


       {
          path: "/spreadSignUp",
          name: "spreadSignUp",
          component: SpreadSignUp,
          meta: {
            title: "注册"
          }
        },




        {
          path: "/spare",
          name: "spare",
          component: Spare,
          meta: {
            title: "备用网址"
          }
        }
      ]
    },
    {
      path: "/loginNotice",
      component: LoginNotice,
      meta: {
        title: "协议与规则"
      }
    },
    {
      ...member
    },
    {
      ...help
    },
    {
      ...lottery
    },
    {
      ...trend
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

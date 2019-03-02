// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueLazyLoad from "vue-lazyload";
import {
  Select,
  MessageBox,
  Loading,
  Tooltip,
  Icon,
  Input,
  Option,
  Checkbox,
  DatePicker,
  Notification,
  Message,
  CheckboxGroup
} from "element-ui";
// import Element from 'element-ui';
import VueClipboard from "vue-clipboard2";
import "common/sass/index.sass";
import "common/sass/element-variables.sass";
import VueWechatTitle from "vue-wechat-title";
import img1 from "common/images/_1.png";
import img2 from "common/images/_2.png";
import img3 from "common/images/_3.png";
import img4 from "common/images/_4.png";
import img5 from "common/images/_5.png";
import img6 from "common/images/_6.png";
import $ from "jquery";
import comJS from "./common/js/common";
Vue.config.productionTip = false;
Vue.use(Select);
Vue.use(Tooltip);
Vue.use(Input);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Icon);
Vue.use(CheckboxGroup);
Vue.use(Loading.directive);
Vue.use(VueLazyLoad, {
  error: "./components/asideLeft/add.png",
  loading: "./components/asideLeft/arrowBg.png"
});
// Vue.use(VueLazyLoad);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;
Vue.prototype.$messageFadeIn = Message;
Vue.prototype.$message = options => {
  MessageBox.alert(options.msg, options.title, {
    confirmButtonText: options.confirmButtonText,
    lockScroll: options.lockScroll,
    center: options.center
    //type: options.type,
  });
};
// 融云的方法
// 这是公共方法
// Vue.prototype.$com = comJS;
// if (!store.getters.set_connectstatus) {
//   comJS.RongIMInit(store.getters.u_ryToken);
// }
Vue.prototype.convertImgPath = num => {
  switch (num) {
    case "1":
      return img1;
      break;
    case "2":
      return img2;
      break;
    case "3":
      return img3;
      break;
    case "4":
      return img4;
      break;
    case "5":
      return img5;
      break;
    case "6":
      return img6;
      break;
  }
};

Vue.prototype.caleHZ = item => {
  if (item.length <= 0) return false;
  let count = 0;
  item.forEach((obj, index) => {
    count += parseInt(obj);
  });
  return count;
};

Vue.prototype.openNewWindow = url => {
  window.open(
    url,
    "newwindow",
    "height=600,width=750,top=10%,left=50%,toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no"
  );
};

// Vue.use(Element);

Vue.use(VueClipboard);
Vue.use(VueWechatTitle);
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
new Vue({
  el: "#app",
  created() {
    store.dispatch("l_lotteryWebSiteInfo");
    Date.prototype.Format = function(fmt) {
      //author: meizz
      let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };

    if (!sessionStorage.__user_name__) {
      // Ask other tabs for session storage
      localStorage.setItem("getSessionStorage", Date.now());
    }

    window.addEventListener("storage", function(event) {
      if (event.key == "getSessionStorage") {
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        localStorage.removeItem("sessionStorage");
      } else if (
        event.key == "sessionStorage" &&
        !sessionStorage.__user_name__
      ) {
        // sessionStorage is empty -> fill it
        let data = JSON.parse(event.newValue);
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
        if (localStorage.getItem("__WEB_SITE_NAME__")) {
          store.commit(
            "U_SET_USER_NAME",
            localStorage.getItem("__WEB_SITE_NAME__")
          );
        }
      }
    });
  },
  router,
  store,
  components: {
    App
  },
  template: "<App/>",
  render: h => h(App)
});

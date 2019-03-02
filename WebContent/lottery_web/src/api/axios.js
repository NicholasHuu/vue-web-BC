import axios from "axios";
import { NOT_LOGIN } from "./config";
import { Loading, MessageBox } from "element-ui";
import store from "store";
import { saveUserName } from "common/js/cache";

let isOnce = false;
let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
axios.defaults.maxRedirects = 8;
//请求拦截器
axios.interceptors.request.use(
  config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.msg = "错误请求";
          break;
        case 401:
          error.msg = "未授权，请重新登录";
          break;
        case 403:
          error.msg = "拒绝访问";
          break;
        case 404:
          error.msg = "请求错误,未找到该资源";
          break;
        case 405:
          error.msg = "请求方法未允许";
          break;
        case 408:
          error.msg = "请求超时";
          break;
        case 500:
          error.msg = "服务器端出错";
          break;
        case 501:
          error.msg = "网络未实现";
          break;
        case 502:
          error.msg = "网络错误";
          break;
        case 503:
          error.msg = "服务不可用";
          break;
        case 504:
          error.msg = "网络超时";
          break;
        case 505:
          error.msg = "http版本不支持该请求";
          break;
        default:
          error.msg = `连接错误${error.response.status}`;
      }
    } else {
      if (error.message == "操作取消") {
        return;
      } else {
        error.msg = "请求超时,请刷新请重试";
      }
    }
    return Promise.resolve(error);
  }
);

axios.defaults.baseURL = "/";
//设置默认请求头
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};
axios.defaults.timeout = 25000;

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        resolve(res);
      });
    });
  },
  //post请求
  post(urlObj, param) {
    let loadingInstance = {};
    let options = {
      lock: false,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgb(0, 0, 0, 0.7)"
    };
    // if (urlObj.isShowLoading) {
    //   loadingInstance = Loading.service(options);
    // }

    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: urlObj.url,
        data: param,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        if (res && res.data) {
          if (NOT_LOGIN.indexOf(res.data.errorCode) != -1) {
            if (!store.getters.u_isShowLoginPop && !isOnce) {
              isOnce = true;
              MessageBox.alert(res.data.msg, "温馨提示", {
                confirmButtonText: "确定",
                center: true,
                lockScroll: false,
                callback: action => {
                  isOnce = false;
                  store.commit("U_SET_USER_NAME", saveUserName(""));
                  window.location.href = window.location.origin;
                }
              });
            }
          } else {
            resolve(res.data);
          }
        } else {
          if (res) {
            resolve(res);
          }
        }
        // if (urlObj.isShowLoading) {
        //   loadingInstance.close();
        // }
      });
    });
  }
};

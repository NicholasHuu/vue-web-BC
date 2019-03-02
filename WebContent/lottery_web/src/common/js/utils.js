import store from "store";

//  判断是否设置资金密码
export function estimateMoneyPsw() {
  let info = store.getters.m_memberInfo;
  if (!info.hasRealName || !info.hasWithdrawPwd) {
    store.commit("u_setMoneyPwStatus", true);
    return false;
  }
  return true;
}
function switchMoneyPswStatus(status) {
  return status;
}

export function userException(msg) {
  throw msg;
}

export function formatTimer(second, type) {
  type = type || 0;
  if (second < 0) return 0;

  let day = ~~(second / (24 * 60 * 60));
  second = second - day * 24 * 60 * 60;
  let hour = ~~(second / (60 * 60));
  second = second - hour * 60 * 60;
  let min = ~~(second / 60);
  second = second - min * 60;
  if (type == 0) {
    // 天
    if (day > 0) day = day + "天";
    else day = "";

    // 小时
    if (hour > 0) hour = hour + "小时";
    else hour = "";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min + "分";
    } else if (min <= 0) {
      min = "00" + "分";
    } else {
      min += "分";
    }
    // 秒
    if (second < 10) second = "0" + second;
    return day + hour + "" + min + second + "秒";
  } else if (type == 100) {
    // 天
    if (day > 0) day = day + "天";
    else day = "";

    // 小时
    if (hour > 0) hour = 24 - hour;
    else hour = "";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min;
    } else if (min <= 0) {
      min = "00";
    } else {
      min += "";
    }
    // 秒
    if (second < 10) second = "0" + second;
    // return hour + ":" + min + ":" + second;
    return hour + ":" + min + ":" + second;
  } else {
    // 天
    if (day > 0) day = day + type;
    else day = "";

    // 小时
    if (hour > 0) hour = hour + type;
    else hour = "";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min + type;
    } else if (min <= 0) {
      min = "00" + type;
    } else {
      min += type;
    }
    // 秒
    if (second < 10) second = "0" + second;
    return day + hour + "" + min + second;
  }
}

export function formatTimerCallback(second) {
  if (second < 0) return 0;

  let day = ~~(second / (24 * 60 * 60));
  second = second - day * 24 * 60 * 60;
  let hour = ~~(second / (60 * 60));
  second = second - hour * 60 * 60;
  let min = ~~(second / 60);
  second = second - min * 60;

  // 天
  if (day > 0) day = day + "";
  else day = "";

  // 小时
  if (hour > 0) hour = hour;
  else hour = "00";

  // 分钟
  if (min < 10 && min > 0) {
    min = "0" + min;
  } else if (min <= 0) {
    min = "00";
  } else {
    min;
  }
  // 秒
  if (second < 10) second = "0" + second;
  return {
    day: day,
    hour: hour,
    min: min,
    second: second
  };
}

//对象清空
export function clearObject(obj) {
  let newObj = {};
  for (let i in obj) {
    newObj[i] = "";
  }
  return newObj;
}

//非空验证(对象)
export function verifyNotNull(obj) {
  for (let i in obj) {
    if (obj[i] == "") {
      return false;
    }
  }
  return true;
}

// 数组去重
export function unique(arr) {
  return Array.from(new Set(arr));
}

//账号密码验证
export function passwordPwd(pwd) {
  let r = /^[A-z0-9]{6,16}$/;
  return r.test(pwd);
}
//资金密码验证
export function withdrawalPwd(pwd) {
  let r = /[0-9]{4}/;
  return r.test(pwd);
}

//纯数字验证--QQ验证(数字1-9开头,共4-10位)
export function v_qq(qq) {
  let r = /^[1-9][0-9]{4,9}$/;
  return r.test(qq);
}

//用户名验证
export function v_userName(userName) {
  let r = /^[A-Za-z0-9]{4,16}$/;
  return r.test(userName);
}

// 密码验证  4-12位任意字符
export function v_password_every(password) {
  // let r = /^[\s\S]{6,12}$/;
  let r = /^[A-z0-9]{6,16}$/;
  return r.test(password);
}

export function messageTipsOption(msg) {
  return {
    msg: msg,
    title: "温馨提示",
    confirmButtonText: "确定",
    center: true,
    lockScroll: false,
    type: "error"
  };
}
// 毫秒转化成时间
export function formatDuring(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 8);
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((mss % (1000 * 60)) / 1000);
  // 小时
  if (hours > 0) hours = hours;
  else hours = "00";

  // 分钟
  if (minutes < 10 && minutes > 0) {
    minutes = "0" + minutes;
  } else if (minutes <= 0) {
    minutes = "00";
  } else {
    minutes;
  }
  // 秒
  if (seconds < 10) seconds = "0" + seconds;
  return hours + " :" + minutes + " : " + seconds;
}

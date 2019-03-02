//计算列表和值
export function countArrSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let num = parseInt(arr[i] * 10000);
    sum += num;
  }
  sum = (sum / 10000).toFixed(4);
  return sum;
}

//提示消息配置项
export function messageOption(msg) {
  return {
    msg: msg,
    title: "温馨提示",
    confirmButtonText: "确定",
    center: true,
    lockScroll: false,
    type: "error"
  };
}
export function aamessageOption111(msg) {
  console.log("ddd");
  return {
    type: "info11",
    showClose: false,
    customClass: "g_messageTips",
    message: msg,
    duration: 2500,
    center: true
  };
}

//登录密码验证
export function passwordPwd(pwd) {
  let r = /^[A-z0-9]{6,16}$/;
  return r.test(pwd);
}
//资金密码验证
export function withdrawalPwd(pwd) {
  let r = /^[0-9]{4}$/;
  return r.test(pwd);
}

//排序比较
export function compare(attr, type) {
  if (type == undefined) {
    type = 1;
  }
  type = type ? 1 : -1;
  return function(obj1, obj2) {
    let val1, val2;
    if (attr == "createTime") {
      val1 = obj1[attr];
      val2 = obj2[attr];
    } else {
      val1 = obj1[attr] * 1;
      val2 = obj2[attr] * 1;
    }
    if (val1 < val2) {
      return type * -1;
    } else if (val1 > val2) {
      return type * 1;
    } else {
      return 0;
    }
  };
}

//截取字符串
export function re_substring(str, type) {
  let i = 20;
  switch (type) {
    case "title":
      i = 20;
      break;
    case "content":
      i = 80;
      break;
  }
  return (str = str.substring(0, i));
}

//获取查询格式日期
export function defaultDateSet() {
  let today = new Date(),
    date = { start: "", end: "" };
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).substr(-2);
  let day = ("0" + today.getDate()).substr(-2);
  date.start = year + "-" + month + "-" + day + " " + "00:00:00";
  date.end = year + "-" + month + "-" + day + " " + "23:59:59";
  return date;
}

function dateFormt(date, type, option) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).substr(-2);
  let day = ("0" + date.getDate()).substr(-2);
  if (type == "start") {
    if (option == "month") {
      return year + "-" + month + "-" + "01" + " " + "00:00:00";
    }
    return year + "-" + month + "-" + day + " " + "00:00:00";
  } else {
    return year + "-" + month + "-" + day + " " + "23:59:59";
  }
}
function dateFullFormt(date) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).substr(-2);
  let day = ("0" + date.getDate()).substr(-2);
  let hour = ("0" + date.getHours()).substr(-2);
  let minutes = ("0" + date.getMinutes()).substr(-2);
  let seconds = ("0" + date.getSeconds()).substr(-2);
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
  );
}
//获取本日 、昨日、本月日期
export function getDateDruing(type = "", list) {
  if (type == "zone") {
    let obj = {};
    let now = new Date();
    let end = dateFullFormt(now);
    for (let i = 0; i < list.length; i++) {
      let str = list[i].label;
      let start = dateFullFormt(
        new Date(now.getTime() - 1000 * 24 * 60 * 60 * list[i].value)
      );
      obj[str] = {
        start: start,
        end: end
      };
    }
    return obj;
  } else {
    let today = {},
      yesterday = {},
      week = {},
      curMonth = {},
      now = new Date();
    today["start"] = dateFormt(now, "start");
    today["end"] = dateFormt(now, "end");

    let yesterdaySeconds = new Date(now.getTime() - 1000 * 24 * 60 * 60 * 1);
    yesterday["start"] = dateFormt(yesterdaySeconds, "start");
    yesterday["end"] = dateFormt(yesterdaySeconds, "end");

    let weekSeconds = new Date(now.getTime() - 1000 * 24 * 60 * 60 * 7);
    week["start"] = dateFormt(weekSeconds, "start");
    week["end"] = dateFormt(now, "end");

    curMonth["start"] = dateFormt(now, "start", "month");
    curMonth["end"] = dateFormt(now, "end");

    return {
      today: today,
      yesterday: yesterday,
      week: week,
      curMonth: curMonth
    };
  }
}

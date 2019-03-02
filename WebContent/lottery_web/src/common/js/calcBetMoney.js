import * as play from "./play";

let _g_code = "";
let _prefix_code = "";

// 计算金额
const calcMoney = (betNum, price, multiple) => {
  multiple = !multiple ? 1 : multiple;
  let money = 0;
  if (betNum > 0) {
    money = (parseFloat(price) * 1000 * betNum * multiple) / 1000;
  }
  return money;
};

// 转换code
const convertCode = code => {
  let tempCode = code.split("_");
  _prefix_code = tempCode[0];
  tempCode.shift();
  if (Array.isArray(tempCode)) {
    tempCode = "_" + tempCode.join("_");
  } else {
    tempCode = "_" + tempCode;
  }

  return tempCode;
};

// 计算注数及金额
const calcBetMoney = (
  code,
  numbers,
  list,
  unitPrice,
  multiple,
  selectAnyList
) => {
  if (list.length <= 0) {
    list[0] = [];
  }
  let tempCode = convertCode(code);
  let tempGameCode = convertCode(numbers.code);
  _g_code = numbers.code;
  let betInfo = lotteryRule[tempCode][tempGameCode](list, selectAnyList);
  betInfo.money = calcMoney(betInfo.count, unitPrice.value, multiple);
  betInfo.unit = unitPrice;
  betInfo.multiple = multiple;
  betInfo.currentGameName = numbers.currentGameName;
  betInfo.lotteryGame = numbers.code;
  return betInfo;
};

// 彩票玩法规则匹配
const lotteryRule = {
  // 重庆时时彩五星
  _5x: {
    // 五星复式
    _5x_zx_fs: function(list) {
      var rel = list.length == 5 ? 1 : 0;
      for (var n in list) {
        rel *= list[n].length;
      }
      var txt = play.format(list);
      return { content: txt, count: rel };
    },
    // 五星单式
    _5x_zx_ds: function(list) {
      return allSingle(list, [/^\d{5}$/], [false]);
    },
    // 五星组选五
    _5x_zux_zux5: function(list) {
      let count = 0;
      if (list.length == 2) {
        for (let n in list[0]) {
          count += list[1].length;
          let num = list[0][n];
          if (play.contains(list[1], num)) {
            count -= 1;
          }
        }
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 五星组选十
    _5x_zux_zux10: function(list) {
      return this._5x_zux_zux5(list);
    },
    // 五星组选二十
    _5x_zux_zux20: function(list) {
      let count = 0;
      if (list.length == 2) {
        let list1 = list[0];
        let list2 = list[1];

        for (let n in list1) {
          let nowCount = list2.length;
          let num = list1[n];
          if (play.contains(list2, num)) {
            nowCount -= 1;
          }
          count += play.combin(nowCount, 2);
        }
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 五星组选三十
    _5x_zux_zux30: function(list) {
      let count = 0;
      if (list.length == 2) {
        let list1 = list[0];
        let list2 = list[1];
        for (let n in list2) {
          let nowCount = list1.length;
          let num = list2[n];
          if (play.contains(list1, num)) {
            nowCount -= 1;
          }
          count += play.combin(nowCount, 2);
        }
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 五星组选六十
    _5x_zux_zux60: function(list) {
      let count = 0;
      if (list.length == 2) {
        let list1 = list[0];
        let list2 = list[1];

        for (let n in list1) {
          let nowCount = list2.length;

          let num = list1[n];
          if (play.contains(list2, num)) {
            nowCount -= 1;
          }
          count += play.combin(nowCount, 3);
        }
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 五星组选一百二十
    _5x_zux_zux120: function(list) {
      let count = play.combin(list[0].length, 5);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 五星一帆风顺
    _5x_qw_yffs: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 五星好事成双
    _5x_qw_hscs: function(list) {
      return this._5x_qw_yffs(list);
    },
    // 五星三星报喜
    _5x_qw_sxbx: function(list) {
      return this._5x_qw_yffs(list);
    },
    // 五星四季发财
    _5x_qw_sjfc: function(list) {
      return this._5x_qw_yffs(list);
    },
    // 五星一码不定位
    _5x_bdw_ymbdw: function(list) {
      return this._5x_qw_yffs(list);
    },
    // 五星二码不定位
    _5x_bdw_ermbdw: function(list) {
      let count = play.combin(list[0].length, 2);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 五星三码不定位
    _5x_bdw_smbdw: function(list) {
      let count = play.combin(list[0].length, 3);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    }
  },
  // 重庆时时彩前四 and  北京赛车 前四
  _q4: {
    // 重庆时时彩 前四直选复式
    _q4_zx_fs: function(list) {
      let rel = list.length == 4 ? 1 : 0;
      for (let n in list) {
        rel *= list[n].length;
      }
      let txt = play.format(list) + ",-";
      return { count: rel, content: txt };
    },
    // 重庆时时彩 前四直选单式
    _q4_zx_ds: function(list) {
      return allSingle(list, [/^\d{4}$/], [false]);
    },
    // 重庆时时彩 前四组选4
    _q4_zux_zux4: function(list) {
      var count = 0;
      if (list.length == 2) {
        var line1 = list[0];
        var line2 = list[1];
        for (var n in line1) {
          for (var m in line2) {
            if (line1[n] != line2[m]) {
              count++;
            }
          }
        }
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 重庆时时彩 前四组选6
    _q4_zux_zux6: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 2);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩 前四组选12
    _q4_zux_zux12: function(list) {
      var count = 0;
      if (list.length == 2) {
        var line1 = list[0];
        var line2 = list[1];
        for (var n in line1) {
          var lenCount = 0;
          for (var m in line2) {
            if (line1[n] != line2[m]) {
              lenCount++;
            }
          }
          count += play.combin(lenCount, 2);
        }
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 重庆时时彩 前四组选24
    _q4_zux_zux24: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 4);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩 前四一码不定位
    _q4_bdw_1mbdw: function(list) {
      let count = 0;
      count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩 前四二码不定位
    _q4_bdw_2mbdw: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 2);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 北京赛车 前四复式
    _q4_q4_fs: function(list) {
      return tswf_fs_calc(list, 4);
    },
    // 北京赛车 前四直选单式
    _q4_q4_zxds: function(list) {
      var reg1 = /^((0[1-9]|10)\s){3}(0[1-9]|10)$/;
      var reg2 = /(\d{2})\s((\d{2})\s)*\1/;
      return allSingle(list, [reg1, reg2], [false, true]);
    },
    // 北京赛车 猜前四
    _q4_q4_cq4: function(list) {
      return this._q4_q4_fs(list);
    }
  },
  // 重庆时时彩后四
  _h4: {
    // 后四直选复式
    _h4_zx_fs: function(list) {
      let rel = list.length == 4 ? 1 : 0;
      for (let n in list) {
        rel *= list[n].length;
      }
      let txt = "-," + play.format(list);
      return { count: rel, content: txt };
    },
    // 后四直选单式
    _h4_zx_ds: function(list) {
      return lotteryRule._q4._q4_zx_ds(list);
    },
    // 后四组选4
    _h4_zux_zux4: function(list) {
      return lotteryRule._q4._q4_zux_zux4(list);
    },
    // 后四组选6
    _h4_zux_zux6: function(list) {
      return lotteryRule._q4._q4_zux_zux6(list);
    },
    // 后四组选12
    _h4_zux_zux12: function(list) {
      return lotteryRule._q4._q4_zux_zux12(list);
    },
    // 后四组选24
    _h4_zux_zux24: function(list) {
      return lotteryRule._q4._q4_zux_zux24(list);
    },
    // 后四一码不定位
    _h4_bdw_1mbdw: function(list) {
      return lotteryRule._q4._q4_bdw_1mbdw(list);
    },
    // 后四二码不定位
    _h4_bdw_2mbdw: function(list) {
      return lotteryRule._q4._q4_bdw_2mbdw(list);
    }
  },
  //幸运28 二星
  _ex: {
    // 前二直选复式
    _ex_q2_q2fs: function(list) {
      let count = list.length == 2 ? 1 : 0;
      for (let n in list) {
        count *= list[n].length;
      }
      let txt = play.format(list) + ",-";
      return { count: count, content: txt };
    },
    // 前二组选复式
    _ex_q2_q2zux: function(list) {
      return lotteryRule._q2._q2_zux_fs(list);
    },
    //  后二直选复式
    _ex_h2_h2fs: function(list) {
      let count = list.length == 2 ? 1 : 0;
      for (let n in list) {
        count *= list[n].length;
      }
      let txt = "-," + play.format(list);
      return { count: count, content: txt };
    },
    // 后二组选复式
    _ex_h2_h2zux: function(list) {
      return lotteryRule._q2._q2_zux_fs(list);
    }
  },
  // 幸运28 三星
  _sx: {
    // 中三组六
    _sx_sx_zux: function(list) {
      return lotteryRule._q3._q3_zux_zu6(list);
    },
    // 三星复式
    _sx_sx_fs: function(list) {
      var rel = list.length == 3 ? 1 : 0;
      for (var n in list) {
        rel *= list[n].length;
      }
      let txt = play.format(list);
      return { count: rel, content: txt };
    }
  },
  // 幸运28不定位
  _bdw: {
    _bdw_bdw_bdw: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    }
  },
  //  重庆时时彩前三 and 北京赛车 前三
  _q3: {
    // 重庆时时彩前三 前三直选复式
    _q3_zx_fs: function(list) {
      var rel = list.length == 3 ? 1 : 0;
      for (var n in list) {
        rel *= list[n].length;
      }
      let txt = play.format(list) + ",-,-";
      return { count: rel, content: txt };
    },
    // 重庆时时彩前三 前三直选单式
    _q3_zx_ds: function(list) {
      return allSingle(list, [/^\d{3}$/], [false]);
    },
    // 重庆时时彩前三 前三直选和值
    _q3_zx_hz: function(list) {
      var allCount = [
        1,
        3,
        6,
        10,
        15,
        21,
        28,
        36,
        45,
        55,
        63,
        69,
        73,
        75,
        75,
        73,
        69,
        63,
        55,
        45,
        36,
        28,
        21,
        15,
        10,
        6,
        3,
        1
      ];
      var count = 0;
      for (var n in list[0]) {
        try {
          count += allCount[parseInt(list[0][n])];
        } catch (e) {
          count = 0;
          break;
        }
      }
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三直选跨度
    _q3_zx_kd: function(list) {
      var allCount = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54];
      var count = 0;
      for (var n in list[0]) {
        try {
          count += allCount[parseInt(list[0][n])];
        } catch (e) {
          count = 0;
          break;
        }
      }
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三组三
    _q3_zux_zu3: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 2) * 2;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三组六
    _q3_zux_zu6: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 3);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三组三单式
    _q3_zux_zu3ds: function(list) {
      return allSingle(
        list,
        [/^\d{3}$/, /^(\d)\1\d|(\d)\d\2|\d(\d)\3$/, /(\d)\1\1/],
        [false, false, true]
      );
    },
    // 重庆时时彩前三 前三组六单式
    _q3_zux_zu6ds: function(list) {
      return allSingle(list, [/^\d{3}$/, /(\d)\d?\1/], [false, true]);
    },
    // 重庆时时彩前三 前三组选和值
    _q3_zux_hz: function(list) {
      var allCount = [
        1,
        2,
        2,
        4,
        5,
        6,
        8,
        10,
        11,
        13,
        14,
        14,
        15,
        15,
        14,
        14,
        13,
        11,
        10,
        8,
        6,
        5,
        4,
        2,
        2,
        1
      ];
      var count = 0;
      for (var n in list[0]) {
        try {
          count += allCount[parseInt(list[0][n]) - 1];
        } catch (e) {
          count = 0;
          break;
        }
      }
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三组选包胆
    _q3_zux_bd: function(list) {
      let count = 0;
      count = list[0].length * 54;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三混合组选
    _q3_zux_hhzx: function(list) {
      return allSingle(list, [/^\d{3}$/, /^(\d)\1\1$/], [false, true]);
    },
    // 重庆时时彩前三 前三一码不定位
    _q3_bdw_1mbdw: function(list) {
      let count = 0;
      count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 重庆时时彩前三 前三二码不定位
    _q3_bdw_2mbdw: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 2);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 北京赛车 前三复式
    _q3_q3_fs: function(list) {
      return tswf_fs_calc(list, 3);
    },
    // 北京赛车 前三直选单式
    _q3_q3_zxds: function(list) {
      var reg1 = /^((0[1-9]|10)\s){2}(0[1-9]|10)$/;
      var reg2 = /(\d{2})\s((\d{2})\s)*\1/;
      return allSingle(list, [reg1, reg2], [false, true]);
    },
    // 北京赛车 猜前三
    _q3_q3_cq3: function(list) {
      return this._q3_q3_fs(list);
    }
  },
  //  重庆时时彩中三
  _z3: {
    // 中三直选复式
    _z3_zx_fs: function(list) {
      var rel = list.length == 3 ? 1 : 0;
      for (var n in list) {
        rel *= list[n].length;
      }
      let txt = "-," + play.format(list) + ",-";
      return { count: rel, content: txt };
    },
    // 中三直选单式
    _z3_zx_ds: function(list) {
      return lotteryRule._q3._q3_zx_ds(list);
    },
    // 中三直选和值
    _z3_zx_hz: function(list) {
      return lotteryRule._q3._q3_zx_hz(list);
    },
    // 中三直选跨度
    _z3_zx_kd: function(list) {
      return lotteryRule._q3._q3_zx_kd(list);
    },
    // 中三组三
    _z3_zux_zu3: function(list) {
      return lotteryRule._q3._q3_zux_zu3(list);
    },
    // 中三组六
    _z3_zux_zu6: function(list) {
      return lotteryRule._q3._q3_zux_zu6(list);
    },
    // 中三组三单式
    _z3_zux_zu3ds: function(list) {
      return lotteryRule._q3._q3_zux_zu3ds(list);
    },
    // 中三组六单式
    _z3_zux_zu6ds: function(list) {
      return lotteryRule._q3._q3_zux_zu6ds(list);
    },
    // 中三组选和值
    _z3_zux_hz: function(list) {
      return lotteryRule._q3._q3_zux_hz(list);
    },
    // 中三组选包胆
    _z3_zux_bd: function(list) {
      return lotteryRule._q3._q3_zux_bd(list);
    },
    // 中三混合组选
    _z3_zux_hhzx: function(list) {
      return lotteryRule._q3._q3_zux_hhzx(list);
    },
    // 中三一码不定位
    _z3_bdw_1mbdw: function(list) {
      return lotteryRule._q3._q3_bdw_1mbdw(list);
    },
    // 中三二码不定位
    _z3_bdw_2mbdw: function(list) {
      return lotteryRule._q3._q3_bdw_2mbdw(list);
    }
  },
  //  重庆时时彩后三
  _h3: {
    // 后三直选复式
    _h3_zx_fs: function(list) {
      var rel = list.length == 3 ? 1 : 0;
      for (var n in list) {
        rel *= list[n].length;
      }
      let txt = "-,-," + play.format(list);
      return { count: rel, content: txt };
    },
    // 后三直选单式
    _h3_zx_ds: function(list) {
      return lotteryRule._q3._q3_zx_ds(list);
    },
    // 后三直选和值
    _h3_zx_hz: function(list) {
      return lotteryRule._q3._q3_zx_hz(list);
    },
    // 后三直选跨度
    _h3_zx_kd: function(list) {
      return lotteryRule._q3._q3_zx_kd(list);
    },
    // 后三组三
    _h3_zux_zu3: function(list) {
      return lotteryRule._q3._q3_zux_zu3(list);
    },
    // 后三组六
    _h3_zux_zu6: function(list) {
      return lotteryRule._q3._q3_zux_zu6(list);
    },
    // 后三组三单式
    _h3_zux_zu3ds: function(list) {
      return lotteryRule._q3._q3_zux_zu3ds(list);
    },
    // 后三组六单式
    _h3_zux_zu6ds: function(list) {
      return lotteryRule._q3._q3_zux_zu6ds(list);
    },
    // 后三组选和值
    _h3_zux_hz: function(list) {
      return lotteryRule._q3._q3_zux_hz(list);
    },
    // 后三组选包胆
    _h3_zux_bd: function(list) {
      return lotteryRule._q3._q3_zux_bd(list);
    },
    // 后三混合组选
    _h3_zux_hhzux: function(list) {
      return lotteryRule._q3._q3_zux_hhzx(list);
    },
    // 后三一码不定位
    _h3_bdw_1mbdw: function(list) {
      return lotteryRule._q3._q3_bdw_1mbdw(list);
    },
    // 后三二码不定位
    _h3_bdw_2mbdw: function(list) {
      return lotteryRule._q3._q3_bdw_2mbdw(list);
    }
  },
  // 重庆时时彩前二   ||  福彩3D 前二 || 排列三 前二 and  北京赛车前二
  _q2: {
    // 前二直选复式
    _q2_zx_fs: function(list) {
      let count = list.length == 2 ? 1 : 0;
      for (let n in list) {
        count *= list[n].length;
      }
      let txt = "";
      if (_prefix_code == "pl3" || _prefix_code == "fc3d") {
        txt = play.format(list) + ",-";
      } else {
        txt = play.format(list) + ",-,-,-";
      }
      return { count: count, content: txt };
    },
    // 前二直选单式
    _q2_zx_ds: function(list) {
      return allSingle(list, [/^\d{2}$/], [false]);
    },
    // 前二直选和值
    _q2_zx_hz: function(list) {
      var allCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      var count = 0;
      for (var n in list[0]) {
        try {
          count += allCount[parseInt(list[0][n])];
        } catch (e) {
          count = 0;
          break;
        }
      }
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 前二直选跨度
    _q2_zx_kd: function(list) {
      var allCount = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2];
      var count = 0;
      for (var n in list[0]) {
        try {
          count += allCount[parseInt(list[0][n])];
        } catch (e) {
          count = 0;
          break;
        }
      }
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 前二组选复式
    _q2_zux_fs: function(list) {
      let count = 0;
      count = play.combin(list[0].length, 2);
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 前二组选单式
    _q2_zux_ds: function(list) {
      return allSingle(list, [/^\d{2}$/, /(\d)\1/], [false, true]);
    },
    // 前二组选和值
    _q2_zux_hz: function(list) {
      var allCount = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1];
      var count = 0;
      for (var n in list[0]) {
        try {
          count += allCount[parseInt(list[0][n]) - 1];
        } catch (e) {
          count = 0;
          break;
        }
      }
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 前二组选包胆
    _q2_zux_bd: function(list) {
      let count = 0;
      count = list[0].length * 9;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 北京赛车 冠亚和
    _q2_q2_gyh: function(list) {
      var betCount = [2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2];
      var count = 0;
      for (var n in list[0]) {
        var i = parseInt(list[0][n]) - 3;
        count += betCount[i];
      }
      return {
        content: list[0].join(","),
        count: count
      };
    },
    // 北京赛车 前二复式
    _q2_q2_fs: function(list) {
      return tswf_fs_calc(list, 2);
    },
    // 北京赛车 猜前二
    _q2_q2_cq2: function(list) {
      return this._q2_q2_fs(list);
    }
  },
  // 重庆时时彩后二 || 福彩3D 后二 || 排列三 后二
  _h2: {
    // 后二直选复式
    _h2_zx_fs: function(list) {
      let count = list.length == 2 ? 1 : 0;
      for (let n in list) {
        count *= list[n].length;
      }
      let txt = "";
      if (_prefix_code == "pl3" || _prefix_code == "fc3d") {
        txt = "-," + play.format(list);
      } else {
        txt = "-,-,-," + play.format(list);
      }
      return { count: count, content: txt };
    },
    // 后二直选单式
    _h2_zx_ds: function(list) {
      return lotteryRule._q2._q2_zx_ds(list);
    },
    // 后二直选和值
    _h2_zx_hz: function(list) {
      return lotteryRule._q2._q2_zx_hz(list);
    },
    // 后二直选跨度
    _h2_zx_kd: function(list) {
      return lotteryRule._q2._q2_zx_kd(list);
    },
    // 后二组选复式
    _h2_zux_fs: function(list) {
      return lotteryRule._q2._q2_zux_fs(list);
    },
    // 后二组选单式
    _h2_zux_ds: function(list) {
      return lotteryRule._q2._q2_zux_ds(list);
    },
    // 后二组选和值
    _h2_zux_hz: function(list) {
      return lotteryRule._q2._q2_zux_hz(list);
    },
    // 后二组选包胆
    _h2_zux_bd: function(list) {
      return lotteryRule._q2._q2_zux_bd(list);
    }
  },
  // 定位胆 || 福彩3d 定位胆 and 北京赛车
  _dwd: {
    // 一星定位胆
    _dwd_dwd_dwd: function(list) {
      let count = 0;
      for (let n in list) {
        count += list[n].length;
      }
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    // 北京赛车 前五定位胆
    _dwd_dwd_q5dwd: function(list) {
      var count = 0;
      for (var n in list) {
        count += list[n].length;
      }
      var txt = play.format(list);
      return {
        content: txt,
        count: count
      };
    },
    // 北京赛车 后五定位胆
    _dwd_dwd_h5dwd: function(list) {
      return this._dwd_dwd_q5dwd(list);
    }
  },
  // 任选
  _rx: {
    //   任二直选复式
    _rx_rx2_zxfs: function(list) {
      let count = 0;
      count = play.mulAll(list, 2);
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    //   任二直选单式
    _rx_rx2_zxds: function(list, selectAnyList) {
      let retInfo = lotteryRule._q2._q2_zx_ds(list);
      return anySelectBetNumCalc(retInfo, 2, selectAnyList);
    },
    //   任二组选复式
    _rx_rx2_zuxfs: function(list, selectAnyList) {
      let retInfo = lotteryRule._q2._q2_zux_fs(list);
      return anySelectBetNumCalc(retInfo, 2, selectAnyList);
    },
    //   任二组选单式
    _rx_rx2_zuxds: function(list, selectAnyList) {
      let retInfo = lotteryRule._q2._q2_zux_ds(list);
      return anySelectBetNumCalc(retInfo, 2, selectAnyList);
    },
    //   任三直选复式
    _rx_rx3_zxfs: function(list) {
      let count = 0;
      count = play.mulAll(list, 3);
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    //   任三直选单式
    _rx_rx3_zxds: function(list, selectAnyList) {
      let retInfo = lotteryRule._q3._q3_zx_ds(list);
      return anySelectBetNumCalc(retInfo, 3, selectAnyList);
    },
    //   任三组三
    _rx_rx3_zu3: function(list, selectAnyList) {
      let retInfo = lotteryRule._q3._q3_zux_zu3(list);
      return anySelectBetNumCalc(retInfo, 3, selectAnyList);
    },
    //   任三组六
    _rx_rx3_zu6: function(list, selectAnyList) {
      let retInfo = lotteryRule._q3._q3_zux_zu6(list);
      return anySelectBetNumCalc(retInfo, 3, selectAnyList);
    },
    //   任三混合组选
    _rx_rx3_hxzux: function(list, selectAnyList) {
      let retInfo = lotteryRule._q3._q3_zux_hhzx(list);
      return anySelectBetNumCalc(retInfo, 3, selectAnyList);
    },
    //   任四直选复式
    _rx_rx4_zxfs: function(list) {
      let count = 0;
      count = play.mulAll(list, 4);
      let txt = play.format(list);
      return { count: count, content: txt };
    },
    //   任四直选单式
    _rx_rx4_zxds: function(list, selectAnyList) {
      let retInfo = lotteryRule._q4._q4_zx_ds(list);
      return anySelectBetNumCalc(retInfo, 4, selectAnyList);
    }
  },
  // 重庆时时彩龙虎
  _lh: {
    //   龙虎万千
    _lh_lhh_wq: function(list) {
      let count = 0;
      count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    //   龙虎万百
    _lh_lhh_wb: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎万十
    _lh_lhh_ws: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎万个
    _lh_lhh_wg: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎千百
    _lh_lhh_qb: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎千十
    _lh_lhh_qs: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎千个
    _lh_lhh_qg: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎百十
    _lh_lhh_bs: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎百个
    _lh_lhh_bg: function(list) {
      return this._lh_lhh_wq(list);
    },
    //   龙虎十个
    _lh_lhh_sg: function(list) {
      return this._lh_lhh_wq(list);
    }
  },
  // 重庆时时彩微信玩法
  _wxwf: {
    //   大小单双万
    _wxwf_dxds_wan: function(list) {
      let count = 0;
      count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    //   大小单双千
    _wxwf_dxds_qian: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   大小单双百
    _wxwf_dxds_bai: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   大小单双十
    _wxwf_dxds_shi: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   大小单双个
    _wxwf_dxds_ge: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   特码
    _wxwf_tm_tm: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   组合大小单双万
    _wxwf_zhdxds_wan: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   组合大小单双千
    _wxwf_zhdxds_qian: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   组合大小单双百
    _wxwf_zhdxds_bai: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   组合大小单双十
    _wxwf_zhdxds_shi: function(list) {
      return this._wxwf_dxds_wan(list);
    },
    //   组合大小单双个
    _wxwf_zhdxds_ge: function(list) {
      return this._wxwf_dxds_wan(list);
    }
  },
  // 十一选五 选一
  _x1: {
    // 任选一任选复式
    _x1_rx1z1_fs: function(list) {
      return syxw_rx_fs(list, 1);
    },
    // 任选一任选单式
    _x1_rx1z1_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){1}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 定位胆
    _x1_dwd_dwd: function(list) {
      let count = 0;
      for (let n in list) {
        count += list[n].length;
      }
      let txt = play.format(list);
      return {
        content: txt,
        count: count
      };
    },
    // 前三不定位
    _x1_bdw_bdw: function(list) {
      return {
        content: list[0].join(","),
        count: list[0].length
      };
    }
  },
  // 十一选五 选二
  _x2: {
    // 任选二任选复式
    _x2_rx2z2_fs: function(list) {
      return syxw_rx_fs(list, 2);
    },
    // 任选二任选单式
    _x2_rx2z2_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){2}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 任选二任选胆拖
    _x2_rx2z2_dt: function(list) {
      return syxw_rx_td(list, 2);
    },
    // 前二直选复式
    _x2_zx_fs: function(list) {
      var rel = 0;
      if (list.length == 2) {
        rel = play.getC(list, 0, list.length, {});
      }
      var line = play.format(list) + ",-,-,-";
      return {
        content: line,
        count: rel
      };
    },
    // 前二直选单式
    _x2_zx_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){2}$/, /(\d{2})\1/];
      return allSingle(list, regs, [false, true]);
    },
    // 前二组选复式
    _x2_zux_fs: function(list) {
      var rel = play.combin(list[0].length, 2);
      return {
        content: list[0].join(","),
        count: rel
      };
    },
    // 前二组选单式
    _x2_zux_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){2}$/, /(\d{2})\1/];
      return allSingle(list, regs, [false, true]);
    },
    // 前二组选胆拖
    _x2_zux_dt: function(list) {
      return syxw_rx_td(list, 2);
    }
  },
  // 十一选五 选三
  _x3: {
    // 任选三任选复式
    _x3_rx3z3_fs: function(list) {
      return syxw_rx_fs(list, 3);
    },
    // 任选三任选单式
    _x3_rx3z3_ds: function(list) {
      let regs = [
        new RegExp("^(0[1-9]|1[0-1]){3}$"),
        /^(\d{2})*?(\d{2})(\d{2})*\2/
      ];
      return allSingle(list, regs, [false, true]);
    },
    // 任选三任选胆拖
    _x3_rx3z3_dt: function(list) {
      return syxw_rx_td(list, 3);
    },
    // 前三直选复式
    _x3_zx_fs: function(list) {
      var rel = 0;
      if (list.length == 3) {
        rel = play.getC(list, 0, list.length, {});
      }
      var line = play.format(list) + ",-,-";
      return {
        content: line,
        count: rel
      };
    },
    // 前三直选单式
    _x3_zx_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){3}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 前三组选复式
    _x3_zux_fs: function(list) {
      var rel = play.combin(list[0].length, 3);
      return {
        content: list[0].join(","),
        count: rel
      };
    },
    // 前三组选单式
    _x3_zux_ds: function(list) {
      return this._x3_zx_ds(list);
    },
    // 前三组选胆拖
    _x3_zux_dt: function(list) {
      return this._x3_rx3z3_dt(list);
    }
  },
  // 十一选五 选四
  _x4: {
    // 任选四任选复式
    _x4_rx4z4_fs: function(list) {
      return syxw_rx_fs(list, 4);
    },
    // 任选四任选单式
    _x4_rx4z4_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){4}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 任选四任选胆拖
    _x4_rx4z4_dt: function(list) {
      return syxw_rx_td(list, 4);
    }
  },
  // 十一选五 选五
  _x5: {
    // 任选五任选复式
    _x5_rx5z5_fs: function(list) {
      return syxw_rx_fs(list, 5);
    },
    // 任选五任选单式
    _x5_rx5z5_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){5}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 任选五任选胆拖
    _x5_rx5z5_dt: function(list) {
      return syxw_rx_td(list, 5);
    }
  },
  // 十一选五 选六
  _x6: {
    // 任选六任选复式
    _x6_rx6z5_fs: function(list) {
      return syxw_rx_fs(list, 6);
    },
    // 任选六任选单式
    _x6_rx6z5_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){6}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 任选六任选胆拖
    _x6_rx6z5_dt: function(list) {
      return syxw_rx_td(list, 6);
    }
  },
  // 十一选五 选七
  _x7: {
    // 任选七任选复式
    _x7_rx7z5_fs: function(list) {
      return syxw_rx_fs(list, 7);
    },
    // 任选七任选单式
    _x7_rx7z5_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){7}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 任选七任选胆拖
    _x7_rx7z5_dt: function(list) {
      return syxw_rx_td(list, 7);
    }
  },
  // 十一选五 选八
  _x8: {
    // 任选八任选复式
    _x8_rx8z5_fs: function(list) {
      return syxw_rx_fs(list, 8);
    },
    // 任选八任选单式
    _x8_rx8z5_ds: function(list) {
      let regs = [/^(0[1-9]|1[0-1]){8}$/, /^(\d{2})*?(\d{2})(\d{2})*\2/];
      return allSingle(list, regs, [false, true]);
    },
    // 任选八任选胆拖
    _x8_rx8z5_dt: function(list) {
      return syxw_rx_td(list, 8);
    }
  },
  // 福彩3D 三星
  _3x: {
    // 三星直选复式
    _3x_zx_fs: function(list) {
      var rel = list.length == 3 ? 1 : 0;
      for (var n in list) {
        rel *= list[n].length;
      }
      let txt = play.format(list);
      return { count: rel, content: txt };
    },
    // 三星直选单式
    _3x_zx_ds: function(list) {
      return lotteryRule._q3._q3_zx_ds(list);
    },
    // 三星直选和值
    _3x_zx_hz: function(list) {
      return lotteryRule._q3._q3_zx_hz(list);
    },
    // 三星直选跨度
    _3x_zx_kd: function(list) {
      return lotteryRule._q3._q3_zx_kd(list);
    },
    // 三星组三
    _3x_zux_z3: function(list) {
      return lotteryRule._q3._q3_zux_zu3(list);
    },
    // 三星组六
    _3x_zux_z6: function(list) {
      return lotteryRule._q3._q3_zux_zu6(list);
    },
    // 三星组三单式
    _3x_zux_z3ds: function(list) {
      return lotteryRule._q3._q3_zux_zu3ds(list);
    },
    // 三星组六单式
    _3x_zux_z6ds: function(list) {
      return lotteryRule._q3._q3_zux_zu6ds(list);
    },
    // 三星组三和值
    _3x_zux_hz: function(list) {
      return lotteryRule._q3._q3_zux_hz(list);
    },
    // 三星组选包胆
    _3x_zux_bd: function(list) {
      return lotteryRule._q3._q3_zux_bd(list);
    },
    // 三星混合组选
    _3x_zux_hhzx: function(list) {
      return lotteryRule._q3._q3_zux_hhzx(list);
    },
    // 三星一码不定位
    _3x_bdw_ymbdw: function(list) {
      return lotteryRule._q3._q3_bdw_1mbdw(list);
    },
    // 三星二码不定位
    _3x_bdw_embdw: function(list) {
      return lotteryRule._q3._q3_bdw_2mbdw(list);
    }
  },
  // 北京赛车 两面盘
  _lmp: {
    // 龙虎
    _lmp_cw_lh: function(list) {
      var titles = ["1V10", "2V9", "3V8", "4V7", "5V6"];
      var count = 0;
      for (var n in list) {
        count += list[n].length;
      }
      let s = play.format(list, "|");
      var n = s.split("|");
      for (var i in n) {
        if (n[i] != "-") {
          n[i] = "[" + titles[i] + "]" + n[i];
        }
      }
      var txt = n.join();
      return {
        content: txt,
        count: count
      };
    },
    // 冠亚和大小单双
    _lmp_cw_gyhdxds: function(list) {
      return {
        content: list[0].join(","),
        count: list[0].length
      };
    },
    // 大小
    _lmp_cw_dx: function(list) {
      var count = 0;
      for (var n in list) {
        count += list[n].length;
      }
      var txt = play.format(list);
      return {
        content: txt,
        count: count
      };
    }
  },
  // 北京赛车 前五
  _q5: {
    // 前五复式
    _q5_q5_fs: function(list) {
      return tswf_fs_calc(list, 5);
    },
    // 前五直选单式
    _q5_q5_zxds: function(list) {
      var reg1 = /^((0[1-9]|10)\s){4}(0[1-9]|10)$/;
      var reg2 = /(\d{2})\s((\d{2})\s)*\1/;
      return allSingle(list, [reg1, reg2], [false, true]);
    },
    // 猜前五
    _q5_q5_cq5: function(list) {
      return this._q5_q5_fs(list);
    }
  },
  // 香港六合彩 正码
  _zm: {
    _zm_zm_zm: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    }
  },
  // 香港六合彩 正特码
  _ztm: {
    _ztm_ztm_z1t: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    _ztm_ztm_z2t: function(list) {
      return this._ztm_ztm_z1t(list);
    },
    _ztm_ztm_z3t: function(list) {
      return this._ztm_ztm_z1t(list);
    },
    _ztm_ztm_z4t: function(list) {
      return this._ztm_ztm_z1t(list);
    },
    _ztm_ztm_z5t: function(list) {
      return this._ztm_ztm_z1t(list);
    },
    _ztm_ztm_z6t: function(list) {
      return this._ztm_ztm_z1t(list);
    }
  },
  // 幸运28 特码 and 香港六合彩 特码
  _tm: {
    //  直选
    _tm_tm_zx: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 特码包三
    _tm_tm_bs: function(list) {
      let count = list[0].length == 3 ? 1 : 0;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 大小单双
    _tm_tm_dxds: function(list) {
      return this._tm_tm_zx(list);
    },
    // 组合大小单双
    _tm_tm_zhdxds: function(list) {
      return this._tm_tm_zx(list);
    },
    // 极值
    _tm_tm_jz: function(list) {
      return this._tm_tm_zx(list);
    },
    // 直面
    _tm_tm_zm: function(list) {
      return this._tm_tm_zx(list);
    },
    // 波色
    _tm_tm_bose: function(list) {
      return this._tm_tm_zx(list);
    },
    // 豹子
    _tm_tm_bz: function(list) {
      return this._tm_tm_zx(list);
    }
  },
  // 江苏快三 大小单双  || 上海快三 大小单双
  _dxds: {
    // 和值大小单双
    _dxds_dxds_hzdxds: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    _dxds_dxds_hwdxds: function(list) {
      return this._dxds_dxds_hzdxds(list);
    }
  },
  // 江苏快三 和值  || 上海快三 和值
  _hz: {
    // 和值
    _hz_hz_hz: function(list) {
      let txt = list[0].join(",").replace(/\|-/g, ""); //后面的去掉
      txt = txt.replace(/-\|/g, ""); //前面的去掉
      txt = txt.replace(/\|/g, ","); //分隔替换
      let count = list[0].length;
      return {
        content: txt,
        count: count
      };
    }
  },
  // 江苏快三 单骰  || 上海快三 单骰
  _ds: {
    // 单挑一骰
    _ds_ds_dtys: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    }
  },
  // 江苏快三 二骰  || 上海快三 二骰
  _es: {
    // 二不同
    _es_es_ebt: function(list) {
      let txt = list[0].join(",").replace(/\|-/g, ""); //后面的去掉
      txt = txt.replace(/-\|/g, ""); //前面的去掉
      txt = txt.replace(/\|/g, ","); //分隔替换
      let count = list[0].length;
      return {
        content: txt,
        count: count
      };
    },
    // 二同号
    _es_es_eth: function(list) {
      return this._es_es_ebt(list);
    }
  },
  // 江苏快三 三骰  || 上海快三 三骰
  _ss: {
    // 三连号
    _ss_ss_slh: function(list) {
      let count = list[0].length;
      let txt = list[0].join(",");
      return { count: count, content: txt };
    },
    // 三不同
    _ss_ss_sbt: function(list) {
      return lotteryRule._es._es_es_ebt(list);
    },
    // 三同号
    _ss_ss_sth: function(list) {
      return lotteryRule._es._es_es_ebt(list);
    }
  }
};

// 所有单式住数计算
const allSingle = (list, regs, trues, numSplit) => {
  let split = /\s+|,|，|；|;/g;
  let defaultIndex = 0;
  if (
    _g_code.indexOf("_q3_q3_zxds") != -1 ||
    _g_code.indexOf("_q4_q4_zxds") != -1 ||
    _g_code.indexOf("_q5_q5_zxds") != -1
  ) {
    split = /,|，|；|;/g;
  }
  if (!numSplit) {
    numSplit = ",";
  }
  var content = [],
    err = [],
    cf = [],
    ncf = [];
  var hash = {};
  list = list.join(",").trim();
  var lines = list.split(split);
  if (lines.length > 0) {
    for (var i in lines) {
      if (!lines[i]) {
        lines.splice(i, 1);
      }
      var line = lines[i] && lines[i].trim();

      var hasErr = false;
      for (var r in regs) {
        var reg = regs[r];
        var res = trues[r];
        if (reg.test(line) == res) {
          err.push(line);
          hasErr = true;
          break;
        }
      }
      if (!hasErr) {
        content.push(line);
        if (!hash[line]) {
          //不重复的内容
          ncf.push(line);
          hash[line] = true;
        } else {
          //重复的内容
          cf.push(line);
        }
      }
    }
  }

  return {
    content: content.join(numSplit),
    count: content.length,
    ncf: ncf.join(numSplit),
    cf: cf.join(numSplit),
    err: err.join(numSplit)
  };
};

// 特殊玩法复试计算
const tswf_fs_calc = (list, len) => {
  let count = 0;
  let txt = "";
  if (list.length == len) {
    count = play.getC(list, 0, list.length, {});
    txt = play.format(list);
  }
  return {
    content: txt,
    count: count
  };
};

// 十一选五任选复式计算
const syxw_rx_fs = (list, selectNum) => {
  var count = play.combin(list[0].length, selectNum);
  return {
    content: list[0].join(","),
    count: count
  };
};

// 十一选五 任选胆拖
const syxw_rx_td = (list, selectNum) => {
  var rel = 0;
  if (list.length == 2 && list[0].length > 0) {
    var dan = list[0][0];
    var tuo = list[1];
    let touLen = tuo.filter(item => {
      if (item != dan) {
        return item;
      }
    });
    rel = play.combin(touLen.length, selectNum - 1);
    var line = "胆" + dan + ";" + touLen.join(",");
  }
  return {
    content: line,
    count: rel
  };
};

// 任选单注注数计算
const anySelectBetNumCalc = (retInfo, num, selectAnyList) => {
  if (retInfo.count <= 0) return retInfo;
  let selectNum = 0;
  let content = "";
  selectAnyList.forEach(item => {
    if (item.isChecked) {
      selectNum++;
      content += item.value;
    }
  });
  // content = content.substr(0, content.length - 1);
  retInfo.count =
    parseInt(play.combin(selectNum, num)) * parseInt(retInfo.count);
  retInfo.content = content + "|" + retInfo.content;
  return retInfo;
};

export default calcBetMoney;

// 游戏相关算法工具函数

// 是否包含：arr是否包含num
export function contains(arr, num) {
  for (var n in arr) {
    var m = arr[n];
    if (m == num) return true;
  }
  return false;
}

export function combin(num, len) {
  if (num < len) return 0;
  var nums = 1,
    lens = 1;
  for (var i = 0; i < len; i++) {
    nums *= num - i;
    lens *= len - i;
  }
  return nums / lens;
}

export function mulAll(lines, len) {
  var nums = [];
  for (var n = 0; n < lines.length; n++) {
    var a = lines[n].length;
    if (a > 0) {
      nums.push(a);
    }
  }
  //位数不足
  if (nums.length < len) return 0;
  var maxSize = nums.length;
  var indexs = [];
  for (var n = 0; n < len; n++) {
    indexs[n] = n;
  }
  var allCount = 0;
  do {
    var count = 1;
    //当前位置计算
    for (var n = 0; n < len; n++) {
      count *= nums[indexs[n]];
    }
    allCount += count;

    //下个位置
    for (var n = len - 1; n >= 0; n--) {
      //最后一位下移
      indexs[n]++;
      if (indexs[n] < maxSize) {
        if (n == len - 1) {
          //最后一行
          break;
        } else {
          //把该行后面的重置
          for (var m = n + 1; m < len; m++) {
            indexs[m] = indexs[m - 1] + 1;
          }
          if (indexs[len - 1] >= maxSize) {
            continue;
          }
          break;
        }
      }
      //不正常则用前面一行再换
    }
  } while (indexs[0] < maxSize - len + 1);
  return allCount;
}

export function format(list,separator) {
    separator = separator || ",";
    let temp = [];
    list.forEach((item,index) => {
        if (item.length <= 0) {
            temp[index] = '-';
        }else{
            temp[index] = item.join("");
        }
      });
      var txt = temp.join(separator);
      return txt;
}


//注数计算
export function getC (lines, index, allSize, cache) {
  var line = lines[index];
  var size = line.length;
  var count = 0;
  for (var i = 0; i < size; i++) {
    var n = line[i];
    if (!(n in cache)) {
      if (index + 1 < allSize) {
        cache[n] = true;
        var nCount = getC(lines, index + 1, allSize, cache);
        //0代表该选号有多余的无用号码
        count+=nCount;
        delete (cache[n]);
      } else {
        // 最后一行
        count += 1;
      }
    }
  }
  return count;
}
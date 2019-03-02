//生成随机投注号码 (首页热门点击链接跳转后需求)
export function generateRandomNumber(type){
	//时时彩: 1; 赛车、飞艇: 2; 快3: 3; 11选5: 4; 排列3、福彩: 5; 幸运28: 6;  香港6合彩: 7;
	//赛车、飞艇  5位数字 定位胆           香港6合彩  4位数字   直选
	if(type == 1 ){				//时时彩和赛车
		let list = [];
		for(let i = 0; i < 5; i++){
			let a = Math.floor(Math.random()*10);
			list.push(a);
		}
		return list;
	}else if(type == 2){
		let list = [];
		list[0] = fRandomBy(0,1);
		return list;
	}else if(type == 3){
		let list = [];
		list[0] = fRandomBy(0,3);
		return list;
	}else if(type == 4){
		let list = [];
		list[0] = fRandomBy(1,11)
		return list;
	}else if(type == 5 || type == 6){
		let list = [];
		for(let i = 0; i < 3; i++){
			let a = Math.floor(Math.random()*10);
			list.push(a);
		}
		return list;
		// list = setRandomNumbers(0,27,1)
		return list;
	}else if(type == 7){
		return fRandomBy(0,48);
	}

}
function setRandomNumbers(start,end,count){
    var N = end;
    var arr = [];
    var ranArr = [];
    for (var i = start; i < N; i++) {
        arr[i] = i;
    }
    for(var i = 0; i < arr.length; i++) {
	    if(arr[i] == undefined) {
	      arr.splice(i,1);
	      i = i - 1;
	    }
    }
    do {
        var index = Math.floor(Math.random() * arr.length);
        var flag = true;
        ranArr.push(arr[index]);
        arr.splice(index, 1);
        if (arr.length == 0) {
            flag = false;
        }
    } while (flag);
    var a = ranArr.slice(0, count);
    return a
}
function fRandomBy(under, over){ 
	switch(arguments.length){ 
		case 1: return parseInt(Math.random()*under+1); 
		case 2: return parseInt(Math.random()*(over-under+1) + under); 
		default: return 0; 
	} 
} 

export function resetBonus(list,bonusType,selectNumArr){
	let oddsType = list.oddsType;
	let bonusTypeNum = bonusType == 0 ? "gjj" : "gfd";
	let num = '';
	if( oddsType == 0 ){
		num = list.odds[0][bonusTypeNum];
	}else if( oddsType == 1 ){
		if(!selectNumArr[0] || selectNumArr[0].length == 0 ){
			let newArr = [];
			for(let i = 0; i < list.odds.length; i++){
				newArr.push(list.odds[i][bonusTypeNum] * 1);
			}
			newArr = Array.from(new Set(newArr));
			num = newArr.length == 1 ? newArr[0] : Math.min.apply(null, newArr) + '-' + Math.max.apply(null, newArr);
		}else{
			let arr = selectNumArr[0];
			let newArr = [];
			if(arr.length == 0){
				for(let i = 0; i < list.odds.length; i++){
					newArr.push(list.odds[i][bonusTypeNum] * 1);
				}
				num = Math.min.apply(null, newArr) + '-' + Math.max.apply(null, newArr);
			}else{
				for(let i = 0; i < arr.length; i++){
					for(let j = 0; j < list.odds.length; j++){
						if(arr[i] == list.odds[j].hm){
							newArr.push(list.odds[j][bonusTypeNum]*1);
						}
					}
				}
				newArr = Array.from(new Set(newArr));
				num = newArr.length == 1 ? newArr[0] : Math.min.apply(null, newArr) + '-' + Math.max.apply(null, newArr);
			}
		}
	}else{
		let newArr = [];
		for(let i = 0; i < list.odds.length; i++){
			newArr.push(list.odds[i][bonusTypeNum] * 1);
		}
		num = Math.min.apply(null, newArr) + '-' + Math.max.apply(null, newArr);
	}
	return "单注最高奖金 "+ num +" 元";
}
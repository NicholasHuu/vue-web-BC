import * as types from "./mutationsTypes";
import * as commonApi from 'api/common/commonApi'
import { ERR_OK } from 'api/config'
import {
  saveHomeMenuList
} from "common/js/cache";
// 获取开奖结果
export const LotteryGameList = ({ commit, state } , lotteryGameList) => {
  commit(types.SET_GAME_LIST, lotteryGameList);
};


//首页导航大类菜单
export const homeMenuList = ({commit,state},cb = () => {})=> {
    commonApi.homeMenuList().then(res=> {
    	if (res && res.errorCode == ERR_OK) {
    		commit( types.c_homeMenuList, saveHomeMenuList(filterHomeMenuList(res.datas)) );
    		commit( types.c_formObject_homeMenuList, formObject_homeMenu(res.datas) );
    		
    	}
    })
}

function filterHomeMenuList(obj){    //只要client为 0、1的条目
	let newObj = {};
	for(let i in obj){
		let list = obj[i];
		newObj[i] = [];
		for(let j = 0; j < list.length; j++){
			if( list[j].client == 0 || list[j].client == 1 ){
				newObj[i].push(list[j])
			}
		}
        
	}
	return newObj;
}
function formObject_homeMenu(obj){    //用于转化下单菜单格式列表
    let newObj = {};
    for(let i in obj){
    	newObj[i] = [];
    	for(let j = 0; j < obj[i].length; j++){
    		newObj[i][j] = {
	            'value': obj[i][j].flatCode,
	            'label': obj[i][j].flatName,
	        }
    	}
        newObj[i].unshift({'value': "","label": "全部"})
    }
    return newObj;
}
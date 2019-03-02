import * as types from './mutationsTypes'


const mutations = {
  
	[types.c_homeMenuList](state,list){
		state.c_homeMenuList = list;
	},
	[types.c_formObject_homeMenuList](state,list){
		state.c_formObject_homeMenuList = list;
	}


};

export default mutations;
import * as types from './mutationsTypes'


const mutations = {

/**字典**/
	

	[types.dictionaryAll](state, obj){
		state.dictionaryAll = obj;
	},

	[types.electronicGameType](state, list){
		state.electronicGameType = list;
	},

	[types.m_exchange_eduMinPay](state, obj){
		state.m_exchange_eduMinPay = obj;
	},
	
	[types.m_setPlayOption](state, value, type = true, updateList = []){
		if(!type){
			state.m_setPlayOption = updateList;
			return;
		}
		let arr = [], list = [];
		if(value == ''){
			list.unshift({'value': "","label": "全部"});
			state.m_setPlayOption = list;
			return;
		}
		arr = state.dictionaryAll[value];
		for(let i = 0; i < arr.length; i++){
			list[i] = {
				'value': arr[i].codeValue,
				'label': arr[i].codeShowName,
				'isChecked': true
			}
		}
		list.unshift({'value': "","label": "全部"})
		state.m_setPlayOption = list;
	},

	[types.m_lottery_order_status](state, obj){
		state.m_lottery_order_status = obj;
	},

	[types.m_append_status](state, obj){
		state.m_append_status = obj;
	},
	[types.m_chongzhi_check_status](state, obj){
		state.m_chongzhi_check_status = obj;
	},
	[types.m_chongzhi_status](state, obj){
		state.m_chongzhi_status = obj;
	},
	[types.m_qukuan_check_status](state, obj){
		state.m_qukuan_check_status = obj;
	},
	[types.m_qukuan_status](state, obj){
		state.m_qukuan_status = obj;
	},
	
	[types.m_lottery_menu_list](state, obj){
		state.m_lottery_menu_list = obj;
	},
	[types.m_lottery_account_change](state, obj){
		state.m_lottery_account_change = obj;
	},
	[types.m_huikuan](state, obj){
		state.m_huikuan = obj;
	},
	[types.m_withdraw](state, obj){
		state.m_withdraw = obj;
	},
	[types.m_user_type](state, obj){
		state.m_user_type = obj;
	},
	[types.m_user_type_check](state, obj){
		state.m_user_type_check = obj;
	},
	[types.m_link_time_type](state, obj){
		state.m_link_time_type = obj;
	},
	[types.m_user_login_status](state, obj){
		state.m_user_login_status = obj;
	},
	[types.m_pay_salary_type](state, obj){
		state.m_pay_salary_type = obj;
	},
	[types.m_flat](state, obj){
		state.m_flat = obj;
	},
	[types.m_bank_transfer_type](state, obj){
		state.m_bank_transfer_type = obj;
	},
/**字典**/	

	// 充值--支付方式
    [types.charge_list_online](state,list) {
        state.charge_list_online = list;
	},
	[types.charge_list_onlineSaoma](state,list) {
        state.charge_list_onlineSaoma = list;
	},
	[types.charge_list_chuantongSaoma](state,list) {
        state.charge_list_chuantongSaoma = list;
	},
	[types.charge_list_bank](state,list) {
        state.charge_list_bank = list;
	},
	// 充值--支付方式 导航
    [types.charge_allList_nav](state,list) {
        state.charge_allList_nav = list;
	},
	
	// 银行卡列表
    [types.m_bankList](state,list) {
        state.m_bankList = list;
	},
	// 用户银行卡列表
    [types.m_userBankList](state,list) {
        state.m_userBankList = list;
	},
	
	//会员信息获取
	[types.m_memberInfo](state, obj){
		state.m_memberInfo = obj;
	},
	//未读消息条数
	[types.m_messageCount](state, count){
		state.m_messageCount = count;
	},

	//彩票种类列表
	[types.m_lotteryAll](state, list){
		state.m_lotteryAll = list;
	},
	//其他游戏列表
	[types.m_otherGameList]( state , list){
		state.m_otherGameList = list;
	},
	[types.m_otherGameList_setAll]( state , list){
		state.m_otherGameList_setAll = list;
	},
	
	//充值列表
	[types.m_chargeList](state, list){
		state.m_chargeList = list;
	},

	//切换游戏记录展示
	[types.m_gameRecord_changeIndex](state, index){
		state.m_gameRecordIndex = index;
	},
	//资金相关显示展示
	[types.m_aboutMoney_changeIndex](state, index){
		state.m_aboutMoneyIndex = index;
	},
	//切换账户管理展示
	[types.m_accountManager_changeIndex](state, index){
		state.m_accountManagerIndex = index;
	},
	//切换代理中心展示
	[types.m_agent_changeIndex](state, index){
		state.m_agentIndex = index;
	},
	//切换营销管理展示
	[types.m_marketing_changeIndex](state, index){
		state.m_marketingIndex = index;
	},
	//切换公告活动展示
	[types.m_announcement_changeIndex](state, index){
		state.m_announcementIndex = index;
	},
	//切换充值展示
	[types.m_charge_changeIndex](state, index){
		state.m_chargeIndex = index;
	},

	[types.m_lotteryRecordBetList]( state , list){
		state.m_lotteryRecordBetList = list.resultList;
	},

	[types.m_zhuihaoRecordList]( state , list){
		state.m_zhuihaoRecordList = list;
	},

	[types.m_zhuihaoDetail]( state , list){
		state.m_zhuihaoDetail = list;
	},

	[types.m_otherGameRecordList]( state , list){
		state.m_otherGameRecordList = list;
	},
	
	[types.m_accountWithdrawRecord]( state , list){
		state.m_accountWithdrawRecord = list;
	},
	
	[types.m_groupUserName_forLink]( state , userName){
		state.m_groupUserName_forLink = userName;
	},

	[types.m_date_forLink]( state , date){
		state.m_date_forLink = date;
	},
	
	[types.m_transfer_userName_forLink]( state , userName){
		state.m_transfer_userName_forLink = userName;
	},

	[types.m_moneyPswStatus]( state , type){
		state.m_moneyPswStatus = type;
	},
};

export default mutations;

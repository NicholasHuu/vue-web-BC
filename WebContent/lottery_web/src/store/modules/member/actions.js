import * as types from './mutationsTypes'
import * as apiList from 'api/member/memberApi'
import {ERR_OK} from 'api/config'

//首页获取个人信息
export const m_memberInfo = ({commit,state}) => {
    apiList.m_info().then( res => {
        if(res && res.errorCode == ERR_OK){
            commit( types.m_memberInfo , res.datas.userInfo);
        }else{
            console.log(res);
        }
    })
}
// 充值--支付方式
// export const get_chargeList = ({commit,state}) => {
//     apiList.charge_allList().then(res => {
//         if(res && res.errorCode == ERR_OK){
//             let list = [];
//             for(let i in res.datas){
//                 if(res.datas[i].list.length){
//                     list.push(res.datas[i].title);
//                 }
//             }

//             commit(types.charge_list_online, res.datas.online.list);
//             commit(types.charge_list_onlineSaoma, res.datas.onlineSaoma.list);
//             commit(types.charge_list_chuantongSaoma, res.datas.chuantongSaoma.list);
//             commit(types.charge_list_bank, res.datas.bank.list);

//             commit(types.charge_allList_nav,list);
//         }else{
//             console.log(res);
//         }
//     })
// }


//字典
function formArrayList(arr,type){    //用于转化下单菜单格式列表
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        newArr[i] = {
            'value': arr[i].codeValue,
            'label': arr[i].codeShowName,
        }
    }
    if( type == 1 ){
        newArr.unshift({'value': "","label": "全部"})
    }
    return newArr
}
export const getSystemCode = ({commit,state}) => {
    apiList.m_systemCode().then( res => {
        if(res && res.errorCode == ERR_OK){


            commit(types.m_lottery_menu_list, formArrayList(res.datas.restMap.lottery_menu_list,1));
            commit(types.m_lottery_account_change, formArrayList(res.datas.restMap.lottery_account_change,1));
            commit(types.m_huikuan, formArrayList(res.datas.restMap.huikuan,1));
            commit(types.m_withdraw, formArrayList(res.datas.restMap.withdraw,1));
            commit(types.m_user_type, formArrayList(res.datas.restMap.user_type,0));
            commit(types.m_user_type_check, formArrayList(res.datas.restMap.user_type,1));
            commit(types.m_link_time_type, formArrayList(res.datas.restMap.link_time_type,0));
            commit(types.m_pay_salary_type, formArrayList(res.datas.restMap.pay_salary_type,0));
            commit(types.m_bank_transfer_type, formArrayList(res.datas.restMap.bank_transfer_type,0));

            commit( types.m_lottery_order_status, formArrayList(res.datas.restMap.order_status,1) );
            commit( types.m_append_status, formArrayList(res.datas.restMap["append-status"],1) );
            commit( types.m_chongzhi_check_status, formArrayList(res.datas.restMap.chongzhi_check_status,1) );
            commit( types.m_chongzhi_status, formArrayList(res.datas.restMap.chongzhi_status,1) );
            commit( types.m_qukuan_check_status, formArrayList(res.datas.restMap.qukuan_check_status,1) );
            commit( types.m_qukuan_status, formArrayList(res.datas.restMap.qukuan_status,1) );
            
            commit(types.dictionaryAll, res.datas.restMap);
            commit(types.m_exchange_eduMinPay, res.datas.eduMinPay);

            commit(types.electronicGameType, res.datas.restMap);

        }else{
            console.log(res);
        }
    })
}

// 未读消息条数
export const re_m_messageCount = ({commit,state})=> {
    apiList.m_messageCount().then(res=> {
        if(res && res.errorCode == ERR_OK){
            commit( types.m_messageCount , res.datas.messageCount);
        }else{
            console.log(res);
        }
    })
}


// 获取第三方游戏平台
export const get_otherGameFlat = ({commit,state},userName)=> {
    apiList.otherGameFlat(userName).then(res=> {
        if(res && res.errorCode == ERR_OK){
            let list = form_otherGameFlat(res.datas.flatList,0);
            let listAll = form_otherGameFlat(res.datas.flatList,1);
            commit( types.m_otherGameList , list);
            commit( types.m_otherGameList_setAll , listAll);
        }else{
            console.log(res);
        }
    })
}

//转换第三方游戏平台
function form_otherGameFlat(arr,type){    //用于转化下单菜单格式列表
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        newArr[i] = {
            'value': arr[i].flat,
            'label': arr[i].flatName,
        }
    }
    if( type == 1 ){
        newArr.unshift({'value': "","label": "全部"})
    }
    return newArr
}


//获取银行卡列表
export const m_bankList = ({commit,state},cb = () => {})=> {
    return apiList.m_bankList().then(res=> {
        if(res.errorCode == ERR_OK){
            let arr = [];
            for(let i = 0; i < res.datas.length; i++){
                arr[i] = {
                    "value": res.datas[i].bankCode,
                    "label": res.datas[i].bankCnName,
                }
            }
            commit( types.m_bankList , arr);
        }else{
            //console.log(res.msg);
        }
    })
}

export const m_userBankList = ({commit,state},cb = () => {})=> {
    apiList.m_userBankList().then(res=> {
        if(res.errorCode == ERR_OK){
            commit( types.m_userBankList,res.datas);
        }else{
            //console.log(res.msg);
            commit(types.m_userBankList, {
                addFlag: true,
                list: [],
            });
        }
    })
}


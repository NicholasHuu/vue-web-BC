import Vue from "vue";
import Router from "vue-router";

const Index = resolve => require(['@/modules/member/IndexContainer'], resolve);
const IndexContainer = resolve => require(['@/components/indexContainer'], resolve);
const GameRecord = resolve => require(['@/modules/member/gameRecordContainer'], resolve);
const AccountManager = resolve => require(['@/modules/member/accountManagerContainer'], resolve);
const Agent = resolve => require(['@/modules/member/agentContainer'], resolve);
const AboutMoney = resolve => require(['@/modules/member/aboutMoneyContainer'], resolve);
const Marketing = resolve => require(['@/modules/member/marketingContainer'], resolve);
const Message = resolve => require(['@/modules/member/messageContainer'], resolve);
const Charge = resolve => require(['@/modules/member/chargeContainer'], resolve);
const Withdraw = resolve => require(['@/modules/member/withdrawContainer'], resolve);
const OtherIndex = resolve => require(['@/modules/member/otherIndexContainer'], resolve);
const MobileBind = resolve => require(['@/modules/member/mobileBindContainer'], resolve);
const ForgetPassword = resolve => require(['@/modules/member/forgetPasswordContainer'], resolve);
const Exchange = resolve => require(['@/modules/member/exchangeContainer'], resolve);


import store from 'store';
export default {
  path: "/member",
  component: IndexContainer,
  /*beforeEnter: (to, from, next) => {
    let memberInfo = store.getters.m_memberInfo;
    if(memberInfo.typeDetail == undefined){
      next(false)
    }else{
      let contentStatus = memberInfo.typeDetail.contentStatus;
      let reset = store._mutations.m_messageBoxStatus[0];
      if(1 == contentStatus){
        reset(true)
        next();
      }else{
        reset(false);
        next(); 
      }
    }
  },
  beforeRouteLeave(to, from , next){
    let reset = store._mutations.m_messageBoxStatus[0];
    reset(false)
  },*/
  children: [
    {
      path: "/member/gamerecord/:pageIndex",
      component: Index,
      children: [
        {
          path: "/",
          name: "GameRecord",
          component: GameRecord,
          meta:{
            title: "游戏记录"
          },
        },
        {
          path: "/member/accountmanager/:pageIndex",
          name: "AccountManager",
          component: AccountManager,
          meta:{
            title: "账户管理"
          }
        },
        {
          path: "/member/agent/:pageIndex",
          name: "Agent",
          component: Agent,
          meta:{
            title: "代理中心"
          },
          /*beforeEnter: (to, from, next) => {
            let isAgent = store.getters.m_memberInfo.isAgent;
            console.log(isAgent);
            if(store.getters.m_memberInfo.isAgent == undefined){
              next({ path: '/' });
            }
            if(1 == isAgent){
              next()
            }else{
              next({ path: '/' });
            }
          },*/
        },
        {
          path: "/member/aboutMoney/:pageIndex",
          name: "AboutMoney",
          component: AboutMoney,
          meta:{
            title: "资金相关"
          }
        },
        {
          path: "/member/marketing/:pageIndex",
          name: "Marketing",
          component: Marketing,
          meta:{
            title: "营销管理"
          }
        },
        {
          path: "/member/message/:pageIndex",
          name: "Message",
          component: Message,
          meta:{
            title:"消息管理"
          }
        },
        {
          path: "/member/charge",
          name: "Charge",
          component: Charge,
          meta:{
            title:"账户充值"
          }
        },
        {
          path: "/member/withdraw",
          name: "Withdraw",
          component: Withdraw,
          meta:{
            title:"账户提现"
          }
        },
        {
          path: "/member/exchange",
          name: "exchange",
          component: Exchange,
          meta:{
            title:"转换"
          }
        },
      ],
    },
    {
      path: "/member/mobilebind",
      component: OtherIndex,
      children: [
        {
          path: "/",
          name: "MobileBind",
          component: MobileBind,
          meta:{
            title: "绑定手机"
          }
        },
        {
          path: "/member/forgetPassword",
          name: "ForgetPassword",
          component: ForgetPassword,
          meta:{
            title: "忘记密码"
          }
        },
      ],
    }
  ]
};

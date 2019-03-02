const state = {
  dictionaryAll: {},
  electronicGameType: [],

  m_exchange_eduMinPay: 0,

  m_setPlayOption: [{ value: "", label: "全部" }],

  charge_list_online: [],
  charge_list_onlineSaoma: [],
  charge_list_chuantongSaoma: [],
  charge_list_bank: [],
  charge_allList_nav: [],

  m_memberInfo: {
    nickName: ""
  },

  m_bankList: [], //银行卡列表
  m_userBankList: [], //用户银行卡列表

  m_lottery_menu_list: [], //所有彩种列表
  m_lottery_order_status: [], //所有订单状态
  m_append_status: [], //追号状态

  m_chongzhi_check_status: [], //充值审核状态
  m_chongzhi_status: [], //充值状态

  m_qukuan_check_status: [], //取款审核状态
  m_qukuan_status: [], //取款状态

  m_lottery_account_change: [], //彩票帐变类型
  m_huikuan: [], //银行充值类型
  m_withdraw: [], //银行取款类型
  m_user_type: [], //用户类型
  m_user_type_check: [], //用户类型（团队管理）
  m_link_time_type: [], //推广链接有效期
  m_user_login_status: [], //用户在线状态
  m_pay_salary_type: [], //日薪发放模式
  m_flat: [], //第三方平台信息
  m_bank_transfer_type: [], //汇款方式

  m_messageCount: 0, //未读消息条数

  m_module_title: {
    /*[
			{
				name: 'gameRecord',
				title: '游戏记录',
				list: [
					{
						title: "投注记录",
						type: "bet_record",
					},{
						title: "追号记录",
						type: "append_record",
					},{
						title: "其他游戏记录",
						type: "otherGame_record",
					}
				],
			},{
				name: 'aboutMoney',
				title: '资金相关',
				list: [
					{
						title: "银行提现",
						type: "withdraw",
					},{
						title: "银行充值",
						type: "charge",
					},{
						title: "彩票账变",
						type: "lotteryChange",
					},{
						title: "转账记录",
						type: "translateRecord",
					},{
						title: "个人盈亏(彩票)",
						type: "lotteryLoss",
					},{
						title: "盈亏(真人电子)",
						type: "liveLoss",
					}
				],
			},{
				name: 'accountManager',
				title: '账户管理',
				list: [
					{
						title: "个人资料",
						type: "profile",
					},{
						title: "密码管理",
						type: "password",
					},{
						title: "银行卡管理",
						type: "bankCard",
					},{
						title: "彩种信息",
						type: "category",
					}
				],
			},{
				name: 'agent',
				title: '代理中心',
				list: [
					{
						title: "团队盈亏",
						type: "groupLoss",
					},{
						title: "团队管理",
						type: "groupManage",
					},{
						title: "注册下级",
						type: "lower",
					},{
						title: "推广链接",
						type: "spread",
					},{
						title: "转账",
						type: "translate",
					}
				],
			},
		]
		*/
    gameRecord: ["投注记录", "追号记录"],
    //gameRecord: ["投注记录","追号记录"],
    // aboutMoney: ["银行提现","银行充值","彩票账变","转账记录","个人盈亏(彩票)","盈亏(真人电子)"],
    aboutMoney: ["充值记录", "提现记录", "转换记录", "账变记录", "个人盈亏"], //其他游戏账变
    //aboutMoney: ["充值记录","提现记录","转换记录","彩票账变","其他游戏账变","彩票个人盈亏","其他游戏个人盈亏"], //其他游戏账变
    accountManager: ["个人资料", "密码管理", "银行卡管理", "彩种信息"],
    agent: ["团队盈亏", "团队管理", "注册下级", "推广链接", "下级转账"], //
    marketing: ["在线会员列表", "未投注会员", "有效会员"], //
    announcement: ["公告", "活动"],
    message: ["消息管理"]
  },
  m_dateChoseList: [
    {
      label: "date_1",
      value: "1"
    },
    {
      label: "date_3",
      value: "3"
    },
    {
      label: "date_7",
      value: "7"
    },
    {
      label: "date_30",
      value: "30"
    }
  ],

  m_internalLinkList: [
    {
      text: "投注记录",
      type: "betRecord",
      link: "/member/gamerecord/0"
    },
    {
      text: "充值记录",
      type: "depositRecord",
      link: "/member/aboutmoney/0"
    },
    {
      text: "提现记录",
      type: "withdrawRecord",
      link: "/member/aboutmoney/1"
    },
    {
      text: "游戏账变",
      type: "lotteryRecord",
      link: "/member/aboutmoney/3"
    },
    {
      text: "个人盈亏",
      type: "profitRecord",
      link: "/member/aboutmoney/4"
    }
  ],

  set_pageLimit: [
    {
      //设置分页选择项
      value: 10,
      label: "10条"
    },
    {
      value: 20,
      label: "20条"
    },
    {
      value: 30,
      label: "30条"
    }
  ],
  set_defaultPageLimit: 10,

  //其他游戏列表
  m_otherGameList: [],
  m_otherGameList_setAll: [],

  //彩票种类列表
  m_lotteryAll: [],

  //显示index switch
  m_gameRecordIndex: 0, //游戏记录显示index switch
  m_aboutMoneyIndex: 0, //资金相关显示index switch
  m_accountManagerIndex: 0, //账户管理显示index switch
  m_agentIndex: 0, //代理中心显示index switch
  m_marketingIndex: 0, //营销管理显示index switch
  m_announcementIndex: 0, //公告活动显示index switch
  m_chargeIndex: "", //充值显示index switch

  m_chargeList: {},
  //彩票投注列表
  m_lotteryRecordBetList: {},

  //追号记录列表
  m_zhuihaoRecordList: [],

  //追号列表详情
  m_zhuihaoDetail: {},

  //其他游戏记录
  m_otherGameRecordList: [],

  //银行提现记录
  m_accountWithdrawRecord: [],

  //团队管理跳转投注记录---用户名
  m_groupUserName_forLink: "",
  m_date_forLink: {},

  m_transfer_userName_forLink: "",

  m_moneyPswStatus: ""
};

export default state;

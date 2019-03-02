<template>
  <div class="register-lower">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="top-content">
      <div class="left">
        <ul>
          <li>
            <p>用户组:&nbsp;&nbsp;</p>
            <div class="disin">
              <Select
                v-model="defaultGrpUser"
                @change="registerLower.userType = defaultGrpUser;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in m_user_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <p>用户名:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              type="text"
              v-model.trim="registerLower.account"
              placeholder="4-16位数字/字母或组合"
            >
          </li>
          <li>
            <p>密码:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              type="password"
              v-model.trim="registerLower.password"
              placeholder="6-16位数字/字母或组合"
            >
          </li>
          <!-- <li><p>彩票返点:&nbsp;&nbsp;</p>
						<div class="disin">
							<Select v-model="defaultPercentList" @change="registerLower.back = defaultPercentList;" placeholder="请选择">
							    <Option v-for="item in percentList" :key="item" :label="item+'%'" :value="item"></Option>
							</Select>
						</div>
					</li>
					<li><p>真人返点:&nbsp;&nbsp;</p>
						<div class="disin">
							<Select v-model="defaultPercentList" @change="registerLower.back = defaultPercentList;" placeholder="请选择">
							    <Option v-for="item in percentList" :key="item" :label="item+'%'" :value="item"></Option>
							</Select>
						</div>
					</li>
					<li><p>电子返点:&nbsp;&nbsp;</p>
						<div class="disin">
							<Select v-model="defaultPercentList" @change="registerLower.back = defaultPercentList;" placeholder="请选择">
							    <Option v-for="item in percentList" :key="item" :label="item+'%'" :value="item"></Option>
							</Select>
						</div>
					</li>
					<li><p>体育返点:&nbsp;&nbsp;</p>
						<div class="disin">
							<Select v-model="defaultPercentList" @change="registerLower.back = defaultPercentList;" placeholder="请选择">
							    <Option v-for="item in percentList" :key="item" :label="item+'%'" :value="item"></Option>
							</Select>
						</div>
          </li>-->
          <li v-for="(item,index) in backWaterList">
            <p>{{item.title}}:&nbsp;&nbsp;</p>
            <div class="disin">
              <Select
                v-model="item.defaultWaterValue"
                @change="changeBackWater(item.type,item.defaultWaterValue)"
                placeholder="请选择"
              >
                <Option v-for="item in item.list" :key="item" :label="item+'%'" :value="item"></Option>
              </Select>
            </div>
          </li>

          <li>
            <p></p>
            <div class="btn-search" @click="addAgent(registerLower)">提 交</div>
          </li>
        </ul>
      </div>
      <!--<div class="right">
				 	<table>
						<caption>我的标题</caption>
						<thead>
							<tr>
								<td>返点</td>
								<td>剩余配额</td>
								<td>返点</td>
								<td>剩余配额</td>
							</tr>
						</thead>
					</table>
					<div class="shadow-transform"></div> 
      </div>-->
    </div>

    <div class="table-content">
      <table>
        <tr class="thead">
          <td>彩种</td>
          <!-- <td width="80">code</td> -->
          <td>奖金组</td>
          <td>返点范围</td>
          <td width="25%">高奖金</td>
          <td width="25%">高返点</td>
        </tr>
        <tr class="tbody" v-for="(item,index) in lotteryList" :key="index">
          <td>{{item.lotteryName}}</td>
          <!-- <td>{{item.lotteryCode}}</td> -->
          <td>1800平级奖金组</td>
          <td>0-{{handleFilter(item.lotteryCode,defaultPercentList)}}%</td>
          <td class="blockBg">
            <span>{{1800+(10*2*handleFilter(item.lotteryCode,defaultPercentList))}}</span>
          </td>
          <td class="blockBg">
            <span>1800+{{handleFilter(item.lotteryCode,defaultPercentList)}}%</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import { Select, Option } from "element-ui";
import { mapGetters } from "vuex";
import { ERR_OK } from "api/config";
import { m_lotteryCategory, m_agentRegister } from "api/member/memberApi";
import { v_userName, v_password_every, clearObject } from "common/js/utils";
import { messageOption } from "../toolFunction";
export default {
  name: "registerLower",
  data() {
    return {
      listlist: ["注册下级"],
      registerLower: {
        userType: "",
        account: "",
        password: "",
        back: "",
        liveBack: "",
        electronicBack: "",
        sportBack: "",
        fishBack: ""
      },
      //用户组配置
      defaultGrpUser: 0,
      //返点设置
      percentList: [],
      defaultPercentList: null,

      lotteryList: [],

      backWaterList: [
        {
          type: "lottery",
          title: "彩票返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "live",
          title: "真人返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "electronic",
          title: "电子返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "sport",
          title: "体育返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "fish",
          title: "捕鱼返点",
          list: [],
          defaultWaterValue: 0
        }
      ],

      backWaterListStatus: true //判断是否已经生成列表(刷新时数组会重复生成)
    };
  },
  created() {
    this.registerLower = clearObject(this.registerLower);

    this.__init();
    m_lotteryCategory().then(res => {
      if (res.errorCode == ERR_OK) {
        this.lotteryList = res.datas.lotteryMenuList;
      }
    });
  },
  methods: {
    __init() {
      if (this.m_memberInfo.backWater !== undefined) {
        if (this.backWaterListStatus) {
          let initial = this.m_memberInfo.backWater;
          for (let i = 0; i < this.backWaterList.length; i++) {
            let maxBackWater = initial[this.backWaterList[i].type];
            for (let j = maxBackWater; j >= 0; j = j - 0.1) {
              this.backWaterList[i].list.push(j.toFixed(1));
            }
            this.backWaterList[i].defaultWaterValue = this.backWaterList[
              i
            ].list[0];
          }
          this.defaultPercentList = this.backWaterList[0].list[0];
          this.backWaterListStatus = false;

          this.registerLower.back = initial.lottery;
          this.registerLower.liveBack = initial.live;
          this.registerLower.electronicBack = initial.electronic;
          this.registerLower.sportBack = initial.sport;
          this.registerLower.fishBack = initial.fish;
        }
      }
      this.defaultGrpUser = this.m_user_type[0].value;
      this.registerLower.userType = this.m_user_type[0].value;
    },
    addAgent(obj) {
      if (!v_userName(obj.account) || obj.account == "") {
        this.$message(messageOption("请输入4-16位数字/字母或组合作为帐号"));
        return;
      }
      if (!v_password_every(obj.password) || obj.password == "") {
        this.$message(messageOption("请输入6-16位数字/字母或组合作为密码"));
        return;
      }
      if (obj.back <= 0 || obj.back > this.m_memberInfo.betBackWater) {
        this.$message(messageOption("请选择正确的返点金额"));
        return;
      }
      m_agentRegister(obj).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.registerLower.account = "";
          this.registerLower.password = "";
        }
      });
    },
    changeBackWater(type, num) {
      switch (type) {
        case "lottery":
          this.registerLower.back = num;
          this.defaultPercentList = num;
          break;
        case "live":
          this.registerLower.liveBack = num;
          break;
        case "electronic":
          this.registerLower.electronicBack = num;
          break;
        case "sport":
          this.registerLower.sportBack = num;
          break;
        case "fish":
          this.registerLower.fishBack = num;
          break;
        default:
          break;
      }
    },
    handleFilter(code, value) {
      // if( code == "bjsc"){
      // 	return (value - 0.3).toFixed(1);
      // }else if(code == "fc3d" || code == "pl3"){
      // 	return (value - 1.6).toFixed(1);
      // }
      return value;
    }
  },
  watch: {
    m_memberInfo() {
      this.__init();
    },
    m_user_type() {
      this.__init();
    }
  },
  components: {
    Select,
    Option,
    HeaderNav
  },
  computed: {
    ...mapGetters({
      m_memberInfo: "m_memberInfo",
      m_user_type: "m_user_type",
      m_link_time_type: "m_link_time_type"
    })
  }
};
</script>

<style lang="sass" scoped>
.register-lower
	// padding: 20px
	background: #fff
	.top-content
		position: relative
		width: 100%
		padding: 30px 50px
		margin: 0 auto 20px
		background: #E3E0E7
		box-sizing: border-box
		.left
			display: inline-block
			margin-left: 50px
		li
			margin-bottom: 20px
			p
				display: inline-block
				width: 100px
				margin-right: 10px
				text-align: right
				font-size: 14px
			input
				width: 180px
				height: 26px
				line-height: 26px
				padding-left: 6px
				margin-right: 10px
				border: 1px solid #ccc
				border-radius: 4px
			span
				display: inline-block
				font-size: 14px
			.btn-search
				display: inline-block
			.el-select
				width: 190px
		.right
			position: relative
			float: right
			margin-right: 30px
			&:before
				z-index: 2
				position: absolute
				bottom: 0
				left: 15px
				content: ""
				width: 100%
				height: 15px
				transform: skew(65deg)
				background: #c5c4c5
			&:after
				z-index: 1
				position: absolute
				top: 0
				right: -30px
				content: ""
				width: 30px
				height: 97px
				background: url("./myQuotaBg.png") no-repeat
				background-size: 100% 100%
			table
				border: 1px solid #ccc
				caption
					height: 40px
					line-height: 40px
					background: #bbb
					font-size: 15px
					font-weight: 700
				thead
					background: #eee
				td
					width: 100px
					height: 40px
					line-height: 40px
					padding: 0
					border-color: #a9a9a9
					font-weight: 700
					color: #333
					font-size: 15px
			.shadow-transform
				width: 100%
				height: 15px
				margin-left: 13px
				background: #bbb
				transform: skew(60deg,0);
		&:before,&:after
			content: ''
			position: absolute
			top: 0
			left: -4px
			width: 5px
			height: 100%
			background: url(./addUser-l.png) repeat-y;
		&:after
			left: unset
			right: -5px
			background: url(./addUser-r.png) repeat-y;

	.table-content
		background: #f2f2f2
		.thead
			td
				line-height: 24px
				font-size: 16px
				font-weight: 600
		.tbody
			font-size: 14px	
.blockBg
	width: 230px
	padding: 8px 0
	span
		display: block
		width: 125px
		padding: 5px 0
		margin: 0 auto
		background: #fff
</style>



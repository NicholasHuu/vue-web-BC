<template>
  <div class="group-profitloss">
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>账号:&nbsp;&nbsp;</span>
          <div class="disin">
            <span>{{m_memberInfo.userName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p class="disin">昵称：
              <span>{{m_memberInfo.nickName == '' ? '未设置' : m_memberInfo.nickName}}</span>
            </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p class="disin">团队总余额：
              <span>{{m_memberInfo.teamMoney}}</span>
            </p>
          </div>
        </li>
        <li>
          <span>查询条件:&nbsp;&nbsp;</span>
          <div class="disin">
            <span :class="['btn',{'active': !recordStatus}]" @click="recordCheck(0)">团队盈亏详情</span>
            <span :class="['btn',{'active': recordStatus}]" @click="recordCheck(1)">每日盈亏记录</span>
          </div>
        </li>
        <li>
          <span>投注时间:&nbsp;&nbsp;</span>
          <DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption"></DateOptionSelect>
        </li>
        <li>
          <span v-show="!recordStatus">用户名:&nbsp;</span>
          <input
            style="margin-right:10px;"
            v-show="!recordStatus"
            class="user-name"
            type="text"
            v-model.trim="accountProfitOrLoss.account"
            placeholder="若不填，则统计您这个团队的盈亏"
          >
          <p style="display: inline;font-size: 14px;">
            <span style="color: #C12727;">备注:</span>
            <span v-show="!recordStatus">※团队盈亏详情※ 会统计您查询时间内的团队盈亏总和，以及下一级的团队盈亏总和。包含当天数据</span>
            <span v-show="recordStatus">※每日盈亏记录※ 会统计您与下级团队查询时间内的盈亏总和，每天一条记录。</span>
          </p>
        </li>
        <li>
          <span
            class="btn-search"
            @click="accountProfitOrLoss.currentPage = 1;getProfitOrLossList(accountProfitOrLoss)"
          >搜 索</span>
        </li>
      </ul>
    </div>

    <div class="record-list" :class="{nofound: !list.length}">
      <div class="userLocation">
        <span>当前用户位置：</span>
        <div class="disin" style="margin-bottom: 10px;">
          <span class="front" @click="frontSearch">{{m_memberInfo.userName}}</span>
          <div class="disin">
            <span
              v-for="(item,index) in dynamicUserName"
              :key="index"
              class="cursor"
              @click="locationSearch(item)"
            >&#62; {{item}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <p class="disin" style="color: #C12727;">注：总盈亏=活动总额+中奖总额-实际投注总额</p>
      </div>
      <table>
        <thead>
          <tr>
            <td width="100">用户</td>
            <td width="80">时间</td>
            <td width="100">实际投注总额</td>
            <td width="100">返点总额</td>
            <td width="100">中奖总额</td>
            <td width="100">活动总额</td>
            <td width="100">充值总额</td>
            <td width="100">提款总额</td>
            <td width="100">余额</td>
            <td>总盈亏</td>
            <td width="70">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index" :class="{'myself': item.clickFlag == 0}">
            <td v-if="item.clickFlag == 0">
              <span>{{item.userName}}</span>
            </td>
            <td v-else>
              <span
                class="btn"
                style="color: #17008d;"
                @click="tableUserSearch(item.userName)"
              >{{item.userName}}</span>
            </td>
            <td>{{item.date}}</td>
            <td>{{item.betAmount}}</td>
            <td>{{item.betBack}}</td>
            <td>{{item.winAmount}}</td>
            <td>{{item.huoDongAmount}}</td>
            <td>{{item.depositAmount}}</td>
            <td>{{item.drawAmount}}</td>
            <td>{{item.userMoney}}</td>
            <td>{{parseFloat(item.totalProfit).toFixed(4)}}</td>

            <td class="operationLists">
              <span class="cursor btn">操作</span>
              <div class="operationList">
                <ul>
                  <li
                    v-for="(itemLink,index) in m_internalLinkList"
                    :key="index"
                    @click="linkToRecord(item.userName,itemLink.type,itemLink.link)"
                  >{{itemLink.text}}</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pageSwitch">
      <PageOption
        :totalNumber="totalNumber"
        :totalPage="totalPage"
        :curPage="accountProfitOrLoss.currentPage"
        @callPage="callPage"
      ></PageOption>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import NewDatePicker from "../newDatePicker";
import PageOption from "../pageOption";
import { ERR_OK } from "api/config";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { m_teamProfitLoss } from "api/member/memberApi";
import { defaultDateSet, getDateDruing, messageOption } from "../toolFunction";
import DateOptionSelect from "../dateOptionSelect";
export default {
  name: "groupProfitloss",
  data() {
    return {
      recordStatus: false,
      accountProfitOrLoss: {
        startTime: "",
        finishTime: "",
        flag: 0, //0表示团队盈亏  1表示每日盈亏
        currentPage: 1,
        pageLimit: 0,
        account: ""
      },
      list: [],
      curUserName: "",
      totalPage: 0,
      totalNumber: 0,

      dynamicUserName: [],
      setDefault: {}
    };
  },
  created() {
    this.accountProfitOrLoss.pageLimit = this.set_defaultPageLimit;
    this.__init();
  },
  methods: {
    initializeDate(druing) {
      let dateChoseList = getDateDruing()[druing];
      this.accountProfitOrLoss.startTime = dateChoseList.start;
      this.accountProfitOrLoss.finishTime = dateChoseList.end;
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    __init() {
      let dateChoseList = getDateDruing()["today"];
      this.accountProfitOrLoss.startTime = dateChoseList.start;
      this.accountProfitOrLoss.finishTime = dateChoseList.end;
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    getProfitOrLossList(obj) {
      if (obj.account != "" && !/^[A-Za-z0-9]{4,16}$/.test(obj.account)) {
        this.$message(messageOption("请输入4-16位数字/字母或组合的帐号"));
        return;
      }
      m_teamProfitLoss(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.dynamicUserName = [];
          if (
            obj.account != "" &&
            this.dynamicUserName.indexOf(obj.account) < 0
          ) {
            this.dynamicUserName.push(obj.account);
          }
          this.list = res.datas.resultList;
          this.totalNumber = res.datas.totalRows;
          this.totalPage = res.datas.totalPages;
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    linkToRecord(userName, type, link) {
      this.m_groupUserName_forLink(userName);
      let date = {
        start: this.accountProfitOrLoss.startTime,
        end: this.accountProfitOrLoss.finishTime
      };
      this.m_date_forLink(date);
      this.$router.push(link);
    },
    recordCheck(type) {
      this.recordStatus = type == 1 ? true : false;
      this.accountProfitOrLoss.flag = type == 1 ? 1 : 0;
      if (type == 1) {
        this.dynamicUserName = [];
      } else {
        this.diaryCheck("today");
      }
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    diaryCheck(type) {
      this.diaryCheckStatus = type;
      this.initializeDate(type);
    },
    //当前用户查询
    frontSearch() {
      this.accountProfitOrLoss.currentPage = 1;
      this.accountProfitOrLoss.account = "";
      this.accountProfitOrLoss.flag = 0;
      this.dynamicUserName = [];
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    locationSearch(userName) {
      for (let i = 0; i < this.dynamicUserName.length; i++) {
        if (this.dynamicUserName[i] == userName) {
          this.dynamicUserName.splice(i + 1, this.dynamicUserName.length - i);
        }
      }
      this.accountProfitOrLoss.account = userName;
      this.accountProfitOrLoss.currentPage = 1;
      this.accountProfitOrLoss.flag = 0;
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    tableUserSearch(userName) {
      this.accountProfitOrLoss.account = userName;
      this.accountProfitOrLoss.currentPage = 1;
      this.accountProfitOrLoss.flag = 0;
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    runDateOption(obj) {
      this.accountProfitOrLoss.startTime = obj.start;
      this.accountProfitOrLoss.finishTime = obj.end;
    },
    changeDate(start, end) {
      this.accountProfitOrLoss.startTime = start;
      this.accountProfitOrLoss.finishTime = end;
    },
    callPage(obj) {
      this.accountProfitOrLoss.currentPage = obj.currentPage;
      this.accountProfitOrLoss.pageLimit = obj.pageLimit;
      this.getProfitOrLossList(this.accountProfitOrLoss);
    },
    ...mapMutations({
      m_groupUserName_forLink: "m_groupUserName_forLink",
      m_date_forLink: "m_date_forLink"
    })
  },
  computed: {
    ...mapGetters({
      m_memberInfo: "m_memberInfo",
      set_defaultPageLimit: "set_defaultPageLimit",
      m_internalLinkList: "m_internalLinkList"
    })
  },
  components: {
    Select,
    Option,
    NewDatePicker,
    PageOption,
    DateOptionSelect
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.group-profitloss
	.record-list
		background: #fff
	.select-zone
		padding: 20px
		li
			float: unset
			line-height: 30px
			margin-bottom: 16px
			&:last-child
				margin-bottom: 0
			.btn
				padding: 4.2px 20px
				margin-right: 20px
				border: 1px solid #ccc
				border-radius: 4px
				color: #333
			.btn.active
				background: #feebeb
				border: 1px solid #C12727
				color: #C12727
			.user-name
				width: 200px
				padding-left: 4px
				font-size: 13px
	.userLocation
		text-align: left
		font-size: 13px
		.front
			color: #17008d
			cursor: pointer
	.myself
		td
			background: yellow
	
.nofound
	background: #eee url(../nofound.png) no-repeat center;
</style>



<template>
  <div class="lottery-account">
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>平台类型:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="otherGameTypeDefault"
              @change="changeFlatType(otherGameTypeDefault);accountOtherGame.currentPage = 1;"
              placeholder="请选择"
            >
              <Option
                v-for="item in c_otherGameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span>所属厅:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="default_flat"
              @change="accountOtherGame.lotteryCode = default_flat;accountOtherGame.currentPage = 1;"
              placeholder="请选择"
            >
              <Option
                v-for="item in list_flat"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span>用户名:&nbsp;&nbsp;</span>
          <input class="user-name" type="text" v-model.trim="accountOtherGame.account">
        </li>
        <li>
          <input
            type="checkbox"
            v-model="status"
            true-value="yes"
            false-value="no"
            id="contain-accountLottery"
          >
          <label for="contain-accountLottery" class="lineheight-style">包含下级</label>
        </li>
        <li>
          <span>账变时间:&nbsp;&nbsp;</span>
          <DateOptionSelect
            @ChangeDateValue="changeDate"
            @runDateOption="runDateOption"
            :setDefault="setDefault"
          ></DateOptionSelect>
        </li>

        <li>
          <span
            class="btn-search"
            @click="accountOtherGame.currentPage = 1;getLotteryAccountList(accountOtherGame)"
          >搜 索</span>
        </li>
      </ul>
      <ul class="clearfix"></ul>
    </div>
    <div class="record-list" :class="{nofound: !list.length}">
      <table>
        <thead>
          <tr>
            <td width="100">用户名</td>
            <td width="120">订单号</td>
            <td width="90">平台</td>
            <td width="120">玩法</td>
            <td width="120">账变类型</td>
            <td width="140">账变时间</td>
            <td width="100">账变金额</td>
            <td width="100">用户余额</td>
            <td>类别</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="btn"
            v-for="(item,index) in list"
            :key="index"
            @click="lookDetail(item,'lotteryChangeDetail')"
          >
            <td>{{item.userName}}</td>
            <td>{{item.appendOrder}}</td>
            <td>{{item.lotteryName}}</td>
            <td>{{item.gameName}}</td>
            <td>{{item.changeType}}</td>
            <td>{{item.changeTime.substring(0,item.changeTime.length-3)}}</td>
            <td :class="['income',{pay:item.changeMoney < 0}]">{{item.changeMoney}}</td>
            <td>{{item.userBalance}}</td>
            <td :class="['income',{pay:item.testValue == '0'}]">{{item.test}}</td>
          </tr>
          <tr v-show="list.length">
            <td colspan="6">汇总小结</td>
            <td :class="['income',{pay:count_sum.betSum_val < 0}]">{{count_sum.betSum_val}}</td>
            <td colspan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pageSwitch">
      <PageOption
        :totalNumber="totalNumber"
        :totalPage="totalPage"
        :curPage="accountOtherGame.currentPage"
        @callPage="callPage"
      ></PageOption>
    </div>
    <div class="proups" v-if="slotActive != ''">
      <SlotCommon
        v-if="slotActive == 'lotteryChangeDetail'"
        :currentStyle="slotActive"
        @proupsClose="proupsClose"
      >
        <h1 slot="header">账变详情</h1>
        <div class="main">
          <div class="top clearfix">
            <div class="left fl">
              <img class="fl" v-if="slotCommonInfo.testValue == '0'" src="./outgo.png" alt>
              <img class="fl" v-else="slotCommonInfo.testValue == '1'" src="./income.png" alt>
              <div class="fl changeMoney">
                <p :class="{outgo: slotCommonInfo.testValue == '0'}">{{slotCommonInfo.changeMoney}}</p>
                <p class="changeType">{{slotCommonInfo.changeType}}</p>
              </div>
            </div>
            <div class="right fr">
              <p class>{{slotCommonInfo.lotteryName}}-{{slotCommonInfo.gameName}}</p>
              <!-- <p class="changeType">{{slotCommonInfo.qihao}}</p> -->
            </div>
          </div>
          <div class="bottom">
            <table>
              <thead>
                <tr>
                  <td>用户</td>
                  <td>账变时间</td>
                  <!-- <td>追号编号</td> -->
                  <!-- <td>方案编号</td> -->
                  <td>订单号</td>
                  <td>用户余额</td>
                  <td>备注</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{slotCommonInfo.userName}}</td>
                  <td>{{slotCommonInfo.changeTime}}</td>
                  <td>{{slotCommonInfo.appendOrder}}</td>
                  <!-- <td>{{slotCommonInfo.fanganOrder}}</td> -->
                  <td>{{slotCommonInfo.userBalance}}</td>
                  <td>{{slotCommonInfo.remark}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p slot="footer" @click="proupsClose">关 闭</p>
      </SlotCommon>
    </div>
  </div>
</template>
<script>
import { Select, Option } from "element-ui";
import PageOption from "../pageOption";
import { ERR_OK } from "api/config";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { m_account_otherGame_change } from "api/member/memberApi";
import {
  defaultDateSet,
  countArrSum,
  messageOption,
  getDateDruing
} from "../toolFunction";
import SlotCommon from "../slotCommon";
import DateOptionSelect from "../dateOptionSelect";
export default {
  name: "otherGameAccount",
  data() {
    return {
      otherGameTypeDefault: "",
      status: "",
      accountOtherGame: {
        lotteryCode: "",
        startTime: "",
        finishTime: "",
        flag: 0,
        account: "",
        currentPage: 1,
        pageLimit: 0,
        changeType: "",
        gameType: "",
        type: ""
      },

      default_flat: "",
      list_flat: [],

      list: [],

      totalPage: 0,
      totalNumber: 0,
      count_sum: {
        betSum: [],
        betSum_val: 0
      },

      slotActive: "",
      slotCommonInfo: {},

      setDefault: {}
    };
  },
  created() {
    this.accountOtherGame.pageLimit = this.set_defaultPageLimit;
    this.otherGameTypeDefault = this.c_otherGameList[0].value;
    this.list_flat = this.c_homeMenuList[this.otherGameTypeDefault];
    this.default_flat = this.list_flat[0].value;
    this.accountOtherGame.lotteryCode = this.default_flat;
    console.log("ok");
    this.accountOtherGame.account = this.m_groupUserName_forLink
      ? this.m_groupUserName_forLink
      : "";
    this.__init();
  },
  beforeDestroy() {
    this.m_setPlayOption("");
  },
  methods: {
    __init() {
      if (Object.keys(this.m_date_forLink).length != 0) {
        this.setDefault = this.m_date_forLink;
        this.accountOtherGame.startTime = this.m_date_forLink.start;
        this.accountOtherGame.finishTime = this.m_date_forLink.end;
      } else {
        let dateChoseList = getDateDruing();
        let defaultDateVar = dateChoseList["today"];
        this.accountOtherGame.startTime = defaultDateVar.start;
        this.accountOtherGame.finishTime = defaultDateVar.end;
      }
      this.getLotteryAccountList(this.accountOtherGame);
    },
    getLotteryAccountList(obj) {
      console.log(obj);
      //   console.log(this.list_flat);
      //   console.log(this.default_flat);
      if (
        this.accountOtherGame.account != "" &&
        !/^[A-Za-z0-9]{4,16}$/.test(this.accountOtherGame.account)
      ) {
        this.accountOtherGame.account = "";
        this.$message(messageOption("您输入的账户格式不正确！"));
        return;
      }
      obj.flag = this.status === "yes" ? 1 : 0;
      m_account_otherGame_change(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.list = res.datas.resultList;
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
          this.count_sum.betSum = [];
          for (let i = 0; i < this.list.length; i++) {
            this.count_sum.betSum.push(this.list[i].changeMoney);
          }
          this.count_sum.betSum_val = countArrSum(this.count_sum.betSum);
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    //玩法操作
    changeFlatType(flatType) {
      this.accountOtherGame.gameType = flatType;
      this.accountOtherGame.currentPage = 1;
      switch (flatType) {
        case 1:
          flatType = "live";
          break;
        case 2:
          flatType = "electronic";
          break;
        case 3:
          flatType = "sport";
          break;
        case 4:
          flatType = "fish";
          break;
      }
      this.list_flat = this.c_homeMenuList[flatType];
      this.default_flat = this.list_flat[0].value;
      console.log(this.list_flat);
      console.log(this.default_flat);
    },
    lookDetail(obj, type) {
      this.slotActive = type;
      this.slotCommonInfo = obj;
    },
    proupsClose() {
      this.slotActive = "";
    },
    runDateOption(obj) {
      this.accountOtherGame.startTime = obj.start;
      this.accountOtherGame.finishTime = obj.end;
    },
    changeDate(start, end) {
      this.accountOtherGame.startTime = start;
      this.accountOtherGame.finishTime = end;
    },
    callPage(obj) {
      this.accountOtherGame.currentPage = obj.currentPage;
      this.accountOtherGame.pageLimit = obj.pageLimit;
      this.getLotteryAccountList(this.accountOtherGame);
    },
    ...mapMutations({
      m_setPlayOption: "m_setPlayOption"
    })
  },
  computed: {
    ...mapGetters({
      c_otherGameList: "c_otherGameList",
      set_defaultPageLimit: "set_defaultPageLimit",
      c_homeMenuList: "c_formObject_homeMenuList",
      m_groupUserName_forLin: "m_groupUserName_forLink",
      m_date_forLink: "m_date_forLink"
    })
  },
  components: {
    Select,
    Option,
    PageOption,
    SlotCommon,
    DateOptionSelect
  }
};
</script>
<style lang='sass' scoped>
.income
	color: #05be05
.income.pay
	color: #f33
.nofound
	background: #eee url(../nofound.png) no-repeat center;
</style>
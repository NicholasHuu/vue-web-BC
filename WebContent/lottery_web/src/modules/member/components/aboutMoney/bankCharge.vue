<template>
  <div class="bank-charge">
    <HeaderNav :data="listlist" :currentIndex="curIndex"></HeaderNav>
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>操作类型:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultDrawType"
              @change="accountCharge.depositType = defaultDrawType;"
              placeholder="请选择"
            >
              <Option
                v-for="item in m_huikuan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span>审核状态:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultCheckStatus"
              @change="accountCharge.checkStatus = defaultCheckStatus;"
              placeholder="请选择"
            >
              <Option
                v-for="item in m_chongzhi_check_status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span>用户名:&nbsp;&nbsp;</span>
          <input class="user-name" type="text" v-model.trim="accountCharge.account">
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
        <!--<li><span>充值状态:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultDepositStatus" @change="accountCharge.depositStatus = defaultDepositStatus;" placeholder="请选择">
						    <Option v-for="item in m_chongzhi_status" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
        </li>-->
        <li>
          <span>充值时间:&nbsp;&nbsp;</span>
          <DateOptionSelect
            @ChangeDateValue="changeDate"
            @runDateOption="runDateOption"
            :setDefault="setDefault"
          ></DateOptionSelect>
        </li>

        <li>
          <span
            class="btn-search"
            @click="accountCharge.currentPage = 1;getChargeList(accountCharge);"
          >搜 索</span>
        </li>
      </ul>
    </div>
    <div class="record-list" :class="{nofound: !list.length}">
      <table>
        <thead>
          <tr>
            <!-- <td>账变用户</td> -->
            <td width="120">操作类型</td>
            <td width="200">订单号</td>
            <td width="200">订单时间</td>
            <!-- <td>充值时间</td>
            <td>入款时间</td>-->
            <td width="130">金额</td>
            <td width="300">备注</td>
            <td>状态</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <!-- <td>{{item.userName}}</td> -->
            <!-- <td>{{item.drawType == 11 ? "会员取款" : "系统扣款"}}</td> -->
            <td>{{item.depositType}}</td>
            <td>{{item.hkOrder}}</td>
            <td>{{item.depositTime}}</td>
            <!-- <td>{{item.depositTime}}</td>
            <td>{{item.hkTime}}</td>-->
            <td style="color: #f33;">{{item.depositMoney}}</td>
            <td class="bet_content" v-if="item.remark.length > 12">
              {{item.remark.substr(0,12)}}...
              <span
                class="lookDetail_content"
                @click="f_lookRemarkDetail(item.remark,'lookRemarkDetail')"
              >详情</span>
            </td>
            <td class="bet_content" v-else>{{item.remark}}</td>
            <td>{{item.status == '充值中' ? '待支付' : item.status}}</td>
          </tr>

          <tr v-show="list.length">
            <td colspan="3">汇总小结</td>
            <td style="color: #f33;">{{count_sum.betSum_val}}</td>
            <td colspan="3"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <LookBetDetail
      :content="lookBetDetail"
      :slotActive="slotActive_betDetail"
      @closeBetDetail="closeBetDetail"
    ></LookBetDetail>

    <div class="pageSwitch">
      <PageOption
        :totalNumber="totalNumber"
        :totalPage="totalPage"
        :curPage="accountCharge.currentPage"
        @callPage="callPage"
      ></PageOption>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../headerNav";
import { Select, Option } from "element-ui";
import NewDatePicker from "../newDatePicker";
import PageOption from "../pageOption";
import { ERR_OK } from "api/config";
import { m_account_deposit } from "api/member/memberApi";
import { mapGetters, mapMutations } from "vuex";
import {
  defaultDateSet,
  countArrSum,
  messageOption,
  getDateDruing
} from "../toolFunction";
import LookBetDetail from "../lookBetDetail";
import DateOptionSelect from "../dateOptionSelect";
export default {
  name: "bankWithdraw",
  data() {
    return {
      listlist: ["充值记录"],
      curIndex: 0,
      accountCharge: {
        startTime: "",
        finishTime: "",
        depositType: "",
        currentPage: 1,
        pageLimit: 0,
        checkStatus: "",
        depositStatus: "",
        account: "",
        flag: 1
      },
      defaultDrawType: "",
      defaultCheckStatus: "",
      defaultDepositStatus: "",

      totalNumber: 0,
      totalPage: 0,
      list: [],
      count_sum: {
        betSum: [],
        betSum_val: 0
      },

      lookBetDetail: "",
      slotActive_betDetail: "",

      setDefault: {},

      status: "yes"
    };
  },
  created() {
    this.accountCharge.pageLimit = this.set_defaultPageLimit;
    this.accountCharge.account = this.m_groupUserName_forLink
      ? this.m_groupUserName_forLink
      : "";
    this.__init();
  },
  methods: {
    __init() {
      console.log(Object.keys(this.m_date_forLink).length != 0);
      if (Object.keys(this.m_date_forLink).length != 0) {
        this.setDefault = this.m_date_forLink;
        this.accountCharge.startTime = this.m_date_forLink.start;
        this.accountCharge.finishTime = this.m_date_forLink.end;
      } else {
        let dateChoseList = getDateDruing();
        let defaultDateVar = dateChoseList["today"];
        this.accountCharge.startTime = defaultDateVar.start;
        this.accountCharge.finishTime = defaultDateVar.end;
      }
      this.getChargeList(this.accountCharge);
    },
    getChargeList(obj) {
      obj.flag = this.status === "yes" ? 1 : 0;
      m_account_deposit(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.list = res.datas.resultList;
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
          this.count_sum.betSum = [];
          for (let i = 0; i < this.list.length; i++) {
            this.count_sum.betSum.push(this.list[i].depositMoney);
          }
          this.count_sum.betSum_val = countArrSum(this.count_sum.betSum);
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    f_lookRemarkDetail(content, type) {
      this.lookBetDetail = content;
      this.slotActive_betDetail = type;
    },
    closeBetDetail() {
      this.slotActive_betDetail = "";
    },
    runDateOption(obj) {
      this.accountCharge.startTime = obj.start;
      this.accountCharge.finishTime = obj.end;
      //this.getChargeList(this.accountCharge);
    },
    changeDate(start, end) {
      this.accountCharge.startTime = start;
      this.accountCharge.finishTime = end;
    },
    callPage(obj) {
      this.accountCharge.currentPage = obj.currentPage;
      this.accountCharge.pageLimit = obj.pageLimit;
      this.getChargeList(this.accountCharge);
    }
  },
  watch: {
    m_huikuan: function() {
      this.defaultDrawType = this.m_huikuan[0].value;
      this.accountCharge.drawType = this.m_huikuan[0].value;
      //this.getChargeList(this.accountCharge);
    }
  },
  computed: {
    ...mapGetters({
      m_huikuan: "m_huikuan",
      set_defaultPageLimit: "set_defaultPageLimit",
      m_chongzhi_check_status: "m_chongzhi_check_status",
      m_chongzhi_status: "m_chongzhi_status",
      m_groupUserName_forLink: "m_groupUserName_forLink",
      m_date_forLink: "m_date_forLink"
    })
  },
  components: {
    Select,
    Option,
    NewDatePicker,
    PageOption,
    LookBetDetail,
    DateOptionSelect,
    HeaderNav
  }
};
</script>
<style lang='sass' scoped>
.lookDetail_content
	color: #499CF6
	cursor: pointer
	&:hover
		text-decoration: underline
.nofound
	background: #eee url(../nofound.png) no-repeat center;
</style>
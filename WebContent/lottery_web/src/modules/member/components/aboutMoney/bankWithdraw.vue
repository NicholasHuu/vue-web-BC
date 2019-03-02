<template>
  <div class="bank-withdraw">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>操作类型:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultDrawType"
              @change="accountWithdraw.drawType = defaultDrawType;"
              placeholder="请选择"
            >
              <Option
                v-for="item in m_withdraw"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <!--<li><span>审核状态:&nbsp;&nbsp;</span>
					<div class="disin">
						<Select v-model="defaultCheckStatus" @change="accountWithdraw.checkStatus = defaultCheckStatus;" placeholder="请选择">
						    <Option v-for="item in m_qukuan_check_status" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</div>
        </li>-->
        <li>
          <span>提现状态:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultDrawStatus"
              @change="accountWithdraw.drawStatus = defaultDrawStatus;"
              placeholder="请选择"
            >
              <Option
                v-for="item in m_qukuan_status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span>用户名:&nbsp;&nbsp;</span>
          <input class="user-name" type="text" v-model.trim="accountWithdraw.account">
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
          <span>提现时间:&nbsp;&nbsp;</span>
          <DateOptionSelect
            @ChangeDateValue="changeDate"
            @runDateOption="runDateOption"
            :setDefault="setDefault"
          ></DateOptionSelect>
        </li>
        <li>
          <span
            class="btn-search"
            @click="accountWithdraw.currentPage = 1;getWithdrawList(accountWithdraw);"
          >搜 索</span>
        </li>
      </ul>
    </div>
    <div class="record-list" :class="{nofound: !list.length}">
      <table>
        <thead>
          <tr>
            <!-- <td>账变用户</td> -->
            <td width="110">操作类型</td>
            <td width="170">订单号</td>
            <td width="170">订单时间</td>
            <td width="170">审核时间</td>
            <td width="130">金额</td>
            <td width="170">备注</td>
            <td>状态</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <!-- <td>{{item.userName}}</td> -->
            <!-- <td>{{item.drawType == 11 ? "会员取款" : "系统扣款"}}</td> -->
            <td>{{item.drawType}}</td>
            <td>{{item.drawOrder}}</td>
            <td>{{item.drawTime.substring(0,item.drawTime.length-3)}}</td>
            <td>{{item.checkTime.substring(0,item.drawTime.length-3)}}</td>
            <td style="color: #f33;">{{item.drawMoney}}</td>
            <td class="bet_content" v-if="item.remark.length > 8">
              {{item.remark.substr(0,8)}}...
              <span
                class="lookDetail_content"
                @click="f_lookRemarkDetail(item.remark,'lookRemarkDetail')"
              >详情</span>
            </td>
            <td class="bet_content" v-else>{{item.remark}}</td>
            <td>{{item.checkStatus}}({{item.drawStatus}})</td>
          </tr>
          <tr v-show="list.length">
            <td colspan="4">汇总小结</td>
            <td style="color: #f33;">{{count_sum.betSum_val}}</td>
            <td colspan="2"></td>
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
        :curPage="accountWithdraw.currentPage"
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
import { m_account_draw } from "api/member/memberApi";
import { mapGetters, mapMutations } from "vuex";
import {
  defaultDateSet,
  countArrSum,
  messageOption,
  getDateDruing
} from "../toolFunction";
import DateOptionSelect from "../dateOptionSelect";
import LookBetDetail from "../lookBetDetail";
export default {
  name: "bankWithdraw",
  data() {
    return {
      listlist: ["提现记录"],
      accountWithdraw: {
        startTime: "",
        finishTime: "",
        drawType: "",
        currentPage: 1,
        pageLimit: 0,
        drawStatus: "",
        checkStatus: "",
        flag: 0
      },
      totalNumber: 0,
      totalPage: 0,
      list: [],
      defaultDrawType: "",
      defaultDrawStatus: "",
      defaultCheckStatus: "",

      count_sum: {
        betSum: [],
        betSum_val: 0
      },

      lookBetDetail: "",
      slotActive_betDetail: "",

      setDefault: {},
      status: ""
    };
  },
  created() {
    this.accountWithdraw.pageLimit = this.set_defaultPageLimit;
    this.accountWithdraw.account = this.m_groupUserName_forLink
      ? this.m_groupUserName_forLink
      : "";
    this.defaultDrawType = this.m_withdraw[0].value;
    this.accountWithdraw.drawType = this.m_withdraw[0].value;

    this.__init();
  },
  methods: {
    __init() {
      if (Object.keys(this.m_date_forLink).length != 0) {
        this.setDefault = this.m_date_forLink;
        this.accountWithdraw.startTime = this.m_date_forLink.start;
        this.accountWithdraw.finishTime = this.m_date_forLink.end;
      } else {
        let dateChoseList = getDateDruing();
        let defaultDateVar = dateChoseList["today"];
        this.accountWithdraw.startTime = defaultDateVar.start;
        this.accountWithdraw.finishTime = defaultDateVar.end;
        this.getWithdrawList(this.accountWithdraw);
      }
    },
    getWithdrawList(obj) {
      obj.flag = this.status === "yes" ? 1 : 0;
      m_account_draw(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.list = res.datas.resultList;
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
          this.count_sum.betSum = [];
          for (let i = 0; i < this.list.length; i++) {
            this.count_sum.betSum.push(this.list[i].drawMoney);
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
      this.accountWithdraw.startTime = obj.start;
      this.accountWithdraw.finishTime = obj.end;
      //this.getWithdrawList(this.accountWithdraw);
    },
    changeDate(start, end) {
      this.accountWithdraw.startTime = start;
      this.accountWithdraw.finishTime = end;
    },
    callPage(obj) {
      this.accountWithdraw.currentPage = obj.currentPage;
      this.accountWithdraw.pageLimit = obj.pageLimit;
      this.getWithdrawList(this.accountWithdraw);
    }
  },
  computed: {
    ...mapGetters({
      m_withdraw: "m_withdraw",
      set_defaultPageLimit: "set_defaultPageLimit",
      m_qukuan_check_status: "m_qukuan_check_status",
      m_qukuan_status: "m_qukuan_status",
      m_groupUserName_forLink: "m_groupUserName_forLink",
      m_date_forLink: "m_date_forLink"
    })
  },
  components: {
    Select,
    Option,
    NewDatePicker,
    PageOption,
    DateOptionSelect,
    LookBetDetail,
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
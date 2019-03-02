<template>
  <div class="transfer-record">
    <HeaderNav :data="listlist" :currentIndex="curIndex"></HeaderNav>
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>所属厅:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultLotteryValue"
              @change="accountTransfer.flat = defaultLotteryValue;accountTransfer.currentPage = 1;getTransferList(accountTransfer)"
              placeholder="请选择"
            >
              <Option
                v-for="item in m_otherGameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span>转换时间:&nbsp;&nbsp;</span>
          <DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption"></DateOptionSelect>
        </li>
        <li>
          <span>转换类型:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultEduType"
              @change="accountTransfer.eduType = defaultEduType;"
              placeholder="请选择"
            >
              <Option
                v-for="item in eduTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></Option>
            </Select>
          </div>
        </li>
        <li>
          <span
            class="btn-search"
            @click="accountTransfer.currentPage = 1;getTransferList(accountTransfer);"
          >搜 索</span>
        </li>
      </ul>
    </div>

    <div class="record-list" :class="{nofound: !list.length}">
      <table>
        <thead>
          <tr>
            <td>用户名</td>
            <td>编号</td>
            <td>类型</td>
            <td>时间</td>
            <td>金额</td>
            <td>备注</td>
            <td>状态</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{item.userName}}</td>
            <td>{{item.eduOrder}}</td>
            <td>{{item.eduType}}</td>
            <td>{{item.enduTime}}</td>
            <td :class="['income',{pay:item.eduMoney <= 0}]">{{item.eduMoney}}</td>
            <td>{{item.remark}}</td>
            <!-- <td>{{item.status}}</td> -->
            <td>{{item.statusRemark}}</td>
            <!-- statusRemark 状态值,用于判断 -->
          </tr>

          <tr v-show="list.length">
            <td colspan="4">汇总小结</td>
            <td :class="['income',{pay:count_sum.betSum_val <= 0}]">{{count_sum.betSum_val}}</td>
            <td colspan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pageSwitch">
      <PageOption
        :totalNumber="totalNumber"
        :totalPage="totalPage"
        :curPage="accountTransfer.currentPage"
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
import {
  m_account_transfers,
  otherGameList,
  m_account_exchange
} from "api/member/memberApi";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { defaultDateSet, countArrSum } from "../toolFunction";
import { messageOption } from "../toolFunction";
import DateOptionSelect from "../dateOptionSelect";
export default {
  name: "transferRecord",
  data() {
    return {
      listlist: ["转换记录"],
      curIndex: 0,
      defaultDateVar: {},
      accountTransfer: {
        startTime: "",
        finishTime: "",
        flat: "",
        eduType: "",
        currentPage: 1,
        pageLimit: 10
      },
      eduTypeList: [
        {
          value: "",
          label: "选择全部"
        },
        {
          value: 1,
          label: "转出"
        },
        {
          value: 2,
          label: "转入"
        }
      ],
      defaultEduType: "",
      defaultLotteryValue: "",

      totalNumber: 0,
      totalPage: 0,
      list: [],

      count_sum: {
        betSum: [],
        betSum_val: 0
      }
    };
  },
  created() {
    this.accountTransfer.pageLimit = this.set_defaultPageLimit;
    this.defaultDateVar = defaultDateSet();
    this.accountTransfer.startTime = this.defaultDateVar.start;
    this.accountTransfer.finishTime = this.defaultDateVar.end;
    this.defaultLotteryValue = this.m_otherGameList[0].value;
    this.accountTransfer.flat = this.m_otherGameList[0].value;
    this.getTransferList(this.accountTransfer);
  },
  methods: {
    getTransferList(obj) {
      m_account_transfers(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.list = res.datas.resultList;
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
          this.count_sum.betSum = [];
          for (let i = 0; i < this.list.length; i++) {
            this.count_sum.betSum.push(this.list[i].eduMoney);
          }
          this.count_sum.betSum_val = countArrSum(this.count_sum.betSum);
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    changeDate(start, end) {
      this.accountTransfer.startTime = start;
      this.accountTransfer.finishTime = end;
    },
    runDateOption(obj) {
      this.accountTransfer.startTime = obj.start;
      this.accountTransfer.finishTime = obj.end;
    },
    callPage(obj) {
      this.accountTransfer.currentPage = obj.currentPage;
      this.accountTransfer.pageLimit = obj.pageLimit;
      this.getTransferList(this.accountTransfer);
    }
  },
  watch: {
    m_otherGameList(to, from) {
      this.defaultLotteryValue = this.m_otherGameList[0].value;
      this.accountTransfer.flat = this.m_otherGameList[0].value;
      this.getTransferList(this.accountTransfer);
    }
  },
  components: {
    Select,
    Option,
    DateOptionSelect,
    PageOption,
    HeaderNav
  },
  computed: {
    ...mapGetters({
      m_otherGameList: "m_otherGameList_setAll",
      set_defaultPageLimit: "set_defaultPageLimit"
    })
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
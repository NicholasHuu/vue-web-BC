<template>
  <div class="other-game">
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>所属厅:&nbsp;&nbsp;</span>
          <div class="disin">
            <Select
              v-model="defaultLotteryValue"
              @change="otherGameList.flat = defaultLotteryValue;otherGameList.currentPage = 1;getOtherGameList(otherGameList)"
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
          <span>投注时间:&nbsp;&nbsp;</span>
          <DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption"></DateOptionSelect>
        </li>
        <li>
          <span
            class="btn-search"
            @click="otherGameList.currentPage = 1;getOtherGameList(otherGameList)"
          >搜 索</span>
        </li>
      </ul>
    </div>
    <div class="record-list" :class="{nofound: !recordList.length}">
      <table>
        <thead>
          <tr>
            <td width="100">用户</td>
            <td width="140">订单号</td>
            <td>游戏内容</td>
            <td width="150">投注时间</td>
            <td width="110">投注金额</td>
            <td width="110">中奖金额</td>
            <td width="110">返水金额</td>
            <td width="50">状态</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="recordList.length" v-for="(item,index) in recordList" :key="index">
            <td>{{item.userName}}</td>
            <td>{{item.gameOrder}}</td>
            <td>{{item.gameContent}}</td>
            <td>{{item.betTime}}</td>
            <td>{{item.betInMoney}}</td>
            <td :class="['income',{pay:item.winMoney <= 0}]">{{item.winMoney}}</td>
            <!-- 正数绿色  负数、0红色 -->
            <td>{{item.backWaterMoney}}</td>
            <td>{{item.winStatus}}</td>
          </tr>
          <tr v-show="recordList.length">
            <td colspan="4">汇总小结</td>
            <td>{{count_sum.betSum_val}}</td>
            <td :class="['income',{pay:count_sum.winSum_val <= 0}]">{{count_sum.winSum_val}}</td>
            <td>{{count_sum.backSum_val}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pageSwitch">
      <PageOption
        :totalNumber="totalNumber"
        :totalPage="totalPage"
        :curPage="otherGameList.currentPage"
        @callPage="callPage"
      ></PageOption>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import PageOption from "../pageOption";
import { countArrSum, defaultDateSet, messageOption } from "../toolFunction";
import { otherGameRecordList } from "api/member/memberApi";
import { ERR_OK } from "api/config";
import DateOptionSelect from "../dateOptionSelect";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "otherGame",
  data() {
    return {
      defaultDateVar: {},
      defaultLotteryValue: "",
      otherGameList: {
        startTime: "",
        finishTime: "",
        flat: "",
        currentPage: 1,
        pageLimit: 0
      },
      count_sum: {
        betSum: [],
        winSum: [],
        backSum: [],
        betSum_val: 0,
        winSum_val: 0,
        backSum_val: 0
      },
      totalPage: 0,
      totalNumber: 0
    };
  },
  created() {
    this.otherGameList.pageLimit = this.set_defaultPageLimit;
    this.defaultDateVar = defaultDateSet();
    this.otherGameList.startTime = this.defaultDateVar.start;
    this.otherGameList.finishTime = this.defaultDateVar.end;
    this.defaultLotteryValue = this.m_otherGameList[0].value;
    this.otherGameList.flat = this.m_otherGameList[0].value;
    this.getOtherGameList(this.otherGameList);
  },
  methods: {
    getOtherGameList(obj) {
      otherGameRecordList(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
          (this.count_sum.betSum = []), (this.count_sum.winSum = []);
          for (let i = 0; i < res.datas.resultList.length; i++) {
            this.count_sum.betSum.push(res.datas.resultList[i].betMoney);
            this.count_sum.winSum.push(res.datas.resultList[i].winMoney);
            this.count_sum.backSum.push(res.datas.resultList[i].backWaterMoney);
          }
          this.setOtherGameRecordList(res.datas.resultList);
          this.count_sum.betSum_val = countArrSum(this.count_sum.betSum);
          this.count_sum.winSum_val = countArrSum(this.count_sum.winSum);
          this.count_sum.backSum_val = countArrSum(this.count_sum.backSum);
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    changeDate(start, end) {
      this.otherGameList.startTime = start;
      this.otherGameList.finishTime = end;
    },
    runDateOption(obj) {
      this.otherGameList.startTime = obj.start;
      this.otherGameList.finishTime = obj.end;
    },
    callPage(obj) {
      this.otherGameList.currentPage = obj.currentPage;
      this.otherGameList.pageLimit = obj.pageLimit;
      this.getOtherGameList(this.otherGameList);
    },
    ...mapMutations({
      setOtherGameRecordList: "m_otherGameRecordList"
    })
  },
  watch: {
    m_otherGameList(to, from) {
      this.defaultLotteryValue = this.m_otherGameList[0].value;
      this.otherGameList.flat = this.m_otherGameList[0].value;
      this.getOtherGameList(this.otherGameList);
    }
  },
  components: {
    Select,
    Option,
    DateOptionSelect,
    PageOption
  },
  computed: {
    ...mapGetters({
      m_otherGameList: "m_otherGameList",
      recordList: "m_otherGameRecordList",
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
.prizeColor
	color: #f12	!important
</style>
<template>
  <div class="zhuihao-record">
    <HeaderNav :data="list" :currentIndex="curIndex"></HeaderNav>
    <div class="page-one">
      <div class="select-zone">
        <ul class="clearfix">
          <li>
            <span>彩种:&nbsp;&nbsp;</span>
            <div class="disin">
              <Select
                v-model="defaultLotteryValue"
                @change="searchZhuihao.lotteryCode = defaultLotteryValue;searchZhuihao.gameCode='';defaultGameCode = '';m_setPlayOption(defaultLotteryValue);searchZhuihao.currentPage = 1;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in lotteryAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <span>玩法:&nbsp;&nbsp;</span>
            <div class="disin">
              <Select
                v-model="defaultGameCode"
                @change="searchZhuihao.gameCode = defaultGameCode;searchZhuihao.currentPage = 1;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in listState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <!--<li><span>玩法:&nbsp;&nbsp;</span>
						<div class="playOptionBtn btn" @click="showPlayOption">选择玩法</div>
          </li>-->
          <li>
            <span>状态:&nbsp;&nbsp;</span>
            <div class="disin">
              <Select
                v-model="defaultOrderStatus"
                @change="searchZhuihao.status = defaultOrderStatus;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in m_append_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <span>用户名:&nbsp;&nbsp;</span>
            <input class="user-name" v-model.trim="searchZhuihao.account" type="text" value>
          </li>
          <li>
            <input
              type="checkbox"
              v-model="status"
              true-value="yes"
              false-value="no"
              id="zhuiContain"
            >
            <label for="zhuiContain" class="lineheight-style">包含下级</label>
          </li>
          <li>
            <span>投注时间:&nbsp;&nbsp;</span>
            <DateOptionSelect @ChangeDateValue="changeDate" @runDateOption="runDateOption"></DateOptionSelect>
          </li>
          <li>
            <span
              class="btn-search"
              @click="searchZhuihao.currentPage = 1;getZhuihaoLRecord(searchZhuihao)"
            >搜 索</span>
          </li>
        </ul>
      </div>
      <div class="record-list" :class="{nofound: !zhuihaoList.length}">
        <table>
          <thead>
            <tr>
              <td width="120">用户名</td>
              <td width="90">彩种</td>
              <td width="100">玩法</td>
              <td width="140">起始期号</td>
              <td width="160">追号时间</td>
              <td width="140">已追期数/总期数</td>
              <td width="160">已追金额/中奖金额</td>
              <td width="80">追中即停</td>
              <td width="60">状态</td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="btn"
              v-show="zhuihaoList.length"
              v-for="(item,index) in zhuihaoList"
              :key="index"
              @click="lookDetail(item.orderNumber,item.ordreId)"
            >
              <td>{{item.userName}}</td>
              <td>{{item.lotteryName}}</td>
              <td>{{item.gameName}}</td>
              <td>{{item.startTraceQishu}}</td>
              <td>{{item.startTraceTime.substring(0,item.startTraceTime.length-3)}}</td>
              <td>{{item.traceCountRate}}</td>
              <td>{{item.traceMoney}}/{{item.betWinMoney}}</td>
              <td>{{item.traceWinStop}}</td>
              <td>{{item.status}}</td>
              <!-- <td width="50" class="member-btn-color" @click="lookDetail(item.orderNumber,item.ordreId)">查看</td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pageSwitch">
        <PageOption
          :totalNumber="totalNumber"
          :totalPage="totalPage"
          :curPage="searchZhuihao.currentPage"
          @callPage="callPage"
        ></PageOption>
      </div>
    </div>

    <AppendDetailPopup
      v-if="popupStaus"
      :m_zhuihaoDetail="m_zhuihaoDetail"
      @listReload="listReload"
      @detailReload="detailReload"
      @closePopup="closePopup"
    />

    <PlayOption
      v-if="playOptionStatus"
      :lotteryCode="searchZhuihao.lotteryCode"
      @closePlayOptionPopup="closePlayOptionPopup"
      @choseResult="choseResult"
    ></PlayOption>
  </div>
</template>
<script>
import HeaderNav from "../headerNav";
import { Select, Option } from "element-ui";
import NewDatePicker from "../newDatePicker";
import PageOption from "../pageOption";
import {
  lotteryAppendList,
  lotteryAppendDetail,
  getLotteryBetDetail
} from "api/member/memberApi";
import { ERR_OK } from "api/config";
import { mapGetters, mapMutations } from "vuex";
import AppendDetailPopup from "./detailPopup/appendDetailPopup.vue";
import { defaultDateSet, messageOption, getDateDruing } from "../toolFunction";
import DateOptionSelect from "../dateOptionSelect";
import PlayOption from "../playOption";
export default {
  name: "zhuihaoRecord",
  data() {
    return {
      popupStaus: false,
      appendListDetail: {},
      defaultLotteryValue: "",
      searchZhuihao: {
        lotteryCode: "",
        startTime: "",
        finishTime: "",
        account: "",
        flag: 0,
        currentPage: 1,
        pageLimit: 0,
        status: "",
        gameCode: ""
      },
      status: "",
      totalPage: 0,
      totalNumber: 0,

      orderNumber: "",
      orderId: "",

      defaultGameCode: "",
      defaultOrderStatus: "",
      playOptionStatus: false,
      curIndex: 0,
      list: ["追号记录"]
    };
  },
  created() {
    this.searchZhuihao.pageLimit = this.set_defaultPageLimit;

    this.defaultLotteryValue = this.lotteryAll[0].value;
    this.searchZhuihao.lotteryCode = this.lotteryAll[0].value;
    this.__init();
  },
  beforeDestroy() {
    this.m_setPlayOption("");
  },
  methods: {
    __init() {
      let dateChoseList = getDateDruing();
      let defaultDateVar = dateChoseList["today"];
      this.searchZhuihao.startTime = defaultDateVar.start;
      this.searchZhuihao.finishTime = defaultDateVar.end;
      this.getZhuihaoLRecord(this.searchZhuihao);
    },
    //   关闭追号弹窗
    closePopup() {
      this.popupStaus = false;
    },
    listReload() {
      this.searchZhuihao.account = "";
      this.getZhuihaoLRecord(this.searchZhuihao);
    },
    getZhuihaoLRecord(obj) {
      if (
        this.searchZhuihao.account != "" &&
        !/^[A-Za-z][A-Za-z0-9]{4,12}$/.test(this.searchZhuihao.account)
      ) {
        this.searchZhuihao.account = "";
        this.$message(messageOption("您输入的账户格式不正确！"));
        return;
      }
      obj.flag = this.status === "yes" ? 1 : 0;
      lotteryAppendList(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.setZhaohaoList(res.datas.resultList);
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    //玩法操作
    choseResult(str) {
      this.searchZhuihao.gameCode = str;
      this.playOptionStatus = false;
      //this.getZhuihaoLRecord(this.searchZhuihao);
    },
    showPlayOption() {
      this.playOptionStatus = true;
    },
    closePlayOptionPopup() {
      this.playOptionStatus = false;
    },
    runDateOption(obj) {
      this.searchZhuihao.startTime = obj.start;
      this.searchZhuihao.finishTime = obj.end;
      //this.getZhuihaoLRecord(this.searchZhuihao);
    },
    changeDate(start, end) {
      this.searchZhuihao.startTime = start;
      this.searchZhuihao.finishTime = end;
    },
    callPage(obj) {
      this.searchZhuihao.currentPage = obj.currentPage;
      this.searchZhuihao.pageLimit = obj.pageLimit;
      this.getZhuihaoLRecord(this.searchZhuihao);
    },
    detailReload() {
      this.lookDetail(this.orderNumber, this.orderId);
    },
    lookDetail(orderNumber, orderId) {
      this.orderNumber = orderNumber;
      this.orderId = orderId;
      lotteryAppendDetail(orderNumber, orderId).then(res => {
        if (res.errorCode == ERR_OK) {
          this.setAppendDetail(res.datas);
          this.popupStaus = !this.popupStaus;
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    lookAppendDetail(id) {
      getLotteryBetDetail(id).then(res => {
        if (res.errorCode == ERR_OK) {
          this.appendListDetail = res.datas;
          this.popupStaus = !this.popupStaus;
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    ...mapMutations({
      setZhaohaoList: "m_zhuihaoRecordList",
      setAppendDetail: "m_zhuihaoDetail",
      m_setPlayOption: "m_setPlayOption"
    })
  },
  components: {
    Select,
    Option,
    NewDatePicker,
    PageOption,
    AppendDetailPopup,
    DateOptionSelect,
    PlayOption,
    HeaderNav
  },
  computed: {
    ...mapGetters({
      zhuihaoList: "m_zhuihaoRecordList",
      m_zhuihaoDetail: "m_zhuihaoDetail",
      lotteryAll: "m_lottery_menu_list",
      set_defaultPageLimit: "set_defaultPageLimit",
      m_append_status: "m_append_status",
      listState: "m_setPlayOption"
    })
  }
};
</script>
<style lang='sass' scoped>
.nofound
	background: #eee url(../nofound.png) no-repeat center;
</style>
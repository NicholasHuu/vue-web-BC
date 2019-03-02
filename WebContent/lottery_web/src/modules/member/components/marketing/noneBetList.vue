<template>
  <div class="memberList">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="select-zone">
      <ul class="clearfix">
        <li>
          <span>未投注时间:&nbsp;&nbsp;</span>
          <DateOptionSelect
            @ChangeDateValue="changeDate"
            @runDateOption="runDateOption"
            :pageType="pageType"
          ></DateOptionSelect>
        </li>
        <li>
          <span class="btn-search" @click="searchList.currentPage = 1;getAllList(searchList)">搜 索</span>
        </li>
      </ul>
    </div>
    <div class="record-list" :class="{nofound: !list.length}">
      <table>
        <thead>
          <tr>
            <td width="100">用户名</td>
            <td width="100">姓名</td>
            <td width="100">余额</td>
            <td width="100">会员类型</td>
            <td width="100">上级代理</td>
            <td width="100">充值总额</td>
            <td width="100">提款总额</td>
            <td width="100">登录设备类型</td>
            <td width="100">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{item.userName}}</td>
            <td>{{item.userRealName}}</td>
            <td>{{item.userMoney}}</td>
            <td>{{item.userType}}</td>
            <td>{{item.userAgent}}</td>
            <td>{{item.ownDepositAmount}}</td>
            <td>{{item.ownWithdrawAmount}}</td>
            <td>{{item.loginDevice}}</td>
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
        :curPage="searchList.currentPage"
        @callPage="callPage"
      ></PageOption>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../headerNav";
import NewDatePicker from "../newDatePicker";
import PageOption from "../pageOption";
import { m_marketing_nobetList } from "api/member/memberApi";
import { messageOption, getDateDruing } from "../toolFunction";
import { ERR_OK } from "api/config";
import { mapGetters, mapMutations, mapActions } from "vuex";
import DateOptionSelect from "../dateOptionSelect";
export default {
  name: "memberList",
  data() {
    return {
      listlist: ["未投注会员"],
      searchList: {
        currentPage: 1,
        pageLimit: 10,
        startTime: "",
        finishTime: ""
      },
      totalPage: 0,
      totalNumber: 0,
      list: [],

      pageType: "noneBetList"
    };
  },
  created() {
    this.searchList.pageLimit = this.set_defaultPageLimit;
    let dateChoseList = getDateDruing("zone", this.m_dateChoseList);
    let defaultDateVar = dateChoseList["date_1"];
    this.searchList.startTime = defaultDateVar.start;
    console.log(this.m_internalLinkList);
    this.getAllList(this.searchList);
  },
  methods: {
    getAllList(obj) {
      m_marketing_nobetList(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.list = res.datas.resultList;
          this.totalNumber = res.datas.totalRows * 1;
          this.totalPage = res.datas.totalPages * 1;
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    linkToRecord(userName, type, link) {
      this.m_groupUserName_forLink(userName);
      let date = {
        start: this.searchList.startTime,
        end: this.searchList.finishTime
      };
      //this.m_date_forLink(date);
      this.$router.push(link);
    },
    changeDate(start, end) {
      this.searchList.startTime = start;
      this.searchList.finishTime = end;
    },
    runDateOption(obj) {
      this.searchList.startTime = obj.start;
      this.searchList.finishTime = obj.end;
    },
    callPage(obj) {
      this.searchList.currentPage = obj.currentPage;
      this.searchList.pageLimit = obj.pageLimit;
      this.getAllList(this.searchList);
    },
    ...mapMutations({
      m_groupUserName_forLink: "m_groupUserName_forLink",
      m_date_forLink: "m_date_forLink"
    })
  },
  computed: {
    ...mapGetters({
      set_defaultPageLimit: "set_defaultPageLimit",
      m_dateChoseList: "m_dateChoseList",
      m_internalLinkList: "m_internalLinkList"
    })
  },
  components: {
    PageOption,
    DateOptionSelect,
    HeaderNav
  }
};
</script>
<style lang='sass' scoped>
.record-list,.pageSwitch
	background: #fff
	padding: 0 20px 20px
	
.nofound
	background: #eee url(../nofound.png) no-repeat center
</style>
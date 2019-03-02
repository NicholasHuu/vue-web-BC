<template>
  <div class="memberList">
    <HeaderNav :data="exchangeTitle"></HeaderNav>
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
import { m_marketing_onlineList } from "api/member/memberApi";
import { messageOption } from "../toolFunction";
import { ERR_OK } from "api/config";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "memberList",
  data() {
    return {
      exchangeTitle: ["在线会员列表"],
      searchList: {
        currentPage: 1,
        pageLimit: 10
      },

      totalPage: 0,
      totalNumber: 0,
      list: []
    };
  },
  created() {
    this.searchList.pageLimit = this.set_defaultPageLimit;
    this.getAllList(this.searchList);
  },
  methods: {
    getAllList(obj) {
      m_marketing_onlineList(obj).then(res => {
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
      this.$router.push(link);
    },
    callPage(obj) {
      this.searchList.currentPage = obj.currentPage;
      this.searchList.pageLimit = obj.pageLimit;
      this.getAllList(this.searchList);
    },
    ...mapMutations({
      m_groupUserName_forLink: "m_groupUserName_forLink"
    })
  },
  computed: {
    ...mapGetters({
      set_defaultPageLimit: "set_defaultPageLimit",
      m_internalLinkList: "m_internalLinkList"
    })
  },
  components: {
    PageOption,
    HeaderNav
  }
};
</script>
<style lang='sass' scoped>
.record-list,.pageSwitch
	background: #fff
	
.nofound
	background: #fff url(../nofound.png) no-repeat center
</style>
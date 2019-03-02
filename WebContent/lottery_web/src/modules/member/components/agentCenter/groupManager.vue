<template>
  <div class="group-manager">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="page-one" v-if="pageStatus">
      <div class="select-zone">
        <ul class="clearfix">
          <li>
            <span>用户名:&nbsp;&nbsp;</span>
            <input class="chromeInputClearAuto">
            <input
              autocomplete="off"
              class="user-name"
              type="text"
              v-model.trim="groupManage.account"
            >
          </li>
          <li>
            <span>用户余额:&nbsp;&nbsp;</span>
            <input class="user-name" type="number" v-model.trim="groupManage.minMoney"> -
            <input class="user-name" type="number" v-model.trim="groupManage.maxMoney">
          </li>
          <li>
            <span>用户组:&nbsp;&nbsp;</span>
            <div class="disin">
              <Select
                v-model="defaultIsAgent"
                @change="groupManage.isAgent = defaultIsAgent;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in m_user_type_check"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <span>在线状态:&nbsp;&nbsp;</span>
            <div class="disin">
              <Select
                v-model="defaultLoginStatus"
                @change="groupManage.loginStatus = defaultLoginStatus;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in loginStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <span class="btn-search" @click="groupManage.currentPage = 1;searchBtn(groupManage)">搜 索</span>
          </li>
          <li>
            <span class="btn-search" @click="salaryManage('')">日薪管理</span>
          </li>
        </ul>
      </div>

      <div class="record-list" :class="{nofound: !list.length}">
        <div class="userLocation">
          <span>当前用户位置：</span>
          <span class="front" @click="frontSearch">{{m_memberInfo.userName}}</span>
          <div style="display: inline-block;">
            <span
              v-for="(item,index) in dynamicUserName"
              :key="index"
              class="cursor"
              @click="locationSearch(item)"
            >&#62; {{item}}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td width="100">用户名</td>
              <td width="50">用户组</td>
              <td width="60" class="cursor" @click="sortList('betBack',currentSortType)">
                返点
                <span v-show="arrowStatus == 'betBack'">{{!currentSortType ? "&or;" : "&and;"}}</span>
              </td>
              <td width="70" class="cursor" @click="sortList('teamCount',currentSortType)">
                团队人数
                <span
                  v-show="arrowStatus == 'teamCount'"
                >{{!currentSortType ? "&or;" : "&and;"}}</span>
              </td>
              <td width="100" class="cursor" @click="sortList('userMoney',currentSortType)">
                余额
                <span v-show="arrowStatus == 'userMoney'">{{!currentSortType ? "&or;" : "&and;"}}</span>
              </td>
              <td width="100" class="cursor" @click="sortList('teamMoney',currentSortType)">
                团队余额
                <span
                  v-show="arrowStatus == 'teamMoney'"
                >{{!currentSortType ? "&or;" : "&and;"}}</span>
              </td>
              <td width="120" class="cursor" @click="sortList('createTime',currentSortType)">
                注册时间
                <span
                  v-show="arrowStatus == 'createTime'"
                >{{!currentSortType ? "&or;" : "&and;"}}</span>
              </td>
              <td width="120">最后登录时间</td>
              <td width="100">最后登录地址</td>
              <td width="60">日薪信息</td>
              <td>备注</td>
              <td width="70">操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td>
                <div class="userNameTd">
                  <i class="online-icon" :class="{'active' : item.onLineStatus == 1 }"></i>
                  <span
                    v-if="item.userType == '代理'"
                    class="btn"
                    style="color: #C12727;"
                    @click="tableUserSearch(item.userName)"
                  >{{item.userName}}</span>
                  <span v-else>{{item.userName}}</span>
                </div>
              </td>
              <td>{{item.userType}}</td>
              <td>{{item.betBack}}%</td>
              <td>{{item.teamCount}}</td>
              <td>{{item.userMoney}}</td>
              <td>{{item.teamMoney}}</td>
              <td>{{item.createTime.substr(0,item.createTime.length - 3)}}</td>
              <td>{{item.lastLoginTime.substr(0,item.createTime.length - 3)}}</td>
              <td>{{item.lastLoginIp}}</td>

              <td class="operationLists" v-if="item.salaryFlag == 1">
                <span v-if="item.operateFlag != 0" class="btn" @click="salaryManage(item.userName)">
                  <u>查看</u>
                </span>
                <!-- 每<u class="btn" @click="salaryManage(item.userName)">10000</u>返{{parseFloat(item.salaryMoney).toFixed(2)}} -->
              </td>
              <td class="operationLists" v-else>
                <span
                  v-if="item.operateFlag != 0"
                  class="btn"
                  @click="addSalaryInfo(item.userName)"
                >添加</span>
              </td>

              <td v-if="item.remark != '' " class="bet_content">
                <div v-if="item.operateFlag != 0">
                  <div
                    class="btn"
                    v-if="item.remark.length > 6"
                    @click="lookDetail(item.remark)"
                  >{{item.remark.substr(0,6)}}...</div>
                  <div v-else>
                    <span>{{item.remark}}</span>
                  </div>
                </div>
              </td>

              <td v-if="item.remark == ''">
                <span
                  v-if="item.operateFlag != 0"
                  class="cursor btn addRemark"
                  @click="proupsSlot(item,'addRemark')"
                >添加备注</span>
                <span v-else></span>
              </td>
              <td class="operationLists">
                <span class="cursor btn">操作</span>
                <div class="operationList">
                  <ul>
                    <li @click="linkRecord(item.userName)">投注记录</li>
                    <li @click="linkLotteryAccount(item.userName)">彩票账变</li>
                    <li v-if="item.operateFlag != 0" @click="proupsSlot(item,'siteMessage')">站内信</li>
                    <li v-if="item.operateFlag != 0" @click="proupsSlot(item,'setBackMoney')">返点调配</li>
                    <li v-if="item.operateFlag != 0" @click="salaryManage(item.userName)">日薪管理</li>

                    <li v-if="item.operateFlag != 0" @click="linkTransfer(item.userName)">下级转账</li>
                    <li
                      v-if="item.remark != '' && item.operateFlag != 0"
                      @click="proupsSlot(item,'addRemark')"
                    >修改备注</li>
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
          :curPage="groupManage.currentPage"
          @callPage="callPage"
        ></PageOption>
      </div>

      <!-- 几个弹窗组合具名插槽组 -->
      <div class="proups" v-if="slotActive != ''">
        <SlotCommon
          v-if="slotActive == 'addRemark'"
          :currentStyle="slotActive"
          @proupsClose="proupsClose"
        >
          <h1 slot="header">添加备注</h1>
          <div class="main">
            <div class="item clearfix">
              <div class="left">用户:</div>
              <div class="right">
                <input type="text" disabled v-model="remarkBetRequestList.account">
              </div>
            </div>
            <div class="item clearfix">
              <div class="left">备注:</div>
              <div class="right">
                <textarea
                  name
                  id
                  cols="30"
                  rows="10"
                  v-model="remarkBetRequestList.remark"
                  placeholder="请填写备注（50个字符以内）"
                ></textarea>
              </div>
            </div>
          </div>
          <p slot="footer" @click="addRemarkSubmit">提 交</p>
        </SlotCommon>

        <SlotCommon
          v-if="slotActive == 'setBackMoney'"
          :currentStyle="slotActive"
          @proupsClose="proupsClose"
        >
          <h1 slot="header">快速返点设置</h1>
          <div class="item clearfix">
            <div class="left">用户信息</div>
            <div class="right">
              <p>
                用户名：
                <span>{{remarkBetRequestList.account}}</span>
              </p>
              <p>
                昵称：
                <span>{{remarkBetRequestList.userByName}}</span>
              </p>
              <!--<p>自身返点 <span class="g_color_theme">lottery:{{m_memberInfo.backWater.lottery}}|live:{{m_memberInfo.backWater.live}}|lottery:{{m_memberInfo.backWater.electronic}}|sport:{{m_memberInfo.backWater.sport}}</span></p>  -->
            </div>
          </div>
          <!--<div class="item clearfix">
						<div class="left">调整彩票返点(向上)</div>
						<div class="right">
							<span>设置为：</span>
							<input type="text" class="tc padding0" v-model="remarkBetRequestList.back" /> %
						</div>
          </div>-->
          <div v-for="(item,index) in loopSetBackWater" :key="index" class="item clearfix">
            <div class="left">{{item.title}}</div>
            <div class="right">
              <span>设置为：</span>
              <input type="text" class="tc padding0" v-model="remarkBetRequestList[item.code]"> %
            </div>
          </div>
          <p slot="footer" @click="setBackMoneySubmit">完 成</p>
        </SlotCommon>

        <SlotCommon
          v-if="slotActive == 'siteMessage'"
          :currentStyle="slotActive"
          @proupsClose="proupsClose"
        >
          <h1 slot="header">发送消息</h1>
          <div class="main">
            <div class="item clearfix">
              <div class="left">接收人:</div>
              <div class="right">
                <input type="text" disabled :value="re_msgList.receiver">
              </div>
            </div>
            <div class="item clearfix">
              <div class="left">标题:</div>
              <div class="right">
                <input type="text" v-model="re_msgList.title" placeholder="请输入消息标题，最多20个字符">
              </div>
            </div>
            <div class="item clearfix">
              <div class="left">备注:</div>
              <div class="right">
                <textarea
                  v-model="re_msgList.content"
                  name
                  id
                  cols="30"
                  rows="10"
                  placeholder="请输入消息内容，最多80个字符"
                ></textarea>
              </div>
            </div>
          </div>
          <p slot="footer" @click="siteMessageSend">发 送</p>
        </SlotCommon>
      </div>
    </div>

    <LookBetDetail
      :content="lookBetDetail"
      :slotActive="slotActive_betDetail"
      @closeBetDetail="closeBetDetail"
    ></LookBetDetail>

    <div class="page-two" v-if="!pageStatus">
      <SalaryManage :userName="userName" @back="pageTwoBack" :setIndex="setIndex"></SalaryManage>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import { Select, Option } from "element-ui";
import PageOption from "../pageOption";
import SalaryManage from "./salaryManage/salaryManage";
import SlotCommon from "../slotCommon";
import { ERR_OK } from "api/config";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import {
  m_teamManage,
  m_teamSetBack,
  m_teamAddRemark,
  m_messageAddGroup
} from "api/member/memberApi";
import { compare } from "../toolFunction";
import { messageOption, re_substring } from "../toolFunction";
import { estimateMoneyPsw } from "common/js/utils";
import LookBetDetail from "../lookBetDetail";
export default {
  name: "groupManager",
  data() {
    return {
      listlist: ["团队管理"],
      pageStatus: true, //团队管理和日薪管理状态切换
      //operationListStatus: true,  //当处于一级以下代理时只展示“投注记录”
      totalPage: 0,
      totalNumber: 0,
      dynamicUserName: [], //当前位置用户
      currentSortType: true, //当前排序类型(1为升序，-1为降序)
      arrowStatus: "", //箭头是否显示
      groupManage: {
        //团队管理记录列表请求参数
        account: "",
        minMoney: "",
        maxMoney: "",
        flag: 0,
        currentPage: 1,
        pageLimit: 0,
        isAgent: "",
        loginStatus: ""
      },
      list: [], //团队管理记录列表

      //添加修改备注和返点调配请求参数表
      remarkBetRequestList: {
        id: "",
        account: "",
        remark: "",
        back: "",
        liveBack: "",
        electronicBack: "",
        sportBack: "",
        fishBack: "",
        userByName: "",
        parentBack: ""
      },
      loopSetBackWater: [
        {
          title: "调整彩票返点(向上)",
          code: "back"
        },
        {
          title: "调整真人返点(向上)",
          code: "liveBack"
        },
        {
          title: "调整电子返点(向上)",
          code: "electronicBack"
        },
        {
          title: "调整体育返点(向上)",
          code: "sportBack"
        },
        {
          title: "调整捕鱼返点(向上)",
          code: "fishBack"
        }
      ],
      initialBack: {
        lottery: "",
        live: "",
        electronic: "",
        sport: "",
        fish: ""
      },
      //团队方案配置

      defaultIsAgent: "",
      defaultLoginStatus: "",
      loginStatusList: [
        {
          label: "选择全部",
          value: ""
        },
        {
          label: "在线用户",
          value: 1
        },
        {
          label: "离线用户",
          value: 0
        }
      ],
      //日薪管理传参
      userName: "",

      //插槽选项
      slotActive: "",

      //发送站内信参数
      re_msgList: {
        type: 1,
        title: "",
        receiver: "",
        content: ""
      },

      lookBetDetail: "",
      slotActive_betDetail: "",
      popupStaus: false,

      setIndex: 1
    };
  },
  created() {
    this.groupManage.account = "";
    this.groupManage.pageLimit = this.set_defaultPageLimit;
    this.getTeamManage(this.groupManage);
  },
  methods: {
    searchBtn(obj) {
      if (obj.account != "" && !/^[A-Za-z0-9]{4,16}$/.test(obj.account)) {
        this.$message(messageOption("请输入的账号格式不正确！"));
        return;
      }
      if (
        (obj.minMoney != "" && !/^[1-9]\d*$/.test(obj.minMoney)) ||
        (obj.maxMoney != "" && !/^[1-9]\d*$/.test(obj.maxMoney))
      ) {
        this.$message(messageOption("请输入正确的余额！"));
        return;
      }
      if (obj.maxMoney && obj.minMoney * 1 > obj.maxMoney * 1) {
        this.$message(messageOption("最小金额不能大于最大金额"));
        return;
      }
      if (this.groupManage.account != "") {
        this.groupManage.flag = 1;
      } else {
        this.groupManage.flag = 0;
      }
      this.getTeamManage(obj);
    },
    getTeamManage(obj) {
      m_teamManage(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          let arr = res.datas.currentUserName.split(">");
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] == this.m_memberInfo.userName) {
              arr.splice(i, 1);
            }
          }
          this.dynamicUserName = arr;
          this.list = res.datas.resultList;
          this.totalNumber =
            res.datas.totalRows != "" ? res.datas.totalRows : 0;
          this.totalPage =
            res.datas.totalPages != "" ? res.datas.totalPages : 0;
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    //列表排序方法
    sortList(attr, type) {
      this.arrowStatus = attr;
      this.currentSortType = !type;
      this.list = this.list.sort(compare(attr, this.currentSortType));
    },
    // 当前用户位置点击查询
    locationSearch(userName) {
      this.groupManage.currentPage = 1;
      this.groupManage.account = userName;
      this.groupManage.flag = 0;
      this.getTeamManage(this.groupManage);
    },
    // 表格点击查询二级代理记录
    tableUserSearch(userName) {
      this.groupManage.currentPage = 1;
      this.groupManage.account = userName;
      this.groupManage.flag = 0;
      this.getTeamManage(this.groupManage);
    },
    //查询当前登录用户记录
    frontSearch() {
      this.groupManage.currentPage = 1;
      this.groupManage.account = "";
      this.groupManage.flag = 0;
      this.getTeamManage(this.groupManage);
    },
    lookDetail(text) {
      this.lookBetDetail = text;
      this.popupStaus = !this.popupStaus;
      this.slotActive_betDetail = "lookRemarkDetail";
    },
    closeBetDetail() {
      this.slotActive_betDetail = "";
    },
    //跳转投注记录
    linkRecord(userName) {
      this.m_groupUserName_forLink(userName);
      this.$router.push("/member/gamerecord/0");
    },
    //跳转彩票账变
    linkLotteryAccount(userName) {
      this.m_groupUserName_forLink(userName);
      this.$router.push("/member/aboutMoney/3");
    },
    //下级转账
    linkTransfer(userName) {
      this.m_transfer_userName_forLink(userName);
      if (!estimateMoneyPsw()) {
        this.m_moneyPswStatus("transfer");
        return;
      }
      this.$router.push({ path: "/member/agent/" + 5 });
    },
    //添加备注提交
    addRemarkSubmit() {
      if (this.remarkBetRequestList.remark == "") {
        this.$message(messageOption("请填写备注！"));
        return;
      } else {
        this.remarkBetRequestList.remark = this.remarkBetRequestList.remark.substr(
          0,
          50
        );
      }
      m_teamAddRemark(this.remarkBetRequestList).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.getTeamManage(this.groupManage);
          this.proupsClose();
        }
      });
    },
    //返点设置确认提交
    setBackMoneySubmit() {
      let parentBack = this.m_memberInfo.backWater;
      let initialBack = this.initialBack;
      let groupBack = {};
      groupBack["lottery"] = Number(this.remarkBetRequestList.back);
      groupBack["live"] = Number(this.remarkBetRequestList.liveBack);
      groupBack["electronic"] = Number(
        this.remarkBetRequestList.electronicBack
      );
      groupBack["sport"] = Number(this.remarkBetRequestList.sportBack);
      groupBack["fish"] = Number(this.remarkBetRequestList.fishBack);
      for (let i in groupBack) {
        if (groupBack[i] == "") {
          this.$message(messageOption("请设置新的返点额度！"));
          return;
        }
        if (
          !/^[0-9]*[1-9][0-9]$/.test(groupBack[i]) &&
          !/^\d+(\.\d+)?$/.test(groupBack[i])
        ) {
          this.$message(messageOption("请设置正确的返点额度！"));
          return;
        }
        if (groupBack[i] > parentBack[i]) {
          this.$message(messageOption("不能大于自身返点！"));
          groupBack[i] = initialBack[i];
          return;
        }
        if (groupBack[i] <= initialBack[i]) {
          this.$message(messageOption("不能小于或等于原返点额！"));
          groupBack[i] = initialBack[i];
          return;
        }
      }
      m_teamSetBack(this.remarkBetRequestList).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.getTeamManage(this.groupManage);
        }
      });
      this.proupsClose();
    },
    //站内信发送
    siteMessageSend() {
      if (
        this.re_msgList.title == "" ||
        this.re_msgList.receiver == "" ||
        this.re_msgList.content == ""
      ) {
        this.$message(messageOption("不能有空项！"));
        return;
      }
      this.re_msgList.title = re_substring(this.re_msgList.title, "title");
      this.re_msgList.content = re_substring(
        this.re_msgList.content,
        "content"
      );
      m_messageAddGroup(this.re_msgList).then(res => {
        this.$message(messageOption(res.msg));
      });
      this.proupsClose();
    },
    //弹窗插槽通用方法 --- 打开
    proupsSlot(obj, type) {
      this.remarkBetRequestList.id = obj.id ? obj.id : "";
      this.remarkBetRequestList.account = obj.userName ? obj.userName : "";
      this.remarkBetRequestList.userByName = obj.userByName
        ? obj.userByName
        : "--";
      this.remarkBetRequestList.remark = obj.remark ? obj.remark : "";

      this.remarkBetRequestList.back = obj.betBack ? obj.betBack : "";
      this.remarkBetRequestList.liveBack = obj.liveBack ? obj.liveBack : "";
      this.remarkBetRequestList.electronicBack = obj.electronicBack
        ? obj.electronicBack
        : "";
      this.remarkBetRequestList.sportBack = obj.sportBack ? obj.sportBack : "";
      this.remarkBetRequestList.fishBack = obj.fishBack ? obj.fishBack : "";

      this.re_msgList.receiver = obj.userName;
      this.slotActive = type;
      if (type == "setBackMoney") {
        this.initialBack.lottery = obj.back;
        this.initialBack.live = obj.liveBack;
        this.initialBack.electronic = obj.electronicBack;
        this.initialBack.sport = obj.sportBack;
        this.initialBack.fish = obj.fishBack;
      }
      if (type == "siteMessage") {
        this.re_msgList.title = "";
        this.re_msgList.content = "";
      }
    },
    //弹窗插槽通用方法 --- 关闭
    proupsClose() {
      this.slotActive = "";
    },
    //切换到新增日薪信息界面
    addSalaryInfo(userName) {
      this.userName = userName;
      this.pageStatus = !this.pageStatus;
      this.setIndex = 2;
    },
    //切换到日薪管理界面
    salaryManage(userName) {
      this.setIndex = 1;
      this.userName = userName;
      this.pageStatus = !this.pageStatus;
    },
    //从日薪管理界面返回
    pageTwoBack() {
      this.pageStatus = !this.pageStatus;
      if (this.pageStatus) {
        this.getTeamManage(this.groupManage);
      }
    },
    //分页组件事件
    callPage(obj) {
      this.groupManage.currentPage = obj.currentPage;
      this.groupManage.pageLimit = obj.pageLimit;
      this.getTeamManage(this.groupManage);
    },
    ...mapMutations({
      m_moneyPswStatus: "m_moneyPswStatus",
      m_gameRecord_changeIndex: "m_gameRecord_changeIndex",
      m_aboutMoney_changeIndex: "m_aboutMoney_changeIndex",
      m_transfer_userName_forLink: "m_transfer_userName_forLink",
      m_agent_changeIndex: "m_agent_changeIndex",
      m_groupUserName_forLink: "m_groupUserName_forLink"
    })
  },
  computed: {
    ...mapGetters({
      m_user_type_check: "m_user_type_check",
      m_memberInfo: "m_memberInfo",
      set_defaultPageLimit: "set_defaultPageLimit"
    })
  },
  watch: {
    m_user_type_check: function() {
      this.defaultIsAgent = this.m_user_type_check[0].value;
    }
  },
  components: {
    Select,
    Option,
    PageOption,
    SalaryManage,
    SlotCommon,
    LookBetDetail,
    HeaderNav
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.group-manager
	background: #eee
	.select-zone
		li:last-child
			margin-right: 0
		input
			width: 88px
	.userLocation
		margin-bottom: 10px
		text-align: left
		font-size: 13px
		.front
			color: #17008d
			cursor: pointer
	.cursor
		color: #b00
	.userNameTd
		display: inline-block
		position: relative
		padding-left: 16px
	.online-icon
		position: absolute
		top: 1px
		left: 0
		width: 13px
		height: 13px
		margin-right: 6px
		background: url(./outline.png) no-repeat
	.online-icon.active
		background: url(./online.png) no-repeat
	.addRemark
		color: $color_theme
	
.lookDetail_content
		color: #499CF6
		cursor: pointer
		&:hover
			text-decoration: underline
.nofound
	background: #eee url(../nofound.png) no-repeat center;
</style>



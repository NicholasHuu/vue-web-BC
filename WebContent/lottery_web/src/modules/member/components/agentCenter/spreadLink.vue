<template>
  <div class="spread-link">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="top-content">
      <div class="left">
        <ul>
          <li>
            <p></p>
            <div class="disin title">新建链接开户入口</div>
          </li>
          <li>
            <p>用户类型:&nbsp;&nbsp;</p>
            <div class="disin">
              <Select
                v-model="defaultGrpUser"
                @change="requestList.userType = defaultGrpUser;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in m_user_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <!-- <li><p>设置返点:&nbsp;&nbsp;</p>
						<div class="disin">
							<Select v-model="defaultPercentList" @change="requestList.back = defaultPercentList;" placeholder="请选择">
							    <Option v-for="(item,index) in percentList" :key="index" :label="item+'%'" :value="item"></Option>
							</Select>
						</div>
          </li>-->
          <li v-for="(item,index) in backWaterList">
            <p>{{item.title}}:&nbsp;&nbsp;</p>
            <div class="disin">
              <Select
                v-model="item.defaultWaterValue"
                @change="changeBackWater(item.type,item.defaultWaterValue)"
                placeholder="请选择"
              >
                <Option v-for="item in item.list" :key="item" :label="item+'%'" :value="item"></Option>
              </Select>
            </div>
          </li>

          <li>
            <p>有效期:&nbsp;&nbsp;</p>
            <div class="disin">
              <Select
                v-model="defaultValadateTimeList"
                @change="requestList.valadateTime = defaultValadateTimeList;"
                placeholder="请选择"
              >
                <Option
                  v-for="item in m_link_time_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </div>
          </li>
          <li>
            <p>推广渠道:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              type="text"
              v-model.trim="requestList.qudao"
              placeholder="如QQ、论坛等"
            >
          </li>
          <li>
            <p>推广QQ:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              type="text"
              v-model.trim="requestList.qq"
              value
              placeholder="请填写QQ号"
            >
          </li>
          <li>
            <p>推广微信:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              type="text"
              v-model.trim="requestList.wx"
              value
              placeholder="请填写微信号"
            >
          </li>
          <li>
            <p>推广Skype:&nbsp;&nbsp;</p>
            <input
              class="user-name"
              type="text"
              v-model.trim="requestList.skype"
              value
              placeholder="请填写Skype账号"
            >
          </li>
          <li>
            <p></p>
            <div class="btn-search" @click="addLink(requestList)">生成链接</div>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="tips_inner">
          <p>您可以建立一系列不同返奖率的自主注册入口，然后将入口地址分发给您的用户。</p>
          <p>用户访问这些入口地址即可自行注册在您的团队中，省去您手动逐个开户的麻烦。</p>
          <p>
            <span class="red">注：</span>您还可在不同的宣传途径放置不同的入口，以统计哪些途径更为有效。
          </p>
          <i class="scissor"></i>
        </div>
        <p class="tips">*生成链接成功后，会在已建立的入口中显示</p>
      </div>
    </div>

    <div class="link-list">
      <div class="disin title">已建立的开户入口</div>

      <table>
        <!-- <div class="item"> -->
        <tr v-for="(item,index) in promotionLinkList" :key="index">
          <td class="serial">{{index + 1}}</td>
          <td class="content">
            <div class="tl">
              彩票返点:
              <span class="g_color_theme">{{item.rebateRatio}}</span> ，真人返点:
              <span class="g_color_theme">{{item.liveRatio}}</span> ，电子返点:
              <span class="g_color_theme">{{item.electronicRatio}}</span> ，体育返点:
              <span class="g_color_theme">{{item.sportRatio}}</span> ，捕鱼返点:
              <span class="g_color_theme">{{item.fishRatio}}</span> 类型:
              <span class="g_color_theme">{{item.userType}}</span>，创建时间:
              <span class="g_color_theme">{{item.createTime}}</span>，有效期:
              <span class="g_color_theme">{{item.validTime}}</span>，目前注册数:
              <span class="g_color_theme">{{item.registNum}}</span>，推广渠道:
              <span class="g_color_theme">{{item.extAddress}}</span>
            </div>
            <div class="tl">
              链接地址:
              <span class="g_color_theme">{{item.registAddress}}</span>
            </div>
            <div v-if="item.wxFlag == 1" class="tl">
              微信自动注册地址:
              <span class="g_color_theme">{{item.wxAddress}}</span>
            </div>
            <div class="btn-box">
              <div
                class="btn-search"
                v-clipboard:copy="item.registAddress"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >复制链接</div>
              <div
                v-if="item.wxFlag == 1"
                class="btn-search"
                v-clipboard:copy="item.wxAddress"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >复制微信链接</div>
              <div class="btn-search" @click="deleteLink(item.id)">删除链接</div>
            </div>
          </td>
          <td class="code">
            <qrcode-vue :value="item.registAddress" :size="size" class="code_img"></qrcode-vue>
            <p>浏览器注册二维码</p>
          </td>
          <td v-if="item.wxFlag == 1" class="code">
            <qrcode-vue :value="item.wxAddress" :size="size" class="code_img"></qrcode-vue>
            <p>微信自动注册二维码</p>
          </td>
        </tr>
        <!-- </div> -->
      </table>
    </div>

    <div class="pageSwitch" v-show="totalNumber > 20">
      <PageOption
        :totalNumber="totalNumber"
        :totalPage="totalPage"
        :curPage="re_linkList.currentPage"
        @callPage="callPage"
      ></PageOption>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import QrcodeVue from "qrcode.vue";
import { Select, Option } from "element-ui";
import PageOption from "../pageOption";
import { mapGetters } from "vuex";
import { ERR_OK } from "api/config";
import {
  m_teamPromotionLinkAdd,
  m_teamPromotionLinkList,
  m_teamPromotionLinkDelete
} from "api/member/memberApi";
import { messageOption } from "../toolFunction";
export default {
  name: "spreadLink",
  data() {
    return {
      listlist: ["推广链接"],
      totalPage: 0,
      totalNumber: 0,

      registerLower: {
        grpUser: ""
      },
      //用户组配置
      defaultGrpUser: 0,
      defaultValadateTimeList: 1,

      requestList: {
        qudao: "",
        back: "",
        liveBack: "",
        electronicBack: "",
        sportBack: "",
        fishBack: "",
        valadateTime: 0,
        userType: 0,
        qq: "",
        wx: "",
        skype: ""
      },

      promotionLinkList: [], //链接列表
      size: 80,

      percentList: [],
      defaultPercentList: null,

      re_linkList: {
        currentPage: 1,
        pageLimit: 0
      },

      backWaterList: [
        {
          type: "lottery",
          title: "彩票返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "live",
          title: "真人返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "electronic",
          title: "电子返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "sport",
          title: "体育返点",
          list: [],
          defaultWaterValue: 0
        },
        {
          type: "fish",
          title: "捕鱼返点",
          list: [],
          defaultWaterValue: 0
        }
      ],

      backWaterListStatus: true
    };
  },
  created() {
    this.__init();
  },
  methods: {
    __init() {
      this.defaultValadateTimeList = this.m_link_time_type[0].value;
      this.requestList.valadateTime = this.m_link_time_type[0].value;
      this.defaultGrpUser = this.m_user_type[0].value;
      this.requestList.userType = this.m_user_type[0].value;
      this.re_linkList.pageLimit = this.set_defaultPageLimit;

      if (this.m_memberInfo.backWater !== undefined) {
        if (this.backWaterListStatus) {
          let initial = this.m_memberInfo.backWater;
          for (let i = 0; i < this.backWaterList.length; i++) {
            let maxBackWater = initial[this.backWaterList[i].type];
            for (let j = maxBackWater; j >= 0; j = j - 0.1) {
              this.backWaterList[i].list.push(j.toFixed(1));
            }
            this.backWaterList[i].defaultWaterValue = this.backWaterList[
              i
            ].list[0];
          }
          this.backWaterListStatus = false;

          this.requestList.back = initial.lottery;
          this.requestList.liveBack = initial.live;
          this.requestList.electronicBack = initial.electronic;
          this.requestList.sportBack = initial.sport;
          this.requestList.fishBack = initial.fish;
        }
      }
      this.requestList.qudao = "";
      this.requestList.qq = "";
      this.requestList.wx = "";
      this.requestList.skype = "";
      this.getList(this.re_linkList);
    },
    changeBackWater(type, num) {
      switch (type) {
        case "lottery":
          this.requestList.back = num;
          this.defaultPercentList = num;
          break;
        case "live":
          this.requestList.liveBack = num;
          break;
        case "electronic":
          this.requestList.electronicBack = num;
          break;
        case "sport":
          this.requestList.sportBack = num;
          break;
        case "fish":
          this.requestList.fishBack = num;
          break;
        default:
          break;
      }
    },
    addLink(obj) {
      if (this.requestList.qudao == "") {
        this.$message(messageOption("请填写推广渠道"));
        return;
      }
      if (
        this.requestList.skype == "" &&
        this.requestList.wx == "" &&
        this.requestList.qq == ""
      ) {
        this.$message(messageOption("请至少填写一种联系方式"));
        return;
      }
      if (
        this.requestList.skype != "" &&
        !/^[0-9a-zA-Z]+$/.test(this.requestList.skype)
      ) {
        this.$message(messageOption("请填写正确的Skype账号"));
        return;
      }
      if (
        this.requestList.wx != "" &&
        !/^[0-9a-zA-Z]+$/.test(this.requestList.wx)
      ) {
        this.$message(messageOption("请填写正确的微信号"));
        return;
      }
      if (
        this.requestList.qq != "" &&
        !/^\d{5,12}$/.test(this.requestList.qq)
      ) {
        this.$message(messageOption("请输入正确的QQ号码！"));
        return;
      }
      m_teamPromotionLinkAdd(obj).then(res => {
        this.$message(messageOption(res.msg));
        this.__init();
      });
    },
    getList(obj) {
      m_teamPromotionLinkList(obj).then(res => {
        if (res.errorCode == ERR_OK) {
          this.promotionLinkList = res.datas.resultList;
          this.totalNumber = res.datas.totalRows * 1;
          this.totalPage = res.datas.totalPages * 1;
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },
    //分页组件事件
    callPage(obj) {
      this.re_linkList.currentPage = obj.currentPage;
      this.re_linkList.pageLimit = obj.pageLimit;
      this.getList(this.re_linkList);
    },
    onCopy(e) {
      this.$message(messageOption("复制成功！"));
    },
    onError(e) {
      this.$message(messageOption("浏览器不支持复制，请手动复制！"));
    },
    deleteLink(id) {
      m_teamPromotionLinkDelete(id).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.getList(this.re_linkList);
        }
      });
    }
  },
  watch: {
    m_memberInfo() {
      this.__init();
    },
    m_user_type() {
      this.__init();
    }
  },
  computed: {
    ...mapGetters({
      m_memberInfo: "m_memberInfo",
      m_user_type: "m_user_type",
      m_link_time_type: "m_link_time_type",
      set_defaultPageLimit: "set_defaultPageLimit"
    })
  },
  components: {
    Select,
    Option,
    QrcodeVue,
    PageOption,
    HeaderNav
  }
};
</script>

<style lang="sass" scoped>
.spread-link
	// padding: 20px
	background: #fff
	.title
		margin-left: 24px
		font-size: 18px
		font-weight: 700
		color: #C12727
	.top-content
		position: relative
		width: 100%
		padding: 30px
		margin: 0 auto 
		background: #E3E0E7
		box-sizing: border-box
		.left
			display: inline-block
			margin-left: 50px
		li
			margin-bottom: 20px
			p
				display: inline-block
				width: 100px
				margin-right: 10px
				text-align: right
				font-size: 14px
			input
				width: 180px
				height: 26px
				line-height: 26px
				padding-left: 6px
				margin-right: 10px
				border: 1px solid #ccc
				border-radius: 4px
			span
				display: inline-block
				font-size: 14px
			.btn-search
				display: inline-block
			.el-select
				width: 190px
		.right
			float: right
			width: 380px
			padding: 40px 60px
			border-left: 1px dashed #8c8c8c
			font-size: 12px
			p
				line-height: 26px
				text-indent: 2em
			.tips
				color: #999
				font-size: 12px
			.tips_inner
				position: relative
				padding: 14px 10px
				background: #fff
				border: 1px dotted #8c8c8c
				border-radius: 4px
				.red
					color: red
				.scissor
					position: absolute
					bottom: -11px
					right: 20px
					width: 29px
					height: 21px
					background: url(./scissor.png) no-repeat;

		&:before,&:after
			content: ''
			position: absolute
			top: 0
			left: -4px
			width: 5px
			height: 100%
			background: url(./addUser-l.png) repeat-y;
		&:after
			left: unset
			right: -5px
			background: url(./addUser-r.png) repeat-y;
	
	.link-list
		.title
			margin: 20px 0
		.serial
			width: 60px
			font-size: 60px
			font-weight: 600px
			color: #D9D9D9
		.code
			width: 120px
			p
				line-height: 20px
		table
			td
				border: 1px solid #D9D9D9
			.content
				padding: 10px
				.tl
					line-height: 22px
					font-size: 13px
			.code_img
				width: 80px
				height: 80px
				margin: 0 auto
		.btn-box
			margin-top: 10px
			.btn-search
				display: inline-block
				width: 100px
				height: 28px
				line-height: 28px
				margin-right: 30px
				font-size: 14px
</style>



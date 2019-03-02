<template>
  <div class="chuantongsaoma clearfix payStyle">
    <div class="inner">
      <div class="nav" ref="nav">
        <ul>
          <li
            v-for="(item,index) in list"
            :key="index"
            :class="{active: curIndex == index}"
            @click="switchPage(index)"
          >{{item.payName}}</li>
        </ul>
      </div>
      <div class="content">
        <div class="border"></div>
        <div
          class="item"
          ref="item"
          v-for="(item,index) in list"
          :key="index"
          v-show="curIndex == index"
        >
          <div class="picUrl" style="width:156px;height: 156px">
            <img :src="item.picUrl" alt style="width: 100%;">
          </div>
          <ul>
            <li>
              <span>真实姓名:</span>
              {{subItem.payRname}}
            </li>
            <li>
              <span>充值金额:</span>
              <input class="chromeInputClearAuto">
              <input type="number" v-model="re_list.money" :placeholder="subItem.minMaxDes">
            </li>
            <li>
              <span>姓名:</span>
              <input type="text" v-model="re_list.account" :placeholder="placeholderList">
            </li>
            <li>
              <span>备注:</span>
              <input type="text" v-model="re_list.userRemark" placeholder="请输入备注(非必填)">
            </li>
            <li v-show="subItem.remark">
              <span></span>
              <div class="icon_notice_remark disin" style="color: #5c5c5c;">{{subItem.remark}}</div>
            </li>
            <li>
              <span></span>
              <p class="btn-search btn-moditfy disin" @click="chargeBtn()">确 认</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { ERR_OK } from "api/config";
import { charge_chuantongSaoma } from "api/member/memberApi";
import { messageOption } from "../toolFunction";
export default {
  name: "chuantongsaoma",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curIndex: 0,
      subItem: {},
      re_list: {
        userName: "",
        money: "",
        payType: "",
        module: "",
        account: "",
        client: 0,
        userRemark: "",
        payNo: ""
      },
      minMoney: 0,
      maxMoney: 0,
      placeholderList: "请输入姓名"
    };
  },
  created() {
    this.re_list.userName = this.global_userName;
    this.switchPage(0);
  },
  methods: {
    switchPage(index) {
      this.curIndex = index;
      this.subItem = this.list[index];
      this.re_list.payType = this.subItem.payType;
      this.re_list.module = this.subItem.module;
      this.re_list.payNo = this.subItem.payNo;
      this.minMoney = this.subItem.minPay;
      this.maxMoney = this.subItem.maxPay;
      console.log(this.subItem.remark);
      switch (this.subItem.remark) {
        case "自定义支付":
          this.placeholderList = "请输入姓名";
          break;
        case "微信支付":
          this.placeholderList = "请输入姓名";
          break;
        case "支付宝支付":
          this.placeholderList = "请输入姓名";
          break;
      }
    },
    chargeBtn() {
      if (this.re_list.money < this.minMoney) {
        this.$message(messageOption("请输入大于" + this.minMoney + "的金额！"));
        return;
      }
      if (this.re_list.account == "") {
        this.$message(messageOption("请输入姓名!"));
        return;
      }
      charge_chuantongSaoma(this.re_list).then(res => {
        this.$message(messageOption(res.msg));
        if (res.errorCode == ERR_OK) {
          this.re_list.money = "";
          this.re_list.account = "";
          this.re_list.userRemark = "";
        }
      });
    }
  },
  mounted() {
    if (this.list.length > 14) {
      let navHeight = this.$refs.nav.scrollHeight;
      this.$refs.item.style.height = navHeight - 2 + "px";
    }
  },
  computed: {
    ...mapGetters({
      global_userName: "global_userName"
    })
  }
};
</script>

<style lang="sass" scoped>

.payStyle
	.picUrl
		margin: 0 0 20px 175px 
</style>



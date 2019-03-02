<template>
  <div class="signUp">
    <div class="box">
      <div class="bannerBox">
        <img src="./banner.png" alt>
      </div>
      <div class="content">
        <div class="formBox ce">
          <div class="title">
            <label for></label> 用户注册
          </div>
          <div class="password">
            <label for>邀请码</label>
            <input type="text" placeholder="请输入邀请码(非必填)" v-model="againInviter">
          </div>
          <div class="userName">
            <label for>账号</label>
            <input type="text" placeholder="4-16位数字/字母或组合" v-model="userName">
          </div>
          <div class="password">
            <label for>密码</label>
            <input type="password" placeholder="6-16位数字/字母或组合" v-model="password">
          </div>
          <div class="password">
            <label for>确认密码</label>
            <input type="password" placeholder="再次输入密码" v-model="againPassword">
          </div>
          <div class="checkBox">
            <el-checkbox v-model="isChecked"></el-checkbox>
            <span class="btn doc" @click="_getPanelInfo">开户协议</span>
          </div>
          <div class="submitBox">
            <div class="btn" :class="{'noClick':!isChecked}" @click="_signUp">确认</div>
          </div>
        </div>
      </div>
    </div>
    <PanelPop
      @callbackSure="callbackSure"
      @callbackCancel="callbackCancel"
      :content="popContent"
      :btnsInfo="btnsInfo"
      :title="popTitle"
      v-show="popIsShow"
      @closePanelPop="closePanelPop"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { ERR_OK } from "api/config";
import PanelPop from "../panelPop/panelPop";
import { v_userName, v_password_every } from "common/js/utils";
import { saveUserName } from "common/js/cache";

export default {
  name: "signUp",
  data() {
    return {
      againInviter: "",
      userName: "",
      password: "",
      againPassword: "",
      isChecked: true,
      popTitle: "开户协议",
      popContent: "",
      popIsShow: false,
      btnsInfo: {
        suerBtn: {
          name: "确定",
          isShow: true,
          callbackName: "closePanelPop"
        },
        cancelBtn: {
          name: "不同意",
          isShow: false,
          callbackName: "closePanelPop"
        }
      },
      sign: ""
    };
  },
  methods: {
    ...mapActions([
      "u_signUp",
      "l_lotteryPanelInfo",
      "u_loginNoVerify",
      "m_memberInfo",
      "u_getUserBalance",
      "re_m_messageCount"
    ]),

    ...mapMutations({
      setUserName: "U_SET_USER_NAME"
    }),

    closePanelPop() {
      if (!this.btnsInfo.suerBtn.name == "确定") {
        this.userName = "";
        this.password = "";
        this.againPassword = "";
        this.againInviter = "";
      }
      this.popIsShow = false;
    },

    callbackSure() {
      this.u_loginNoVerify({
        account: this.userName,
        password: this.password,
        sign: this.sign
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.setUserName(saveUserName(res.datas.userName));
          this.m_memberInfo();
          this.u_getUserBalance(res.datas.userName);
          this.re_m_messageCount();
          this.$router.push({ path: "/loginNotice" });
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            type: "error",
            center: true,
            lockScroll: false
          });
        }
      });
    },

    callbackCancel() {
      this.closePanelPop();
    },

    _getPanelInfo() {
      this.l_lotteryPanelInfo("msg010").then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.popContent = res.datas;
          this.btnsInfo.suerBtn.callbackName = "callbackCancel";
          this.btnsInfo.suerBtn.name = "确定";
          this.btnsInfo.cancelBtn.isShow = false;
          this.popIsShow = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    _signUp() {
      if (!this.isChecked) return;
      if (!this.userName) {
        this.$alert("用户名不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }

      if (!this.password) {
        this.$alert("密码不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!this.againPassword) {
        this.$alert("确认密码不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!v_userName(this.userName)) {
        this.$alert("请输入4-16位数字/字母或组合作为帐号", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!v_password_every(this.againPassword)) {
        this.$alert("请输入6-16位数字/字母或组合作为密码", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (this.password != this.againPassword) {
        this.$alert("两次密码输入不一致", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!this.isChecked) {
        this.$alert("请先同意注册协议！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      this.u_signUp({
        account: this.userName,
        password: this.againPassword,
        code: this.againInviter
      }).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.popContent = res.datas.data.protocol;
          this.sign = res.datas.sign;
          this.userName = res.datas.userName;
          this.callbackSure();
        } else {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            type: "error",
            center: true,
            lockScroll: false
          });
        }
      });
    }
  },
  components: {
    PanelPop
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.signUp
  // background-image: url('bg.png')
  background-size: 100% 100%
  width: 100%
  height: 100%
  padding: 100px 0
  .box
    width: 756px
    height: 410px
    padding: 10px
    margin: 0 auto
    background-color: #f1efed
    .bannerBox
        height: 96px
        img
          width: 100%
          height: 100%
    .content
        background-color: $color_text_white
        position: relative
        height: 315px
        .formBox
            padding: 10px
            width: 270px
            position: relative
            &>div
                margin: 15px 0
                width: 270px
                text-align: center
                &.title
                    margin-top: 20px
                    font-size: 18px
                    color: $color_theme
                    font-weight: bold
                &>input
                    background-color: #f6f6f6
                    border: 1px solid #e2e2e2
                    height: 30px
                    width: 200px
                    outline: 0
                    padding: 5px
                    box-sizing: border-box
                &>label
                    font-size: 14px
                    color: #333333
                    width: 60px
                    display: inline-block
                    text-align: right
                    margin-right: 5px
                &.vCode
                    position: relative
                    img
                        position: absolute
                        top: 0
                        right: 0
                        height: 100%
                &.checkBox
                    span
                        font-size: 14px
                        color: #2b67cb
                        text-decoration: underline
                &.submitBox
                    text-align: right
                    .btn
                        width: 200px
                        height: 38px
                        line-height: 38px
                        float: right
                        text-align: center
                        background-color: $color_theme
                        color: $color_text_white
                    .noClick
                      background-color: #ccc
                      cursor: no-drop
                &.contcat
                    height: 40px
                    padding-top: 40px
                    &>div
                        &.wx
                            position: relative
                            &:after
                                visibility: hidden
                                position: absolute
                                content: attr(data-txt)
                                bottom: 45px
                                background-color: #f2f2f2
                                border: 1px solid #dddddd
                                padding: 5px
                                left: 0
                                right: 0
                                margin: 0 auto
                                color: #666
                                box-sizing: border-box
                            &:before
                                content: ""
                                visibility: hidden
                                display: block
                                width: 5px
                                height: 5px
                                background-color: #f2f2f2
                                border-left: 1px solid #dddddd
                                border-bottom: 1px solid #dddddd
                                transform: rotate(-45deg)
                                left: 0
                                right: 0
                                margin: 0 auto
                                position: absolute
                                box-sizing: border-box
                                bottom: 43px
                                z-index: 1
                            &:hover
                                &:after,&:before
                                    visibility: visible
</style>

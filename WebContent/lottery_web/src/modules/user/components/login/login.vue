<template>
  <div class="loginBox" ref="loginBox" v-show="u_isShowLoginPop" @keyup.enter="_login">
      <div class="box">
          <div class="title">登陆 <i class="el-icon-close btn" @click="closeLogin"></i></div>
          <div class="content">
            <ul>
                <li>
                    <div class="info-left">
                        <span class="red">* </span>账号：
                    </div>
                    <div class="info-right">
                        <el-input ref="userName"
                            placeholder="输入用户名/手机号码"
                            prefix-icon="icon-user"
                            v-model="userName">
                        </el-input>
                    </div>
                </li>
                <li>
                    <div class="info-left">
                        <span class="red">* </span>密码：
                    </div>
                    <div class="info-right">
                        <el-input ref="password"
                            placeholder="输入密码"
                            prefix-icon="icon-password"
                            type="password"
                            v-model="password">
                        </el-input>
                    </div>
                </li>
                <li>
                    <div class="info-left">
                        <span class="red">* </span>验证码：
                    </div>
                    <div class="info-right info-codes">
                        <div class="vCodeBox">
                            <el-input ref="vCode"
                                placeholder="输入验证码"
                                prefix-icon="icon-password"
                                v-model="vCode">
                            </el-input>
                        </div>
                        <img @click="getRandomNum" :src="l_lotteryVCodeImg" class="vCodeImg btn" alt="">
                        <span @click="getRandomNum">点击切换</span>
                    </div>
                </li>
                <li class="marb">
                    <div class="info-left">&nbsp;</div>
                    <div class="info-right">
                        <div class="btn loginBtn" ref="loginBtn" @click="_login" @keyup.enter="_login">登录</div>
                    </div>
                </li>
                <li class="marb">
                    <div class="info-left">&nbsp;</div>
                    <div class="info-right">
                        <p class="message">
                            还没有账户? <span class="btn" @click="_signUp">立刻创建</span>
                            <span class="btn forgetPwd" @click="forgetPwd">忘记密码</span>
                        </p>
                    </div>
                    
                </li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ERR_OK } from "api/config";
import {v_userName,v_password_every} from "common/js/utils"

export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: "",
      vCode: "",
      randomNum: ""
    };
  },
  methods: {
    ...mapActions(["u_login", "l_lotteryChangVCodeImg"]),

    ...mapMutations({
      setLoginPopIsShow: "U_SET_IS_SHOW_LOGIN_POP"
    }),

    forgetPwd(){
        this.setLoginPopIsShow(false);
        this.$router.push({ path: "/member/forgetPassword" });
    },

    _signUp() {
      this.$router.push({ path: "/signUp" });
      this.closeLogin();
    },

    //   生成随机数
    getRandomNum() {
      this.l_lotteryChangVCodeImg();
    },

    domblur(){
        this.$refs.loginBox.blur();
        this.$refs.userName.blur();
        this.$refs.password.blur();
        this.$refs.vCode.blur();
        this.$refs.loginBtn.blur();
    },

    _login() {
      if (!this.userName) {
          this.domblur();
        this.$alert("用户名不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!this.password) {
          this.domblur();
        this.$alert("密码不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if (!this.vCode) {
          this.domblur();
        this.$alert("验证码不能为空！", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if(!v_userName(this.userName)){
          this.domblur();
          this.$alert("请输入4-16位数字/字母或组合的帐号", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      if(!v_password_every(this.password)){
          this.domblur();
          this.$alert("请输入6-16位数字/字母或组合的密码", "温馨提示", {
          confirmButtonText: "确定",
          center: true,
          lockScroll: false
        });
        return false;
      }
      this.u_login({
          userName: this.userName,
        password: this.password,
        yzm: this.vCode
      });
      this.domblur();
      this.getRandomNum();
    },

    closeLogin() {
      this.setLoginPopIsShow(false);
      this.userName = "";
      this.password = "";
      this.vCode = "";
    }
  },
  computed: {
    ...mapGetters(["u_isShowLoginPop", "l_lotteryVCodeImg"])
  }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.loginBox
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0,.7)
    z-index: 10
    .box
        width: 450px
        height: 365px
        border: 1px solid $color_theme
        background-color: $color_text_white
        position: fixed
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        padding: 10px
        .title
            height: 45px
            line-height: 45px
            font-size: $fs16
            color: $color_theme
            border-bottom: 1px solid #ccc
            i
                font-size: 30px
                transition: all 300ms
                transform: rotate(0)
                float: right
                margin-top: 10px
                &:hover
                    transform: rotate(180deg)
        .content
            ul
                margin: 20px auto 0px
                li
                    height: 40px
                    line-height: 40px
                    margin-bottom: 24px
                    .info-left
                        width: 105px
                        height: 100%
                        text-align: right
                        display: inline-block
                        font-size: 14px
                        color: #666
                        .red
                            color: red
                            margin-right: 5px
                    .info-right
                        width: 270px
                        height: 100%
                        display: inline-block
                        margin-left: 10px
                        .message
                            font-size: $fs12
                            color: #666
                            span
                                color: #005aa0
                            .forgetPwd
                                color: $color_theme
                        .loginBtn
                            width: 117px
                            height: 40px
                            background-color: $color_theme
                            border-radius: 4px
                            color: $color_text_white
                            line-height: 40px
                            text-align: center
                    .info-codes
                        img
                            width: 65px
                            height: 40px
                            margin-left: 15px
                            vertical-align: middle
                        span
                            font-size: 12px
                            color: #555
                            margin-left: 10px
                        .vCodeBox
                            width: 117px
                            height: 100%
                            display: inline-block
                    
            
</style>

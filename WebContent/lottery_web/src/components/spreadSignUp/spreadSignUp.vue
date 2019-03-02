<template>
  <div class="spreadSignUp">
    <div class="box">
      <div class="bannerBox">
        <img src="./banner.png" alt>
      </div>
      <div class="content">
        <div class="formBox ce">
          <div class="title">
            <label for></label> 用户注册
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
          <div class="vCode">
            <label for>验证码</label>
            <input type="text" placeholder="输入验证码" v-model="vCode">
            <img :src="l_lotteryVCodeImg" @click="getRandomNum" class="btn" alt>
          </div>
          <div class="submitBox">
            <div class="btn" @click="_signUp">确认</div>
          </div>
          <div class="contcat">
            <label for></label>
            <div class="qq btn" v-show="conccontcatObj.qq">
              <a
                target="_blank"
                :href="'http://wpa.qq.com/msgrd?v=3&uin='+conccontcatObj.qq+'&site=qq&menu=yes'"
              >
                <img src="./qq.png" alt>
              </a>
            </div>
            <div class="wx btn" :data-txt="conccontcatObj.wx" v-show="conccontcatObj.wx">
              <img src="./wechat.png" alt>
            </div>
            <div class="skype btn" :data-txt="conccontcatObj.skype" v-show="conccontcatObj.skype">
              <img src="./skype.png" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ERR_OK } from "api/config";
import { mapActions, mapGetters } from "vuex";
import { v_userName, v_password_every } from "common/js/utils";

export default {
  name: "spreadSignUp",
  data() {
    return {
      userName: "",
      password: "",
      againPassword: "",
      vCode: "",
      conccontcatObj: {
        qq: "",
        skype: "",
        wx: ""
      }
    };
  },



  beforeRouteLeave (to, from, next) {
    this.$confirm('此操作将取消您的注册，是否确定', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next()
    }).catch(() => {
      return false
    })
  },



  created() {
    this._getRegistByLinkDetail(this.$route.query.code);
  },
  methods: {
    ...mapActions([
      "u_registByLink",
      "l_lotteryPanelInfo",
      "l_lotteryChangVCodeImg",
      "u_registByLinkDetail"
    ]),

    _getRegistByLinkDetail(code) {
      this.u_registByLinkDetail(code).then(res => {
        if (res && res.errorCode == ERR_OK) {
          this.conccontcatObj = res.datas;
          console.log(res);
        } else {
          console.log(res);
        }
      });
    },

    //   生成随机数
    getRandomNum() {
      this.l_lotteryChangVCodeImg();
    },

    _signUp() {
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
      this.u_registByLink({
        account: this.userName,
        code: this.$route.query.code,
        yzm: this.vCode,
        password: this.againPassword
      }).then(res => {
        this.userName = "";
        this.vCode = "";
        this.againPassword = "";
        if (res && res.errorCode == ERR_OK) {
          this.$alert(res.msg, "温馨提示", {
            confirmButtonText: "确定",
            type: "success",
            center: true,
            lockScroll: false
          });
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
  computed: {
    ...mapGetters(["l_lotteryVCodeImg"])
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.spreadSignUp
    // background-image: url('bg.png')
    background-size: 100% 100%
    width: 100%
    height: 100%
    padding: 100px 0
    .box
        width: 756px
        height: 560px
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
            height: 465px
            .formBox
                padding: 10px
                width: 290px
                height: 270px
                box-sizing: border-box
                &>div
                    margin: 10px 0
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
                        overflow: auto
                        .btn
                            width: 200px
                            height: 38px
                            line-height: 38px
                            text-align: center
                            background-color: $color_theme
                            color: $color_text_white
                            float: right
                    &.contcat
                        height: 40px
                        padding-top: 40px
                        &>div
                            display: inline-block
                            &.wx,&.skype
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
                                    display: table
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

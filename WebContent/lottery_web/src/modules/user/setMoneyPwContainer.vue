<template>
  <div class="setMoneyPw">
      <div class="box">
          <div class="title">完善资料 <i class="el-icon-close btn" @click="closeLogin"></i></div>
          <div class="content">
            <ul>
                <li>
                    <div class="info-left"><span class="red">* </span>资金密码: </div>
                    <div class="info-right">
                        <el-input type="password" placeholder="请输入4位纯数字资金密码" v-model.trim="re_list.zjPwd">
                        </el-input>
                    </div>
                </li>

                <li>
                    <div class="info-left"><span class="red">* </span>确认密码: </div>
                    <div class="info-right">
                        <el-input type="password" placeholder="请再次输入密码" v-model.trim="reZjPwd">
                        </el-input>
                    </div>
                </li>

                <li>
                    <div class="info-left"><span class="red">* </span>提款银行卡姓名: </div>
                    <div class="info-right">
                        <el-input type="text" placeholder="请输入您的真实姓名"  v-model.trim="re_list.realName">
                        </el-input>
                    </div>
                </li>
                
                <li class="marb">
                    <div class="info-left">&nbsp;</div>
                    <div class="info-right">
                        <p class="message">
                          <span class="btn loginBtn" @click="submitMoneyPw">确 认</span>
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
import {ERR_OK} from 'api/config'
import { withdrawPwdBind } from "api/user/userApi"

export default {
    name: "setMoneyPw",
    data() {
        return {
            re_list: {
                zjPwd: "",
                realName: ""
            },
            reZjPwd: ''
        };
    },
    methods: {
        closeLogin(){
            this.u_setMoneyPwStatus(false);
        },
        submitMoneyPw(){
            if(this.re_list.zjPwd == ""){
                this.$message(this.messageOption('请填写资金密码!'));return;
            }
            if( !/^[0-9]{4}$/.test(this.re_list.zjPwd) ){
                this.$message(this.messageOption('请填写4位数字资金密码!'));return;
            }
            if(this.re_list.zjPwd != this.reZjPwd){
                this.$message(this.messageOption('两次输入密码不一致!'));return;
            }
            if(this.re_list.realName == ""){
                this.$message(this.messageOption('请输入真实姓名!'));return;
            }
            withdrawPwdBind(this.re_list).then(res=>{
                if(res.errorCode == ERR_OK){
                    this.u_setMoneyPwStatus(false);
                    this.m_memberInfo();
                    this.linkTo();
                }else{
                    this.$message(this.messageOption(res.msg));
                }
            })
        },
        linkTo(){
            switch ( this.moneyPswStatus ){
                case "charge":
                    this.$router.push('/member/charge');
                    break;
                case "withdraw":
                    if(this.mUserBankList.list.length == 0){
                        this.$router.push({path: '/member/accountmanager/' + 2});
                    }else{
                        this.$router.push('/member/withdraw');
                    }
                    break;
                case "password":
                    this.$router.push({path: '/member/accountmanager/' + 1});
                    break;
                case "bankCard":
                    this.$router.push({path: '/member/accountmanager/' + 2});
                    break;
                case "transfer":
                    this.$router.push({path: '/member/agent/' + 4});
                    break;
                default:
                    break;
            }
        },
        messageOption(msg){
            return {
                type: "info",
                showClose: false,
                customClass: "g_messageTips",
                message: msg,
                duration: 2500,
                center: true
            }
        },
        ...mapMutations([
            'u_setMoneyPwStatus'
        ]),
        ...mapActions([
            'm_memberInfo',   
        ]),
    },
    computed: {
        ...mapGetters({
            moneyPswStatus: "m_moneyPswStatus",
            mUserBankList: 'm_userBankList',
        })
    }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.setMoneyPw
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0,.7)
    z-index: 6
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
            font-size: $fs14
            color: $color_theme
            border-bottom: 1px solid #ccc
            i
                font-size: 30px
                transition: all 300ms
                transform: rotate(0)
                margin-top: 7px
                float: right
                &:hover
                    transform: rotate(180deg)
        .content
            ul
                margin: 40px auto 0px
                li
                    height: 40px
                    margin-bottom: 24px
                    display: block
                    .info-left
                        width: 125px
                        height: 100%
                        display: inline-block
                        font-size: 14px
                        color: #666
                        text-align: right
                        .red
                            color: red
                            margin-right: 5px
                    .info-right

                        width: 220px
                        height: 100%
                        margin-left: 10px
                        display: inline-block
                        .message
                            font-size: $fs12
                            color: #666
                        .loginBtn
                            display: block
                            width: 117px
                            height: 40px
                            background-color: $color_theme
                            border-radius: 4px
                            color: $color_text_white
                            line-height: 40px
                            text-align: center
                            font-size: 14px
                    
            
</style>

<template>
	<div class="mobilebind">
		<div class="content">
            <div class="backBtn" @click="back"><<返回</div>
			<div class="box">
                
                <div class="item">
                    <span class="left">手机号码</span>
                    <div class="right disin">
                        <input class="chromeInputClearAuto">
                        <input class=" mobile" type="text" placeholder="请输入手机号码"  v-model.trim="re_list.mobile">
                    </div>
                </div>
                <div class="item ">
                    <span class="left">验证码</span>
                    <div class="right disin code">
                        <input class=" mobile" type="text" placeholder="请输入验证码"  v-model.trim="re_list.code">
                        <span class="sendBtn" @click="sendCode(re_code)">{{text}}</span>
                    </div>
                </div>
                <div class="item">
                    <span class="left"></span>
                    <p v-if="l_lotteryWebSiteInfo.information.bdsj" class="icon_notice_remark right disin tl colorStyle">{{l_lotteryWebSiteInfo.information.bdsj}}</p>
                </div>
                <div class="item">
                    <span class="left"></span>
                    <p class="right disin"><span class="btn" @click="bindMobile(re_list)">确 认</span></p>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { mapActions , mapGetters , mapMutations } from 'vuex'
import { ERR_OK } from "api/config"
import { messageOption } from './components/toolFunction'
import { m_bindMobile , smsSend } from "api/member/memberApi"
export default {
	name: "mobilebind",
	data() {
	    return {
	    	re_list:{
				mobile: "",
	    		code: "",
            },
            text: "发送验证码",

            re_code: {
                phone: "",
                businessType: 3,
                account: ""
            },

            second: 60,
            downSecond: null,
            sendCodeStatus: true,
		};
	},
	created() {
        this.re_code.account = this.global_userName;
	},
    methods: {
        back(){
            this.$router.push({path: '/member/accountmanager/' + 0});
        },
        sendCode(obj){
            if(!this.sendCodeStatus)return;
            obj.phone = this.re_list.mobile;
            if(obj.phone == "" || !/^1[3,4,5,7,8]\d{9}$/.test(obj.phone)){
                this.$message(messageOption('请输入正确的手机号！'));return;
            }
            this.countDown();
            let that = this;
            smsSend(obj).then(res=>{
                if(res.errorCode == ERR_OK){
                    that.$message(messageOption(res.msg));
                }else{
                    that.$message(messageOption(res.msg));
                    that.resetCodeBtn();
                }
            })
        },
        countDown(){
            this.text = this.second + 's后重发';
            let that = this;
            this.downSecond = setInterval(function(){
                if(that.second > 1){
                    that.second--;
                    that.text = that.second + 's后重发';
                    that.sendCodeStatus = false;
                }else{
                    that.resetCodeBtn();
                }
            },1000);
        },
        bindMobile(obj){
            if(obj.mobile == "" || !/^1[3,4,5,7,8]\d{9}$/.test(obj.mobile)){
                this.$message(messageOption('请输入正确的手机号！'));return;
            }
            if(obj.code == "" || !/^\d{6}$/.test(obj.code)){
                this.$message(messageOption('请输入验证码！'));return;
            }
            let that = this;
            m_bindMobile(obj).then(res=>{
                this.$message(messageOption(res.msg));
                if(res.errorCode == ERR_OK){
                    that.$router.push('/member/accountmanager/0');
                    that.changePage(0);
                }else{
                    that.resetCodeBtn();
                }
            })
            
        },
        resetCodeBtn(){
            this.text =  "发送验证码";
            this.second = 60;
            this.sendCodeStatus = true;
            clearInterval(this.downSecond);
        },
        ...mapMutations({
            changePage: 'm_accountManager_changeIndex',
        })
	},
	computed: {
		...mapGetters({
			'global_userName': 'global_userName',
            'l_lotteryWebSiteInfo': 'l_lotteryWebSiteInfo'
		})
	},
	components: {
	},
	
};
</script>
<style lang="sass" scoped>

</style>


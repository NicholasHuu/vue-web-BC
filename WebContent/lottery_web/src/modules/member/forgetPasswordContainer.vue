    <template>
    	<div class="forgetPassword">
    		<div class="content">
    			<div class="box" v-show="pageStatus">
                    <!-- <h3>忘记密码</h3> -->
                    <div class="item">
                        <div class="left">用户名</div>
                        <div class="right disin">
                            <input class="chromeInputClearAuto">
                            <input class="mobile" type="text" tabindex="1" placeholder="请输入用户名" autocomplete="false" v-model.trim="re_code.account">
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">手机号</div>
                        <div class="right disin">
                            <input class="chromeInputClearAuto">
                            <input class="mobile" type="text" tabindex="2" placeholder="请输入手机号" autocomplete="false" v-model.trim="re_code.phone">
                        </div>
                    </div>
                    <div class="item ">
                        <div class="left">验证码</div>
                        <div class="right disin code">
                            <input class=" mobile" type="text" tabindex="3" placeholder="请输入验证码"  v-model.trim="re_checkCode.code">
                            <span class="sendBtn" @click="sendCode(re_code)">{{text}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left"></div>
                        <p v-if="l_lotteryWebSiteInfo.information.forgetpwd" class="icon_notice_remark right disin tl colorStyle">{{l_lotteryWebSiteInfo.information.forgetpwd}}</p>
                    </div>
                    <div class="item">
                        <div class="left"></div>
                        <p class="right disin "><span class="btn" @click="next(re_checkCode)">下一步</span></p>
                    </div>
                </div>

                <div class="box" v-show="!pageStatus">
                    <h3>重置密码</h3>
                    <div class="item">
                        <div class="left">输入新密码</div>
                        <div class="right disin">
                            <input class="chromeInputClearAuto">
                            <input class="mobile" type="password" placeholder="6-16位字母、数字组合"  v-model.trim="re_list.pwd">
                        </div>
                    </div>
                    <div class="item ">
                        <div class="left">确认新密码</div>
                        <div class="right disin code">
                            <input class=" mobile" type="password" placeholder="再次输入密码"  v-model.trim="re_list.pwdAgain">
                        </div>
                    </div>
                    <div class="item">
                        <div class="left"></div>
                        <p class="right disin tl colorStyle">重置密码</p>
                    </div>
                    <div class="item">
                        <div class="left"></div>
                        <p class="right disin"><span class="btn" @click="resetPsw(re_list)">确 认</span></p>
                    </div>
                </div>
    		</div>
    	</div>
    </template>

    <script>
    import { mapActions , mapGetters , mapMutations } from 'vuex'
    import { ERR_OK } from "api/config"
    import { messageOption , passwordPwd } from './components/toolFunction'
    import { smsSend , m_resetPsw , smsCodeVerify } from "api/member/memberApi"
    export default {
    	name: "forgetPassword",
    	data() {
    	    return {
                pageStatus: true,
    	    	re_list:{
                    pwd: "",
                    pwdAgain: "",
    	    		key: "",
    	    		account: "",
                },
                text: "发送验证码",

                re_code: {
                    account: "",
                    phone: "",
                    businessType: 2,
                },

                re_checkCode: {
                    account: "",
                    phone: "",
                    code: "",
                },
                second: 60,
                downSecond: null,
                sendCodeStatus: true,
    		};
    	},
    	created() {
            this.re_code.account = "";
            this.re_list.account = this.global_userName;
            this.re_checkCode.account = this.global_userName;
    	},
        methods: {
            resetPsw(obj){
                if(obj.pwd == "" || !passwordPwd(obj.pwd)){
                    this.$message(messageOption('请输入6-16位数字/字母或组合的新密码！'));return;
                }
                if(obj.pwdAgain != obj.pwd){
                    this.$message(messageOption('两次密码不一致，请重新输入'));return;
                }
                m_resetPsw(obj).then(res=>{
                    if(res.errorCode == ERR_OK){
                        this.$message(messageOption(res.msg));
                        this.$router.push('/');
                    }else{
                        this.$message(messageOption(res.msg));
                    }
                })
            },
            next(obj){
                obj.account = this.re_code.account;
                obj.phone = this.re_code.phone;

                if(obj.account == "" || !(/^[A-Za-z0-9]{4,16}$/.test(obj.account)) ){
                    this.$message(messageOption('请输入4-16位数字/字母或组合的帐号！'));return;
                }
                if(obj.phone == "" || !/^1[3,4,5,7,8]\d{9}$/.test(obj.phone)){
                    this.$message(messageOption('请输入正确的手机号！'));return;
                }
                if(obj.code == "" || !/^\d{6}$/.test(obj.code)){
                    this.$message(messageOption('请输入正确的验证码！'));return;
                }
                let _this = this;
                smsCodeVerify(obj).then(res=>{
                    if(res.errorCode == ERR_OK){
                        this.pageStatus = !this.pageStatus;
                        this.re_list.key = res.datas.key;
                        this.re_list.account = this.re_checkCode.account;
                    }else{
                        this.$message(messageOption(res.msg));
                        _this.resetCodeBtn();
                    }
                })
            },
            sendCode(obj){
                if(!this.sendCodeStatus)return;
                if(obj.account == "" || !(/^[A-Za-z0-9]{4,16}$/.test(obj.account)) ){
                    this.$message(messageOption('请输入正确的账号！'));return;
                }
                if(obj.phone == "" || !/^1[3,4,5,7,8]\d{9}$/.test(obj.phone)){
                    this.$message(messageOption('请输入正确的手机号！'));return;
                }
                let _this = this;
                this.countDown();
                smsSend(obj).then(res=>{
                    this.$message(messageOption(res.msg));
                    if(res.errorCode == ERR_OK){
                        
                    }else{
                        _this.resetCodeBtn();
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
            resetCodeBtn(){
                this.text =  "发送验证码";
                this.second = 60;
                this.sendCodeStatus = true;
                clearInterval(this.downSecond);
            },
            ...mapActions([
                'u_logout'
            ])
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


<template>
    <div class="loginNotice">
        <div class="bannerBox"><img src="./banner.png" alt=""></div>
        <div class="box pageWidth" >
            <div class="title">
                <img src="./logo.png" alt="">
                <h1>规则与协议</h1>
                <div class="btns">
                    <div class="btn iNot" @click="_loginOut">不同意</div>
                    <router-link tag="div" class="btn iGot" to="/">同意</router-link>
                </div>
            </div>
            <hr class="borderLine"/>
            <div class="content">
                
                <h6>一、 本交易协定为本平台所有协议与规则，请会员进入本网站前务必详阅各条规则，若会员点击“同意”进入本网站后，将视为已经接受本网站一切规定。</h6>
                <h6>二、 请定期修改本身帐户的登入密码及资金密码，会员有责任确保自己的帐户以及登入资料的保密性，所以会员帐号在平台上的任何投注，将被视为有效。请不定时的做密码变更修改，确保帐户安全。若帐号被盗用所进行的任何投注提款等，本平台一概不负赔偿责任。</h6>
                <h6>三、 投注条款：</h6>
                <p> 1、投注若未显示投注成功，投注将被视为无效。</p>
                <p> 2、若开奖前玩家已成功投注，自动或强制断线时，并不影响开奖结算之结果。</p>
                <p> 3、若遇到官网未开奖或是开奖号结果错误，本平台将根据实际情况做退奖退单处理。</p>
                <p> 4、若遇到不可抗拒之灾害，例如骇客入侵、网路问题等造成数据丢失之情况，以本公司公告为准。</p>
                <p> 5、若发现会员以不正当手法或透过平台漏洞隐瞒不报等进行投注，造成有损害公司利益的情事发生，本公司有权取消该类注单及其盈利，并停用该会员帐号。</p>
                <p> 6、头彩平台将会对所有的投注注单进行记录，如有任何的争议将以注单记录为准。</p>
                <h6> 四、 若发生官方未开奖的情况，平台将于30分钟后自动撤单，若撤单之后官方才开奖，平台将不予处理。</h6>
                <h6>五、 本平台高频彩每期最高中奖利润300,000元，超出的利润不予发送。低频彩每期最高中奖利润为100,000元，超出的利润不予发送。单挑每注中奖利润最高30,000元，超出的利润不予发送。</h6>
                <p> 1、中奖利润说明：举例投注100万，中奖金额200万，利润为100万，则平台只派发130万奖金。</p>
                <p> 2、单挑模式说明：投注的中奖概率低于或等于1％的均为单挑模式。例如：[五星直选]1000注及以内，[四星直选]100注及以内，[三星直选]10注及以内，[二星直选]1注，[五星组选120]8注及以内，[五星组选60]16注及以内，[五星组选30]33注及以内，[五星组选20]50注及以内，[五星组选10]90注及以内，[五星组选5]90注及以内，[四星组选24]4注及以内，[四星组选12]8注及以内，[四星组选6]16注及以内，[四星组选4]25注及以内，[三星组六]1注，[三星组三]3注及以内......等等。</p>
                <h6>六、 头彩平台官方客服及在线存款服务时间为7*24小时服务机制，提款服务时间不限，取款每日限5次，单次最低取款金额为100元。</h6>
                <h6>七、 为了防止恶意洗钱，会员充值完必须消费充值金额的100％才能提款，不能非法使用别人的银行账户进行头彩充值行为，一经发现，永远冻结。</h6>
                <h6>八、 头彩平台银行帐号或支付宝充值帐号会不定期的做更换，请每次会员充值前务必打开充值页面获取最新的充值帐号，若充值到非公司当时提供之帐号，所造成的任何损失，平台一律不予负责。</h6>
                <h6>九、 头彩平台客服以官方上的联系方式为准，任何非官方联系方式使用户上当受骗，平台一律不予负责。</h6>
                <h6>十、 若头彩平台发现会员有重复申请帐号行为时，保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。</h6>
                <h6>十一、 为了保障客户的账户安全，头彩官方平台客户最新绑定银行卡或更换银行卡后需要8个小时的冷却时间，才能进行提款。</h6>
                <h6>十二、会员帐号若超过90天未登入，且帐户余额小于或等于1元，系统将自动冻结帐号。</h6>
                <h6>十三、 每天凌晨04：00至06：00，平台将进行例行的维护和归档工作，届时平台可能会有些卡顿，影响不大，若因此给您带来不便敬请谅解。</h6>
                <h6>十四、 头彩平台保留不定时修改或增加协定游戏规则或保密条例等的操作权利，更改之条款将从更改发生后立即生效，并保留一切有争议事项及最后的决策权</h6>
            </div>
        </div>
        <div class="foot_info">
            <p>{{l_lotteryWebSiteInfo.siteFooter}}</p>
        </div>
        <PanelPop :content="l_loginNoticeContent" title="消息" v-show="l_isShowLoginNotice" @closePanelPop="closePanelPop"/>
    </div>
</template>


<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import PanelPop from '../panelPop/panelPop'

export default {
    name: 'loginNotice',
    methods:{
        ...mapActions(['u_logout']),

        ...mapMutations({
            setIsShowLoginNotice: 'L_SET_IS_SHOW_NOTICE'
        }),

        _loginOut(){
            this.u_logout();
        },

        closePanelPop() {
            this.setIsShowLoginNotice(false);
        },
    },
    computed:{
        ...mapGetters(['l_loginNoticeContent','l_isShowLoginNotice','l_lotteryWebSiteInfo'])
    },
    components:{
        PanelPop
    }
}
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.loginNotice
    background-image: url('../index/images/bg.png')
    width: 100%
    height: 100%
    padding: 20px 0 40px 0
    .foot_info
        margin-top: 20px
        text-align: center
        font-size: 12px
    .bannerBox
        width: 1000px
        margin: 0 auto
        img
            width: 100%
    .box
        width: 1000px
        margin: 0 auto
        background-color: #fff
        padding: 20px
        box-sizing: border-box
        .title
            text-align: center
            background-color: #fafafa
            padding: 15px
            h1
                font-size: 22px
                color: $color_theme
                line-height: 50px
                font-weight: bold
            .btns
                &>div
                    display: inline-block
                    width: 124px
                    height: 35px
                    line-height: 35px
                    text-align: center
                    border-radius: 20px
                    font-size: 16px
                    color: #fff
                    margin: 0 5px
                    &.iNot
                        background-color: #8c8c8c
                    &.iGot
                        background-color: $color_theme
        .borderLine
            border-top: 1px dashed #8c8c8c
        .content
            text-align: left
            font-size: 12px
            padding: 0 20px
            h3
                text-align: center
                font-size: 18px
                font-weight: bold
                margin: 20px
            h6
                margin: 10px 5px
                font-size: 14px
                line-height: 18px
                font-weight: bold
                padding-left: 25px
                text-indent: -32px
            p
                padding-top: 5px
                line-height: 1.5
                padding-left: 50px
                text-indent: -20px
</style>    

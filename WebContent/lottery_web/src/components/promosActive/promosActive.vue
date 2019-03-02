<template>
  <div class="active">
    <div class="content pageWidth">
      <div class="list">
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_1.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">周周转运</p>
            <p class="listContentRightP2">贴心回馈,周周负盈利大回馈,13888转运金</p>
            <p
              class="listContentRightP3"
            >对于忠实新老会员，我们从不会忘却为答谢广大新老玩家长期以来对本站的支持与信赖。凡是本站新老会员当周负盈利额度达到1001元以上，皆可联系24小时在线客服进行申请转运金，最高可获13888元</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(0)">查看详情>></span>
            </p>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_2.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">玩捕鱼,赢彩金</p>
            <p class="listContentRightP2">玩捕鱼游戏，每日最高可获得1888转运金</p>
            <p
              class="listContentRightP3"
            >即日起(结束时间以官网通知为准)会员以本站进行AG捕鱼王游戏，按照美东时间计算当日亏损1000元以上，次日即可申请相应加油彩金，每日最高可获得1888元转运彩金。</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(1)">查看详情>></span>
            </p>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentRight">
            <p class="listContentRightP1">逢一必送</p>
            <p class="listContentRightP2">每月1,11,21号存款送礼金</p>
            <p class="listContentRightP3">“逢一必送”活动是针对每月1号，11号，21号进行存款的会员，根据不同等级的累计存款金额赠送相应礼金，多存多送。</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(2)">查看详情>></span>
            </p>
          </div>
          <div class="listContentLeft">
            <img src="../index/images/activities_3.jpg" alt>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_4.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">神秘彩金</p>
            <p class="listContentRightP2">随机发放,无门槛,无上限,祝君好运</p>
            <p
              class="listContentRightP3"
            >为回馈广大会员对本公司的支持，公司将不定期派发神秘彩金给予新老会员，彩金没有门槛限制且不设金额上限，只要您在我们网站上注册过账号且绑定了手机号，都有可能收到我们随机派发的惊喜彩金。</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(3)">查看详情>></span>
            </p>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_5.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">不一样的支付</p>
            <p class="listContentRightP2">到账快，不限额，额外赠送1%入款优惠</p>
            <p
              class="listContentRightP3"
            >为了感恩广大彩民一路以来的信任与支持，即日起，凡是通过支付宝，微信这两种方式转账至公司银行卡，额外赠送1%入款优惠。支付宝，微信转账通道稳定，到账及时，全程担保，大额无忧。</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(4)">查看详情>></span>
            </p>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentRight">
            <p class="listContentRightP1">代理加盟</p>
            <p class="listContentRightP2">零费用，零风险，足不出户，月入百万</p>
            <p class="listContentRightP3">代理合作，全国招商，携手共赢！加盟头彩，为梦想创造可能，，让梦想走进现实！代理佣金最高返9%</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(5)">查看详情>></span>
            </p>
          </div>
          <div class="listContentLeft">
            <img src="../index/images/activities_6.jpg" alt>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_7.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">电子救援金</p>
            <p class="listContentRightP2">电子亏损救援金补助，单日最高888元</p>
            <p class="listContentRightP3">即日起，凡投注电子游戏产品的会员，当天内亏损500元以上，即可申请救援彩金，让您重获信心，玩转电子游戏。</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(6)">查看详情>></span>
            </p>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_8.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">周勤礼金</p>
            <p class="listContentRightP2">周周领礼金，可获得88-18888元礼金</p>
            <p class="listContentRightP3">会员在一个自然周内，只要签到指定天数和完成周有效投注，即可申请一定的奖勤礼金</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(7)">查看详情>></span>
            </p>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentRight">
            <p class="listContentRightP1">新会员送彩金</p>
            <p class="listContentRightP2">首次存款赠送海量彩金</p>
            <p
              class="listContentRightP3"
            >新会员首次入款，即送18元彩金，多存多送，最高达1888元。头彩欢迎新会员加入我们，现在起只要你加入我们并完成首次充值100元以上，即可获得派送的幸运彩金，存越多，赠送越多，老品牌值得信赖！</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(8)">查看详情>></span>
            </p>
          </div>
          <div class="listContentLeft">
            <img src="../index/images/activities_9.jpg" alt>
          </div>
        </li>
        <li class="listContent">
          <div class="listContentLeft">
            <img src="../index/images/activities_10.jpg" alt>
          </div>
          <div class="listContentRight">
            <p class="listContentRightP1">微信支付宝转账教程</p>
            <p class="listContentRightP2">简单易学，安全快捷</p>
            <p class="listContentRightP3">微信、支付宝转账到银行卡教程，成功率100%，方便快捷，支付首选！</p>
            <p class="listContentRightP4">
              <span @click="popupStatus = !popupStatus;showDetail(9)">查看详情>></span>
            </p>
          </div>
        </li>
      </div>
    </div>
    <!-- 活动内容弹窗 -->
    <ActivesPopups
      :popupStatus="popupStatus"
      :curImgUrl="curImgUrl"
      @closeActivesPop="closeActivesPop"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ActivesPopups from "../index/activesPopups";
export default {
  name: "promosActive",
  data() {
    return {
      curImgUrl: null,
      popupStatus: false
    };
  },
  created() {},
  methods: {
    ...mapActions(["l_lotteryPromosActive"]),
    showDetail(url) {
      this.curImgUrl = url;
      this.popupStatus = true;
    },
    closeActivesPop() {
      this.popupStatus = false;
    },
    showDetail(index) {
      // this.current = index;
      this.curImgUrl = index;
    }
  },
  components: {
    ActivesPopups
  }
};
</script>

<style lang="sass" scoped>
@import "~common/sass/variable"
.box
    &::-webkit-scrollbar
        width: 10px  
        height: 10px
    &::-webkit-scrollbar-track-piece
        background: #eee
    &::-webkit-scrollbar-thumb
        background: #333
        border-radius: 4px 
img
    display: block
    width: 100%
.active
    width: 100%
    padding: 50px 0 
    background: url("./activeBG.jpg") no-repeat
    background-size: 100% auto
    .popupActive
        z-index: 8
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        .shadow
            z-index: 9
            position: fixed
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: #111
            opacity: 0.7
        .main
            z-index: 10
            width: 970px
            position: fixed
            top: 50%
            left: 0
            right: 0
            margin: 0 auto
            transform: translateY(-50%)
            .inner
                position: relative
                .box
                    width: 100%
                    height: 80%
                    max-height: 400px
                    overflow-y: auto
                .btn
                    z-index: 9
                    position: absolute
                    top: -25px
                    right: -19px
                    width: 50px
                    height: 50px
                    cursor: pointer
                    background: url(./btn.png)
                    background-size: 100% 100%
.content
    .list
        width: 80%
        list-style: none
        padding-top: 333px
        margin: 0px auto
        .listContent
            display: flex
            background: #FF8000
            border-radius: 10px
            letter-spacing: 1px
            margin-bottom: 15px
        .listContentLeft
            flex: 0.3
            margin: 16px
            border: 8px solid #9F5000
        .listContentRight
            flex: 0.7
            margin: 16px
            .listContentRightP1
                color: #FFF
                margin-bottom: 10px
                font-size: 18px
                font-weight: 600
            .listContentRightP2
                color: #FFF
                margin-bottom: 10px
                font-size: 16px
                font-weight: 300
            .listContentRightP3
                color: #FFF
                margin-bottom: 10px
                font-size: 14px
                font-weight: 300
                line-height: 150%
            .listContentRightP4
                span
                  background: #FFD306
                  font-size: 12px
                  padding: 3px
                  border-radius: 4px
                  cursor: pointer
</style>

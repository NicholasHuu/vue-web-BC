<template>
  <div
    class="asideRight"
    :class="{'ani':isOpen}"
    @mouseenter="_clickOpen"
    @mouseleave="_clickClose"
  >
    <ul class="mCeTB">
      <li>
        <img src="./kf.png" alt>
        <h2>在线客服</h2>
        <span class="btn zx mCeLR" @click="openNewWindow(l_lotteryWebSiteInfo.helpLink)">立即咨询</span>
      </li>
      <li>
        <img src="./tel.png" alt>
        <h2>联系电话</h2>
        <h1>{{l_lotteryWebSiteInfo.siteTel}}</h1>
      </li>
      <li>
        <img src="./qq.png" alt>
        <h2>客服QQ</h2>
        <h1 class="btn">
          <a
            target="_blank"
            :href="'http://wpa.qq.com/msgrd?v=3&uin='+l_lotteryWebSiteInfo.siteQq+'&site=qq&menu=yes'"
          >{{l_lotteryWebSiteInfo.siteQq}}</a>
        </h1>
      </li>
      <li>
        <h2>微信客服</h2>
        <img src="../index/images/kfQrCode.jpg" class="code_img_img" alt>
        <!-- <qrcode-vue :value="l_lotteryWebSiteInfo.siteWeixin" :size="size" class="code_img"></qrcode-vue> -->
      </li>
      <!-- <li>
              <h2>下载APP</h2>
              <img src="../index/images/qrcode.png" class="code_img_img" alt="">
      </li>-->
    </ul>
    <div class="arrow btn mCeTB">
      <img src="./arrow.png" class="ce" :class="{'open':isOpen}" alt>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { mapGetters } from "vuex";

export default {
  name: "asideRight",
  data() {
    return {
      isOpen: false,
      size: 65
    };
  },
  methods: {
    _clickOpen() {
      this.isOpen = true;
    },
    _clickClose() {
      this.isOpen = false;
    },
    fastRecharge() {
      if (!this.global_userName) {
        this.setLoginPopIsShow(true);
      } else {
        this.$router.push({ path: "/member/charge" });
      }
    }
  },
  computed: {
    ...mapGetters(["l_lotteryWebSiteInfo", "global_userName"])
  },
  components: {
    QrcodeVue
  }
};
</script>


<style lang="sass" scoped>
@import '~common/sass/variable'

.asideRight
    width: 163px
    height: 100%
    position: fixed
    z-index: 7
    right: 0
    right: -163px\0
    top: 0
    transition: all .5s
    background-color: $color_text_white
    transform: translate3d(163px,0,0)
    &.ani
        transform: translate3d(0,0,0)
        right: 0\0
    .arrow
        position: absolute
        background-image: url('arrowBg.png')
        width: 24px
        left: -24px
        height: 88px
        transition: all .5s
        transform: rotate(180deg)
        img
            transform: rotate(0)
            &.open
                transform: rotate(180deg)
    ul
        width: 100%
        height: 460px
        li
            height: 115px
            text-align: center
            width: 100%
            border-bottom: 1px solid #ebebeb
            line-height: 20px
            position: relative
            padding-top: 10px
            box-sizing: border-box
            .code_img_img
                width: 65px
                height: 65px
            img
                vertical-align: middle
            h2
                font-size: 14px
                color: #666
            h1
                font-size: 18px
                color: $color_theme
                margin-top: 10px
                font-weight: bold
                a
                    color: $color_theme
            p
                font-size: 12px
                color: #666
            .zx
                width: 100px
                display: block
                height: 20px
                background-color: $color_theme
                font-size: 12px
                color: $color_text_white
                text-align: center
                line-height: 20px
                border-radius: 25px
</style>

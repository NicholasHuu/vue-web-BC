<template>
  <div class="wrapper">
    <div class="mobile" :style="{'background-size': sty+'px 100%'}">
      <div class="content pageWidth" ref="page">
        <div class="left">
          <div class="title">
            <h1>头彩独家手机端</h1>
            <h2>随时随地想玩就玩</h2>
          </div>
          <div class="tl">
            <p>我们的手机投注平台面向全网玩家，提供近百款老虎机·百家乐·以及彩票游戏投注，线上存款及线上取款，一键操作，运用3D即时运算创造真实场景结合立体影像，完整规划的跨系统娱乐平台，整合同步帐号和资料传输，达到随时随地不间断娱乐的享受概念。</p>
          </div>
          <div class="qrCodeBox">
            <h2>扫一扫下载APP</h2>
            <div class="imgBox">
              <img src="../index/images/qrcode.png" alt>
            </div>
            <p>全面支持IOS Android等移动端</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "mobile",
  data() {
    return {
      // sty: ""
      sty: 0
    };
  },
  created() {},
  mounted() {
    // this.widthSet();
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    init() {
      let _this = this;
      window.onresize = () => {
        return (() => {
          // _this.widthSet();
        })();
      };
    }
    // widthSet() {
    //   let a = this.$refs.page.getBoundingClientRect().left + 5;
    //   this.sty = a > 150 ? a : 150;
    // }
  }
};
</script>


<style lang="sass" scoped>
.wrapper
    background: url('bg-repeat.png') repeat
.mobile
    height: 844px
    background: url('bg_2.png') no-repeat
    background-position: right
    .content
        height: 100%
        padding: 30px 0
        background: url('bg_1.png') no-repeat
        background-size: 869px 100%
        background-position: right
        box-sizing: border-box
        .left
            float: left
            .title
                position: relative
                margin-top: 90px
                padding-left: 100px
                text-align: left
                &:after
                    content: ''
                    position: absolute
                    top: 3px
                    left: 0
                    width: 86px
                    height: 86px
                    background: url(./icon.png)
                    background-size: 100% 100%
                h1
                    margin-bottom: 8px
                    font-size: 50px
                    font-weight: bold
                    color: #36384a
                h2
                    font-size: 30px
                    font-weight: bold
                    color: #36384a
            .tl
                display: inline-block
                width: 460px
                margin-top: 20px
                line-height: 20px
                color: #909090
                text-align: left
            .qrCodeBox
                width: 230px    
                margin: 30px 0
                text-align: center
                h2
                    font-size: 24px
                    font-weight: bold
                    color: #36384a
                .imgBox
                    width: 100%
                    padding:  20px 0
                    img
                        width: 100%
       
</style>

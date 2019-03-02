<template>
    <div class="panelPop">
        <div class="box">
            <div class="title">
                <div class="name">{{title}}</div>
                <i @click="closePop" class="close el-icon-close btn"></i>
            </div>
            <div class="content" v-html="content"></div>
            <div class="btnGroup">
                <div class="btn callbackSure" @click="callbackSure" v-show="btnsInfo.suerBtn.isShow">{{btnsInfo.suerBtn.name}}</div>&nbsp;&nbsp;
                <div class="btn callbackCancel" @click="callbackCancel" v-show="btnsInfo.cancelBtn.isShow">{{btnsInfo.cancelBtn.name}}</div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
  name: "panelPop",
  props:{
      title:{
          type: String,
          default: "标题"
      },
      content:{
          type: String,
          default: "内容"
      },
      btnsInfo:{
          type: Object,
          default(){
              return {
                  suerBtn: {
                      name: "确认",
                      isShow: true,
                      callbackName: 'closePanelPop'
                  },
                  cancelBtn: {
                      name: "取消",
                      isShow: false,
                      callbackName: 'closePanelPop'
                  }
              }
          }
      }
  },
  methods:{
      closePop(){
          this.$emit('closePanelPop');
      },

      callbackSure(){
          console.log(this.btnsInfo.suerBtn.callbackName)
          this.$emit(this.btnsInfo.suerBtn.callbackName);
      },
      callbackCancel(){
          this.$emit(this.btnsInfo.cancelBtn.callbackName)
      }
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.panelPop
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 10
    background-color: rgba(0,0,0,.7)
    .box
        width: 900px
        position: fixed
        display: table
        max-height: 500px
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto 
        background-color: $color_text_white
        .title
            height: 45px
            line-height: 45px
            background-color: $color_theme
            padding: 0 20px
            width: 900px
            box-sizing: border-box
            display: inline-block
            .name
                color: #fff
                font-size: 24px
            .close
                color: #fff
                float: right
                font-size: 24px
                transform: rotate(0deg)
                transition: all .3s
                position: relative
                top: -32px
                &:hover
                    transform: rotate(180deg)
        .content
            overflow-y: auto
            padding: 15px
            max-height: 405px
            box-sizing: border-box
            &::-webkit-scrollbar
                width: 5px  
                height: 5px
            &::-webkit-scrollbar-track-piece
                background: #eee
            &::-webkit-scrollbar-thumb
                background: #333
                border-radius: 4px 
        .btnGroup
            height: 50px
            text-align: center
            line-height: 50px
            .btn
                width: 100px
                height: 30px
                line-height: 30px
                text-align: center
                font-size: 14px
                margin: 7px auto
                display: inline-block
            .callbackSure
                color: $color_text_white
                background-color: $color_theme
            .callbackCancel
                background-color: #999
                color: $color_text_white
</style>

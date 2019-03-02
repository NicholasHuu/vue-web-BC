<template>
    <div class="noticePop">
        <div class="box">
            <div class="title">
                <div class="name">{{title}}</div>
                <span class="sTitle">{{curItem.title}}</span>
                <i @click="closePop" class="close el-icon-close btn"></i>
            </div>
            <div class="content">
                <div class="listBox">
                    <ul>
                        <li @click="selectItem(item)" :class="{'active': item == curItem}" class="item btn" v-for="(item,index) in dataList.resultList" :key="index">
                            <span class="name">{{item.title}}</span>
                            <p>{{item.createTime}}</p>
                        </li>
                    </ul>
                    <div class="chengeData">
                        <img class="prev btn" @click="prevPage" src="./next.png" alt="">
                        <span>{{curPage}}/{{dataList.totalPages}}</span>
                        <img class="next btn" @click="nextPage" src="./next.png" alt="">
                    </div>
                </div>
                <div class="listContent" v-html="curItem.content"></div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: "noticePop",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    dataList: {
      type: [Array, Object],
      default: []
    },
  },
  data() {
    return {
      curItem: {
        content: "",
        title: ""
      },
      curPage: 1
    };
  },
  methods: {
    closePop() {
      this.$emit("closeNoticePop");
    },

    selectItem(item) {
      this.curItem = item;
    },

    prevPage() {
        if(this.curPage>1){
            this.curPage--;
            this.$emit('switchPage',this.curPage)
        }
    },
    nextPage() {
        if(this.curPage<this.dataList.totalPages){
            this.curPage++;
            this.$emit('switchPage',this.curPage)
        }
    }
  },
  watch: {
    dataList: function() {
      this.curItem = this.dataList.resultList[0];
    }
  }
};
</script>


<style lang="sass" scoped>
@import "~common/sass/variable"

.noticePop
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 10
    background-color: rgba(0,0,0,.7)
    .box
        width: 957px
        height: 562px
        position: fixed
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto 
        overflow: hidden
        background-color: $color_text_white
        .title
            height: 45px
            line-height: 45px
            display: inline-block
            box-sizing: border-box
            width: 100%
            background-color: $color_theme
            padding: 0 20px
            .sTitle
                display: inline-block
                color: #fff
                font-size: 14px
                font-weight: bold
                margin-left: 20px
                text-align: center
                float: left
                width: 750px
            .name
                color: #fff
                float: left
                display: inline-block
                font-size: 24px
            .close
                color: #fff
                font-size: 24px
                float: right
                position: relative
                top: 7px
                transform: rotate(0deg)
                transition: all .3s
                &:hover
                    transform: rotate(180deg)
        .content
            overflow: hidden
            height: 514px
            margin-top: -2px
            box-sizing: border-box
            .listBox
                width: 205px
                background-color: #f2f2f2
                display: inline-block
                .chengeData
                    height: 37px
                    line-height: 37px
                    background-color: #f2f2f2
                    width: 205px
                    position: absolute
                    text-align: center
                    bottom: 0
                    left: 0
                    span
                        font-size: 14px
                        color: #666
                        margin: 0 20px
                    .btn
                        vertical-align: middle
                    .next
                        transform: rotate(180deg)
                .item
                    box-sizing: border-box
                    height: 60px
                    padding: 10px
                    overflow: hidden
                    text-overflow: ellipsis
                    font-size: 14px
                    line-height: 20px
                    border-bottom: 1px dashed #e2e2e4
                    .name
                        color: #666
                        height: 17px
                        overflow: hidden
                        text-overflow: ellipsis
                        display: block
                        white-space: nowrap
                    p
                        color: #999999
                    &:hover,&.active
                        background-color: #cc3a3a
                        .name
                            color: $color_text_white
                        p
                            color: rgba(255,255,255,.5)
            .listContent
                padding: 15px
                width: 752px
                height: 517px
                box-sizing: border-box
                float: right
                overflow-y: auto
                &::-webkit-scrollbar
                    width: 5px  
                    height: 5px
                &::-webkit-scrollbar-track-piece
                    background: #eee
                &::-webkit-scrollbar-thumb
                    background: #333
                    border-radius: 4px 
</style>

<template>
    <div class="spare">
        <div class="wrapper">
            <div class="box pageWidth">
                <!-- <div class="bannerBox">
                    <img src="./banner.png" alt="">
                </div> -->
                <div class="content">
                    <ul class="">
                        <!-- <li v-for="(item,index) in webSeitList" :key="index">
                            <span class="index">NO{{index+1}}</span>
                            <span class="tips">备用网址</span>
                            <div class="address" >{{item}}</div>
                            <div class="btn copy" v-clipboard:copy="item" 
                            v-clipboard:success="onCopy" 
    						v-clipboard:error="onError">进入网址</div>
                        </li> -->
                        <li v-for="(item,index) in webSeitList" :key="index">
                            <div class="inner">
                                <span class="index">NO{{index+1}}<i class="borderInner"></i></span>
                                <span class="tips"></span>
                                <div class="address">{{item}}</div>
                                <a class="btn copy" target="_blank" :href="'http://'+item">进入</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="people"></div>
            </div>
        </div>
    </div>
</template>


<style lang="sass" scoped>
@import "~common/sass/variable"

.spare
    width: 100%
    height: 100%
    background: url(./bgg.png) no-repeat
    background-size: 100% 100%
    .wrapper
        padding: 153px 0 20px 0
        margin-top: -1px
        overflow: hidden
    .bannerBox
        width: 800px
        height: auto
        img
            width: 100%
    .box
        position: relative
        padding-top: 10px
        .content
            position: relative
            width: 800px
            min-height: 500px
            margin: 10px 0
            padding: 14px
            box-sizing: border-box
            background-color: $color_text_white
            ul
                width: 100%
                margin: 0 auto
                li
                    height: 40px
                    line-height: 40px
                    margin-bottom: 10px
                    font-size: 14px
                    color: #666666
                    .inner
                        width: 80%
                        background: #f5f5f5
                    .index
                        position: relative
                        display: inline-block
                        width: 120px
                        padding-right: 14px
                        font-weight: bold
                        color: $color_theme
                        background: #e7e7e7
                        text-align: center
                        .borderInner
                            z-index: 1
                            position: absolute
                            bottom: -1px
                            right: 0
                            border-left: 30px solid transparent
                            border-bottom: 40px solid #f5f5f5
                    .tips
                    .address
                        display: inline-block
                        width: 360px
                        font-weight: bold
                        color: $color_theme
                        text-align: center
                        a
                            color: $color_theme
                    .copy
                        display: inline-block
                        z-index: 1
                        position: relative
                        width: 85px
                        height: 26px
                        line-height: 26px
                        text-align: center
                        color: $color_text_white
                        &:after
                            z-index: -1
                            content: ""
                            position: absolute
                            top: 0
                            left: 0
                            width: 100%
                            height: 100%
                            background: $color_theme
                            transform: skew(-30deg)
        .people
            position: absolute
            top: 10px
            right: 0
            width: 400px
            height: 100%
            background: url(./people.png)
            background-size: 100% 100%
</style>


<script>
import {mapGetters} from 'vuex'

export default {
    name: 'spare',
    data(){
        return{
            webSeitList:[]
        }
    },
    created(){
        this.webSeitList = this.l_lotteryWebSiteInfo.siteReserveDomain.split(',');
    },
    methods:{
        onCopy(){
            this.$message({type: "info",
                            showClose: false,
                            customClass: "g_messageTips",
                            message: "复制成功",
                            duration: 2500,
                            center: true});
        },
		onError (e) {
            this.$message({type: "info",
                            showClose: false,
                            customClass: "g_messageTips",
                            message: "浏览器不支持复制，请手动复制！",
                            duration: 2500,
                            center: true});
		},
    },
    computed:{
        ...mapGetters(['l_lotteryWebSiteInfo'])
    }
}
</script>

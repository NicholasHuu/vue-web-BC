<template>
  <div class="active">
    <div class="content pageWidth">
      <!-- <div class="top">
        <img src="./logo.png" alt>
      </div>-->
      <div class="list">
        <div class="section" @click="showDetail()"></div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus">
      <div class="shadow" @click="popupStatus = !popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <img :src="curImgUrl" alt>
          </div>
          <div class="btn" @click="popupStatus = !popupStatus"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { ERR_OK } from "api/config";
export default {
  name: "promosActive",
  data() {
    return {
      //   dataList: [],
      curImgUrl: "",
      popupStatus: false
    };
  },
  created() {
    this._getActiveList();
  },
  methods: {
    ...mapActions(["l_lotteryPromosActive"]),
    showDetail(url) {
      this.curImgUrl = url;
      this.popupStatus = true;
    }
    // showMaxImg(item, index) {
    //   item.isShowMaxImg = !item.isShowMaxImg;
    //   if (item.isShowMaxImg) {
    //     this.$refs["item" + index][0].lastChild.style.height =
    //       this.$refs["item" + index][0].lastChild.children[0].clientHeight +
    //       "px";
    //   } else {
    //     this.$refs["item" + index][0].lastChild.style.height = 0;
    //   }
    //   console.log(this.$refs["item" + index][0].lastChild.style.height);
    // },

    // _getActiveList() {
    //   this.l_lotteryPromosActive().then(res => {
    //     if (res && res.errorCode == ERR_OK) {
    //       this.dataList = res.datas.resultList;
    //       this.dataList.forEach((item, index) => {
    //         this.$set(item, "isShowMaxImg", false);
    //       });
    //     } else {
    //       this.$alert(res.msg, "温馨提示", {
    //         confirmButtonText: "确定",
    //         type: "error",
    //         center: true,
    //         lockScroll: false
    //       });
    //     }
    //   });
    // }
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
        .top
            width: 420px
            margin: 0 auto 50px
        .list
            .section
                position: relative
                width: 1000px
                height: 300px
                margin: 0 auto 50px
                &:before,&:after
                    z-index: 4
                    content: ''
                    position: absolute
                    bottom: -110px
                    left: -90px
                    width: 90px
                    height: 200px
                    background: url(./icon.png) no-repeat
                &:after
                    right: -90px
                    left: unset
                    transform: rotateY(180deg)
            .section:last-child
                &:before,&:after
                    display: none
</style>

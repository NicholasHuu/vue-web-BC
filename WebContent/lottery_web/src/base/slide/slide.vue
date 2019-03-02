<template>
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <slot></slot>
        <!-- Optional controls -->
        <div class="swiper-pagination" v-show="paginationIsShow" slot="pagination"></div>
      </swiper>
      <!-- Add Arrows -->
      <div v-show="swiperButtonIsShow" :class="['swiper-button-next' ,'swiper-button-next'+swiperButtonClass]"></div>
      <div v-show="swiperButtonIsShow" :class="['swiper-button-prev','swiper-button-prev'+swiperButtonClass]"></div>  
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "slide",
  props: {
    swiperButtonIsShow:{
      type: Boolean,
      default:false
    },
    swiperButtonClass:{
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    paginationIsShow: {
      type: Boolean,
      default: false
    },
    slidesPerView:{
      type: Number,
      default: 1
    },
    slidesPerColumn:{
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: this.autoplay,
        loop: this.loop,
        slidesPerView : this.slidesPerView,
        slidesPerColumn: this.slidesPerColumn,
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: false,
        pagination: {
          el: ".swiper-pagination",
          bulletActiveClass: "bulletActiveClass",
          bulletClass : 'my-bullet',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="'+className+" " +className+"_"+index+ '"></span>';
          },
        },

        navigation:{
          nextEl: '.swiper-button-next'+this.swiperButtonClass,
          prevEl: '.swiper-button-prev'+this.swiperButtonClass,
        },
        paginationClickable: true,
        mousewheelControl: true,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        thumbs: {
          swiper: this.swiper
        },
        on: {
          slideChangeTransitionEnd: () => {
            if (this.$refs.mySwiper.swiper) {
              this.$emit(
                "slideChangeTransitionEnd",
                this.$refs.mySwiper.swiper.activeIndex
              );
            }
          }
        }
      }
    };
  },
  mounted(){

  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  components: {
    swiper
  }
};
</script>

<style lang="sass" scoped>
.swiper-container
    z-index: 1
    position: absolute
    top: 0
    bottom: 0
    height: 100%
    width: 100%
    overflow: hidden
.swiper-button-next
  z-index: 3
  background-image: url("./swiper-button-next.png")
  &:focus
    outline: 0
.swiper-button-prev
  z-index: 3
  background-image: url("./swiper-button-prev.png")
  &:focus
    outline: 0
.swiper-button-nexttrendBox
  right: -20px
.swiper-button-prevtrendBox
  left: -20px
</style>

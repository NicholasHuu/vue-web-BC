<template>
  <div class="page-option">
    <div class="left fl">
      每页
      <Select v-model="defaultPageLimit" @change="changeLimit" placeholder="请选择">
        <Option
          v-for="item in set_pageLimit"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></Option>
      </Select>&#12288;条 共
      <span>{{totalNumber}}</span> 条 第
      <span>{{curPage}}</span>/
      <span>{{totalPage}}</span>页
    </div>
    <div class="right">
      <div class="homePage" @click="homePage">首页</div>
      <div class="prePage" @click="prePage">上一页</div>
      <div class="curPage">{{curPage}}/{{totalPage}}</div>
      <div class="nextPage" @click="nextPage">下一页</div>
      <div class="endPage" @click="endPage">尾页</div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import { mapGetters } from "vuex";
import { messageOption } from "./toolFunction";
export default {
  name: "pageOption",
  data() {
    return {
      defaultPageLimit: 0,
      handleVariate: {
        currentPage: this.curPage,
        pageLimit: 0
      }
    };
  },
  created() {
    this.defaultPageLimit = this.set_defaultPageLimit;
    this.handleVariate.pageLimit = this.set_defaultPageLimit;
  },
  methods: {
    changeLimit(value) {
      this.handleVariate.pageLimit = value;
      this.handleVariate.currentPage = 1;
      this.$emit("callPage", this.handleVariate);
    },
    homePage() {
      if (this.handleVariate.currentPage == 1) {
        return;
      }
      this.handleVariate.currentPage = 1;
      this.$emit("callPage", this.handleVariate);
    },
    prePage() {
      if (this.totalPage == 0) {
        return;
      }
      if (this.handleVariate.currentPage == 1) {
        this.$message(messageOption("当前页是第一页！"));
        return;
      }
      this.handleVariate.currentPage =
        Number(this.handleVariate.currentPage) - 1;
      this.$emit("callPage", this.handleVariate);
    },
    nextPage() {
      if (this.totalPage == 0) {
        return;
      }
      if (this.handleVariate.currentPage == this.totalPage) {
        this.$message(messageOption("已经是最后一页"));
        return;
      }
      this.handleVariate.currentPage =
        Number(this.handleVariate.currentPage) + 1;
      this.$emit("callPage", this.handleVariate);
    },
    endPage() {
      if (this.totalPage == 0) {
        return;
      }
      if (this.handleVariate.currentPage == this.totalPage) {
        this.$message(messageOption("已经是最后一页"));
        return;
      }
      this.handleVariate.currentPage = this.totalPage;
      this.$emit("callPage", this.handleVariate);
    }
  },
  computed: {
    ...mapGetters({
      set_pageLimit: "set_pageLimit",
      set_defaultPageLimit: "set_defaultPageLimit"
    })
  },
  props: {
    totalNumber: {
      type: [Number, String],
      default: ""
    },
    totalPage: {
      type: [Number, String],
      default: ""
    },
    callPage: {
      type: Function,
      default: function() {}
    },
    curPage: {
      type: [Number, String],
      default: 1
    }
  },
  watch: {
    curPage: function() {
      this.handleVariate.currentPage = this.curPage;
    }
  },
  components: {
    Select,
    Option
  }
};
</script>


<style lang="sass" scoped>
.pageSwitch
		padding: 20px
		background: #eee
.page-option
		position: relative
		font-size: 13px
		text-align: center
		.el-select
			width: 70px
		.left
			position: absolute
			top: 0
			left: 0
			line-height: 20px
		input
			width: 74px
			text-align: center
		.right
			font-size: 12px
			user-select: none
			&>div
				display: inline-block
				padding: 7px 10px
				margin: 0 3px
				border: 1px solid #7e7e7e
				border-radius: 4px
				cursor: pointer
				color: #4c4c4c
			.curPage
				background-color: #e74140
				color: white
				border: 1px solid #e74140
</style>



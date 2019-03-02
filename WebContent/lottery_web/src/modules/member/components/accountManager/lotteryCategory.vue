<template>
  <div class="lottery-category clearfix">
    <HeaderNav :data="listlist"></HeaderNav>
    <div class="lottery-category-nav">
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="{active: activeIndex == index}"
          @click="switchInfo(index,item.lotteryCode)"
        >{{item.lotteryName}}</li>
      </ul>
    </div>
    <div class="lottery-category-content">
      <div class="inner">
        <table>
          <thead>
            <tr>
              <td width="120">玩法群</td>
              <td width="120">玩法组</td>
              <td>玩法</td>
              <td>销售状态</td>
              <td>高奖金</td>
              <td>高返点</td>
            </tr>
          </thead>

          <tbody v-html="dynamicHtml"></tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../headerNav";
import { mapGetter, mapState, mapActions } from "vuex";
import {
  m_lotteryCategory,
  m_lotteryCategoryDetail
} from "api/member/memberApi";
import { ERR_OK } from "api/config";
import { messageOption } from "../toolFunction";
export default {
  name: "lotteryCategory",
  data() {
    return {
      listlist: ["彩种信息"],
      activeIndex: 0,
      list: [],
      data: [],
      dynamicHtml: ""
    };
  },
  created() {
    m_lotteryCategory().then(res => {
      if (res.errorCode == ERR_OK) {
        this.list = res.datas.lotteryMenuList;
        this.switchInfo(0, this.list[0].lotteryCode);
      } else {
        console.log(res.msg);
      }
    });
  },
  methods: {
    switchInfo(index, lotteryCode) {
      this.activeIndex = index;
      //重新获取表格数据

      m_lotteryCategoryDetail(lotteryCode).then(res => {
        if (res.errorCode == ERR_OK) {
          this.data = res.datas.gameGroup;

          var sumTotal = {};
          for (var i = 0; i < this.data.length; i++) {
            var s1Item = this.data[i];

            sumTotal[s1Item["code"]] = 0;

            for (var j = 0; j < s1Item["groupDetails"].length; j++) {
              var s2Item = s1Item["groupDetails"][j];

              sumTotal[s2Item["code"]] = 0;
              for (var k = 0; k < s2Item["games"].length; k++) {
                sumTotal[s2Item["code"]]++;
                sumTotal[s1Item["code"]]++;
              }
            }
          }

          var html = [];
          for (var i = 0; i < this.data.length; i++) {
            var s1Item = this.data[i];

            for (var j = 0; j < s1Item["groupDetails"].length; j++) {
              var s2Item = s1Item["groupDetails"][j];

              for (var k = 0; k < s2Item["games"].length; k++) {
                var finalArr = s2Item["games"][k];
                html.push("<tr>");
                if (j == 0 && k == 0) {
                  html.push(
                    '<td rowspan="' +
                      sumTotal[s1Item["code"]] +
                      '">' +
                      s1Item["name"] +
                      "</td>"
                  );
                }
                if (k == 0) {
                  html.push(
                    '<td rowspan="' +
                      sumTotal[s2Item["code"]] +
                      '">' +
                      s2Item["name"] +
                      "</td>"
                  );
                }
                html.push("<td>" + finalArr.name + "</td>");
                html.push("<td>" + finalArr.saleDesc + "</td>");
                html.push("<td>" + finalArr.gj + "</td>");
                html.push("<td>" + finalArr.gf + "</td>");
                html.push("</tr>");
              }
            }
          }
          this.dynamicHtml = html.join("");
        } else {
          this.$message(messageOption(res.msg));
        }
      });
    },

    ...mapActions([])
  },
  computed: {
    ...mapState({})
  },
  components: {
    HeaderNav
  }
};
</script>

<style lang="sass" scoped>
@import '~common/sass/variable'
.lottery-category
	position: relative
	// padding: 30px
	min-height: 400px
.lottery-category-nav
	display: inline-block
	width: 160px
	border: 1px solid #ccc
	ul
		
		li
			height: 35px
			line-height: 35px
			padding-left: 12px
			text-align: left
			border-top: 1px solid #ccc
			font-size: 14px
			cursor: pointer
			border-right: 0
			user-select: none
			&:first-child
				border-top: 0
		.active
			position: relative
			color: #f12
			border-right: 0
			background: #efefef
			box-sizing: border-box
			&:before
				content: ""
				display: block
				position: absolute
				top: -1px
				left: -1px
				width: 4px
				height: 36px
				background: #f12
.lottery-category
	.lottery-category-content
		float: right
		width: 846px
		height: 100%
		min-height: 400px
		box-sizing: border-box
		table
			width: 100%
			text-align: center
			tbody
				background: #fff
				font-size: 12px
			td
				padding: 10px 0
				border: 1px solid #909090

</style>



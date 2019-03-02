import Vue from "vue";
import Router from "vue-router";

const TrendContainer = resolve => require(['@/modules/trend/trendContainer'], resolve);


export default {
  path: "/lotts/:lottsCode/trend",
  name: "TrendContainer",
  component: TrendContainer,
  meta: {
      title: "走势图"
  }
};

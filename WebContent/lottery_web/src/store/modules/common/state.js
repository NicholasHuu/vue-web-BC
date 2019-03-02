import { loadHomeMenuList } from "common/js/cache";
const state = {
  c_homeMenuList: loadHomeMenuList(),
  c_formObject_homeMenuList: {},

  c_otherGameList: [
    {
      value: "",
      label: "选择全部"
    },
    {
      value: 1,
      label: "真人"
    },
    {
      value: 2,
      label: "电子"
    },
    {
      value: 3,
      label: "体育"
    },
    {
      value: 4,
      label: "捕鱼"
    }
  ],
  c_otherGameList_prifitLoss: [
    {
      value: "live",
      label: "真人"
    },
    {
      value: "electronic",
      label: "电子"
    },
    {
      value: "sport",
      label: "体育"
    },
    {
      value: "fish",
      label: "捕鱼"
    }
  ],
  c_otherGameList_prifitLoss0: [
    {
      value: 1,
      label: "真人"
    },
    {
      value: 2,
      label: "电子"
    },
    {
      value: 3,
      label: "体育"
    },
    {
      value: 4,
      label: "捕鱼"
    }
  ]
};

export default state;

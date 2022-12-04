import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
export const groupPurchaseStore = defineStore("groupPurchase", {
  state: () => {
    return {
      currentGroupPurchase: Taro.getStorageSync("groupPurchase") || {},
    };
  },
  getters: {},
  actions: {
    updateCurrentGroupPurchase(val) {
      Taro.setStorageSync("groupPurchase", val);
      this.currentGroupPurchase = val;
    },
  },
});

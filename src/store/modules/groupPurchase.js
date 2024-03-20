import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
import { getGroupPurchaseDetail } from "@/api/groupPurchase";
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
    async getGroupPurchaseDetail() {
      let obj = {
        // groupPurchaseId: "294306576527921152",
        // name: "特惠午餐",
        // status: "0",
        // discount: 9,
        minDeliveryPrice: 15.0,
        // startTime: "2023-10-06 00:00:00",
        // endTime: "2023-10-06 23:59:59",
        deliveryTime: "[1696561200015,1696568400050]",
        // mosaicRange: "[1,59]",
        // orderNum: 0,
        // orderStatus: "2",
        // cycleUse: 1,
        // remark: null,
        // createTime: "2023-10-06T01:00:00",
        // updateTime: "2023-10-06T01:00:00",
        // tribeList: null,
      };
      if (this.currentGroupPurchase.groupPurchaseId) {
        await getGroupPurchaseDetail(this.currentGroupPurchase.groupPurchaseId).then(
          (res) => {
            if (res.result) {
              obj = res.result;
              obj.mosaicRange = JSON.parse(obj.mosaicRange);
              obj.deliveryTime = JSON.parse(obj.deliveryTime);
              obj.isEndGroupBuying = Date.now() - new Date(obj.endTime).getTime() > 0;
            }
          }
        );
      }
      this.updateCurrentGroupPurchase(obj);
    },
  },
});

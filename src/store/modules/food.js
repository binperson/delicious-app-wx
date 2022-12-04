import { defineStore } from "pinia";
import { getFoodListByPage } from "@/api/sell";
import moment from 'moment';
export const foodStore = defineStore("food", {
  state: () => {
    return {
      allFoodList: [],
    };
  },
  getters: {},
  actions: {
    getAllFoodList() {
      getFoodListByPage({
        pageNo: 1,
        pageSize: 100,
      }).then((res) => {
        const arr = res.result?.records || [];
        arr.forEach((item) => {
          item.album = JSON.parse(item.album);
          item.picUrl = JSON.parse(item.picUrl);
          item.avatar = DELI_BASE_URL_FILE + item.picUrl[0]
          item.endTime = moment(item.endTime).valueOf()
          item.startTime = moment(item.startTime).valueOf()
        });
        this.allFoodList = arr;
      });
    },
  },
});

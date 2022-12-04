import { defineStore } from "pinia";
import { getTribeList } from "@/api/system";
import Taro from "@tarojs/taro";

const calculateDis = (p1, p2) => {
  dx = Math.abs(p2.latitude - p1.latitude);
  dy = Math.abs(p2.longitude - p1.longitude);
  const dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  return dis
};

const getTribeListLast = (tribeList, arr) => {
  for (let i = 0; i < tribeList.length; i++) {
    const coordinatesArr = tribeList[i].coordinates.split(",");
    tribeList[i].latitude = coordinatesArr[0];
    tribeList[i].longitude = coordinatesArr[1];
    if (tribeList[i].children?.length > 0) {
      getTribeListLast(tribeList[i].children, arr);
    } else {
      arr.push(tribeList[i]);
    }
  }
};

export const tribeStore = defineStore("tribe", {
  state: () => {
    return {
      tribeList: [],
      tribeListLast: [],
      currentTribe: Taro.getStorageSync("currentTribe") || {}
    };
  },
  getters: {},
  actions: {
    getTribeList(location) {
      getTribeList({}).then((res) => {
        this.tribeList = res.result;
        const tribeListLast = [];
        getTribeListLast(this.tribeList, tribeListLast);
        tribeListLast.sort((a, b) => {
          return calculateDis(a, location) - calculateDis(b, location)
        });

        this.tribeListLast = tribeListLast
      });
    },
  },
});

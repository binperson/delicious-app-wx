import Taro from "@tarojs/taro";
import { getRegionAllData } from "@/api/system";
import QQMapWX from "@/utils/qqmap-wx-jssdk.min";
const qqmapsdk = new QQMapWX({
  key: "JEABZ-PXW6D-CDD47-PXGOX-JDDP5-X3BAQ",
});

export const getAuthority = (flag, bc) => {
  if (!flag) {
    wx.showModal({
      content: "检测到您没打开定位权限，是否去设置打开？",
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userLocation"] === false) {
                getAuthority(res.authSetting["scope.userLocation"], bc);
              } else {
                bc();
              }
            },
          });
        } else {
          getAuthority(false, bc);
        }
      },
    });
  } else {
    bc();
  }
};
// 获取经纬度
export const authToGetLocation = () => {
  return new Promise((resolve) => {
    Taro.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.userLocation"]) {
          Taro.authorize({
            scope: "scope.userLocation",
            success: () => {
              Taro.getLocation({
                type: "wgs84",
                success: (res) => {
                  resolve(res);
                },
              });
            },
            fail: () => {
              getAuthority(false, () => {
                Taro.getLocation({
                  type: "wgs84",
                  success: (res) => {
                    resolve(res);
                  },
                });
              });
            },
          });
        } else {
          Taro.getLocation({
            type: "wgs84",
            success: (res) => {
              resolve(res);
            },
          });
        }
      },
    });
  });
};

export const getData = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      sig: "77ZjWJBxaFto0c76nL3JzEqzvIxeJWD", // 必填
      location: { latitude, longitude },
      // location: {latitude: '29.343034', longitude: '105.901424'},
      success(res) {
        getRegionAllData().then((data) => {
          let regionData = JSON.parse(data.value);
          for (let i = 0; i < regionData.length; i++) {
            for (let j = 0; j < regionData[i].items.length; j++) {
              if (
                res.result.ad_info.adcode === regionData[i].items[j].regionCode
              ) {
                resolve({
                  data: res,
                  region: regionData[i].items[j],
                });
                return;
              }
            }
          }
          resolve({
            data: res,
            region: {
              id: 371,
              parentId: 24,
              regionCode: "510100",
              regionName: "成都市",
              support: true,
              title: "c",
            },
          });
          // Taro.setStorageSync('loca_city', res.result.ad_info.city)
        });
      },
      fail(err) {
        reject(err);
        Taro.showToast({
          title: "获取城市失败",
          icon: "success",
          duration: 2000,
        });
      },
      complete() {
        // 做点什么
      },
    });
  });
};

export default {
  pages: [
    "pages/auth/login/index",
    "pages/buying/index",
    "pages/pay/index",
    "pages/order/index",
    "pages/order-detail/index",
    "pages/main/invite/index",
    "pages/main/home/index",
    "pages/test/index",
    "pages/main/select-tribe/index",
    "pages/statement/policy/index",
    "pages/statement/protocol/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
    disableScroll: true,
  },
  plugins: {
    chooseLocation: {
      version: "1.0.9",
      provider: "wx76a9a06e5b4e693e",
    },
    citySelector: {
      version: "1.0.1",
      provider: "wx63ffb7b7894e99ae",
    },
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示",
    },
  },
  requiredPrivateInfos: ["chooseAddress"],
};

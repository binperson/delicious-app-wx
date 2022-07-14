export default {
  pages: [
    "pages/order-detail/index",
    "pages/order/index",
    "pages/main/home/index",
    "pages/pay/index",
    "pages/main/select-tribe/index",
    "pages/buying/index",
    "pages/main/invite/index",
    "pages/auth/login/index",
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
};

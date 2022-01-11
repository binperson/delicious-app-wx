import Taro from "@tarojs/taro";
export const goUrl = (url) => {
  console.log(url);
  Taro.navigateTo({
    url,
  });
};

export const back = () => {
  Taro.navigateBack({
    delta: 1,
  });
};

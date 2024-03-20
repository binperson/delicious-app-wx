import Taro from "@tarojs/taro";
export const goUrl = (url) => {
  Taro.navigateTo({
    url,
  });
};

export const back = () => {
  Taro.navigateBack({
    delta: 1,
  });
};

export const telPhoneTransform = (tel) => {
  if (tel) {
    tel = tel.toString();

    return tel.substr(0, 3) + "****" + tel.substr(7);
  }
  return tel
};

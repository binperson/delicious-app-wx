import api from "@/utils/request";

// 添加购物车商品
export function addCartItem(data) {
  return api.post({
    url: `/cart/addCartItem/${data.skuId}`,
  });
}

// 删除购物车商品
export function removeCartItem(data) {
  return api.delete({
    url: `/cart/removeCartItem/${data.skuId}`,
  });
}

// 查询购物车
export function getCart() {
  return api.get({
    url: `/cart/getCart`,
  });
}

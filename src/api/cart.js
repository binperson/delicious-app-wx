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

// 订单确认
export function confirmOrder() {
  return api.post({
    url: `/orders/_confirm`,
  });
}

// 订单提交
export function submitOrder(data) {
  return api.post({
    url: `/orders/_submit`,
    data
  });
}

// 订单支付

export function payOrder(orderId) {
  return api.post({
    url: `/orders/${orderId}/_pay`,
    data
  });
}

// 删除购物车
export function deleteCart() {
  return api.post({
    url: `/cart/deleteCart`
  });
}

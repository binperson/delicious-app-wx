import api from "@/utils/request";

// PENDING_PAYMENT( code: 101， text:"待支付")， 
// USER_CANCEL(code: 102，text:"用户取消")，
// AUTO_CANCEL(code:103，text:"系统自动取消")，
// PAYED(code:201, text:"已支付") 
// APPLY_REFUND( code:202， text:"申请退款")， 
// REFUNDED(code:203, text:“已退款")， 
// DELIVERED(code:301. text:"已发货")， 
// USER_RECEIVE( code: 401, text:"用户收货")， 
// AUTO_RECEIVEC code: 402， text:"系统自动收货")，

// FINISHED(code:901，text:"已完成")，
// 获取团购列表
export function getOrderPage(data) {
  return api.post({
    url: `/orders/getOrderPage`,
    data,
  });
}

// 获取订单详情
export function getOrderPageById(orderId) {
  return api.post({
    url: `/orders/getOrder/${orderId}`,
  });
}

// 微信支付接口
// export function wxPayPrepay(data) {
//   return api.post({
//     url: `/wxPay/prepay`,
//     data
//   });
// }

// export function wxPayPrepay(data) {
//   return api.post({
//     url: `/wxPay/applet/prepay`,
//     data
//   });
// }
// api.post({
//   url: `/orders/${r.result.orderSn}/_pay?payType=1`,
// })

// 订单支付
export function orderPay(data) {
  return api.post({
    url: `/orders/_pay`,
    data
  });
}
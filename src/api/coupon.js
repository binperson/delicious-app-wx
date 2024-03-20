import api from "@/utils/request";

// 添加购物车商品
export function getMemberCoupon(data) {
  return api.post({
    url: `/coupon/getMemberCoupon`,
    data
  });
}

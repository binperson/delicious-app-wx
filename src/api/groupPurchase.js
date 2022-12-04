import api from "@/utils/request";

// 获取团购列表
export function getPmsGroupPurchaseList(data) {
  return api.post({
    url: `/pmsGroupPurchase/getPmsGroupPurchaseList`,
    data
  });
}

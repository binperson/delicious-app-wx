import api from "@/utils/request";

// 获取团购列表
export function getPmsGroupPurchaseList(data) {
  return api.post({
    url: `/groupPurchase/list`,
    data
  });
}


// 获取团购详情
export function getGroupPurchaseDetail(groupPurchaseId) {
  return api.post({
    url: `/groupPurchase/get/${groupPurchaseId}`
  });
}

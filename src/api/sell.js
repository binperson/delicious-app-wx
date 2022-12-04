import api from "@/utils/request";

// 商品列表
export function getFoodListByPage(data) {
  return api.post({
    url: `/pmsSpu/getPmsSpuPage`,
    data,
  });
}

// 分类列表
export function getFoodGroupListByPage() {
  return api.post({
    url: `/pmsCategory/getCategoryList`,
    data: {},
  });
}

import api from "@/utils/request";
// 获取邀请列表
export function getInviteList(data) {
  return api.post({
    url: `/member/getInviteList`,
    data,
  });
}

// 获取当前会员信息
export function getCurrentMember(data) {
  return api.post({
    url: `/member/getCurrentMember`,
    data,
  });
}

// 获取会员积分
export function getMemberPointsPage(data) {
  return api.post({
    url: `/member/points/page`,
    data,
  });
}

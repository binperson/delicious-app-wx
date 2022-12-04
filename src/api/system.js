import api from "@/utils/request";

// export function getUserInfo() {
//   return api.get({
//     url: `/portal/system/getTribeList`,
//   });
// }

export function getTribeList(data) {
  return api.post({
    url: `/tribe/getTribeList`,
    data
  });
}

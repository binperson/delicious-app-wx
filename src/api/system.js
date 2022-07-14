import api from "@/utils/request";

export function getUserInfo() {
  return api.get({
    url: `/portal/system/getTribeList`,
  });
}

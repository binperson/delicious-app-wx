import api from "@/utils/request";

export function getPlanList() {
  return api.get({
    url: `/portal/sell/getPlanList`,
  });
}

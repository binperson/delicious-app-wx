import api from '@/utils/request'

// 微信登录
export function authLoginWechat (data) {
  return api.post({
    url: '/portal/auth/wx/login',
    data
  })
}

export function getUserInfo () {
  return api.get({
    url: `/portal/user/info`
  })
}

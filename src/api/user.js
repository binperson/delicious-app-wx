import api from '@/utils/request'

// 微信登录
export function authLoginWechat (data) {
  return api.post({
    url: '/wxLogin',
    data
  })
}
// export function authLoginWechat (data) {
//   return api.post({
//     url: '/wxLogin',
//     data
//   })
// }
// export function authLoginWechat ({code, encryptedData, iv}) {
//   return api.post({
//     url: `/wxLogin?jsCode=${code}&encryptedData=${encryptedData}&iv=${iv}`,
//   })
// }
export function getUserInfo () {
  return api.get({
    url: `/portal/user/info`
  })
}

export function formatDate (date, fmt) {
    if (!date) {
      return formatDate(new Date().getTime(), 'yyyy-MM-dd')
    }
    let locDate = new Date(parseInt(date))
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (locDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    var o = {
      'M+': locDate.getMonth() + 1, // 月份
      'd+': locDate.getDate(), // 日
      'h+': locDate.getHours(), // 小时
      'm+': locDate.getMinutes(), // 分
      's+': locDate.getSeconds(), // 秒
      'q+': Math.floor((locDate.getMonth() + 3) / 3), // 季度
      'S': locDate.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (locDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
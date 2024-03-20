export function formatDate(date, fmt) {
  if (!date) {
    return formatDate(new Date().getTime(), "yyyy-MM-dd");
  }
  let locDate = new Date(parseInt(date));
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (locDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  var o = {
    "M+": locDate.getMonth() + 1, // 月份
    "d+": locDate.getDate(), // 日
    "h+": locDate.getHours(), // 小时
    "m+": locDate.getMinutes(), // 分
    "s+": locDate.getSeconds(), // 秒
    "q+": Math.floor((locDate.getMonth() + 3) / 3), // 季度
    S: locDate.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (locDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

export function subsectionTime(SJD, cishu) {
  function getTime(data){
      var _data = data;
      //如果是13位正常，如果是10位则需要转化为毫秒
      if (String(data).length == 13) {
          _data = data
      } else {
          _data = data*1000
      }
      const time = new Date(_data);
      const Y = time.getFullYear();
      const Mon = ik_pd(time.getMonth() + 1);
      const Day = ik_pd(time.getDate());
      const H = ik_pd(time.getHours());
      const Min = ik_pd(time.getMinutes());
      const S = ik_pd(time.getSeconds());
      function ik_pd(datas) {
          if(datas.toString().length == 1){
              return "0" + datas;
          }else{
              return datas;
          }
      }
      return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
  }
  SJD[0] = SJD[0] > Date.now() ? SJD[0] : Date.now()
  var xiangchabi = parseInt((SJD[1] - SJD[0]) / cishu);
  var SJD_json = [];
  for(var i = 0;i<cishu;i++){
    var dq_sjc = (xiangchabi * i) + SJD[0];
    SJD_json[i] = formatDate(dq_sjc, 'hh:mm');
  }
  SJD_json.push(formatDate(SJD[1], 'hh:mm'))
  return SJD_json;
}

export function getGroupTime(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length-1) {
       newArray.push(array.slice(index, index+subGroupLength));
       index+=1;
  }
  return newArray;
}
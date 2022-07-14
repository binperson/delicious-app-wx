import { resultSuccess } from "./_util";

const tribeList = (() => {
  const result = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      tribeName: ["重庆市", "深圳市", "四川省"][index],
      manager: "@name",
      phone: "0592-268888888",
      orderNo: index + 1,
      createTime: "@datetime",
      remark: "@cword(10,20)",
      "status|1": ["0", "0", "1"],
      children: (() => {
        const children = [];
        for (let j = 0; j < 3; j++) {
          children.push({
            id: `${index}-${j}`,
            tribeName: ["渝北区", "渝中区", "江北区"][j],
            manager: "@name",
            phone: "0592-268888888",
            orderNo: j + 1,
            createTime: "@datetime",
            remark: "@cword(10,20)",
            "status|1": ["0", "1"],
            parentTribe: `${index}`,
            children: (() => {
              const children = [];
              for (let m = 0; m < 4; m++) {
                children.push({
                  id: `${index}-${j}-${m}`,
                  tribeName: [
                    `互联网产业园一期${index}-${j}-${m}栋`,
                    `互联网产业园一期${index}-${j}-${m}栋`,
                    `互联网产业园一期${index}-${j}-${m}栋`,
                    `互联网产业园二期${index}-${j}-${m}栋`,
                  ][j],
                  manager: "@name",
                  phone: "0592-268888888",
                  orderNo: j * 10 + m + 1,
                  createTime: "@datetime",
                  remark: "@cword(10,20)",
                  "status|1": ["0", "1"],
                  parentTribe: `${index}-${j}`,
                  children: undefined,
                });
              }
              return children;
            })(),
          });
        }
        return children;
      })(),
    });
  }
  return result;
})();

const planList = (() => {
  const result = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      orderNo: `${index + 1}`,
      name: '@first',
      'status|1': ['0', '1'],
      endTime: '@datetime',
      range: [50, 120],
      currentOrder: 60,
      orderStatus: [index % 3],
      tribe: ['0-0-0'],
      deliveryTime: '@datetime',
      createTime: '@datetime',
      description: '@cword(10,20)',
    });
  }
  return result;
})()

const userInfo = (() => {
  const result = {
    avatar: '',
    phone: '19923199509'
  }

  return result;
})()

export default {
  "GET /portal/system/getTribeList": resultSuccess(tribeList),
  "GET /portal/sell/getPlanList": resultSuccess(planList),
  "POST /portal/auth/wx/login": resultSuccess(userInfo),
};

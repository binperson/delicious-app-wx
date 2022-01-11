import Taro from "@tarojs/taro";
/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response) {
  // 登录失效状态
  if (response.statusCode === 401) {
    
    let pages = Taro.getCurrentPages();
    let currPage;
    if (pages.length) {
      currPage = pages[pages.length - 1];
    }
    Taro.clearStorageSync();
    
    let str = ''
    for (let i in currPage.options) {
      str += `${i}=${currPage.options[i]}&`
    }
    str = str.substring(0, str.length - 1)

    Taro.navigateTo({
      url: `/pages/auth/login/index?redirect=/${currPage.route}&${str}`
    });
  }
  return response.data;
}

// 上传图片
export function uploadImg (path) {
  const token = Taro.getStorageSync(DELI_TOKEN_NAME);
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `${DELI_BASE_URL}/admin/file/upload`,
      filePath: path,
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-larbor-token' :`${token}`
      },
      success: res => {
        let url = JSON.parse(res.data).value
        resolve(url)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}



/**
 * 检查返回值是否正常
 * @param data
 * @returns {*}
 */
function checkSuccess(data, resolve) {
  if (data instanceof ArrayBuffer && typeof data === "string") {
    return data;
  }
  if (data.code !== 0 && data.code !== 9 && data.code === '') {
    Taro.showToast({
      title: data.msg ? data.msg : '未知错误，请联系管理员',
      icon: 'none'
    })
  }
  
  return resolve(data);
}

export function handleError (result, r, j) {
  if (result.code === 0) {
    r(result)
  } else {
    if (result.code === 9 ||result.code === 3 ) {
      r(result)
      return
    }
    Taro.showToast({
      title: result.msg ? result.msg : '未知错误，请联系管理员',
      icon: 'none'
    }).then(res => {
      if (j) {
        j(result)
      }
    })
  }
}

// 上传图片
export function uploadFile (path, type) {
  const token = Taro.getStorageSync(DELI_TOKEN_NAME);
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `${DELI_BASE_URL}/uploads/images?imageType=${type}`,
      filePath: path,
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-larbor-token' :`${token}`
      },
      success: res => {
        let url = JSON.parse(res.data).data.cloudUrl
        resolve(url)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 请求错误处理
 * @param error
 * @param reject
 */
function throwError(error, reject) {
  if (error.errMsg) {
    reject("服务器正在维护中!");
    throw new Error("服务器正在维护中!");
  }
  throw error;
}

export default {
  request(options, method) {
    const { url } = options;
    const token = Taro.getStorageSync(DELI_TOKEN_NAME);
    let timer = setTimeout(() => {
      Taro.showLoading({
        mask: true,
        title: "加载数据中..."
      });
    }, 3000)
    return new Promise((resolve, reject) => {
      Taro.request({
        ...options,
        method: method || "GET",
        url: `${DELI_BASE_URL}${url}`,
        header: {
          "content-type": "application/json",
          'x-larbor-token' :`${token}`,
          ...options.header
        }
      })
        .then(checkHttpStatus)
        .then(res => {
          checkSuccess(res, resolve);
          clearTimeout(timer);
          Taro.hideLoading();
        })
        .catch(error => {
          throwError(error, reject);
          clearTimeout(timer);
          Taro.hideLoading();
        });
    });
  },
  get(options) {
    return this.request({
      ...options
    });
  },
  post(options) {
    return this.request(
      {
        ...options,
        data: options.data
      },
      "POST"
    );
  },
  put(options) {
    return this.request(
      {
        ...options,
        data: options.data
      },
      "PUT"
    );
  },
  delete(options) {
    return this.request(
      {
        ...options,
        data: options.data
      },
      "DELETE"
    );
  }
};
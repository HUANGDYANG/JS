const baseUrl = 'https://xcx.paoding.cc'
const isDebug = true


const $post = (url, data, contentType = false) => {
  isDebug && console.info('请求的数据', data, '请求的接口', url)
  contentType ? (contentType = 'application/x-www-form-urlencoded;') :
    (contentType = 'application/json;charset=UTF-8')
  return we.request({
    url: baseUrl + url, // 开发者服务器接口地址",
    data: data, // 请求的参数",
    method: 'POST',
    header: {
      'content-type': contentType,
      siteId: '2'
    },
    dataType: 'json' // 如果设为json，会尝试对返回的数据做一次 JSON.parse
  })
}

const $get = (url, data) => {
  isDebug && console.info('请求的数据', data, '请求的接口', url)
  return we.request({
    url: baseUrl + url,
    header: {
      siteId: '2'
    },
    data: data,
    method: 'GET',
    dataType: 'json'
  })
}

const $ARequest = (url, data, method = 'GET', header = {}) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: Object.assign(header, {
        'accessToken': wx.getStorageSync('activityToken') || ''
      }),
      data: data,
      method: method,
      dataType: 'json',
      success: function (data) {
        resolve(data)
      },
      fail: function (data) {
        if (typeof reject == 'function') {
          reject(data);
        } else {
          console.log(data);
        }
        wx.showToast({
          title: '服务器错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  })
}

const api = {
  upload(file) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${baseUrl}/file/upload`,
        filePath: file,
        header: {
          accessToken: wx.getStorageSync('token')
        },
        success(res) {
          const data = JSON.parse(res.data)
          let statusCode = res.statusCode + ''
          let code = data.code + ''
          if (statusCode.startsWith('2') && code.startsWith('0')) {
            resolve(data)
          }
        },
        name: 'file',
        complete(res) {
          console.log(res)
        }
      })
    })
  }
}

export {
  baseUrl,
  isDebug,
  $post,
  $get
}
export default api
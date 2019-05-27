import wepy from 'wepy'
const baseUrl = 'https://xcx.paoding.cc'
// https://xcx.paoding.cc
// http://192.168.1.232:8082
const isDebug = true

//  拦截器请求配置 app.wpy => constructor中配置
const requestConfig = {
  // 发出请求时的回调函数
  config(p) {
    wx.showNavigationBarLoading()
    p.timestamp = +new Date()
    // debugger
    if (this.globalData.accessToken || wx.getStorageSync('accessToken')) {
      p.header = Object.assign({}, p.header, {
        accessToken: this.globalData.accessToken || wx.getStorageSync('accessToken')
      })
    }
    // isDebug && console.log('config request: ', p)
    return p
  },
  success(p) {
    // 可以在这里对收到的响应数据对象进行加工处理
    isDebug && console.info('request success: ', p.data)
    let statusCode = p.statusCode + ''
    let code = p.data.code + ''
    // statusCode.startsWith('2') && p.data.code === 9000
    if (statusCode.startsWith('2') && p.data.code === 1008) {
      wepy
        .showModal({
          content: '请先进行登录操作', // 提示的内容,
          showCancel: false, // 是否显示取消按钮,
          confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#2565C3' // 确定按钮的文字颜色,
        })
        .then(res => {
          wx.redirectTo({
            url: '/pages/wxInfo'
          })
        })
      return false
    }

    if (statusCode.startsWith('2') && !code.startsWith('0')) {
      if (code === '404') {
        return false
      }
      // if (code === '9999') {
      //   return false
      // }
      // if (code === '500') {
      //   return false
      // }
      // console.log(statusCode, code)
      wx.showToast({
        icon: 'none',
        title: p.data.message,
        duration: 1000
        // mask: true
      })
      return false
    }
    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return p.data
  },
  fail(p) {
    wx.showToast({
      icon: 'none',
      title: p.data.message,
      duration: 1000
      // mask: true
    })
    isDebug && console.log('request fail: ', p)
    return p
  },
  complete(p) {
    // isDebug && console.log('request complete: ', p)
    wx.hideNavigationBarLoading()
  }
}

const $post = (url, data, contentType = false) => {
  isDebug && console.info('请求的数据', data, '请求的接口', url)
  contentType ? (contentType = 'application/x-www-form-urlencoded;') :
    (contentType = 'application/json;charset=UTF-8')
  return wepy.request({
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
  return wepy.request({
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
  requestConfig,
  baseUrl,
  isDebug,
  $post,
  $get
}
export default api
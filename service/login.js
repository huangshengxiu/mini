import request from './network.js';
export function getItem(key) {
  return new Promise((resolve, reject) => {
    resolve(wx.getStorageSync(key))
  })
}

export function setItem(key, data) {
  return new Promise((resolve, reject) => {
    resolve(wx.setStorageSync(key, data))
  })
}

export function removeItem(key) {
  return new Promise((resolve, reject) => {
    resolve(wx.removeStorageSync(key));
  })
}

export function checkToken(token) {
  return request({
    url: '/users/checkToken',
    method: 'post',
    header: {
      'content-type': 'application/json',
      'token': token,
    }
  })
}

export function getcode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res.code)
      },
      fail: function () {
        reject()
      }
    })
  })
}

export function getopenid(code) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      code: code
    }
  })
}

export function getsetting() {
  return new Promise((resolve, reject) => {
    wx.getsetting({
      success: res => {
        resolve(res)
      },
      fail: reject('shibai')
    })
  })
  // if (res.authSetting['scope.userInfo']) {
  //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //   wx.getUserInfo({
  //     success: res => {
  //       // 可以将 res 发送给后台解码出 unionId
  //       this.globalData.userInfo = res.userInfo
  //     }
  //   })
  // }
}
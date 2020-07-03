//获取应用实例
import { getItem, setItem, getcode, getopenid, checkToken, removeItem } from '../../service/login.js'

const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onShow: function () {
    getItem('TOKEN').then(res1 => {
      // token存在
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            getItem('userInfo').then(res3 => {
              this.setData({
                userInfo: res3,
                hasUserInfo: true
              })
            })
          } else {
            getItem('userInfo').then(res3 => {
              this.setData({
                userInfo: res3,
                hasUserInfo: true
              })
              wx.showModal({
                title: "提醒",
                content: '登录过期啦，请重新登录！',
                showCancel: false,
                confirmText: "确定",
                success: res => {
                  removeItem('userInfo');
                  removeItem('TOKEN');
                  this.setData({
                    hasUserInfo: false,
                    userInfo: {}
                  })
                }
              })
            })
          }
        })
      }
      // token不存在
      else {
        this.setData({
          hasUserInfo: false,
          userInfo: {}
        })
      }
    })
  },



  getUserInfo: function (e) {
    // console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      let userinfo = e.detail.userInfo;
      app.globalData.userInfo = userinfo;
      getcode().then(res1 => {
        getopenid(res1).then(res2 => {
          this.setData({
            userInfo: userinfo,
            hasUserInfo: true,
            bookcase: true
          })
          setItem('userInfo', userinfo);
          setItem("TOKEN", res2.token)
        })
      })
    } else {

    }
  },

  toBookCase: function () {
    wx.navigateTo({
      url: '/pages/bookcase/bookcase'
    })
  },

  toAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

})
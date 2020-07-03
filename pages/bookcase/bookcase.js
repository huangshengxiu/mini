// pages/bookcase/bookcase.js
import { getUseBook, addUseBook, deleteUseBook } from '../../service/userbook.js';
import { getItem, setItem, getcode, getopenid, checkToken, removeItem } from '../../service/login.js'
import {
  baseURL
} from '../../service/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseURL: baseURL,
    bookcase: [],
    showtxt: ''
  },

  onShow: function () {
    getItem('TOKEN').then(res1 => {
      // token存在
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            this._getUseBook(res2.data.openid)
          } else {
            wx.showModal({
              title: "提醒",
              content: '登录过期啦，请重新登录！',
              showCancel: false,
              confirmText: "确定",
              success: res => {
                this.setData({
                  bookcase: [],
                  showtxt: '登录失效啦'
                })
              }
            })
          }
        })
      }
      // token不存在
      else {
        wx.showModal({
          title: "提醒",
          content: '请先登录！',
          showCancel: false,
          confirmText: "确定",
          success: res => {
            this.setData({
              bookcase: [],
              showtxt: '您还未登录哦'
            })
          }
        })
      }
    })
  },

  deletebook: function (event) {
    let index = event.currentTarget.dataset.index;
    let bookname = event.currentTarget.dataset.name;
    console.log(index)
    getItem('TOKEN').then(res1 => {
      // token存在
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            wx.showModal({
              title: "提醒",
              content: '确定要从书架移除该书吗？',
              cancelText: '取消',
              confirmText: "确定",
              success: res => {
                if (res.confirm) {
                  this._deleteUseBook(res2.data.openid, bookname);
                  let list = this.data.bookcase;
                  list.splice(index, 1);
                  this.setData({
                    bookcase: list
                  })
                }
              }
            })
          } else {
            wx.showModal({
              title: "提醒",
              content: '登录过期啦，请重新登录！',
              showCancel: false,
              confirmText: "确定",
              success: res => {
                this.setData({
                  bookcase: [],
                  showtxt: '登录失效啦'
                })
              }
            })
          }
        })
      }
    })
  },

  toDetail: function (event) {
    let bookname = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../books/detail/detail?name=' + bookname
    })
  },

  _deleteUseBook: function (username, bookname) {
    deleteUseBook(username, bookname).then(res => {
      if (res.status == 9021) {

      } else {

      }
    })
  },

  _getUseBook: function (username) {
    getUseBook(username).then(res => {
      if (res.status == 9001) {
        this.setData({
          bookcase: res.data,
        })
      } else {
        this.setData({
          bookcase: []
        })
      }
    })
  }

})
// pages/books/searchbook/searchbook.js

import {
  throttle
} from '../../../utils/util.js';
import {
  searchBook
} from '../../../service/book.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusInput: true,
    inputValue: '',
    searchlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getData: throttle(function (e) {
    let searchMsg = e.detail.value;
    let reg = /[^\u4e00-\u9fa5]/g;
    let result = searchMsg.replace(reg, '');
    if (result) {
      if (this.data.inputValue != result) {
        this._searchBook(result);
      }
    }
    else {
      this.setData({
        searchlist: []
      });
    }
    this.setData({
      inputValue: result
    });
  }, 600),

  commitclick: function () {

  },

  cancelclick: function () {
    this.setData({
      inputValue: '',
      searchlist: [],
      focusInput: false
    })
  },

  clearInput: function () {
    this.setData({
      inputValue: '',
      searchlist: [],
      focusInput: true
    })
  },

  toDetail: function (event) {
    console.log(event.currentTarget.dataset.name);
    let bookname = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../detail/detail?name=' + bookname
    })
  },

  _searchBook: function (name) {
    searchBook(name).then(res => {
      if (res.status == 6000) {
        this.setData({
          searchlist: res.data
        })
      } else {
        this.setData({
          searchlist: []
        })
      }
    })
  }

})
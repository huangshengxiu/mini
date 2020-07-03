// pages/books/category/category.js
import {
  getbooklist
} from '../../../service/book.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorylist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.category)
    let category = options.category;
    this._getbooklist(category);
  },

  toDetail: function (event) {
    console.log(event.currentTarget.dataset.name);
    let bookname = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../detail/detail?name=' + bookname
    })
  },

  _getbooklist: function (name) {
    getbooklist(name).then(res => {
      if (res.status = 6600) {
        this.setData({
          categorylist: res.data
        })
      }
    })
  }

})
// pages/books/books.js
import {
  getContent, getRecommend
} from '../../service/book.js';
import {
  formatTxt,
  filterTxt
} from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconlist: [
      { name: '中医经典', url: '/assets/images/iconlist/jindian.png' },
      { name: '难经典籍', url: '/assets/images/iconlist/nan.png' },
      { name: '内经典籍', url: '/assets/images/iconlist/nei.png' },
      { name: '金匮典籍', url: '/assets/images/iconlist/jin.png' },
      { name: '伤寒典籍', url: '/assets/images/iconlist/shang.png' },
      { name: '温病典籍', url: '/assets/images/iconlist/wen.png' },
      { name: '医案医论', url: '/assets/images/iconlist/yi.png' },
      { name: '诊法典籍', url: '/assets/images/iconlist/zhen.png' }
    ],
    recommendlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getRecommend();

  },

  tosearchbook: function () {
    wx.navigateTo({
      url: './searchbook/searchbook'
    })
  },

  changebook: function () {
    this._getRecommend();
  },

  clickInfo: function (event) {
    let category = event.currentTarget.dataset.msg;
    wx.navigateTo({
      url: './category/category?category=' + category,
    })
  },

  toDetail: function (event) {
    let bookname = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: './detail/detail?name=' + bookname
    })
  },

  _getRecommend: function () {
    getRecommend().then(res => {
      if (res.status == 6700) {
        this.setData({
          recommendlist: res.data
        })
      }
    })
  }


})
// pages/books/detail/detail.js
import { getIntroduction, getBookChapter } from '../../../service/book.js';
import { inUseBook, addUseBook, deleteUseBook } from '../../../service/userbook.js';
import { filterinfo } from '../../../utils/util.js';
import { getItem, setItem, getcode, getopenid, checkToken, removeItem } from '../../../service/login.js'
import {
  baseURL
} from '../../../service/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    book_img: '',
    book_name: '',
    canscroll: true,
    notInclude: true,
    info: [],
    directory: {},
    onetext: "登录过期啦，请重新登录！",
    twotext: "您还未登录，是否要登录？",
    dirFrom: 'detail'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookname = options.name;
    this.setData({
      book_name: bookname
    })
    this._getInfo(bookname);
    getItem('TOKEN').then(res1 => {
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            this._inUseBook(res2.data.openid, this.data.book_name)
          } else {
            removeItem('userInfo');
            removeItem('TOKEN');
            this.setData({
              notInclude: true,
            })
          }
        })
      }
      // token不存在
      else {
        this.setData({
          notInclude: true,
        })
      }
    })
  },

  onReady: function () {
    this.directory = this.selectComponent('#directory');
    this.modalone = this.selectComponent('#modalone');
    this.modaltwo = this.selectComponent('#modaltwo');
  },

  showDir: function () {
    this.directory.showDirectory();
    this.setData({
      canscroll: false
    })
  },

  changeInclude: function () {
    getItem('TOKEN').then(res1 => {
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            this._inUseBook(res2.data.openid, this.data.book_name)
          }
        })
      }
    })
  },

  addbook: function () {
    getItem('TOKEN').then(res1 => {
      // token存在
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            let url = this.data.bookInfo.book_img;
            this._addUseBook(res2.data.openid, this.data.book_name, url)
          } else {
            this.modalone.showModal();
          }
        })
      }
      // token不存在
      else {
        this.modaltwo.showModal();
      }
    })
  },

  removebook: function () {
    getItem('TOKEN').then(res1 => {
      // token存在
      if (res1) {
        checkToken(res1).then(res2 => {
          if (res2.status == 100) {
            this._deleteUseBook(res2.data.openid, this.data.book_name)
          } else {
            this.modalone.showModal();
          }
        })
      }
      // token不存在
      else {
        this.modaltwo.showModal();
      }
    })
  },

  toRead: function () {
    let index = 1;
    wx.navigateTo({
      url: '../reader/reader?bookname=' + this.data.book_name + '&id=' + index,
    })
  },

  resetscroll: function () {
    this.setData({
      canscroll: true
    })
  },

  _getInfo: function (name) {
    getIntroduction(name).then(res => {
      if (res.status == 6500) {
        this.setData({
          bookInfo: res.data,
          book_img: baseURL + res.data.book_img,
          info: filterinfo(res.data.presentation)
        })
        this._getdir(res.data.book_name);
      }
    })
  },

  _getdir: function (bookname) {
    getBookChapter(bookname).then(res => {
      if (res.status == 6100) {
        this.setData({
          directory: res.data
        })
      }
    })
  },

  _inUseBook: function (username, bookname) {
    inUseBook(username, bookname).then(res => {
      if (res.status == 9041) {
        this.setData({
          notInclude: false,
        })
      } else {
        this.setData({
          notInclude: true,
        })
      }
    })
  },

  _deleteUseBook: function (username, bookname) {
    deleteUseBook(username, bookname).then(res => {
      if (res.status == 9021) {
        this.setData({
          notInclude: true,
        })
      } else {
        this.setData({
          notInclude: false,
        })
      }
    })
  },

  _addUseBook: function (username, bookname, url) {
    addUseBook(username, bookname, url).then(res => {
      if (res.status == 9011) {
        this.setData({
          notInclude: false,
        })
      } else {
        this.setData({
          notInclude: true,
        })
      }
    })
  }

})
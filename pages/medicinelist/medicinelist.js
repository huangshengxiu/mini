// pages/medicinelist/medicinelist.js

import {
  getCategoryList, getByName, getByPy, getByEff
} from '../../service/medicinelist.js';
const TOP_DISTANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    pages: 1,
    size: 20,
    topPosition: 0,
    searchTxt: '',
    name: 'medicine_name',
    page: 'tcmImg',
    type: 'all',
    showSearchTxt: true,
    showBackTop: false,
    showEnding: false,
    isShow: true,
    searchResult: [],
    tempSearchResult: [],
    medicinelist: [],
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取navigator传过来的参数
    let title = options.title;
    this.setData({
      title: title
    });
    this._getProductData();
  },

  onReady: function () {
    this.componentTitle = this.selectComponent('#title')
  },

  loadMore: function () {
    if (this.data.type == 'all') {
      this._getProductData();
    }
  },

  scrollPosition(e) {
    const position = e.detail.scrollTop;
    const flag = position >= TOP_DISTANCE;
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  },

  onBackTop() {
    this.setData({
      topPosition: 0
    })
  },

  // 输入内容即时搜索
  getData: function (data) {
    let name = data.detail.name;
    let key = data.detail.key;
    if (key == '名称') {
      this._getByName(name);
    } else if (key == '拼音') {
      this._getByPy(name);
    } else {
      this._getByEff(name);
    }
  },

  confirmData: function (data) {
    let confirmTxt = data.detail.name;
    let key = data.detail.key;
    this.setData({
      searchTxt: confirmTxt,
      medicinelist: this.data.tempSearchResult,
      showEnding: true,
      showBackTop: false,
      type: '',
      keyword: key
    })
    this.componentTitle.setData({
      showCategory: false
    })
  },

  showWhich: function (data) {
    this.setData({
      isShow: !data.detail
    })
  },

  resetData: function () {
    this.setData({
      pages: 1,
      medicinelist: [],
      type: 'all',
      showEnding: false
    })
    this._getProductData();
  },

  toDetail: function (event) {
    let page = this.data.page;
    let name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/detail/medicine/medicine?name=' + name + '&page=' + page
    });
  },

  _getProductData() {
    // 1.获取数据对应的页码
    const pages = this.data.pages;
    // 2.请求数据
    getCategoryList(this.data.title, pages, this.data.size).then(res => {
      if (res.status == 2300) {
        const list = res.data;
        const medicine = this.data.medicinelist;
        medicine.push(...list)
        this.setData({
          medicinelist: medicine,
          pages: pages + 1
        })
        if (res.data.length < this.data.size) {
          this.setData({
            showEnding: true
          })
        }
      } else {
        this.setData({
          showEnding: true
        })
      }
    })
  },

  _getByName(name) {
    getByName(name, this.data.title).then(res => {
      if (res.status == 2400) {
        this.setData({
          searchResult: res.data
        })
        this.data.tempSearchResult = res.data;
      } else {
        this.setData({
          searchResult: []
        })
        this.data.tempSearchResult = [];
      }
    })
  },

  _getByPy(py) {
    getByPy(py, this.data.title).then(res => {
      if (res.status == 2700) {
        this.setData({
          searchResult: res.data
        })
        this.data.tempSearchResult = res.data;
      } else {
        this.setData({
          searchResult: []
        })
        this.data.tempSearchResult = [];
      }
    })
  },

  _getByEff(effect) {
    getByEff(effect, this.data.title).then(res => {
      if (res.status == 2800) {
        this.setData({
          searchResult: res.data
        })
        this.data.tempSearchResult = res.data;
      } else {
        this.setData({
          searchResult: []
        })
        this.data.tempSearchResult = [];
      }
    })
  }

})
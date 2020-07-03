// pages/story/story.js

import {
  getStory, getStorylist
} from '../../service/story.js';

const TOP_DISTANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    size: 20,
    showBackTop: false,
    showEnding: false,
    isShow: true,
    showSearch: false,
    searchResult: [],
    tempSearchResult: [],
    storylist: [],
    currentType: 'all',
    searchTxt: '',
    name: 'story_name',
    page: 'story'
  },

  // 输入框内容更改时请求数据
  getData: function (data) {
    let name = data.detail;  // 输入框合法内容
    this._getStory(name);
  },

  // 输入框键盘点击搜索发送请求
  confirmData: function (data) {
    let txt = data.detail;
    this.setData({
      currentType: '',
      searchTxt: txt,
      showBackTop: false,
      showEnding: true,
      showSearch: true,
      storylist: this.data.tempSearchResult
    })
  },

  showWhich: function (data) {
    this.setData({
      isShow: !data.detail
    })
  },

  reset: function () {
    this.setData({
      currentPage: 1,
      storylist: [],
      currentType: 'all',
      showEnding: false,
      showSearch: false
    })
    this._getStoryList();
  },

  loadMore: function () {
    if (this.data.currentType == 'all') {
      this._getStoryList();
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

  toDetail: function (event) {
    let name = event.currentTarget.dataset.name;
    let page = this.data.page;
    wx.navigateTo({
      url: '/pages/detail/story/story?name=' + name + '&page=' + page
    });
  },

  _getStoryList: function () {
    let pages = this.data.currentPage;
    let list = this.data.storylist;
    getStorylist(pages, this.data.size).then(res => {
      if (res.status == 5100) {
        list.push(...res.data)
        this.setData({
          storylist: list,
          currentPage: pages + 1
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

  _getStory: function (name) {
    getStory(name).then(res => {
      if (res.status == 5000) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getStoryList();
  },

})
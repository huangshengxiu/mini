// pages/pre_img/pre_img.js
import { alphabet } from '../../utils/util.js'
import { getPreImgData, getAll, getPreImgByCategory, getPreImgByZn, getPreImgByName, getPreImgByPy, getPreImgByEff } from '../../service/prescription_img.js'
const TOP_DISTANCE = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    size: 10,
    showBackTop: false,
    showEnding: false,
    isShow: true,
    showdirectory: true,
    page: 'pre_img',
    name: 'prescription_name',
    preImgAll: [],
    searchResult: [],
    tempSearchResult: [],
    alphabet: alphabet,
    preImgcategoryList: [],
    lt: { title: '分类索引', attribute: 'category' },
    rt: { title: '字母索引', attribute: 'alphabet' },
    currentType: 'all',
    searchData: '',
    searchTxt: '',
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPreImgcategoryList();
    this._getPreImgAll();
  },

  // 输入框内容更改时请求数据
  getData: function (data) {
    let name = data.detail.name;  // 输入框合法内容
    let key = data.detail.key;
    if (key == '名称') {
      this._getPreImgByName(name);
    } else if (key == '拼音') {
      this._getPreImgByPy(name);
    } else {
      this._getPreImgByEff(name);
    }
  },

  // 输入框键盘点击搜索发送请求
  confirmData: function (data) {
    let txt = data.detail.name;
    let key = data.detail.key;
    this.setData({
      showdirectory: false,
      currentType: '',
      searchTxt: txt,
      showBackTop: false,
      showEnding: true,
      keyword: key,
      preImgAll: this.data.tempSearchResult
    })
  },

  showWhich: function (data) {
    this.setData({
      isShow: !data.detail
    })
  },

  resetToDir: function () {
    this.setData({
      showdirectory: true,
      currentPage: 1,
      preImgAll: [],
      currentType: 'all',
      showEnding: false
    })
    this._getPreImgAll();
  },

  loadMore: function () {
    let type = this.data.currentType;
    let searchData = this.data.searchData;
    if (type == "alphabet") {
      this._getPreImgByZn(searchData);
    } else if (type == "category") {
      this._getPreImgByCategory(searchData);
    } else if (type == "all") {
      this._getPreImgAll();
    } else {

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
    let page = this.data.page;
    let name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/detail/medicine/medicine?name=' + name + '&page=' + page
    });
  },

  _getPreImgcategoryList: function () {
    getPreImgData().then(res => {
      if (res.status == 3200) {
        this.setData({
          preImgcategoryList: res.data
        })
      }
    })
  },

  _getPreImgAll: function () {
    let pages = this.data.currentPage;
    let list = this.data.preImgAll;
    getAll(pages, this.data.size).then(res => {
      if (res.status == 3300) {
        list.push(...res.data)
        this.setData({
          preImgAll: list,
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

  _getPreImgByCategory: function (category) {
    let pages = this.data.currentPage;
    let list = this.data.preImgAll;
    getPreImgByCategory(pages, this.data.size, category).then(res => {
      if (res.status == 3400) {
        list.push(...res.data)
        this.setData({
          preImgAll: list,
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

  _getPreImgByZn: function (alphabet) {
    let pages = this.data.currentPage;
    let list = this.data.preImgAll;
    getPreImgByZn(pages, this.data.size, alphabet).then(res => {
      if (res.status == 3100) {
        list.push(...res.data)
        this.setData({
          preImgAll: list,
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

  _getPreImgByName: function (name) {
    getPreImgByName(name).then(res => {
      if (res.status == 3000) {
        this.setData({
          searchResult: res.data
        })
        this.data.tempSearchResult = res.data
      } else {
        this.setData({
          searchResult: []
        })
        this.data.tempSearchResult = []
      }
    })
  },

  _getPreImgByPy: function (py) {
    getPreImgByPy(py).then(res => {
      if (res.status == 3800) {
        this.setData({
          searchResult: res.data
        })
        this.data.tempSearchResult = res.data
      } else {
        this.setData({
          searchResult: []
        })
        this.data.tempSearchResult = []
      }
    })
  },

  _getPreImgByEff: function (effect) {
    getPreImgByEff(effect).then(res => {
      if (res.status == 3900) {
        this.setData({
          searchResult: res.data
        })
        this.data.tempSearchResult = res.data
      } else {
        this.setData({
          searchResult: []
        })
        this.data.tempSearchResult = []
      }
    })
  },

  updatelist: function (data) {
    let searchName = data.detail.attribute;
    let searchData = data.detail.data;
    this.setData({
      currentPage: 1,
      preImgAll: [],
      currentType: searchName,
      searchData: searchData,
      showEnding: false
    })
    if (searchName == "alphabet") {
      this._getPreImgByZn(searchData);
    } else if (searchName == "category") {
      this._getPreImgByCategory(searchData);
    } else {
      this._getPreImgAll();
    }
  }

})
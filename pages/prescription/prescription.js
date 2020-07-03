// pages/prescription/prescription.js
import { alphabet } from '../../utils/util.js'
import { getPreOrigin, getPreAll, getPreByZn, getPreByOrigin, getPreByName, getPreByPy, getPreByEff } from '../../service/prescription.js'
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
    showdirectory: true,
    isShow: true,
    prescriptionAll: [],
    originlist: [],
    searchResult: [],
    tempSearchResult: [],
    alphabet: alphabet,
    lt: { title: '按出处索引', attribute: 'origin' },
    rt: { title: '按字母索引', attribute: 'alphabet' },
    currentType: 'all',
    searchData: '',
    searchTxt: '',
    name: 'prescription_name',
    page: 'prescription',
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPreOrigin();
    this._getPreAll();
  },

  // 输入框内容更改时请求数据
  getData: function (data) {
    let name = data.detail.name;  // 输入框合法内容
    let key = data.detail.key;
    if (key == '名称') {
      this._getPreByName(name);
    } else if (key == '拼音') {
      this._getPreByPy(name);
    } else {
      this._getPreByEff(name);
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
      showEnding: true,
      showBackTop: false,
      keyword: key,
      prescriptionAll: this.data.tempSearchResult
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
      prescriptionAll: [],
      currentType: 'all',
      showEnding: false
    })
    this._getPreAll();
  },

  loadMore: function () {
    let type = this.data.currentType;
    let searchData = this.data.searchData;
    if (type == "alphabet") {
      this._getPreByZn(searchData);
    } else if (type == "origin") {
      this._getPreByOrigin(searchData);
    } else if (type == "all") {
      this._getPreAll();
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
    let name = event.currentTarget.dataset.name;
    let page = this.data.page;
    wx.navigateTo({
      // 把title的值接到url上传递到对应url页面上，在页面上onLoad方法里的参数中获取
      url: '/pages/detail/prescription/prescription?name=' + name + '&page=' + page
    });
  },

  _getPreOrigin: function () {
    getPreOrigin().then(res => {
      if (res.status == 4300) {
        this.setData({
          originlist: res.data
        })
      }
    })
  },

  _getPreAll: function () {
    let pages = this.data.currentPage;
    let list = this.data.prescriptionAll;
    getPreAll(pages, this.data.size).then(res => {
      if (res.status == 4200) {
        list.push(...res.data)
        this.setData({
          prescriptionAll: list,
          currentPage: pages + 1
        })
        if (res.data.length < this.data.size) {
          this.setData({
            showEnding: true
          })
        }
      } else {
        this.setData({
          showLoading: true
        })
      }
    })
  },

  _getPreByOrigin: function (origin) {
    let pages = this.data.currentPage;
    let list = this.data.prescriptionAll;
    getPreByOrigin(pages, this.data.size, origin).then(res => {
      if (res.status == 4400) {
        list.push(...res.data)
        this.setData({
          prescriptionAll: list,
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

  _getPreByZn: function (alphabet) {
    let pages = this.data.currentPage;
    let list = this.data.prescriptionAll;
    getPreByZn(pages, this.data.size, alphabet).then(res => {
      if (res.status == 4500) {
        list.push(...res.data)
        this.setData({
          prescriptionAll: list,
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

  _getPreByName: function (name) {
    getPreByName(name).then(res => {
      if (res.status == 4000) {
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

  _getPreByPy: function (py) {
    getPreByPy(py).then(res => {
      if (res.status == 4900) {
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

  _getPreByEff: function (effect) {
    getPreByEff(effect).then(res => {
      if (res.status == 4110) {
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

  updatelist: function (data) {
    let searchName = data.detail.attribute;
    let searchData = data.detail.data;
    this.setData({
      currentPage: 1,
      prescriptionAll: [],
      currentType: searchName,
      searchData: searchData,
      showEnding: false
    })
    if (searchName == "alphabet") {
      this._getPreByZn(searchData);
    } else if (searchName == "origin") {
      this._getPreByOrigin(searchData);
    } else {
      this._getPreAll();
    }
  }

})
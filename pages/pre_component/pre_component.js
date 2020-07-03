// pages/pre_component/pre_component.js
import {
  existence,
  searchData,
  flatArr
} from '../../utils/util.js';
import {
  getPreByComp,
  getPreImgByComp
} from '../../service/pre_component.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    componentList: [],
    resultlist: [],
    showResult: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this._getTotal()
  },

  onReady: function () {
    this.modal = this.selectComponent('#modal')
  },

  openModal: function () {
    this.modal.showModal();
  },

  clearList: function () {
    let list = this.data.componentList;
    let that = this;
    if (!list.length) {

    } else {
      wx.showModal({
        title: "提示",
        content: '确定要删除所有记录吗？',
        confirmText: "删除",
        success: function (res) {
          if (res.confirm) {
            that.setData({
              componentList: [],
              resultlist: [],
              showResult: false
            })
          } else {

          }
        }
      })
    }
  },

  showInput: function (data) {
    let that = this;
    let addData = data.detail;
    let list = this.data.componentList;
    let result = existence(list, addData);
    if (typeof result == 'number') {
      list[result].repeat = true;
      this.setData({
        componentList: list
      })
      wx.showModal({
        title: "提醒",
        content: '不能输入已经存在的内容',
        showCancel: false,
        confirmText: "确定",
        success: function () {
          list[result].repeat = false;
          that.setData({
            componentList: list
          })
        }
      })
    } else {
      let obj = {};
      obj.name = addData;
      obj.repeat = false
      list.push(obj);
      this.setData({
        componentList: list,
        showResult: true
      })
      //发请求
      this._getTotal();
    }
  },

  removeItem: function (e) {
    let list = this.data.componentList;
    let result = existence(list, e.currentTarget.dataset.name);
    let that = this;
    wx.showModal({
      title: "提示",
      content: '确定要删除此记录吗？',
      confirmText: "删除",
      success: function (res) {
        if (res.confirm) {
          list.splice(result, 1);
          if (list.length) {
            that.setData({
              componentList: list
            })
            // 发请求
            that._getTotal();
          } else {
            that.setData({
              componentList: [],
              resultlist: [],
              showResult: false
            })
          }
        } else { }
      }
    })
  },

  _getPreByComp: function (name) {
    return new Promise((resolve, reject) => {
      getPreByComp(name).then(res => {
        if (res.status == 4102) {
          reject(res.data)
        } else if (res.status == 4101) {
          resolve([])
        } else {
          resolve(res.data)
        }
      })
    })
  },

  _getPreImgByComp: function (name) {
    return new Promise((resolve, reject) => {
      getPreImgByComp(name).then(res => {
        if (res.status == 3602) {
          reject(res.data)
        } else if (res.status == 3601) {
          resolve([])
        } else {
          resolve(res.data)
        }
      })
    })
  },

  _getTotal: function () {
    let name = searchData(this.data.componentList)
    // console.log(searchData(this.data.componentList))
    let p1 = this._getPreByComp(name);
    let p2 = this._getPreImgByComp(name);
    Promise.all([p1, p2]).then(res => {
      // console.log(res)
      let data = flatArr(res);
      // console.log(data)
      this.setData({
        resultlist: data
      })
    }).catch(err => {
      console.log(err)
    })
  },

  toDetail: function (event) {
    let page = event.currentTarget.dataset.page;
    let name = event.currentTarget.dataset.name;
    if (page == '方剂图解') {
      wx.navigateTo({
        url: '/pages/detail/medicine/medicine?name=' + name + '&page=pre_img'
      });
    } else {
      wx.navigateTo({
        url: '/pages/detail/prescription/prescription?name=' + name + '&page=prescription'
      });
    }
  }

})
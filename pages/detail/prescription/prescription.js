// pages/detail/prescription/prescription.js
import { getMedicineContent, getPreContent } from '../../../service/content.js';
import { tcm, prescription } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray: [],
    content: {},
    directory: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let name = options.name;
    let pageTitle = options.page;
    if (pageTitle == 'tcm') {
      this.setData({
        titleArray: Object.keys(tcm),
        directory: tcm
      })
      this._getMedicineContent(name)
    } else {
      this.setData({
        titleArray: Object.keys(prescription),
        directory: prescription
      })
      this._getPreContent(name)
    }
  },

  _getMedicineContent: function (name) {
    getMedicineContent(name).then(res => {
      if (res.status == 1400) {
        this.setData({
          content: res.data
        })
      }
    })
  },

  _getPreContent: function (name) {
    getPreContent(name).then(res => {
      if (res.status == 4600) {
        this.setData({
          content: res.data
        })
      }
    })
  }

})
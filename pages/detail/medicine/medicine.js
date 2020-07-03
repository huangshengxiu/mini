// pages/detail/medicine/medicine.js
import { getTcmImgContent, getPreImgContent } from '../../../service/Imgcontent.js';
import { tcmImg, prescriptionImg } from '../../../utils/util.js';
import {
  baseURL
} from '../../../service/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray: [],
    content: {},
    directory: {},
    img_name: '',
    baseUrl: baseURL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let name = options.name;
    let pageTitle = options.page;
    if (pageTitle == 'tcmImg') {
      this.setData({
        titleArray: Object.keys(tcmImg),
        directory: tcmImg,
        img_name: 'medicine_img'
      })
      this._getTcmImgContent(name)
    } else {
      this.setData({
        titleArray: Object.keys(prescriptionImg),
        directory: prescriptionImg,
        img_name: 'prescription_img'
      })
      this._getPreImgContent(name)
    }
  },

  _getTcmImgContent: function (name) {
    getTcmImgContent(name).then(res => {
      if (res.status == 2500) {
        this.setData({
          content: res.data
        })
      }
    })
  },

  _getPreImgContent: function (name) {
    getPreImgContent(name).then(res => {
      if (res.status == 3500) {
        this.setData({
          content: res.data
        })
      }
    })
  }

})
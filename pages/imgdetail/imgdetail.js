// pages/imgdetail/imgdetail.js

import { throttle, getName, rename } from '../../utils/util.js';
import { getMedicineByName } from '../../service/medicine.js';
import { searchMedicineImg } from '../../service/medicinelist.js';
import { getPreImgByName } from '../../service/prescription_img.js';
import { getPreByName } from '../../service/prescription.js';
import { getStory } from '../../service/story.js';
import { searchBook } from '../../service/book.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusInput: true,
    inputValue: '',
    currentIndex: 0,
    searchlist: [],
    chooselist: [
      { name: '中药大全', list: [] },
      { name: '中药图解', list: [] },
      { name: '方剂大全', list: [] },
      { name: '方剂图解', list: [] },
      { name: '中药传说', list: [] },
      { name: '医书古籍', list: [] },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  getData: throttle(function (e) {
    let searchMsg = e.detail.value;
    let reg = /[^\u4e00-\u9fa5]/g;
    let result = searchMsg.replace(reg, '');
    let num = this.data.currentIndex;
    if (result) {
      if (this.data.inputValue != result) {
        // 输入框内容发生改变触发请求
        this._sendHttp(num, result);
      }
    }
    else {
      this.setData({
        chooselist: [
          { name: '中药大全', list: [] },
          { name: '中药图解', list: [] },
          { name: '方剂大全', list: [] },
          { name: '方剂图解', list: [] },
          { name: '中药传说', list: [] },
          { name: '医书古籍', list: [] },
        ]
      });
    }
    this.setData({
      inputValue: result
    });
  }, 600),

  commitclick: function () {

  },

  cancelclick: function () {
    this.setData({
      inputValue: '',
      chooselist: [
        { name: '中药大全', list: [] },
        { name: '中药图解', list: [] },
        { name: '方剂大全', list: [] },
        { name: '方剂图解', list: [] },
        { name: '中药传说', list: [] },
        { name: '医书古籍', list: [] },
      ],
      focusInput: false
    })
  },

  clearInput: function () {
    this.setData({
      inputValue: '',
      chooselist: [
        { name: '中药大全', list: [] },
        { name: '中药图解', list: [] },
        { name: '方剂大全', list: [] },
        { name: '方剂图解', list: [] },
        { name: '中药传说', list: [] },
        { name: '医书古籍', list: [] },
      ],
      focusInput: true
    })
  },

  changeselect: function (event) {
    let index = this.data.currentIndex;
    let num = event.currentTarget.dataset.num;
    let result = this.data.inputValue;
    if (index == num) {
      return;
    } else {
      this.setData({
        currentIndex: num
      })
      if (result) {
        this._sendHttp(num, result)
      }
    }
  },

  toDetail: function (event) {
    let name = event.currentTarget.dataset.name;
    let id = this.data.currentIndex;
    // console.log(name, id);
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '/pages/detail/prescription/prescription?name=' + name + '&page=tcm'
        });
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/detail/medicine/medicine?name=' + name + '&page=tcmImg'
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/detail/prescription/prescription?name=' + name + '&page=pre'
        });
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/detail/medicine/medicine?name=' + name + '&page=pre_img'
        });
        break;
      case 4:
        wx.navigateTo({
          url: '/pages/detail/story/story?name=' + name + '&page=story'
        });
        break;
      case 5:
        wx.navigateTo({
          url: '../books/detail/detail?name=' + name
        });
        break;
    }
  },

  _getMedicineByName: function (name) {
    getMedicineByName(name).then(res => {
      let arrlist = this.data.chooselist;
      if (res.status == 1100) {
        let data = rename('medicine_name', res.data);
        arrlist[0].list = [];
        arrlist[0].list.push(...data);
        this.setData({
          chooselist: arrlist
        })
      }
      else if (res.status == 1101) {
        arrlist[0].list = [];
        this.setData({
          chooselist: arrlist
        })
      }
    })
  },

  _searchMedicineImg(name) {
    searchMedicineImg(name, this.data.title).then(res => {
      let arrlist = this.data.chooselist;
      if (res.status == 2000) {
        let data = rename('medicine_name', res.data);
        arrlist[1].list = [];
        arrlist[1].list.push(...data);
        this.setData({
          chooselist: arrlist
        })
      } else {
        arrlist[1].list = [];
        this.setData({
          chooselist: arrlist
        })
      }
    })
  },

  _getPreImgByName: function (name) {
    getPreImgByName(name).then(res => {
      let arrlist = this.data.chooselist;
      if (res.status == 3000) {
        let data = rename('prescription_name', res.data);
        arrlist[3].list = [];
        arrlist[3].list.push(...data);
        this.setData({
          chooselist: arrlist
        })
      } else {
        arrlist[3].list = [];
        this.setData({
          chooselist: arrlist
        })
      }
    })
  },

  _getPreByName: function (name) {
    getPreByName(name).then(res => {
      let arrlist = this.data.chooselist;
      if (res.status == 4000) {
        let data = rename('prescription_name', res.data);
        arrlist[2].list = [];
        arrlist[2].list.push(...data);
        this.setData({
          chooselist: arrlist
        })
      } else {
        arrlist[2].list = [];
        this.setData({
          chooselist: arrlist
        })
      }
    })
  },

  _getStory: function (name) {
    getStory(name).then(res => {
      let arrlist = this.data.chooselist;
      if (res.status == 5000) {
        let data = rename('story_name', res.data);
        arrlist[4].list = [];
        arrlist[4].list.push(...data);
        this.setData({
          chooselist: arrlist
        })
      } else {
        arrlist[4].list = [];
        this.setData({
          chooselist: arrlist
        })
      }
    })
  },

  _searchBook: function (name) {
    searchBook(name).then(res => {
      let arrlist = this.data.chooselist;
      if (res.status == 6000) {
        let data = rename('book_name', res.data);
        arrlist[5].list = [];
        arrlist[5].list.push(...data);
        this.setData({
          chooselist: arrlist
        })
      } else {
        arrlist[5].list = [];
        this.setData({
          chooselist: arrlist
        })
      }
    })
  },

  _sendHttp: function (num, result) {
    switch (num) {
      case 0:
        this._getMedicineByName(result);
        break;
      case 1:
        this._searchMedicineImg(result);
        break;
      case 2:
        this._getPreByName(result);
        break;
      case 3:
        this._getPreImgByName(result);
        break;
      case 4:
        this._getStory(result);
        break;
      case 5:
        this._searchBook(result);
        break;
    }
  }

})
 //index.js
//获取应用实例
import {
  getList
} from '../../service/index.js';

const app = getApp()

Page({
  data: {
    iconlist: [
      { name: '中药大全', url: '/assets/images/iconlist/medicine.png', path: '/pages/medicine/medicine' },
      { name: '方剂大全', url: '/assets/images/iconlist/prescription.png', path: '/pages/prescription/prescription' },
      { name: '中药传说', url: '/assets/images/iconlist/story.png', path: '/pages/story/story' },
      { name: '方剂图解', url: '/assets/images/iconlist/prescription_img.png', path: '/pages/pre_img/pre_img' },
      { name: '中药识方', url: '/assets/images/iconlist/pre_component.png', path: '/pages/pre_component/pre_component' },
      { name: '中药书籍', url: '/assets/images/iconlist/book.png', path: '/pages/books/books' }
    ],
    medicinelist: []
  },

  //事件处理函数
  clickInfo: function (event) {
    let path = event.currentTarget.dataset.msg;
    console.log(path)
    if (path == "/pages/books/books") {
      wx.switchTab({
        url: path
      })
    }
    else {
      wx.navigateTo({
        url: path
      })
    }
  },

  clickListInfo: function (event) {
    let category = event.currentTarget.dataset.msg;
    wx.navigateTo({
      // 把title的值接到url上传递到对应url页面上，在页面上onLoad方法里的参数中获取
      url: '/pages/medicinelist/medicinelist?title=' + category
    });
  },

  onLoad: function () {
    getList().then((res) => {
      if (res.status == 2200)
        this.setData({
          medicinelist: res.data
        })
    }
    ).catch(err => {
      console.log(err)
    })
  }

})

// pages/medicinelist/title/title.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category: String,
    searchTxt: String,
    keyword: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCategory: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reset: function () {
      this.triggerEvent('parentResetData');
      this.setData({
        showCategory: true
      })
    }
  }
})

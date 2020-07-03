// pages/books/directory/directory.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    directory: Object,
    bookname: String,
    dirfrom: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDir: false,
    animationData: '',
    volume: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

    showDirectory: function () {
      let volume = Object.keys(this.data.directory);
      this.setData({
        showDir: true,
        volume: volume
      })
    },

    hiddenDir: function () {
      this.setData({
        showDir: false
      })
      this.triggerEvent('parentEvent');
    },

    toRead: function (event) {
      let index = event.currentTarget.dataset.id;
      let data = { id: index, name: this.data.bookname }
      if (this.data.dirfrom == 'detail') {
        wx.navigateTo({
          url: '../reader/reader?bookname=' + this.data.bookname + '&id=' + index,
        })
      } else {
        this.triggerEvent('parentchange', data);
      }

      this.hiddenDir();
    }
  }
})

// pages/books/setbox/setbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    colorArr: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    showbox: false,
    night: false,
    showMain: false,
    currentIndex: 0,
    previousIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    showbox: function () {
      this.setData({
        showbox: true
      })
    },

    hiddenbox: function () {
      this.setData({
        showMain: false,
        showbox: false
      })
    },

    pre: function () {
      this.triggerEvent('parentpre');
    },

    dir: function () {
      this.triggerEvent('parentdir');
    },

    showfont: function () {
      this.setData({
        showMain: !this.data.showMain
      })
    },

    setcolor: function () {
      let night = this.data.night;
      let len = this.data.colorArr.length - 1;
      let currentdata = this.data.previousIndex;
      this.setData({
        night: !night
      })
      if (this.data.night) {
        this.setData({
          currentIndex: len
        })
        this.triggerEvent('parentday');   //变黑
      } else {
        this.setData({
          currentIndex: currentdata
        })
        this.triggerEvent('parentcolor', currentdata);  // 白天
      }
    },

    changecolor: function (event) {
      let num = event.currentTarget.dataset.num;
      let index = this.data.currentIndex;
      let len = this.data.colorArr.length - 1;
      if (num == index) {
        return
      } else if (num == len) {
        this.setData({
          night: true,
          currentIndex: num
        })
      } else {
        this.setData({
          currentIndex: num,
          previousIndex: num,
          night: false
        })
      }
      this.triggerEvent('parentcolor', num);
    },

    next: function () {
      this.triggerEvent('parentnext');
    },

    bigfont: function () {
      this.triggerEvent('parentbig');
    },

    smallfont: function () {
      this.triggerEvent('parentsmall');
    },

  }
})

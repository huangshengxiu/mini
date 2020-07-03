// pages/pre_component/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    focus: true,
    inputValue: '',
    showWarning: false,
    tag: 0,
    animationData: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    showModal: function () {
      this.setData({
        isShow: true
      })
      // let animation = wx.createAnimation({
      //   duration: 4500,
      //   timingFunction: "linear",
      // });
      // // this.animation = animation;
      // animation.opacity(.5);
      // this.setData({
      //   animationData: animation.export()
      // })
    },

    closeModal: function () {
      // this.triggerEvent('parentCloseModal', this.data.inputValue);
      this.setData({
        isShow: false,
        inputValue: '',
        showWarning: false,
        tag: 0
      })
    },

    showInput: function () {
      let confirmData = this.data.inputValue;
      if (confirmData) {
        this.triggerEvent('parentCloseModal', this.data.inputValue);
        this.setData({
          isShow: false,
          inputValue: '',
          tag: 0
        })
      } else {
        this.setData({
          showWarning: true,
          focus: true,
          tag: 1
        })
        // console.log("不能为空");
      }
    },

    formatValue: function (e) {
      let searchMsg = e.detail.value;
      let reg = /[^\u4e00-\u9fa5]/g;
      if (this.data.tag == 1 && e.detail.value) {
        this.setData({
          tag: 0,
          showWarning: false
        })
      }
      let result = searchMsg.replace(reg, '');
      this.setData({
        inputValue: result
      })
    }

  }
})

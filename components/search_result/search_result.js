import {
  throttle, getName
} from '../../utils/util.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    resultlist: {
      type: Array,
      default: []
    },
    name: String,
    page: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPrevious: true,
    showInput: false,
    showTip: false,
    tip: '',
    selectIndex: 0,
    notstory: true,
    array: ['名称', '拼音', '功效']
  },

  attached: function () {
    if (this.data.page == 'story') {
      this.setData({
        notstory: false
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    bindPickerChange: function (e) {
      let selectIndex = e.detail.value;
      this.setData({
        selectIndex: selectIndex
      })
      this.showInput(this.data.array[selectIndex]);
    },

    showInput: function (select) {
      this.setData({
        showPrevious: false,
        showInput: true,
        inputVal: '',
        resultlist: []
      })
    },

    // 清除输入框内容
    clearInput: function () {
      this.setData({
        inputVal: '',
        showInput: true,
        resultlist: []
      })
    },

    // 点击取消恢复搜索框样式以及显示原来scrollview
    cancelclick: function () {
      this.setData({
        showPrevious: true,
        showInput: false,
        inputVal: '',
        isShow: false,
        resultlist: [],
        selectIndex: 0
      })
      this.triggerEvent('parentShow', this.data.isShow);
      // 发送过请求再点击
    },

    // inputTyping: throttle(function (e) {
    //   let searchMsg = e.detail.value;
    //   let key = this.data.array[this.data.selectIndex];
    //   let reg = /[^\u4e00-\u9fa5]/g;
    //   let result = searchMsg.replace(reg, '');
    //   if (result) {
    //     if (this.data.inputVal != result) {
    //       // 输入框内容发生改变触发请求
    //       let msg = { name: result, key: key }
    //       this.triggerEvent('parentGetData', msg);
    //     }
    //   }
    //   else {
    //     this.setData({
    //       resultlist: []
    //     });
    //   }
    //   this.setData({
    //     inputVal: result
    //   });
    // }, 600),

    inputTyping: function (e) {
      let searchMsg = e.detail.value;
      let key = this.data.array[this.data.selectIndex];
      let page = this.data.page;
      let znreg = /[^\u4e00-\u9fa5]/g;
      let enreg = /[^a-zA-Z]/g;
      let result;
      if (key !== '拼音') {
        result = searchMsg.replace(znreg, '');
      } else {
        result = searchMsg.replace(enreg, '');
      }
      if (result) {
        if (this.data.inputVal != result) {
          // 输入框内容发生改变触发请求
          if (page == 'story') {
            this.triggerEvent('parentGetData', result);
          } else {
            let msg = { name: result, key: key };
            this.triggerEvent('parentGetData', msg);
          }
        }
      }
      else {
        this.setData({
          resultlist: []
        });
      }
      this.setData({
        inputVal: result
      });
    },

    commitclick: function () {
      let data = this.data.inputVal;
      let key = this.data.array[this.data.selectIndex];
      let page = this.data.page;
      let msg = { name: data, key: key };
      this.setData({
        isShow: false,
        resultlist: [],
        inputVal: '',
        showPrevious: true,
        showInput: false,
        selectIndex: 0
      })
      // 输入内容不为空时才触发请求方法
      if (data) {
        if (page == 'story') {
          this.triggerEvent('parentSearchData', data);
        } else {
          this.triggerEvent('parentSearchData', msg);
        }
        // this.triggerEvent('parentSearchData', msg);
        this.triggerEvent('parentShow', this.data.isShow);
      } else {
        this.triggerEvent('parentShow', this.data.isShow);
      }
    },

    // 键盘点击确认事件
    parentSearch: function () {
      let data = this.data.inputVal;
      let page = this.data.page;
      let key = this.data.array[this.data.selectIndex];
      let msg = { name: data, key: key };
      this.setData({
        isShow: false,
        resultlist: [],
        inputVal: '',
        showPrevious: true,
        showInput: false,
        selectIndex: 0
      })
      // 输入内容不为空时才触发请求方法
      if (data) {
        if (page == 'story') {
          this.triggerEvent('parentSearchData', data);
        } else {
          this.triggerEvent('parentSearchData', msg);
        }
        // this.triggerEvent('parentSearchData', msg);
        this.triggerEvent('parentShow', this.data.isShow);
      } else {
        this.triggerEvent('parentShow', this.data.isShow);
      }
    },

    // 失去焦点隐藏实时结果
    resetStyle: function () {
      if (!this.data.inputVal) {
        this.setData({
          resultlist: [],
          inputVal: ''
        })
      }
    },

    // 聚集焦点时实现搜索结果
    showNow: function () {
      this.setData({
        isShow: true
      })
      this.triggerEvent('parentShow', this.data.isShow);
    },

    toDetail: function (event) {
      let page = this.data.page;
      let name = event.currentTarget.dataset.name;
      if (page == 'tcmImg' || page == 'pre_img') {
        wx.navigateTo({
          url: '/pages/detail/medicine/medicine?name=' + name + '&page=' + page
        });
      } else if (page == 'story') {
        wx.navigateTo({
          url: '/pages/detail/story/story?name=' + name + '&page=' + page
        });
      }
      else {
        wx.navigateTo({
          url: '/pages/detail/prescription/prescription?name=' + name + '&page=' + page
        });
      }
    },

    operation: function () {
      let data = this.data.inputVal;

    }

  }
})

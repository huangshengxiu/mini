// components/directory/directory.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftArr: Array,
    rightArr: Array,
    lefttitle: Object,
    righttitle: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDirectory: true,
    showSelect: false,
    select: '',
    leftIndex: 0,
    rightIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    bindLeftPickerChange: function (e) {
      let leftIndex = e.detail.value;
      // console.log(this.data.leftArr[leftIndex]);
      this.setData({
        leftIndex: e.detail.value,
        showDirectory: false,
        showSelect: true,
        select: this.data.leftArr[leftIndex]
      });
      let returnData = { data: this.data.leftArr[leftIndex], attribute: this.data.lefttitle.attribute }
      this.triggerEvent('parentChangeData', returnData);
    },

    bindRightPickerChange: function (e) {
      let rightIndex = e.detail.value;
      // console.log(this.data.rightArr[rightIndex]);
      this.setData({
        rightIndex: e.detail.value,
        showDirectory: false,
        showSelect: true,
        select: this.data.rightArr[rightIndex]
      })
      let returnData = { data: this.data.rightArr[rightIndex], attribute: this.data.righttitle.attribute }
      this.triggerEvent('parentChangeData', returnData);
    },

    reset: function () {
      this.setData({
        leftIndex: 0,
        rightIndex: 0,
        showDirectory: true,
        showSelect: false,
        select: ''
      })
      let returnData = { data: '', attribute: 'all' }
      this.triggerEvent('parentChangeData', returnData);
    }
  }
})

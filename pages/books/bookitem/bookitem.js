// pages/books/bookitem/bookitem.js
import {
  baseURL
} from '../../../service/config.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookitem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    book_img: ''
  },

  attached: function () {
    this.setData({
      book_img: baseURL + this.data.bookitem.book_img
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

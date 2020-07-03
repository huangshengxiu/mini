// pages/detail/story/story.js

import {
  searchStoryContent
} from '../../../service/story.js';
import {
  formatTxt
} from '../../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.name;
    searchStoryContent(name).then(res => {
      if (res.status == 5200) {
        let content = res.data.content;
        let arr = formatTxt(content);
        // console.log(arr)
        this.setData({
          contentArr: arr
        })
      }
    })
  },

})
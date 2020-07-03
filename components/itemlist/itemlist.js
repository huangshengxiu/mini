// components/itemlist.js

import {
  baseURL
} from '../../service/config.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toChildmsg: Object,
    tochildnum: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMsg: {}
  },

  // 子组件初始化加载方法
  attached: function () {
    let name = this.data.toChildmsg.medicine_name || this.data.toChildmsg.prescription_name;
    let efficacy = this.data.toChildmsg.efficacy;
    let classification = this.data.toChildmsg.classification;
    // let img = this.data.toChildmsg.medicine_img || this.data.toChildmsg.prescription_img;
    let img = this.data.toChildmsg.medicine_img ? baseURL + this.data.toChildmsg.medicine_img : baseURL + this.data.toChildmsg.prescription_img;
    let obj = {};
    if (efficacy) {
      let reg = /.*?。/g;
      efficacy = efficacy.match(reg)[0];
    }
    obj.name = name;
    obj.efficacy = efficacy;
    obj.classification = classification;
    obj.showImg = false;
    // obj.showImg = true;
    obj.img = img;
    obj.number = this.data.tochildnum;
    this.setData({
      showMsg: obj
    })
    let group = this.data.showMsg;
    this.createIntersectionObserver().relativeToViewport().observe('.item-' + group.number, (ret) => {
      if (ret.intersectionRatio > 0) {
        group.showImg = true;
        // console.log('出现了')
      }
      this.setData({
        showMsg: group
      })
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

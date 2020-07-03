// pages/pre_component/modal/modal.js
import { getItem, setItem, getcode, getopenid, checkToken, removeItem } from '../../../service/login.js'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    warntext: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    showModal: function () {
      this.setData({
        isShow: true
      })
    },

    closeModal: function () {
      removeItem('userInfo');
      removeItem('TOKEN');
      this.setData({
        isShow: false
      })
    },

    getUserInfo: function (e) {
      // console.log(e)
      if (e.detail.errMsg == "getUserInfo:ok") {
        let userinfo = e.detail.userInfo;
        app.globalData.userInfo = userinfo;
        getcode().then(res1 => {
          getopenid(res1).then(res2 => {
            setItem('userInfo', userinfo);
            setItem("TOKEN", res2.token).then(res => {
              this.triggerEvent('parentclick');
            })
          })
        })
        this.closeModal();
      } else {
        this.closeModal();
        removeItem('userInfo');
        removeItem('TOKEN');
      }
    }

  }
})

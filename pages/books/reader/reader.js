// pages/books/reader/reader.js
import {
  getContent, getBookChapter
} from '../../../service/book.js';
import {
  formatTxt,
  filterTxt
} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentArr: [],
    canscroll: true,
    book_name: '',
    directory: {},
    dirFrom: 'read',
    currentId: '',
    dirlen: '',
    fontsize: 36,
    bgcolor: 'white',
    nightfontcolor: '',
    topPosition: 0,
    colorArr: [
      {
        value: 'white',
        name: '米白'
      }, {
        value: '#E6DBBF',
        name: '浅灰'
      }, {
        value: '#EACAA3',
        name: '纸张'
      }, {
        value: '#BFDCBD',
        name: '护眼'
      }, {
        value: '#E6CDD0',
        name: '粉色'
      }, {
        value: '#080B10',
        name: '夜间'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookname = options.bookname;
    let id = options.id;
    // let bookname = '类经图翼';
    // let id = 1;
    this.setData({
      book_name: bookname,
      currentId: id
    })
    this._getContent(bookname, id);
    this._getdir(this.data.book_name);
  },

  onReady: function () {
    this.directory = this.selectComponent('#directory');
    this.setbox = this.selectComponent('#setbox');
  },

  resetscroll: function () {
    this.setData({
      canscroll: true
    })
  },

  setnewdata: function (data) {
    let id = data.detail.id;
    let name = data.detail.name;
    this._getContent(name, id);
  },

  showsetbox: function () {
    this.setbox.showbox();
  },

  showDir: function () {
    this.setbox.hiddenbox();
    this.directory.showDirectory();
    this.setData({
      canscroll: false
    })
  },

  showpre: function () {
    this.setbox.hiddenbox();
    let id = this.data.currentId;
    if (id == 1) {
      wx.showModal({
        title: "提醒",
        content: '当前已是第一章',
        showCancel: false,
        confirmText: "确定"
      })
    } else {
      this._getContent(this.data.book_name, Number(Number(id) - 1))
    }
    this.scrollPosition();
  },

  shownext: function () {
    this.setbox.hiddenbox();
    let id = this.data.currentId;
    if (id == this.data.dirlen) {
      wx.showModal({
        title: "提醒",
        content: '当前已是最后一章',
        showCancel: false,
        confirmText: "确定"
      })
    } else {
      this._getContent(this.data.book_name, Number(Number(id) + 1))
    }
    this.scrollPosition();
  },

  changeDay: function () {
    let id = this.data.colorArr.length - 1;
    this.setData({
      nightfontcolor: '#474B4A',
      bgcolor: this.data.colorArr[id].value
    })
  },

  changecolor: function (data) {
    let id = data.detail;
    let len = this.data.colorArr.length - 1;
    // console.log(id, len)
    if (id == len) {
      this.setData({
        nightfontcolor: '#474B4A'
      })
    }
    this.setData({
      bgcolor: this.data.colorArr[id].value
    })
  },

  bigfont: function (data) {
    let fontsize = this.data.fontsize;
    if (fontsize < 50) {
      this.setData({
        fontsize: fontsize + 2
      })
    } else {
      return;
    }
  },

  smallfont: function (data) {
    let fontsize = this.data.fontsize;
    if (fontsize > 30) {
      this.setData({
        fontsize: fontsize - 2
      })
    } else {
      return;
    }
  },

  scrollPosition: function () {
    this.setData({
      topPosition: 0
    })
  },

  _getdir: function (bookname) {
    return getBookChapter(bookname).then(res => {
      if (res.status == 6100) {
        this.setData({
          directory: res.data
        })
      }
    })
  },

  _getContent: function (bookname, id) {
    getContent(bookname, id).then(res => {
      let content = res.data.content;
      let arr = filterTxt(content);
      this.setData({
        contentArr: arr,
        currentId: id
      })
      this.data.dirlen = res.msg;
    })
  }

})
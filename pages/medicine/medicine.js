// pages/medicine/medicine.js
import { medicinal, alphabet } from '../../utils/util.js'
import { getAllMedicine, getMedicineByMedicinal, getMedicineByZn, getMedicineByName, getTcmByEff, getTcmByPy } from '../../service/medicine.js'
const TOP_DISTANCE = 1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    size: 10,
    searchTxt: '',
    showBackTop: false,
    showEnding: false,
    isShow: true,
    showdirectory: true,
    topPosition: 0,
    medicineArray: [],
    searchResult: [],
    tempsearchResult: [],
    name: 'medicine_name',
    alphabet: alphabet,
    medicinal: medicinal,
    lt: { title: '按药性索引', attribute: 'medicinal' },
    rt: { title: '按字母索引', attribute: 'alphabet' },
    currentType: 'all',
    searchData: '',
    keyword: '',
    page: 'tcm'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMedicineAll();
  },

  loadMore: function () {
    let type = this.data.currentType;
    let searchData = this.data.searchData;
    if (type == "alphabet") {
      this._getMedicineByZn(searchData);
    } else if (type == "medicinal") {
      this._getMedicineByMedicinal(searchData);
    } else if (type == "all") {
      this._getMedicineAll();
    } else {
      return;
    }
  },

  resetToDir: function () {
    this.setData({
      showdirectory: true,
      currentPage: 1,
      medicineArray: [],
      currentType: 'all',
      showEnding: false
    })
    this._getMedicineAll();
  },

  scrollPosition(e) {
    const position = e.detail.scrollTop;
    const flag = position >= TOP_DISTANCE;
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  },

  onBackTop() {
    this.setData({
      topPosition: 0
    })
  },

  // 输入框内容更改时请求数据
  getData: function (data) {
    let name = data.detail.name;  // 输入框合法内容
    let key = data.detail.key;
    if (key == '名称') {
      this._getMedicineByName(name);
    } else if (key == '拼音') {
      this._getTcmByPy(name);
    } else {
      this._getTcmByEff(name);
    }
  },

  // 输入框键盘点击搜索发送请求
  confirmData: function (data) {
    let txt = data.detail.name;
    let key = data.detail.key;
    this.setData({
      showdirectory: false,
      currentType: '',
      searchTxt: txt,
      keyword: key,
      showEnding: true,
      showBackTop: false,
      medicineArray: this.data.tempsearchResult
    })
  },

  toDetail: function (event) {
    let name = event.currentTarget.dataset.name;
    let page = this.data.page;
    wx.navigateTo({
      // 把title的值接到url上传递到对应url页面上，在页面上onLoad方法里的参数中获取
      url: '/pages/detail/prescription/prescription?name=' + name + '&page=' + page
    });
  },

  _getMedicineAll: function () {
    let pages = this.data.currentPage;
    let list = this.data.medicineArray;
    getAllMedicine(pages, this.data.size).then(res => {
      if (res.status == 1000) {
        list.push(...res.data)
        this.setData({
          medicineArray: list,
          currentPage: pages + 1,
          showEnding: false, // 加载ing
        })
        if (res.data.length < this.data.size) {
          this.setData({
            showEnding: true, // 不足一页显示到底
          })
        }
      }
      // 出错或者没有数据了设置底部为'没有更多数据了'
      else {
        this.setData({
          showEnding: true
        })
      }
    })
  },

  _getMedicineByMedicinal: function (medicinal) {
    let pages = this.data.currentPage;
    let list = this.data.medicineArray;
    getMedicineByMedicinal(pages, this.data.size, medicinal).then(res => {
      if (res.status == 1300) {
        list.push(...res.data)
        this.setData({
          medicineArray: list,
          currentPage: pages + 1,
          showEnding: false
        })
        if (res.data.length < this.data.size) {
          this.setData({
            showEnding: true, // 不足一页显示到底
          })
        }
      }
      else {
        this.setData({
          showEnding: true
        })
      }
    })
  },

  _getMedicineByZn: function (alphabet) {
    let pages = this.data.currentPage;
    let list = this.data.medicineArray;
    getMedicineByZn(pages, this.data.size, alphabet).then(res => {
      if (res.status == 1200) {
        list.push(...res.data)
        this.setData({
          medicineArray: list,
          currentPage: pages + 1,
          showEnding: false
        })
        if (res.data.length < this.data.size) {
          this.setData({
            showEnding: true, // 不足一页显示到底
          })
        }
      }
      else {
        this.setData({
          showEnding: true
        })
      }
    })
  },

  _getMedicineByName: function (name) {
    getMedicineByName(name).then(res => {
      if (res.status == 1100) {
        let data = res.data;
        this.setData({
          searchResult: data,
        })
        this.data.tempsearchResult = data;
      }
      else if (res.status == 1101) {
        this.setData({
          searchResult: []
        })
        this.data.tempsearchResult = [];
      }
    })
  },

  _getTcmByEff: function (effect) {
    getTcmByEff(effect).then(res => {
      if (res.status == 1800) {
        let data = res.data;
        this.setData({
          searchResult: data,
        })
        this.data.tempsearchResult = data;
      }
      else if (res.status == 1801) {
        this.setData({
          searchResult: []
        })
        this.data.tempsearchResult = [];
      }
    })
  },

  _getTcmByPy: function (py) {
    getTcmByPy(py).then(res => {
      if (res.status == 1700) {
        let data = res.data;
        this.setData({
          searchResult: data,
        })
        this.data.tempsearchResult = data;
      }
      else if (res.status == 1701) {
        this.setData({
          searchResult: []
        })
        this.data.tempsearchResult = [];
      }
    })
  },

  // directory picker改变时触发的函数
  updatelist: function (data) {
    let searchName = data.detail.attribute;
    let searchData = data.detail.data || '';
    this.setData({
      currentPage: 1,
      medicineArray: [],
      currentType: searchName,
      searchData: searchData,
      showEnding: false
    })
    if (searchName == "alphabet") {
      this._getMedicineByZn(searchData);
    } else if (searchName == "medicinal") {
      this._getMedicineByMedicinal(searchData);
    } else {
      this._getMedicineAll();
    }
  },

  showWhich: function (data) {
    this.setData({
      isShow: !data.detail
    })
  },

})
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const name = ['prescription_name', 'medicine_name', 'story_name', 'book_name'];

// 中药药性
const medicinal = ['热性', '温性', '寒性', '凉性', '平性'];

const tcm = {
  medicine_name: '中药名',
  zn_name: '拼音',
  nice_name: '别名',
  en_name: '英文名',
  origin: '来源',
  shape: '形态',
  medicinal_parts: '药用部位',
  meridian_tropism: '性味归经',
  origin_distribution: '产地分布',
  harvesting_processing: '采收加工',
  medicinal_properties: '药材性状',
  efficacy_and_function: '功效与作用',
  pharmacological_research: '药理研究',
  clinical_application: '临床应用',
  main_components: '主要成分',
  compatibility_prescription: '配伍药方',
  use_taboo: '使用禁忌'
};

const tcmImg = {
  medicine_name: '中药名',
  zn_name: '拼音',
  en_name: '英文名',
  latin_name: '拉丁文',
  classification: '分类',
  origin: '来源',
  flavor: '性味',
  efficacy: '功效',
  origin_distribution: '产地分布',
  medicinal_properties: '药材性状',
  quality: '品质'
};

const prescription = {
  prescription_name: '方剂名',
  zn_name: '拼音',
  origin: '来源出处',
  composition: '组成',
  usage: '用法',
  efficacy: '功效',
  indications: '主治',
  clinical_application: '临床应用',
  analysis: '方解',
  prescription_song: '方歌'
};

const prescriptionImg = {
  prescription_name: '方剂名',
  zn_name: '拼音',
  en_name: '英文名',
  classification: '分类',
  origin: '来源出处',
  composition: '组成',
  usage: '用法',
  efficacy: '功效',
  indications: '主治',
  pathogenesis: '运用',
  application: '病机',
  annex: '附方',
  prescription_song: '方歌'
};


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const throttle = function (fn, interval) {
  let previous = 0,
    timer = null;
  return function (...args) {
    let context = this;
    let now = Date.now();
    let remaining = interval - (now - previous);
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      previous = now;
    }
    else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, remaining);
    }
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTxt = txt => {
  let reg = /\n\n\t/g;
  txt.split(reg);
  return txt.split(reg).map(item => {
    return item.trim();
  });
}

const getName = obj => {
  return Object.keys(obj).find(item => {
    return name.includes(item)
  })
}

const existence = (arr, data) => {
  if (!arr.length) {
    return false;
  } else {
    let result = arr.map(item => {
      return item['name']
    }).findIndex(inneritem => inneritem == data);
    if (result == -1) {
      return false;
    } else {
      return result;
    }
  }
}

const searchData = arr => {
  return arr.map(item => item['name']).toString().replace(',', ' ');
}

const flatArr = arr => {
  return arr.reduce((previous, item) => {
    return previous.concat(Array.isArray(item) ? flatArr(item) : item);
  }, []);
}

const filterTxt = str => {
  let regOne = /(?<=。)\s\n/g;
  let regThree = /\\x/g;
  return str.replace(regOne, '%%%%%').replace(/\s+/g, "").replace(regThree, '%%%%%').split('%%%%%');
}

const filterinfo = str => {
  let reg = /\n/g;
  return str.split(reg)
}

const rename = (previousname, arr) => {
  return arr.map(item => {
    let value = item[previousname];
    let obj = {};
    obj.name = value;
    return obj;
  })
}

module.exports = {
  alphabet,
  medicinal,
  formatTime: formatTime,
  throttle,
  formatTxt,
  getName,
  tcm,
  tcmImg,
  prescription,
  prescriptionImg,
  existence,
  searchData,
  flatArr,
  filterTxt,
  filterinfo,
  rename
}

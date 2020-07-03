import request from './network.js'

export function getCategoryList(title, pages, size) {
  return request({
    url: '/medicine/getMedicineByCategory',
    data: {
      category: title,
      pages: pages,
      size: size || 20
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

export function searchMedicineImg(name) {
  return request({
    url: '/medicine/searchMedicineImg',
    data: {
      name
    }
  })
}

export function getByName(name, category) {
  return request({
    url: '/medicine/getbyNaCa',
    data: {
      category,
      name
    }
  })
}

export function getByPy(py, category) {
  return request({
    url: '/medicine/getbyPyCa',
    data: {
      category,
      py
    }
  })
}

export function getByEff(effect, category) {
  return request({
    url: '/medicine/getbyEffCa',
    data: {
      category,
      effect
    }
  })
} 
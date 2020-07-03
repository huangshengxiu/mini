import request from './network.js'

export function getPreImgData() {
  return request({
    url: '/medicine/PreImgcategoryList'
  })
}

export function getAll(pages, size) {
  return request({
    url: '/medicine/getAllPreImg',
    data: {
      pages,
      size
    }
  })
}

export function getPreImgByCategory(pages, size, category) {
  return request({
    url: '/medicine/getPreImgByCategory',
    data: {
      pages,
      size,
      category
    }
  })
}

export function getPreImgByZn(pages, size, alphabet) {
  return request({
    url: '/medicine/getPreImgByZn',
    data: {
      pages,
      size,
      alphabet
    }
  })
}

export function getPreImgByName(name) {
  return request({
    url: '/medicine/searchPrescriptionImg',
    data: {
      name
    }
  })
}

export function getPreImgByPy(py) {
  return request({
    url: '/medicine/searchPreImgByPy',
    data: {
      py
    }
  })
}

export function getPreImgByEff(effect) {
  return request({
    url: '/medicine/searchPreImgByEff',
    data: {
      effect
    }
  })
} 

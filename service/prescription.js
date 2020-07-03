import request from './network.js'

export function getPreOrigin() {
  return request({
    url: '/medicine/getPreOrigin'
  })
}

export function getPreAll(pages, size) {
  return request({
    url: '/medicine/getAllPrescription',
    data: {
      pages,
      size
    }
  })
}

export function getPreByOrigin(pages, size, origin) {
  return request({
    url: '/medicine/getPreByOrigin',
    data: {
      pages,
      size,
      origin
    }
  })
}

export function getPreByZn(pages, size, alphabet) {
  return request({
    url: '/medicine/getPreByZn',
    data: {
      pages,
      size,
      alphabet
    }
  })
}

export function getPreByName(name) {
  return request({
    url: '/medicine/searchPrescription',
    data: {
      name
    }
  })
}

export function getPreByPy(py) {
  return request({
    url: '/medicine/searchPreByPy',
    data: {
      py
    }
  })
}

export function getPreByEff(effect) {
  return request({
    url: '/medicine/searchPreByEff',
    data: {
      effect
    }
  })
} 
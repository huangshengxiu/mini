import request from './network.js'

export function getPreByComp(name) {
  return request({
    url: '/medicine/searchPreByComp',
    data: {
      name
    }
  })
}

export function getPreImgByComp(name) {
  return request({
    url: '/medicine/getPreImgByComp',
    data: {
      name
    }
  })
} 

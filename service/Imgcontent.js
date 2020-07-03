import request from './network.js'

export function getTcmImgContent(name) {
  return request({
    url: '/medicine/getTcmImgContent',
    data: {
      name
    }
  })
}

export function getPreImgContent(name) {
  return request({
    url: '/medicine/getPreImgContent',
    data: {
      name
    }
  })
}

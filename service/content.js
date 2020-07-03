import request from './network.js'

export function getMedicineContent(name) {
  return request({
    url: '/medicine/getMedicineContent',
    data: {
      name
    }
  })
}

export function getPreContent(name) {
  return request({
    url: '/medicine/getPreContent',
    data: {
      name
    }
  })
}

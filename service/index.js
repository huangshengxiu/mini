import request from './network.js'

export function getList() {
  return request({
    url: '/medicine/categorylist'
  })
} 

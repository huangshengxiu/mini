import request from './network.js'

export function getUseBook(username) {
  return request({
    url: '/users/getUseBook',
    data: {
      username
    }
  })
}
export function addUseBook(username, bookname, url) {
  return request({
    url: '/users/addUseBook',
    data: {
      username,
      bookname,
      url
    }
  })
}

export function deleteUseBook(username, bookname) {
  return request({
    url: '/users/deleteUseBook',
    data: {
      username,
      bookname
    }
  })
}

export function deleteAllUseBook(username) {
  return request({
    url: '/users/deleteAllUseBook',
    data: {
      username
    }
  })
}

export function inUseBook(username, bookname) {
  return request({
    url: '/users/inUseBook',
    data: {
      username,
      bookname
    }
  })
}

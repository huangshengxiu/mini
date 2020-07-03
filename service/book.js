import request from './network.js'

export function getContent(name, id) {
  return request({
    url: '/book/getContent',
    data: {
      name,
      id
    }
  })
}
export function searchBook(name) {
  return request({
    url: '/book/searchBook',
    data: {
      name
    }
  })
}

export function getBookChapter(name) {
  return request({
    url: '/book/getBookChapter',
    data: {
      name
    }
  })
}

export function getbooklist(name) {
  return request({
    url: '/book/getbooklist',
    data: {
      name
    }
  })
}

export function getIntroduction(name) {
  return request({
    url: '/book/getIntroduction',
    data: {
      name
    }
  })
}

export function getRecommend() {
  return request({
    url: '/book/getRecommend'
  })
}



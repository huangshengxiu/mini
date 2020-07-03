import request from './network.js'

export function getStory(data) {
  return request({
    url: '/medicine/searchStoryByName',
    data: {
      name: data
    }
  })
}

export function getStorylist(pages, size) {
  return request({
    url: '/medicine/searchStory',
    data: {
      pages,
      size
    }
  })
}

export function searchStoryContent(name) {
  return request({
    url: '/medicine/searchStoryContent',
    data: {
      name
    }
  })
} 

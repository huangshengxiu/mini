import request from './network.js'

export function getAllMedicine(pages, size) {
  return request({
    url: '/medicine/getAllMedicine',
    data: {
      pages,
      size
    }
  })
}

export function getMedicineByMedicinal(pages, size, medicinal) {
  return request({
    url: '/medicine/getMedicineByMedicinal',
    data: {
      pages,
      size,
      medicinal
    }
  })
}

export function getMedicineByZn(pages, size, alphabet) {
  return request({
    url: '/medicine/getMedicineByZn',
    data: {
      pages,
      size,
      alphabet
    }
  })
}

export function getMedicineByName(name) {
  return request({
    url: '/medicine/searchMedicine',
    data: {
      name
    }
  })
}

export function getTcmByEff(effect) {
  return request({
    url: '/medicine/getTcmByEff',
    data: {
      effect
    }
  })
}

export function getTcmByPy(py) {
  return request({
    url: '/medicine/getTcmByPy',
    data: {
      py
    }
  })
}


import request from '@/plugin/axios'
const BASE_URL = `${process.env.VUE_APP_SYSTEM}/dataDictionary`

export function DictList(data) {
  return request({
    url: BASE_URL + '/key',
    method: 'get',
    params: data
  })
}
// 添加
export function DictAdd(data) {
  return request({
    url: BASE_URL + '/add',
    method: 'post',
    data
  })
}
// 修改
export function DictUpdate(data) {
  return request({
    url: BASE_URL + '/key',
    method: 'put',
    data
  })
}

export function DictDetail(dictKeyId) {
  return request({
    url: BASE_URL + '/key/' + dictKeyId,
    method: 'get'
  })
}

export function DictDetailAdd({ dictKeyId, dictList }) {
  return request({
    url: BASE_URL + '/key/' + dictKeyId,
    method: 'post',
    data: dictList
  })
}

// 删除数据字典类型
export function DictDel(dictKeyId) {
  return request({
    url: BASE_URL + '/key/' + dictKeyId,
    method: 'delete'
  })
}

// 启用/停用数据字典
export function DictStatusChange(dictKeyId) {
  return request({
    url: BASE_URL + '/key/' + dictKeyId + '/status',
    method: 'put'
  })
}

export function DictKeys(keys) {
  return request({
    url: BASE_URL + '/' + keys,
    method: 'get'
  })
}

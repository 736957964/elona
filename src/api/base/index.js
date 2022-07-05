import request from '@/plugin/axios'
const BASE_URL = ``
// 新增
export function insertTableData(data) {
  return request({
    url: BASE_URL + '/insertTableData',
    method: 'post',
    data
  })
}
// 删除
export function deleteTableData(data) {
  return request({
    url: BASE_URL + '/deleteTableData',
    method: 'post',
    data
  })
}
// 查询
export function getTableData(data) {
  return request({
    url: BASE_URL + '/getTableData',
    method: 'post',
    data
  })
}
// 修改
export function reviseTableData(data) {
  return request({
    url: BASE_URL + '/reviseTableData',
    method: 'post',
    data
  })
}
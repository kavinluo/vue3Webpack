/*
 * @Author: kavinluo
 * @Date: 2023-02-09 18:00:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-21 10:53:10
 * @Description: 无
 */
import { axios } from '@/utils/request'

const baseURL = '/process/pc'

/**
 * 添加规则
 * @param {*} data
 * @returns
 */
export function add (data) {
  return axios({
    url: `${baseURL}/examTheoryRule/add`,
    method: 'post',
    data: data,
    successTitle: '添加成功',
    jsonString: true,
    myError: true,
  })
}
/**
 * 修改
 * @param {*} parameter
 * @returns
 */
export function modify (parameter, id) {
  return axios({
    url: `${baseURL}/examTheoryRule/modify/${id}`,
    method: 'put',
    data: parameter,
    jsonString: true,
    successTitle: '修改成功'
  })
}
/**
 * 试卷包导入
 * @param {*} parameter
 * @returns
 */
export function importTheoryTmPage (parameter) {
  return axios({
    url: `${baseURL}/examTheoryRule/importTheoryTmPage`,
    method: 'post',
    data: parameter,
    myError: true,
    'Content-Type': 'multipart/form-data;'
  })
}
/**
 * 试卷包导出
 * @param {*} parameter
 * @returns
 */
export function exportTheoryRule (parameter) {
  return axios({
    url: `${baseURL}/examTheoryRule/exportTheoryRule/${parameter}`,
    method: 'post',
    responseType: 'blob'
    // jsonString: true,
    // data: parameter,
  })
}
/**
 *  分页查询
 * @param {*} parameter
 * @returns
 */
export function getListPage (parameter) {
  return axios({
    url: `${baseURL}/examTheoryRule/listPage`,
    method: 'get',
    params: parameter
  })
}
/**
 *  获得单个规则
 * @param {*} parameter
 * @returns
 */
export function getExamTheoryRule(parameter) {
  return axios({
    url: `${baseURL}/examTheoryRule/get/${parameter}`,
    method: 'get',
    params: parameter
  })
}


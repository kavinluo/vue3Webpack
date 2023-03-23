/*
 * @Author: kavinluo
 * @Date: 2023-02-09 18:00:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 09:01:23
 * @Description: 无
 */
import { axios } from '@/utils/request'

const baseURL = '/process/pc'

/**
 * 创建考生信息
 * @param {*} data
 * @returns
 */
export function authorizeExam (data) {
  return axios({
    url: `${baseURL}/examTheoryRule/authorizeExam`,
    method: 'post',
    data: data,
    successTitle: '授权成功！',
    jsonString: true,
  })
}
/**
 * 取消授权
 * @param {*} parameter
 * @returns
 */
export function cancelAuthorize (id) {
  return axios({
    url: `${baseURL}/examTheoryRule/cancelAuthorize/${id}`,
    method: 'post',
    successTitle: '取消授权成功！'
  })
}
/**
 *  分页查询考点
 * @param {*} parameter
 * @returns
 */
export function getListPage (parameter) {
  return axios({
    url: `${baseURL}/examTheoryRule/listPage`,
    method: 'get',
    params: parameter
    // successTitle: '修改成功'
  })
}
/**
 *  考程监控
 * @param {*} parameter
 * @returns
 */
export function listDto(parameter) {
  return axios({
    url: `${baseURL}/examPlace/listDto`,
    method: 'get',
    params: parameter
  })
}


/**
 * 查询考试延迟记录
 * @param {*} parameter
 * @returns
 */
export function delayedLogList (parameter) {
  return axios({
    url: `${baseURL}/examTheoryDelayedLog/list`,
    method: 'get',
    params: parameter
  })
}
/**
 * 生成卸载码
 * @param {*} parameter
 * @returns
 */
export function uninstallCode (parameter) {
  return axios({
    url: `${baseURL}/examPlace/generateUninstallCode`,
    method: 'post',
    params: parameter,
    successTitle: '生成卸载码成功！'
  })
}


/**
 * 一键生成卸载码
 * @param {*} parameter
 * @returns
 */
export function allUninstallCode (parameter) {
  return axios({
    url: `${baseURL}/examPlace/generateAllUninstallCode`,
    method: 'post',
    params: parameter,
    successTitle: '生成成功！'
  })
}

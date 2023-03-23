/*
 * @Author: kavinluo
 * @Date: 2023-02-09 18:00:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 10:28:55
 * @Description: 无
 */
import { axios } from '@/utils/request'

const baseURL = '/process/pc'

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
 * 导入作答数据
 * @param {*} parameter
 * @returns
 */
export function importUserTheoryScoreFile (parameter) {
  return axios({
    url: `${baseURL}/stuBasicInfo/importUserTheoryScoreFile`,
    method: 'post',
    data: parameter,
    myError: true,
    'Content-Type': 'multipart/form-data;'
  })
}
/**
 * 计算成绩
 * @param {*} parameter
 * @returns
 */
export function computationalResults (parameter) {
  return axios({
    url: `${baseURL}/examPlace/computationalResults`,
    method: 'post',
    data: parameter,
    // myError: true,
  })
}
/**
 * 成绩总览
 * @param {*} parameter
 * @returns
 */
export function queryUserScore (parameter) {
  return axios({
    url: `${baseURL}/stuBasicInfo/queryUserScore`,
    method: 'get',
    params: parameter,
  })
}
/**
 * 导出
 * @param {*} parameter
 * @returns
 */
export function exportUserScoreExcel (parameter) {
  return axios({
    url: `${baseURL}/stuBasicInfo/exportUserScoreExcel`,
    method: 'get',
    params: parameter,
    myError: true,
    responseType: 'blob',
    'Content-Type': 'multipart/form-data;'
  })
}
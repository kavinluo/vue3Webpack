/*
 * @Author: kavinluo
 * @Date: 2023-02-09 18:00:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 09:28:52
 * @Description: 无
 */
import { axios } from '@/utils/request'

const baseURL = '/passport/pc'

/**
 * 创建考生信息
 * @param {*} data
 * @returns
 */
export function addUserInfo (data) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/addArchivesBasicInfo`,
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
export function modifyUserInfo (parameter, id) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/modifyArchivesBasicInfo/${id}`,
    method: 'post',
    data: parameter,
    jsonString: true,
    successTitle: '修改成功'
  })
}
/**
 * 导入
 * @param {*} parameter
 * @returns
 */
export function importUserInfo (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/importTjArchivesBasicInfo`,
    method: 'post',
    jsonString: true,
    parameter: parameter,
  })
}
/**
 *  分页查询考点
 * @param {*} parameter
 * @returns
 */
export function getStuListPage (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/getStuListPage`,
    method: 'get',
    params: parameter
    // successTitle: '修改成功'
  })
}
/**
 *  获得考生信息
 * @param {*} parameter
 * @returns
 */
export function getStu(parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/getStu/${parameter}`,
    method: 'get',
    params: parameter
  })
}


/**
 * 根据编码获取考点
 * @param {*} parameter
 * @returns
 */
export function getByCode (parameter) {
  return axios({
    url: `${baseURL}/schools/getByCode`,
    method: 'get',
    jsonString: true,
    params: parameter,
    // successTitle: '添加成功'
  })
}

/**
 * 根据编号获取场次
 * @param {*} parameter
 * @returns
 */
export function getBySort (parameter) {
  return axios({
    url: `${baseURL}/examPlanScene/getBySort`,
    method: 'get',
    params: parameter,
  })
}

/**
 * 根据编号获取考场
 * @param {*} parameter
 * @returns
 */
export function getByExamPlaceArrange (parameter) {
  return axios({
    url: `${baseURL}/examPlaceArrange/getByCode`,
    method: 'get',
    params: parameter,
  })
}

/**
 * 根据编号获取考场
 * @param {*} parameter
 * @returns
 */
export function uploadPhoto (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/uploadPhoto`,
    method: 'post',
    data: parameter,
    myError: true,
    'Content-Type': 'multipart/form-data;',
  })
}
/**
 * 生成加密包
 * @param {*} parameter
 * @returns
 */
export function generateExamineeEncryptionPackage (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/generateExamineeEncryptionPackage`,
    method: 'post',
    data: parameter,
    successTitle: '生成加密包成功！'
  })
}

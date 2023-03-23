/*
 * @Author: kavinluo
 * @Date: 2023-02-09 18:00:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-15 09:43:34
 * @Description: 无
 */
import { axios } from '@/utils/request'

const baseURL = '/passport/pc'

/**
 * 创建考试名称
 * @param {*} data
 * @returns
 */
export function addSchool (data) {
  return axios({
    url: `${baseURL}/schools/add/SCHOOLS`,
    method: 'post',
    data: data,
    successTitle: '添加成功',
    jsonString: true
  })
}
/**
 * 修改考试名称
 * @param {*} parameter
 * @returns
 */
export function modifySchool (parameter, id) {
  return axios({
    url: `${baseURL}/schools/modify/${id}`,
    method: 'put',
    data: parameter,
    jsonString: true,
    successTitle: '修改成功'
  })
}
/**
 * 获取考试名称
 * @param {*} parameter
 * @returns
 */
export function getSchool (id) {
  return axios({
    url: `${baseURL}/schools/get/${id}`,
    method: 'get'
    // parameter: parameter,
  })
}
/**
 *  分页查询考点
 * @param {*} parameter
 * @returns
 */
export function getSchoolsList (parameter) {
  return axios({
    url: `${baseURL}/schools/listPage`,
    method: 'get',
    params: parameter
    // successTitle: '修改成功'
  })
}
/**
 *  分页查询考点
 * @param {*} parameter
 * @returns
 */
export function getList (parameter) {
  return axios({
    url: `${baseURL}/schools/list`,
    method: 'get',
    params: parameter
  })
}
/**
 * 考点管理员维护列表
 * @param {*} parameter
 * @returns
 */
export function getExamUserList (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/listPage`,
    method: 'get',
    params: parameter
  })
}


/**
 * 考点管理员维护添加
 * @param {*} parameter
 * @returns
 */
export function addExamUser (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/add/SCHOOL`,
    method: 'post',
    jsonString: true,
    data: parameter,
    successTitle: '添加成功'
  })
}
/**
 * 考点管理员维护修改
 * @param {*} parameter
 * @returns
 */
export function modifyExamUser (parameter,id) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/modify/${id}`,
    method: 'put',
    data: parameter,
    jsonString: true,
    successTitle: '修改成功'
  })
}

/**
 * 删除考点管理员
 * @param {*} parameter
 * @returns
 */
export function removeExamUser (parameter, ids) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/remove/${ids}`,
    method: 'delete',
    successTitle: '删除成功'
  })
}

/**
 * 获取单个考点管理员维护
 * @param {*} parameter
 * @returns
 */
export function getExamUser (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/get/${parameter}`,
    method: 'get'
  })
}
/**
 * 考场列表
 * @param {*} parameter
 * @returns
 */
export function getRoomList (parameter) {
  return axios({
    url: `${baseURL}/examPlaceArrange/theoryRoomList`,
    method: 'get',
    params: parameter,
  })
}
/**
 * 添加、修改考场
 * @param {*} parameter
 * @returns
 */
export function addOrModifyPlaceArrange (parameter, type) {
  return axios({
    url: `${baseURL}/examPlaceArrange/addOrModifyPlaceArrange/${parameter.schoolId}`,
    method: 'put',
    jsonString: true,
    data: parameter,
    successTitle: type === 'add' ? '添加成功！' :'修改成功！'
  })
}
/**
 * 单个考场
 * @param {*} parameter
 * @returns
 */
export function getOrModifyPlaceArrange (schoolsId) {
  return axios({
    url: `${baseURL}/examPlaceArrange/getPlaceArrangeBySchoolsId/${schoolsId}`,
    method: 'get',
    params: schoolsId,
  })
}

export const disEnable = `${baseURL}/archivesBasicInfo/account/disEnable`
export const enable = `${baseURL}/archivesBasicInfo/account/enable`
export const resetPassword = `${baseURL}/archivesBasicInfo/account/reset-password`
export const cancelPhoneBinding = {
  path: `${baseURL}/cancelPhoneBinding`,
  method: 'post'
}

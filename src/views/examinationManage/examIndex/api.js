/*
 * @Author: kavinluo
 * @Date: 2023-02-09 18:00:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 16:00:56
 * @Description: 无
 */
import { axios } from '@/utils/request'
const baseURL = '/passport/pc'

/**
 * 添加考试任务
 * @param {*} data
 * @returns
 */
export function addExam (data) {
  return axios({
    url: `${baseURL}/examTask/add`,
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
export function modifyExam (parameter) {
  return axios({
    url: `${baseURL}/examTask/modify/${parameter.id}`,
    method: 'put',
    data: parameter,
    jsonString: true,
    successTitle: '修改成功'
  })
}
/**
 * 修改考试名称
 * @param {*} parameter
 * @returns
 */
export function modifyExamPlan (parameter) {
  return axios({
    url: `${baseURL}/examPlan/modify/${parameter.id}`,
    method: 'put',
    data: parameter,
    jsonString: true,
    successTitle: '修改成功'
  })
}
/**
 * 获得单个任务
 * @param {*} parameter
 * @returns
 */
export function getExam (parameter) {
  return axios({
    url: `${baseURL}/examTask/get/${parameter}`,
    method: 'get',
    params: parameter,
  })
}
/**
 * 考试计划列表
 * @param {*} parameter
 * @returns
 */
export function getExamList (parameter) {
  return axios({
    url: `${baseURL}/examTask/listPage`,
    method: 'get',
    params: parameter
  })
}
/**
 * 删除考核计划表
 * @param {*} parameter
 * @returns
 */
export function remove (parameter) {
  return axios({
    url: `${baseURL}/examTask/remove/${parameter.id}`,
    method: 'delete',
    successTitle: '删除成功！'
  })
}
/**
 * 启停考核计划表
 * @param {*} parameter
 * @returns
 */
export function enable (parameter) {
  return axios({
    url: `${baseURL}/examTask/enable/${parameter.id}`,
    method: 'put',
    data: parameter,
    successTitle: parameter === 1 ? '启用成功！' : '停用成功！'
  })
}

/**
 * 恢复已删除考试任务
 * @param {*} parameter
 * @returns
 */
export function recover (parameter) {
  return axios({
    url: `${baseURL}/examTask/recover/${parameter}`,
    method: 'delete',
    successTitle: '恢复成功！'
  })
}

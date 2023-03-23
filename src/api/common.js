import { axios } from '@/utils/request'

const baseURL = '/passport/pc'

/**
 * envs
 */
export function getEnvs (parameter) {
  return axios({
    url: `/envs`,
    method: 'get',
    data: parameter
    // successTitle: ''
  })
}
/**
 * 登录
 */
export function login (parameter) {
  return axios({
    url: `${baseURL}/manage/login`,
    method: 'post',
    data: parameter,
    successTitle: '登录成功！'
  })
}
/**
 * 获取菜单
 */
export function getMenuTree (parameter) {
  return axios({
    url: `${baseURL}/menu/query-tree-by-user`,
    method: 'get',
    parameter: parameter
    // successTitle: ''
  })
}

/**
 * 获得个人信息
 */
export function getUserInfo (parameter) {
  return axios({
    url: `${baseURL}/archivesBasicInfo/getUserInfo`,
    method: 'get',
    parameter: parameter
    // successTitle: ''
  })
}

/**
 * 退出登录
 * @param {*} parameter
 * @returns
 */
export function logout (parameter) {
  return axios({
    url: `${baseURL}/logout`,
    method: 'DELETE',
    parameter: parameter
    // successTitle: ''
  })
}

/**
 * 删除
 * @param {*} parameter
 * @returns
 */
export function remove (url) {
  return axios({
    url: url,
    method: 'DELETE',
    isLoading: false,
    // parameter: parameter
    successTitle: '删除成功！'
  })
}

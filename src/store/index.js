/*
 * @Author: kevin
 * @Date: 2023-02-2 13:55:23
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 17:49:07
 * @Description: Do not edit
 */

import { createStore, useStore as useVuexStore } from 'vuex'
import router from '@/router'
import examPlan from './modules/examPlan'
import { getEnvs, login, getMenuTree, getUserInfo, logout } from '@/api/common.js'
import { setStaticData, setCookie, delStaticData, getStaticData, getCookie, delCookie } from '@/utils/util'

import { mapMenusToRoutes } from '@/router/async-router'


const store = createStore({
  namespaced: true, // 命名空间
  modules: {
    examPlan // 考试管理
  },
  state: {
    envs: {},
    Token: '',
    indexUrl: '',
    routerPath: {},
    useInfo: null,
    menuData: null, // 原始的菜单数据
    useMenuData: null, // 处理后的菜单数据
    headerMenuStatus: 'examinationManage',
    subMenus: [], // 储存子菜单
    hasSubMenus: false, // 是否有子菜单
    isJump: true, // 菜单是否跳转
    HOST: null,
    fileConfig: null,
    breadcrumbs: [] // 面包屑
  }
  ,

  mutations: {
    changerEven(state, envs) {
      state.envs = envs
      const { fileConfig } = envs
      state.fileConfig = fileConfig
      state.HOST = fileConfig.networkStaticUrl
    },
    changeToken(state, token) {
      state.Token = token
    },
    changeMenu(state, data) {
      state.menuData = data
      const _routes = mapMenusToRoutes(data)
      // _routes.forEach((route) => {
      //   router.addRoute('manage', route)
      // })
      state.useMenuData = _routes
      setStaticData('menuData', data) // 存储原始数据
      setStaticData('useMenuData', _routes) // 处理后的的数据
      // 刷新页面时先从本地获取
      const hasSubMenus = getStaticData('hasSubMenus')
      const subMenus = getStaticData('subMenus')
      state.subMenus = subMenus || _routes[0].children
      state.hasSubMenus = hasSubMenus || (state.subMenus?.length > 0)
      if (state.isJump) {
        if (state.hasSubMenus) {
          // router.push('/manage')
          // router.push(state.menuData[0].path)
        } else {
          router.push(data[0]?.path || '/manage')
        }
      }
    },
    changeSubMenus(state, subMenus) {
      state.subMenus = subMenus
      state.hasSubMenus = subMenus.length > 0
      // 切换时候存储菜单状态
      setStaticData('subMenus', state.subMenus)
      setStaticData('hasSubMenus', state.hasSubMenus)
    },
    changeSubMenuStatus(state, type) {
      state.hasSubMenus = type
    },

    changeHeaderStatus(state, type) {
      state.headerMenuStatus = type
    },

    changeUserInfo(state, data) {
      state.useInfo = data
    },

    /**
       * 设置路由默认首页地址
       * @param state  {} 状态对象
       *
       * @param index string "/index/manage"
    */
    setIndexUrl(state, index) {
      state.indexUrl = index
    },

    /**
       * 设置server返回的所有路由地址信息
       * @param state  {} 状态对象
       *
       * @param pathObj {"/index/manage":"/index/manage",.....}
   */

    setRouterPath(state, pathObj) {
      state.routerPath = pathObj
    },
    // 删除存储
    deleteUserInfo(state) {
      state.menuData = null
      state.useMenuData = null
      state.Token = null
      state.userInfo = null
      state.subMenus = []
      delStaticData('menuData')
      delStaticData('useMenuData')
      delStaticData('useInfo')
      delStaticData('subMenus')
      localStorage.clear()
      sessionStorage.clear()
      delCookie('Token')
      delCookie('evn')

    },

  },
  actions: {

    headerAction({ commit }, payload) {
      commit('changeHeaderStatus', payload)
    },


    /**
    * // 获取envs并设置
    * @param {*} param0
    * @param {*} payload
    */

    async envsAction({ commit }, payload) {
      const envsRes = await getEnvs(payload)
      const timeStamp = new Date().getTime()
      let severTimestamp = envsRes.data.timestamp
      severTimestamp = (severTimestamp !== null && severTimestamp != '') ? timeStamp - parseInt(severTimestamp) : null
      setCookie('ServerLongTime', severTimestamp, 1)
      setCookie('evn', JSON.stringify(envsRes.data))
      commit('changerEven', envsRes.data)
      setStaticData('envs', envsRes.data)
    },

    /**
    * 获得token
    * @param {*} param0
    * @param {*} payload
    */

    async loginActions({ commit, dispatch }, payload) {
      const loginRes = await login(payload)
      if (loginRes && loginRes.data) {
        commit('changeToken', loginRes.data)
        setCookie('Token', loginRes.data, 1)
        setStaticData('Token', loginRes.data)
        dispatch('userInfoActions') // 获取个人信息
        dispatch('getMenu') // 获取菜单
      }
    },

    /**
    * 获取个人信息
    * @param {*} param0
    * @param {*} payload
    */
    async userInfoActions({ commit }) {
      const userinfo = await getUserInfo()
      if (userinfo && userinfo.data) {
        setStaticData('userInfo', userinfo.data)
        commit('changeUserInfo', userinfo.data)
      }
    },

    /**
     * 获取菜单
     * @param {*} param0
     * @param {*} payload
     */
    async getMenu({ dispatch }, payload) {
      console.log('222', 222)
      const menuData = await getMenuTree(payload)
      if (menuData && menuData.data) { //
        console.log('333', 333)
        dispatch('setMeuseData', menuData.data[0].children)
        router.push('/manage')
      }
    },

    /**
     * 设置菜单
     * @param {*} param0
     * @param {*} payload
     */
    setMeuseData({ commit }, data = []) {
      // data = data.sort((a, b) => a.sequence - b.sequence)
      data.forEach(item => {
        if (item.children?.length) {
          item.children = item.children.sort((a, b) => a.sequence - b.sequence)
        }
      })
      // setStaticData('menuData', data)
      commit('changeMenu', data)
      // 设置默认进入后菜单状态

    },

    /**
     *  退出登录
     * @param {*} param0
     * @param {*} payload
     */
    async loginOut({ commit }) {
      const logoutRes = await logout()
      console.log('logoutRes', logoutRes)
      if (logoutRes.status.code == 0) {
        commit('deleteUserInfo')
        router.push('/login')
      }
    },

    async updateRootInfo({ commit }, payload) {
      commit('changerEven', payload)
    },

    /**
    * 设置子菜单菜单
     * @param {*} param0
     * @param {*} payload
     */
    changeSubMenusActions({ commit }, payload) {
      setStaticData('subMenus', payload)
      commit('changeSubMenus', payload)
    },

    actionsPageSize({ commit }, payload) {
      commit('changerPageSize', payload)
    },
    actionsCurrentPage({ commit }, payload) {
      commit('changerCurrentPage', payload)
    },
    async getListPage({ commit, state }, { fn, params, baseURL }) {
      const param = Object.assign({}, state.pagination, params)
      const { data = {} } = await fn(param, baseURL)
      commit('setTableData', data)
    },
    changeListPage({ dispatch }) {
      dispatch('getListPage')
    },

    /**
   * 刷新后获取本地数据
   * @param {*} param0
   * @param {*} payload
   */
    updateStore({ commit, dispatch }) {
      console.log('---updateStore---')
      const Token = getCookie('Token')
      if (Token) {
        commit('changeToken', Token)
        dispatch('userInfoActions') // 获取个人信息
        dispatch('getMenu') // 获取菜单
      }
    },

  },
  getters: {
    useInfo(state) {
      return `请叫我 ${state.name}`
    },
  },
  getIndexUrl: state => {
    return state.indexUrl
  },
  getRouterPath: state => {
    return state.routerPath
  }
})

export function setupStore() {
  store.dispatch('envsAction')
  // store.dispatch('updateStore')
}
export function useStore() {
  return useVuexStore()
}

// /**
//  * 更新列表
//  * @param {Function} getListFn
//  * @param {Object} params
//  * @param {String} baseURL
//  */

// export function updateList (getListFn, params, baseURL) {
//  store.dispatch('getListPage', { fn: getListFn, params, baseURL })
// }

export default store

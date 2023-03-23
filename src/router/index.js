/*
 * @Author: kavinluo
 * @Date: 2023-01-31 14:41:15
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-02 13:07:31
 * @Description: 无
 */
import { createRouter, createWebHistory } from 'vue-router'

import { getCookie } from '@/utils/util'
import routes from './routes'
const router = createRouter({
  routes,
  history: createWebHistory()
})
router.beforeEach((to) => {
  // const userMenus = getStaticData('userMenus') // 本地储存是否被删除
  // const userInfo = getStaticData('userInfo')
  const Token = getCookie('Token')
  if (to.path !== '/login') {
    if (!Token) {
      return '/login'
    }
  }
})
export default router

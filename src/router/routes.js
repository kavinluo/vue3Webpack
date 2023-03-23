/*
 * @Author: kavinluo
 * @Date: 2023-01-31 15:49:54
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-15 09:14:45
 * @Description: 无
 */
  import { workIndex, examinationManage, basic } from './routesList'
  const routes = [
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      meta: {
        title: '未找到页面'
      },
      component: () => import(/* webpackChunkName: "notFound-chunk" */'@/views/NotFound.vue')
    },
    {
      name: 'login',
      path: '/login',
      meta: {
        title: '登录'
      },
      component: () => import(/* webpackChunkName: "login" */'@/views/login.vue')
    },
    {
      path: '/',
      redirect: '/manage'
    },
    {
      path: '/manage',
      name: 'manage',
      redirect: '/manage/examinationManage',
      meta: {
        title: '考务管理系统',
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import(/* webpackChunkName: "index" */'@/layout/index.vue'),
      children: [
        workIndex,
        examinationManage,
        basic
      ]
    }
  ]
  console.log('routes', routes)
  export default routes

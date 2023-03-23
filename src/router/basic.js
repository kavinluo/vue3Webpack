/*
 * @Author: kavinluo
 * @Date: 2023-02-16 10:56:46
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-16 10:59:21
 * @Description: 账户管理
 */

const uList = { // 账户管理
  path: '/manage/useCunt',
  name: 'useCunt',
  meta: {
    title: '账户管理',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/basic/page/userList.vue')
}

export {
  uList
}

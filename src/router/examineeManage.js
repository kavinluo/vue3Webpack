/*
 * @Author: kavinluo
 * @Date: 2023-02-14 10:36:05
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-14 10:43:15
 * @Description: 无
 */
export default { // 考生信息维护
  path: '/manage/candidateInformation',
  name: 'candidateInformation',
  meta: {
    title: '考生信息维护',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examineeManage/examineeManage.vue')
}

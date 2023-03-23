/*
 * @Author: kavinluo
 * @Date: 2023-02-14 10:36:05
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-14 10:44:00
 * @Description: 无
 */
export default { // 考试规则定制
  path: '/manage/examRuleCustomization',
  name: 'examRuleCustomization',
  meta: {
    title: '考试规则定制',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examPaperManage/examRuleCustomization.vue')
}

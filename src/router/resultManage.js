const resultCalculation = { // 成绩计算
  path: '/manage/resultCalculation',
  name: 'resultCalculation',
  meta: {
    title: '成绩计算',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/resultManage/resultCalculation.vue')
}
const resultInquiry = { // 成绩查询
  path: '/manage/resultInquiry',
  name: 'resultInquiry',
  meta: {
    title: '成绩查询',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/resultManage/resultInquiry.vue')
}

export {
  resultInquiry,
  resultCalculation
}

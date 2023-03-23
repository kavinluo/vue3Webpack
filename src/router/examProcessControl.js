const examAuthorization = { // 开考授权
  path: '/manage/examAuthorization',
  name: 'examAuthorization',
  meta: {
    title: '开考授权',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examProcessControl/examAuthorization/examAuthorization.vue')
}
const examMonitoring = {
  path: '/manage/examMonitoring',
  name: 'examMonitoring',
  meta: {
    title: '考程监控',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examProcessControl/examMonitoring.vue')
}
const examDelays = {
  path: '/manage/examDelays',
  name: 'examDelays',
  meta: {
    title: '考程监控',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examProcessControl/examDelays.vue')
}
const dataUnload = {
  path: '/manage/dataUnload',
  name: 'dataUnload',
  meta: {
    title: '数据卸载',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examProcessControl/dataUnload.vue')
}

export {
  examAuthorization,
  examMonitoring,
  examDelays,
  dataUnload
}

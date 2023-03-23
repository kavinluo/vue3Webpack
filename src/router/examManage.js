/*
 * @Author: kavinluo
 * @Date: 2023-02-14 10:12:29
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-20 16:03:11
 * @Description: 无
 */
const schoolsManage = { // 考点管理
  path: '/manage/schoolsManage',
  name: 'schoolsManage',
  meta: {
    title: '考点管理',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examManage/schools/schoolsManageList.vue')
}

const examRoomManage = { // 考场管理
  path: '/manage/examRoomManage',
  name: 'examRoomManage',
  meta: {
    title: '考场管理',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examManage/examinationManage/examinationManageList.vue')
}

const testCenterUseManage = { // 考点管理员维护
  path: '/manage/testCenterUseManage',
  name: 'testCenterUseManage',
  meta: {
    title: '考点管理员维护',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/examinationManage/examManage/examUserManage/examUseManageList.vue')
}

export {
  schoolsManage,
  examRoomManage,
  testCenterUseManage
}

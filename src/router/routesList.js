/*
 * @Author: kavinluo
 * @Date: 2023-02-07 13:27:29
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-10 09:36:34
 * @Description: 无
 */

import {
  schoolsManage,
  examRoomManage,
  testCenterUseManage
 } from './examManage'
  import examineeManage from './examineeManage'
  import examRuleCustomization from './examPaperManage'
  import {
    examAuthorization,
    examMonitoring,
    examDelays,
    dataUnload
  } from './examProcessControl'
  import { uList } from './basic'
  import {
    resultInquiry,
    resultCalculation
  } from './resultManage'

const workIndex = {
    path: 'workIndex',
    name: 'workIndex',
    component: () => import(/* webpackChunkName: "workIndex" */'@/views/workIndex/workIndex.vue')
  }
  // 全部考试
  const allExam = {
    path: '/manage/allExam',
    name: 'allExam',
    meta: {
      title: '全部考试',
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "allExam" */'@/views/examinationManage/examIndex/allExam.vue')
  }

  // 回收站
 const trash = {
    path: '/manage/trash',
    name: 'trash',
    meta: {
      title: '回收站',
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "trash" */'@/views/examinationManage/examIndex/trash.vue')
 }
 const examPlan = {
  path: '/manage/examPlan',
  name: 'examPlan',
  meta: {
    title: '考务管理',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import(/* webpackChunkName: "examPla" */'@/views/examinationManage/examIndex/examPla.vue')
}

 const examinationManage = {
  path: '/manage/examinationManage',
  name: 'examinationManage',
  // redirect: '/manage/allExam',
  component: () => import(/* webpackChunkName: "examinationManage" */'@/views/examinationManage/examinationManage.vue'),
  children: [
    trash,
    allExam,
    examPlan,
    schoolsManage,
    examRoomManage,
    testCenterUseManage,
    examineeManage,
    examRuleCustomization,
    examAuthorization,
    examMonitoring,
    examDelays,
    dataUnload,
    resultInquiry,
    resultCalculation
  ]
}
// 基础管理
const basic = {
  path: '/manage/basic',
  name: 'basic',
  redirect: '/manage/useCunt',
  component: () => import(/* webpackChunkName: "basic" */'@/views/basic/page/userList.vue'),
  children: [
    uList
  ]
}

  export {
    workIndex,
    // trash,
    // allExam,
    examinationManage,
    basic
    // examPlan
  }

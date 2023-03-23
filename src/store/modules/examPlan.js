/*
 * @Author: kevin
 * @Date: 2022-02-28 09:09:17
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 14:49:16
 * @Description: ;
 */

export default ({
  namespaced: true, // 命名空间
  state () {
    return {
      examTask: null, // 当前考试任务
      listenCreateExam: false // 监听创建考试
    }
  },
  mutations: {
    changeExamPlan (state, payload) {
      state.examTask = payload
    },
    changeCreateExam (state, payload) {
      state.listenCreateExam = payload
    }
  },
  actions: {
    actionsCurrExam ({ commit }, payload) {
      commit('changeExamPlan', payload)
    },
    actionsCreateExam ({ commit }, payload) {
      commit('changeCreateExam', payload)
    }

  },
  getters: {

  }
})

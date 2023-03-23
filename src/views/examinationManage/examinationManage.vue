<!--
 * @Author: kavinluo
 * @Date: 2023-02-04 14:21:29
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-15 16:33:47
 * @Description: 无
-->

<template>
  <!-- 首页列表 -->
  <allExam v-if="route.name === 'examinationManage' && $store.state.headerMenuStatus ==='examinationManage'"></allExam>
  <!-- <allExam v-if="route.name === 'examinationManage'"></allExam> -->
  <router-view />
</template>

<script setup>
  import { watch } from 'vue'
  // import { useStore } from '@/store'
  import allExam from './examIndex/allExam.vue';
  import { useRoute } from 'vue-router'
  const route = useRoute()
  // const $store = useStore()

  watch(() => route.name, (val, old) => {
    console.log('val', val, old)
  })

  // const t = $store.state.headerMenuStatus

</script>

<style lang="scss" scoped>

</style>
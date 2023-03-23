<!--
 * @Author: kavinluo
 * @Date: 2023-01-31 14:41:15
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 17:16:47
 * @Description: 无
-->
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
  import { useStore } from '@/store'
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  import { ElConfigProvider } from 'element-plus'
  const $store = useStore()
  if(sessionStorage.getItem("store")){
    $store.replaceState(Object.assign({}, $store.state,JSON.parse(sessionStorage.getItem("store"))))
  }
  //在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener("beforeunload",()=>{
    sessionStorage.setItem("store",JSON.stringify($store.state))
  })

</script>

<style>
  html,
  body,
  #app {
    height: 100%;
  }
</style>

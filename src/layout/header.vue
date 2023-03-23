<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Author: kevin
 * @Date: 2022-02-25 09:42:38
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 14:37:05
 * @Description: Do not edit
-->
<template>
  <div class="topbar-left">
    <div class="logo">
      <img src="/static/image/KwLogo.png" height="60"/>
      <h2>无纸化考试系统</h2>
    </div>
  </div>
  <div class="topbar-navigation topbar-left">
    <template v-for="(item, y) in menuData" :key="y">
      <router-link :to="item.path" @click="handleMenu(item)" style="margin-right: 15px">
        <el-button color="#ffffff1a" size="large" type="primary">
          <el-icon><kvIcon :name="item.meta?.icon" /></el-icon>
           &nbsp;{{ item.title }}
        </el-button>
      </router-link>
    </template>
  </div>
  <div class="topbar-info topbar-right" ref="headline">
    <div class="welcome-info">
      欢迎您，{{ userInfo?.name }}
    </div>
    <el-dropdown class="use-name">
      <span class="el-dropdown-link">
        <span @click="downOut" id="useName">{{ userInfo?.name ? userInfo.name.substr(0,1) : '' }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from '@/store'

  const store = useStore()
  const downStatus = ref(false)
  const headline = ref(null) // $refs
  const userInfo = store.state.useInfo
  const menuData = store.state.useMenuData // ref(userMenus.menuData)
  const handleMenu = (item) => {
    store.dispatch('headerAction', item.name)
    const subMenuList = item.children || []
    store.dispatch('changeSubMenusActions', subMenuList)
    
    // 如果点击的是考务管理设置为左侧菜单为 无
    if (item.name === 'examinationManage') {
      store.commit('changeSubMenuStatus', false)
    } else {
      store.commit('changeSubMenuStatus', true)
    }
  }

  const downOut = () => {
    downStatus.value = !downStatus.value
  }
  const logOut = () => {
    store.dispatch('loginOut')
  }
  // 点击任何区域关闭
  const handleBodyClick = (event) => {
    const sp = headline.value
    if (sp) {
      if (!sp.contains(event.target)) {
        downStatus.value = false
      }
    }
  }
  document.addEventListener('click', handleBodyClick)
 
</script>
<style lang="scss" scoped>
  .router-link-active {
    button {
      background: #3e95ef;
    }
  }
</style>

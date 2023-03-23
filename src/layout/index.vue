<!--
 * @Author: kavinluo || luoKevin
 * @Date: 2023-01-31 15:57:34
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 17:55:21
 * @Description: Index
-->
<template>
  <el-container>
    <el-header id="header" height="80px">
      <headers />
    </el-header>
    <el-container class="main">
      <!-- 考务管理首页 如果是考务管理 单独显示其首页 -->
      <template v-if="isExamManage === 'examinationManage'">
        <el-aside style="background: inherit">
          <div class="menu-switch"></div> <!-- 占位 -->
          <exam-left />
        </el-aside>
        <!-- 考试列表 -->
        <el-main class="right-main" style="background: inherit">
          <div class="right-main-content">
            <router-view />
          </div>
        </el-main>
      </template>
      <template v-else>
        <!-- isExamManage: left 进入考务管理的二级菜单 -->
        <el-aside :width="'200px'" :style="!isFold ? menuSwitchOffStyle : menuSwitchOnStyle"
          v-if="hasSubMenus || isExamManage === 'left'">
          <div class="menu-switch" @click="handleFoldClick">
            <el-icon style="vertical-align: middle;font-size:15px">
              <Fold style="font-size:12px;margin-top: -5px;" v-if="isFold" />
              <Expand style="font-size:12px;margin-top: -5px;" v-else />
            </el-icon>
          </div>
          <leftMenu :collapse="isFold" />
        </el-aside>
        <el-main class="right-main">
          <div class="path" v-if="hasSubMenus"> {{ pathTree.breadcrumbs }} </div>
          <div class="right-main-content">
            <router-view />
          </div>
        </el-main>
      </template>

    </el-container>
  </el-container>
</template>

<script setup>
  import {
    ref,
    onBeforeUnmount,
    computed,
    watch,
    onUnmounted,
    onUpdated,
    onBeforeMount,
    onMounted,
    onBeforeUpdate } from 'vue'
  import headers from './header.vue'
  import leftMenu from './leftMenu.vue'
  import examLeft from '@/views/examinationManage/examIndex/examLeft.vue'
  import { useStore } from '@/store'
  import { useRoute } from 'vue-router'
  import { pathMapBreadcrumbs } from '@util/util'
  const store = useStore()
  const isExamManage = ref(store.state.headerMenuStatus) //ref(store.state.headerMenuStatus) //ref('examinationManage') // 是否是考务管理
  const isFold = ref(false)
  const route = useRoute()

  const hasSubMenus = ref(() => store.state.hasSubMenus) // 是否有子菜单

  // 监听头部菜单变化
  watch(
    [() => store.state.headerMenuStatus,
    () => store.state.hasSubMenus],
    ([headerMenuNew, hasSubMenusNew]) => {
      isExamManage.value = headerMenuNew
      hasSubMenus.value = hasSubMenusNew
    },
  )
  onBeforeMount(() => {
    // 挂载组件
    // 组件将要被挂载了
    // 可以访问到要挂载的目标
    // 不能访问到组件的dom
    // 这里可以访问到dom 但不能访问到组件的dom只能访问到要挂载的目标dom
    console.log('onBeforeMount 组件开始挂载')
  })

  onUnmounted(() => {
    // 当组件销毁之后触发
    console.log('onUnmounted 当组件销毁之后触发')
    //等待系统自动回收对象
    //销毁之后组件的对象还在，但是跟vue的实例脱离了关系了
    console.log('store', store)
  })
  onUpdated(() => {
    // 只有更新和模板发生关联的数据才会触发这个钩子
    // 和模板绑定的数据更新完成之后
    console.log('onUpdated 和模板绑定的数据更新完成之后')
  })
  onBeforeUpdate(() => {
    // 只有更新和模板发生关联的数据才会触发这个钩子
    // 和模板绑定的数据更新之前
    console.log('onBeforeUpdate 和模板绑定的数据更新之前')
  })

  onMounted(() => {
    // 组件挂载完成
    // 只有当组件挂载完成之后才能访问到组件的dom
    console.log('onMounted---- 组件挂载完成')
    // 监听点击浏览器返回按钮，设置历史记录
    if(window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      // history.pushState(null, null, document.URL);
      window.addEventListener('popstate', goBack, false);
    }
  })

  let goBack = () => {
    console.log('点击了浏览器的返回按钮！', history.state)
    if(history.state) {
      const { current,forward } = history.state
      if(current === '/manage/examinationManage') {
        store.dispatch('headerAction', 'examinationManage')
      }
      if(forward === '/manage/examinationManage') {
        store.dispatch('headerAction', 'left')
      }
    }
  }
  onBeforeUnmount(() => {
    // 一般像页面组件 页面离开之前 保存数据 可以通过这个钩子来完成
    // 当组件销毁之前触发
    console.log('onBeforeUnmount 当组件销毁之前触发')
    window.removeEventListener('popstate', goBack, false);
  })
  const handleFoldClick = () => {
    isFold.value = !isFold.value
  }

  const menuSwitchOffStyle = {
    width: '200px',
    transition: 'all .3s ease-out'
  }

  const menuSwitchOnStyle = {
    width: '64px',
    transition: 'all .5s ease-out'
  }
  // 面包屑的数据: [{name: , path: }]
  const menuData = store.state.useMenuData
  const pathTree = computed(() => {
    const currentPath = route.path
    const pathList = pathMapBreadcrumbs(menuData, currentPath)
    console.log('pathList', pathList)
    const breadcrumbs = pathList.map((item, index) => (index ? '>' : '') + item.name).join(' ')
    return {
      breadcrumbs,
      pathList
    }
  })

</script>

<style lang="scss">
.main {
  height: 100%;
  padding: 0 10px;
  display: flex;
}

.right-main {
  background: #fff;
  flex: 1;
  padding: 0 !important;
  margin: 15px 0 0 15px;

  .right-main-content {
    padding: 15px;
  }

  .path {
    height: 40px;
    line-height: 40px;
    background: #fff;
    padding: 0 15px;
    border-bottom: 15px solid #dce9f4;
    box-sizing: content-box;
  }
}

.menu-switch {
  height: 15px;
  text-align: center;
  cursor: pointer;
  background: #dce9f4;
}

#header {
  padding: 0 10px;
  background-image: linear-gradient(90deg, #3551a4, #2284b6 50%, #db9e68), linear-gradient(#3752a3, #3752a3);
  display: flex;
  align-items: center;

  .topbar-left {
    .logo {
      display: flex;
      align-items: center;

      h2 {
        font-size: 22px;
        color: #fff;
        font-weight: 500;
        margin-left: 10px;
        letter-spacing: 2px;
      }
    }
  }

  .topbar-navigation {
    margin-left: 40px;

    a * {
      color: #fff;
    }
  }

  .topbar-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    position: relative;

    .use-name {
      margin-left: 15px;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      background: #2284b6;
      color: #fff;
      cursor: pointer;
    }

    .show-down {
      width: 100px;
      position: absolute;
      right: -6px;
      background: #2284b6;
      top: 32px;
      padding: 5px 0;
      border-radius: 2px;

      li {
        display: block;
        padding: 5px 0;
        text-align: center;
        font-size: 12px;
        color: aliceblue;
        cursor: pointer;

        &:hover {
          background: #52a9d5;
          color: #fff;
        }
      }
    }
  }
}</style>

<!--
 * @Author: kavinluo 
 * @Date: 2023-02-07 14:27:40
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 17:45:17
-->
<template>
  <el-row style="margin-bottom: 15px">
    <el-col :span="8" style="display: flex;align-items: center; font-size: 22px;font-weight: 600">考试列表</el-col>
    <el-col :span="14" style="text-align: right; display: flex;justify-content: end;align-items: center;">
      <div>
        时间倒序<el-icon style="cursor: pointer;vertical-align: middle;" @click="handleSort('TIME')"><Sort /></el-icon>
      </div>
      <div style="margin:0 10px;">
        状态<el-icon style="cursor: pointer;vertical-align: middle;" @click="handleSort('STATUS')"><Sort /></el-icon>
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="" style="margin-bottom: 0">
            <el-input v-model="formInline.taskName" style="width: 200px" clearable placeholder="请输入考试名称" />
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col class="u-list" v-for="item in listData" :key="item.id">
      <div class="col-left">
        <div class="col-left-top">
          <div class="top-tit">{{ item.taskName}}</div>
          <div :class="['top-status', item.enable ? 'addColor': 'unColor']"> {{ item.enable ? '已启用' : '已停用' }}</div>
          <div class="top-time">发布时间：{{ formatDate(item.createTime, 'yyyy-MM-dd HH:mm:ss') }}</div>
        </div>
        <div class="col-left-b">
          <div class="b-timer">开放时间：2022/5/20 ~ 2022/5/22</div>
          <div class="b-status">
            <el-button @click="editHandle(item)" size="small" type="primary">修改</el-button>
            <!-- 1.启用；0 停用 key 强制更新 -->
            <myFirm buttonSize="small" :key="new Date().getTime()" :options="{ajaxFn: enable, params:{id:item.id, enable: item.enable ? '0' : 1 }}"
             :title="'您确定要'+ (item.enable ? '停用' : '启用')+'吗?'" @confirm="handleConfirm"
             :buttonType="item.enable ? 'danger' : 'success'"
             :buttonText="item.enable ? '停用' : '启用'"
             ></myFirm>

          </div>
          <div class="b-bth">
            <myFirm  buttonSize="small" :options="{ajaxFn: remove, params: {id: item.id } }" :buttonType="'danger'" title="您确定要删除吗？" @confirm="handleConfirm"></myFirm>
          </div>
        </div>
      </div>
      <div class="col-right">
        <el-button type="primary" @click="handleSetRouter(item)">管理详情</el-button>
      </div>
    </el-col> 
  </el-row>
  <div class="page-box">
    <el-pagination
      small
      background
      v-model:current-page="pagination.curPage"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 50, 100, 200]"
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
    />
  </div>
  <edits ref="edit" :inputType="'edit'"></edits>
</template>

<script setup>
  import { ref, watch, reactive } from 'vue'
  import edits from './examLeft.vue';
  import { formatDate } from '@/utils/formatDate.js'
  import { getExamList, remove, enable } from './api.js'
  import { useStore } from '@/store';
  import router from '@/router'
  const edit = ref(null)
  const $store = useStore()
  const total = ref(0)      
  const formInline = reactive({
    sort: '',
    taskName: '',
    searchValue: '',
    planId: ''
  })
  const pagination = reactive({
    curPage: 1,
    pageSize: 10
  });

  const listData = ref([])
  const handleSetRouter = (item) => {
    // 改变左侧状态
    router.push('/manage/examPlan')
    $store.dispatch('headerAction', 'left') //
    $store.commit('changeSubMenuStatus', true)
    // 存储当前选取的考试
    $store.dispatch('examPlan/actionsCurrExam', item)
    // if($store.state.subMenus.length) {
    //   console.log('$store.state.subMenus', $store.state.subMenus)
    //   // $store.dispatch('actionCurrentValue', $store.state.subMenus[0].id)
    // }
  }

  const getList = async () => {
    const data = await getExamList({...pagination, ...formInline})
    if(data) {
      total.value = data.data.total
      listData.value = data.data.list ?? []
    }
  }
  getList()

  const handleConfirm = () => {
    getList()
  }

  const editHandle = (item) => {
    edit.value.handleCreate(item)
  }
  const handleSizeChange = (pageSize) => {
    pagination.pageSize = pageSize
    // getList()
  }
  const handleCurrentChange = (currentChange) => {
    pagination.curPage = currentChange
  }
  // 查询
  const onSubmit = () => {
    getList()
  }
  watch([() => pagination, () => $store.state.examPlan.listenCreateExam],([vla, vla11], [old1, old22]) => {
    console.log('vla', vla)
    console.log('old1',old1 )
    console.log('vla11',vla11 )
    console.log('old22',old22 )
    getList()
  }, { deep: true })

  const handleSort = (type) => {
    if(type === 'TIME') {
      console.log('type', type)
    } else {
      console.log('type', type)
    }
  }
</script>

<style lang="scss" scoped>
.u-list {
  display: flex;
  background: #fff;
  padding: 15px 25px;
  border-radius: 4px;
  margin-bottom: 20px;
  .col-left {
    flex: 1;
    .col-left-top {
      display: flex;
      border-bottom: 1px solid #ddd;
      padding:0 10px 5px;

      .top-tit {
        flex: 1;
        font-size: 20px;
      }
      .top-status {
        width: 120px;
        text-align: center;
      }
      .top-time {
        width: 250px;
      }
    }
    .col-left-b {
      padding-top: 15px;
      display: flex;
      .b-timer {
        flex: 1;
      }
      .b-status {
        width: 120px;
        text-align: center;
      }
      .b-bth {
        width: 250px;
      }
    }
  }
  .addColor {
    color: #67c23a;
  }
  .unColor {
    color: #f56c6c;
  }
  .col-right {
    display: flex;
    align-items: center;
    padding: 0 0 0 30px;
  }
}
</style>
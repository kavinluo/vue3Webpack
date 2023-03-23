<!--
 * @Author: kavinluo 
 * @Date: 2023-02-07 14:27:40
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-09 12:14:07
-->
<template>
  <el-row style="margin-bottom: 15px">
    <el-col :span="8" style="display: flex;align-items: center; font-size: 22px;font-weight: 600">回收站</el-col>
    <el-col :span="14" style="text-align: right; display: flex;justify-content: end;align-items: center;">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="" style="margin-bottom: 0">
            <el-input v-model="formInline.taskName" placeholder="请输入考试名称" />
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
            <el-button type="primary" @click="handleConfirm">查询</el-button>
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
          <div class="top-status"> {{ item.enable ? '已启用' : '已停用' }}</div>
          <div class="top-time">发布时间：{{ formatDate(item.createTime, 'yyyy-MM-dd HH:mm:ss') }}</div>
        </div>
        <div class="col-left-b">
          <div class="b-timer">开放时间：2022/5/20 ~ 2022/5/22</div>
          <div class="b-status">
 
          </div>
          <div class="b-bth">
            <myFirm buttonText="恢复" :options="{ajaxFn: recover, params: item.id }" title="您确定要恢复吗？" @confirm="handleConfirm"></myFirm>
          </div>
        </div>
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
</template>

<script setup>
  import { ref, watch, reactive } from 'vue'
  import { getExamList, recover, } from './api.js'
  import { formatDate } from '@/utils/formatDate.js'

  import { useStore } from '@/store';
  const $store = useStore()
  const total = ref(0)      
  const formInline = reactive({
    isDelete: 1,
    taskName: ''
  })
  const pagination = reactive({
    curPage: 1,
    pageSize: 10,
  });

  const listData = ref([])


  const getList = async () => {
    const data = await getExamList({...pagination, ...formInline})
    console.log('data', data)
    if(data) {
      total.value = data.data.total
      listData.value = data.data.list ?? []
    }
  }
  getList()

const handleConfirm = () => {
  getList()
}

  const handleSizeChange = (pageSize) => {
    pagination.pageSize = pageSize
    // getList()
  }
  const handleCurrentChange = (currentChange) => {
    pagination.curPage = currentChange
  }

  watch([() => pagination, () => $store.state.examPlan.listenCreateExam],([vla, vla11], [old1, old22]) => {
    console.log('vla', vla)
    console.log('old1',old1 )
    console.log('vla11',vla11 )
    console.log('old22',old22 )
    getList()
  }, { deep: true })

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
  .col-right {
    display: flex;
    align-items: center;
    padding: 0 0 0 30px;
  }
}
</style>
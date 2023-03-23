<!--
 * @Author: kavinluo
 * @Date: 2023-02-20 13:29:26
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-10 17:09:52
 * @Description: 无
-->
<template>
  <div style="margin: -20px 0;">
    <slot>
      <div class="remove" v-if="title">{{title}}</div>
      <div v-else class="remove">确定要删除吗？</div>
    </slot>
    <el-row>
      <el-col :span="12" :offset="12">
        <load-btn @operateCallback="handleRemove" :btnData="loadBtn"></load-btn>&nbsp;
        <el-button class="cancelBtn" type="warning" @click="cancel('remove')">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // let Util;
  import { remove } from '@/api/common'
  import { valDataType  } from '@util/util'
  export default {
    name: 'remove',
    props: ['rowData', 'deleteUrl', 'idKey', 'title'],
    data () {
      return {
        //保存数据
        // addUrl:this.$globlURLPrefix.passport + '/role/add',
        // countDate: 0,
        loading:false,
        loadBtn: {title: '确定', callParEvent: 'operateCallback'},
      };
    },
    created () {
      // Util = this.$util;
    },
    methods: {
      cancel () {
        this.$emit('cancel', false); // 第二个参数为不加载列表
      },
      isLoadingFun(status){
        this.loading = status;
      },
      handleRemove (isLoadingFun) {
        // let that = this;
        let myUrl = [];
        isLoadingFun(true);

        for (var i = 0; i < this.rowData.length; i++) {
          myUrl.push(this.rowData[i][this.idKey || 'id']);
        }
        if (valDataType(this.rowData, 'Array')) {
          if (this.rowData.length > 0) {
            myUrl = this.deleteUrl + '/' + myUrl.join(',');
          } else {
            myUrl = this.deleteUrl;
          }
        } else {
          myUrl = this.deleteUrl;
        }
        remove(myUrl).then(res => {
          if(res['status']['code'] == 0){
            this.$emit('cancel', true);
          } else {
            isLoadingFun(false);
          }
        })

      
      }
    }
  };
</script>
<style>
.remove {
  padding-left: 56px;
    height: 100px;
    font: 18px 'Microsoft YaHei';
    line-height: 100px;
}
</style>

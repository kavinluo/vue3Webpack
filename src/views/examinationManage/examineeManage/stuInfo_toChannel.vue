<template>
  <div>
    <el-row class="but-space">
      <el-col :span="4" :offset="1" style="display: inline-flex;justify-content: center; align-items: center;">
        <!-- <Icon style="font-size: 50px" type="arrow-down-a"/> -->
        <el-icon size="50">
          <Download />
        </el-icon>
      </el-col>
      <el-col :span="16">
        <div style="margin-bottom: 10px;">填写导入人员的信息</div>
        <a href="javascript:void(0)" @click="handleDown">
          <el-button class="defaultBtn" size="" type="primary">下载模板
            <el-icon class="el-icon--right" size="12">
              <Download />
            </el-icon>
          </el-button>
        </a>
      </el-col>
    </el-row>
    <el-row class="but-space">
      <el-col :span="4" :offset="1" style="display: inline-flex;justify-content: center; align-items: center;">
        <el-icon size="50">
          <UploadFilled />
        </el-icon>
      </el-col>
      <el-col :span="16">
        <div style="margin-bottom: 10px;">上传填好的人员信息表 ( 仅支持.xls/.xlsx格式)</div>
        <my-xlsx @on-select-file="handleSelectedFile" :row="0">上传</my-xlsx>
      </el-col>
    </el-row>
    <el-row style="margin-top: 25px;">
      <el-col :span="18" :offset="5">
        <p>本次已导入记录数 : {{ totalNumber }}条</p>
      </el-col>
    </el-row>

    <el-row class="but-space">
      <el-col :span="10" :offset="9">
        <el-button class="submitBtn" @click="success" type="primary">完成</el-button>
        <el-button class="cancelBtn" @click="$emit('cancel', 'toChannelModal');" type="warning">取消</el-button>
      </el-col>
    </el-row>
    <!-- 导入 -->
    <el-dialog height="200" cancel-text="" v-model="toChannelModal" :width="1000">
      <template #header>
        <modal-header :content="toChannelId"></modal-header>
      </template>
      <to-channel v-if="toChannelModal" :handsontableOptions="handSonTableOptions" @cancel="closeChannel" :url="url"
        @success="subHandelEvent" :ch2en="ch2en" :data="convertedData" :add-data="{ taskId: taskId }" :validate="validate"
        :format="format"></to-channel>
      <template #footer></template>
    </el-dialog>
  </div>
</template>
<script setup>
  import { reactive, ref, getCurrentInstance } from 'vue'
  import toChannel from '@/components/common/toChannel_base-handsontable.vue'
  import baseRules from '@/formRules/base' // 公共规则
  import { Download, UploadFilled } from '@element-plus/icons-vue'
  import { useStore } from '@/store'
  import { downFile } from '@/utils/util'
  const { proxy } = getCurrentInstance()
  const errorMess = proxy.$message
  const $store = useStore()
  //props接收父组件传递过来的数据
  const props = defineProps(['taskId'])
  const url = ref('/passport/pc/archivesBasicInfo/importArchivesBasicInfo')
  const $emit = defineEmits(['toChannel'])
  const handSonTableOptions = reactive({
    columns: '',
  })
  const ch2en = reactive({
    sex: { // 格式化数据中文对应的英文
      '男': 'BOY', // 对应的中文会被替换成英文
      '女': 'GIRL',
    }
  })
  //导入条件
  const toChannelId = reactive({ id: 'toChannelId', title: '人员信息表' })
  let convertedData = reactive({})
  const format = reactive({
    '序号': 'seq',
    "准考证号": "stuNum",
    "姓名": "name",
    '性别': 'sex',
    '专业': 'specialty',
    "考试专业编码": "specialtyCode",
    "证件类型": "idCardType",
    "证件号": "idCard",
    "考点编码": "schoolsCode",
    "场次": "scene",
    "考场编号": "schoolCode",
    "座位号": "userSeatNum"
  })
  //记录总条数
  const totalNumber = ref(0)
  const toChannelModal = ref(false)

  /*
  * 当前组件发送事件给父组件
  * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
  * */
  const success = () => {
    if (!totalNumber.value) {
      errorMess.error('请导入数据！');
      return
    }
    $emit('success', 'toChannelModal', `导入${totalNumber.value}条数据`);
  }

  const cancel = (type) => {
    $emit('cancel', 'toChannelModal', type);
  }
  const closeChannel = (type) => {
    toChannelModal.value = false;
    if (type) {
      cancel(true)
    }
  }
  //点击上传获取文件回调函数
  const handleSelectedFile = (converted) => {
    console.log('converted', converted)
    let headerTemplateData = ['序号', '准考证号', '姓名', '性别', '专业', '考试专业编码', '证件类型', '证件号', '考点编码', '场次', '考场编号', '座位号']
    let headerData = converted.header
    for (let i = 0; i < headerData.length; i++) {
      let item = headerData[i]
      if (!headerTemplateData.includes(item)) {
        errorMess.error('上传模板不正确，请下载最新的模板');
        return;
      }
    }
    if (converted.body == 0) {
      errorMess.error('导入数据为空，请重新选择数据');
      return;
    }
    handSonTableOptions.columns = handsontableValidate(converted.header);
    convertedData = converted;
    convertedData.taskId = props.taskId
    toChannelModal.value = true
  }
  const validate = (data) => {
    let validate = {
      stuNum: [{ validate: baseRules._require, message: "准考证号必填" }, { validate: baseRules._illegalChar, message: "学号不允许输入非法字符" }],
      name: [{ validate: baseRules._require, message: "姓名必填" }, { validate: baseRules._illegalChar, message: "姓名不允许输入非法字符" }],
      sex: [{ validate: baseRules._require, message: "性别必填" }],
      specialty: [{ validate: baseRules._require, message: "专业必填" }, { validate: baseRules._illegalChar, message: "证件类型不允许输入非法字符" }],
      specialtyCode: [{ validate: baseRules._require, message: "考试专业编码必填" }, { validate: baseRules._illegalChar, message: "考试专业编码不允许输入非法字符" }],
      idCardType: [{ validate: baseRules._require, message: "证件类型必填" }, { validate: baseRules._illegalChar, message: "证件类型不允许输入非法字符" }],
      idCard: [{ validate: baseRules._idNumberImport, message: "身份证号不合法" }],
      schoolsCode: [{ validate: baseRules._require, message: "考点编码必填" }, { validate: baseRules._illegalChar, message: "考点编码不允许输入非法字符" }],
      scene: [{ validate: baseRules._require, message: "场次必填" }, { validate: baseRules._illegalChar, message: "场次不允许输入非法字符" }],
      schoolCode: [{ validate: baseRules._require, message: "考场编号必填" }, { validate: baseRules._illegalChar, message: "考场编号不允许输入非法字符" }],
      userSeatNum: [{ validate: baseRules._require, message: "座位号必填" }, { validate: baseRules._illegalChar, message: "座位号不允许输入非法字符" }]
    }
    return _spcsGvalidate(data, validate)
  }




  const handleDown = () => {
    let http = $store.state.envs.networkHttp
    let randomNum = Math.random()
    const url = http + 'static/template/考生导入模板.xls?randomNum=' + randomNum
    downFile(url)
  }

  //（性别）
  const _Sex = (value, callback) => {
    if (value == '' || value == null) {
      callback(false)
    } else {
      value = value.trim();
      if (value != '男' && value != '女') {
        callback(false)
      } else {
        callback(true);
      }
    }

  }
  /**handsontable验证规则  根据列表头部自动生成验证规则
   * @params  data {Array}  头部
   * @return  {null|Array}  头部
   * */
  const handsontableValidate = (header) => {
    let arr = []
    let index = header.indexOf('性别');
    arr[index] = {
      type: 'autocomplete',  //从里面选择
      source: ['男', '女'], //数据源
      strict: true, //是否是严格模式，严格模式就只允许从数据源里面选择
      validator: _Sex
    }
    return arr;
  }


  //导入成功回调函数
  const subHandelEvent = (data) => {
    closeChannel()
    totalNumber.value += data.length;
  }

  /**
     * 导入验证  水平测试 导入考生花名册用
     * @param {Array} data 源数据
     * @param {object} validate 验证规则
     * */
  const _spcsGvalidate = (data, validate) => {
    // let validates = validate
    let errorData = [];
    let flag = false;
    for (let i = 0; i < data.length; i++) {
      let item = data[i]; //一行数据
      let errObj = {
        seq: i,
        errorMsgList: []
      };
      for (let key in validate) { //获取对象的每一项数据
        if (!validate[key]) continue; //没有进行验证则下一项
        let isValid = true; //当前验证是否通过
        for (let l = 0; l < validate[key].length; l++) {
          if (!isValid) break;
          let valid = validate[key][l]; //每一项验证
          valid.validate(item[key], (mes) => {
            if (mes) {
              flag = true;
              isValid = false;
              // 水平测试  考生花名册导入   只对证件类型是身份证的 做身份证校验
              if (mes == '身份证号不合法') {
                if (item.idCardType == '中国居民身份证') {
                  errObj.errorMsgList.push(mes);
                }
              } else {
                errObj.errorMsgList.push(mes);
              }
            }
          }, valid.message); //进项验证
        }
      }
      if (errObj.errorMsgList != 0) {
        errorData.push(errObj);
      }
    }
    if (flag) {
      return errorData;
    } else {
      return;
    }
  }
</script>
<style>.but-space {
  margin-top: 36px;
}</style>
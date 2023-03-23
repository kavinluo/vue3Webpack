<template>
  <div class="vue-xlsx-container">
    <el-button size="" class="xlsx-button defaultBtn" @click="handleUploadBtnClick" type="primary">上传
      <el-icon class="el-icon--right" size="12">
        <Upload />
      </el-icon>
    </el-button>
    <input id="upload-input" type="file" :accept="accept" class="c-hide" @change="handleFileChange" style="display: none">
  </div>
</template>

<script>
import { read, utils } from 'xlsx'
import { getCurrentInstance } from 'vue'
import { Upload } from '@element-plus/icons-vue'
export default {
  name: 'myXlsx',
  data() {
    return {
      rawFile: null,
      workbook: null,
      tableData: {
        header: [],
        body: [],
      },
      xlsxArr: [],
      errorMess: {}
    }
  },
  props: {
    accept: {
      type: String,
      default: '.xlsx, .xls'
    },
    raw: {
      type: Boolean,
      default: false
    },
    row: {  //删除几个
      type: Number,
      default: 0
    },
    mergeRow: {  //删除几个
      type: Number,
      default: 0
    },
    dislodge: {  //去除空行
      type: Boolean,
      default: true
    },
    headerType: {  //头部类型  1||A
      default: 1
    },
  },
  components: {
    Upload
  },
  created() {
    const { proxy } = getCurrentInstance()
    this.errorMess = proxy.$message
  },
  computed: {

  },
  methods: {
    handleFileChange(e) {
      if (this.rawFile !== null) {
        return
      }
      let evt = window.event || e;
      let target = evt.target || evt.srcElement;

      this.rawFile = target.files[0];

      let fileName = this.rawFile["name"].toString();

      fileName = fileName.substring(this.rawFile["name"].lastIndexOf("."), fileName.length);
      if (!(fileName == '.xlsx' || fileName == '.xls')) {
        this.errorMess.warning('只能导入excel');
        return;
      }
      // this.ajaxCreateLoading(true);
      this.fileConvertToWorkbook(this.rawFile)
        .then((workbook) => {
          let xlsxArr = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: this.headerType, raw: this.raw });
          if (this.dislodge) {
            for (let i = 0; i < xlsxArr.length; i++) {
              if (xlsxArr[i] == 0) {
                xlsxArr.splice(i, 1)
                i = i - 1
              }
            }
          }
          if (xlsxArr.length > 1) {
            xlsxArr.splice(0, this.row);
          }
          this.xlsxArr = xlsxArr;
          this.workbook = workbook;
          this.initTable(
            this.xlsxArrToTableArr(xlsxArr)
          )
        })
        .catch((err) => {
          console.error(err)
        })
    },
    //处理读取的数据
    fileConvertToWorkbook(file) {
      let reader = new FileReader()
      let fixData = (data) => {
        let o = "", l = 0, w = 10240
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
      return new Promise((resolve, reject) => {
        try {
          reader.onload = (renderEvent) => {
            let data = renderEvent.target.result
            if (this.rABS) {
              /* if binary string, read with type 'binary' */
              resolve(read(data, { type: 'binary' }))
            } else {
              /* if array buffer, convert to base64 */
              let arr = fixData(data)
              resolve(read(btoa(arr), { type: 'base64' }))
            }
          }
          reader.onerror = (error) => {
            reject(error)
          }
          if (this.rABS) {
            reader.readAsBinaryString(file)
          } else {
            reader.readAsArrayBuffer(file)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    xlsxArrToTableArr(xlsxArr) {
      let tableArr = []
      let length = 0;
      let maxLength = 0;
      let maxLengthIndex = 0;
      xlsxArr.forEach((item, index) => {
        length = Object.keys(item).length;
        if (maxLength < length) {
          maxLength = length
          maxLengthIndex = index
        }
      })
      let tempHeader = [];
      tempHeader = xlsxArr[0];
      let tableHeader = Object.keys(xlsxArr[maxLengthIndex]);
      let rowItem = {}
      xlsxArr.forEach((item) => {
        rowItem = {}
        for (let i = 0; i < maxLength; i++) {
          rowItem[tableHeader[i]] = item[tableHeader[i]] || ''
        }
        tableArr.push(rowItem)
      })
      return {
        header: tempHeader,
        data: tableArr,
      }
    },
    tableArrToXlsxArr({ data, header }) {
      let xlsxArr = []
      let tempObj = {}
      data.forEach((rowItem) => {
        tempObj = {}
        rowItem.forEach((item, index) => {
          tempObj[header[index]] = item
        })
        xlsxArr.push(tempObj)
      })
      return xlsxArr
    },
    initTable({ data, header }) {
      data.splice(0, 1);
      this.tableData.header = header;
      this.tableData.body = data;
      this.tableData.xlsxArr = this.xlsxArr;
      let merges = this.workbook.Sheets[this.workbook.SheetNames[0]]['!merges'];
      console.log(merges);
      if (merges && merges.length > 1) {
        merges.splice(0, this.row);
      }
      this.tableData.merges = merges;
      this.$emit('on-select-file', this.tableData)
    },
    handleUploadBtnClick() {
      this.clearAllData()
      document.getElementById('upload-input').click()
    },
    clearAllData() {
      document.getElementById('upload-input').value = null
      this.tableData = {
        header: [],
        body: []
      }
      this.rawFile = null
      this.workbook = null
    }
  }
}
</script>



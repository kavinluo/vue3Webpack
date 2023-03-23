<template>
  <div>
    <div class="">
      <div id="example" style="border: 1px solid #dfe6ec;"></div>
      <br>
      <el-table v-if="!unShowError&&error[0]" :max-height="300" :data="error" style="width: 100%">
        <el-table-column prop="seq" label="行数" align="center" width="200">
        </el-table-column>
        <el-table-column prop="errorMessage" label="错误提示">
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="10" :offset="10">
          <div style="margin-top: 20px">
            <load-btn @handleToChannel="confirm" :btnData="loadBtn"></load-btn>
            <el-button class="cancelBtn" @click="cancel">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// 参考网站 https://docs.handsontable.com/0.35.0/tutorial-introduction.html （版本 0.35.0）
import { getCurrentInstance } from 'vue'
import Handsontable from 'handsontable';
import _ from 'lodash'
import 'handsontable/dist/handsontable.full.css';
import { axios } from '@/utils/request'
export default {

  /*title ：按钮文字
   *
   * format：格式化数据  把中文转换成英文
   *
   * 如 {
   //        "设备名称":"deviceTypeName",
   //        "设备编号":"deviceIdentifier",
   //        "单价":"price",
   //        "购买日期":"purchaseTime",
   //        "厂商电话":"manufacturerPhone",
   //        "维修电话":"servicingPhone",
   //        "所在位置":"storageLocation",
   //        "购买地址":"buyAdderss",
   //        "生产日期":"manufactureDate",
   //        "保修截止日期":"guaranteeDate",
   //        //"状态":"status",
   //        "描述":"describes"
   //      }
   *
   *
   * width :  单元格宽度
   * height :  最小高度
   *
   * ch2en 值中英文替换
   * 如 {
   *    sex:{ // 格式化数据中文对应的英文
   *      "男": "BOY", // 对应的中文会被替换成英文
   *      "女": "GIRL",
   *    }
   * }
   *
   * addData 附加值（该对象在提交的时候会追加在每一行数据之后）注：该对象会覆盖导入的数据
   * 如 {key:val}
   *
   * validate：验证
   * handsontableOptions {object} handsontable的其他属性
   * unFormat  不需要格式化 默认为空（需要格式化）
   * unSelfHeader  不需要自定义 布尔类型（默认false  表头为自定义 值为 ’性别‘ ’姓名‘ 表的第一列 ）
   * errorBefFun  处理接收到的错误信息
   * unShowError 不显示错误信息 默认为空 显示错误信息
   * unValidateCells 不需要handsontable阻碍提交（因为合并单元格会出现显示问题，所以设置此选项）
   * rows 存在合并单元格 此项值代表去掉多余的头部注释
   * spOrExaminer 是否是sp和考官导入  sp和考官导入  需根据身份证号计算出生年月
   *
   * */
  props: [
    'format',
    'height',
    'url',
    'data',
    'extra',
    'id',
    'date',
    'deptId',
    'treeRoad',
    'ch2en',
    'commitBefFun',
    'addData',
    'validate',
    'handsontableOptions',
    'unFormat',
    'unSelfHeader',
    'errorBefFun',
    'unShowError',
    'unValidateCells',
    'rows',
    'spOrExaminer',
  ],
  data() {
    return {
      //保存按钮基本信息
      loadBtn: {
        title: '确定',
        callParEvent: 'handleToChannel'
      },
      show: true,
      //        widths:'',
      body: [],
      header: [],
      formats: [],
      oldErrorList: [], //保存的是错误的行号
      row: this.rows || 0, //省略头部行数
      old: {
        oldRow: {}, //上一次点击的row
        oldKey: '' //上一次点击的key
      },
      tempArr: [], // 初始的时候临时body
      error: [],
      headerRows: 1, // 表头行数
      hot: '',
      errorMess: {},
    };
  },
  created() {
    const { proxy } = getCurrentInstance ()
   this.errorMess = proxy.$message
    if (this.format) {
      this.formats = this.format;
    }
    if (!this.url) {
      this.errorMess.warning('地址不能为空');
      return;
    }
    console.log(this.data, "data", this.formats);
    this.headerRows = (this.data.xlsxArr.length - this.data.body.length) || 1
  },
  mounted() {
    //页面dom稳定后调用
    this.$nextTick(function () {
        this.repaint()
      }
    );
  },
  methods: {
    repaint() {
      let merges = [];
      console.log(this.data.merges, "this.data.merges");
      if (this.data.merges) { //处理合并单元格的数据
        this.data.merges.map(item => {
          merges.push({ // item.s 开始的单元格  item.e结束的单元格
            row: this.unSelfHeader ? item.s.r : item.s.r - 1 - this.row, //如果需要格式化，那就减去一行
            col: item.s.c,
            rowspan: item.e.r - item.s.r + 1,
            colspan: item.e.c - item.s.c + 1
          });
        });
      }
      let container = document.getElementById('example');
      //其他属性是否有 columns（长度必须和导入的长度一样，一一对应）
      if (this.handsontableOptions) {
        if (this.handsontableOptions.columns) {
          if (this.handsontableOptions.columns.length < this.data.header.length) {
            // eslint-disable-next-line vue/no-mutating-props
            this.handsontableOptions.columns.length = this.data.header.length;
          }
        }
      }
      //是否需要自定义表头
      let data = {};
      if (this.unSelfHeader) {
        data.data = this.data.xlsxArr;
      } else {

        data.data = this.data.body;
        data.colHeaders = this.data.header;
      }
      //初始化 Handsontable
      let hot = new Handsontable(container, {
//          data: this.data.xlsxArr,
        height: 400,
        className: 'htCenter htMiddle', //单元格样式， 宽度居中 ， 高度居中
        rowHeaders: true,    //显示列头
        colHeaders: true,   //显示表头
//          autoColumnSize:true,
        contextMenu: true, //开启菜单
        fillHandle: true, //可水平或者垂直拖动，创建新行 // possible values: true, false, "horizontal", "vertical"
        mergeCells: merges, //合并单元格
        wordWrap: false,
        fixedRowsTop: 0,   //固定表头
        fixedColumnsLeft: 0,//固定左侧
        manualColumnMove: false,//可拖动列
        manualRowMove: false,//可拖动行

        stretchH: 'all',//延伸列的宽度 last/all/none //last:延伸最后一列,all:延伸所有列,none默认不延伸。
        ...data,
        ...this.handsontableOptions
      });
      this.hot = hot;
      console.log(this.hot, "this.hot");
      //把当前创建的实例返回出去
      this.$emit('hot', hot);
    },
    /*  确定
     * 点击提交按钮 监听是否提交数据
     * @param isLoadingFun boolean  form表单验证是否通过
     * */
    confirm() {
      if (!this.unValidateCells) {  //防止合并的单元格显示错乱；
        this.hot.validateCells((valid) => {
          if (valid) {
            this.confirmFun();
          } else {
            this.errorMess.warning('数据错误，请重写');
          }
          return;
        });
      } else {
        this.confirmFun();
      }

    },

    /**提交数据的函数
     *@params {}
     * */
    confirmFun() {
      let that = this;
      let _data = '';
      let data = _data = _.defaultsDeep([], this.hot.getData());
      this.hot.validateCells((valid) => {
        if (!valid) {
          this.errorMess.warning('数据错误，请重写');
          return;
        }
        if (this.unFormat) {
          console.log('6', 6)
        } else {
          this.header = this.formatHeader(this.data.header);
          this.formatBody(data);
          data = this.body;
        }
        if (this.validate) { // 存在验证规则
          let errorData = this.validate(data, this.data.header); //如果返回的有值则有错误信息，没有会返回空；
          if (errorData && errorData.length) {
            that.conductError(errorData);
            return;
          }
        }
        data = _.defaultsDeep([], data);

        // 中英文值转换
        if (this.ch2en && this.ch2en instanceof Object) {
          data.map(item => {
            for (let key in this.ch2en) {
              // 只对有中英文的键值对进行转换
              this.ch2en[key][item[key]] && (item[key] = this.ch2en[key][item[key]]);
            }
          });
        }
        // 附加值
        if (this.addData && this.addData instanceof Object) {
          data.map(item => Object.assign(item, this.addData));
        }
        //父页面的处理将要发送的data
        if (this.commitBefFun) {
          data = this.commitBefFun(data, this.data.header, this.header);
        }
        // 如果是sp或考官导入  需要根据身份证号计算出生年月
        if (this.spOrExaminer) {
          data.map((item) => {
            item.birth = this.getBirthdayFromIdCard(item.idCard)
          });
        }
        //处理服务数据
        axios({
          jsonString: true,
          url: (this.url),
          method: 'post',
          data: data,
          myError: true,
          successTitle: '导入成功！'
        }).then((res) => {
          let data = res.data;
          if(res['status']['code'] === '0') {
            // that.$emit('cancel')
            that.$emit('success', that.body, _data);
          }
          if (_.isObject(res['status']) && res['status']['code'] == 52) {
            // 返回错误信息时，如果需要再次查看导入的内容，如果是多级表头 需要重绘表格
            if (that.headerRows > 1) {
              that.repaint()
            }
            if (that.errorBefFun) {
              data = that.errorBefFun(data, _data, that.body, that.data.header, that.header);
            }
            if (data) {
              that.conductError(data);
            }
            that.errorMess.error('导入失败，请修改');
          }
        }).catch((response) => {
          if (response instanceof Error) {
            // 意外发生在设置要求引发一个错误
            that.errorMess.error(response.message);
          } else {
            that.errorMess.error(response.status + '错误!');
          }
        });
      });
    },

    /**验证单元格合法性
     * @return {boolean} true 合法 ，false 不合法
     * */
    validateCells() {
      this.hot.validateCells((valid) => {
        if (!valid) {
          return;
        }
      });

    },

    //处理错误
    conductError(data) {
      let error = [];
      for (let i = 0; i < data.length; i++) {
        //添加错误列表
        error.push({
          seq: data[i].seq,
          errorMessage: data[i].errorMsgList.join(' , ')
        });
      }
      this.error = error;
    },

    //双击打开输入框并获取焦点
    cellClick(row, col) {
      let old = this.old;
      if (old.oldRow) {
        old.oldRow[old.oldKey + 'edit'] = false;
      }
      let key = col['property']; // 当前点击的key值
      row[key + 'edit'] = true;
      old.oldRow = row;
      old.oldKey = key;
    },

    //格式化Header 把中文转换成英文
    formatHeader(data) {
      let format = this.formats;
      if (!format) {
        this.showMess('format未定义');
        return data;
      }
      let formats = [];
      let tempArr = [];
      for (let i = 0; i < data.length; i++) {
        tempArr.push({
          key: format[data[i]],
          label: data[i]
        });
        formats.push(format[data[i]]);
      }
      this.formats = formats;
      return tempArr;
    },

    //格式化body 把中文转换成英文
    formatBody(data) {
      let format = this.formats;
      let treeId = this.id;
      let deptId = this.deptId;
      let treeRoad = this.treeRoad;
      if (!format) return data;
      let tempArr = [];

      for (let i = 0; i < data.length; i++) {
        let tempObj = {};
        for (let key in format) {
          if (typeof format[key] == 'function') continue;
          tempObj[format[key]] = data[i][key];
          tempObj[format[key] + 'edit'] = false;
        }
        if (this.extra) {
          for (let k = 0; k < this.extra.length; k++) {
            tempObj[this.extra[i].key] = this.extra[i].label;
          }
        }
        if (this.date) {
          for (let l = 0; l < this.date.length; l++) {
            if (tempObj[this.date[l]]) {
              tempObj[this.date[l]] = tempObj[this.date[l]].replace(/\//g, '-');
            }
          }
        }
        if (treeId) tempObj.treeId = treeId;
        if (deptId) tempObj.depId = deptId;
        if (treeRoad) tempObj.treeRoad = treeRoad;
        tempObj.error = false;
        tempArr.push(tempObj);
      }
      this.tempArr = tempArr;
      //分段添加数据
      let that = this;
      that.body = [];
      that.body = tempArr;

      this.formats = this.format;
    },

    //取消弹窗
    cancel() {
      this.$emit('cancel');
    },

    remove(index) {
      this.body.splice(index, 1);
    },

    tableRowClassName(row) {
      if (row.error) {
        return 'positive-row';
      }
    },

    // 根据身份证号获取出生日期
    getBirthdayFromIdCard(idCard) {
      let birthday = "";
      if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
          birthday = "19" + idCard.substr(6, 4);
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 6);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2");
      }
      return birthday;
    }
  },
};

</script>
<style>
.hot-display-license-info {
  display: none;
}
</style>
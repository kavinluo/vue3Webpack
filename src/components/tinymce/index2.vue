<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" :value="modelValue" class="tinymce-textarea" @input="$emit('update:modelValue', $event.target.value)" />
    <!-- <el-input v-model="modelValue" type="textarea" placeholder="Please input"/> -->
    <div class="editor-custom-btn-container" v-if="readonly !==1">
      <editorImage :readonly='readonly' color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
// import { watch } from 'vue'
import editorImage from './components/EditorImage'
import {plugins, fontFormats} from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { axios } from '@/utils/request'
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const tinymceCDN = '/static/tinymce_5.6.2/tinymce.min.js'
// const 
// watch(modelValue, () => {

// })
export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    modelValue: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: [String, Boolean],
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    readonly: { // 是否禁止编辑 1:是, 0: 否
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      disabledUpLod: 0,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      console.log('val', val)
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  unmounted() {
    this.destroyTinymce()
  },
  methods: {
    handel (val){
      console.log('val', val)
    },
    init() {
      console.log('modelValue', this.modelValue)
      this.disabledUpLod = this.readonly
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
      console.log('this.modelValue', this.modelValue)
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        readonly : this.disabledUpLod,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',
        plugins: plugins,
        font_formats: fontFormats,//"微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        // images_upload_credentials: true, //对images_upload_url中指定的地址调用时是否传递cookie等跨域的凭据。
        // images_upload_url: '/api/passport/pc/file/upload/headImg', // 图片上传地址
        file_picker_callback: () => { //文件上传回调
        },
        // images_upload_handler: async (blobInfo, success, failure) => {
        //   var form = new FormData();
        //   form.append('file', blobInfo.blob(), blobInfo.filename());
        //   // blobInfo.blob()：包含了图片相关信息
        //   // upload为自己封装的上传图片接口。
        //   let {data} = await this.uploadPhoto(form);
        //   success()
        //   console.log(data,  success, failure);
        // },
        // skin_url: '/static/tinymce_5.6.2/skins/ui/oxide',//皮肤

        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',

        advlist_number_styles: 'default',
        // imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          console.log('editor', editor)
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            // this.$emit('input', editor.getContent())
            this.$emit('input', editor.getContent(), this.tinymceId,)
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
      })
      console.log('fghfgh',window.tinymce)
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${this.$store.state.envs.networkHttp + v.url}" >`))
    },
  /**
   * 根据编号获取考场
   * @param {*} parameter
   * @returns
   */
    uploadPhoto (parameter) {
      return axios({
        url: `/passport/pc/file/upload/headImg`,
        method: 'post',
        data: parameter,
        myError: true,
        'Content-Type': 'multipart/form-data;',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
  height: 100%
}
.tinymce-container :v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 2005;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

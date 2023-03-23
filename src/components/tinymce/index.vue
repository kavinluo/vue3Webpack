<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" :value="modelValue" class="tinymce-textarea" @input="$emit('update:modelValue', $event.target.value)" />
    <div class="editor-custom-btn-container" v-if="readonly !==1">
      <editorImage :readonly='readonly' color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script setup>
 import { ref, reactive, computed, watch, onUnmounted, onMounted, onActivated,onDeactivated, getCurrentInstance} from 'vue'
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import {plugins, fontFormats} from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
// import { axios } from '@/utils/request'
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const tinymceCDN = '/static/tinymce_5.6.2/tinymce.min.js'
const { proxy } =  getCurrentInstance()
// const emit = defineEmits(['update:modelValue', 'init', 'change'])
// export default {
  // name: 'Tinymce',
  // components: { editorImage },
  const $emit = defineEmits(['update:modelValue', 'init', 'change'])
  const props = defineProps({
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
  })
  // data() {
  //   return {
  const disabledUpLod = ref(0)
  const hasChange = ref(false)
  const hasInit = ref(false)
  const tinymceId = ref(props.id)
  const fullscreen = ref(false)
  const languageTypeList = reactive({
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      })

  // const containerWidth =ref()
  //   }
  // },
  const containerWidth = computed(() =>  {
      // const width = props.width
      if (/^[\d]+(\.[\d]+)?$/.test(props.width)) { // matches `100`, `'100'`
        return `${props.width}px`
      }
      return props.width
    })
    console.log('containerWidth', containerWidth)
  // watch(() =>props.modelValue,(val) => {
  //     console.log('val', val)
  //     if (!hasChange.value && hasInit.value) {
  //       nextTick(() =>
  //         window.tinymce.get(tinymceId.value).setContent(val || ''))
  //     }
  //   }
  // )
  onMounted(() =>{
    init()
  })

  watch(
  () => props.modelValue,
  (val, oldVal) => {
    console.log('oldVal', oldVal)
    // if (!state.editor || !state.editor.initialized) return
    // if (oldVal === val || val === getContent(state.editor)) return

    // printLog({ type: 'propsChanged to setContent' }, val, oldVal)

    // if (val === null) return resetContent('', state.editor)
    // setContent(getModelValue(), state.editor)
  }
)
  onActivated (()=> {
    if (window.tinymce) {
      initTinymce()
    }
  })
  // deactivated(()=> {
  //   destroyTinymce()
  // })
  onUnmounted(()=>{
    destroyTinymce()
  })
  onDeactivated(() => {
  // if (!props.id) return
  // tinymceId.value.remove()
  })
  let init = () => {
      disabledUpLod.value = props.readonly
      // dynamic load tinymce from cdn
     load(tinymceCDN, (err) => {
        if (err) {
          proxy.$message.error(err.message)
          return
        }
        initTinymce()
      })
  }
  let initTinymce = () => {
      // const _this = this
      window.tinymce.init({
        selector: `#${tinymceId.value}`,
        language: languageTypeList['zh'],
        height: props.height,
        readonly : disabledUpLod.value,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
        menubar: props.menubar,
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
          if (props.modelValue) {
            editor.setContent(props.modelValue)
          }
          hasInit.value = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            hasChange.value = true
            // this.$emit('input', editor.getContent())
            // console.log('767567', editor.getContent())
            $emit('update:modelValue', editor.getContent(), tinymceId.value,)
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            fullscreen.value = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
      })
      console.log('fghfgh',window.tinymce)
  }
  let destroyTinymce =() => {
      const tinymce = window.tinymce.get(tinymceId.value)
      if (fullscreen.value) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
  }
  // const setContent =(value) => {
  //     window.tinymce.get(tinymceId.value).setContent(value)
  //   }
  // let getContent = () => {
  //     window.tinymce.get(tinymceId.value).getContent()
  //   }
  let imageSuccessCBK = (arr) =>{
      arr.forEach(v => window.tinymce.get(tinymceId.value).insertContent(`<img class="wscnph" src="${this.$store.state.envs.networkHttp + v.url}" >`))
  }
  /**
   * 根据编号获取考场
   * @param {*} parameter
   * @returns
   */
  // let uploadPhoto = (parameter) => {
  //     return axios({
  //       url: `/passport/pc/file/upload/headImg`,
  //       method: 'post',
  //       data: parameter,
  //       myError: true,
  //       'Content-Type': 'multipart/form-data;',
  //     })
  //   }
</script>
<script>
 export default {
  name: 'Tinymce',
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

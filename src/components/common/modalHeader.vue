<!--
 * @Author: kavinluo
 * @Date: 2023-02-02 15:06:08
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-13 09:47:55
 * @Description: 无
-->
<template>
  <div :id="doc.id" ref="headerId" class="header" >{{doc.title}}</div>
</template>
<script>
  import $ from "jquery";
  const Event = {
    addHandler: function (oElement, sEvent, fnHandler) {
      oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent("on" + sEvent, fnHandler)
    },
    removeHandler: function (oElement, sEvent, fnHandler) {
      oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, fnHandler)
    }
  }
  export default{
    name: 'modalHeader',
    props:["content"],
    data(){
      return{
        doc: {}
      }
    },
    created () {
      console.log('this.content', this.content)
      this.doc = this.content
    },

    mounted(){
      let headerId = this.$refs.headerId;
      this.$nextTick(() => {
        let par = $(headerId).parents(".el-dialog")
        this.startDrag(headerId,par[0]);
      })

    },
    methods:{
      startDrag(bar, target, callback){
        let d = document;
        let getCss = function(o,key){
          return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
        }
        let params={
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
        if(getCss(target, "left") !== "auto"){
          params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
          params.top = getCss(target, "top");
        }
        //o是移动对象
        bar.onmousedown = function(event){
          params.flag = true;
          if(!event){
            event = window.event;
            //防止IE文字选中
            bar.onselectstart = function(){
              return false;
            }
          }
          var e = event;
          params.currentX = e.clientX;
          params.currentY = e.clientY;
        };

        let fnHandlerUp = function(){
          params.flag = false;
          if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
          }
          if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
          }
        };
        Event.addHandler(d, "mouseup", fnHandlerUp);

        let fnHandlerMove = function(event){
          var e = event ? event: window.event;
          if(params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            if(parseInt(params.left) + disX<630){
              target.style.left = parseInt(params.left) + disX + "px";
            }
            if(parseInt(params.top) + disY >-100){
              target.style.top = parseInt(params.top) + disY + "px";
            }
          }

          if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
          }
        }
        Event.addHandler(d, "mousemove", fnHandlerMove);
      }
    }
  }
</script>

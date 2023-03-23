<!--
 * @Author: kavinluo
 * @Date: 2023-01-31 15:57:34
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 09:38:55
 * @Description: 登录
-->
<template>
  <div class="loginMain" v-loading.fullscreen.lock="isLogin">
    <div class="loginBoxAll"  style="position:relative;height:100%">
      <div class="leftLogo">
        <img src="/static/image/KwLogo.png" alt="">
        <span v-if="evnData.systemType === 'college'"
          style="font-size: 30px;color: #fff;margin-left: 15px">天津市医学考试中心无纸化考试系统</span>
        <span v-else style="font-size: 30px;color: #fff;margin-left: 15px">天津市医学考试中心无纸化考试系统</span>
      </div>
      <div class="login-form">
        <div style="font-size: 19px;color: #409EFF;border-bottom: 2px solid #46adfb;
        padding: 15px 0 15px;margin: 15px 25px 25px;font-size: 30px;">登录 / LOGIN</div>
        <div style="padding: 5px 30px">
          <div style="position: relative; margin: 0 auto">
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="0"
              class="demo-ruleForm noinputleft">
              <el-form-item prop="username" style="margin-bottom: 0">
                <el-input v-model="ruleForm.username" clearable size="large" placeholder="请输入用户名">
                  <template #prefix>
                    用户名：
                  </template>
                  <template #suffix>
                    <el-icon class="el-input__icon">
                      <Avatar />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item style="margin: 30px 0" prop="password">
                <el-input v-model="ruleForm.password" type="password" clearable size="large" placeholder="请输入密码"
                  show-password>
                  <template #prefix>
                    密码：
                  </template>
                  <template #suffix>
                    <el-icon class="el-input__icon">
                      <Lock />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
              <div class="signin">
                <el-button class="btn_" type="primary" @click="submitForm(ruleFormRef)">登录
                </el-button>
              </div>
              <div></div>

              <div @click="retrievethepassword" style="text-align: right; margin: 10px 00;">忘记密码了？<span
                  style="color: #008cf8;cursor: pointer">找回密码</span></div>
              <div class="puzzle-box" style="">
                <Vcode :imgs="imgs" :show="isVerificationModel" @success="handleSuccess" @close="onClose" />
              </div>
          </div>
        </div>
      </div>
      <div id="copy">
        <p>Copyright © www.tcmtest.org.cn.All Rights Reserved.</p>
        <p>国家中医药管理局中医师资格认证中心 国家中医药管理局职业技能鉴定指导中心</p>
        <p>京ICP备08101629号-1 京公网安备110402450006号</p>
      </div>
    </div>
  </div>

    <el-dialog height="200" cancel-text="" v-model="reportModal" :width="400">
      <template #header>
      <modal-header
              :content="{title:'找回密码'}"></modal-header>
      </template>
      <div style="text-align: center; font-size: 16px;padding: 20px 0;"> 请联系系统管理员重置密码！
      </div>
    <template #footer>
      
    </template>
  </el-dialog>
</template>

<script setup>

  import { ref, onUpdated,onUnmounted } from 'vue'
  import Vcode from "vue3-puzzle-vcode";
  import { useStore } from '@/store'
  // import { useStore } from 'vuex'
  import img1 from '@/assets/verificationImage/1j.jpg'
  import img3 from '@/assets/verificationImage/3j.jpeg'
  import img4 from '@/assets/verificationImage/4j.png'
  import img5 from '@/assets/verificationImage/5j.png'
  import img6 from '@/assets/verificationImage/6j.png'
  import img7 from '@/assets/verificationImage/7j.jpg'
  import img8 from '@/assets/verificationImage/8j.png'
  import img9 from '@/assets/verificationImage/9j.png'
  const imgs = [img1, img3, img4, img5, img6, img7, img8, img9];
  const ruleFormRef = ref({})
  const evnData = ref({
    hospitalName: '',
    version: '',
    chinaName: '',
    copyright: '',
    pwdTerminalEncrypt: '',
    systemType: '',
    haveReCode: false
  })
  const reportModal = ref(false)
  const isLogin = ref(false)
  const isVerificationModel = ref(false)
  const ruleForm = ref({
    username: '',
    password: '',
    reCode: '',
    key: '',
  })
  const rules = ref({
    username: [{
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }],
    reCode: [{
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }]
  })


  const store = useStore()

  // store.dispatch('envsAction')
  onUpdated(() => {
    // 退出后重置更新状态
    store.dispatch('headerAction', 'examinationManage') // 定位到考务管理
    // store.dispatch('actionCurrentValue', null) // 重置默认选中
      // 只有更新和模板发生关联的数据才会触发这个钩子
      // 和模板绑定的数据更新完成之后
      console.log('登录页：onUpdated-----和模板绑定的数据更新完成之后')

      // window.addEventListener('keydown', keyDown)
    })
  const {
    hospitalName,
    version,
    chinaName,
    copyright,
    sysSecurityConfig,
    businessInfoConfig
  } = store.state.envs
    evnData.value.hospitalName = hospitalName || '';
    evnData.value.version = version || '';
    evnData.value.chinaName = chinaName || '';
    evnData.value.copyright = copyright || '';
    evnData.value.pwdTerminalEncrypt = sysSecurityConfig && sysSecurityConfig.pwdTerminalEncrypt
    evnData.value.systemType = businessInfoConfig && businessInfoConfig.systemType || ''
    evnData.value.haveReCode = businessInfoConfig?.haveReCode === "Y"


  const onClose = () => {
    isVerificationModel.value = false;
  };

  sessionStorage.clear()
  function openVerificationModel() {
    isVerificationModel.value = true
  }

  function submitForm(formEl) {
    formEl?.validate((valid) => {
      if (valid) {
        openVerificationModel()
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  document.onkeydown = e => {
    if(e.keyCode === 13) {
      submitForm(ruleFormRef.value)
    }
  }
  async function handleSuccess() {
      onClose(); // 验证成功，需要手动关闭模态框
    // const loginRes = await login(ruleForm.value)
    store.dispatch('loginActions',ruleForm.value)
    
  }
  function retrievethepassword() {
      reportModal.value = true
    }

    onUnmounted(() => {
      console.log('onUnmounted---组件销毁')
      // window.removeEventListener('keydown', keyDown, false)
    })
</script>

<style lang="scss">
.loginMain {
  width: 100%;
  height: 100%;
  // position: relative;
  .loginBoxAll {
    background-image: url('@/assets/image/loginBg.jpg');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: relative;

    .leftLogo {
      // position: absolute
      padding: 15px;
      display: flex;
      img {
        width: 100px;
      }
      span {
        display: flex;
        justify-content: center;
        align-items: center
      }
    }
  }
}

.loginBox {
  height: 410px;
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -177px 0 0 -155px;
}

.loginBox h2 {
  text-align: center;
}

.loginMain .loginbg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%
}

.loginMain .loginbg .firstchild {
  font-family: PingFang-SC-Heavy;
  font-size: 36px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}

.loginMain .loginbg .lastchild {
  margin-top: 26px;
  font-family: PingFang-SC-Regular;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}

.loginMain .username {
  position: relative;
  margin-bottom: 0;
}

.loginMain .username span {
  position: absolute;
  top: 4px;
  right: 12px;
  z-index: 1;
  color: rgb(205, 212, 217);
}

.loginMain .username input {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  padding-left: 17px;
  outline: 0;
  /*border: 1px solid #e2e5e8;*/
  color: #434343;
  background-color: #fff !important;
}

.loginMain .username .el-input__inner {
  /*border: none;*/
  background-color: #fff !important;
}

.loginMain .username .blueborder {
  border: 1px solid #008cf8 !important;
  border-radius: 3px !important;
}

/*cccborder*/
.loginMain .username .cccborder {
  border: 1px solid #e2e5e8;
  border-radius: 3px !important;
  float: left;
  margin-right: 5px
}

.loginMain .username input {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  padding-left: 17px;
  outline: 0;
  border: 1px solid #e2e5e8;
  color: #434343;
}

.loginMain .password {
  position: relative;
  /*margin-top: 30px*/
}

.loginMain .recode .el-input {
  width: 245px !important;
  float: left;
  margin-right: 10px
}

.loginMain .recode input {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  padding-left: 17px;
  outline: 0;
  border: 1px solid #e2e5e8;
  color: #434343;
}

.loginMain .password span {
  position: absolute;
  top: 4px;
  right: 12px;
  z-index: 1;
  color: rgb(205, 212, 217);
}

.loginMain .password input {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  padding-left: 17px;
  outline: 0;
  border: 1px solid #e2e5e8;
  color: #434343;
}

.loginMain .password .blueborder {
  border: 1px solid #008cf8;
  border-radius: 20px !important;
}

.loginMain .password .cccborder {
  border: 1px solid #e2e5e8;
  border-radius: 20px !important;
}

.loginMain .recode .blueborder {
  border: 1px solid #008cf8;
  border-radius: 20px !important;
}

.loginMain .signin {
  position: relative;
  cursor: pointer
}

.loginMain .signin .btn_ {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  background-color: #00a0e9;
  color: #fff;
  font-size: 14px;
  outline: 0;
  border: 1px solid #00a0e9;
  // right: 0;
}


.loginMain .noinputleft .el-form-item__content {
  margin-left: 0 !important;
}

.loginMain .username input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #434343;
}

.login-form {
  text-align: center;
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translate(50%, -50%);
  z-index: 10;
  width: 400px;
  height: 400px;
  border-radius: 5px;
  border: 10px #46adfb solid;
  background-color: #fff;
  .el-form-item {
    margin-bottom: 28px !important;
  }
}

.login-logo {
  position: relative;
  width: 470px;
  height: 300px;
}

.loginMain .password input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #434343;
}

#copy {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

#copy p {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0;
  color: #fff;
  opacity: 0.3 !important;
}

.logo-text {
  text-align: center;
  position: relative;
  /*left: 50%;*/
  /*-webkit-transform: translate(-41%, -64%);*/
  /*transform: translate(-41%, -64%);*/
  font-size: 16px;
  letter-spacing: 2px;
  white-space: nowrap;
}

.puzzle-box {
  position: absolute;
  top: -45px;
  box-shadow: 7px 9px 20px 1px #635858;
  -moz-box-shadow: 7px 9px 20px 1px #635858;
  -webkit-box-shadow: 7px 9px 20px 1px #635858;
  left: 24px;
}
.vue-auth-box_ {
  left: initial;
  right: 20% !important;
  transform: translate(50%,-50%) !important;
}
</style>

import baseRules from '@/formRules/base' // 公共规则

const stuInfo = {
  stuNum: [baseRules.requiredNumber],
  name: baseRules.required,
  sex: baseRules.required,
  idCardType: [baseRules.required],
  idCard: [baseRules.required,baseRules._idNumber],
  specialty: [baseRules.required],
  schoolsCode: [baseRules.requiredNumber],
  scene: [baseRules.requiredNumber],
  schoolCode: [baseRules.requiredNumber],
  userSeatNum: [baseRules.requiredNumber],
}

export {
  stuInfo
}
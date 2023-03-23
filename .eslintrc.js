/* eslint-env node */
module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 0 // disable this rule just for views
  }
}

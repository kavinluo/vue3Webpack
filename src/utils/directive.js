/*
 * @Author: kevin
 * @Date: 2022-03-31 09:31:10
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-02 13:08:26
 * @Description: 按钮防抖
 */

export default (app) => {
  app.directive('noAntiShake', {
    mounted (el) {
      el.addEventListener('click', () => {
        el.classList.add('disabled')
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
          el.classList.remove('disabled')
        }, 2000)
      })
    }
  })
}

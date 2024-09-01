
// #ifndef VUE3
import Vue from 'vue'
import App from './App'


// 封装弹框方法（Vue2实现）
// uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
// 	uni.showToast({
// 		title,
// 		duration,
// 		icon: 'none'
// 	})
// }


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  
  // 封装弹框方法（Vue3实现） 将方法添加到全局
    app.config.globalProperties.$showMsg = function (title = '数据加载失败！', duration = 1500) {
      uni.showToast({
        title,
        duration,
        icon: 'none'
      });
    };
	
  return {
    app
  }
}
// #endif
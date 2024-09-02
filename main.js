// // #ifndef VUE2
// import Vue from 'vue'
// import App from './App'

// // 1. 导入 store 的实例对象
// import store from './store/store'


// // 封装弹框方法（Vue2实现）
// // uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
// // 	uni.showToast({
// // 		title,
// // 		duration,
// // 		icon: 'none'
// // 	})
// // }


// Vue.config.productionTip = false

// App.mpType = 'app'

// const app = new Vue({
// 	...App,
// 	// 2. 将 store 挂载到 Vue 实例上
// 	store,
// })
// app.$mount()

// // #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import store from './store/store'
import UniIcons from './uni_modules/uni-icons/components/uni-icons/uni-icons.vue'

export function createApp() {
	const app = createSSRApp(App)
	// 挂载 store 到 Vue 3 实例
	app.use(store)

	app.use(UniIcons)
	// 封装弹框方法（Vue3实现） 将方法添加到全局
	app.config.globalProperties.$showMsg = function(title = '数据加载失败！', duration = 1500) {
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
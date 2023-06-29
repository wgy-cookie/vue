// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// ElementUI 组件引入-----开始
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// ElementUI 组件引入-----结束


// axios 组件引入-----开始
import axios from 'axios'
//配置axios的全局基本路径
// axios.defaults.baseURL='http://192.168.147.128:8010';
axios.defaults.baseURL='http://localhost:8010';
//全局属性配置，在任意组件内可以使用this.$http获取axios对象
Vue.prototype.$http = axios;
// axios 组件引入-----结束

// echarts 组件引入-----开始
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
// echarts 组件引入-----结束

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

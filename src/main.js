import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'

// 导入全局css
import '@/assets/css/index.css'

const app =createApp(App)
// Vant组件循环注册
getVant(app)
app.use(store).use(router).mount('#app')

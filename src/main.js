import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import ZkTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios
Vue.filter('dataFomat', (time) => {
    const now = new Date(time)
    const y = now.getFullYear()
    const m = (now.getMonth() + 1 + '').padStart(2, '0')
    const d = (now.getDate() + '').padStart(2, '0')
    const hh = (now.getHours() + '').padStart(2, '0')
    const mm = (now.getMinutes() + '').padStart(2, '0')
    const ss = (now.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false
Vue.use(ZkTable)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

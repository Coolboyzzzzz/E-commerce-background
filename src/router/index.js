import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcom.vue'
import users from '../components/user/users.vue'
import roles from '../components/user/roles.vue'
import asd1 from '../components/user/asd1.vue'
import goods from '../components/goods/goodsidex.vue'
import goodspage from '../components/goods/goodspage.vue'
import goodslist from '../components/goods/goodslist.vue'
import add from '../components/goods/add.vue'
import order from '../components/order/order.vue'
import report from '../components/report/report.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'

    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: welcome
        }, {
            path: '/users',
            component: users
        }, {
            path: '/roles',
            component: roles
        }, {
            path: '/asd1',
            component: asd1
        }, {
            path: '/goodsIndex',
            component: goods
        }, {
            path: '/goodspage',
            component: goodspage
        }, {
            path: '/goodslist',
            component: goodslist
        }, {
            path: '/goods/add',
            component: add
        }, {
            path: '/goodsorder',
            component: order
        }, {
            path: '/report',
            component: report
        }]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tonkenstr = window.sessionStorage.getItem('token')
    if (!tonkenstr) return next('/login')
    next()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        //健康一卡通
        {
            path: '/oneCardSolution/',
            component: resolve => require(['../pages/oneCardSolution/HomePage.vue'], resolve)
        }, {
            path: '/oneCardSolution/baseInfo',
            component: resolve => require(['../pages/oneCardSolution/BaseInfo.vue'], resolve)
        }, {
            path: '/oneCardSolution/changeAddr',
            component: resolve => require(['../pages/oneCardSolution/ChangeAddr.vue'], resolve)
        }, {
            path: '/oneCardSolution/marriage',
            component: resolve => require(['../pages/oneCardSolution/Marriage.vue'], resolve)
        }, {
            path: '/oneCardSolution/certificate',
            component: resolve => require(['../pages/oneCardSolution/Certificate.vue'], resolve)
        },
        //老年人优待证
        {
            path: '/precedence',
            component: resolve => require(['../pages/precedence/Precedence.vue'], resolve)
        }, {
            path: '/precedence/homepage',
            component: resolve => require(['../pages/precedence/HomePage.vue'], resolve)
        }, {
            path: '/precedence/agent',
            component: resolve => require(['../pages/precedence/Agent.vue'], resolve)
        }, {
            path: '/precedence/certificate',
            component: resolve => require(['../pages/precedence/Certificate.vue'], resolve)
        }, {
            path: '/precedence/changeAddr',
            component: resolve => require(['../pages/precedence/ChangeAddr.vue'], resolve)
        }
    ]
})

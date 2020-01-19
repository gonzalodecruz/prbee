import Vue from 'vue'
import VueRouter from 'vue-router'
import { loadLanguageAsync } from '@/i18n'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/Default'),
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/Home'),
                }
            ]
        },
        {
            path: '/',
            component: () => import('@/layouts/Auth'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/Login'),
                }
            ]
        },
        {
            path: '/admin',
            component: () => import('@/layouts/Admin'),
            children: [
                {
                    path: '/',
                    name: 'admin.subscription',
                    component: () => import('@/views/admin/Subscription'),
                }
            ],
            meta: {
                auth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const locale = process.env.VUE_APP_LOCALE || 'en'
    loadLanguageAsync(locale).then(() => next())
})

export default router;

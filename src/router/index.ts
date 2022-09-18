import { createRouter, createWebHistory } from 'vue-router'
import { OtherPage1 } from '../components/OtherPage1'

const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import('../components/HelloWorld.vue'),
            children: [
                {
                    path: 'page2',
                    name: 'page2',
                    component: OtherPage1
                }
            ]
        },
        {
            path: '/page1',
            name: 'page1',
            component: OtherPage1
        }
    ],
    history: createWebHistory()
})

export default router
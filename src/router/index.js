import Vue from 'vue'
import Router from 'vue-router'
import bgmList from "../page/bgmList";
import bgmUpload from "../page/bgmUpload";
import userList from "../page/userList";
import explain from "../page/explain";
import login from "../page/login";
import manage from "../page/manage";
import home from "../page/home";
import videoList from "../page/videoList";
import reportList from "../page/reportList";

Vue.use(Router)


const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/userList',
            component: userList,
            meta: ['用户管理', '用户列表'],
        }, {
            path: '/videoList',
            component: videoList,
            meta: ['短视频管理', '短视频列表'],
        },
            {
                path: '/reportList',
                component: reportList,
                meta: ['举报管理', '举报列表'],
            }, {
                path: '/bgmList',
                component: bgmList,
                meta: ['bgm管理', 'bgm列表'],
            }, {
                path: '/bgmUpload',
                component: bgmUpload,
                meta: ['bgm管理', '上传bgm'],
            }, {
                path: '/explain',
                component: explain,
                meta: ['说明', '说明'],
            }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})

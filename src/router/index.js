import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/layout",
            name: 'layout',
            component: () => import("@/layout/layout.vue"),
        },
        {
            path: "/",
            name: "login",
            component: () => import("@/layout/login.vue"),
        },
        {
            path: "/index",
            name: "index",
            component: () => import("@/views/index.vue"),
            children: [
                {
                    path: "mybook",
                    name: 'mybook',
                    component: () => import("@/views/mybook.vue"),
                },
                {
                    path: "notes",
                    name: 'notes',
                    component: () => import("@/views/notes.vue"),
                },
                {
                    path: "photo",
                    name: 'photo',
                    component: () => import("@/views/photo.vue"),
                },
                {
                    path: "record",
                    name: 'record',
                    component: () => import("@/views/record.vue"),
                }
            ],
        },


    ]
})
//全局路由守卫
router.beforeEach((to, _, next) => {
    next();
});
export default router;
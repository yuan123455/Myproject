import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/views/index.vue"),
            children: [
                {
                    path: "/",
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
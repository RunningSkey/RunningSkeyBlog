# vue 项目关于 router.addRoutes 刷新白屏解决方案

这是一个简单例子，权限路由组件是 Table

注意最后那个`{ path: '*', redirect: '/404', hidden: true }`
这个不能一开始就导入路由,要放到 addRoutes 里面.
如果一开始就导入的话,刷新页面,router 会找不到动态路由 Table 组件,因为这个时候并没有添加进来,router 会直接重定向 404

```js
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Table from "../views/Table";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // {
  //   path: '/table',
  //   name: 'Table',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "table" */ '../views/Table.vue')
  // }
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "fail" */ "../views/404"),
  },
  // {
  //   path: '*', redirect: '/404', hidden: true
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!router.getRoutes().find((item) => item.name === "Table")) {
    router.addRoutes([
      {
        path: "/table",
        name: "Table",
        component: (resolve) => require(["../views/Table.vue"], resolve),
      },
      {
        path: "*",
        redirect: "/404",
        hidden: true,
      },
    ]);
    next({ ...to, replace: true });
  } else {
    next();
  }
});

export default router;
```

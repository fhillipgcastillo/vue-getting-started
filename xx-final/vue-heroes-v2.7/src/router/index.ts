import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "heroes",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/hero-detail/:heroId",
      name: "hero-detail",
      component: () => import("../views/HeroDetailView.vue"),
    },
    {
      path: "/hero-detail",
      name: "add-hero",
      component: () => import("../views/HeroDetailView.vue"),
    },
    {
      path: "/villains",
      name: "villains",
      component: () => import("../views/VillainsView.vue"),
    },
    {
      path: "/villain-detail/:villainId",
      name: "villain-detail",
      component: () => import("../views/VillainDetailsView.vue"),
    },
    {
      path: "/counter",
      name: "counter",
      component: () => import("../views/CounterView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
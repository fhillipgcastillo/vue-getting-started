import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "heroes",
    },
    {
      path: "/heroes",
      name: "heroes",
      component: () => import("../views/HeroesView.vue"),
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
      component: () => import("../views/VillainDetailsView.vue"),
    },
    {
      path: "/add-villain",
      component: () => import("../views/VillainDetailsView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: '*',
      component: () => import("../views/page-not-found.vue"),
    },
  ],
});

export default router;

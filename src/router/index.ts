import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ItemsPage from "@/views/ItemsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/item:id",
    name: "Item",
    component: ItemsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

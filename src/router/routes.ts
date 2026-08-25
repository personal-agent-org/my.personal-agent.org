import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/:pathMatch(.*)*", name: "portal", component: () => import("@/pages/PortalPage.vue") },
];

export default routes;

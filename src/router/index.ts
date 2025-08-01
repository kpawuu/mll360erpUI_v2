import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { setupNavigationGuards } from './guards';
import { authRoutes } from './modules/auth.routes';
import { crmRoutes } from './modules/crm.routes';
import { csRoutes } from './modules/cs.routes';
import { settingsRoutes } from './modules/settings.routes';

const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...crmRoutes,
  ...csRoutes,
  ...settingsRoutes,
  // Redirect root to dashboard
  {
    path: '/',
    redirect: '/crm'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Setup navigation guards
setupNavigationGuards(router);

export default router;
import { createRouter, createWebHistory } from "vue-router";
import type { AppRouteModule } from './types';
import { setupNavigationGuards } from './guards';
import { authRoutes } from './modules/auth.routes';
import { crmRoutes } from './modules/crm.routes';
import { csRoutes } from './modules/cs.routes';

const routes: AppRouteModule = [
  ...authRoutes,
  ...crmRoutes,
  ...csRoutes,
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
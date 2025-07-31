import type { Router } from 'vue-router';
import { useAuthStore } from "../store/auth.store";

export function setupNavigationGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const useAuth = useAuthStore();
    const accessToken = await useAuth.getAccessToken();
    const isAuthenticated = accessToken && await useAuth.isAccessTokenValid();

    // Redirect authenticated users trying to access unauthenticated pages
    if (isAuthenticated && (to.path === '/auth/login' || to.path === '/auth/register' || to.path === '/auth/verifyotp' || to.path === '/auth/forgotten-password-otp')) {
      next('/');
      return;
    }

    // Redirect unauthenticated users trying to access authenticated pages
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/auth/login');
      return;
    }

    next();
  });
} 
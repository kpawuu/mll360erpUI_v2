import type { Router } from 'vue-router';
import { useAuthStore } from "../store/auth.store";
import { initFlowbite } from 'flowbite';

export function setupNavigationGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log('Navigating to:', to.path);
    
    const authStore = useAuthStore();
    
    // Check if user is authenticated
    const isAuthenticated = await (authStore as any).isAuthenticated();
    console.log('Router guard - isAuthenticated:', isAuthenticated)
    console.log('Router guard - user data:', authStore.user)

    // Redirect authenticated users trying to access auth pages
    if (isAuthenticated && (to.path === '/auth/login' || to.path === '/auth/register' || to.path === '/auth/verifyotp' || to.path === '/auth/forgotten-password-otp')) {
      console.log('Router guard - redirecting authenticated user from auth page')
      
      // Check user type and redirect accordingly
      const usertypeId = authStore.user?.usertype_id || authStore.user?.usertype || authStore.user?.type_id || authStore.user?.type
      console.log('Router guard - usertype ID:', usertypeId)
      
      if (authStore.user && usertypeId === 1) {
        // User type 1 (admin) - redirect to settings dashboard
        console.log('Router guard - admin user, redirecting to settings dashboard')
        next('/settings/dashboard');
      } else {
        // Other user types - redirect to CRM dashboard
        console.log('Router guard - regular user, redirecting to CRM dashboard')
        next('/crm/dashboard');
      }
      return;
    }

    // Redirect unauthenticated users trying to access protected pages
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/auth/login');
      return;
    }

    next();
  });

  // Reinitialize Flowbite after route changes
  router.afterEach(() => {
    setTimeout(() => {
      try {
        initFlowbite();
        console.log('Flowbite reinitialized after route change');
      } catch (error) {
        console.warn('Failed to reinitialize Flowbite after route change:', error);
      }
    }, 100);
  });
} 
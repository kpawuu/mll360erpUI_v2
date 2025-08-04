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
      
      // Check if user should only see CRM menus
      const shouldShowOnlyCRM = authStore.user && authStore.user.usertype !== 1 && authStore.user.department_id === 11;
      
      if (shouldShowOnlyCRM) {
        // User should only see CRM - redirect to CRM dashboard
        console.log('Router guard - CRM-only user, redirecting to CRM dashboard')
        next('/crm/dashboard');
      } else if (authStore.user && authStore.user.usertype === 1) {
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

    // Check if authenticated user should only see CRM menus
    if (isAuthenticated && authStore.user) {
      const shouldShowOnlyCRM = authStore.user.usertype !== 1 && authStore.user.department_id === 11;
      
      // If user should only see CRM, redirect them away from non-CRM routes
      if (shouldShowOnlyCRM) {
        // Allow access to CRM routes
        if (to.path.startsWith('/crm')) {
          next();
          return;
        }
        
        // Redirect from settings routes to CRM dashboard
        if (to.path.startsWith('/settings')) {
          console.log('Router guard - CRM-only user trying to access settings, redirecting to CRM dashboard')
          next('/crm/dashboard');
          return;
        }
        
        // Redirect from CS routes to CRM dashboard
        if (to.path.startsWith('/cs')) {
          console.log('Router guard - CRM-only user trying to access CS, redirecting to CRM dashboard')
          next('/crm/dashboard');
          return;
        }
      }
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
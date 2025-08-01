import { useAuthStore } from '../store/auth.store'
import { useRouter } from 'vue-router'

// Global error interceptor for handling authentication errors
export function setupApiInterceptors() {
  // Intercept all API errors globally
  window.addEventListener('unhandledrejection', async (event) => {
    const error = event.reason
    
    // Check if it's an authentication error (401)
    if (error?.status === 401 || error?.message?.includes('Authentication') || error?.message?.includes('401')) {
      console.warn('Authentication error detected, logging out user:', error)
      
      const authStore = useAuthStore()
      await authStore.logout()
      
      // Redirect to login page
      const router = useRouter()
      if (router.currentRoute.value.path !== '/auth/login') {
        router.push('/auth/login')
      }
      
      // Prevent the default error handling
      event.preventDefault()
    }
  })
}

// Function to handle API errors in try-catch blocks
export async function handleApiError(error: any, authStore: any, router: any) {
  console.error('API Error:', error)
  
  // Check if it's an authentication error
  if (error?.status === 401 || error?.message?.includes('Authentication') || error?.message?.includes('401')) {
    console.warn('Authentication error detected, logging out user')
    
    // await authStore.logout()
    
    // Redirect to login page if not already there
    if (router.currentRoute.value.path !== '/auth/login') {
      // router.push('/auth/login')
    }
    
    throw new Error('Authentication failed. Please log in again.')
  }
  
  // Re-throw other errors
  throw error
} 
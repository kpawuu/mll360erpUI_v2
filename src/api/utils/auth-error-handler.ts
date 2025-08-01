import { useAuthStore } from '../../store/auth.store'

// Utility function to handle authentication errors consistently
export async function handleAuthError(error: any, authStore?: any) {
  const auth = authStore || useAuthStore()
  
  // Check if it's an authentication error
  if (error?.name === 'NotAuthenticated' || 
      error?.message?.includes('invalid signature') || 
      error?.message?.includes('Authentication') ||
      error?.status === 401) {
    
    console.warn('Authentication error detected, logging out user:', error)
    
    // Logout the user
    await auth.logout()
    
    // Redirect to login page
    window.location.href = '/auth/login'
    
    // Throw a user-friendly error
    throw new Error('Authentication failed. Please log in again.')
  }
  
  // Re-throw other errors
  throw error
} 
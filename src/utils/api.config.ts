// API configuration utility
export const getApiUrl = (endpoint: string = ''): string => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV
  
  if (isDevelopment) {
    // In development, use the proxy setup from vite.config.ts
    // The proxy forwards requests to the backend
    return `/api${endpoint}`
  } else {
    // In production, use environment variable or construct from current location
    const apiBase = import.meta.env.VITE_API_URL || 
                   `${window.location.protocol}//${window.location.hostname}:3031`
    return `${apiBase}${endpoint}`
  }
}

// Get the backend URL for direct HTTP requests (bypassing proxy)
export const getBackendUrl = (endpoint: string = ''): string => {
  const apiBase = import.meta.env.VITE_API_URL || 
                 (window.location.protocol === 'https:' ? 'https://localhost:3031' : 'http://localhost:3031')
  return `${apiBase}${endpoint}`
}

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupNavigationGuards } from './router/guards'
import { setupApiInterceptors } from './api/interceptors'
import { useAuthStore } from './store/auth.store'
import 'flowbite'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)

// Setup navigation guards
setupNavigationGuards(router)

// Setup API interceptors
setupApiInterceptors()

// Initialize authentication state
const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
    app.mount('#app')
}).catch((error) => {
    console.error('Failed to initialize authentication:', error)
    app.mount('#app')
})

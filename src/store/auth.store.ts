import { defineStore } from 'pinia';
import type {User} from "../api/models/user.model";
import { authController } from '../api/controllers/auth.controllers';
import type { AuthManagement } from '../api/models/authManagement.model';
import { encrypt, decrypt } from '../utils/encrypDecrypt';
import { authenticateFeathersClient } from '../api/feathers';

// Define the auth store using Pinia
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as Users | null,
        accessToken: null as string | null,
        // refreshToken: null as string | null,
        success: false as boolean,
        error: null as any,
    }),

    persist: {
        key: 'auth-store',
        storage: localStorage,
        paths: ['user', 'success', 'error']
    },

    actions: {
        // Action to login the user
        async login(email: string, password: string) {
            try {
                this.error = null
                this.success = false
                const loginUser = await authController.login(email, password);
                console.log('Login response:', loginUser)
                
                this.user = loginUser.users;
                this.accessToken = await encrypt(loginUser.accessToken);
                
                // Store the encrypted token and user data in localStorage
                const storeToken = {
                    accessToken: this.accessToken,
                    authentication: loginUser.authentication.payload,
                };
                localStorage.setItem('accessToken', JSON.stringify(storeToken));
                
                // Store user data in localStorage for persistence
                localStorage.setItem('userData', JSON.stringify(loginUser.users));
                
                // Also store the token in the format that Feathers expects
                localStorage.setItem('feathers-jwt', loginUser.accessToken);
                
                // Authenticate the Feathers client
                await authenticateFeathersClient();
                
                this.success = true;
                console.log('Login successful, user data stored:', this.user)
            } catch (error) {
                console.error('Login error:', error)
                this.error = error;
            }
        },

        // Action to register a new user
        async register(user: Users) {
            try {
                this.error = null
                this.success = false
                const { data } = await authController.register(user);
                this.user = data;
                this.success = true;
            } catch (error) {
                this.error = error;
            }
        },

        // Action to manage authentication-related tasks
        async authManagement(payload: AuthManagement) {
            try {
                this.error = null
                this.success = false
                const { data } = await authController.authenticationManagement(payload);
                this.user = data;
                this.success = true;
            } catch (error) {
                this.error = error;
            }
        },

        // Action to get the access token from localStorage and decrypt it
        async getAccessToken() {
            try {
                const encryptedToken = localStorage.getItem('accessToken');
                // console.log(encryptedToken)
                if (encryptedToken) {
                    const storedToken = JSON.parse(encryptedToken);
                    // Check if the stored token has the expected structure
                    if (storedToken && storedToken.accessToken && typeof storedToken.accessToken === 'string') {
                        return await decrypt(storedToken.accessToken);
                    } else {
                        // Invalid token structure, clear it
                        localStorage.removeItem('accessToken');
                        return null;
                    }
                }
                return null;
            } catch (error) {
                console.error('Error getting access token:', error);
                // Clear corrupted data from localStorage
                localStorage.removeItem('accessToken');
                return null;
            }
        },

        // Action to check if the access token is valid
        async isAccessTokenValid() {
            try {
                const accessTokenData = localStorage.getItem('accessToken');
                if (accessTokenData) {
                    const expirationDetails = JSON.parse(accessTokenData);
                    if (expirationDetails && 
                        expirationDetails.authentication && 
                        expirationDetails.authentication.exp) {
                        const expiration = expirationDetails.authentication.exp;
                        return expiration > Date.now() / 1000; // Convert milliseconds to seconds
                    }
                }
                return false;
            } catch (error) {
                console.error('Error checking access token validity:', error);
                // Clear corrupted data from localStorage
                localStorage.removeItem('accessToken');
                return false;
            }
        },

        // Action to check if user is authenticated (combines token existence and validity)
        async isAuthenticated() {
            try {
                // Check if we have user data in the store
                if (!this.user) {
                    console.log('No user data in store, checking localStorage...')
                    // Try to restore user data from localStorage if available
                    const userData = localStorage.getItem('userData')
                    if (userData) {
                        try {
                            this.user = JSON.parse(userData)
                        } catch (error) {
                            console.error('Error parsing user data from localStorage:', error)
                            localStorage.removeItem('userData')
                        }
                    }
                }
                
                const accessToken = await this.getAccessToken();
                if (!accessToken) {
                    console.log('No access token found')
                    return false;
                }
                
                const isValid = await this.isAccessTokenValid();
                if (!isValid) {
                    console.log('Access token is invalid/expired')
                    // Token is expired, clear it and logout
                    await this.logout();
                    return false;
                }
                
                // Check if we have user data
                if (!this.user) {
                    console.log('No user data available')
                    return false;
                }
                
                console.log('User is authenticated:', this.user)
                return true;
            } catch (error) {
                console.error('Error checking authentication status:', error);
                await this.logout();
                return false;
            }
        },

        // Action to initialize authentication state on app startup
        async initializeAuth() {
            try {
                console.log('Initializing authentication...')
                
                // First, try to restore user data from localStorage
                const userData = localStorage.getItem('userData')
                if (userData) {
                    try {
                        this.user = JSON.parse(userData)
                        console.log('User data restored from localStorage:', this.user)
                    } catch (error) {
                        console.error('Error parsing user data from localStorage:', error)
                        localStorage.removeItem('userData')
                    }
                }
                
                const isAuthenticated = await this.isAuthenticated();
                console.log('Authentication check result:', isAuthenticated)
                
                if (isAuthenticated) {
                    // Try to authenticate the Feathers client
                    await authenticateFeathersClient();
                    console.log('Feathers client authenticated successfully')
                } else {
                    // Clear any stale data
                    console.log('Not authenticated, clearing stale data')
                    await this.logout();
                }
            } catch (error) {
                console.error('Error initializing authentication:', error);
                await this.logout();
            }
        },

        // Action to logout the user
        async logout() {
            try {
                // Try to logout from server (but don't fail if it doesn't work)
                try {
                    await authController.logout();
                } catch (error) {
                    console.warn('Server logout failed, continuing with local cleanup:', error);
                }
                
                // Clear local state
                this.user = null;
                this.accessToken = null;
                this.success = false;
                this.error = null;
                
                // Clear all authentication-related data from localStorage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('feathers-jwt');
                localStorage.removeItem('userData');
                
                // Clear any other potential auth-related items
                localStorage.removeItem('auth');
                sessionStorage.clear();
                
                console.log('User logged out successfully');
            } catch (error) {
                console.error('Error during logout:', error);
                // Even if there's an error, clear local data
                this.user = null;
                this.accessToken = null;
                this.success = false;
                this.error = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('feathers-jwt');
                localStorage.removeItem('userData');
            }
        },

        // Debug method to check current authentication state
        getAuthState() {
            return {
                user: this.user,
                hasAccessToken: !!this.accessToken,
                success: this.success,
                error: this.error,
                localStorage: {
                    accessToken: !!localStorage.getItem('accessToken'),
                    userData: !!localStorage.getItem('userData'),
                    feathersJwt: !!localStorage.getItem('feathers-jwt'),
                    authStore: !!localStorage.getItem('auth-store')
                }
            }
        }
    }
});

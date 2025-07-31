import { defineStore } from 'pinia';
import type {Users} from "../api/models/users.model";
import { authController } from '../api/controllers/auth.controllers';
import type { AuthManagement } from '../api/models/authManagement.model';
import { encrypt, decrypt } from '../utils/encrypDecrypt';

// Define the auth store using Pinia
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as Users | null,
        accessToken: null as string | null,
        // refreshToken: null as string | null,
        success: false as boolean,
        error: null as any,
    }),

    persist: true,

    actions: {
        // Action to login the user
        async login(email: string, password: string) {
            try {
                this.error = null
                this.success = false
                const loginUser = await authController.login(email, password);
                console.log(loginUser)
                this.user = loginUser.users;
                this.accessToken = await encrypt(loginUser.accessToken);
                // Store the encrypted token and user data in localStorage
                const storeToken = {
                    accessToken: this.accessToken,
                    authentication: loginUser.authentication.payload,
                };
                localStorage.setItem('accessToken', JSON.stringify(storeToken));
                this.success = true;
            } catch (error) {
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

        // Action to logout the user
        async logout() {
            try {
                await authController.logout();
                this.user = null;
                this.accessToken = null;
                // this.refreshToken = null;
                localStorage.removeItem('accessToken');
            } catch (error) {
                this.error = error;
            }
        }
    }
});

<template>
  <div class="max-w-md w-full">
    <div class="text-center lg:text-left">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome back to MLL 360</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Build your design system effortlessly with our powerful component library.
      </p>
    </div>





    <form class="mt-8 space-y-6" @submit.prevent="handleLogin">

      <LoadingIndicator v-if="isLoading" />

      <!-- Custom Verification Error -->
      <div v-if="showVerificationError" class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Warning</span>
        <div class="flex-1">
          <span class="font-medium">Account Not Verified!</span> Your account needs verification. 
          <button @click="handleVerifyAccount" class="font-medium text-yellow-800 underline dark:text-yellow-300 hover:no-underline">
            Click here to verify your account
          </button>
        </div>
        <button type="button" @click="clearErrors" class="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>

      <AlertError v-if="(error || errorMessages) && !showVerificationError" :error="error" :errorMessages="errorMessages" @close="clearErrors" />
      <AlertSuccess v-if="success" :successMessages="successMessages" @close="clearSuccess" />

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <div class="relative">
          <input type="email" id="email" v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="alex.jordan@gmail.com" required>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <a href="javascript:void(0);" @click="forgottenPassword"
            class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
            Forgot password?
          </a>
        </div>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="••••••••" required>
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg v-if="!showPassword" class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
              <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
              </g>
            </svg>
            <svg v-else class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <input id="remember" type="checkbox" v-model="rememberMe"
          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
        <label for="remember" class="ml-2 text-sm text-gray-600 dark:text-gray-300">
          Remember sign in details
        </label>
      </div>

      <div>
        <button type="submit" :disabled="isLoading"
          class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor" />
            </svg>
            Signing in...
          </span>
          <span v-else>Log in</span>
        </button>
      </div>

      <!-- <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">OR</span>
            </div>
          </div> -->

      <!-- <div>
            <button 
              type="button" 
              class="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div> -->
    </form>

    <!-- <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
      <b>Unverified account?</b> Enter your email and click on the link to verify your account.
      <router-link to="/auth/verifyotp" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
        Verify OTP
      </router-link>
    </p> -->
  </div>

  <!-- Password Reset Modal -->
  <PasswordResetModal 
    :isVisible="showResetModal" 
    :email="email" 
    @close="closeResetModal"
    @success="handleResetSuccess"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "../../store/auth.store";
// @ts-ignore
import AlertError from '../../components/ui/AlertError.vue';
// @ts-ignore  
import LoadingIndicator from '../../components/ui/LoadingIndicator.vue';
// @ts-ignore
import AlertSuccess from '../../components/ui/AlertSuccess.vue';
// @ts-ignore
import PasswordResetModal from '../../components/ui/PasswordResetModal.vue';
const router = useRouter();
const authStore = useAuthStore();
const errorMessages = ref('');
const successMessages = ref('');
const showVerificationError = ref(false);
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const showResetModal = ref(false);

const resetEmail = ref({
  action: 'sendResetPwd',
  value: { email: email.value }
})

const error = computed(() => {
  return authStore.error;
});

const success = computed(() => {
  return authStore.success;
});

const handleLogin = async () => {
  try {
    isLoading.value = true;

    // @ts-ignore
    await authStore.login(email.value, password.value)
    if (authStore.success) {
      console.log('Login successful:', authStore.success)
      
      // Handle remember me functionality
      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Check user type and redirect accordingly
      console.log('User data after login:', authStore.user)
      console.log('User type ID:', authStore.user?.usertype_id)
      console.log('Full user object:', JSON.stringify(authStore.user, null, 2))
      
      // Check for different possible usertype field names
      const usertypeId = authStore.user?.usertype_id || authStore.user?.usertype || authStore.user?.type_id || authStore.user?.type
      console.log('Resolved usertype ID:', usertypeId)
      
      if (authStore.user && usertypeId === 1) {
        // User type 1 (admin) - redirect to settings dashboard
        console.log('Admin user detected, redirecting to settings dashboard')
        router.push('/settings/dashboard');
      } else {
        // Other user types - redirect to CRM dashboard
        console.log('Regular user detected, redirecting to CRM dashboard')
        router.push('/crm/dashboard');
      }
    }
    if (authStore.error) {
      console.log('Login error:', authStore.error)
      
      // Check if the error is due to unverified account
      if (authStore.error.message && 
          (authStore.error.message.toLowerCase().includes('verify') || 
           authStore.error.message.toLowerCase().includes('not verified'))) {
        // Show custom verification error with link
        showVerificationError.value = true;
        // Store email for verification page
        localStorage.setItem('verificationEmail', email.value);
      }
      // Error will be displayed by the AlertError component for other errors
    }
  } catch (error) {
    console.error('Login exception:', error);
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};

const clearErrors = () => {
  authStore.error = null;
  errorMessages.value = '';
  showVerificationError.value = false;
};

const clearSuccess = () => {
  authStore.success = false;
  successMessages.value = '';
};

// Clear any persisted errors/success messages on component mount
onMounted(() => {
  authStore.error = null;
  authStore.success = false;
  errorMessages.value = '';
  successMessages.value = '';
  showVerificationError.value = false;
  
  // Load remembered email if exists
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    email.value = rememberedEmail;
    rememberMe.value = true;
  }
});

const forgottenPassword = async () => {
  try {
    isLoading.value = true;
    // Check if email is empty
    if (!email.value) {
      errorMessages.value = 'Email is required';
      return;
    }
    
    resetEmail.value.value.email = email.value;
    // @ts-ignore
    await authStore.authManagement(resetEmail.value);
    
    if (authStore.success) {
      successMessages.value = 'OTP sent to your email successfully';
      // Show the password reset modal
      showResetModal.value = true;
    }
  } catch (error) {
    errorMessages.value = 'Failed to send password reset OTP';
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};

const closeResetModal = () => {
  showResetModal.value = false;
  // Clear any previous success messages
  successMessages.value = '';
};

const handleResetSuccess = () => {
  showResetModal.value = false;
  successMessages.value = 'Password reset successfully! You can now login with your new password.';
  // Clear the email and password fields for fresh login
  email.value = '';
  password.value = '';
};

const handleVerifyAccount = async () => {
  try {
    showVerificationError.value = false;
    isLoading.value = true;
    
    // Send resend verification OTP
    const resendData = {
      action: "resendVerifySignup",
      value: { email: email.value }
    };
    // @ts-ignore
    await authStore.authManagement(resendData);
    
    // Redirect to verification page
    router.push(`/auth/verifyotp?email=${encodeURIComponent(email.value)}`);
  } catch (resendError) {
    console.error('Failed to resend verification:', resendError);
    // Still redirect to verification page even if resend fails
    router.push(`/auth/verifyotp?email=${encodeURIComponent(email.value)}`);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>ate>
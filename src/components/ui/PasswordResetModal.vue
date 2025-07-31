<template>
  <!-- Modal backdrop -->
  <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background overlay -->
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
      
      <!-- Modal panel -->
      <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Reset Password
          </h3>
          <button type="button" @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Enter the OTP code sent to your email and your new password.
          </p>
          
          <form @submit.prevent="handlePasswordReset">
            <LoadingIndicator v-if="isLoading" />
            
            <AlertError v-if="error" :error="error" />
            <AlertSuccess v-if="success" :successMessages="'Password reset successfully! You can now login with your new password.'" />
            
            <!-- Email (readonly) -->
            <div class="mb-4">
              <label for="reset-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" id="reset-email" :value="email" readonly
                class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            
            <!-- OTP Token -->
            <div class="mb-4">
              <label for="otp-token" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP Code</label>
              <input type="text" id="otp-token" v-model="otpToken" required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter 4-digit OTP code">
            </div>
            
            <!-- New Password -->
            <div class="mb-4">
              <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" id="new-password" v-model="newPassword" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter new password">
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
            
                         <!-- Confirm Password -->
             <div class="mb-6">
               <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
               <div class="relative">
                 <input :type="showConfirmPassword ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Confirm new password">
                 <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                   class="absolute inset-y-0 right-0 flex items-center pr-3">
                   <svg v-if="!showConfirmPassword" class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
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
            
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit" :disabled="isLoading"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span v-if="isLoading">Resetting...</span>
                <span v-else>Reset Password</span>
              </button>
              <button type="button" @click="closeModal" 
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../../store/auth.store';
import AlertError from './AlertError.vue';
import AlertSuccess from './AlertSuccess.vue';
import LoadingIndicator from './LoadingIndicator.vue';

interface Props {
  isVisible: boolean;
  email: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['close', 'success']);

const authStore = useAuthStore();

// Form data
const otpToken = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const error = computed(() => authStore.error);
const success = computed(() => authStore.success);

const closeModal = () => {
  // Reset form
  otpToken.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showPassword.value = false;
  showConfirmPassword.value = false;
  
  emit('close');
};

const handlePasswordReset = async () => {
  // Validate passwords match
  if (newPassword.value !== confirmPassword.value) {
    authStore.error = { message: 'Passwords do not match' };
    return;
  }
  
  // Validate password length
  if (newPassword.value.length < 6) {
    authStore.error = { message: 'Password must be at least 6 characters long' };
    return;
  }
  
  try {
    isLoading.value = true;
    authStore.error = null;
    
    const resetData = {
      action: "resetPwdShort",
      value: {
        user: { email: props.email },
        token: otpToken.value,
        password: newPassword.value
      }
    };
    
    await authStore.authManagement(resetData);
    
    if (authStore.success) {
      // Wait a moment to show success message, then close modal
      setTimeout(() => {
        emit('success');
        closeModal();
      }, 2000);
    }
  } catch (error) {
    console.error('Password reset error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style> 
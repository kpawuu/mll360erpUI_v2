<template>
  <div class="max-w-md w-full">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Verify Your Account</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        We've sent a verification code to 
        <span class="font-semibold text-gray-900 dark:text-white">{{ userEmail }}</span>. 
        Please enter the code below to verify your account.
      </p>
    </div>
    
    <form class="mt-8 space-y-6" @submit.prevent="verifyOTP">
      <!-- OTP Input Fields -->
      <div class="flex justify-center">
        <div class="flex space-x-2 rtl:space-x-reverse">
          <div v-for="(digit, index) in 6" :key="index">
            <input 
              type="text" 
              :id="`otp-${index}`"
              maxlength="1"
              @input="handleOtpInput($event, index)"
              @keydown="handleKeyDown($event, index)"
              @paste="handlePaste"
              ref="otpInputs"
              v-model="otpValues[index]"
              class="block w-12 h-12 py-3 text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-xl font-semibold dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
      
      <!-- Timer and Resend -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <span v-if="countdown > 0">Resend code in {{ formatTime(countdown) }}</span>
          <button 
            v-else 
            type="button" 
            @click="resendOTP"
            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Resend verification code
          </button>
        </p>
      </div>
      
      <!-- Success Message -->
      <div v-if="successMessage" class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Success</span>
        <div>{{ successMessage }}</div>
      </div>
      
      <!-- Error Message -->
      <div v-if="errorMessage" class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Error</span>
        <div>{{ errorMessage }}</div>
      </div>
      
      <!-- Submit Button -->
      <div>
        <button 
          type="submit" 
          :disabled="isLoading || !isOtpComplete"
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Verifying...
          </span>
          <span v-else>Verify Account</span>
        </button>
      </div>
      
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive the code? <a href="#" @click.prevent="resendOTP" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Send to a different email address</a>
        </p>
      </div>
      
      <div class="text-center mt-2">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <a href="/auth/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Back to login</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../store/auth.store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Get email from route query params or localStorage
const userEmail = ref(route.query.email as string || localStorage.getItem('verificationEmail') || '');

// OTP state
const otpValues = ref(Array(6).fill(''));
const otpInputs = ref<HTMLInputElement[]>([]);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const countdown = ref(60); // 60 seconds countdown
let countdownTimer: number | null = null;

// Computed property to check if OTP is complete
const isOtpComplete = computed(() => {
  return otpValues.value.every(value => value !== '');
});

// Handle input in OTP fields
const handleOtpInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  
  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    otpValues.value[index] = '';
    return;
  }
  
  // Auto-focus next input
  if (value && index < 5) {
    otpInputs.value[index + 1].focus();
  }
};

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent, index: number) => {
  // If backspace and empty, focus previous input
  if (event.key === 'Backspace' && !otpValues.value[index] && index > 0) {
    otpInputs.value[index - 1].focus();
  }
  
  // Arrow left/right navigation
  if (event.key === 'ArrowLeft' && index > 0) {
    otpInputs.value[index - 1].focus();
  }
  
  if (event.key === 'ArrowRight' && index < 5) {
    otpInputs.value[index + 1].focus();
  }
};

// Handle paste event
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  
  if (!event.clipboardData) return;
  
  const pastedData = event.clipboardData.getData('text');
  const digits = pastedData.replace(/\D/g, '').split('').slice(0, 6);
  
  digits.forEach((digit, index) => {
    if (index < 6) {
      otpValues.value[index] = digit;
    }
  });
  
  // Focus the next empty input or the last one
  const nextEmptyIndex = otpValues.value.findIndex(value => !value);
  if (nextEmptyIndex !== -1) {
    otpInputs.value[nextEmptyIndex].focus();
  } else if (otpValues.value[5]) {
    otpInputs.value[5].focus();
  }
};

// Format time for countdown
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Start countdown timer
const startCountdown = () => {
  countdown.value = 60;
  countdownTimer = window.setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }
  }, 1000);
};

// Resend OTP
const resendOTP = async () => {
  try {
    if (!userEmail.value) {
      errorMessage.value = 'Email address is required to resend verification code.';
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    const resendData = {
      action: "resendVerifySignup",
      value: { email: userEmail.value }
    };
    
    await authStore.authManagement(resendData);
    
    if (authStore.success) {
      successMessage.value = 'Verification code sent successfully!';
      // Reset countdown
      startCountdown();
    } else if (authStore.error) {
      errorMessage.value = authStore.error.message || 'Failed to resend verification code. Please try again.';
    }
  } catch (error) {
    console.error('Resend OTP error:', error);
    errorMessage.value = 'Failed to resend verification code. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Verify OTP
const verifyOTP = async () => {
  try {
    if (!userEmail.value) {
      errorMessage.value = 'Email address is required for verification.';
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    // Combine OTP values
    const otpCode = otpValues.value.join('');
    
    if (otpCode.length !== 6) {
      errorMessage.value = 'Please enter the complete 6-digit verification code.';
      return;
    }
    
    const verifyData = {
      action: "verifySignupShort",
      value: {
        user: { email: userEmail.value },
        token: otpCode
      }
    };
    
    await authStore.authManagement(verifyData);
    
    if (authStore.success) {
      successMessage.value = 'Account verified successfully! Redirecting to login...';
      
      // Clear verification email from localStorage
      localStorage.removeItem('verificationEmail');
      
      // Redirect to login page after a brief delay
      setTimeout(() => {
        router.push('/auth/login?verified=true');
      }, 2000);
    } else if (authStore.error) {
      errorMessage.value = authStore.error.message || 'Invalid verification code. Please try again.';
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    errorMessage.value = 'Invalid verification code. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  // Start countdown on component mount
  startCountdown();
});

onBeforeUnmount(() => {
  // Clear interval when component is unmounted
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
});
</script>

<style scoped>
/* Customize focus styles */
input:focus {
  /* @apply ring-2 ring-blue-500 border-blue-500; */
}

/* Animation for OTP inputs */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

input:focus {
  animation: pulse 0.3s ease-in-out;
}
</style>
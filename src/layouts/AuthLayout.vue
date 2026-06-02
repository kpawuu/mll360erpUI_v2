<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950 min-h-screen">
    <!-- Left side - Testimonial/Brand section -->
    <LeftSide />

    <!-- Right side - Form area with clear light/dark surface -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-none">
      <div class="w-full max-w-md">
        <router-view />
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import LeftSide from '../components/auth/LeftSide.vue';
  export default defineComponent({
    name: 'AuthLayout',
    components: {
      LeftSide,
    },
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  
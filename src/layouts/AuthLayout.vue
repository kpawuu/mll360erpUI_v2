<template>
    <div class="flex h-screen">
    <!-- Left side - Testimonial/Brand section -->
    <LeftSide />

    <!-- Right side - Login form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <router-view></router-view>
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
  
<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import Toast from './components/ui/Toast.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <router-view />
  <Toast />
</template>

<style scoped>

</style>

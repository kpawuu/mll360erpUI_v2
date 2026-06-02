<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      <div
        v-for="t in toastStore.toasts"
        :key="t.id"
        :class="[
          'px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-3',
          t.type === 'success' && 'bg-green-600 text-white',
          t.type === 'error' && 'bg-red-600 text-white',
          t.type === 'info' && 'bg-blue-600 text-white'
        ]"
      >
        <span class="flex-1">{{ t.message }}</span>
        <button
          type="button"
          @click="toastStore.remove(t.id)"
          class="opacity-80 hover:opacity-100 p-1"
          aria-label="Dismiss"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '../../store/toast.store'

const toastStore = useToastStore()
</script>

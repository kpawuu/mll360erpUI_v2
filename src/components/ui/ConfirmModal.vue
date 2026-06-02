<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50" @click.self="$emit('update:modelValue', false)">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-6">{{ message }}</p>
        <div class="flex justify-end gap-2">
          <button
            @click="$emit('update:modelValue', false); $emit('cancel')"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            @click="$emit('update:modelValue', false); $emit('confirm')"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium text-white',
              danger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

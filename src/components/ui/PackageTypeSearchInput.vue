<template>
  <div class="relative">
    <label v-if="label" :for="inputId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <div class="relative">
      <input
        :id="inputId"
        v-model="displayText"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        @focus="onFocus"
        @input="onInput"
        @blur="onBlur"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg v-if="loading" class="w-4 h-4 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
    <div
      v-show="dropdownOpen"
      class="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto"
    >
      <div v-if="allowClear && (modelValue !== undefined && modelValue !== null && modelValue !== 0)" class="border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          class="w-full text-left px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          @mousedown.prevent="clearSelection"
        >
          Clear selection
        </button>
      </div>
      <div v-if="results.length === 0 && !loading" class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        {{ displayText ? 'No package types found. Try a different search.' : 'Type to search package types...' }}
      </div>
      <button
        v-for="pt in results"
        :key="pt.id"
        type="button"
        class="w-full text-left px-3 py-2.5 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
        :class="{ 'bg-blue-50 dark:bg-blue-900/20': modelValue === pt.id }"
        @mousedown.prevent="select(pt)"
      >
        <span>{{ pt.type }}</span>
        <span v-if="pt.mode" class="text-xs text-gray-500 dark:text-gray-400">{{ pt.mode }}</span>
      </button>
    </div>
    <p v-if="hint" class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { packageTypeControllers } from '../../api/controllers/package-type.controllers'
import type { PackageType } from '../../api/models/package-type.model'

const props = withDefaults(
  defineProps<{
    modelValue: number | undefined | null
    displayValue?: string
    placeholder?: string
    label?: string
    hint?: string
    required?: boolean
    disabled?: boolean
    inputId?: string
    allowClear?: boolean
  }>(),
  {
    placeholder: 'Search or select package type...',
    required: false,
    disabled: false,
    inputId: 'package-type-input',
    allowClear: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number | undefined | null]
}>()

const searchTerm = ref('')
const results = ref<PackageType[]>([])
const loading = ref(false)
const dropdownOpen = ref(false)
let searchTimer: ReturnType<typeof setTimeout> | null = null

const displayText = computed({
  get() {
    if (dropdownOpen.value) return searchTerm.value
    if (searchTerm.value) return searchTerm.value
    return props.displayValue ?? ''
  },
  set(val: string) {
    searchTerm.value = val
  }
})

// Sync input text when parent sets displayValue (e.g. when opening edit modal). Don't clear when we have a selection but parent has no displayValue (e.g. filter type not in list).
watch(
  () => props.displayValue,
  (v) => {
    const next = v ?? ''
    if (!dropdownOpen.value) {
      if (next) searchTerm.value = next
      else if (props.modelValue == null || props.modelValue === 0) searchTerm.value = ''
    }
  },
  { immediate: true }
)

async function fetchSearch(search: string) {
  loading.value = true
  try {
    const query: Record<string, unknown> = { $limit: 25 }
    if (search && search.trim()) query.search = search.trim()
    const response = await packageTypeControllers.getPackageTypes({ query }) as { data?: PackageType[] }
    results.value = Array.isArray(response?.data) ? response.data : []
  } catch (e) {
    console.error('Failed to fetch package types:', e)
    results.value = []
  } finally {
    loading.value = false
  }
}

function onFocus() {
  dropdownOpen.value = true
  if (results.value.length === 0) fetchSearch(searchTerm.value)
}

function onInput() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    dropdownOpen.value = true
    fetchSearch(searchTerm.value)
  }, 300)
}

function onBlur() {
  setTimeout(() => {
    dropdownOpen.value = false
  }, 200)
}

function select(pt: PackageType) {
  emit('update:modelValue', pt.id)
  searchTerm.value = pt.type
  dropdownOpen.value = false
}

function clearSelection() {
  emit('update:modelValue', undefined)
  searchTerm.value = ''
  dropdownOpen.value = false
}
</script>

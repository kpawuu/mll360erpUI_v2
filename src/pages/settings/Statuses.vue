<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Status Management</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage system statuses for different modules</p>
        </div>
        <button @click="showCreateModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Status
        </button>
      </div>
    </div>

    <!-- Search Card -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <input 
            v-model="searchQuery" 
            @input="onSearchChange"
            type="text" 
            placeholder="Search statuses..."
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
        </div>
        <button 
          @click="loadStatuses" 
          :disabled="statusStore.loading"
          class="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="statusStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Statuses Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="status in filteredStatuses" :key="status.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ status.status }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ status.type }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editStatus(status)" class="p-1 text-blue-600 hover:text-blue-800 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button @click="deleteStatus(status.id)" class="p-1 text-red-600 hover:text-red-800 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="space-y-2 mb-4">
          <div class="text-sm">
            <span class="text-gray-500 dark:text-gray-400">Description:</span>
            <span class="text-gray-900 dark:text-white ml-2">{{ status.description || 'N/A' }}</span>
          </div>
          <div class="text-sm">
            <span class="text-gray-500 dark:text-gray-400">Created:</span>
            <span class="text-gray-900 dark:text-white ml-2">{{ formatDate(status.date_created) }}</span>
          </div>
        </div>

        <div class="flex space-x-2">
          <button @click="editStatus(status)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!statusStore.loading && filteredStatuses.length === 0" class="text-center py-20">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {{ searchQuery ? 'No statuses found' : 'No statuses yet' }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding your first status.' }}
      </p>
      <button 
        @click="showCreateModal = true"
        class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
      >
        Add Status
      </button>
    </div>
  </div>

  <!-- Create/Edit Modal -->
  <div v-if="showCreateModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 bg-gray-900/70">
    <div class="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl">
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ showEditModal ? 'Edit Status' : 'Create Status' }}
        </h3>
        
        <form @submit.prevent="saveStatus" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Name</label>
            <input 
              v-model="statusForm.status" 
              type="text" 
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Active"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <select 
              v-model="statusForm.type" 
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Type</option>
              <option value="onshore">Onshore</option>
              <option value="offshore">Offshore</option>
              <option value="transport">Transport</option>
              <option value="warehouse">Warehouse</option>
              <option value="crm">CRM</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea 
              v-model="statusForm.description" 
              rows="3"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter description..."
            ></textarea>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="button"
              @click="closeModal" 
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="statusStore.loading"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg disabled:opacity-50"
            >
              {{ showEditModal ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStatusStore } from '../../store/status.store'
import type { Status } from '../../api/models/status.model'

const statusStore = useStatusStore()

const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingStatus = ref<Status | null>(null)

const statusForm = ref({
  status: '',
  type: '' as 'onshore' | 'offshore' | 'transport' | 'warehouse' | 'crm',
  description: '',
  color: '#3B82F6',
  icon: ''
})

const filteredStatuses = computed(() => {
  const statuses = statusStore.statuses
  if (!searchQuery.value) return statuses
  
  const query = searchQuery.value.toLowerCase()
  return statuses.filter(status => 
    status.status.toLowerCase().includes(query) ||
    status.type.toLowerCase().includes(query) ||
    (status.description && status.description.toLowerCase().includes(query))
  )
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const loadStatuses = async () => {
  try {
    await statusStore.fetchStatuses()
  } catch (error) {
    console.error('Failed to load statuses:', error)
  }
}

const onSearchChange = () => {
  // Search is handled by computed property
}

const editStatus = (status: Status) => {
  editingStatus.value = status
  statusForm.value = {
    status: status.status,
    type: status.type,
    description: status.description || '',
    color: status.color || '#3B82F6',
    icon: status.icon || ''
  }
  showEditModal.value = true
}

const saveStatus = async () => {
  try {
    if (showEditModal.value && editingStatus.value) {
      await statusStore.updateStatus(editingStatus.value.id, statusForm.value)
    } else {
      await statusStore.createStatus(statusForm.value)
    }
    closeModal()
  } catch (error) {
    console.error('Failed to save status:', error)
  }
}

const deleteStatus = async (id: number) => {
  if (confirm('Are you sure you want to delete this status?')) {
    try {
      await statusStore.deleteStatus(id)
    } catch (error) {
      console.error('Failed to delete status:', error)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingStatus.value = null
  statusForm.value = {
    status: '',
    type: '' as 'onshore' | 'offshore' | 'transport' | 'warehouse' | 'crm',
    description: '',
    color: '#3B82F6',
    icon: ''
  }
}

onMounted(async () => {
  await loadStatuses()
})
</script> 
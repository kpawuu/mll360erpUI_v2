<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Commodities</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage commodities for your company</p>
        </div>
        <button @click="showCreateModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Commodity
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
            placeholder="Search commodities..."
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
        </div>
        <button 
          @click="loadCommodities" 
          :disabled="commodityStore.loading"
          class="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="commodityStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Commodities Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="commodity in filteredCommodities" :key="commodity.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ commodity.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ commodity.company?.name || 'Company' }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editCommodity(commodity)" class="p-1 text-blue-600 hover:text-blue-800 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button @click="deleteCommodity(commodity.id)" class="p-1 text-red-600 hover:text-red-800 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="space-y-2 mb-4">
          <div class="text-sm">
            <span class="text-gray-500 dark:text-gray-400">Description:</span>
            <span class="text-gray-900 dark:text-white ml-2">{{ commodity.description || 'N/A' }}</span>
          </div>
          <div class="text-sm">
            <span class="text-gray-500 dark:text-gray-400">Created:</span>
            <span class="text-gray-900 dark:text-white ml-2">{{ formatDate(commodity.date_created) }}</span>
          </div>
        </div>

        <div class="flex space-x-2">
          <button @click="editCommodity(commodity)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!commodityStore.loading && filteredCommodities.length === 0" class="text-center py-20">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {{ searchQuery ? 'No commodities found' : 'No commodities yet' }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding your first commodity.' }}
      </p>
      <button 
        @click="showCreateModal = true"
        class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
      >
        Add Commodity
      </button>
    </div>
  </div>

  <!-- Create/Edit Modal -->
  <div v-if="showCreateModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 bg-gray-900/70">
    <div class="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl">
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ showEditModal ? 'Edit Commodity' : 'Create Commodity' }}
        </h3>
        
        <form @submit.prevent="saveCommodity" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Commodity Name</label>
            <input 
              v-model="commodityForm.name" 
              type="text" 
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Electronics"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea 
              v-model="commodityForm.description" 
              rows="3"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter commodity description..."
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
              :disabled="commodityStore.loading"
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
import { useCommodityStore } from '../../store/commodity.store'
import { useAuthStore } from '../../store/auth.store'
import type { Commodity } from '../../api/models/commodity.model'

const commodityStore = useCommodityStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingCommodity = ref<Commodity | null>(null)

const commodityForm = ref({
  name: '',
  description: '',
  company_id: 0
})

const filteredCommodities = computed(() => {
  const commodities = commodityStore.commodities
  if (!searchQuery.value) return commodities
  
  const query = searchQuery.value.toLowerCase()
  return commodities.filter(commodity => 
    commodity.name.toLowerCase().includes(query) ||
    (commodity.description && commodity.description.toLowerCase().includes(query))
  )
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const loadCommodities = async () => {
  try {
    // Filter commodities by the logged-in user's company
    if (authStore.user?.company_id) {
      await commodityStore.fetchCommodities({
        query: {
          company_id: authStore.user.company_id,
          $sort: { name: 1 }
        }
      })
    }
  } catch (error) {
    console.error('Failed to load commodities:', error)
  }
}

const onSearchChange = () => {
  // Search is handled by computed property
}

const editCommodity = (commodity: Commodity) => {
  editingCommodity.value = commodity
  commodityForm.value = {
    name: commodity.name,
    description: commodity.description || '',
    company_id: commodity.company_id
  }
  showEditModal.value = true
}

const saveCommodity = async () => {
  try {
    // Ensure company_id is set to the logged-in user's company
    if (authStore.user?.company_id) {
      commodityForm.value.company_id = authStore.user.company_id
    }
    
    if (showEditModal.value && editingCommodity.value) {
      await commodityStore.updateCommodity(editingCommodity.value.id, commodityForm.value)
    } else {
      await commodityStore.createCommodity(commodityForm.value)
    }
    closeModal()
  } catch (error) {
    console.error('Failed to save commodity:', error)
  }
}

const deleteCommodity = async (id: number) => {
  if (confirm('Are you sure you want to delete this commodity?')) {
    try {
      await commodityStore.deleteCommodity(id)
    } catch (error) {
      console.error('Failed to delete commodity:', error)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingCommodity.value = null
  commodityForm.value = {
    name: '',
    description: '',
    company_id: 0
  }
}

onMounted(async () => {
  await loadCommodities()
})
</script> 
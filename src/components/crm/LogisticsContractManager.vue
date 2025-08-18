<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Logistics Contract Management</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Manage rates and contracts for logistics services</p>
      </div>
      <button 
        @click="showAddRateModal = true"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Rate
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Category</label>
          <select v-model="filters.serviceCategory" class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <option value="">All Categories</option>
            <option value="warehousing">Warehousing</option>
            <option value="transportation">Transportation</option>
            <option value="freight">Freight</option>
            <option value="handling">Handling</option>
            <option value="storage">Storage</option>
            <option value="customs">Customs</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rate Type</label>
          <select v-model="filters.rateType" class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <option value="">All Types</option>
            <option value="per_kg">Per KG</option>
            <option value="per_cbm">Per CBM</option>
            <option value="per_shipment">Per Shipment</option>
            <option value="per_pallet">Per Pallet</option>
            <option value="per_container">Per Container</option>
            <option value="per_hour">Per Hour</option>
            <option value="per_day">Per Day</option>
            <option value="per_month">Per Month</option>
            <option value="fixed_rate">Fixed Rate</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select v-model="filters.isActive" class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <input 
            v-model="filters.search"
            type="text"
            placeholder="Search rates..."
            class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
        </div>
      </div>
    </div>

    <!-- Rates Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Service
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rate Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rate Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Volume Range
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Effective Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="rate in filteredRates" :key="rate.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {{ getServiceIcon(rate.service_category) }}
                    </span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {{ rate.service_category }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ rate.tier_name || 'Standard Rate' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {{ formatRateType(rate.rate_type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatCurrency(rate.rate_amount, rate.currency_id) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  <span v-if="rate.min_volume || rate.max_volume">
                    {{ rate.min_volume || 0 }} - {{ rate.max_volume || '∞' }}
                  </span>
                  <span v-else class="text-gray-500 dark:text-gray-400">No limit</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatDate(rate.effective_date) }}
                </div>
                <div v-if="rate.expiry_date" class="text-sm text-gray-500 dark:text-gray-400">
                  Expires: {{ formatDate(rate.expiry_date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  rate.is_active 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                ]">
                  {{ rate.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button 
                    @click="editRate(rate)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteRate(rate.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Rate Modal -->
    <div v-if="showAddRateModal || showEditRateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {{ showEditRateModal ? 'Edit Rate' : 'Add New Rate' }}
          </h3>
          
          <form @submit.prevent="saveRate" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service Category *
                </label>
                <select v-model="rateForm.service_category" required class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  <option value="">Select Category</option>
                  <option value="warehousing">Warehousing</option>
                  <option value="transportation">Transportation</option>
                  <option value="freight">Freight</option>
                  <option value="handling">Handling</option>
                  <option value="storage">Storage</option>
                  <option value="customs">Customs</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rate Type *
                </label>
                <select v-model="rateForm.rate_type" required class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  <option value="">Select Type</option>
                  <option value="per_kg">Per KG</option>
                  <option value="per_cbm">Per CBM</option>
                  <option value="per_shipment">Per Shipment</option>
                  <option value="per_pallet">Per Pallet</option>
                  <option value="per_container">Per Container</option>
                  <option value="per_hour">Per Hour</option>
                  <option value="per_day">Per Day</option>
                  <option value="per_month">Per Month</option>
                  <option value="fixed_rate">Fixed Rate</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rate Amount *
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                    {{ getCurrencySymbol(rateForm.currency_id) }}
                  </span>
                  <input 
                    v-model.number="rateForm.rate_amount"
                    type="number"
                    step="0.01"
                    required
                    class="w-full pl-8 pr-3 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Rate per {{ getRateTypeLabel(rateForm.rate_type) }}
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Currency *
                </label>
                <select v-model="rateForm.currency_id" required class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  <option value="">Select Currency</option>
                  <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                    {{ currency.symbol }} - {{ currency.currency_name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Effective Date *
                </label>
                <input 
                  v-model="rateForm.effective_date"
                  type="date"
                  required
                  class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input 
                  v-model="rateForm.expiry_date"
                  type="date"
                  class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
            </div>

            <div v-if="rateForm.rate_type !== 'fixed_rate' && rateForm.rate_type !== 'per_month'" class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tier Name
                </label>
                <input 
                  v-model="rateForm.tier_name"
                  type="text"
                  class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Min Volume
                </label>
                <input 
                  v-model.number="rateForm.min_volume"
                  type="number"
                  step="0.01"
                  class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Volume
                </label>
                <input 
                  v-model.number="rateForm.max_volume"
                  type="number"
                  step="0.01"
                  class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input 
                  v-model="rateForm.is_active"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Saving...' : (showEditRateModal ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLogisticsContractRatesStore } from '../../store/logistics-contract-rates.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import type { LogisticsContractRate, CreateLogisticsContractRate } from '../../api/models/logistics-contract-rates.model'

const props = defineProps<{
  opportunityId?: number
}>()

const ratesStore = useLogisticsContractRatesStore()
const currenciesStore = useCurrenciesStore()

// Reactive data
const showAddRateModal = ref(false)
const showEditRateModal = ref(false)
const loading = ref(false)
const editingRate = ref<LogisticsContractRate | null>(null)

const filters = ref({
  serviceCategory: '',
  rateType: '',
  isActive: '',
  search: ''
})

const rateForm = ref<CreateLogisticsContractRate>({
  opportunity_id: props.opportunityId || 0,
  service_category: 'freight',
  rate_type: 'per_kg',
  rate_amount: 0,
  currency_id: 1,
  effective_date: new Date().toISOString().split('T')[0],
  is_active: true
})

// Computed
const filteredRates = computed(() => {
  let rates = props.opportunityId 
    ? ratesStore.getRatesByOpportunity(props.opportunityId)
    : ratesStore.rates

  if (filters.value.serviceCategory) {
    rates = rates.filter(rate => rate.service_category === filters.value.serviceCategory)
  }
  
  if (filters.value.rateType) {
    rates = rates.filter(rate => rate.rate_type === filters.value.rateType)
  }
  
  if (filters.value.isActive !== '') {
    rates = rates.filter(rate => rate.is_active === (filters.value.isActive === 'true'))
  }
  
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    rates = rates.filter(rate => 
      rate.service_category.toLowerCase().includes(search) ||
      rate.tier_name?.toLowerCase().includes(search) ||
      rate.rate_type.toLowerCase().includes(search)
    )
  }
  
  return rates
})

const currencies = computed(() => currenciesStore.currencies)

// Methods
const getServiceIcon = (service: string) => {
  const icons: Record<string, string> = {
    warehousing: 'W',
    transportation: 'T',
    freight: 'F',
    handling: 'H',
    storage: 'S',
    customs: 'C',
    insurance: 'I'
  }
  return icons[service] || '?'
}

const formatRateType = (rateType: string) => {
  return rateType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatCurrency = (amount: number, currencyId: number) => {
  const currency = currencies.value.find(c => c.id === currencyId)
  return `${currency?.symbol || '$'}${amount?.toFixed(2) || '0.00'}`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const getCurrencySymbol = (currencyId: number) => {
  const currency = currencies.value.find(c => c.id === currencyId)
  return currency?.symbol || ''
}

const getRateTypeLabel = (rateType: string) => {
  return rateType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const editRate = (rate: LogisticsContractRate) => {
  editingRate.value = rate
  rateForm.value = { ...rate }
  showEditRateModal.value = true
}

const deleteRate = async (id: number) => {
  if (confirm('Are you sure you want to delete this rate?')) {
    try {
      await ratesStore.deleteRate(id)
    } catch (error) {
      console.error('Error deleting rate:', error)
    }
  }
}

const saveRate = async () => {
  try {
    loading.value = true
    
    if (showEditRateModal.value && editingRate.value) {
      await ratesStore.updateRate(editingRate.value.id, rateForm.value)
    } else {
      await ratesStore.createRate(rateForm.value)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving rate:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showAddRateModal.value = false
  showEditRateModal.value = false
  editingRate.value = null
  resetForm()
}

const resetForm = () => {
  rateForm.value = {
    opportunity_id: props.opportunityId || 0,
    service_category: 'freight',
    rate_type: 'per_kg',
    rate_amount: 0,
    currency_id: 1,
    effective_date: new Date().toISOString().split('T')[0],
    is_active: true
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    ratesStore.fetchRates(),
    currenciesStore.fetchCurrencies()
  ])
})
</script>

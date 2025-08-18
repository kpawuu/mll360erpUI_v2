<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Invoice Line Items
          </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <!-- Line Items Form -->
          <div class="space-y-6">
            <!-- Contract Rates Section -->
            <div v-if="props.invoice?.opportunity_id" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Contract Rates
                  </h3>
                  <div class="flex space-x-2">
                    <button 
                      @click="loadContractRates" 
                      :disabled="isLoadingRates"
                      class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span v-if="isLoadingRates">Loading...</span>
                      <span v-else>Load Rates</span>
                    </button>
                    <button 
                      v-if="contractRates.length > 0"
                      @click="addAllContractRates"
                      class="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                    >
                      Add All Rates
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div v-if="contractRates.length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
                  <p>No contract rates found for this opportunity.</p>
                  <p class="text-sm mt-1">Click "Load Rates" to fetch available rates.</p>
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div 
                    v-for="rate in contractRates" 
                    :key="rate.id" 
                    class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-medium text-gray-900 dark:text-white capitalize">{{ rate.service_category?.replace('_', ' ') }}</h4>
                      <span class="text-sm font-semibold text-green-600 dark:text-green-400">
                        {{ formatCurrency(rate.rate_amount, rate.currency_id) }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {{ rate.rate_type?.replace('_', ' ') }} • {{ rate.currency?.symbol || '$' }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-500 mb-3">
                      {{ rate.description || 'No description' }}
                    </p>
                    <div class="flex space-x-2">
                      <button 
                        @click="populateFormFromRate(rate)"
                        class="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Use Rate
                      </button>
                      <button 
                        @click="addLineItemFromRate(rate)"
                        class="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      >
                        Add to Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add New Line Item -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Line Item
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shipment Type</label>
                    <select v-model="newLineItem.shipment_type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="">Select Type</option>
                      <option value="transportation">Transportation</option>
                      <option value="freight">Freight</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="customs">Customs</option>
                      <option value="packaging">Packaging</option>
                      <option value="insurance">Insurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Category</label>
                    <select v-model="newLineItem.service_category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="">Select Category</option>
                      <option value="road_transport">Road Transport</option>
                      <option value="air_freight">Air Freight</option>
                      <option value="sea_freight">Sea Freight</option>
                      <option value="rail_transport">Rail Transport</option>
                      <option value="warehouse_storage">Warehouse Storage</option>
                      <option value="customs_clearance">Customs Clearance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rate Type</label>
                    <select v-model="newLineItem.rate_type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="">Select Rate Type</option>
                      <option value="per_unit">Per Unit</option>
                      <option value="per_kg">Per KG</option>
                      <option value="per_km">Per KM</option>
                      <option value="flat_rate">Flat Rate</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <input v-model="newLineItem.description" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                    <input v-model.number="newLineItem.quantity" type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit Price</label>
                    <input v-model.number="newLineItem.unit_price" type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                    <select v-model="newLineItem.currency_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                        {{ currency.symbol }} - {{ currency.currency_name }}
                      </option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                    <input v-model="newLineItem.notes" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end">
                  <button @click="addLineItem" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                    Add Line Item
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Line Items List -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                      Line Items ({{ isLoadingLineItems ? '...' : lineItems.length }})
                    </h3>
                    <button 
                      @click="loadExistingLineItems"
                      :disabled="isLoadingLineItems"
                      class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span v-if="isLoadingLineItems">Loading...</span>
                      <span v-else>Refresh</span>
                    </button>
                  </div>
              </div>
              <div class="p-6">
                <div v-if="isLoadingLineItems" class="text-center py-8 text-gray-500 dark:text-gray-400">
                  <svg class="w-8 h-8 mx-auto mb-4 text-gray-300 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <p>Loading line items...</p>
                </div>
                <div v-else-if="lineItems.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  <p>No line items added yet. Add your first line item above.</p>
                </div>
                
                <!-- Group by Shipment Type -->
                <div v-else class="space-y-4">
                  <div v-for="(group, shipmentType) in groupedLineItems" :key="shipmentType" class="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                      <h5 class="font-medium text-gray-900 dark:text-white capitalize">{{ shipmentType.replace('_', ' ') }}</h5>
                    </div>
                    
                    <div class="divide-y divide-gray-200 dark:divide-gray-700">
                      <div v-for="(item, index) in group" :key="index" class="p-4">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Description:</span>
                                <p class="text-sm text-gray-900 dark:text-white">{{ item.description }}</p>
                              </div>
                              <div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                                <p class="text-sm text-gray-900 dark:text-white">{{ item.quantity }}</p>
                              </div>
                              <div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Unit Price:</span>
                                <p class="text-sm text-gray-900 dark:text-white">{{ formatCurrency(item.unit_price, item.currency_id) }}</p>
                              </div>
                              <div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Total:</span>
                                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatCurrency(item.total_amount, item.currency_id) }}</p>
                              </div>
                              <div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                                <p class="text-sm text-gray-900 dark:text-white capitalize">{{ item.service_category?.replace('_', ' ') }}</p>
                              </div>
                              <div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Rate Type:</span>
                                <p class="text-sm text-gray-900 dark:text-white capitalize">{{ item.rate_type?.replace('_', ' ') }}</p>
                              </div>
                            </div>
                            <div v-if="item.notes" class="mt-2">
                              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                              <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.notes }}</p>
                            </div>
                          </div>
                          <button @click="removeLineItemByItem(item)" class="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Total -->
                  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div class="flex justify-between items-center">
                      <span class="text-lg font-semibold text-gray-900 dark:text-white">Total Amount:</span>
                      <span class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(totalAmount) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Modal footer -->
        <div class="flex items-center justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          <button @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button @click="saveLineItems" class="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Save Line Items
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { currenciesControllers } from '../../api/controllers/currencies.controllers'
import { useCurrenciesStore } from '../../store/currencies.store'
import { logisticsContractRatesControllers } from '../../api/controllers/logistics-contract-rates.controllers'
import feathersClient from '../../api/feathers'

interface LineItem {
  id?: number
  shipment_type: string
  description: string
  quantity: number
  unit_price: number
  total_amount: number
  currency_id: number
  rate_type: string
  service_category: string
  rate_id?: number
  notes?: string
}

interface Props {
  show: boolean
  lineItems?: LineItem[]
  invoice?: any // Add invoice prop to access opportunity and rates
}

interface Emits {
  (e: 'close'): void
  (e: 'save', lineItems: LineItem[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Store
const currenciesStore = useCurrenciesStore()

// Reactive data
const lineItems = ref<LineItem[]>([])
const contractRates = ref<any[]>([])
const isLoadingRates = ref(false)
const isLoadingLineItems = ref(false)
const newLineItem = ref<LineItem>({
  shipment_type: '',
  description: '',
  quantity: 1,
  unit_price: 0,
  total_amount: 0,
  currency_id: 1,
  rate_type: '',
  service_category: '',
  notes: ''
})

// Computed
const currencies = computed(() => currenciesStore.getCurrencies)

const groupedLineItems = computed(() => {
  const groups: Record<string, LineItem[]> = {}
  lineItems.value.forEach(item => {
    const type = item.shipment_type || 'other'
    if (!groups[type]) {
      groups[type] = []
    }
    groups[type].push(item)
  })
  return groups
})

const totalAmount = computed(() => {
  return lineItems.value.reduce((total, item) => {
    return total + (item.total_amount || 0)
  }, 0)
})

// Watch for changes in quantity and unit price to recalculate totals
watch(() => lineItems.value, (newItems) => {
  newItems.forEach(item => {
    item.quantity = Number(item.quantity) || 0
    item.unit_price = Number(item.unit_price) || 0
    item.total_amount = Number((item.quantity || 0) * (item.unit_price || 0))
  })
}, { deep: true })

// Methods
const closeModal = () => {
  emit('close')
}

const addLineItem = () => {
  if (!newLineItem.value.shipment_type || !newLineItem.value.description) {
    return
  }
  
  const item: LineItem = {
    ...newLineItem.value,
    quantity: Number(newLineItem.value.quantity) || 0,
    unit_price: Number(newLineItem.value.unit_price) || 0,
    total_amount: Number((newLineItem.value.quantity || 0) * (newLineItem.value.unit_price || 0)),
    currency_id: Number(newLineItem.value.currency_id) || 1,
    rate_id: newLineItem.value.rate_id ? Number(newLineItem.value.rate_id) : undefined
  }
  
  lineItems.value.push(item)
  
  // Reset form
  newLineItem.value = {
    shipment_type: '',
    description: '',
    quantity: 1,
    unit_price: 0,
    total_amount: 0,
    currency_id: 1,
    rate_type: '',
    service_category: '',
    notes: ''
  }
}

const removeLineItem = (index: number) => {
  lineItems.value.splice(index, 1)
}

const removeLineItemByItem = (item: LineItem) => {
  const index = lineItems.value.findIndex(lineItem => {
    // If item has an ID, compare by ID, otherwise compare by reference
    if (item.id && lineItem.id) {
      return lineItem.id === item.id
    }
    return lineItem === item
  })
  if (index !== -1) {
    lineItems.value.splice(index, 1)
  }
}

const saveLineItems = () => {
  emit('save', lineItems.value)
  closeModal()
}

const formatCurrency = (amount: number, currencyId: number = 1) => {
  const currency = currencies.value.find((c: any) => c.id === currencyId)
  const symbol = currency?.symbol || '$'
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Load currencies on mount
const loadCurrencies = async () => {
  try {
    await currenciesStore.fetchCurrencies()
  } catch (error) {
    console.error('Error loading currencies:', error)
  }
}

// Load existing line items for the invoice
const loadExistingLineItems = async () => {
  if (!props.invoice?.id) {
    lineItems.value = []
    return
  }
  
  isLoadingLineItems.value = true
  try {
    // If lineItems are passed as props, use them (for immediate display)
    if (props.lineItems && props.lineItems.length > 0) {
      lineItems.value = [...props.lineItems]
      return
    }
    
    // Otherwise, fetch from the API using Feathers client
    const response = await feathersClient.service('crm/invoice_line_items').find({
      query: { invoice_id: props.invoice.id }
    })
    lineItems.value = response.data || []
  } catch (error) {
    console.error('Error loading existing line items:', error)
    lineItems.value = []
  } finally {
    isLoadingLineItems.value = false
  }
}

// Load contract rates from opportunity
const loadContractRates = async () => {
  if (!props.invoice?.opportunity_id) {
    return
  }
  
  isLoadingRates.value = true
  try {
    const response = await logisticsContractRatesControllers.getRatesByOpportunity(props.invoice.opportunity_id)
    contractRates.value = response.data || []
  } catch (error) {
    console.error('Error loading contract rates:', error)
  } finally {
    isLoadingRates.value = false
  }
}

// Add line item from contract rate
const addLineItemFromRate = (rate: any) => {
  const item: LineItem = {
    shipment_type: rate.service_category || 'transportation',
    description: `${rate.service_category} - ${rate.rate_type}`,
    quantity: Number(1),
    unit_price: Number(rate.rate_amount) || 0,
    total_amount: Number(rate.rate_amount) || 0,
    currency_id: Number(rate.currency_id) || 1,
    rate_type: rate.rate_type || 'flat_rate',
    service_category: rate.service_category || 'transportation',
    rate_id: Number(rate.id),
    notes: `Based on contract rate: ${rate.rate_amount} ${rate.currency?.symbol || '$'} per ${rate.rate_type}`
  }
  
  lineItems.value.push(item)
}

// Add all contract rates as line items
const addAllContractRates = () => {
  contractRates.value.forEach(rate => {
    addLineItemFromRate(rate)
  })
}

// Populate form from contract rate
const populateFormFromRate = (rate: any) => {
  newLineItem.value = {
    shipment_type: rate.service_category || 'transportation',
    description: `${rate.service_category} - ${rate.rate_type}`,
    quantity: Number(1),
    unit_price: Number(rate.rate_amount) || 0,
    total_amount: Number(rate.rate_amount) || 0,
    currency_id: Number(rate.currency_id) || 1,
    rate_type: rate.rate_type || 'flat_rate',
    service_category: rate.service_category || 'transportation',
    notes: `Based on contract rate: ${rate.rate_amount} ${rate.currency?.symbol || '$'} per ${rate.rate_type}`
  }
}

// Watch for modal show
watch(() => props.show, (newShow) => {
  if (newShow) {
    loadCurrencies()
    loadExistingLineItems()
    // Set default currency if available
    if (currencies.value.length > 0 && newLineItem.value.currency_id === 1) {
      newLineItem.value.currency_id = currencies.value[0].id
    }
    // Auto-load contract rates if opportunity exists
    if (props.invoice?.opportunity_id) {
      loadContractRates()
    }
  }
})

// Load currencies on mount
onMounted(() => {
  loadCurrencies()
})
</script>

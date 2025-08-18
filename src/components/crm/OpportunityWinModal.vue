<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-2xl">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Mark Opportunity as Won
          </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div v-if="opportunity" class="space-y-6">
            <!-- Opportunity Summary -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ opportunity.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.company_name }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Expected Amount:</span>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(opportunity.amount, opportunity.currency_id) }}</p>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Probability:</span>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ opportunity.probability }}%</p>
                </div>
              </div>
            </div>

            <!-- Win Details Form -->
            <form @submit.prevent="processWin" class="space-y-6">
              <!-- Basic Win Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Win Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Win Date *
                  </label>
                  <input
                    v-model="winData.wonDate"
                    type="date"
                    required
                    :max="today"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                </div>

                <!-- Actual Amount -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Actual Amount
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                      {{ getCurrencySymbol(opportunity.currency_id) }}
                    </span>
                    <input
                      v-model.number="winData.actualAmount"
                      type="number"
                      step="0.01"
                      :placeholder="opportunity.amount?.toString()"
                      class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Leave empty to use expected amount: {{ formatCurrency(opportunity.amount, opportunity.currency_id) }}
                  </p>
                </div>
              </div>

              <!-- Logistics Service Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logistics Service Type
                </label>
                <select
                  v-model="winData.logisticsServiceType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Service Type</option>
                  <option value="freight">Freight</option>
                  <option value="warehousing">Warehousing</option>
                  <option value="transportation">Transportation</option>
                  <option value="integrated">Integrated (Full Service)</option>
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Select the primary logistics service for this contract
                </p>
              </div>

              <!-- Contract Details -->
              <div v-if="winData.logisticsServiceType" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 class="text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">Contract Details</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Contract Basis -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rate Basis
                    </label>
                    <select
                      v-model="winData.contractBasis"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select Rate Basis</option>
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

                  <!-- Contract Duration -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration (Months)
                    </label>
                    <input
                      v-model.number="winData.contractDurationMonths"
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>

                  <!-- Currency -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency *
                    </label>
                    <select
                      v-model="winData.rateCurrencyId"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select Currency</option>
                      <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                        {{ currency.symbol }} - {{ currency.currency_name }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Base Rate with Currency -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Base Rate *
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                        {{ getCurrencySymbol(winData.rateCurrencyId || opportunity.currency_id) }}
                      </span>
                      <input
                        v-model.number="winData.baseRate"
                        type="number"
                        step="0.01"
                        required
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Rate per {{ getRateTypeLabel(winData.contractBasis) }}
                    </p>
                  </div>

                  <!-- Minimum Charge with Currency -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Minimum Charge
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                        {{ getCurrencySymbol(winData.rateCurrencyId || opportunity.currency_id) }}
                      </span>
                      <input
                        v-model.number="winData.minimumCharge"
                        type="number"
                        step="0.01"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Minimum amount per invoice
                    </p>
                  </div>
                </div>

                <!-- Contract Dates -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contract Start Date
                    </label>
                    <input
                      v-model="winData.contractStartDate"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contract End Date
                    </label>
                    <input
                      v-model="winData.contractEndDate"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                </div>

                <!-- Additional Charges -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fuel Surcharge (%)
                    </label>
                    <input
                      v-model.number="winData.fuelSurchargePercentage"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Handling Fee (%)
                    </label>
                    <input
                      v-model.number="winData.handlingFeePercentage"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Minimum Charge
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                        {{ getCurrencySymbol(opportunity.currency_id) }}
                      </span>
                      <input
                        v-model.number="winData.minimumCharge"
                        type="number"
                        step="0.01"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                  </div>
                </div>

                <!-- Special Requirements -->
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requirements
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label class="flex items-center">
                      <input
                        v-model="winData.specialHandlingRequired"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Special Handling</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="winData.temperatureControlled"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Temperature Controlled</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="winData.hazardousMaterials"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Hazardous Materials</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Win Notes
                </label>
                <textarea
                  v-model="winData.notes"
                  rows="3"
                  placeholder="Add any notes about how the deal was won, key factors, contract terms, etc."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>

              <!-- Next Steps -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Next Steps
                </label>
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="nextSteps.createCustomer"
                      type="checkbox"
                      id="createCustomer"
                      class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    >
                    <label for="createCustomer" class="text-sm text-gray-700 dark:text-gray-300">
                      Create customer entity
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="nextSteps.createContact"
                      type="checkbox"
                      id="createContact"
                      class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    >
                    <label for="createContact" class="text-sm text-gray-700 dark:text-gray-300">
                      Create contact person
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="nextSteps.createProject"
                      type="checkbox"
                      id="createProject"
                      class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    >
                    <label for="createProject" class="text-sm text-gray-700 dark:text-gray-300">
                      Create initial project/shipment
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="nextSteps.generateInvoice"
                      type="checkbox"
                      id="generateInvoice"
                      class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    >
                    <label for="generateInvoice" class="text-sm text-gray-700 dark:text-gray-300">
                      Generate logistics invoice
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="nextSteps.sendNotifications"
                      type="checkbox"
                      id="sendNotifications"
                      class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    >
                    <label for="sendNotifications" class="text-sm text-gray-700 dark:text-gray-300">
                      Send notifications
                    </label>
                  </div>
                </div>
              </div>

              <!-- Processing Status -->
              <div v-if="processing" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                  <div>
                    <h4 class="text-sm font-medium text-blue-800 dark:text-blue-300">Processing Opportunity Win</h4>
                    <p class="text-xs text-blue-600 dark:text-blue-400">Setting up logistics contract and generating rates...</p>
                  </div>
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="result.success" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-green-800 dark:text-green-300">Success!</h4>
                    <p class="text-xs text-green-600 dark:text-green-400">{{ result.message }}</p>
                  </div>
                </div>
                <div v-if="result.data" class="mt-3 text-xs text-green-600 dark:text-green-400">
                  <div v-if="result.data.customerId">Customer ID: {{ result.data.customerId }}</div>
                  <div v-if="result.data.contactId">Contact ID: {{ result.data.contactId }}</div>
                  <div v-if="result.data.projectId">Project ID: {{ result.data.projectId }}</div>
                  <div v-if="result.data.contractId">Contract ID: {{ result.data.contractId }}</div>
                  <div v-if="result.data.ratesCreated">Rates Created: {{ result.data.ratesCreated }}</div>
                  <div v-if="result.data.logisticsInvoiceId">Logistics Invoice ID: {{ result.data.logisticsInvoiceId }}</div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="result.errors && result.errors.length > 0" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-red-800 dark:text-red-300">Error</h4>
                    <ul class="text-xs text-red-600 dark:text-red-400">
                      <li v-for="error in result.errors" :key="error">{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
          <button 
            @click="closeModal" 
            :disabled="processing"
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            @click="processWin" 
            :disabled="processing || !winData.wonDate"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="processing" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ processing ? 'Processing...' : 'Mark as Won' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { opportunityWinService, type OpportunityWinData, type WinProcessResult } from '../../services/crm/OpportunityWinService'

interface Props {
  show: boolean
  opportunity: any
  currencies: any[]
}

interface Emits {
  (e: 'close'): void
  (e: 'win-processed', result: WinProcessResult): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Reactive data
const processing = ref(false)
const result = ref<WinProcessResult>({
  success: false,
  message: '',
  data: {},
  errors: []
})

const winData = ref<OpportunityWinData>({
  opportunityId: 0,
  wonDate: '',
  actualAmount: undefined,
  notes: '',
  nextSteps: []
})

const nextSteps = ref({
  createCustomer: true,
  createContact: true,
  createProject: true,
  generateInvoice: true,
  sendNotifications: true
})

// Computed
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Methods
const closeModal = () => {
  if (!processing.value) {
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  winData.value = {
    opportunityId: 0,
    wonDate: '',
    actualAmount: undefined,
    notes: '',
    nextSteps: []
  }
  nextSteps.value = {
    createCustomer: true,
    createContact: true,
    createProject: true,
    generateInvoice: true,
    sendNotifications: true
  }
  result.value = {
    success: false,
    message: '',
    data: {},
    errors: []
  }
}

const processWin = async () => {
  if (!props.opportunity || !winData.value.wonDate) return

  processing.value = true
  result.value = {
    success: false,
    message: '',
    data: {},
    errors: []
  }

  try {
    // Prepare win data
    const data: OpportunityWinData = {
      opportunityId: props.opportunity.id,
      wonDate: winData.value.wonDate,
      actualAmount: winData.value.actualAmount || props.opportunity.amount,
      notes: winData.value.notes,
      nextSteps: Object.entries(nextSteps.value)
        .filter(([_, enabled]) => enabled)
        .map(([step]) => step),
      // Logistics-specific fields
      logisticsServiceType: winData.value.logisticsServiceType,
      contractBasis: winData.value.contractBasis,
      contractDurationMonths: winData.value.contractDurationMonths,
      contractStartDate: winData.value.contractStartDate,
      contractEndDate: winData.value.contractEndDate,
      baseRate: winData.value.baseRate,
      rateCurrencyId: winData.value.rateCurrencyId || props.opportunity.currency_id,
      minimumCharge: winData.value.minimumCharge,
      fuelSurchargePercentage: winData.value.fuelSurchargePercentage,
      handlingFeePercentage: winData.value.handlingFeePercentage,
      specialHandlingRequired: winData.value.specialHandlingRequired,
      temperatureControlled: winData.value.temperatureControlled,
      hazardousMaterials: winData.value.hazardousMaterials
    }

    // Process the win
    const winResult = await opportunityWinService.processOpportunityWin(data)
    result.value = winResult

    if (winResult.success) {
      // Emit success event
      emit('win-processed', winResult)
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        closeModal()
      }, 3000)
    }
  } catch (error: any) {
    result.value = {
      success: false,
      message: 'An unexpected error occurred',
      errors: [error.message || 'Unknown error']
    }
  } finally {
    processing.value = false
  }
}

const formatCurrency = (amount: number, currencyId: number) => {
  const currency = props.currencies.find(c => c.id === currencyId)
  const symbol = currency?.symbol || '$'
  return `${symbol}${amount?.toLocaleString() || '0'}`
}

const getCurrencySymbol = (currencyId: number) => {
  const currency = props.currencies.find(c => c.id === currencyId)
  return currency?.symbol || '$'
}

const getRateTypeLabel = (basis: string) => {
  switch (basis) {
    case 'per_kg':
      return 'KG'
    case 'per_cbm':
      return 'CBM'
    case 'per_shipment':
      return 'Shipment'
    case 'per_pallet':
      return 'Pallet'
    case 'per_container':
      return 'Container'
    case 'per_hour':
      return 'Hour'
    case 'per_day':
      return 'Day'
    case 'per_month':
      return 'Month'
    case 'fixed_rate':
      return 'Fixed'
    default:
      return 'Rate'
  }
}

// Watch for opportunity changes
watch(() => props.opportunity, (newOpportunity) => {
  if (newOpportunity) {
    winData.value.opportunityId = newOpportunity.id
    winData.value.actualAmount = newOpportunity.amount
    winData.value.rateCurrencyId = newOpportunity.currency_id
  }
}, { immediate: true })
</script>

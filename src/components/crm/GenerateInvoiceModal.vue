<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Invoice from Opportunity
          </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <!-- Step 1: Opportunity Selection and Information -->
          <div v-if="step === 1" class="space-y-6">
            <!-- Opportunity Selection (only shown if no opportunity provided) -->
            <div v-if="!props.opportunity" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Select Opportunity
                </h3>
              </div>
              <div class="p-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Choose an opportunity</label>
                  <select
                    v-model="selectedOpportunity"
                    @change="() => loadRatesForOpportunity()"
                    :disabled="opportunitiesStore.getLoading"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {{ opportunitiesStore.getLoading ? 'Loading opportunities...' : 'Choose an opportunity...' }}
                    </option>
                    <option
                      v-for="opportunity in opportunities"
                      :key="opportunity.id"
                      :value="opportunity.id"
                    >
                      {{ opportunity.title }} - {{ opportunity.company_name }}
                    </option>
                  </select>
                  <div v-if="opportunitiesStore.getError" class="mt-2 text-sm text-red-600 dark:text-red-400">
                    {{ opportunitiesStore.getError }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Pre-selected Opportunity Display (only shown if opportunity provided) -->
            <div v-if="props.opportunity" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Selected Opportunity
                </h3>
              </div>
              <div class="p-6">
                <div class="space-y-2">
                  <p class="font-medium text-gray-900 dark:text-white">{{ props.opportunity.title }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ props.opportunity.company_name }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ props.opportunity.contact_name }}</p>
                  <p v-if="props.opportunity.amount" class="text-sm text-gray-600 dark:text-gray-400">
                    Value: {{ formatCurrency(props.opportunity.amount, props.opportunity.currency_id || 1) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Company Information (always shown) -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Billing From
                </h3>
              </div>
              <div class="p-6">
                <div class="space-y-2">
                  <p class="font-medium text-gray-900 dark:text-white">{{ billingCompany?.name || 'Company Name' }}</p>
                  <p v-if="billingCompany?.location" class="text-sm text-gray-600 dark:text-gray-400">{{ billingCompany.location }}</p>
                  <p v-if="billingCompany?.phone_number" class="text-sm text-gray-600 dark:text-gray-400">Phone: {{ billingCompany.phone_number }}</p>
                  <p v-if="billingCompany?.email" class="text-sm text-gray-600 dark:text-gray-400">Email: {{ billingCompany.email }}</p>
                  <p v-if="billingCompany?.website" class="text-sm text-gray-600 dark:text-gray-400">Website: {{ billingCompany.website }}</p>
                </div>
              </div>
            </div>

            <!-- Available Rates (always shown when opportunity is selected) -->
            <div v-if="(selectedOpportunity || props.opportunity) && (opportunityRates.length > 0 || loading)" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Available Rates for This Opportunity
                </h3>
              </div>
              <div class="p-6">
                <div v-if="loading" class="flex items-center justify-center py-8">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span class="ml-3 text-gray-600 dark:text-gray-400">Loading rates...</span>
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="rate in opportunityRates"
                    :key="rate.id"
                    class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="font-medium text-gray-900 dark:text-white">{{ rate.service_category }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ rate.rate_type }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatCurrency(rate.rate_amount, rate.currency_id) }}</p>
                      </div>
                      <div class="text-right">
                        <span
                          :class="rate.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'"
                          class="px-2 py-1 text-xs rounded-full"
                        >
                          {{ rate.is_active ? 'Active' : 'Inactive' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Rates Warning -->
            <div v-else-if="(selectedOpportunity || props.opportunity) && !loading && opportunityRates.length === 0" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p class="text-yellow-800 dark:text-yellow-200">
                  No rates configured for this opportunity. Please configure rates first.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2: Configure Invoice Details -->
          <div v-if="step === 2" class="space-y-6">
            <!-- Invoice Configuration -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Configure Invoice Details
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Date</label>
                    <input
                      v-model="invoiceData.invoice_date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                    <input
                      v-model="invoiceData.due_date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea
                    v-model="invoiceData.notes"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter any additional notes for this invoice..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
          <button 
            @click="closeModal" 
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            v-if="step === 1"
            @click="nextStep" 
            :disabled="(!selectedOpportunity && !props.opportunity) || opportunityRates.length === 0 || loading"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            v-if="step === 2"
            @click="generateInvoice" 
            :disabled="loading"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useLogisticsContractRatesStore } from '../../store/logistics-contract-rates.store'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'
import { useOpportunitiesStore } from '../../store/opportunities.store'
import { useAuthStore } from '../../store/auth.store'
import { useCompanyStore } from '../../store/company.store'

// Props
interface Props {
  show: boolean
  opportunity?: any // Pre-selected opportunity
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  invoiceGenerated: [invoice: any]
}>()

// Stores
const ratesStore = useLogisticsContractRatesStore()
const invoicesStore = useLogisticsContractInvoicesStore()
const opportunitiesStore = useOpportunitiesStore()
const authStore = useAuthStore()
const companyStore = useCompanyStore()

// Reactive data
const step = ref(1)
const loading = ref(false)
const selectedOpportunity = ref('')
const opportunityRates = ref<any[]>([])

const invoiceData = reactive({
  invoice_date: new Date().toISOString().split('T')[0],
  due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  notes: ''
})

// Computed
const opportunities = computed(() => opportunitiesStore.getOpportunities)

// Resolve current user's billing company details
const billingCompany = ref<any | null>(null)
const deriveBillingCompany = () => {
  // Prefer embedded company on user
  if (authStore.user?.company) {
    billingCompany.value = authStore.user.company
    return
  }
  // Else try to resolve from store by id
  const companyId = authStore.user?.company_id
  if (companyId) {
    const found = (companyStore as any).getCompanies?.find?.((c: any) => c.id === companyId)
    if (found) billingCompany.value = found
  }
}

// Methods
const closeModal = () => {
  step.value = 1
  selectedOpportunity.value = ''
  opportunityRates.value = []
  emit('close')
}

// Initialize with pre-selected opportunity
const initializeWithOpportunity = async () => {
  if (props.opportunity) {
    selectedOpportunity.value = props.opportunity.id.toString()
    await loadRatesForOpportunity(props.opportunity.id.toString())
  }
}

const loadRatesForOpportunity = async (opportunityId?: string) => {
  const id = opportunityId || selectedOpportunity.value
  if (!id) return
  
  try {
    loading.value = true
    const rates = await ratesStore.fetchRatesByOpportunity(parseInt(id))
    opportunityRates.value = rates || []
  } catch (error) {
    console.error('Error loading rates:', error)
    opportunityRates.value = []
  } finally {
    loading.value = false
  }
}

const nextStep = () => {
  step.value = 2
}

const calculateTotalAmount = () => {
  return opportunityRates.value.reduce((total, rate) => {
    return total + (Number(rate.rate_amount) || 0)
  }, 0)
}

const generateInvoice = async () => {
  const opportunityId = selectedOpportunity.value || (props.opportunity?.id?.toString())
  if (!opportunityId) return
  
  if (!authStore.user?.id) {
    console.error('User not authenticated or missing user ID')
    return
  }
  
  try {
    loading.value = true
    
    const invoice = await invoicesStore.generateInvoice({
      opportunity_id: parseInt(opportunityId),
      invoice_date: new Date(invoiceData.invoice_date),
      due_date: new Date(invoiceData.due_date),
      notes: invoiceData.notes,
      user_id: authStore.user.id
    })
    
    emit('invoiceGenerated', invoice)
    closeModal()
  } catch (error) {
    console.error('Error generating invoice:', error)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number, currencyId: number = 1) => {
      return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD' // Default to USD for now, should be mapped from currencyId
    }).format(amount)
}

// Load opportunities on mount
const loadOpportunities = async () => {
  try {
    await opportunitiesStore.fetchOpportunities({ query: { $limit: 1000 } })
  } catch (error) {
    console.error('Error loading opportunities:', error)
  }
}

// Watch for modal show
watch(() => props.show, async (newShow) => {
  if (newShow) {
    // populate billing company from user or store; fetch if needed
    deriveBillingCompany()
    if (!billingCompany.value && authStore.user?.company_id) {
      try {
        const result = await (companyStore as any).fetchCompany?.(authStore.user.company_id)
        if (result) billingCompany.value = result
      } catch (e) {
        // ignore fetch error; UI will show placeholders
      }
    }

    if (props.opportunity) {
      // If opportunity is provided, skip loading all opportunities and initialize directly
      await initializeWithOpportunity()
    } else {
      // Load all opportunities for selection
      await loadOpportunities()
    }
  }
})
</script>

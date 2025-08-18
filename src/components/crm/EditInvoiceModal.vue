<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Invoice
          </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Basic Information -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Basic Information
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Invoice Number -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Number</label>
                    <input
                      v-model="form.invoice_number"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter invoice number"
                    />
                  </div>

                  <!-- Invoice Date -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Date</label>
                    <input
                      v-model="form.invoice_date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <!-- Due Date -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                    <input
                      v-model="form.due_date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <!-- Status -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select
                      v-model="form.status"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>

                  <!-- Currency -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                    <select
                      v-model="form.currency_id"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                        {{ currency.currency_name }} ({{ currency.symbol }})
                      </option>
                    </select>
                  </div>

                  <!-- Total Amount (Calculated from Line Items) -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Amount</label>
                    <div class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white font-medium">
                      <div v-if="isLoadingLineItems" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading line items...
                      </div>
                      <div v-else>
                        {{ formatCurrency(calculatedTotalAmount) }}
                        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">(from {{ lineItems.length }} line items)</span>
                      </div>
                    </div>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      💡 Line items are managed separately. Use the "Line Items" button in the invoice list to add/edit line items.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Payment Information
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Payment Method -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                    <select
                      v-model="form.payment_method"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select payment method</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                      <option value="paypal">PayPal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <!-- Payment Date -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Date</label>
                    <input
                      v-model="form.payment_date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <!-- Reference Number -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reference Number</label>
                    <input
                      v-model="form.reference_number"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter reference number"
                    />
                  </div>

                  <!-- Paid Amount -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paid Amount</label>
                    <input
                      v-model="form.paid_amount"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Notes
                </h3>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <!-- Notes -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                    <textarea
                      v-model="form.notes"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter invoice notes"
                    ></textarea>
                  </div>

                  <!-- Payment Notes -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Notes</label>
                    <textarea
                      v-model="form.payment_notes"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter payment notes"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          <button
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            :disabled="loading"
            class="ml-3 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useCurrenciesStore } from '../../store/currencies.store'
import feathersClient from '../../api/feathers'

interface Props {
  show: boolean
  invoice: any
}

interface Emits {
  (e: 'close'): void
  (e: 'save', data: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currenciesStore = useCurrenciesStore()
const loading = ref(false)
const lineItems = ref<any[]>([])
const isLoadingLineItems = ref(false)

// Form data
const form = ref({
  invoice_number: '',
  invoice_date: '',
  due_date: '',
  status: 'draft',
  currency_id: 1,
  payment_method: '',
  payment_date: '',
  reference_number: '',
  paid_amount: 0,
  notes: '',
  payment_notes: ''
})

// Computed properties
const currencies = computed(() => currenciesStore.getCurrencies)

// Calculate total amount from line items
const calculatedTotalAmount = computed(() => {
  return lineItems.value.reduce((total, item) => {
    return total + (Number(item.total_amount) || 0)
  }, 0)
})

// Format currency function
const formatCurrency = (amount: number, currencyId?: number) => {
  const currency = currencies.value.find((c: any) => c.id === (currencyId || form.value.currency_id))
  if (!currency) return `$${amount.toFixed(2)}`
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.currency_code || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
}

// Methods
const closeModal = () => {
  emit('close')
}

// Load line items for the invoice
const loadLineItems = async (invoiceId: number) => {
  if (!invoiceId) return
  
  isLoadingLineItems.value = true
  try {
    const response = await feathersClient.service('crm/invoice_line_items').find({
      query: {
        invoice_id: invoiceId
      }
    })
    lineItems.value = response.data || []
  } catch (error) {
    console.error('Error loading line items:', error)
    lineItems.value = []
  } finally {
    isLoadingLineItems.value = false
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const formData = {
      ...form.value,
      total_amount: calculatedTotalAmount.value, // Use calculated total from line items
      paid_amount: Number(form.value.paid_amount) || 0,
      currency_id: Number(form.value.currency_id) || 1
    }
    
    emit('save', formData)
  } catch (error) {
    console.error('Error saving invoice:', error)
  } finally {
    loading.value = false
  }
}

// Watch for invoice changes and populate form
watch(() => props.invoice, (newInvoice) => {
  if (newInvoice) {
    form.value = {
      invoice_number: newInvoice.invoice_number || '',
      invoice_date: newInvoice.invoice_date ? newInvoice.invoice_date.split('T')[0] : '',
      due_date: newInvoice.due_date ? newInvoice.due_date.split('T')[0] : '',
      status: newInvoice.status || 'draft',
      currency_id: newInvoice.currency_id || 1,
      payment_method: newInvoice.payment_method || '',
      payment_date: newInvoice.payment_date ? newInvoice.payment_date.split('T')[0] : '',
      reference_number: newInvoice.reference_number || '',
      paid_amount: newInvoice.paid_amount || 0,
      notes: newInvoice.notes || '',
      payment_notes: newInvoice.payment_notes || ''
    }
    
    // Load line items for this invoice
    if (newInvoice.id) {
      loadLineItems(newInvoice.id)
    }
  }
}, { immediate: true })

// Load currencies on mount
const loadCurrencies = async () => {
  if (currencies.value.length === 0) {
    await currenciesStore.fetchCurrencies()
  }
}

// Load currencies when modal opens
watch(() => props.show, (newShow) => {
  if (newShow) {
    loadCurrencies()
  }
})
</script>

<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-lg max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Record Payment
          </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <!-- Invoice Info -->
          <div v-if="invoice" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">{{ invoice.invoice_number }}</h4>
                <p class="text-sm text-blue-800 dark:text-blue-200">Due: {{ formatDate(invoice.due_date) }}</p>
                <p class="text-sm text-blue-800 dark:text-blue-200">
                  Total: {{ formatCurrency(invoice.total_amount, invoice.currency_id) }}
                  <span v-if="invoice.paid_amount" class="ml-2">
                    (Paid: {{ formatCurrency(invoice.paid_amount, invoice.currency_id) }})
                  </span>
                </p>
              </div>
              <span
                :class="getStatusClasses(invoice.status)"
                class="px-2 py-1 text-xs rounded-full"
              >
                {{ formatStatus(invoice.status) }}
              </span>
            </div>
          </div>

          <!-- Payment Form -->
          <form @submit.prevent="recordPayment" class="space-y-6">
            <!-- Payment Amount -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Payment Details
                </h3>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Amount</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">USD</span>
                      </div>
                      <input
                        v-model="paymentData.amount"
                        type="number"
                        step="0.01"
                        min="0"
                        :max="remainingAmount"
                        required
                        class="pl-12 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="0.00"
                      />
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Remaining: {{ formatCurrency(remainingAmount, invoice?.currency_id || 1) }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Date</label>
                    <input
                      v-model="paymentData.payment_date"
                      type="date"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                    <select
                      v-model="paymentData.payment_method"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select payment method</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reference Number</label>
                    <input
                      v-model="paymentData.reference_number"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Transaction ID, check number, etc."
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                    <textarea
                      v-model="paymentData.notes"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Additional notes about this payment..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
            @click="recordPayment" 
            :disabled="loading"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Record Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'
import { useAuthStore } from '../../store/auth.store'
import { formatCurrency, formatDate } from '../../utils/formatters'

// Props
interface Props {
  show: boolean
  invoice: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  'payment-recorded': [payment: any]
}>()

// Stores
const invoicesStore = useLogisticsContractInvoicesStore()
const authStore = useAuthStore()

// Reactive data
const loading = ref(false)
const error = ref('')

const paymentData = ref({
  amount: '',
  payment_date: new Date().toISOString().split('T')[0],
  payment_method: '',
  reference_number: '',
  notes: ''
})

// Computed
const remainingAmount = computed(() => {
  if (!props.invoice) return 0
  const total = props.invoice.total_amount || 0
  const paid = props.invoice.paid_amount || 0
  return Math.max(0, total - paid)
})

// Methods
const closeModal = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  paymentData.value = {
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: '',
    reference_number: '',
    notes: ''
  }
  error.value = ''
}

const recordPayment = async () => {
  if (!props.invoice || !paymentData.value.amount || !paymentData.value.payment_date) return

  loading.value = true
  error.value = ''

  try {
    const payment = await invoicesStore.recordPayment(props.invoice.id, {
      amount: parseFloat(paymentData.value.amount),
      payment_date: paymentData.value.payment_date,
      payment_method: paymentData.value.payment_method,
      reference_number: paymentData.value.reference_number,
      notes: paymentData.value.notes,
      user_id: authStore.user?.id || 0
    })

    emit('payment-recorded', payment)
    closeModal()
  } catch (err: any) {
    error.value = err.message || 'Failed to record payment'
    console.error('Error recording payment:', err)
  } finally {
    loading.value = false
  }
}

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getStatusClasses = (status: string) => {
  const classes: { [key: string]: string } = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
    partial: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Watch for modal show to reset form
watch(() => props.show, (newShow) => {
  if (newShow) {
    resetForm()
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-4 py-3 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Related Invoices</h3>
      <p class="text-sm text-gray-500">Invoices generated using this rate</p>
    </div>
    
    <div class="p-4">
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Loading invoices...</span>
      </div>
      
      <div v-else-if="relatedInvoices.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
        <p class="mt-1 text-sm text-gray-500">No invoices have been generated using this rate yet.</p>
        <div class="mt-6">
          <button
            @click="generateInvoice"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate Invoice
          </button>
        </div>
      </div>
      
      <div v-else class="space-y-4">
        <div class="flex justify-between items-center">
          <h4 class="text-sm font-medium text-gray-900">
            {{ relatedInvoices.length }} invoice{{ relatedInvoices.length !== 1 ? 's' : '' }} found
          </h4>
          <button
            @click="generateInvoice"
            class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Invoice
          </button>
        </div>
        
        <div class="space-y-3">
          <div
            v-for="invoice in relatedInvoices"
            :key="invoice.id"
            class="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
            @click="viewInvoice(invoice)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <h5 class="text-sm font-medium text-gray-900">{{ invoice.invoice_number }}</h5>
                  <span
                    :class="getStatusClasses(invoice.status)"
                    class="px-2 py-1 text-xs rounded-full"
                  >
                    {{ formatStatus(invoice.status) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  {{ formatDate(invoice.invoice_date) }} - Due: {{ formatDate(invoice.due_date) }}
                </p>
                <p class="text-sm text-gray-600">
                  Amount: {{ formatCurrency(invoice.total_amount, invoice.currency_id) }}
                  <span v-if="invoice.paid_amount" class="ml-2">
                    (Paid: {{ formatCurrency(invoice.paid_amount, invoice.currency_id) }})
                  </span>
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click.stop="viewInvoice(invoice)"
                  class="text-blue-600 hover:text-blue-800"
                  title="View Invoice"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  v-if="invoice.status === 'sent'"
                  @click.stop="recordPayment(invoice)"
                  class="text-green-600 hover:text-green-800"
                  title="Record Payment"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'

// Props
interface Props {
  rateId: number
  opportunityId: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  generateInvoice: [rateId: number]
  viewInvoice: [invoice: any]
  recordPayment: [invoice: any]
}>()

// Store
const invoicesStore = useLogisticsContractInvoicesStore()

// Reactive data
const loading = ref(false)
const relatedInvoices = ref<any[]>([])

// Methods
const loadRelatedInvoices = async () => {
  try {
    loading.value = true
    const invoices = await invoicesStore.fetchInvoices({
      query: {
        opportunity_id: props.opportunityId,
        $sort: { created_at: -1 }
      }
    })
    relatedInvoices.value = invoices.data || []
  } catch (error) {
    console.error('Error loading related invoices:', error)
  } finally {
    loading.value = false
  }
}

const generateInvoice = () => {
  emit('generateInvoice', props.rateId)
}

const viewInvoice = (invoice: any) => {
  emit('viewInvoice', invoice)
}

const recordPayment = (invoice: any) => {
  emit('recordPayment', invoice)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number, currencyId: number = 1) => {
      return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD' // Default to USD for now, should be mapped from currencyId
    }).format(amount)
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

// Load invoices when component mounts or props change
onMounted(() => {
  loadRelatedInvoices()
})

watch(() => props.opportunityId, () => {
  loadRelatedInvoices()
})
</script>

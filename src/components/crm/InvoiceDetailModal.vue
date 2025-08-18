<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-6xl max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Invoice Details
          </h3>
          <div class="flex items-center space-x-2">
            <button 
              @click="printInvoice" 
              :disabled="loading"
              class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm px-3 py-1.5 inline-flex justify-center items-center transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {{ loading ? 'Generating...' : 'Print PDF' }}
            </button>
            <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div v-if="invoice" class="space-y-6">
            <!-- Invoice Header -->
            <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100">{{ invoice.invoice_number }}</h4>
                  <p class="text-sm text-purple-800 dark:text-purple-200">Invoice Date: {{ formatDate(invoice.invoice_date) }}</p>
                  <p class="text-sm text-purple-800 dark:text-purple-200">Due Date: {{ formatDate(invoice.due_date) }}</p>
                </div>
                <div class="text-center">
                  <span
                    :class="getStatusClasses(invoice.status)"
                    class="px-3 py-1 text-sm rounded-full"
                  >
                    {{ formatStatus(invoice.status) }}
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-purple-900 dark:text-purple-100">
                    {{ formatCurrency(calculatedTotalAmount, invoice.currency_id) }}
                  </p>
                  <p v-if="invoice.paid_amount" class="text-sm text-purple-800 dark:text-purple-200">
                    Paid: {{ formatCurrency(invoice.paid_amount, invoice.currency_id) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Company & Client Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Company Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  From
                </h3>
                <div class="space-y-2">
                  <p class="font-medium text-gray-900 dark:text-white">{{ userCompany?.name || 'Company Name' }}</p>
                  <p v-if="userCompany?.location" class="text-sm text-gray-600 dark:text-gray-400">{{ userCompany.location }}</p>
                  <p v-if="userCompany?.phone_number" class="text-sm text-gray-600 dark:text-gray-400">Phone: {{ userCompany.phone_number }}</p>
                  <p v-if="userCompany?.email" class="text-sm text-gray-600 dark:text-gray-400">Email: {{ userCompany.email }}</p>
                  <p v-if="userCompany?.website" class="text-sm text-gray-600 dark:text-gray-400">Website: {{ userCompany.website }}</p>
                </div>
              </div>

              <!-- Client Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Bill To
                </h3>
                <div class="space-y-2">
                  <p class="font-medium text-gray-900 dark:text-white">{{ invoice.opportunity?.company_name || 'Client Company' }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ invoice.opportunity?.contact_name || 'Contact Person' }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ invoice.opportunity?.contact_email || 'contact@company.com' }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ invoice.opportunity?.contact_phone || '+1 (555) 987-6543' }}</p>
                </div>
              </div>
            </div>

            <!-- Line Items -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Line Items ({{ lineItems.length }})
                </h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Service Category
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rate Type
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="item in lineItems" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {{ item.description }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {{ formatServiceCategory(item.service_category) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {{ formatRateType(item.rate_type) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right">
                        {{ item.quantity }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right">
                        {{ formatCurrency(item.unit_price, item.currency_id) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium">
                        {{ formatCurrency(item.total_amount, item.currency_id) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Payment Information -->
            <div v-if="invoice.payment_method || invoice.payment_date || invoice.reference_number" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Payment Information
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div v-if="invoice.payment_method">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatPaymentMethod(invoice.payment_method) }}</p>
                  </div>
                  <div v-if="invoice.payment_date">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Payment Date</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(invoice.payment_date) }}</p>
                  </div>
                  <div v-if="invoice.reference_number">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Reference Number</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ invoice.reference_number }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Invoice Summary -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Invoice Summary
                </h3>
              </div>
              <div class="p-6">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(calculatedTotalAmount, invoice.currency_id) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Paid Amount:</span>
                    <span class="text-sm font-medium text-green-600 dark:text-green-400">{{ formatCurrency(invoice.paid_amount || 0, invoice.currency_id) }}</span>
                  </div>
                  <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span class="text-base font-medium text-gray-900 dark:text-white">Outstanding:</span>
                    <span class="text-base font-bold text-red-600 dark:text-red-400">{{ formatCurrency(outstandingAmount, invoice.currency_id) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div v-if="invoice.notes || invoice.payment_notes" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Notes
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <div v-if="invoice.notes">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Invoice Notes:</p>
                  <p class="text-sm text-gray-900 dark:text-white">{{ invoice.notes }}</p>
                </div>
                <div v-if="invoice.payment_notes">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Notes:</p>
                  <p class="text-sm text-gray-900 dark:text-white">{{ invoice.payment_notes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
          <button 
            @click="closeModal" 
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'
import { useAuthStore } from '../../store/auth.store'
import { formatCurrency, formatDate } from '../../utils/formatters'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import feathersClient from '../../api/feathers'

// Props
interface Props {
  show: boolean
  invoice: any
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  'record-payment': [invoice: any]
  'send-invoice': [invoice: any]
}>()

// Stores
const invoicesStore = useLogisticsContractInvoicesStore()
const authStore = useAuthStore()

// Reactive data
const loading = ref(false)
const lineItems = ref<any[]>([])

// Computed
const calculatedTotalAmount = computed(() => {
  return lineItems.value.reduce((total, item) => {
    return total + (Number(item.total_amount) || 0)
  }, 0)
})

const outstandingAmount = computed(() => {
  return calculatedTotalAmount.value - (props.invoice?.paid_amount || 0)
})

const userCompany = computed(() => {
  return authStore.user?.company || null
})

// Methods
const closeModal = () => {
  emit('close')
}

const loadLineItems = async (invoiceId: number) => {
  if (!invoiceId) return
  
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
  }
}

const printInvoice = async () => {
  if (!props.invoice) return
  
  loading.value = true
  try {
    // Create a temporary div for PDF generation
    const pdfContent = document.createElement('div')
    pdfContent.className = 'pdf-content'
    pdfContent.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      color: black;
      font-family: Arial, sans-serif;
      font-size: 12px;
      line-height: 1.4;
    `
    
    // Generate PDF content
    pdfContent.innerHTML = generatePDFContent()
    
    // Temporarily add to DOM
    document.body.appendChild(pdfContent)
    
    // Convert to canvas
    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    
    // Remove from DOM
    document.body.removeChild(pdfContent)
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // Download PDF
    pdf.save(`invoice-${props.invoice.invoice_number}.pdf`)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
  } finally {
    loading.value = false
  }
}

const generatePDFContent = () => {
  const invoice = props.invoice
  const total = calculatedTotalAmount.value
  const outstanding = outstandingAmount.value
  const company = userCompany.value
  
  return `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #4f46e5; margin: 0; font-size: 24px;">${company?.name || 'COMPANY NAME'}</h1>
      <p style="margin: 5px 0; color: #6b7280;">${company?.location || 'Company Location'}</p>
      <p style="margin: 5px 0; color: #6b7280;">${company?.phone_number ? 'Phone: ' + company.phone_number : ''}${company?.email ? ' | Email: ' + company.email : ''}</p>
    </div>
    
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
      <div>
        <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">INVOICE</h2>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Invoice #:</strong> ${invoice.invoice_number}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Date:</strong> ${formatDate(invoice.invoice_date)}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Due Date:</strong> ${formatDate(invoice.due_date)}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Status:</strong> ${formatStatus(invoice.status)}</p>
      </div>
      <div style="text-align: right;">
        <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px;">BILL TO</h3>
        <p style="margin: 5px 0; color: #6b7280;">${invoice.opportunity?.company_name || 'Client Company'}</p>
        <p style="margin: 5px 0; color: #6b7280;">${invoice.opportunity?.contact_name || 'Contact Person'}</p>
        <p style="margin: 5px 0; color: #6b7280;">${invoice.opportunity?.contact_email || 'contact@company.com'}</p>
        <p style="margin: 5px 0; color: #6b7280;">${invoice.opportunity?.contact_phone || '+1 (555) 987-6543'}</p>
      </div>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; font-weight: bold;">Description</th>
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; font-weight: bold;">Service Category</th>
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold;">Quantity</th>
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold;">Unit Price</th>
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${lineItems.value.map(item => `
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 12px;">${item.description}</td>
            <td style="border: 1px solid #d1d5db; padding: 12px;">${formatServiceCategory(item.service_category)}</td>
            <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">${item.quantity}</td>
            <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">${formatCurrency(item.unit_price, item.currency_id)}</td>
            <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold;">${formatCurrency(item.total_amount, item.currency_id)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
      <div style="width: 300px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span><strong>Subtotal:</strong></span>
          <span>${formatCurrency(total, invoice.currency_id)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span><strong>Paid Amount:</strong></span>
          <span style="color: #059669;">${formatCurrency(invoice.paid_amount || 0, invoice.currency_id)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 2px solid #d1d5db;">
          <span style="font-size: 16px; font-weight: bold;">Outstanding:</span>
          <span style="font-size: 16px; font-weight: bold; color: #dc2626;">${formatCurrency(outstanding, invoice.currency_id)}</span>
        </div>
      </div>
    </div>
    
    ${invoice.notes ? `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #1f2937; margin: 0 0 10px 0;">Notes</h3>
        <p style="color: #6b7280; margin: 0;">${invoice.notes}</p>
      </div>
    ` : ''}
    
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #d1d5db; color: #6b7280;">
      <p>Thank you for your business!</p>
      <p>For questions about this invoice, please contact ${company?.email || 'billing@company.com'}</p>
    </div>
  `
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

const formatPaymentMethod = (method: string) => {
  const methods: { [key: string]: string } = {
    bank_transfer: 'Bank Transfer',
    credit_card: 'Credit Card',
    debit_card: 'Debit Card',
    cash: 'Cash',
    check: 'Check',
    paypal: 'PayPal',
    stripe: 'Stripe',
    other: 'Other'
  }
  return methods[method] || method
}

const formatServiceCategory = (category: string) => {
  const categories: { [key: string]: string } = {
    road_transport: 'Road Transport',
    air_freight: 'Air Freight',
    sea_freight: 'Sea Freight',
    warehousing: 'Warehousing',
    customs_clearance: 'Customs Clearance',
    last_mile_delivery: 'Last Mile Delivery',
    other: 'Other'
  }
  return categories[category] || category
}

const formatRateType = (rateType: string) => {
  const rateTypes: { [key: string]: string } = {
    per_unit: 'Per Unit',
    per_kg: 'Per KG',
    per_km: 'Per KM',
    flat_rate: 'Flat Rate',
    percentage: 'Percentage',
    other: 'Other'
  }
  return rateTypes[rateType] || rateType
}

// Load line items when modal opens
onMounted(() => {
  if (props.invoice?.id) {
    loadLineItems(props.invoice.id)
  }
})

// Watch for invoice changes
import { watch } from 'vue'
watch(() => props.invoice, (newInvoice) => {
  if (newInvoice?.id) {
    loadLineItems(newInvoice.id)
  }
}, { immediate: true })
</script>

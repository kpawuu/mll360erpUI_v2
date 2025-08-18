<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Test Logistics Services</h1>
      
      <!-- Test Results -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Test Results</h2>
        <div class="space-y-2">
          <div v-for="(result, index) in testResults" :key="index" class="flex items-center">
            <span :class="result.success ? 'text-green-600' : 'text-red-600'" class="mr-2">
              {{ result.success ? '✅' : '❌' }}
            </span>
            <span class="text-sm">{{ result.message }}</span>
          </div>
        </div>
      </div>

      <!-- Test Buttons -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Test Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="testCreateRate"
            :disabled="loading"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Test Create Rate
          </button>
          <button
            @click="testCreateInvoice"
            :disabled="loading"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Test Create Invoice
          </button>
          <button
            @click="testFetchRates"
            :disabled="loading"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Test Fetch Rates
          </button>
          <button
            @click="testFetchInvoices"
            :disabled="loading"
            class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
          >
            Test Fetch Invoices
          </button>
        </div>
      </div>

      <!-- Data Display -->
      <div v-if="rates.length > 0" class="bg-white rounded-lg shadow p-6 mt-6">
        <h2 class="text-xl font-semibold mb-4">Rates ({{ rates.length }})</h2>
        <div class="space-y-2">
          <div v-for="rate in rates" :key="rate.id" class="border p-3 rounded">
            <div class="font-medium">{{ rate.service_category }} - {{ rate.rate_type }}</div>
            <div class="text-sm text-gray-600">{{ rate.rate_amount }} USD</div>
          </div>
        </div>
      </div>

      <div v-if="invoices.length > 0" class="bg-white rounded-lg shadow p-6 mt-6">
        <h2 class="text-xl font-semibold mb-4">Invoices ({{ invoices.length }})</h2>
        <div class="space-y-2">
          <div v-for="invoice in invoices" :key="invoice.id" class="border p-3 rounded">
            <div class="font-medium">{{ invoice.invoice_number }}</div>
            <div class="text-sm text-gray-600">{{ invoice.total_amount }} USD</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import feathersClient from '../../api/feathers'

const loading = ref(false)
const testResults = ref<Array<{ success: boolean; message: string }>>([])
const rates = ref<any[]>([])
const invoices = ref<any[]>([])

const addTestResult = (success: boolean, message: string) => {
  testResults.value.push({ success, message })
}

const testCreateRate = async () => {
  loading.value = true
  try {
    const rateData = {
      opportunity_id: 1, // Test opportunity ID
      service_category: 'freight',
      rate_type: 'per_kg',
      rate_amount: 100,
      currency_id: 1, // USD
      effective_from: new Date().toISOString().split('T')[0],
      effective_to: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      warehouse_location: 'Test Warehouse',
      description: 'Test rate',
      is_active: true
    }

    const rate = await feathersClient.service('logistics-contract-rates').create(rateData)
    addTestResult(true, `Rate created successfully: ${rate.id}`)
    await testFetchRates()
  } catch (error: any) {
    addTestResult(false, `Failed to create rate: ${error.message}`)
    console.error('Error creating rate:', error)
  } finally {
    loading.value = false
  }
}

const testCreateInvoice = async () => {
  loading.value = true
  try {
    const invoiceData = {
      opportunity_id: 1, // Test opportunity ID
      invoice_number: `TEST-${Date.now()}`,
      invoice_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total_amount: 1000,
      currency_id: 1, // USD
      status: 'draft',
      notes: 'Test invoice'
    }

    const invoice = await feathersClient.service('logistics-contract-invoices').create(invoiceData)
    addTestResult(true, `Invoice created successfully: ${invoice.id}`)
    await testFetchInvoices()
  } catch (error: any) {
    addTestResult(false, `Failed to create invoice: ${error.message}`)
    console.error('Error creating invoice:', error)
  } finally {
    loading.value = false
  }
}

const testFetchRates = async () => {
  loading.value = true
  try {
    const response = await feathersClient.service('logistics-contract-rates').find({
      query: { $limit: 10 }
    })
    rates.value = response.data || []
    addTestResult(true, `Fetched ${rates.value.length} rates`)
  } catch (error: any) {
    addTestResult(false, `Failed to fetch rates: ${error.message}`)
    console.error('Error fetching rates:', error)
  } finally {
    loading.value = false
  }
}

const testFetchInvoices = async () => {
  loading.value = true
  try {
    const response = await feathersClient.service('logistics-contract-invoices').find({
      query: { $limit: 10 }
    })
    invoices.value = response.data || []
    addTestResult(true, `Fetched ${invoices.value.length} invoices`)
  } catch (error: any) {
    addTestResult(false, `Failed to fetch invoices: ${error.message}`)
    console.error('Error fetching invoices:', error)
  } finally {
    loading.value = false
  }
}
</script>

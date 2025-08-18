<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Bulk Import Rates
          </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">

          <!-- File Upload Section -->
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                File Upload
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Upload CSV File</label>
                  <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <input
                      ref="fileInput"
                      type="file"
                      accept=".csv"
                      @change="handleFileSelect"
                      class="hidden"
                    />
                    <div v-if="!selectedFile" @click="$refs.fileInput.click()" class="cursor-pointer">
                      <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Click to upload a CSV file</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">CSV format only</p>
                    </div>
                    <div v-else class="text-left">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedFile.name }}</p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(selectedFile.size) }}</p>
                        </div>
                        <button @click="removeFile" class="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- CSV Template Section -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  CSV Template
                </h3>
              </div>
              <div class="p-6">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">CSV Template</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Your CSV should have the following columns:</p>
                  <div class="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    opportunity_id,service_category,rate_type,rate_amount,currency,effective_from,effective_to,warehouse_location,description,is_active
                  </div>
                  <button @click="downloadTemplate" class="mt-3 inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Template
                  </button>
                </div>
              </div>
            </div>

            <!-- Preview Section -->
            <div v-if="previewData.length > 0" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Data Preview
                </h3>
              </div>
              <div class="p-6">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Preview ({{ previewData.length }} rows)</h4>
                  <div class="max-h-40 overflow-y-auto">
                    <table class="min-w-full text-xs">
                      <thead class="bg-gray-100 dark:bg-gray-600">
                        <tr>
                          <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Opportunity</th>
                          <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Category</th>
                          <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Type</th>
                          <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Amount</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white dark:bg-gray-800">
                        <tr v-for="(row, index) in previewData.slice(0, 5)" :key="index" class="border-b border-gray-200 dark:border-gray-600">
                          <td class="px-3 py-2 text-gray-900 dark:text-white">{{ row.opportunity_id }}</td>
                          <td class="px-3 py-2 text-gray-900 dark:text-white">{{ row.service_category }}</td>
                          <td class="px-3 py-2 text-gray-900 dark:text-white">{{ row.rate_type }}</td>
                          <td class="px-3 py-2 text-gray-900 dark:text-white">{{ row.rate_amount }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p v-if="previewData.length > 5" class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                      Showing first 5 rows of {{ previewData.length }} total
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Display -->
            <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-red-800 dark:text-red-200">{{ error }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 px-6 pb-6">
          <button
            type="button"
            @click="closeModal"
            class="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="importData"
            :disabled="!selectedFile || loading"
            class="inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {{ loading ? 'Importing...' : 'Import Rates' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLogisticsContractRatesStore } from '../../store/logistics-contract-rates.store'

// Props
interface Props {
  show: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
  import: [data: any[]]
}>()

// Store
const ratesStore = useLogisticsContractRatesStore()

// Reactive data
const selectedFile = ref<File | null>(null)
const previewData = ref<any[]>([])
const loading = ref(false)
const error = ref('')

// Methods
const closeModal = () => {
  selectedFile.value = null
  previewData.value = []
  error.value = ''
  emit('close')
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      error.value = 'Please select a valid CSV file'
      return
    }
    
    selectedFile.value = file
    error.value = ''
    parseCSV(file)
  }
}

const parseCSV = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const csv = e.target?.result as string
      const lines = csv.split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim())
          const row: any = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ''
          })
          return row
        })
      
      previewData.value = data
    } catch (err) {
      error.value = 'Error parsing CSV file'
      console.error('CSV parsing error:', err)
    }
  }
  reader.readAsText(file)
}

const removeFile = () => {
  selectedFile.value = null
  previewData.value = []
  error.value = ''
}

const downloadTemplate = () => {
  const template = `opportunity_id,service_category,rate_type,rate_amount,currency,effective_from,effective_to,warehouse_location,description,is_active
1,freight,per_kg,100,USD,2024-01-01,2024-12-31,Main Warehouse,Freight rate for opportunity 1,true
1,warehousing,per_cbm,50,USD,2024-01-01,2024-12-31,Main Warehouse,Warehousing rate for opportunity 1,true`
  
  const blob = new Blob([template], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'logistics-rates-template.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

const importData = async () => {
  if (!selectedFile.value || previewData.value.length === 0) return
  
  loading.value = true
  error.value = ''
  
  try {
    // Validate data
    const validatedData = previewData.value.map(row => ({
      opportunity_id: parseInt(row.opportunity_id) || 1,
      service_category: row.service_category || 'freight',
      rate_type: row.rate_type || 'per_kg',
      rate_amount: parseFloat(row.rate_amount) || 0,
                    currency_id: parseInt(row.currency_id) || 1, // Default to USD
      effective_from: row.effective_from || new Date().toISOString().split('T')[0],
      effective_to: row.effective_to || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      warehouse_location: row.warehouse_location || 'Main Warehouse',
      description: row.description || '',
      is_active: row.is_active === 'true' || row.is_active === '1'
    }))
    
    // Import using store
    await ratesStore.bulkCreateRates(validatedData)
    
    emit('import', validatedData)
    closeModal()
  } catch (err: any) {
    error.value = err.message || 'Failed to import rates'
    console.error('Import error:', err)
  } finally {
    loading.value = false
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

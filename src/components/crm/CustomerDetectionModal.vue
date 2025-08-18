<template>
  <div v-if="show" class="fixed top-0 left-0 right-0 z-[10001] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-2xl">
        <!-- Modal header -->
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-2xl">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
          <div class="relative flex items-center justify-between p-8">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Customer Detection</h3>
                <p class="text-blue-100 text-sm mt-1">We found potential matches for this customer</p>
              </div>
            </div>
            <button @click="$emit('close')" class="relative z-10 text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal body -->
        <div class="p-8 max-h-[70vh] overflow-y-auto">
          <!-- Detection Result Summary -->
          <div class="mb-8">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Detection Results</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ detectionResult.reason }}</p>
                </div>
              </div>
              
              <!-- Customer Info Preview -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Company:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ customerData.company_name }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Contact:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ customerData.contact_name }}</span>
                </div>
                <div v-if="customerData.contact_email">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ customerData.contact_email }}</span>
                </div>
                <div v-if="customerData.contact_phone">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ customerData.contact_phone }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Exact Match Found -->
          <div v-if="detectionResult.isExisting && detectionResult.matchType === 'exact'" class="mb-8">
            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-green-800 dark:text-green-200">Exact Match Found!</h4>
                  <p class="text-sm text-green-700 dark:text-green-300">We found an existing customer with matching information</p>
                </div>
              </div>
              
              <!-- Existing Customer Details -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                <h5 class="font-medium text-gray-900 dark:text-white mb-3">Existing Customer Details</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700 dark:text-gray-300">Company:</span>
                    <span class="ml-2 text-gray-900 dark:text-white">{{ detectionResult.existingCustomer?.name }}</span>
                  </div>
                  <div v-if="detectionResult.existingCustomer?.email">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                    <span class="ml-2 text-gray-900 dark:text-white">{{ detectionResult.existingCustomer.email }}</span>
                  </div>
                  <div v-if="detectionResult.existingCustomer?.phonenumber">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                    <span class="ml-2 text-gray-900 dark:text-white">{{ detectionResult.existingCustomer.phonenumber }}</span>
                  </div>
                  <div v-if="detectionResult.existingCustomer?.address">
                    <span class="font-medium text-gray-700 dark:text-gray-300">Address:</span>
                    <span class="ml-2 text-gray-900 dark:text-white">{{ detectionResult.existingCustomer.address }}</span>
                  </div>
                </div>
                
                <!-- Matching Fields -->
                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h6 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matching Fields:</h6>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="field in detectionResult.matchFields" :key="field" 
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {{ formatFieldName(field) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <button @click="useExistingCustomer" 
                        class="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Use Existing Customer
                </button>
                <button @click="createNewCustomer" 
                        class="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create New Customer
                </button>
              </div>
            </div>
          </div>

          <!-- Fuzzy Matches Found -->
          <div v-else-if="detectionResult.suggestions.length > 0" class="mb-8">
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Potential Matches Found</h4>
                  <p class="text-sm text-yellow-700 dark:text-yellow-300">We found similar customers. Please review and choose an option.</p>
                </div>
              </div>
              
              <!-- Suggestions List -->
              <div class="space-y-3">
                <div v-for="(suggestion, index) in detectionResult.suggestions" :key="suggestion.id" 
                     class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors cursor-pointer"
                     @click="selectSuggestion(suggestion)">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <h5 class="font-medium text-gray-900 dark:text-white">{{ suggestion.name }}</h5>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                        <div v-if="suggestion.email">
                          <span class="text-gray-600 dark:text-gray-400">Email:</span>
                          <span class="ml-2 text-gray-900 dark:text-white">{{ suggestion.email }}</span>
                        </div>
                        <div v-if="suggestion.phonenumber">
                          <span class="text-gray-600 dark:text-gray-400">Phone:</span>
                          <span class="ml-2 text-gray-900 dark:text-white">{{ suggestion.phonenumber }}</span>
                        </div>
                        <div v-if="suggestion.address" class="md:col-span-2">
                          <span class="text-gray-600 dark:text-gray-400">Address:</span>
                          <span class="ml-2 text-gray-900 dark:text-white">{{ suggestion.address }}</span>
                        </div>
                      </div>
                    </div>
                    <button class="ml-4 px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 border border-yellow-200 rounded-lg hover:bg-yellow-200 hover:border-yellow-300 transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="mt-6 flex flex-col sm:flex-row gap-3">
                <button @click="createNewCustomer" 
                        class="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create New Customer
                </button>
              </div>
            </div>
          </div>

          <!-- No Matches Found -->
          <div v-else class="mb-8">
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-200">New Customer</h4>
                  <p class="text-sm text-blue-700 dark:text-blue-300">No existing customers found. This appears to be a new customer.</p>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex justify-center">
                <button @click="createNewCustomer" 
                        class="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create New Customer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-end p-8 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-b-2xl">
          <button @click="$emit('close')" 
                  class="px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomerDetectionResult, CustomerDetectionService } from '../../services/crm/CustomerDetectionService'

interface Props {
  show: boolean
  customerData: any
  detectionResult: CustomerDetectionResult
}

interface Emits {
  (e: 'close'): void
  (e: 'use-existing', entityId: number, contactId?: number): void
  (e: 'create-new', entityId: number, contactId: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const customerDetectionService = new CustomerDetectionService()

const formatFieldName = (field: string): string => {
  const fieldMap: Record<string, string> = {
    company_name: 'Company Name',
    contact_email: 'Email',
    contact_phone: 'Phone'
  }
  return fieldMap[field] || field
}

const useExistingCustomer = async () => {
  console.log('useExistingCustomer called')
  console.log('detectionResult:', props.detectionResult)
  console.log('existingCustomer:', props.detectionResult.existingCustomer)
  
  if (props.detectionResult.existingCustomer) {
    // Directly emit the existing customer's ID without calling the service
    console.log('Emitting use-existing event with entity ID:', props.detectionResult.existingCustomer.id)
    emit('use-existing', props.detectionResult.existingCustomer.id)
  } else {
    console.error('No existing customer found in detection result')
  }
}

const createNewCustomer = async () => {
  console.log('createNewCustomer called')
  try {
    console.log('Calling createNewCustomer...')
    const result = await customerDetectionService.createNewCustomer(props.customerData)
    console.log('createNewCustomer result:', result)
    emit('create-new', result.entityId, result.contactId)
  } catch (error) {
    console.error('Error creating new customer:', error)
    // Handle error appropriately - maybe show a toast or error message
  }
}

const selectSuggestion = async (suggestion: any) => {
  console.log('selectSuggestion called with:', suggestion)
  // Directly emit the suggestion's ID without calling the service
  console.log('Emitting use-existing event with suggestion ID:', suggestion.id)
  emit('use-existing', suggestion.id)
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-4xl max-h-full">
      <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            {{ isEditing ? 'Edit Rate' : 'Create New Rate' }}
          </h3>
          <button @click="$emit('close')" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">

          <!-- Existing Rates Section -->
          <div v-if="selectedOpportunity" class="mb-8">
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  Existing Rates for {{ selectedOpportunity.title }}
                </h3>
              </div>
              <div class="p-6">
                <div v-if="loadingRates" class="flex items-center justify-center py-8">
                  <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-gray-600 dark:text-gray-400">Loading existing rates...</span>
                </div>
                
                <div v-else-if="existingRates.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <p class="text-lg font-medium">No rates found</p>
                  <p class="text-sm">This opportunity doesn't have any contract rates yet.</p>
                </div>
                
                <div v-else class="space-y-4">
                  <div v-for="rate in existingRates" :key="rate.id" class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                          <span class="font-semibold text-gray-900 dark:text-white">
                            {{ rate.service_category }}
                          </span>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {{ rate.rate_type }}
                          </span>
                          <span v-if="rate.is_active" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Active
                          </span>
                          <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            Inactive
                          </span>
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {{ formatCurrency(rate.rate_amount, rate.currency_id) }} - {{ rate.description || 'No description' }}
                        </div>
                        <div v-if="rate.effective_from || rate.effective_to" class="text-xs text-gray-500 dark:text-gray-400">
                          <span v-if="rate.effective_from">From: {{ formatDate(rate.effective_from) }}</span>
                          <span v-if="rate.effective_to" class="ml-2">To: {{ formatDate(rate.effective_to) }}</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <button 
                          @click="editExistingRate(rate)" 
                          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:ring-4 focus:ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30"
                        >
                          Edit
                        </button>
                        <button 
                          @click="deleteExistingRate(rate.id)" 
                          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:ring-4 focus:ring-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Basic Information Section -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Opportunity Selection or Display -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Opportunity <span class="text-red-500">*</span>
                    </label>
                    
                    <!-- Show selected opportunity details if provided -->
                    <div v-if="selectedOpportunity" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium text-gray-900 dark:text-white">{{ selectedOpportunity.title }}</p>
                          <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedOpportunity.entity?.name || 'No entity' }}</p>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                          ID: {{ selectedOpportunity.id }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Show dropdown if no selected opportunity -->
                    <select
                      v-else
                      v-model="form.opportunity_id"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      :class="{ 'border-red-500': errors.opportunity_id }"
                    >
                      <option value="">Select an opportunity</option>
                      <option
                        v-for="opportunity in opportunities"
                        :key="opportunity.id"
                        :value="opportunity.id"
                      >
                        {{ opportunity.title }} - {{ opportunity.entity?.name }}
                      </option>
                    </select>
                    <p v-if="errors.opportunity_id" class="mt-1 text-sm text-red-600">
                      {{ errors.opportunity_id }}
                    </p>
                  </div>

                  <!-- Service Category -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Category <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.service_category"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      :class="{ 'border-red-500': errors.service_category }"
                    >
                      <option value="">Select service category</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="transportation">Transportation</option>
                      <option value="freight">Freight</option>
                      <option value="handling">Handling</option>
                      <option value="storage">Storage</option>
                      <option value="customs">Customs</option>
                      <option value="insurance">Insurance</option>
                    </select>
                    <p v-if="errors.service_category" class="mt-1 text-sm text-red-600">
                      {{ errors.service_category }}
                    </p>
                  </div>

                  <!-- Rate Type -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rate Type <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.rate_type"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      :class="{ 'border-red-500': errors.rate_type }"
                    >
                      <option value="">Select rate type</option>
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
                    <p v-if="errors.rate_type" class="mt-1 text-sm text-red-600">
                      {{ errors.rate_type }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rate Details Section -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Rate Details
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rate Amount <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">
                          {{ currencies.find(c => c.id === form.currency_id)?.symbol || '$' }}
                        </span>
                      </div>
                      <input
                        v-model.number="form.rate_amount"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="pl-8 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        :class="{ 'border-red-500': errors.rate_amount }"
                        placeholder="0.00"
                      />
                    </div>
                    <p v-if="errors.rate_amount" class="mt-1 text-sm text-red-600">
                      {{ errors.rate_amount }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.currency_id"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      :class="{ 'border-red-500': errors.currency_id }"
                    >
                      <option value="">Select currency</option>
                      <option 
                        v-for="currency in currencies" 
                        :key="currency.id" 
                        :value="currency.id"
                      >
                        {{ currency.symbol }} - {{ currency.currency_name }}
                      </option>
                    </select>
                    <p v-if="errors.currency_id" class="mt-1 text-sm text-red-600">
                      {{ errors.currency_id }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Details Section -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Additional Details
                </h3>
              </div>
              <div class="p-6">
                <div class="space-y-6">
                  <!-- Volume Tiers -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Volume Tiers (Optional)
                    </label>
                    <div class="space-y-3">
                      <div
                        v-for="(tier, index) in form.volume_tiers"
                        :key="index"
                        class="flex space-x-2"
                      >
                        <input
                          v-model.number="tier.min_volume"
                          type="number"
                          step="0.01"
                          min="0"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Min Volume"
                        />
                        <input
                          v-model.number="tier.max_volume"
                          type="number"
                          step="0.01"
                          min="0"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Max Volume"
                        />
                        <input
                          v-model.number="tier.rate_amount"
                          type="number"
                          step="0.01"
                          min="0"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Rate Amount"
                        />
                        <button
                          type="button"
                          @click="removeVolumeTier(index)"
                          class="px-3 py-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        @click="addVolumeTier"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Volume Tier
                      </button>
                    </div>
                  </div>

                  <!-- Effective Dates -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Effective From
                      </label>
                      <input
                        v-model="form.effective_from"
                        type="date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Effective To
                      </label>
                      <input
                        v-model="form.effective_to"
                        type="date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <!-- Warehouse Location -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Warehouse Location
                    </label>
                    <input
                      v-model="form.warehouse_location"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter warehouse location"
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      v-model="form.description"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter rate description..."
                    ></textarea>
                  </div>

                  <!-- Status -->
                  <div>
                    <label class="flex items-center">
                      <input
                        v-model="form.is_active"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>



            <!-- Error Summary -->
            <div v-if="Object.keys(errors).length > 0" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Please fix the following errors:</h3>
                  <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                    <ul class="list-disc pl-5 space-y-1">
                      <li v-for="(error, field) in errors" :key="field">
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                @click="$emit('close')"
                class="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                {{ isEditing ? 'Update Rate' : 'Create Rate' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/store/auth.store'
import { useLogisticsContractRatesStore } from '@/store/logistics-contract-rates.store'

// Props
const props = defineProps<{
  rate?: any
  opportunities: any[]
  currencies: any[]
  selectedOpportunity?: any // New prop for pre-selected opportunity
}>()

// Emits
const emit = defineEmits<{
  close: []
  save: [data: any]
}>()

// Stores
const authStore = useAuthStore()
const logisticsContractRatesStore = useLogisticsContractRatesStore()

// Reactive data
const loading = ref(false)
const errors = reactive({})
const existingRates = ref([])
const loadingRates = ref(false)

// Form data
const form = reactive({
  opportunity_id: '',
  service_category: '',
  rate_type: '',
  rate_amount: 0,
  currency_id: 0, // Will be set to default currency
  volume_tiers: [],
  effective_from: '',
  effective_to: '',
  warehouse_location: '',
  description: '',
  is_active: true
})

// Methods
const fetchExistingRates = async (opportunityId: number) => {
  try {
    loadingRates.value = true
    await logisticsContractRatesStore.fetchRatesByOpportunity(opportunityId)
    existingRates.value = logisticsContractRatesStore.getRates
  } catch (err: any) {
    console.error('Error fetching existing rates:', err)
  } finally {
    loadingRates.value = false
  }
}

const formatCurrency = (amount: number, currencyId: number) => {
  const currency = props.currencies.find(c => c.id === currencyId)
  const symbol = currency?.symbol || '$'
  return `${symbol}${amount?.toLocaleString() || '0'}`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const editExistingRate = (rate: any) => {
  // Populate the form with the existing rate data
  Object.assign(form, {
    opportunity_id: rate.opportunity_id,
    service_category: rate.service_category,
    rate_type: rate.rate_type,
    rate_amount: rate.rate_amount,
    currency_id: rate.currency_id,
    volume_tiers: rate.volume_tiers ? JSON.parse(rate.volume_tiers) : [],
    effective_from: rate.effective_from,
    effective_to: rate.effective_to,
    warehouse_location: rate.warehouse_location,
    description: rate.description,
    is_active: rate.is_active
  })
  
  // Emit the rate for editing
  emit('save', { ...rate, isEditing: true })
}

const deleteExistingRate = async (rateId: number) => {
  if (!confirm('Are you sure you want to delete this rate?')) return
  
  try {
    await logisticsContractRatesStore.deleteRate(rateId)
    // Refresh the rates list
    if (selectedOpportunity.value) {
      await fetchExistingRates(selectedOpportunity.value.id)
    }
  } catch (err: any) {
    console.error('Error deleting rate:', err)
  }
}

// Computed properties
const isEditing = computed(() => !!props.rate)
const selectedOpportunity = computed(() => props.selectedOpportunity)

// Set default currency when currencies are loaded
watch(() => props.currencies, (newCurrencies) => {
  if (newCurrencies && newCurrencies.length > 0 && !form.currency_id) {
    const defaultCurrency = newCurrencies.find(c => c.is_default) || newCurrencies[0]
    form.currency_id = defaultCurrency.id
  }
}, { immediate: true })

// Set opportunity_id when selectedOpportunity is provided
watch(() => props.selectedOpportunity, (newOpportunity) => {
  if (newOpportunity && newOpportunity.id) {
    form.opportunity_id = newOpportunity.id
    // Fetch existing rates for this opportunity
    fetchExistingRates(newOpportunity.id)
  }
}, { immediate: true })

// Methods
const validateForm = () => {
  const newErrors: any = {}

  // Required fields
  if (!selectedOpportunity.value && !form.opportunity_id) {
    newErrors.opportunity_id = 'Opportunity is required'
  }

  if (!form.service_category) {
    newErrors.service_category = 'Service category is required'
  }

  if (!form.rate_type) {
    newErrors.rate_type = 'Rate type is required'
  }

  if (!form.rate_amount || form.rate_amount <= 0) {
    newErrors.rate_amount = 'Rate amount must be greater than 0'
  }

  if (!form.currency_id) {
    newErrors.currency_id = 'Currency is required'
  }

  // Validate volume tiers
  if (form.volume_tiers.length > 0) {
    for (let i = 0; i < form.volume_tiers.length; i++) {
      const tier = form.volume_tiers[i]
      if (tier.min_volume && tier.max_volume && tier.min_volume >= tier.max_volume) {
        newErrors[`volume_tier_${i}`] = 'Min volume must be less than max volume'
      }
      if (tier.rate_amount && tier.rate_amount <= 0) {
        newErrors[`volume_tier_${i}`] = 'Tier rate amount must be greater than 0'
      }
    }
  }

  // Validate effective dates
  if (form.effective_from && form.effective_to) {
    if (new Date(form.effective_from) >= new Date(form.effective_to)) {
      newErrors.effective_dates = 'Effective from date must be before effective to date'
    }
  }

  return newErrors
}

const handleSubmit = async () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  // Validate form
  const validationErrors = validateForm()
  Object.assign(errors, validationErrors)

  if (Object.keys(errors).length > 0) {
    return
  }

  loading.value = true

  try {
    // Prepare data for submission
    const submitData = {
      ...form,
      company_id: useAuthStore().user?.company_id || 1,
      volume_tiers: form.volume_tiers.length > 0 ? JSON.stringify(form.volume_tiers) : null
    }

    emit('save', submitData)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

const addVolumeTier = () => {
  form.volume_tiers.push({
    min_volume: null,
    max_volume: null,
    rate_amount: null
  })
}

const removeVolumeTier = (index: number) => {
  form.volume_tiers.splice(index, 1)
}

const initializeForm = () => {
  if (props.rate) {
    // Editing existing rate
    Object.assign(form, {
      opportunity_id: props.rate.opportunity_id,
      service_category: props.rate.service_category,
      rate_type: props.rate.rate_type,
      rate_amount: props.rate.rate_amount,
      currency_id: props.rate.currency_id,
      effective_from: props.rate.effective_from ? props.rate.effective_from.split('T')[0] : '',
      effective_to: props.rate.effective_to ? props.rate.effective_to.split('T')[0] : '',
      warehouse_location: props.rate.warehouse_location || '',
      description: props.rate.description || '',
      is_active: props.rate.is_active
    })

    // Parse volume tiers
    if (props.rate.volume_tiers) {
      try {
        form.volume_tiers = JSON.parse(props.rate.volume_tiers)
      } catch (error) {
        form.volume_tiers = []
      }
    }
  } else {
    // Creating new rate
    Object.assign(form, {
      opportunity_id: '',
      service_category: '',
      rate_type: '',
      rate_amount: 0,
      currency_id: 0, // Will be set by the watch
      volume_tiers: [],
      effective_from: '',
      effective_to: '',
      warehouse_location: '',
      description: '',
      is_active: true
    })
  }
}

// Lifecycle
onMounted(() => {
  initializeForm()
})

// Watch for rate changes
watch(() => props.rate, () => {
  initializeForm()
}, { immediate: true })
</script>

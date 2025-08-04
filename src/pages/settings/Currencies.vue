<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Currencies</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage system currencies and exchange rates</p>
        </div>
        <button @click="showAddModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Currency
        </button>
      </div>
    </div>

    <!-- Search and Filters Card -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      <!-- Card Header -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Currencies</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage system currencies</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ currenciesStore.pagination.total || 0 }} currencies
            </span>
          </div>
        </div>
      </div>
      
      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Currencies</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                @input="onSearchChange"
                type="text" 
                placeholder="Search by currency name or symbol..."
                :disabled="currenciesStore.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="currenciesStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <div class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              </div>
              <div v-else-if="searchQuery" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <button 
                  @click="clearFilters"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Clear search"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="searchQuery" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Searching for: "{{ searchQuery }}"
            </div>
          </div>
          
          <!-- Default Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Default Status</label>
            <select 
              v-model="selectedDefault" 
              @change="onDefaultFilterChange"
              :disabled="currenciesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Currencies</option>
              <option value="true">Default Only</option>
              <option value="false">Non-Default Only</option>
            </select>
          </div>
          
          <!-- Refresh Button -->
          <div class="flex items-end">
            <button 
              @click="loadCurrencies" 
              :disabled="currenciesStore.loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div v-if="currenciesStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex items-end justify-end">
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</label>
              <button
                @click="showAddModal = true"
                class="w-full text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Currency
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div v-if="searchQuery || selectedDefault" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ currenciesStore.pagination.total || 0 }} result{{ (currenciesStore.pagination.total || 0) !== 1 ? 's' : '' }}
              </span>
              <button 
                @click="clearFilters"
                class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Clear Filters
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">Search powered by</span>
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State with Table Skeleton Loaders -->
    <div v-if="currenciesStore.loading" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <!-- Table Header Skeleton -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            <div>
              <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
            </div>
          </div>
          <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <!-- Table Header Skeleton -->
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Table Row Skeletons -->
            <tr v-for="n in 5" :key="n" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <!-- Currency Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </td>
              
              <!-- Rates Column Skeleton -->
              <td class="px-6 py-4">
                <div class="space-y-2">
                  <div class="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div class="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </td>
              
              <!-- Default Status Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </td>
              
              <!-- Created Date Column Skeleton -->
              <td class="px-6 py-4">
                <div class="space-y-1">
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                  <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
              </td>
              
              <!-- Actions Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <div class="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
                  <div class="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Content when not loading -->
    <div v-else>
      <!-- Statistics Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Currencies</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ currenciesStore.pagination.total }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Default Currency</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ defaultCurrencyCount }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Currencies</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ activeCurrencyCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Exchange Rates</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ currenciesStore.currencies.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Currencies Display -->
      <div>
        <!-- Enhanced Empty State -->
        <div v-if="!currenciesStore.loading && (!currenciesStore.currencies || currenciesStore.currencies.length === 0)" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <div class="flex flex-col items-center justify-center py-16 px-6">
            <div class="relative">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              {{ searchQuery || selectedDefault ? 'No currencies found' : 'No currencies yet' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
              {{ searchQuery || selectedDefault ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by adding currencies to your system to manage exchange rates effectively.' }}
            </p>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                v-if="searchQuery || selectedDefault"
                @click="clearFilters"
                class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Clear Filters
              </button>
              <button 
                @click="showAddModal = true"
                class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Currency
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Table View -->
        <div v-else-if="currenciesStore.currencies && currenciesStore.currencies.length > 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <!-- Table Header with Summary -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Currencies</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ currenciesStore.pagination.total || 0 }} currency{{ (currenciesStore.pagination.total || 0) !== 1 ? 's' : '' }} found</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Currency
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      Exchange Rates
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Status
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Created Date
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                      </svg>
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="currency in currenciesStore.currencies" :key="currency.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <!-- Currency Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <span class="text-white font-semibold text-sm">{{ currency.symbol }}</span>
                      </div>
                      <div class="flex-1">
                        <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {{ currency.currency_name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                          </svg>
                          {{ currency.symbol }}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <!-- Exchange Rates Column -->
                  <td class="px-6 py-4">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-4 text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Buy:</span>
                        <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(currency.toGHS_buying) }}</span>
                      </div>
                      <div class="flex items-center space-x-4 text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Sell:</span>
                        <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(currency.toGHS_selling) }}</span>
                      </div>
                      <div class="flex items-center space-x-4 text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Mid:</span>
                        <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(currency.toGHS_midrate) }}</span>
                      </div>
                    </div>
                  </td>
                  
                  <!-- Status Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <span v-if="currency.is_default" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 shadow-sm">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Default
                      </span>
                      <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 shadow-sm">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Active
                      </span>
                    </div>
                  </td>
                  
                  <!-- Created Date Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="text-sm text-gray-900 dark:text-white">
                        <div class="font-medium">{{ formatDate(currency.date_created) }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                          {{ formatTime(currency.date_created) }}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <!-- Actions Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button @click="editCurrency(currency)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                      </button>
                      <button @click="deleteCurrency(currency.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Currency Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              {{ showEditModal ? 'Edit Currency' : 'Add Currency' }}
            </h3>
            <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <form @submit.prevent="saveCurrency">
              <!-- Currency Information Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    Currency Details
                  </h3>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter the currency information and exchange rates.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Currency Name -->
                  <div>
                    <label for="currency-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency Name</label>
                    <input 
                      id="currency-name"
                      v-model="currencyForm.currency_name" 
                      type="text" 
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                      placeholder="e.g. US Dollar"
                    >
                  </div>
                  
                  <!-- Symbol -->
                  <div>
                    <label for="currency-symbol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Symbol</label>
                    <input 
                      id="currency-symbol"
                      v-model="currencyForm.symbol" 
                      type="text" 
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                      placeholder="e.g. USD"
                    >
                  </div>
                </div>
                
                <!-- Exchange Rates Section -->
                <div class="space-y-4">
                  <h4 class="text-md font-semibold text-gray-900 dark:text-white">Exchange Rates (to GHS)</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Buying Rate -->
                    <div>
                      <label for="currency-buying" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Buying Rate</label>
                      <input 
                        id="currency-buying"
                        v-model.number="currencyForm.toGHS_buying" 
                        type="number" 
                        step="0.01"
                        required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                        placeholder="e.g. 12.50"
                      >
                    </div>
                    
                    <!-- Selling Rate -->
                    <div>
                      <label for="currency-selling" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selling Rate</label>
                      <input 
                        id="currency-selling"
                        v-model.number="currencyForm.toGHS_selling" 
                        type="number" 
                        step="0.01"
                        required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                        placeholder="e.g. 12.75"
                      >
                    </div>
                    
                    <!-- Mid Rate -->
                    <div>
                      <label for="currency-midrate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mid Rate</label>
                      <input 
                        id="currency-midrate"
                        v-model.number="currencyForm.toGHS_midrate" 
                        type="number" 
                        step="0.01"
                        required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                        placeholder="e.g. 12.625"
                      >
                    </div>
                  </div>
                </div>
                
                <!-- Default Currency -->
                <div class="flex items-center">
                  <input 
                    id="currency-default"
                    v-model="currencyForm.is_default" 
                    type="checkbox" 
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  >
                  <label for="currency-default" class="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Set as Default Currency
                  </label>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Only one currency can be default. Setting this currency as default will remove the default status from other currencies.
                </p>
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
              @click="saveCurrency" 
              :disabled="currenciesStore.loading"
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div v-if="currenciesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {{ showEditModal ? 'Update Currency' : 'Add Currency' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-md">
        <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Success!</h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg">{{ successMessage }}</p>
          </div>
          <div class="flex justify-center p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="showSuccessModal = false; successMessage = ''" 
              class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div v-if="showConfirmModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-md">
        <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Confirm Action</h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg">{{ confirmMessage }}</p>
          </div>
          <div class="flex justify-center space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="showConfirmModal = false; confirmMessage = ''" 
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete()" 
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCurrenciesStore } from '../../store/currencies.store'
import type { Currencies, CreateCurrencies, UpdateCurrencies } from '../../api/models/currencies.model'

const currenciesStore = useCurrenciesStore()

// Reactive data
const searchQuery = ref('')
const selectedDefault = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => Promise<void>) | null>(null)
const editingCurrency = ref<Currencies | null>(null)

const currencyForm = ref({
  currency_name: '',
  symbol: '',
  toGHS_buying: 0,
  toGHS_selling: 0,
  toGHS_midrate: 0,
  is_default: false
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS'
  }).format(amount)
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Computed properties
const defaultCurrencyCount = computed(() => {
  return currenciesStore.currencies.filter(c => c.is_default).length
})

const activeCurrencyCount = computed(() => {
  return currenciesStore.currencies.filter(c => !c.date_deleted).length
})

const loadCurrencies = async () => {
  try {
    let query: any = {}
    
    // Add search filter
    if (searchQuery.value) {
      query.$or = [
        { currency_name: { $ilike: `%${searchQuery.value}%` } },
        { symbol: { $ilike: `%${searchQuery.value}%` } }
      ]
    }
    
    // Add default filter
    if (selectedDefault.value !== '') {
      query.is_default = selectedDefault.value === 'true'
    }
    
    const params = Object.keys(query).length > 0 ? { query } : undefined
    await currenciesStore.fetchCurrencies(params)
  } catch (error) {
    console.error('Failed to load currencies:', error)
  }
}

const onSearchChange = () => {
  currenciesStore.setPage(1)
  loadCurrencies()
}

const onDefaultFilterChange = () => {
  currenciesStore.setPage(1)
  loadCurrencies()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedDefault.value = ''
  currenciesStore.setPage(1)
  loadCurrencies()
}

const editCurrency = (currency: Currencies) => {
  editingCurrency.value = currency
  currencyForm.value = {
    currency_name: currency.currency_name,
    symbol: currency.symbol,
    toGHS_buying: currency.toGHS_buying,
    toGHS_selling: currency.toGHS_selling,
    toGHS_midrate: currency.toGHS_midrate,
    is_default: currency.is_default
  }
  showEditModal.value = true
}

const saveCurrency = async () => {
  try {
    if (showEditModal.value && editingCurrency.value) {
      // Update existing currency
      await currenciesStore.updateCurrency(editingCurrency.value.id, {
        currency_name: currencyForm.value.currency_name,
        symbol: currencyForm.value.symbol,
        toGHS_buying: currencyForm.value.toGHS_buying,
        toGHS_selling: currencyForm.value.toGHS_selling,
        toGHS_midrate: currencyForm.value.toGHS_midrate,
        is_default: currencyForm.value.is_default
      })
      showSuccessModal.value = true
      successMessage.value = 'Currency updated successfully!'
    } else {
      // Create new currency
      await currenciesStore.createCurrency({
        currency_name: currencyForm.value.currency_name,
        symbol: currencyForm.value.symbol,
        toGHS_buying: currencyForm.value.toGHS_buying,
        toGHS_selling: currencyForm.value.toGHS_selling,
        toGHS_midrate: currencyForm.value.toGHS_midrate,
        is_default: currencyForm.value.is_default
      })
      showSuccessModal.value = true
      successMessage.value = 'Currency added successfully!'
    }
    
    closeModal()
    await loadCurrencies()
  } catch (error) {
    console.error('Failed to save currency:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to save currency. Please try again.'
  }
}

const deleteCurrency = async (id: number) => {
  confirmMessage.value = 'Are you sure you want to delete this currency? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await currenciesStore.deleteCurrency(id)
      showSuccessModal.value = true
      successMessage.value = 'Currency deleted successfully!'
      showConfirmModal.value = false
      await loadCurrencies()
    } catch (error) {
      console.error('Failed to delete currency:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete currency. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const confirmDelete = async () => {
  if (confirmAction.value) {
    await confirmAction.value()
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingCurrency.value = null
  currencyForm.value = {
    currency_name: '',
    symbol: '',
    toGHS_buying: 0,
    toGHS_selling: 0,
    toGHS_midrate: 0,
    is_default: false
  }
  currenciesStore.clearError()
}

onMounted(async () => {
  await loadCurrencies()
})
</script>

<style scoped>
/* Add your styles here */
</style> 
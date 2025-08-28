<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Logistics Contract Rates</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage and configure rates for logistics contracts and opportunities</p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="showBulkImportModal = true"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border border-purple-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Bulk Import
          </button>
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Rate
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Rates -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rates</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ statistics.total_rates || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Rates -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Rates</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ statistics.active_rates || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Average Rate -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center border border-yellow-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rate</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(statistics.average_rate || 0) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Categories -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center border border-purple-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ statistics.categories || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters Card -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      <!-- Card Header -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Rates</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage contract rates</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ pagination.total || 0 }} rates
            </span>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Rates</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="filters.search"
                @input="onSearchChange"
                type="text"
                placeholder="Search functionality coming soon..."
                disabled
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <div class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              </div>
              <div v-else-if="filters.search" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
          </div>

          <!-- Service Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Category</label>
            <select
              v-model="filters.service_category"
              @change="onCategoryFilterChange"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Categories</option>
              <option value="warehousing">Warehousing</option>
              <option value="transportation">Transportation</option>
              <option value="freight">Freight</option>
              <option value="handling">Handling</option>
              <option value="storage">Storage</option>
              <option value="customs">Customs</option>
              <option value="insurance">Insurance</option>
            </select>
          </div>

          <!-- Rate Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rate Type</label>
            <select
              v-model="filters.rate_type"
              @change="onRateTypeFilterChange"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Types</option>
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
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</label>
            <select
              v-model="filters.is_active"
              @change="onStatusFilterChange"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <!-- Refresh Button -->
          <div class="flex items-end">
            <button
              @click="loadRates"
              :disabled="loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-blue-500"
            >
              <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Filter Summary -->
        <div v-if="filters.search || filters.service_category || filters.rate_type || filters.is_active" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ pagination.total || 0 }} result{{ (pagination.total || 0) !== 1 ? 's' : '' }}
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
    <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Table Row Skeletons -->
            <tr v-for="n in 5" :key="n" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <!-- Service Category Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </td>

              <!-- Rate Type Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </td>

              <!-- Rate Amount Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
              </td>

              <!-- Status Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
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
      <!-- Enhanced Empty State -->
      <div v-if="!loading && (!rates || rates.length === 0)" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex flex-col items-center justify-center py-16 px-6">
          <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-violet-500 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            {{ filters.search || filters.service_category || filters.rate_type || filters.is_active ? 'No rates found' : 'No rates yet' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
            {{ filters.search || filters.service_category || filters.rate_type || filters.is_active ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by creating your first contract rate.' }}
          </p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              v-if="filters.search || filters.service_category || filters.rate_type || filters.is_active"
              @click="clearFilters"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear Filters
            </button>
            <button
              @click="showCreateModal = true"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 border border-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Rate
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Table View -->
      <div v-else-if="rates && rates.length > 0" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Category
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="rate in rates" :key="rate.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-blue-800">
                          {{ getServiceCategoryIcon(rate.service_category) }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ formatServiceCategory(rate.service_category) }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ rate.opportunity?.title || 'N/A' }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ formatRateType(rate.rate_type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatCurrency(rate.rate_amount, rate.currency_id) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ currencies.find(c => c.id === rate.currency_id)?.currency_name || 'USD' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      rate.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ rate.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(rate.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="viewInvoices(rate)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800 transition-all duration-200"
                      title="View Related Invoices"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View
                    </button>
                    <button
                      @click="editRate(rate)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      @click="toggleRateStatus(rate)"
                      :class="[
                        'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg transition-all duration-200',
                        rate.is_active
                          ? 'text-red-700 bg-red-100 border-red-200 hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800'
                          : 'text-green-700 bg-green-100 border-green-200 hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800'
                      ]"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {{ rate.is_active ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button
                      @click="deleteRate(rate)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200"
                    >
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

        <!-- Pagination Controls -->
        <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pb-6">
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
            <select 
              v-model="pagination.limit" 
              @change="onLimitChange"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              of {{ pagination.total || 0 }} entries
            </span>
          </div>
          
          <div class="flex items-center space-x-2">
            <button 
              @click="previousPage" 
              :disabled="pagination.page <= 1 || loading"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Previous
            </button>
            
            <div class="flex space-x-1">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                :disabled="loading"
                :class="[
                  'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                  page === pagination.page
                    ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="nextPage" 
              :disabled="pagination.page >= totalPages || loading"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Rate Modal -->
    <RateModal
      v-if="showCreateModal || showEditModal"
      :rate="editingRate"
      :opportunities="opportunities"
      :currencies="currencies"
      @close="closeModal"
      @save="saveRate"
    />

    <!-- Bulk Import Modal -->
    <BulkImportModal
      v-if="showBulkImportModal"
      @close="showBulkImportModal = false"
      @import="handleBulkImport"
    />

    <!-- Generate Invoice Modal -->
    <GenerateInvoiceModal
      :show="showGenerateModal"
      @close="closeGenerateModal"
      @invoice-generated="onInvoiceGenerated"
    />

    <!-- Invoice Connection Modal -->
    <div v-if="showInvoiceConnection" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeInvoiceConnection"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Invoices for Rate: {{ selectedRate?.service_category }} - {{ selectedRate?.rate_type }}
              </h3>
              <button @click="closeInvoiceConnection" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <RateInvoiceConnection
              v-if="selectedRate"
              :rate-id="selectedRate.id"
              :opportunity-id="selectedRate.opportunity_id"
              @generate-invoice="onGenerateInvoice"
              @view-invoice="onViewInvoice"
              @record-payment="onRecordPayment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.store'
import { useLogisticsContractRatesStore } from '@/store/logistics-contract-rates.store'
import { useOpportunitiesStore } from '@/store/opportunities.store'
import { useCurrenciesStore } from '@/store/currencies.store'
import RateModal from '@/components/crm/RateModal.vue'
import BulkImportModal from '@/components/crm/BulkImportModal.vue'
import GenerateInvoiceModal from '@/components/crm/GenerateInvoiceModal.vue'
import RateInvoiceConnection from '@/components/crm/RateInvoiceConnection.vue'
import { formatDate } from '@/utils/formatters'

// Utility function for currency formatting
const formatCurrency = (amount: number, currencyId: number = 1) => {
  const currency = currencies.value.find(c => c.id === currencyId)
  if (!currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  // Use the currency symbol for display since we don't have ISO codes
  return `${currency.symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

// Store instances
const authStore = useAuthStore()
const ratesStore = useLogisticsContractRatesStore()
const opportunitiesStore = useOpportunitiesStore()
const currenciesStore = useCurrenciesStore()

// Router
const router = useRouter()

// Reactive data
const loading = ref(false)
const error = ref('')
const rates = ref([])
const opportunities = ref([])
const currencies = ref([])
const selectedRates = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showBulkImportModal = ref(false)
const showGenerateModal = ref(false)
const showInvoiceConnection = ref(false)
const editingRate = ref(null)
const selectedRate = ref(null)
const isSearchDebouncing = ref(false)

// Statistics
const statistics = reactive({
  total_rates: 0,
  active_rates: 0,
  average_rate: 0,
  categories: 0
})

// Filters
const filters = reactive({
  search: '',
  service_category: '',
  rate_type: '',
  is_active: ''
})

// Pagination
const pagination = reactive({
  page: 1,
  limit: 20,
  total: 0,
  pages: 0,
  start: 0,
  end: 0
})

// Computed properties
const selectAll = computed({
  get: () => selectedRates.value.length === rates.value.length && rates.value.length > 0,
  set: (value) => {
    if (value) {
      selectedRates.value = rates.value.map(rate => rate.id)
    } else {
      selectedRates.value = []
    }
  }
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, pagination.page - 2)
  const end = Math.min(pagination.pages, pagination.page + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const totalPages = computed(() => {
  return Math.ceil(pagination.total / pagination.limit)
})

// Methods
const loadRates = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const query = {
      $skip: (pagination.page - 1) * pagination.limit,
      $limit: pagination.limit,
      $sort: { created_at: -1 }
    }

    // Add filters
    if (filters.service_category) {
      query.service_category = filters.service_category
    }
    if (filters.rate_type) {
      query.rate_type = filters.rate_type
    }
    if (filters.is_active !== '') {
      query.is_active = filters.is_active === 'true'
    }

    console.log('Sending query to backend:', query)
    await ratesStore.fetchRates({ query })
    rates.value = ratesStore.getRates
    pagination.total = ratesStore.getPagination.total
    pagination.pages = Math.ceil(ratesStore.getPagination.total / pagination.limit)
    pagination.start = (pagination.page - 1) * pagination.limit + 1
    pagination.end = Math.min(pagination.page * pagination.limit, ratesStore.getPagination.total)
    
    // Load statistics after rates are loaded
    await loadStatistics()
  } catch (err) {
    error.value = err.message || 'Failed to load rates'
  } finally {
    loading.value = false
  }
}

const loadOpportunities = async () => {
  try {
    await opportunitiesStore.fetchOpportunities({ 
      query: { 
        $limit: 1000,
        $sort: { date_created: -1 } // Most recent first
      } 
    })
    opportunities.value = opportunitiesStore.getOpportunities
  } catch (err) {
    console.error('Failed to load opportunities:', err)
  }
}

const loadCurrencies = async () => {
  try {
    await currenciesStore.fetchCurrencies({ query: { $limit: 1000 } })
    currencies.value = currenciesStore.getCurrencies
  } catch (err) {
    console.error('Failed to load currencies:', err)
  }
}

// Filter methods
const onSearchChange = () => {
  // Search functionality is currently disabled
  // TODO: Implement search when backend supports it
}

const onCategoryFilterChange = () => {
  pagination.page = 1
  loadRates()
  loadStatistics()
}

const onRateTypeFilterChange = () => {
  pagination.page = 1
  loadRates()
  loadStatistics()
}

const onStatusFilterChange = () => {
  pagination.page = 1
  loadRates()
  loadStatistics()
}

const applyFilters = () => {
  pagination.page = 1
  loadRates()
  loadStatistics()
}

const clearFilters = () => {
  Object.assign(filters, {
    search: '',
    service_category: '',
    rate_type: '',
    is_active: ''
  })
  isSearchDebouncing.value = false
  applyFilters()
}

const previousPage = () => {
  if (pagination.page > 1) {
    pagination.page--
    loadRates()
  }
}

const nextPage = () => {
  if (pagination.page < pagination.pages) {
    pagination.page++
    loadRates()
  }
}

const goToPage = (page: number) => {
  pagination.page = page
  loadRates()
}

const onLimitChange = () => {
  pagination.page = 1
  loadRates()
}

const loadStatistics = async () => {
  try {
    // Calculate statistics from current rates data
    const totalRates = rates.value.length
    const activeRates = rates.value.filter(rate => rate.is_active).length
    const averageRate = totalRates > 0 
      ? rates.value.reduce((sum, rate) => sum + (rate.rate_amount || 0), 0) / totalRates 
      : 0
    const categories = new Set(rates.value.map(rate => rate.service_category)).size

    Object.assign(statistics, {
      total_rates: totalRates,
      active_rates: activeRates,
      average_rate: averageRate,
      categories: categories
    })
  } catch (err) {
    console.error('Failed to load statistics:', err)
  }
}

const editRate = (rate: any) => {
  editingRate.value = { ...rate }
  showEditModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingRate.value = null
}

const saveRate = async (rateData: any) => {
  try {
    if (editingRate.value) {
      await ratesStore.updateRate(editingRate.value.id, rateData)
    } else {
      await ratesStore.createRate(rateData)
    }
    closeModal()
    loadRates()
  } catch (err) {
    console.error('Failed to save rate:', err)
  }
}

const toggleRateStatus = async (rate: any) => {
  try {
    await ratesStore.toggleRateStatus(rate.id)
    loadRates()
  } catch (err) {
    console.error('Failed to toggle rate status:', err)
  }
}

const deleteRate = async (rate: any) => {
  if (confirm('Are you sure you want to delete this rate?')) {
    try {
      await ratesStore.deleteRate(rate.id)
      loadRates()
    } catch (err) {
      console.error('Failed to delete rate:', err)
    }
  }
}

const handleBulkImport = async (data: any) => {
  try {
    await ratesStore.bulkCreateRates(data)
    showBulkImportModal.value = false
    loadRates()
  } catch (err) {
    console.error('Failed to import rates:', err)
  }
}

// Invoice connection methods
const viewInvoices = (rate: any) => {
  selectedRate.value = rate
  showInvoiceConnection.value = true
}

const closeInvoiceConnection = () => {
  showInvoiceConnection.value = false
  selectedRate.value = null
}

const onGenerateInvoice = (rateId: number) => {
  showGenerateModal.value = true
  closeInvoiceConnection()
}

const closeGenerateModal = () => {
  showGenerateModal.value = false
}

const onInvoiceGenerated = (invoice: any) => {
  closeGenerateModal()
  // Optionally refresh the rates or show a success message
  console.log('Invoice generated:', invoice)
}

const onViewInvoice = (invoice: any) => {
  // Navigate to invoice detail page or open invoice modal
  router.push(`/crm/invoices/${invoice.id}`)
}

const onRecordPayment = (invoice: any) => {
  // Navigate to payment page or open payment modal
  router.push(`/crm/invoices/${invoice.id}/payment`)
}

// Utility methods
const getServiceCategoryIcon = (category: string) => {
  const icons = {
    warehousing: 'W',
    transportation: 'T',
    freight: 'F',
    handling: 'H',
    storage: 'S',
    customs: 'C',
    insurance: 'I'
  }
  return icons[category] || '?'
}

const formatServiceCategory = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

const formatRateType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Lifecycle
onMounted(() => {
  loadRates()
  loadOpportunities()
  loadCurrencies()
})

// Watch for filter changes
watch(filters, () => {
  // Debounce filter changes
  clearTimeout((window as any).filterTimeout)
  ;(window as any).filterTimeout = setTimeout(() => {
    applyFilters()
  }, 300)
}, { deep: true })
</script>

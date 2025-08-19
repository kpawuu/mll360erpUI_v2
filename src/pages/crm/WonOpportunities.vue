<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Won Opportunities</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">View all successfully closed opportunities with their contract details</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            {{ filteredOpportunities.length }} won
          </span>
        </div>
      </div>
    </div>

    <!-- Search and Filters Card -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      <!-- Card Header -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Won Opportunities</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage successfully closed deals</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {{ filteredOpportunities.length }} opportunities
            </span>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Opportunities</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search by title, company, or contact..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 transition-all duration-200"
              >
              <div v-if="filters.search" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <button
                  @click="filters.search = ''"
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

          <!-- Service Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Service Type</label>
            <select v-model="filters.serviceType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 transition-all duration-200">
              <option value="">All Types</option>
              <option value="freight">Freight</option>
              <option value="warehousing">Warehousing</option>
              <option value="transportation">Transportation</option>
              <option value="integrated">Integrated</option>
            </select>
          </div>
          
          <!-- Contract Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Contract Status</label>
            <select v-model="filters.contractStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 transition-all duration-200">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>

          <!-- Refresh Button -->
          <div class="flex items-end">
            <button
              @click="fetchWonOpportunities"
              :disabled="loading"
              class="w-full text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-green-500"
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
        <div v-if="filters.search || filters.serviceType || filters.contractStatus" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ filteredOpportunities.length }} result{{ filteredOpportunities.length !== 1 ? 's' : '' }}
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
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div class="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State with Table Skeleton Loaders -->
    <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Table Header Skeleton -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
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
              <!-- Opportunity Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </td>

              <!-- Company Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
              </td>

              <!-- Service Type Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </td>

              <!-- Amount Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
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
      <div v-if="!loading && filteredOpportunities.length === 0" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex flex-col items-center justify-center py-16 px-6">
          <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            {{ filters.search || filters.serviceType || filters.contractStatus ? 'No won opportunities found' : 'No won opportunities yet' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
            {{ filters.search || filters.serviceType || filters.contractStatus ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by marking some opportunities as won to see them here.' }}
          </p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              v-if="filters.search || filters.serviceType || filters.contractStatus"
              @click="clearFilters"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear Filters
            </button>
            <button
              @click="router.push('/crm/opportunities')"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 border border-green-500 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              View Opportunities
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Table View -->
      <div v-else-if="filteredOpportunities.length > 0" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Table Header with Summary -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Won Opportunities</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ filteredOpportunities.length }} opportunity{{ filteredOpportunities.length !== 1 ? 's' : '' }} found</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                {{ filteredOpportunities.length }} won
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
                    <svg class="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Opportunity
                  </div>
                </th>
                <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Company
                  </div>
                </th>
                <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Service Type
                  </div>
                </th>
                <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    Amount
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
              <tr v-for="opportunity in filteredOpportunities" :key="opportunity.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                <!-- Opportunity Column -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 border border-green-400">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {{ opportunity.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        Won {{ formatDate((opportunity as any).won_date || opportunity.date_created) }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Company Column -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    <div class="font-medium">{{ opportunity.company_name }}</div>
                    <div v-if="opportunity.contact_name" class="text-xs text-gray-500 dark:text-gray-400">
                      {{ opportunity.contact_name }}
                    </div>
                  </div>
                </td>

                <!-- Service Type Column -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200">
                      {{ (opportunity as any).logistics_service_type || opportunity.service_type || 'N/A' }}
                    </span>
                  </div>
                </td>

                <!-- Amount Column -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                                      <div class="font-medium">{{ formatCurrency((opportunity as any).actual_amount || opportunity.amount, opportunity.currency_id || 1) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate((opportunity as any).won_date || opportunity.date_created) }}
                  </div>
                  </div>
                </td>

                <!-- Actions Column -->
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button @click="viewOpportunityDetails(opportunity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      View
                    </button>
                    <button @click="editOpportunity(opportunity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button v-if="(opportunity as any).logistics_service_type || opportunity.service_type" @click="viewContract(opportunity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-800 transition-all duration-200">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Contract
                    </button>
                    <button @click="viewInvoice(opportunity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800 transition-all duration-200">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Invoice
                    </button>
                    <button @click="openContractRatesModal(opportunity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-200">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Rates
                    </button>
                    <button @click="openContractInvoicesModal(opportunity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:border-orange-300 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-800 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/30 transition-all duration-200">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Contract Invoices
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.total > pagination.limit" class="mt-6 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="changePage(pagination.currentPage - 1)"
          :disabled="pagination.currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <span class="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
          Page {{ pagination.currentPage }} of {{ Math.ceil(pagination.total / pagination.limit) }}
        </span>
        
        <button
          @click="changePage(pagination.currentPage + 1)"
          :disabled="pagination.currentPage >= Math.ceil(pagination.total / pagination.limit)"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>

    <!-- View Opportunity Modal -->
    <div v-if="showViewModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-4xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              View Opportunity Details
            </h3>
            <button @click="showViewModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto" v-if="viewingOpportunity">
            <!-- Header with key info -->
            <div class="mb-8">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ viewingOpportunity.title }}</h2>
                  <div class="flex items-center space-x-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Won Opportunity
                    </span>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {{ (viewingOpportunity as any).logistics_service_type || viewingOpportunity.service_type }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ formatCurrency((viewingOpportunity as any).actual_amount || viewingOpportunity.amount, viewingOpportunity.currency_id || 1) }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Opportunity Value</div>
                </div>
              </div>
            </div>

            <!-- Main content grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left column -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Contact & Company Info -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Contact & Company
                    </h3>
                  </div>
                  <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Contact Info -->
                      <div class="space-y-4">
                        <div>
                          <div class="flex items-center mb-2">
                            <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Information</span>
                          </div>
                          <div class="ml-6 space-y-3">
                            <div>
                              <div class="text-sm text-gray-500 dark:text-gray-400">Name</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.contact_name }}</div>
                            </div>
                            <div v-if="viewingOpportunity.contact_email">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Email</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.contact_email }}</div>
                            </div>
                            <div v-if="viewingOpportunity.contact_phone">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.contact_phone }}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Company Info -->
                      <div class="space-y-4">
                        <div>
                          <div class="flex items-center mb-2">
                            <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {{ (viewingOpportunity as any).entity ? 'Client Entity' : 'Company Information' }}
                            </span>
                          </div>
                          <div class="ml-6 space-y-3">
                            <!-- Entity Information (if available) -->
                            <div v-if="(viewingOpportunity as any).entity">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Entity Name</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ (viewingOpportunity as any).entity.name }}</div>
                            </div>
                            <div v-if="(viewingOpportunity as any).entity?.address">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Entity Address</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ (viewingOpportunity as any).entity.address }}</div>
                            </div>
                            <div v-if="(viewingOpportunity as any).entity?.email">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Entity Email</div>
                              <div class="font-medium text-blue-600 dark:text-blue-400">
                                <a :href="`mailto:${(viewingOpportunity as any).entity.email}`" class="hover:underline">{{ (viewingOpportunity as any).entity.email }}</a>
                              </div>
                            </div>
                            <div v-if="(viewingOpportunity as any).entity?.phonenumber">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Entity Phone</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ (viewingOpportunity as any).entity.phonenumber }}</div>
                            </div>
                            <div v-if="(viewingOpportunity as any).entity?.group">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Entity Group</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ (viewingOpportunity as any).entity.group.group_name }}</div>
                            </div>
                            
                            <!-- Direct Company Information (fallback or additional) -->
                            <div v-if="!(viewingOpportunity as any).entity || viewingOpportunity.company_name !== (viewingOpportunity as any).entity?.name">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Company Name</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.company_name }}</div>
                            </div>
                            <div v-if="viewingOpportunity.company_website && (!(viewingOpportunity as any).entity || viewingOpportunity.company_website !== (viewingOpportunity as any).entity?.email)">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Website</div>
                              <div class="font-medium text-blue-600 dark:text-blue-400">
                                <a :href="viewingOpportunity.company_website" target="_blank" class="hover:underline">{{ viewingOpportunity.company_website }}</a>
                              </div>
                            </div>
                            <div v-if="viewingOpportunity.company_address && (!(viewingOpportunity as any).entity || viewingOpportunity.company_address !== (viewingOpportunity as any).entity?.address)">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Address</div>
                              <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.company_address }}</div>
                            </div>
                            
                            <!-- Entity ID for reference -->
                            <div v-if="(viewingOpportunity as any).entity_id">
                              <div class="text-sm text-gray-500 dark:text-gray-400">Entity ID</div>
                              <div class="font-medium text-gray-900 dark:text-white">#{{ (viewingOpportunity as any).entity_id }}</div>
                            </div>
                            
                            <!-- Entity Contact Persons (if available) -->
                            <div v-if="(viewingOpportunity as any).entity?.contact_persons && (viewingOpportunity as any).entity.contact_persons.length > 0">
                              <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Contact Persons</div>
                              <div class="space-y-2">
                                <div v-for="contactPerson in (viewingOpportunity as any).entity.contact_persons" :key="contactPerson.id" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                  <div class="font-medium text-gray-900 dark:text-white">{{ contactPerson.first_name }} {{ contactPerson.last_name }}</div>
                                  <div v-if="contactPerson.job_title" class="text-sm text-gray-600 dark:text-gray-400">{{ contactPerson.job_title }}</div>
                                  <div v-if="contactPerson.email_address" class="text-sm text-blue-600 dark:text-blue-400">
                                    <a :href="`mailto:${contactPerson.email_address}`" class="hover:underline">{{ contactPerson.email_address }}</a>
                                  </div>
                                  <div v-if="contactPerson.phone_number" class="text-sm text-gray-600 dark:text-gray-400">{{ contactPerson.phone_number }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Service Details -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Service Details
                    </h3>
                  </div>
                  <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Service Type</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ (viewingOpportunity as any).logistics_service_type || viewingOpportunity.service_type }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Origin</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.origin }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Destination</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.destination }}</div>
                      </div>
                      <div class="md:col-span-2">
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Cargo Description</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.cargo_description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right column -->
              <div class="space-y-6">
                <!-- Financial Information -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Financial Details
                    </h3>
                  </div>
                  <div class="p-6 space-y-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Opportunity Value</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingOpportunity as any).actual_amount || viewingOpportunity.amount, viewingOpportunity.currency_id || 1) }}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Probability</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.probability }}%</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Close Date</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatDate(viewingOpportunity.expected_close_date) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Timeline -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Timeline
                    </h3>
                  </div>
                  <div class="p-6 space-y-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Created</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatDate(viewingOpportunity.date_created) }}</div>
                    </div>
                    <div v-if="(viewingOpportunity as any).won_date">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Won Date</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatDate((viewingOpportunity as any).won_date) }}</div>
                    </div>
                    <div v-if="viewingOpportunity.date_updated">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatDate(viewingOpportunity.date_updated) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Quick Actions
                    </h3>
                  </div>
                  <div class="p-6 space-y-3">
                    <button 
                      @click="editOpportunity(viewingOpportunity); showViewModal = false" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit Opportunity
                    </button>
                    <button 
                      v-if="(viewingOpportunity as any).logistics_service_type" 
                      @click="viewContract(viewingOpportunity); showViewModal = false" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Contract
                    </button>
                    <button 
                      @click="viewInvoice(viewingOpportunity); showViewModal = false" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
            <button 
              @click="showViewModal = false" 
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="showViewModal = false" 
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Opportunity Modal -->
    <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-4xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit Opportunity
            </h3>
            <button @click="showEditModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <form @submit.prevent="saveEditedOpportunity" class="space-y-8">
              <!-- Basic Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Basic Information
                  </h3>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                      <input
                        v-model="editForm.title"
                        type="text"
                        required
                        placeholder="Enter opportunity title"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type *</label>
                      <select
                        v-model="editForm.logistics_service_type"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select Service Type</option>
                        <option value="freight">Freight</option>
                        <option value="warehousing">Warehousing</option>
                        <option value="transportation">Transportation</option>
                        <option value="integrated">Integrated</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Contact Information
                  </h3>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Name *</label>
                      <input
                        v-model="editForm.contact_name"
                        type="text"
                        required
                        placeholder="Enter contact name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                      <input
                        v-model="editForm.contact_email"
                        type="email"
                        placeholder="Enter contact email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Phone</label>
                      <input
                        v-model="editForm.contact_phone"
                        type="tel"
                        placeholder="Enter contact phone"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Position</label>
                      <input
                        v-model="editForm.contact_position"
                        type="text"
                        placeholder="Enter contact position"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Company Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Company Information
                  </h3>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                      <input
                        v-model="editForm.company_name"
                        type="text"
                        required
                        placeholder="Enter company name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Website</label>
                      <input
                        v-model="editForm.company_website"
                        type="url"
                        placeholder="Enter company website"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Address</label>
                      <textarea
                        v-model="editForm.company_address"
                        rows="3"
                        placeholder="Enter company address"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Service Details -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Service Details
                  </h3>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Origin *</label>
                      <input
                        v-model="editForm.origin"
                        type="text"
                        required
                        placeholder="Enter origin location"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination *</label>
                      <input
                        v-model="editForm.destination"
                        type="text"
                        required
                        placeholder="Enter destination location"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cargo Description *</label>
                      <textarea
                        v-model="editForm.cargo_description"
                        rows="3"
                        required
                        placeholder="Describe the cargo or service requirements"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Financial Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    Financial Information
                  </h3>
                </div>
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount *</label>
                      <input
                        v-model.number="editForm.amount"
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        placeholder="Enter amount"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Probability (%) *</label>
                      <input
                        v-model.number="editForm.probability"
                        type="number"
                        required
                        min="0"
                        max="100"
                        placeholder="Enter probability"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Close Date *</label>
                      <input
                        v-model="editForm.expected_close_date"
                        type="date"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Service Date *</label>
                      <input
                        v-model="editForm.expected_service_date"
                        type="date"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Information -->
              <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Additional Information
                  </h3>
                </div>
                <div class="p-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                      v-model="editForm.description"
                      rows="4"
                      placeholder="Enter opportunity description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
            <button 
              @click="showEditModal = false" 
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="saveEditedOpportunity" 
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contract Modal -->
    <div v-if="showContractModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-4xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Contract Details - {{ viewingContract?.title }}
            </h3>
            <button @click="showContractModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto" v-if="viewingContract">
            <!-- Header with key info -->
            <div class="mb-8">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ viewingContract.title }}</h2>
                  <div class="flex items-center space-x-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {{ (viewingContract as any).logistics_service_type || viewingContract.service_type }}
                    </span>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Active Contract
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ formatCurrency((viewingContract as any).actual_amount || viewingContract.amount, viewingContract.currency_id || 1) }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Contract Value</div>
                </div>
              </div>
            </div>

            <!-- Main content grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left column -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Contract Details -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Contract Information
                    </h3>
                  </div>
                  <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Service Type</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ (viewingContract as any).logistics_service_type || viewingContract.service_type }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Contract Basis</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ formatRateBasis((viewingContract as any).contract_basis || 'one-time') }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Base Rate</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingContract as any).base_rate || 0, (viewingContract as any).rate_currency_id || viewingContract.currency_id || 1) }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ (viewingContract as any).contract_duration_months || 'N/A' }} months</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Service Details -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Service Details
                    </h3>
                  </div>
                  <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Origin</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingContract.origin }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Destination</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingContract.destination }}</div>
                      </div>
                      <div class="md:col-span-2">
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Cargo Description</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingContract.cargo_description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right column -->
              <div class="space-y-6">
                <!-- Financial Information -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Financial Details
                    </h3>
                  </div>
                  <div class="p-6 space-y-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Contract Value</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingContract as any).actual_amount || viewingContract.amount, viewingContract.currency_id || 1) }}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Base Rate</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingContract as any).base_rate || 0, (viewingContract as any).rate_currency_id || viewingContract.currency_id || 1) }}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Minimum Charge</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingContract as any).minimum_charge || 0, (viewingContract as any).rate_currency_id || viewingContract.currency_id || 1) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Client Entity Information -->
                <div v-if="(viewingContract as any).entity" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      Client Entity
                    </h3>
                  </div>
                  <div class="p-6 space-y-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Entity Name</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingContract as any).entity.name }}</div>
                    </div>
                    <div v-if="(viewingContract as any).entity.address">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingContract as any).entity.address }}</div>
                    </div>
                    <div v-if="(viewingContract as any).entity.email">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</div>
                      <div class="font-medium text-blue-600 dark:text-blue-400">
                        <a :href="`mailto:${(viewingContract as any).entity.email}`" class="hover:underline">{{ (viewingContract as any).entity.email }}</a>
                      </div>
                    </div>
                    <div v-if="(viewingContract as any).entity.phonenumber">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingContract as any).entity.phonenumber }}</div>
                    </div>
                    <div v-if="(viewingContract as any).entity.group">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Group</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingContract as any).entity.group.group_name }}</div>
                    </div>
                    <div v-if="(viewingContract as any).entity_id">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Entity ID</div>
                      <div class="font-medium text-gray-900 dark:text-white">#{{ (viewingContract as any).entity_id }}</div>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Quick Actions
                    </h3>
                  </div>
                  <div class="p-6 space-y-3">
                    <button 
                      @click="editOpportunity(viewingContract); showContractModal = false" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit Contract
                    </button>
                    <button 
                      @click="viewInvoice(viewingContract); showContractModal = false" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
            <button 
              @click="showContractModal = false" 
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="showContractModal = false" 
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Invoice Modal -->
    <div v-if="showInvoiceModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-4xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Invoice Details - {{ viewingInvoice?.title }}
            </h3>
            <button @click="showInvoiceModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto" v-if="viewingInvoice">
            <!-- Header with key info -->
            <div class="mb-8">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ viewingInvoice.title }}</h2>
                  <div class="flex items-center space-x-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Generated Invoice
                    </span>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {{ (viewingInvoice as any).invoice_status || 'Pending' }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ formatCurrency((viewingInvoice as any).total_amount || viewingInvoice.amount, viewingInvoice.currency_id || 1) }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Invoice Amount</div>
                </div>
              </div>
            </div>

            <!-- Main content grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left column -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Invoice Details -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Invoice Information
                    </h3>
                  </div>
                  <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Invoice Number</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).invoice_number || 'N/A' }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Invoice Date</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ formatDate((viewingInvoice as any).invoice_date || viewingInvoice.date_created) }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Due Date</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ formatDate((viewingInvoice as any).due_date || 'N/A') }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).invoice_status || 'Pending' }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Service Details -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Service Details
                    </h3>
                  </div>
                  <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Service Type</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).logistics_service_type || viewingInvoice.service_type }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Origin</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingInvoice.origin }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Destination</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingInvoice.destination }}</div>
                      </div>
                      <div class="md:col-span-2">
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Cargo Description</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ viewingInvoice.cargo_description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right column -->
              <div class="space-y-6">
                <!-- Financial Information -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Financial Details
                    </h3>
                  </div>
                  <div class="p-6 space-y-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingInvoice as any).total_amount || viewingInvoice.amount, viewingInvoice.currency_id || 1) }}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Tax Amount</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingInvoice as any).tax_amount || 0, viewingInvoice.currency_id || 1) }}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Discount</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ formatCurrency((viewingInvoice as any).discount_amount || 0, viewingInvoice.currency_id || 1) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Client Entity Information -->
                <div v-if="(viewingInvoice as any).entity" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      Client Entity
                    </h3>
                  </div>
                  <div class="p-6 space-y-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Entity Name</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).entity.name }}</div>
                    </div>
                    <div v-if="(viewingInvoice as any).entity.address">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).entity.address }}</div>
                    </div>
                    <div v-if="(viewingInvoice as any).entity.email">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</div>
                      <div class="font-medium text-blue-600 dark:text-blue-400">
                        <a :href="`mailto:${(viewingInvoice as any).entity.email}`" class="hover:underline">{{ (viewingInvoice as any).entity.email }}</a>
                      </div>
                    </div>
                    <div v-if="(viewingInvoice as any).entity.phonenumber">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).entity.phonenumber }}</div>
                    </div>
                    <div v-if="(viewingInvoice as any).entity.group">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Group</div>
                      <div class="font-medium text-gray-900 dark:text-white">{{ (viewingInvoice as any).entity.group.group_name }}</div>
                    </div>
                    <div v-if="(viewingInvoice as any).entity_id">
                      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Entity ID</div>
                      <div class="font-medium text-gray-900 dark:text-white">#{{ (viewingInvoice as any).entity_id }}</div>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Quick Actions
                    </h3>
                  </div>
                  <div class="p-6 space-y-3">
                    <button 
                      @click="downloadInvoice(viewingInvoice)" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Download PDF
                    </button>
                    <button 
                      @click="sendInvoice(viewingInvoice)" 
                      class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Send Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
            <button 
              @click="showInvoiceModal = false" 
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="showInvoiceModal = false" 
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contract Rates Modal -->
    <RateModal
      v-if="showContractRatesModal"
      :rate="selectedRate"
      :opportunities="opportunitiesStore.getOpportunities"
      :currencies="currencies"
      @close="closeContractRatesModal"
      @save="saveContractRate"
    />

    <!-- Contract Invoices Modal -->
    <div v-if="showContractInvoicesModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-6xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-600 to-red-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Contract Invoices - {{ selectedOpportunity?.title }}
            </h3>
            <button @click="showContractInvoicesModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <!-- Add New Invoice Form -->
            <div class="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Invoice</h4>
              <form @submit.prevent="addContractInvoice" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Number *</label>
                    <input
                      v-model="newInvoice.invoice_number"
                      type="text"
                      required
                      placeholder="Enter invoice number"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice Date *</label>
                    <input
                      v-model="newInvoice.invoice_date"
                      type="date"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount *</label>
                    <input
                      v-model.number="newInvoice.total_amount"
                      type="number"
                      step="0.01"
                      placeholder="Enter amount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency *</label>
                    <select
                      v-model="newInvoice.currency_id"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select Currency</option>
                      <option v-for="currency in currencies" :key="currency.id" :value="currency.id">{{ currency.currency_name }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="resetNewInvoice"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-800 disabled:opacity-50"
                  >
                    {{ saving ? 'Adding...' : 'Add Invoice' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Invoices List -->
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contract Invoices</h4>
              <div v-if="contractInvoices.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                No contract invoices found for this opportunity.
              </div>
              <div v-else class="space-y-4">
                <div v-for="invoice in contractInvoices" :key="invoice.id" class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <span class="font-semibold text-gray-900 dark:text-white">
                          {{ invoice.invoice_number }}
                        </span>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                          {{ invoice.status }}
                        </span>
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {{ formatDate(invoice.invoice_date) }} - {{ formatCurrency(invoice.total_amount, invoice.currency_id) }}
                      </div>
                      <div v-if="invoice.notes" class="text-sm text-gray-500 dark:text-gray-400">
                        {{ invoice.notes }}
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button @click="editContractInvoice(invoice)" class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:ring-4 focus:ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30">
                        Edit
                      </button>
                      <button @click="deleteContractInvoice(invoice.id)" class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:ring-4 focus:ring-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Enhanced Invoice Modals with z-index fixes -->
  <div v-if="showGenerateModal" class="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <GenerateInvoiceModal
      :show="showGenerateModal"
      :opportunity="selectedOpportunity"
      @close="showGenerateModal = false"
      @invoice-generated="handleGenerateInvoice"
    />
  </div>

  <div v-if="showDetailModal" class="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <InvoiceDetailModal
      :show="showDetailModal"
      :invoice="selectedInvoice"
      @close="showDetailModal = false"
    />
  </div>

  <div v-if="showLineItemsModal" class="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <InvoiceLineItemsModal
      :show="showLineItemsModal"
      :invoice="selectedInvoice"
      @close="showLineItemsModal = false"
      @save="handleSaveLineItems"
    />
  </div>

  <div v-if="showEditInvoiceModal" class="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <EditInvoiceModal
      :show="showEditInvoiceModal"
      :invoice="selectedInvoice"
      @close="showEditInvoiceModal = false"
      @save="handleSaveEdit"
    />
  </div>

  <!-- Contract Rates Modal with z-index fix -->
  <div v-if="showContractRatesModal" class="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <RateModal
      :rate="selectedRate"
      :opportunities="opportunitiesStore.getOpportunities"
      :currencies="currencies"
      :selected-opportunity="selectedOpportunity"
      @close="closeContractRatesModal"
      @save="saveContractRate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useOpportunitiesStore } from '../../store/opportunities.store'
import { usePipelinesStore } from '../../store/pipelines.store'
import { useStagesStore } from '../../store/stages.store'
import { useUserStore } from '../../store/user.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import { useActivitiesStore } from '../../store/activities.store'
import { useAuthStore } from '../../store/auth.store'
import { useLogisticsContractRatesStore } from '../../store/logistics-contract-rates.store'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'
import KanbanBoard from '../../components/crm/KanbanBoard.vue'
import RateModal from '../../components/crm/RateModal.vue'
import OpportunityWinModal from '../../components/crm/OpportunityWinModal.vue'
import CustomerDetectionModal from '../../components/crm/CustomerDetectionModal.vue'
import GenerateInvoiceModal from '../../components/crm/GenerateInvoiceModal.vue'
import InvoiceDetailModal from '../../components/crm/InvoiceDetailModal.vue'
import InvoiceLineItemsModal from '../../components/crm/InvoiceLineItemsModal.vue'
import EditInvoiceModal from '../../components/crm/EditInvoiceModal.vue'
import { EnhancedLeadService } from '../../services/crm/EnhancedLeadService'

import type { Opportunities, CreateOpportunities, UpdateOpportunities } from '../../api/models/opportunities.model'
import type { Activity, CreateActivity, UpdateActivity } from '../../api/models/activities.model'
import type { LogisticsContractRate, CreateLogisticsContractRate, UpdateLogisticsContractRate } from '../../api/models/logistics-contract-rates.model'
import type { LogisticsContractInvoice, CreateLogisticsContractInvoice, UpdateLogisticsContractInvoice } from '../../api/models/logistics-contract-invoices.model'

// Router
const router = useRouter()

// Stores
const opportunitiesStore = useOpportunitiesStore()
const pipelinesStore = usePipelinesStore()
const stagesStore = useStagesStore()
const userStore = useUserStore()
const currenciesStore = useCurrenciesStore()
const activitiesStore = useActivitiesStore()
const authStore = useAuthStore()
const logisticsContractRatesStore = useLogisticsContractRatesStore()
const logisticsContractInvoicesStore = useLogisticsContractInvoicesStore()

// Reactive data
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const searchQuery = ref('')

// Modal states
const showViewModal = ref(false)
const showEditModal = ref(false)
const showContractModal = ref(false)
const showInvoiceModal = ref(false)
const showContractRatesModal = ref(false)
const showContractInvoicesModal = ref(false)

// Selected items
const viewingOpportunity = ref<Opportunities | null>(null)
const editingOpportunity = ref<Opportunities | null>(null)
const viewingContract = ref<Opportunities | null>(null)
const viewingInvoice = ref<Opportunities | null>(null)
const selectedOpportunity = ref<Opportunities | null>(null)
const selectedRate = ref<LogisticsContractRate | null>(null)
const selectedInvoice = ref<LogisticsContractInvoice | null>(null)

// Contract rates and invoices data
const newRate = reactive<Partial<CreateLogisticsContractRate>>({
  opportunity_id: 0,
  service_category: '',
  rate_type: '',
  rate_amount: 0,
  currency_id: 0,
  description: '',
  is_active: true
})

const newInvoice = reactive<Partial<CreateLogisticsContractInvoice>>({
  opportunity_id: 0,
  invoice_number: '',
  invoice_date: '',
  total_amount: 0,
  currency_id: 0,
  status: 'draft'
})

const editRate = reactive<Partial<UpdateLogisticsContractRate>>({
  service_category: '',
  rate_type: '',
  rate_amount: 0,
  currency_id: 0,
  description: '',
  is_active: true
})

const editInvoice = reactive<Partial<UpdateLogisticsContractInvoice>>({
  invoice_number: '',
  invoice_date: '',
  total_amount: 0,
  currency_id: 0,
  status: 'draft'
})

// Computed properties
const currencies = computed(() => currenciesStore.getCurrencies)
const contractRates = computed(() => logisticsContractRatesStore.getRates)
const contractInvoices = computed(() => logisticsContractInvoicesStore.getInvoices)

// Enhanced invoice modal states
const showGenerateModal = ref(false)
const showDetailModal = ref(false)
const showLineItemsModal = ref(false)
const showAddInvoiceModal = ref(false)
const showEditInvoiceModal = ref(false)
const contractInvoicesList = ref<LogisticsContractInvoice[]>([])
const loadingInvoices = ref(false)

// Filters
const filters = reactive({
  search: '',
  serviceType: '',
  contractStatus: ''
})

// Pagination
const pagination = reactive({
  currentPage: 1,
  limit: 10,
  total: 0
})

// Edit form
const editForm = reactive({
  title: '',
  company_name: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_position: '',
  company_website: '',
  company_address: '',
  logistics_service_type: '',
  origin: '',
  destination: '',
  cargo_description: '',
  amount: 0,
  probability: 0,
  expected_close_date: '',
  expected_service_date: '',
  description: '',
  notes: ''
})

// Computed properties for filtered opportunities
const filteredOpportunities = computed(() => {
  // Filter opportunities to only show won ones (stage_id = 5 for "Closed Won")
  let filtered = opportunitiesStore.getOpportunities.filter(opp => 
    opp.stage_id === 5 || (opp as any).stage?.name === 'Closed Won' || (opp as any).contract_status === 'active'
  )

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(opp => 
      opp.title.toLowerCase().includes(search) ||
      opp.company_name?.toLowerCase().includes(search) ||
      opp.contact_name?.toLowerCase().includes(search)
    )
  }

  if (filters.serviceType) {
    filtered = filtered.filter(opp => 
      opp.service_type === filters.serviceType || 
      (opp as any).logistics_service_type === filters.serviceType
    )
  }

  if (filters.contractStatus) {
    filtered = filtered.filter(opp => 
      (opp as any).contract_status === filters.contractStatus
    )
  }

  return filtered
})

// Functions
const fetchWonOpportunities = async () => {
  try {
    loading.value = true
    // Fetch all opportunities and filter for won ones
    await opportunitiesStore.fetchOpportunities({
      query: {
        $sort: { date_created: -1 }
      }
    })
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch won opportunities'
    console.error('Error fetching won opportunities:', err)
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  pagination.currentPage = page
  fetchWonOpportunities()
}

const clearFilters = () => {
  filters.search = ''
  filters.serviceType = ''
  filters.contractStatus = ''
}

// Opportunity management functions
const viewOpportunityDetails = (opportunity: Opportunities) => {
  viewingOpportunity.value = opportunity
  showViewModal.value = true
}

const editOpportunity = (opportunity: Opportunities) => {
  editingOpportunity.value = opportunity
  editForm.title = opportunity.title
  editForm.company_name = opportunity.company_name
  editForm.contact_name = opportunity.contact_name
  editForm.contact_email = opportunity.contact_email || ''
  editForm.contact_phone = opportunity.contact_phone || ''
  editForm.contact_position = opportunity.contact_position || ''
  editForm.company_website = opportunity.company_website || ''
  editForm.company_address = opportunity.company_address || ''
  editForm.logistics_service_type = (opportunity as any).logistics_service_type || opportunity.service_type || ''
  editForm.origin = opportunity.origin || ''
  editForm.destination = opportunity.destination || ''
  editForm.cargo_description = opportunity.cargo_description || ''
  editForm.amount = opportunity.amount || 0
  editForm.probability = opportunity.probability || 0
  editForm.expected_close_date = opportunity.expected_close_date ? new Date(opportunity.expected_close_date).toISOString().split('T')[0] : ''
  editForm.expected_service_date = opportunity.expected_service_date ? new Date(opportunity.expected_service_date).toISOString().split('T')[0] : ''
  editForm.description = opportunity.description || ''
  editForm.notes = (opportunity as any).notes || ''
  showEditModal.value = true
}

const viewContract = (opportunity: Opportunities) => {
  viewingContract.value = opportunity
  showContractModal.value = true
}

const viewInvoice = (opportunity: Opportunities) => {
  viewingInvoice.value = opportunity
  showInvoiceModal.value = true
}

const saveEditedOpportunity = async () => {
  if (!editingOpportunity.value) return

  try {
    await opportunitiesStore.updateOpportunity(editingOpportunity.value.id, editForm)
    showEditModal.value = false
    fetchWonOpportunities() // Refresh the list
  } catch (err: any) {
    error.value = err.message || 'Failed to save changes'
    console.error('Error saving edited opportunity:', err)
  }
}

// Utility functions
const formatCurrency = (amount: number, currencyId: number) => {
  const currency = currenciesStore.getCurrencies.find(c => c.id === currencyId)
  const symbol = currency?.symbol || '$'
  return `${symbol}${amount?.toLocaleString() || '0'}`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatRateBasis = (basis: string) => {
  return basis.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Contract Rates Functions
const openContractRatesModal = async (opportunity: Opportunities) => {
  selectedOpportunity.value = opportunity
  selectedRate.value = null // Reset for new rate
  showContractRatesModal.value = true
}

const closeContractRatesModal = () => {
  showContractRatesModal.value = false
  selectedRate.value = null
}

const saveContractRate = async (rateData: any) => {
  try {
    saving.value = true
    
    // Set the opportunity_id from the selected opportunity
    rateData.opportunity_id = selectedOpportunity.value?.id
    rateData.company_id = authStore.user?.company_id || 1
    
    if (rateData.isEditing) {
      // Update existing rate (from RateModal edit button)
      await logisticsContractRatesStore.updateRate(rateData.id, rateData)
    } else if (selectedRate.value) {
      // Update existing rate (from form edit)
      await logisticsContractRatesStore.updateRate(selectedRate.value.id, rateData)
    } else {
      // Create new rate
      await logisticsContractRatesStore.createRate(rateData)
    }
    
    // Refresh the rates list
    if (selectedOpportunity.value) {
      await logisticsContractRatesStore.fetchRatesByOpportunity(selectedOpportunity.value.id)
    }
    
    closeContractRatesModal()
  } catch (err: any) {
    error.value = err.message || 'Failed to save contract rate'
    console.error('Error saving contract rate:', err)
  } finally {
    saving.value = false
  }
}

// Contract Invoices Functions
const openContractInvoicesModal = (opportunity: Opportunities) => {
  selectedOpportunity.value = opportunity
  selectedInvoice.value = null // Reset for new invoice
  showContractInvoicesModal.value = true
}

const closeContractInvoicesModal = () => {
  showContractInvoicesModal.value = false
  selectedInvoice.value = null
}

const saveContractInvoice = async (invoiceData: any) => {
  try {
    saving.value = true
    
    // Set the opportunity_id from the selected opportunity
    invoiceData.opportunity_id = selectedOpportunity.value?.id
    invoiceData.company_id = authStore.user?.company_id || 1
    
    if (selectedInvoice.value) {
      // Update existing invoice
      await logisticsContractInvoicesStore.updateInvoice(selectedInvoice.value.id, invoiceData)
    } else {
      // Create new invoice
      await logisticsContractInvoicesStore.createInvoice(invoiceData)
    }
    
    // Refresh the invoices list
    if (selectedOpportunity.value) {
      await logisticsContractInvoicesStore.fetchInvoices({
        query: { opportunity_id: selectedOpportunity.value.id }
      })
    }
    
    closeContractInvoicesModal()
  } catch (err: any) {
    error.value = err.message || 'Failed to save contract invoice'
    console.error('Error saving contract invoice:', err)
  } finally {
    saving.value = false
  }
}

const downloadInvoice = async (invoice: any) => {
  try {
    // This would typically call an API endpoint to generate and download the PDF
    console.log('Downloading invoice:', invoice.id)
    // For now, just show a success message
    alert('Invoice download started...')
  } catch (err: any) {
    error.value = err.message || 'Failed to download invoice'
    console.error('Error downloading invoice:', err)
  }
}

const sendInvoice = async (invoice: any) => {
  try {
    // This would typically call an API endpoint to send the invoice via email
    console.log('Sending invoice:', invoice.id)
    // For now, just show a success message
    alert('Invoice sent successfully!')
  } catch (err: any) {
    error.value = err.message || 'Failed to send invoice'
    console.error('Error sending invoice:', err)
  }
}

// Enhanced Invoice Functions
const closeContractInvoicesModalEnhanced = () => {
  showContractInvoicesModal.value = false
  selectedOpportunity.value = null
  contractInvoicesList.value = []
}

const generateInvoice = () => {
  showGenerateModal.value = true
}

const addNewInvoice = () => {
  showAddInvoiceModal.value = true
}

const viewInvoiceModal = (invoice: LogisticsContractInvoice) => {
  selectedInvoice.value = invoice
  showDetailModal.value = true
}

const editInvoiceModal = (invoice: LogisticsContractInvoice) => {
  selectedInvoice.value = invoice
  showEditInvoiceModal.value = true
}

const manageLineItems = (invoice: LogisticsContractInvoice) => {
  selectedInvoice.value = invoice
  showLineItemsModal.value = true
}

const deleteInvoice = async (invoice: LogisticsContractInvoice) => {
  if (confirm('Are you sure you want to delete this invoice?')) {
    try {
      await logisticsContractInvoicesStore.deleteInvoice(invoice.id)
      await fetchContractInvoices()
    } catch (err: any) {
      error.value = err.message || 'Failed to delete invoice'
    }
  }
}

const addContractInvoice = async () => {
  try {
    saving.value = true
    if (!selectedOpportunity.value?.id) {
      throw new Error('No opportunity selected')
    }
    if (!newInvoice.invoice_number || !newInvoice.invoice_date || !newInvoice.total_amount || !newInvoice.currency_id) {
      throw new Error('Please fill in all required fields')
    }
    const invoiceData = {
      opportunity_id: selectedOpportunity.value.id,
      invoice_number: newInvoice.invoice_number,
      invoice_date: newInvoice.invoice_date,
      total_amount: newInvoice.total_amount,
      currency_id: newInvoice.currency_id,
      status: newInvoice.status || 'draft'
    }
    const response = await logisticsContractInvoicesStore.createInvoice(invoiceData)
    if (response) {
      await fetchContractInvoices()
      resetNewInvoice()
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to add invoice'
  } finally {
    saving.value = false
  }
}

const resetNewInvoice = () => {
  Object.assign(newInvoice, {
    opportunity_id: 0,
    invoice_number: '',
    invoice_date: '',
    total_amount: 0,
    currency_id: 0,
    status: 'draft'
  })
}

const editContractInvoice = (invoice: LogisticsContractInvoice) => {
  selectedInvoice.value = invoice
  Object.assign(editInvoice, {
    invoice_number: invoice.invoice_number,
    invoice_date: invoice.invoice_date,
    total_amount: invoice.total_amount,
    currency_id: invoice.currency_id,
    status: invoice.status
  })
}

const deleteContractInvoice = async (invoiceId: number) => {
  if (confirm('Are you sure you want to delete this invoice?')) {
    try {
      await logisticsContractInvoicesStore.deleteInvoice(invoiceId)
      await fetchContractInvoices()
    } catch (err: any) {
      error.value = err.message || 'Failed to delete invoice'
    }
  }
}

const handleGenerateInvoice = async (invoiceData: any) => {
  try {
    await logisticsContractInvoicesStore.createInvoice(invoiceData)
    await fetchContractInvoices()
    showGenerateModal.value = false
  } catch (err: any) {
    error.value = err.message || 'Failed to generate invoice'
  }
}

const handleSaveLineItems = async (lineItems: any[]) => {
  try {
    if (selectedInvoice.value) {
      await logisticsContractInvoicesStore.updateInvoice(selectedInvoice.value.id, {
        line_items: lineItems
      })
      await fetchContractInvoices()
      showLineItemsModal.value = false
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to save line items'
  }
}

const handleSaveEdit = async (invoiceData: any) => {
  try {
    if (selectedInvoice.value) {
      await logisticsContractInvoicesStore.updateInvoice(selectedInvoice.value.id, invoiceData)
      await fetchContractInvoices()
      showEditInvoiceModal.value = false
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to save invoice'
  }
}

const fetchContractInvoices = async () => {
  if (!selectedOpportunity.value) return
  
  try {
    loadingInvoices.value = true
    await logisticsContractInvoicesStore.fetchInvoices({
      query: { opportunity_id: selectedOpportunity.value.id }
    })
    contractInvoicesList.value = logisticsContractInvoicesStore.getInvoices
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch invoices'
  } finally {
    loadingInvoices.value = false
  }
}

// Utility functions for invoice calculations
const calculateTotalAmount = () => {
  return contractInvoices.value.reduce((total, invoice) => {
    return total + (calculateInvoiceTotalFromLineItems(invoice) || 0)
  }, 0)
}

const calculatePaidAmount = () => {
  return contractInvoices.value.reduce((total, invoice) => {
    return total + (invoice.paid_amount || 0)
  }, 0)
}

const calculateOutstandingAmount = () => {
  return calculateTotalAmount() - calculatePaidAmount()
}

const calculateInvoiceTotalFromLineItems = (invoice: LogisticsContractInvoice) => {
  if (!invoice.line_items || invoice.line_items.length === 0) {
    return invoice.total_amount || 0
  }
  
  return invoice.line_items.reduce((total, item) => {
    return total + ((item.quantity || 0) * (item.unit_price || 0))
  }, 0)
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    case 'sent':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const isOverdue = (invoice: LogisticsContractInvoice) => {
  if (!invoice.due_date) return false
  return new Date(invoice.due_date) < new Date()
}

const getDaysOverdue = (invoice: LogisticsContractInvoice) => {
  if (!invoice.due_date) return 0
  const dueDate = new Date(invoice.due_date)
  const today = new Date()
  const diffTime = today.getTime() - dueDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getPaymentPercentage = (invoice: LogisticsContractInvoice) => {
  const total = calculateInvoiceTotalFromLineItems(invoice)
  const paid = invoice.paid_amount || 0
  if (total === 0) return 0
  return Math.round((paid / total) * 100)
}

// Lifecycle
onMounted(async () => {
  await currenciesStore.fetchCurrencies()
  await fetchWonOpportunities()
})
</script>

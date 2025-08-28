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
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      <!-- Card Header -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 transition-all duration-200"
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
            <select v-model="filters.serviceType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 transition-all duration-200">
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
            <select v-model="filters.contractStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 transition-all duration-200">
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
              class="w-full text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-green-500"
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
      <div v-if="!loading && filteredOpportunities.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
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
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl shadow-sm transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear Filters
            </button>
            <button
              @click="router.push('/crm/opportunities')"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
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
      <div v-else-if="filteredOpportunities.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Enhanced Header -->
        <div class="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20"></div>
          <div class="relative px-8 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Won Opportunities Table</h3>
                  <p class="text-green-100 text-sm mt-1">Comprehensive view of all successfully closed deals</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-white font-semibold">{{ filteredOpportunities.length }} Won</span>
                  </div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    <span class="text-white font-semibold">{{ formatCurrency(filteredOpportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0), 1) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    Opportunity
                  </div>
                </th>
                <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    Contact & Company
                  </div>
                </th>
                <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    Service Type
                  </div>
                </th>
                <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                    </div>
                    Amount
                  </div>
                </th>
                <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                      </svg>
                    </div>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="opportunity in filteredOpportunities" :key="opportunity.id" class="bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/10 dark:hover:to-emerald-900/10 transition-all duration-200 group">
                <!-- Opportunity Column -->
                <td class="px-8 py-6">
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center transition-all duration-200">
                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {{ opportunity.title }}
                      </h4>
                      <div class="flex items-center space-x-3">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300">
                          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Won
                        </span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
                          {{ (opportunity as any).logistics_service_type || opportunity.service_type || 'N/A' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <!-- Contact & Company Column -->
                <td class="px-8 py-6">
                  <div class="space-y-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">{{ opportunity.contact_name }}</div>
                        <div v-if="opportunity.contact_email" class="text-sm text-gray-500 dark:text-gray-400">{{ opportunity.contact_email }}</div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">{{ opportunity.company_name }}</div>
                        <div v-if="opportunity.company_website" class="text-sm text-gray-500 dark:text-gray-400">{{ opportunity.company_website }}</div>
                      </div>
                    </div>
                  </div>
                </td>
                
                <!-- Service Type Column -->
                <td class="px-8 py-6">
                  <div class="flex items-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200">
                      {{ (opportunity as any).logistics_service_type || opportunity.service_type || 'N/A' }}
                    </span>
                  </div>
                </td>
                
                <!-- Amount Column -->
                <td class="px-8 py-6">
                  <div class="space-y-3">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-3 border border-green-200 dark:border-green-800">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {{ formatCurrency((opportunity as any).actual_amount || opportunity.amount, opportunity.currency_id || 1) }}
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Won Value</div>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      Won {{ formatDate((opportunity as any).won_date || opportunity.date_created) }}
                    </div>
                  </div>
                </td>
                
                <!-- Actions Column -->
                <td class="px-8 py-6">
                  <div class="flex items-center space-x-2">
                    <button @click="viewOpportunityDetails(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 transition-all duration-200 group/btn">
                      <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      View
                    </button>
                    <button @click="editOpportunity(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30 transition-all duration-200 group/btn">
                      <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>


                    <button @click="openContractRatesModal(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-200 group/btn">
                      <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      Rates
                    </button>
                    <button @click="openContractInvoicesModal(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 hover:border-orange-300 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-800 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/30 transition-all duration-200 group/btn">
                      <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Contract Invoices
                    </button>
                    <button @click="showActivitiesModal(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 hover:border-indigo-300 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-900/30 transition-all duration-200 group/btn">
                      <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Activities
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
    <div v-if="showViewModal" class="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-2xl">
                <!-- Modal header -->
                <div class="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-t-2xl">
                    <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20"></div>
                    <div class="relative flex items-center justify-between p-8">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white">Won Opportunity Details</h3>
                                <p class="text-green-100 text-sm mt-1">Comprehensive view of successfully closed opportunity</p>
                            </div>
                        </div>
                        <button @click="showViewModal = false" class="relative z-10 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl text-sm w-10 h-10 inline-flex justify-center items-center transition-all duration-200 shadow-lg hover:shadow-xl">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Modal body -->
                <div class="p-8 max-h-[70vh] overflow-y-auto">
                    <div v-if="viewingOpportunity" class="space-y-8">
                        <!-- Opportunity Title & Status -->
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">{{ viewingOpportunity.title }}</h2>
                            <div class="flex items-center justify-center space-x-4">
                                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Won Opportunity
                                </span>
                                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                    </svg>
                                    {{ (viewingOpportunity as any).logistics_service_type || viewingOpportunity.service_type || 'N/A' }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Key Metrics -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Won Value</span>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ formatCurrency((viewingOpportunity as any).actual_amount || viewingOpportunity.amount, viewingOpportunity.currency_id || 1) }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Successfully closed deal value</p>
                            </div>

                            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Won Date</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ formatDate((viewingOpportunity as any).won_date || viewingOpportunity.date_created) }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Date opportunity was won</p>
                            </div>
                            
                            <div class="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Service Type</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ (viewingOpportunity as any).logistics_service_type || viewingOpportunity.service_type || 'N/A' }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Type of service provided</p>
                            </div>
                        </div>

                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                    Basic Information
                                </h4>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-4">
                                        <div>
                                            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Type</span>
                                            <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ viewingOpportunity.type || 'N/A' }}</p>
                                        </div>
                                        <div>
                                            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Service Type</span>
                                            <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ (viewingOpportunity as any).logistics_service_type || viewingOpportunity.service_type || 'N/A' }}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4">
                                        <div>
                                            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Probability</span>
                                            <div class="flex items-center mt-1">
                                                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                                                    <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" :style="{ width: viewingOpportunity.probability + '%' }"></div>
                                                </div>
                                                <span class="text-lg font-bold text-gray-900 dark:text-white">{{ viewingOpportunity.probability }}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Financial Information -->
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                Financial Information
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Won Amount</span>
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatCurrency((viewingOpportunity as any).actual_amount || viewingOpportunity.amount, viewingOpportunity.currency_id || 1) }}</p>
                                </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Probability</span>
                                    <p class="text-sm text-gray-900 dark:text-white">{{ viewingOpportunity.probability }}%</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Contact Information -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    Contact Information
                                </h4>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="space-y-6">
                                        <div class="flex items-center space-x-4">
                                            <div class="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl flex items-center justify-center">
                                                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Contact Name</span>
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ viewingOpportunity.contact_name }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-4">
                                            <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex items-center justify-center">
                                                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</span>
                                                <p class="text-lg font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.contact_email || 'Not provided' }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="space-y-6">
                                        <div class="flex items-center space-x-4">
                                            <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl flex items-center justify-center">
                                                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</span>
                                                <p class="text-lg font-medium text-gray-900 dark:text-white">{{ viewingOpportunity.contact_phone || 'Not provided' }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-4">
                                            <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl flex items-center justify-center">
                                                <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Company</span>
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ viewingOpportunity.company_name }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Cargo Information -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                        </svg>
                                    </div>
                                    Cargo Information
                                </h4>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Origin</span>
                                        <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ viewingOpportunity.origin || 'Not specified' }}</p>
                                    </div>
                                    <div>
                                        <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Destination</span>
                                        <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ viewingOpportunity.destination || 'Not specified' }}</p>
                                    </div>
                                    <div class="md:col-span-2">
                                        <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cargo Description</span>
                                        <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ viewingOpportunity.cargo_description || 'Not specified' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Timeline -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    Timeline
                                </h4>
                            </div>
                            <div class="p-6 space-y-4">
                                <div>
                                    <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Created</span>
                                    <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ formatDate(viewingOpportunity.date_created) }}</p>
                                </div>
                                <div v-if="(viewingOpportunity as any).won_date">
                                    <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Won Date</span>
                                    <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ formatDate((viewingOpportunity as any).won_date) }}</p>
                                </div>
                                <div v-if="viewingOpportunity.date_updated">
                                    <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Last Updated</span>
                                    <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ formatDate(viewingOpportunity.date_updated) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </div>
                                    Quick Actions
                                </h4>
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
                                <button 
                                    @click="showActivitiesModal(viewingOpportunity); showViewModal = false" 
                                    class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    View Activities
                                </button>
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

    <!-- Activities Modal -->
    <div v-if="showActivitiesModalFlag" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-6xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Activities - {{ selectedOpportunity?.title }}
                    </h3>
                    <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <!-- Header with Add Activity Button -->
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Timeline</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Manage all activities related to this opportunity</p>
                        </div>
                        <button @click="openAddActivityModal" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add Activity
                        </button>
                    </div>

                    <!-- Activities List -->
                    <div v-if="activitiesStore.loading" class="space-y-4">
                        <div v-for="i in 3" :key="i" class="animate-pulse">
                            <div class="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                    <div class="flex-1 space-y-2">
                                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                        <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="activities.length === 0" class="text-center py-12">
                        <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Activities Yet</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Start tracking your opportunity interactions by adding your first activity.</p>
                        <button @click="openAddActivityModal" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add First Activity
                        </button>
                    </div>

                    <div v-else class="space-y-4">
                        <div v-for="activity in activities" :key="activity.id" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div class="p-6">
                                <div class="flex items-start justify-between">
                                    <div class="flex items-start space-x-4">
                                        <!-- Activity Type Icon -->
                                        <div class="flex-shrink-0">
                                            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="getActivityTypeColor(activity.type)">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityTypeIcon(activity.type)"></path>
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Activity Content -->
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center space-x-2 mb-2">
                                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ activity.subject }}</h4>
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusColor(activity.status)">
                                                    {{ activity.status.replace('_', ' ').toUpperCase() }}
                                                </span>
                                            </div>
                                            
                                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                <div class="flex items-center space-x-4">
                                                    <span class="flex items-center">
                                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                        </svg>
                                                        {{ formatDate(activity.date_start) }} - {{ formatDate(activity.date_end) }}
                                                    </span>
                                                    <span class="flex items-center">
                                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        {{ activity.date_start_time }} - {{ activity.date_end_time }}
                                                    </span>
                                                    <span v-if="activity.location" class="flex items-center">
                                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        </svg>
                                                        {{ activity.location }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div v-if="activity.description" class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                                {{ activity.description }}
                                            </div>

                                            <div v-if="activity.notes" class="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                                <strong>Notes:</strong> {{ activity.notes }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex items-center space-x-2">
                                        <button @click="openEditActivityModal(activity)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                            Edit
                                        </button>
                                        <button @click="deleteActivity(activity.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
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
        <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Contract Invoices - {{ selectedOpportunity?.title }}
            </h3>
            <button @click="closeContractInvoicesModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 max-h-[80vh] overflow-y-auto">
            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <!-- Total Invoices -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</p>
                      <p class="text-xl font-bold text-gray-900 dark:text-white">{{ contractInvoices.length }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Total Amount -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</p>
                      <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(calculateTotalAmount(), 1) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Paid Amount -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Amount</p>
                      <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(calculatePaidAmount(), 1) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Outstanding Amount -->
              <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center border border-red-400">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</p>
                      <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(calculateOutstandingAmount(), 1) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between items-center mb-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Invoice Management</h4>
              <div class="flex space-x-3">
                <button
                  @click="generateNewInvoice"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border border-green-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Generate Invoice
                </button>
                <button
                  @click="addNewInvoiceManual"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Invoice
                </button>
              </div>
            </div>

            <!-- Invoices List -->
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice Details
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="invoice in contractInvoices" :key="invoice.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                              {{ invoice.invoice_number }}
                            </div>
                            <div class="text-sm text-gray-500">
                              {{ formatDate(invoice.invoice_date) }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">
                          {{ formatCurrency(calculateInvoiceTotalFromLineItems(invoice), invoice.currency_id) }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ invoice.line_items?.length || 0 }} line items
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="[
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            getStatusClasses(invoice.status)
                          ]"
                        >
                          {{ formatStatus(invoice.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{{ formatDate(invoice.due_date) }}</div>
                        <div v-if="isOverdue(invoice)" class="text-red-600 text-xs">
                          {{ getDaysOverdue(invoice) }} days overdue
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          {{ formatCurrency(invoice.paid_amount || 0, invoice.currency_id) }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ getPaymentPercentage(invoice) }}% paid
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex justify-end space-x-2">
                          <button
                            @click="viewInvoiceDetails(invoice)"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
                          >
                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            View
                          </button>
                          <button
                            @click="editInvoiceDetails(invoice)"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
                          >
                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit
                          </button>
                          <button
                            @click="manageInvoiceLineItems(invoice)"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-800 transition-all duration-200"
                          >
                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            Line Items
                          </button>
                          <button
                            v-if="invoice.status === 'draft'"
                            @click="deleteInvoiceDetails(invoice)"
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
            </div>

            <!-- Empty State -->
            <div v-if="contractInvoices.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No invoices found</h3>
              <p class="text-gray-500 dark:text-gray-400 mb-6">This opportunity doesn't have any invoices yet.</p>
              <div class="flex justify-center space-x-3">
                <button
                  @click="generateNewInvoice"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border border-green-500 rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Generate Invoice
                </button>
                <button
                  @click="addNewInvoiceManual"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
const showActivitiesModalFlag = ref(false)
const showAddActivityModal = ref(false)
const showEditActivityModal = ref(false)

// Selected items
const viewingOpportunity = ref<Opportunities | null>(null)
const editingOpportunity = ref<Opportunities | null>(null)
const viewingContract = ref<Opportunities | null>(null)
const viewingInvoice = ref<Opportunities | null>(null)
const selectedOpportunity = ref<Opportunities | null>(null)
const selectedRate = ref<LogisticsContractRate | null>(null)
const selectedInvoice = ref<LogisticsContractInvoice | null>(null)
const selectedActivity = ref<Activity | null>(null)

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

// Invoice Management Functions
const viewInvoiceDetails = (invoice: any) => {
  selectedInvoice.value = invoice
  showDetailModal.value = true
}

const editInvoiceDetails = (invoice: any) => {
  selectedInvoice.value = invoice
  editInvoice.value = { ...invoice }
  showEditInvoiceModal.value = true
}

const manageInvoiceLineItems = (invoice: any) => {
  selectedInvoice.value = invoice
  showLineItemsModal.value = true
}

const deleteInvoiceDetails = (invoice: any) => {
  selectedInvoice.value = invoice
  showConfirmModal.value = true
}

const generateNewInvoice = () => {
  showGenerateModal.value = true
}

const addNewInvoiceManual = () => {
  showAddInvoiceModal.value = true
}
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

// Activities data
const activities = ref<Activity[]>([])
const activitiesLoading = ref(false)

// Activity forms
const activityForm = reactive<Partial<CreateActivity>>({
  type: 'call',
  subject: '',
  description: '',
  user_id: authStore.user?.id || 0,
  entity_type: 'crm/opportunities',
  entity_id: 0,
  company_id: authStore.user?.company_id || 1,
  status: 'pending',
  date_start: '',
  date_end: '',
  date_start_time: '',
  date_end_time: '',
  location: '',
  notes: ''
})

const editActivityForm = reactive<Partial<UpdateActivity>>({
  type: 'call',
  subject: '',
  description: '',
  user_id: authStore.user?.id || 0,
  entity_type: 'crm/opportunities',
  entity_id: 0,
  company_id: authStore.user?.company_id || 1,
  status: 'pending',
  date_start: '',
  date_end: '',
  date_start_time: '',
  date_end_time: '',
  location: '',
  notes: ''
})

// Activities Functions
const closeModal = () => {
  showActivitiesModalFlag.value = false
}

const showActivitiesModal = async (opportunity: Opportunities) => {
  selectedOpportunity.value = opportunity
  await fetchActivities(opportunity.id)
  showActivitiesModalFlag.value = true
}

const openAddActivityModal = () => {
  resetActivityForm()
  showAddActivityModal.value = true
}

const openEditActivityModal = (activity: Activity) => {
  selectedActivity.value = activity
  editActivityForm.type = activity.type
  editActivityForm.subject = activity.subject
  editActivityForm.description = activity.description || ''
  editActivityForm.notes = activity.notes || ''
  editActivityForm.date_start = activity.date_start ? new Date(activity.date_start).toISOString().split('T')[0] : ''
  editActivityForm.date_end = activity.date_end ? new Date(activity.date_end).toISOString().split('T')[0] : ''
  editActivityForm.date_start_time = activity.date_start_time || ''
  editActivityForm.date_end_time = activity.date_end_time || ''
  editActivityForm.location = activity.location || ''
  editActivityForm.status = activity.status
  showEditActivityModal.value = true
}

const createActivity = async () => {
  try {
    if (!selectedOpportunity.value?.id) {
      throw new Error('No opportunity selected')
    }
    
    const activityData: CreateActivity = {
      type: activityForm.type || 'call',
      subject: activityForm.subject || '',
      description: activityForm.description || '',
      user_id: authStore.user?.id || 0,
      entity_type: 'crm/opportunities',
      entity_id: selectedOpportunity.value.id,
      company_id: authStore.user?.company_id || 1,
      status: activityForm.status || 'pending',
      date_start: activityForm.date_start || '',
      date_end: activityForm.date_end || '',
      date_start_time: activityForm.date_start_time || '',
      date_end_time: activityForm.date_end_time || '',
      location: activityForm.location || '',
      notes: activityForm.notes || ''
    }
    
    await activitiesStore.createNewActivity(activityData)
    await fetchActivities(selectedOpportunity.value.id)
    showAddActivityModal.value = false
    resetActivityForm()
  } catch (err: any) {
    error.value = err.message || 'Failed to create activity'
  }
}

const updateActivity = async () => {
  try {
    if (!selectedActivity.value?.id) {
      throw new Error('No activity selected')
    }
    
    await activitiesStore.updateExistingActivity(selectedActivity.value.id, editActivityForm)
    await fetchActivities(selectedOpportunity.value?.id || 0)
    showEditActivityModal.value = false
    selectedActivity.value = null
  } catch (err: any) {
    error.value = err.message || 'Failed to update activity'
  }
}

const deleteActivity = async (activityId: number) => {
  if (confirm('Are you sure you want to delete this activity?')) {
    try {
      await activitiesStore.deleteExistingActivity(activityId)
      await fetchActivities(selectedOpportunity.value?.id || 0)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete activity'
    }
  }
}

const fetchActivities = async (opportunityId: number) => {
  try {
    activitiesLoading.value = true
    await activitiesStore.fetchActivities({
      query: { 
        entity_type: 'crm/opportunities',
        entity_id: opportunityId,
        company_id: authStore.user?.company_id
      }
    })
    activities.value = activitiesStore.activities
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch activities'
  } finally {
    activitiesLoading.value = false
  }
}

const resetActivityForm = () => {
  Object.assign(activityForm, {
    type: 'call',
    subject: '',
    description: '',
    user_id: authStore.user?.id || 0,
    entity_type: 'crm/opportunities',
    entity_id: 0,
    company_id: authStore.user?.company_id || 1,
    status: 'pending',
    date_start: '',
    date_end: '',
    date_start_time: '',
    date_end_time: '',
    location: '',
    notes: ''
  })
}

// Activity utility functions
const getActivityTypeColor = (type: string) => {
  switch (type) {
    case 'call':
      return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    case 'email':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    case 'online_meeting':
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    case 'in_person_meeting':
      return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    case 'task':
      return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
    case 'note':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400'
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400'
  }
}

const getActivityTypeIcon = (type: string) => {
  switch (type) {
    case 'call':
      return 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    case 'email':
      return 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    case 'online_meeting':
      return 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    case 'in_person_meeting':
      return 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    case 'task':
      return 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
    case 'note':
      return 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    default:
      return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}



// Lifecycle
onMounted(async () => {
  await currenciesStore.fetchCurrencies()
  await fetchWonOpportunities()
})
</script>

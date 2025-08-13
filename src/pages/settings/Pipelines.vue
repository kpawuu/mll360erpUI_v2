<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pipelines</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage sales pipelines and workflows</p>
        </div>
        <button @click="showAddModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Pipeline
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Pipelines</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage sales pipelines</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ pipelinesStore.pagination.total || 0 }} pipelines
            </span>
          </div>
        </div>
      </div>
      
      <!-- Card Body -->
      <div class="p-6">
        <!-- Skeleton Loading for Filters -->
        <div v-if="pipelinesStore.loading" class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input Skeleton -->
          <div class="lg:col-span-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-3 animate-pulse"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
          </div>
          
          <!-- Status Filter Skeleton -->
          <div>
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-3 animate-pulse"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
          </div>
          
          <!-- Refresh Button Skeleton -->
          <div class="flex items-end">
            <div class="w-full h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
          </div>
          
          <!-- Quick Actions Skeleton -->
          <div class="flex items-end justify-end">
            <div class="w-full">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-3 animate-pulse"></div>
              <div class="w-full h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <!-- Actual Filters Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Pipelines</label>
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
                placeholder="Search by pipeline name or description..."
                :disabled="pipelinesStore.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="pipelinesStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <div class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              </div>
              <div v-else-if="isSearchDebouncing" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <div class="flex items-center space-x-2">
                  <div class="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div class="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style="animation-delay: 0.2s"></div>
                  <div class="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style="animation-delay: 0.4s"></div>
                </div>
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
              <span v-if="isSearchDebouncing" class="flex items-center">
                <div class="animate-pulse w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Debouncing search for: "{{ searchQuery }}"
              </span>
              <span v-else class="flex items-center justify-between">
                <span>Searching for: "{{ searchQuery }}"</span>
                <button
                  @click="() => { pipelinesStore.setPage(1); loadPipelines(); }"
                  class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Search Now
                </button>
              </span>
            </div>
          </div>
          
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</label>
            <select 
              v-model="selectedActive" 
              @change="onActiveFilterChange"
              :disabled="pipelinesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Pipelines</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>
          
          <!-- Refresh Button -->
          <div class="flex items-end">
            <button 
              @click="loadPipelines"
              :disabled="pipelinesStore.loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div v-if="pipelinesStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
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
                New Pipeline
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div v-if="pipelinesStore.loading" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <!-- Filter Summary Skeleton -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
              <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-24 animate-pulse"></div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="searchQuery || selectedActive" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ pipelinesStore.pagination.total || 0 }} result{{ (pipelinesStore.pagination.total || 0) !== 1 ? 's' : '' }}
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
    <div v-if="pipelinesStore.loading" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
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
              <!-- Pipeline Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </td>
              
              <!-- Description Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
              </td>
              
              <!-- Status Column Skeleton -->
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
      <!-- Enhanced Empty State -->
      <div v-if="!pipelinesStore.loading && (!pipelinesStore.pipelines || pipelinesStore.pipelines.length === 0)" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        <div class="flex flex-col items-center justify-center py-16 px-6">
          <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
            </div>
                  </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            {{ searchQuery || selectedActive ? 'No pipelines found' : 'No pipelines yet' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
            {{ searchQuery || selectedActive ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by adding pipelines to manage your sales workflows effectively.' }}
          </p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              v-if="searchQuery || selectedActive"
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
                    Add Pipeline
                  </button>
                </div>
        </div>
      </div>

      <!-- Enhanced Table View -->
      <div v-else-if="pipelinesStore.pipelines && pipelinesStore.pipelines.length > 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        <!-- Table Header with Summary -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Pipelines</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ pipelinesStore.pagination.total || 0 }} pipeline{{ (pipelinesStore.pagination.total || 0) !== 1 ? 's' : '' }} found</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                {{ activePipelineCount }} active
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Pipeline
                  </div>
                </th>
                <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Description
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
                    <svg class="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <tr v-for="pipeline in pipelinesStore.pipelines" :key="pipeline.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                <!-- Pipeline Column -->
                <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {{ pipeline.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        ID: {{ pipeline.id }}
                      </div>
                    </div>
                  </div>
                </td>
                
                <!-- Description Column -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                    {{ pipeline.description }}
                  </div>
                </td>
                
                <!-- Status Column -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <span v-if="pipeline.is_active" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 shadow-sm">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      Active
                    </span>
                    <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 shadow-sm">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      Inactive
                    </span>
                </div>
              </td>
                
                <!-- Created Date Column -->
              <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="text-sm text-gray-900 dark:text-white">
                      <div class="font-medium">{{ formatDate(pipeline.date_created) }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatTime(pipeline.date_created) }}
                      </div>
                    </div>
                  </div>
              </td>
                
                <!-- Actions Column -->
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button @click="openActivitiesModal(pipeline)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-800 transition-all duration-200 shadow-sm">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Activities
                    </button>
                    <button @click="editPipeline(pipeline)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-sm">
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                      Edit
                  </button>
                    <button @click="deletePipeline(pipeline.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200 shadow-sm">
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

      <!-- Pagination Controls -->
      <div v-if="pipelinesStore.loading" class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <!-- Pagination Skeleton -->
        <div class="flex items-center space-x-4">
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-8 animate-pulse"></div>
          <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-20 animate-pulse"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-20 animate-pulse"></div>
          <div class="flex space-x-1">
            <div v-for="n in 5" :key="n" class="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-10 animate-pulse"></div>
          </div>
          <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-16 animate-pulse"></div>
        </div>
      </div>
      
      <div v-else class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
          <select 
            v-model="pipelinesStore.pagination.limit" 
            @change="onLimitChange"
            :disabled="pipelinesStore.loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            of {{ pipelinesStore.pagination.total || 0 }} entries
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="previousPage" 
            :disabled="pipelinesStore.pagination.currentPage <= 1 || pipelinesStore.loading"
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
              :disabled="pipelinesStore.loading"
              :class="[
                'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                page === pipelinesStore.pagination.currentPage
                  ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="nextPage" 
            :disabled="pipelinesStore.pagination.currentPage >= totalPages || pipelinesStore.loading"
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

    <!-- Add/Edit Pipeline Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              {{ showEditModal ? 'Edit Pipeline' : 'Add Pipeline' }}
            </h3>
            <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <form @submit.prevent="savePipeline">
              <!-- Pipeline Information Section -->
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Pipeline Details
                  </h3>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter the pipeline information and configuration.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Pipeline Name -->
            <div>
                    <label for="pipeline-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pipeline Name</label>
              <input 
                      id="pipeline-name"
                v-model="pipelineForm.name"
                type="text" 
                required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                      placeholder="e.g. Sales Pipeline"
              >
            </div>
            
                  <!-- Active Status -->
                  <div class="flex items-center">
                    <input 
                      id="pipeline-active"
                      v-model="pipelineForm.is_active" 
                      type="checkbox" 
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    >
                    <label for="pipeline-active" class="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      Active Pipeline
                    </label>
                  </div>
                </div>
                
                <!-- Description -->
            <div>
                  <label for="pipeline-description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea 
                    id="pipeline-description"
                v-model="pipelineForm.description"
                rows="3"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="Enter a detailed description of this pipeline..."
              ></textarea>
            </div>
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
              @click="savePipeline" 
                :disabled="pipelinesStore.loading"
              class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              <div v-if="pipelinesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {{ showEditModal ? 'Update Pipeline' : 'Add Pipeline' }}
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

    <!-- Activities Modal -->
    <div v-if="showActivitiesModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-6xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Activities - {{ selectedPipelineForActivities?.name }}
                    </h3>
                    <button @click="showActivitiesModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
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
                            <p class="text-sm text-gray-600 dark:text-gray-400">Manage all activities related to this pipeline</p>
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
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Start tracking your pipeline interactions by adding your first activity.</p>
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

    <!-- Add Activity Modal -->
    <div v-if="showAddActivityModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New Activity
                    </h3>
                    <button @click="showAddActivityModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <form @submit.prevent="createActivity" class="space-y-6">
                        <!-- Activity Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Type *</label>
                            <select
                                v-model="activityForm.type"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="call">Phone Call</option>
                                <option value="email">Email</option>
                                <option value="online_meeting">Online Meeting</option>
                                <option value="physical_visit">Physical Visit</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <!-- Subject -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                            <input
                                v-model="activityForm.subject"
                                type="text"
                                required
                                placeholder="Enter activity subject"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                v-model="activityForm.description"
                                rows="3"
                                placeholder="Enter activity description"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                        </div>

                        <!-- Status -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                            <select
                                v-model="activityForm.status"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <!-- Date and Time -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date *</label>
                                <input
                                    v-model="activityForm.date_start"
                                    type="date"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date *</label>
                                <input
                                    v-model="activityForm.date_end"
                                    type="date"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time *</label>
                                <input
                                    v-model="activityForm.date_start_time"
                                    type="time"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time *</label>
                                <input
                                    v-model="activityForm.date_end_time"
                                    type="time"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                        </div>

                        <!-- Location -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                            <input
                                v-model="activityForm.location"
                                type="text"
                                placeholder="Enter location (optional)"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                        </div>

                        <!-- Notes -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                            <textarea
                                v-model="activityForm.notes"
                                rows="3"
                                placeholder="Enter additional notes (optional)"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                        </div>
                    </form>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                    <button 
                        @click="showAddActivityModal = false" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="createActivity" 
                        :disabled="activitiesStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="activitiesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Create Activity
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Activity Modal -->
    <div v-if="showEditActivityModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Activity
                    </h3>
                    <button @click="showEditActivityModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <form @submit.prevent="updateActivity" class="space-y-6">
                        <!-- Activity Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Type *</label>
                            <select
                                v-model="activityForm.type"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="call">Phone Call</option>
                                <option value="email">Email</option>
                                <option value="online_meeting">Online Meeting</option>
                                <option value="physical_visit">Physical Visit</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <!-- Subject -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                            <input
                                v-model="activityForm.subject"
                                type="text"
                                required
                                placeholder="Enter activity subject"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                v-model="activityForm.description"
                                rows="3"
                                placeholder="Enter activity description"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                        </div>

                        <!-- Status -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                            <select
                                v-model="activityForm.status"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <!-- Date and Time -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date *</label>
                                <input
                                    v-model="activityForm.date_start"
                                    type="date"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date *</label>
                                <input
                                    v-model="activityForm.date_end"
                                    type="date"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time *</label>
                                <input
                                    v-model="activityForm.date_start_time"
                                    type="time"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time *</label>
                                <input
                                    v-model="activityForm.date_end_time"
                                    type="time"
                                    required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                            </div>
                        </div>

                        <!-- Location -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                            <input
                                v-model="activityForm.location"
                                type="text"
                                placeholder="Enter location (optional)"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                        </div>

                        <!-- Notes -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                            <textarea
                                v-model="activityForm.notes"
                                rows="3"
                                placeholder="Enter additional notes (optional)"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                        </div>
                    </form>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                    <button 
                        @click="showEditActivityModal = false" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="updateActivity" 
                        :disabled="activitiesStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="activitiesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Update Activity
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePipelinesStore } from '../../store/pipelines.store'
import type { Pipelines } from '../../api/models/pipelines.model'

const pipelinesStore = usePipelinesStore()

// Reactive data
const searchQuery = ref('')
const selectedActive = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const editingPipeline = ref<Pipelines | null>(null)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => Promise<void>) | null>(null)
const searchDebounceTimer: NodeJS.Timeout | null = null
const isSearchDebouncing = ref(false)

// Activities modal state
const showActivitiesModal = ref(false)
// Activity-related reactive data - REMOVED: Pipelines are not a valid entity type for activities

// Activity form - REMOVED: Pipelines are not a valid entity type for activities

const pipelineForm = ref({
  name: '',
  description: '',
  is_active: true
})

// Computed properties
const activePipelineCount = computed(() => {
  return pipelinesStore.pipelines.filter(p => p.is_active).length
})

// Activities computed - REMOVED: Pipelines are not a valid entity type for activities

const loadPipelines = async () => {
  try {
    let query: any = {
      $sort: { date_created: -1 },
      $skip: (pipelinesStore.pagination.currentPage - 1) * pipelinesStore.pagination.limit,
      $limit: pipelinesStore.pagination.limit
    }
    
    // Add search filter
    if (searchQuery.value && searchQuery.value.trim()) {
      const searchTerm = searchQuery.value.trim()
      query.$or = [
        { name: { $like: `%${searchTerm}%` } },
        { description: { $like: `%${searchTerm}%` } }
      ]
    }
    
    // Add active filter
    if (selectedActive.value !== '') {
      query.is_active = selectedActive.value === 'true'
    }
    
    await pipelinesStore.fetchPipelines({ query })
  } catch (error) {
    console.error('Failed to load pipelines:', error)
  }
}

const onSearchChange = () => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  isSearchDebouncing.value = true
  searchDebounceTimer = setTimeout(() => {
  pipelinesStore.setPage(1)
  loadPipelines()
    isSearchDebouncing.value = false
  }, 3000)
}

const onActiveFilterChange = () => {
  pipelinesStore.setPage(1)
  loadPipelines()
}

const clearFilters = () => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = null
  }
  isSearchDebouncing.value = false
  searchQuery.value = ''
  selectedActive.value = ''
  pipelinesStore.setPage(1)
  loadPipelines()
}

const editPipeline = (pipeline: Pipelines) => {
  editingPipeline.value = pipeline
  pipelineForm.value = {
    name: pipeline.name,
    description: pipeline.description,
    is_active: pipeline.is_active
  }
  showEditModal.value = true
}

const savePipeline = async () => {
  try {
    if (showEditModal.value && editingPipeline.value) {
      // Update existing pipeline
      await pipelinesStore.updatePipeline(editingPipeline.value.id, {
        name: pipelineForm.value.name,
        description: pipelineForm.value.description,
        is_active: pipelineForm.value.is_active
      })
      showSuccessModal.value = true
      successMessage.value = 'Pipeline updated successfully!'
    } else {
      // Create new pipeline
      await pipelinesStore.createPipeline({
        name: pipelineForm.value.name,
        description: pipelineForm.value.description,
        is_active: pipelineForm.value.is_active,
        user_id: 1, // TODO: Get from auth store
        company_id: 1 // TODO: Get from auth store
      })
      showSuccessModal.value = true
      successMessage.value = 'Pipeline added successfully!'
    }
    
    closeModal()
    await loadPipelines()
  } catch (error) {
    console.error('Failed to save pipeline:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to save pipeline. Please try again.'
  }
}

const deletePipeline = async (id: number) => {
  confirmMessage.value = 'Are you sure you want to delete this pipeline? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await pipelinesStore.deletePipeline(id)
      showSuccessModal.value = true
      successMessage.value = 'Pipeline deleted successfully!'
      showConfirmModal.value = false
      await loadPipelines()
    } catch (error) {
      console.error('Failed to delete pipeline:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete pipeline. Please try again.'
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
  editingPipeline.value = null
  pipelineForm.value = {
    name: '',
    description: '',
    is_active: true
  }
  pipelinesStore.clearError()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const onLimitChange = async () => {
  pipelinesStore.setLimit(Number(pipelinesStore.pagination.limit))
  pipelinesStore.setPage(1) // Reset to first page when changing limit
  await loadPipelines()
}

const previousPage = () => {
  if (pipelinesStore.pagination.currentPage > 1) {
    pipelinesStore.setPage(pipelinesStore.pagination.currentPage - 1)
    loadPipelines()
  }
}

const nextPage = () => {
  if (pipelinesStore.pagination.currentPage < totalPages.value) {
    pipelinesStore.setPage(pipelinesStore.pagination.currentPage + 1)
    loadPipelines()
  }
}

const totalPages = computed(() => {
  return Math.ceil(pipelinesStore.pagination.total / pipelinesStore.pagination.limit)
})

const visiblePages = computed(() => {
  const current = pipelinesStore.pagination.currentPage || 1
  const total = totalPages.value || 1
  const pages: (number | string)[] = []
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number') {
    pipelinesStore.setPage(page)
    loadPipelines()
  }
}

// Activities functions
const openActivitiesModal = async (pipeline: Pipelines) => {
  selectedPipelineForActivities.value = pipeline
  showActivitiesModal.value = true
  await loadActivitiesForPipeline(pipeline.id)
}

// Activity-related functions - REMOVED: Pipelines are not a valid entity type for activities

onMounted(async () => {
  await loadPipelines()
})
</script>

<style scoped>
/* Add your styles here */
</style> 
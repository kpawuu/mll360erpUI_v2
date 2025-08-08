<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leads</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage and track potential customers</p>
        </div>
        <button
          @click="showAddModal = true"
          class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Lead
        </button>
      </div>
    </div>

    <!-- Debug Section (temporary) -->
    <div v-if="true" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Debug Info:</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <strong>Pipelines:</strong>
          <div>Loading: {{ pipelinesStore.loading }}</div>
          <div>Error: {{ pipelinesStore.error || 'None' }}</div>
          <div>Count: {{ pipelines.length }}</div>
          <div v-if="pipelines.length > 0">Names: {{ pipelines.map(p => p.name).join(', ') }}</div>
          <button @click="pipelinesStore.fetchPipelines()" class="mt-1 px-2 py-1 bg-blue-500 text-white rounded text-xs">
            Refresh Pipelines
          </button>
        </div>
        <div>
          <strong>Stages:</strong>
          <div>Loading: {{ stagesStore.loading }}</div>
          <div>Error: {{ stagesStore.error || 'None' }}</div>
          <div>Count: {{ stages.length }}</div>
          <div v-if="stages.length > 0">Names: {{ stages.map(s => s.name).join(', ') }}</div>
          <button @click="stagesStore.fetchStages()" class="mt-1 px-2 py-1 bg-green-500 text-white rounded text-xs">
            Refresh Stages
          </button>
        </div>
        <div>
          <strong>Leads:</strong>
          <div>Loading: {{ leadsStore.loading }}</div>
          <div>Error: {{ leadsStore.error || 'None' }}</div>
          <div>Count: {{ leadsStore.leads.length }}</div>
          <button @click="loadLeads()" class="mt-1 px-2 py-1 bg-purple-500 text-white rounded text-xs">
            Refresh Leads
          </button>
        </div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Leads</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage potential customers</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ leadsStore.pagination.total || 0 }} leads
            </span>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Leads</label>
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
                placeholder="Search by lead title, contact name, or company..."
                :disabled="leadsStore.loading"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="leadsStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                  @click="() => { leadsStore.setPage(1); loadLeads(); }"
                  class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Search Now
                </button>
              </span>
            </div>
          </div>

          <!-- Service Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Service Type</label>
            <select 
              v-model="selectedServiceType" 
              @change="onServiceTypeFilterChange"
              :disabled="leadsStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Services</option>
              <option value="Freight">Freight</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
          
          <!-- Pipeline Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pipeline</label>
            <select
              v-model="selectedPipeline" 
              @change="onPipelineFilterChange"
              :disabled="leadsStore.loading || pipelinesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Pipelines</option>
              <option v-if="pipelinesStore.loading" value="" disabled>Loading pipelines...</option>
              <option v-else-if="pipelinesStore.error" value="" disabled>Error loading pipelines</option>
              <option v-else-if="pipelines.length === 0" value="" disabled>No pipelines available - Run migrations first</option>
              <option v-else v-for="pipeline in pipelines" :key="pipeline.id" :value="pipeline.id">
                {{ pipeline.name }}
              </option>
            </select>
            <div v-if="pipelinesStore.error" class="mt-1 text-xs text-red-600 dark:text-red-400">
              {{ pipelinesStore.error }}
            </div>
          </div>

          <!-- Refresh Button -->
          <div class="flex items-end">
            <button
              @click="loadLeads"
              :disabled="leadsStore.loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div v-if="leadsStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Filter Summary -->
        <div v-if="searchQuery || selectedServiceType || selectedPipeline" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ leadsStore.pagination.total || 0 }} result{{ (leadsStore.pagination.total || 0) !== 1 ? 's' : '' }}
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
    <div v-if="leadsStore.loading" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
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
              <!-- Lead Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </td>

              <!-- Contact Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
              </td>

              <!-- Service Type Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </td>

              <!-- Value Column Skeleton -->
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
      <div v-if="!leadsStore.loading && (!leadsStore.leads || leadsStore.leads.length === 0)" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <div class="flex flex-col items-center justify-center py-16 px-6">
            <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-violet-500 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            {{ searchQuery || selectedServiceType || selectedPipeline ? 'No leads found' : 'No leads yet' }}
            </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
            {{ searchQuery || selectedServiceType || selectedPipeline ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by adding leads to track potential customers and opportunities.' }}
          </p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
              v-if="searchQuery || selectedServiceType || selectedPipeline"
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
                Add Lead
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Table View -->
      <div v-else-if="leadsStore.leads && leadsStore.leads.length > 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <!-- Table Header with Summary -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Leads</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ leadsStore.pagination.total || 0 }} lead{{ (leadsStore.pagination.total || 0) !== 1 ? 's' : '' }} found</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                {{ activeLeadsCount }} active
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Lead
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    Contact
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    Service Type
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                    Estimated Value
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
              <tr v-for="lead in leadsStore.leads" :key="lead.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <!-- Lead Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      </div>
                      <div class="flex-1">
                      <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {{ lead.title }}
                        </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ lead.company_name }}
                        </div>
                      </div>
                    </div>
                  </td>

                <!-- Contact Column -->
                  <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    <div class="font-medium">{{ lead.contact_name }}</div>
                    <div v-if="lead.contact_email" class="text-xs text-gray-500 dark:text-gray-400">
                      {{ lead.contact_email }}
                      </div>
                    </div>
                  </td>

                <!-- Service Type Column -->
                  <td class="px-6 py-4">
                  <div class="flex items-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 shadow-sm">
                      {{ lead.service_type }}
                    </span>
                    </div>
                  </td>

                <!-- Estimated Value Column -->
                  <td class="px-6 py-4">
                      <div class="text-sm text-gray-900 dark:text-white">
                    <div class="font-medium">${{ formatCurrency(lead.estimated_value) }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                      {{ formatDate(lead.expected_service_date) }}
                      </div>
                    </div>
                  </td>

                  <!-- Actions Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button @click="viewLeadDetails(lead)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        View
                      </button>
                      <button @click="editLead(lead)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                      </button>
                      <button v-if="lead.is_active" @click="convertToOpportunity(lead)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        Convert
                      </button>
                      <button @click="openActivitiesModal(lead)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Activities
                      </button>
                      <button @click="deleteLead(lead.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200 shadow-sm">
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
              v-model="leadsStore.pagination.limit" 
                @change="onLimitChange"
              :disabled="leadsStore.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-sm text-gray-600 dark:text-gray-400">
              of {{ leadsStore.pagination.total || 0 }} entries
              </span>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="previousPage" 
              :disabled="leadsStore.pagination.currentPage <= 1 || leadsStore.loading"
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
                :disabled="leadsStore.loading"
                  :class="[
                    'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                  page === leadsStore.pagination.currentPage
                      ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="nextPage" 
              :disabled="leadsStore.pagination.currentPage >= totalPages || leadsStore.loading"
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

    <!-- Add Lead Modal -->
    <div v-if="showAddModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New Lead
                    </h3>
                    <button @click="showAddModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                    <!-- Modal body -->
                    <div class="p-6 max-h-[70vh] overflow-y-auto">
                        <form @submit.prevent="createLead" class="space-y-8">
                            <!-- Basic Information -->
                            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lead Title *</label>
                                            <input
                                                v-model="leadForm.title"
                                                type="text"
                                                required
                                                placeholder="Enter lead title"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type *</label>
                                            <select
                                                v-model="leadForm.service_type"
                                                required
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                                <option value="Freight">Freight</option>
                                                <option value="Warehouse">Warehouse</option>
                                                <option value="Transport">Transport</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Contact Information -->
                            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                                v-model="leadForm.contact_name"
                                                type="text"
                                                required
                                                placeholder="Enter contact name"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                                            <input
                                                v-model="leadForm.contact_email"
                                                type="email"
                                                placeholder="Enter contact email"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Phone</label>
                                            <input
                                                v-model="leadForm.contact_phone"
                                                type="tel"
                                                placeholder="Enter contact phone"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Position</label>
                                            <input
                                                v-model="leadForm.contact_position"
                                                type="text"
                                                placeholder="Enter contact position"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Company Information -->
                            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                                v-model="leadForm.company_name"
                                                type="text"
                                                required
                                                placeholder="Enter company name"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Website</label>
                                            <input
                                                v-model="leadForm.company_website"
                                                type="url"
                                                placeholder="Enter company website"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div class="md:col-span-2">
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Address</label>
                                            <textarea
                                                v-model="leadForm.company_address"
                                                rows="3"
                                                placeholder="Enter company address"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Service Details -->
                            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                                v-model="leadForm.origin"
                                                type="text"
                                                required
                                                placeholder="Enter origin location"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination *</label>
                                            <input
                                                v-model="leadForm.destination"
                                                type="text"
                                                required
                                                placeholder="Enter destination location"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div class="md:col-span-2">
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cargo Description *</label>
                                            <textarea
                                                v-model="leadForm.cargo_description"
                                                rows="3"
                                                required
                                                placeholder="Describe the cargo or service requirements"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Value *</label>
                                            <input
                                                v-model.number="leadForm.estimated_value"
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                placeholder="Enter estimated value"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Service Date *</label>
                                            <input
                                                v-model="leadForm.expected_service_date"
                                                type="date"
                                                required
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pipeline & Stage -->
                            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                        Pipeline & Stage
                                    </h3>
                                </div>
                                <div class="p-6">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pipeline *</label>
                                            <select
                                                v-model="leadForm.pipeline_id"
                                                required
                                                @change="onPipelineChange"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                                <option value="">Select a pipeline</option>
                                                <option v-for="pipeline in pipelines" :key="pipeline.id" :value="pipeline.id">
                                                    {{ pipeline.name }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stage *</label>
                                            <select
                                                v-model="leadForm.stage_id"
                                                required
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                                <option value="">Select a stage</option>
                                                <option v-for="stage in availableStages" :key="stage.id" :value="stage.id">
                                                    {{ stage.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Status -->
                            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Status
                                    </h3>
                                </div>
                                <div class="p-6">
                                    <div class="flex items-center">
                                        <input
                                            v-model="leadForm.is_active"
                                            type="checkbox"
                                            id="is_active"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        >
                                        <label for="is_active" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                            Active Lead
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                        <button 
                            @click="showAddModal = false" 
                            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            @click="createLead" 
                            :disabled="leadsStore.loading"
                            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div v-if="leadsStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Create Lead
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Lead Modal -->
    <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Lead
                    </h3>
                    <button @click="showEditModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <form @submit.prevent="updateLead" class="space-y-8">
                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lead Title *</label>
                                        <input
                                            v-model="leadForm.title"
                                            type="text"
                                            required
                                            placeholder="Enter lead title"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type *</label>
                                        <select
                                            v-model="leadForm.service_type"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="Freight">Freight</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Transport">Transport</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                            v-model="leadForm.contact_name"
                                            type="text"
                                            required
                                            placeholder="Enter contact name"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                                        <input
                                            v-model="leadForm.contact_email"
                                            type="email"
                                            placeholder="Enter contact email"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Phone</label>
                                        <input
                                            v-model="leadForm.contact_phone"
                                            type="tel"
                                            placeholder="Enter contact phone"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Position</label>
                                        <input
                                            v-model="leadForm.contact_position"
                                            type="text"
                                            placeholder="Enter contact position"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Company Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                            v-model="leadForm.company_name"
                                            type="text"
                                            required
                                            placeholder="Enter company name"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Website</label>
                                        <input
                                            v-model="leadForm.company_website"
                                            type="url"
                                            placeholder="Enter company website"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Address</label>
                                        <textarea
                                            v-model="leadForm.company_address"
                                            rows="3"
                                            placeholder="Enter company address"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Service Details -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                            v-model="leadForm.origin"
                                            type="text"
                                            required
                                            placeholder="Enter origin location"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination *</label>
                                        <input
                                            v-model="leadForm.destination"
                                            type="text"
                                            required
                                            placeholder="Enter destination location"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cargo Description *</label>
                                        <textarea
                                            v-model="leadForm.cargo_description"
                                            rows="3"
                                            required
                                            placeholder="Describe the cargo or service requirements"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Value *</label>
                                        <input
                                            v-model.number="leadForm.estimated_value"
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter estimated value"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Service Date *</label>
                                        <input
                                            v-model="leadForm.expected_service_date"
                                            type="date"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pipeline & Stage -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    Pipeline & Stage
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pipeline *</label>
                                        <select
                                            v-model="leadForm.pipeline_id"
                                            required
                                            @change="onPipelineChange"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select a pipeline</option>
                                            <option v-for="pipeline in pipelines" :key="pipeline.id" :value="pipeline.id">
                                                {{ pipeline.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stage *</label>
                                        <select
                                            v-model="leadForm.stage_id"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select a stage</option>
                                            <option v-for="stage in availableStages" :key="stage.id" :value="stage.id">
                                                {{ stage.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Status -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Status
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="flex items-center">
                                    <input
                                        v-model="leadForm.is_active"
                                        type="checkbox"
                                        id="edit_is_active"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    >
                                    <label for="edit_is_active" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Active Lead
                                    </label>
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
                        @click="updateLead" 
                        :disabled="leadsStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="leadsStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Update Lead
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
                        @click="showSuccessModal = false" 
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
                        @click="showConfirmModal = false" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="confirmAction && confirmAction()" 
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

    <!-- View Lead Modal -->
    <div v-if="showViewModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        View Lead Details
                    </h3>
                    <button @click="showViewModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                                 <!-- Modal body -->
                 <div class="p-6 max-h-[70vh] overflow-y-auto" v-if="viewingLead">
                     <!-- Header with key info -->
                     <div class="mb-8">
                         <div class="flex items-start justify-between mb-4">
                             <div>
                                 <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ viewingLead.title }}</h2>
                                 <div class="flex items-center space-x-4">
                                     <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                         {{ viewingLead.service_type }}
                                     </span>
                                     <span :class="[
                                         'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                         viewingLead.is_active 
                                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                             : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                     ]">
                                         {{ viewingLead.is_active ? 'Active' : 'Inactive' }}
                                     </span>
                                 </div>
                             </div>
                             <div class="text-right">
                                 <div class="text-3xl font-bold text-green-600 dark:text-green-400">${{ formatCurrency(viewingLead.estimated_value) }}</div>
                                 <div class="text-sm text-gray-500 dark:text-gray-400">Estimated Value</div>
                             </div>
                         </div>
                     </div>

                     <!-- Main content grid -->
                     <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                         <!-- Left column -->
                         <div class="lg:col-span-2 space-y-6">
                             <!-- Contact & Company Info -->
                             <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                                         <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.contact_name }}</div>
                                                     </div>
                                                     <div v-if="viewingLead.contact_email">
                                                         <div class="text-sm text-gray-500 dark:text-gray-400">Email</div>
                                                         <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.contact_email }}</div>
                                                     </div>
                                                     <div v-if="viewingLead.contact_phone">
                                                         <div class="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                                                         <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.contact_phone }}</div>
                                                     </div>
                                                     <div v-if="viewingLead.contact_position">
                                                         <div class="text-sm text-gray-500 dark:text-gray-400">Position</div>
                                                         <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.contact_position }}</div>
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
                                                     <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Information</span>
                                                 </div>
                                                 <div class="ml-6 space-y-3">
                                                     <div>
                                                         <div class="text-sm text-gray-500 dark:text-gray-400">Company Name</div>
                                                         <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.company_name }}</div>
                                                     </div>
                                                     <div v-if="viewingLead.company_website">
                                                         <div class="text-sm text-gray-500 dark:text-gray-400">Website</div>
                                                         <div class="font-medium text-blue-600 dark:text-blue-400">
                                                             <a :href="viewingLead.company_website" target="_blank" class="hover:underline">{{ viewingLead.company_website }}</a>
                                                         </div>
                                                     </div>
                                                     <div v-if="viewingLead.company_address">
                                                         <div class="text-sm text-gray-500 dark:text-gray-400">Address</div>
                                                         <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.company_address }}</div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             <!-- Service Details -->
                             <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                             <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.origin }}</div>
                                         </div>
                                         <div>
                                             <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Destination</div>
                                             <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.destination }}</div>
                                         </div>
                                         <div class="md:col-span-2">
                                             <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Cargo Description</div>
                                             <div class="font-medium text-gray-900 dark:text-white">{{ viewingLead.cargo_description }}</div>
                                         </div>
                                         <div>
                                             <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Service Date</div>
                                             <div class="font-medium text-gray-900 dark:text-white">{{ formatDate(viewingLead.expected_service_date) }}</div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>

                         <!-- Right column -->
                         <div class="space-y-6">
                             <!-- Pipeline & Stage -->
                             <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                                 <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                     <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                         <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                         </svg>
                                         Pipeline & Stage
                                     </h3>
                                 </div>
                                 <div class="p-6 space-y-4">
                                     <div>
                                         <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Pipeline</div>
                                         <div class="font-medium text-gray-900 dark:text-white">
                                             {{ pipelines.find(p => p.id === viewingLead.pipeline_id)?.name || 'Unknown Pipeline' }}
                                         </div>
                                     </div>
                                     <div>
                                         <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Stage</div>
                                         <div class="font-medium text-gray-900 dark:text-white">
                                             {{ stages.find(s => s.id === viewingLead.stage_id)?.name || 'Unknown Stage' }}
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             <!-- Timestamps -->
                             <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                         <div class="font-medium text-gray-900 dark:text-white">{{ formatDate(viewingLead.date_created) }}</div>
                                     </div>
                                     <div v-if="viewingLead.date_updated">
                                         <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</div>
                                         <div class="font-medium text-gray-900 dark:text-white">{{ formatDate(viewingLead.date_updated) }}</div>
                                     </div>
                                 </div>
                             </div>

                             <!-- Quick Actions -->
                             <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                                 <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                     <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                         <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                         </svg>
                                         Quick Actions
                                     </h3>
                                 </div>
                                 <div class="p-6 space-y-3">
                                     <button 
                                         @click="editLead(viewingLead); showViewModal = false" 
                                         class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                     >
                                         <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                         </svg>
                                         Edit Lead
                                     </button>
                                     <button 
                                         @click="convertToOpportunity(viewingLead); showViewModal = false" 
                                         class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                     >
                                         <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                         </svg>
                                         Convert to Opportunity
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

    <!-- Convert to Opportunity Modal -->
    <div v-if="showConvertModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Convert to Opportunity
                    </h3>
                    <button @click="showConvertModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto" v-if="convertingLead">
                    <!-- Header with lead info -->
                    <div class="mb-8">
                        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                            <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Converting Lead: {{ convertingLead.title }}
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span class="text-blue-700 dark:text-blue-300 font-medium">Contact:</span>
                                    <span class="text-blue-900 dark:text-blue-100 ml-2">{{ convertingLead.contact_name }}</span>
                                </div>
                                <div>
                                    <span class="text-blue-700 dark:text-blue-300 font-medium">Company:</span>
                                    <span class="text-blue-900 dark:text-blue-100 ml-2">{{ convertingLead.company_name }}</span>
                                </div>
                                <div>
                                    <span class="text-blue-700 dark:text-blue-300 font-medium">Value:</span>
                                    <span class="text-blue-900 dark:text-blue-100 ml-2">${{ formatCurrency(convertingLead.estimated_value) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Opportunity Form -->
                    <form @submit.prevent="performConversion" class="space-y-8">
                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Opportunity Details
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Opportunity Title *</label>
                                        <input
                                            v-model="opportunityForm.title"
                                            type="text"
                                            required
                                            placeholder="Enter opportunity title"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                                        <select
                                            v-model="opportunityForm.type"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="one-time">One-time</option>
                                            <option value="contract">Contract</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount *</label>
                                        <input
                                            v-model.number="opportunityForm.amount"
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter amount"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency *</label>
                                        <select
                                            v-model="opportunityForm.currency_id"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select currency</option>
                                            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                                                {{ currency.code }} - {{ currency.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Probability (%) *</label>
                                        <input
                                            v-model.number="opportunityForm.probability"
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
                                            v-model="opportunityForm.expected_close_date"
                                            type="date"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                        <textarea
                                            v-model="opportunityForm.description"
                                            rows="3"
                                            placeholder="Enter opportunity description"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pipeline & Stage -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    Pipeline & Stage
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pipeline *</label>
                                        <select
                                            v-model="opportunityForm.pipeline_id"
                                            required
                                            @change="onOpportunityPipelineChange"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select a pipeline</option>
                                            <option v-for="pipeline in pipelines" :key="pipeline.id" :value="pipeline.id">
                                                {{ pipeline.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stage *</label>
                                        <select
                                            v-model="opportunityForm.stage_id"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select a stage</option>
                                            <option v-for="stage in availableStages" :key="stage.id" :value="stage.id">
                                                {{ stage.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Service Details -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type *</label>
                                        <select
                                            v-model="opportunityForm.service_type"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="Freight">Freight</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Transport">Transport</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Service Date *</label>
                                        <input
                                            v-model="opportunityForm.expected_service_date"
                                            type="date"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Origin *</label>
                                        <input
                                            v-model="opportunityForm.origin"
                                            type="text"
                                            required
                                            placeholder="Enter origin"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination *</label>
                                        <input
                                            v-model="opportunityForm.destination"
                                            type="text"
                                            required
                                            placeholder="Enter destination"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cargo Description *</label>
                                        <textarea
                                            v-model="opportunityForm.cargo_description"
                                            rows="3"
                                            required
                                            placeholder="Enter cargo description"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                    <button 
                        @click="showConvertModal = false" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="performConversion" 
                        :disabled="opportunitiesStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="opportunitiesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        Convert to Opportunity
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
                        Activities - {{ selectedLeadForActivities?.title }}
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
                            <p class="text-sm text-gray-600 dark:text-gray-400">Manage all activities related to this lead</p>
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
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Start tracking your lead interactions by adding your first activity.</p>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLeadsStore } from '../../store/leads.store'
import { usePipelinesStore } from '../../store/pipelines.store'
import { useStagesStore } from '../../store/stages.store'
import { useEntityStore } from '../../store/entity.store'
import { useEntityContactPersonStore } from '../../store/entity-contact-person.store'
import { useOpportunitiesStore } from '../../store/opportunities.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import { useActivitiesStore } from '../../store/activities.store'
import type { Leads } from '../../api/models/leads.model'
import type { Pipelines } from '../../api/models/pipelines.model'
import type { Stages } from '../../api/models/stages.model'
import type { Entity } from '../../api/models/entity.model'
import type { EntityContactPerson } from '../../api/models/entity-contact-person.model'
import type { CreateOpportunities } from '../../api/models/opportunities.model'
import type { Currencies } from '../../api/models/currencies.model'
import type { Activity, CreateActivity } from '../../api/models/activities.model'

const leadsStore = useLeadsStore()
const pipelinesStore = usePipelinesStore()
const stagesStore = useStagesStore()
const entityStore = useEntityStore()
const entityContactPersonStore = useEntityContactPersonStore()
const opportunitiesStore = useOpportunitiesStore()
const currenciesStore = useCurrenciesStore()
const activitiesStore = useActivitiesStore()

// Reactive data
const searchQuery = ref('')
const selectedServiceType = ref('')
const selectedPipeline = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const showViewModal = ref(false)
const showConvertModal = ref(false)
const editingLead = ref<Leads | null>(null)
const viewingLead = ref<Leads | null>(null)
const convertingLead = ref<Leads | null>(null)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => Promise<void>) | null>(null)
const searchDebounceTimer = ref<NodeJS.Timeout | null>(null)
const isSearchDebouncing = ref(false)

const leadForm = ref({
  title: '',
  contact_id: null as number | null,
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_position: '',
  entity_id: null as number | null,
  company_name: '',
  company_website: '',
  company_address: '',
  service_type: 'Freight' as 'Freight' | 'Warehouse' | 'Transport',
  origin: '',
  destination: '',
  cargo_description: '',
  estimated_value: 0,
  pipeline_id: 0,
  stage_id: 0,
  expected_service_date: '',
  is_active: true
})

const opportunityForm = ref({
  title: '',
  pipeline_id: 0,
  stage_id: 0,
  contact_id: null as number | null,
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_position: '',
  entity_id: null as number | null,
  company_name: '',
  company_website: '',
  company_address: '',
  currency_id: 1, // Default to USD
  amount: 0,
  probability: 50,
  type: 'one-time' as 'one-time' | 'contract',
  service_type: 'Freight' as 'Freight' | 'Warehouse' | 'Transport',
  origin: '',
  destination: '',
  cargo_description: '',
  expected_service_date: '',
  expected_close_date: '',
  description: '',
  is_active: true
})

const activityForm = ref({
  type: 'call' as 'call' | 'email' | 'online_meeting' | 'physical_visit' | 'other',
  subject: '',
  description: '',
  status: 'pending' as 'pending' | 'completed' | 'cancelled' | 'in_progress',
  date_start: '',
  date_end: '',
  date_start_time: '',
  date_end_time: '',
  location: '',
  notes: ''
})

// Activities modal state
const showActivitiesModal = ref(false)
const showAddActivityModal = ref(false)
const showEditActivityModal = ref(false)
const selectedLeadForActivities = ref<Leads | null>(null)
const editingActivity = ref<Activity | null>(null)
const viewingActivity = ref<Activity | null>(null)

// Computed properties
const activeLeadsCount = computed(() => {
  return leadsStore.leads.filter((l: Leads) => l.is_active).length
})

const pipelines = computed(() => {
  return pipelinesStore.pipelines || []
})

const stages = computed(() => {
  return stagesStore.stages || []
})

const currencies = computed(() => {
  return currenciesStore.currencies || []
})

const activities = computed(() => {
  return activitiesStore.activities || []
})

const totalPages = computed(() => {
  return Math.ceil(leadsStore.pagination.total / leadsStore.pagination.limit)
})

const visiblePages = computed(() => {
  const current = leadsStore.pagination.currentPage || 1
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

const availableStages = computed(() => {
  // Note: In the current schema, stages are global and not pipeline-specific
  // All stages are available for any pipeline selection
  return stages.value || []
})

// Methods
const loadLeads = async () => {
  try {
    let query: any = {
      $sort: { date_created: -1 },
      $skip: (leadsStore.pagination.currentPage - 1) * leadsStore.pagination.limit,
      $limit: leadsStore.pagination.limit
    }

    // Add search filter (case-insensitive)
    if (searchQuery.value && searchQuery.value.trim()) {
      const searchTerm = searchQuery.value.trim()
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { contact_name: { $regex: searchTerm, $options: 'i' } },
        { company_name: { $regex: searchTerm, $options: 'i' } }
      ]
    }
    
    // Add service type filter
    if (selectedServiceType.value) {
      query.service_type = selectedServiceType.value
    }
    
    // Add pipeline filter
    if (selectedPipeline.value) {
      query.pipeline_id = parseInt(selectedPipeline.value)
    }
    
    await leadsStore.fetchLeads({ query })
  } catch (error) {
    console.error('Failed to load leads:', error)
  }
}

const onSearchChange = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
  isSearchDebouncing.value = true
  searchDebounceTimer.value = setTimeout(() => {
    leadsStore.setPage(1)
    loadLeads()
    isSearchDebouncing.value = false
  }, 3000)
}

const onServiceTypeFilterChange = () => {
  leadsStore.setPage(1)
  loadLeads()
}

const onPipelineFilterChange = () => {
  leadsStore.setPage(1)
  loadLeads()
}

const clearFilters = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
    searchDebounceTimer.value = null
  }
  isSearchDebouncing.value = false
  searchQuery.value = ''
  selectedServiceType.value = ''
  selectedPipeline.value = ''
  leadsStore.setPage(1)
  loadLeads()
}

const editLead = (lead: Leads) => {
  editingLead.value = lead
  leadForm.value = {
    title: lead.title,
    contact_id: lead.contact_id || null,
    contact_name: lead.contact_name,
    contact_email: lead.contact_email || '',
    contact_phone: lead.contact_phone || '',
    contact_position: lead.contact_position || '',
    entity_id: lead.entity_id || null,
    company_name: lead.company_name,
    company_website: lead.company_website || '',
    company_address: lead.company_address || '',
    service_type: lead.service_type,
    origin: lead.origin,
    destination: lead.destination,
    cargo_description: lead.cargo_description,
    estimated_value: Number(lead.estimated_value) || 0,
    pipeline_id: lead.pipeline_id,
    stage_id: lead.stage_id,
    expected_service_date: lead.expected_service_date ? new Date(lead.expected_service_date).toISOString().split('T')[0] : '',
    is_active: lead.is_active
  }
  showEditModal.value = true
}

const viewLeadDetails = (lead: Leads) => {
  viewingLead.value = lead
  showViewModal.value = true
}

const convertToOpportunity = (lead: Leads) => {
  convertingLead.value = lead
  // Populate the opportunity form with lead data
  opportunityForm.value = {
    title: lead.title,
    pipeline_id: lead.pipeline_id,
    stage_id: lead.stage_id,
    contact_id: lead.contact_id || null,
    contact_name: lead.contact_name,
    contact_email: lead.contact_email || '',
    contact_phone: lead.contact_phone || '',
    contact_position: lead.contact_position || '',
    entity_id: lead.entity_id || null,
    company_name: lead.company_name,
    company_website: lead.company_website || '',
    company_address: lead.company_address || '',
    currency_id: 1, // Default to USD
    amount: lead.estimated_value,
    probability: 50,
    type: 'one-time' as 'one-time' | 'contract',
    service_type: lead.service_type,
    origin: lead.origin,
    destination: lead.destination,
    cargo_description: lead.cargo_description,
    expected_service_date: lead.expected_service_date ? new Date(lead.expected_service_date).toISOString().split('T')[0] : '',
    expected_close_date: lead.expected_service_date ? new Date(lead.expected_service_date).toISOString().split('T')[0] : '',
    description: `Converted from lead: ${lead.title}`,
    is_active: true
  }
  showConvertModal.value = true
}

const deleteLead = async (id: number) => {
  confirmMessage.value = 'Are you sure you want to delete this lead? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await leadsStore.deleteLead(id)
      showSuccessModal.value = true
      successMessage.value = 'Lead deleted successfully!'
      showConfirmModal.value = false
      await loadLeads()
    } catch (error) {
      console.error('Failed to delete lead:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete lead. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const onLimitChange = async () => {
  leadsStore.setLimit(Number(leadsStore.pagination.limit))
  leadsStore.setPage(1)
  await loadLeads()
}

const previousPage = () => {
  if (leadsStore.pagination.currentPage > 1) {
    leadsStore.setPage(leadsStore.pagination.currentPage - 1)
    loadLeads()
  }
}

const nextPage = () => {
  if (leadsStore.pagination.currentPage < totalPages.value) {
    leadsStore.setPage(leadsStore.pagination.currentPage + 1)
    loadLeads()
  }
}

const goToPage = (page: number | string) => {
  if (typeof page === 'number') {
    leadsStore.setPage(page)
    loadLeads()
  }
}

const createLead = async () => {
  try {
    // Prepare the data by removing null values for optional fields
    const leadData = {
      ...leadForm.value,
      estimated_value: Number(leadForm.value.estimated_value) || 0,
      contact_id: leadForm.value.contact_id || undefined,
      entity_id: leadForm.value.entity_id || undefined,
      contact_email: leadForm.value.contact_email || undefined,
      contact_phone: leadForm.value.contact_phone || undefined,
      contact_position: leadForm.value.contact_position || undefined,
      company_website: leadForm.value.company_website || undefined,
      company_address: leadForm.value.company_address || undefined
    }
    
    await leadsStore.createLead(leadData)
    showAddModal.value = false
    showSuccessModal.value = true
    successMessage.value = 'Lead created successfully!'
    resetLeadForm()
    await loadLeads()
  } catch (error) {
    console.error('Failed to create lead:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to create lead. Please try again.'
  }
}

const updateLead = async () => {
  if (!editingLead.value) return
  
  try {
    // Prepare the data by removing null values for optional fields
    const leadData = {
      ...leadForm.value,
      estimated_value: Number(leadForm.value.estimated_value) || 0,
      contact_id: leadForm.value.contact_id || undefined,
      entity_id: leadForm.value.entity_id || undefined,
      contact_email: leadForm.value.contact_email || undefined,
      contact_phone: leadForm.value.contact_phone || undefined,
      contact_position: leadForm.value.contact_position || undefined,
      company_website: leadForm.value.company_website || undefined,
      company_address: leadForm.value.company_address || undefined
    }
    
    await leadsStore.updateLead(editingLead.value.id, leadData)
    showEditModal.value = false
    showSuccessModal.value = true
    successMessage.value = 'Lead updated successfully!'
    editingLead.value = null
    resetLeadForm()
    await loadLeads()
  } catch (error) {
    console.error('Failed to update lead:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to update lead. Please try again.'
  }
}

const onPipelineChange = () => {
  // Note: In the current schema, stages are global and not pipeline-specific
  // We could optionally reset stage selection when pipeline changes
  // leadForm.value.stage_id = 0
}

const onOpportunityPipelineChange = () => {
  // Note: In the current schema, stages are global and not pipeline-specific
  // We could optionally reset stage selection when pipeline changes
  // opportunityForm.value.stage_id = 0
}

const resetLeadForm = () => {
  leadForm.value = {
    title: '',
    contact_id: null,
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_position: '',
    entity_id: null,
    company_name: '',
    company_website: '',
    company_address: '',
    service_type: 'Freight',
    origin: '',
    destination: '',
    cargo_description: '',
    estimated_value: 0,
    pipeline_id: 0,
    stage_id: 0,
    expected_service_date: '',
    is_active: true
  }
}

const resetOpportunityForm = () => {
  opportunityForm.value = {
    title: '',
    pipeline_id: 0,
    stage_id: 0,
    contact_id: null,
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_position: '',
    entity_id: null,
    company_name: '',
    company_website: '',
    company_address: '',
    currency_id: 1,
    amount: 0,
    probability: 50,
    type: 'one-time',
    service_type: 'Freight',
    origin: '',
    destination: '',
    cargo_description: '',
    expected_service_date: '',
    expected_close_date: '',
    description: '',
    is_active: true
  }
}

// Activities functions
const openActivitiesModal = async (lead: Leads) => {
  selectedLeadForActivities.value = lead
  showActivitiesModal.value = true
  await loadActivitiesForLead(lead.id)
}

const loadActivitiesForLead = async (leadId: number) => {
  try {
    await activitiesStore.fetchActivities({
      entity_type: 'crm/leads',
      entity_id: leadId,
      $sort: { date_created: -1 }
    })
  } catch (error) {
    console.error('Failed to load activities for lead:', error)
  }
}

const openAddActivityModal = () => {
  resetActivityForm()
  showAddActivityModal.value = true
}

const openEditActivityModal = (activity: Activity) => {
  editingActivity.value = activity
  activityForm.value = {
    type: activity.type,
    subject: activity.subject,
    description: activity.description || '',
    status: activity.status,
    date_start: activity.date_start,
    date_end: activity.date_end,
    date_start_time: activity.date_start_time,
    date_end_time: activity.date_end_time,
    location: activity.location || '',
    notes: activity.notes || ''
  }
  showEditActivityModal.value = true
}

const resetActivityForm = () => {
  activityForm.value = {
    type: 'call',
    subject: '',
    description: '',
    status: 'pending',
    date_start: '',
    date_end: '',
    date_start_time: '',
    date_end_time: '',
    location: '',
    notes: ''
  }
}

const createActivity = async () => {
  if (!selectedLeadForActivities.value) return
  
  try {
    const activityData: CreateActivity = {
      ...activityForm.value,
      user_id: 1, // Should be current user ID
      entity_type: 'crm/leads',
      entity_id: selectedLeadForActivities.value.id,
      company_id: 1 // Should be current user's company ID
    }
    
    await activitiesStore.createNewActivity(activityData)
    showAddActivityModal.value = false
    showSuccessModal.value = true
    successMessage.value = 'Activity created successfully!'
    resetActivityForm()
    await loadActivitiesForLead(selectedLeadForActivities.value.id)
  } catch (error) {
    console.error('Failed to create activity:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to create activity. Please try again.'
  }
}

const updateActivity = async () => {
  if (!editingActivity.value || !selectedLeadForActivities.value) return
  
  try {
    await activitiesStore.updateExistingActivity(editingActivity.value.id, activityForm.value)
    showEditActivityModal.value = false
    showSuccessModal.value = true
    successMessage.value = 'Activity updated successfully!'
    editingActivity.value = null
    resetActivityForm()
    await loadActivitiesForLead(selectedLeadForActivities.value.id)
  } catch (error) {
    console.error('Failed to update activity:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to update activity. Please try again.'
  }
}

const deleteActivity = async (activityId: number) => {
  if (!selectedLeadForActivities.value) return
  
  confirmMessage.value = 'Are you sure you want to delete this activity? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await activitiesStore.deleteExistingActivity(activityId)
      showSuccessModal.value = true
      successMessage.value = 'Activity deleted successfully!'
      showConfirmModal.value = false
      await loadActivitiesForLead(selectedLeadForActivities.value!.id)
    } catch (error) {
      console.error('Failed to delete activity:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete activity. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const getActivityTypeIcon = (type: string) => {
  switch (type) {
    case 'call':
      return 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    case 'email':
      return 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    case 'online_meeting':
      return 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    case 'physical_visit':
      return 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case 'call':
      return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
    case 'email':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
    case 'online_meeting':
      return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300'
    case 'physical_visit':
      return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300'
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300'
    case 'in_progress':
      return 'text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
    case 'pending':
      return 'text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
    case 'cancelled':
      return 'text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300'
    default:
      return 'text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-gray-300'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

onMounted(async () => {
  try {
    console.log('Loading leads, pipelines, and stages...')
    
    // Load data in parallel
    const [leadsResult, pipelinesResult, stagesResult, currenciesResult] = await Promise.allSettled([
      loadLeads(),
      pipelinesStore.fetchPipelines(),
      stagesStore.fetchStages(),
      currenciesStore.fetchCurrencies()
    ])
    
    // Log results for debugging
    console.log('Leads loading result:', leadsResult.status)
    console.log('Pipelines loading result:', pipelinesResult.status)
    console.log('Stages loading result:', stagesResult.status)
    
    if (pipelinesResult.status === 'rejected') {
      console.error('Failed to load pipelines:', pipelinesResult.reason)
    }
    
    if (stagesResult.status === 'rejected') {
      console.error('Failed to load stages:', stagesResult.reason)
    }
    
    // Log the actual data
    console.log('Pipelines data:', pipelines.value)
    console.log('Stages data:', stages.value)
    
  } catch (error) {
    console.error('Error in onMounted:', error)
  }
})

const performConversion = async () => {
  if (!convertingLead.value) return
  
  try {
    // Create opportunity data from form
    const opportunityData: CreateOpportunities = {
      title: opportunityForm.value.title,
      pipeline_id: opportunityForm.value.pipeline_id,
      stage_id: opportunityForm.value.stage_id,
      company_id: 1, // Default company ID - should be dynamic
      owner_id: 1, // Default owner ID - should be current user
      contact_id: opportunityForm.value.contact_id || undefined,
      contact_name: opportunityForm.value.contact_name,
      contact_email: opportunityForm.value.contact_email || undefined,
      contact_phone: opportunityForm.value.contact_phone || undefined,
      contact_position: opportunityForm.value.contact_position || undefined,
      entity_id: opportunityForm.value.entity_id || undefined,
      company_name: opportunityForm.value.company_name,
      company_website: opportunityForm.value.company_website || undefined,
      company_address: opportunityForm.value.company_address || undefined,
      currency_id: opportunityForm.value.currency_id,
      amount: Number(opportunityForm.value.amount) || 0,
      probability: Number(opportunityForm.value.probability) || 50,
      type: opportunityForm.value.type,
      service_type: opportunityForm.value.service_type,
      origin: opportunityForm.value.origin,
      destination: opportunityForm.value.destination,
      cargo_description: opportunityForm.value.cargo_description,
      expected_service_date: opportunityForm.value.expected_service_date,
      expected_close_date: opportunityForm.value.expected_close_date,
      description: opportunityForm.value.description,
      lead_id: convertingLead.value.id,
      is_active: opportunityForm.value.is_active
    }
    
    // Create the opportunity
    await opportunitiesStore.createOpportunity(opportunityData)
    
    // Update the lead to mark it as converted
    await leadsStore.updateLead(convertingLead.value.id, {
      is_active: false,
      converted_at: new Date().toISOString(),
      converted_by: 1 // Default user ID - should be current user
    })
    
    showConvertModal.value = false
    showSuccessModal.value = true
    successMessage.value = 'Lead successfully converted to opportunity!'
    convertingLead.value = null
    resetOpportunityForm()
    
    // Refresh the leads list
    await loadLeads()
    
  } catch (error) {
    console.error('Failed to convert lead to opportunity:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to convert lead to opportunity. Please try again.'
  }
}
</script>
<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Opportunities</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage and track your sales opportunities</p>
        </div>
            <button 
          @click="showAddModal = true"
          class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          :disabled="loading"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
          Add Opportunity
            </button>
            </div>
          </div>

    <!-- Debug Section (temporary) -->
    <div v-if="debug" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Debug Info:</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <strong>Opportunities:</strong>
          <div>Loading: {{ loading }}</div>
          <div>Error: {{ error || 'None' }}</div>
          <div>Count: {{ opportunities.length }}</div>
        </div>
              <div>
          <strong>Pipelines:</strong>
          <div>Count: {{ pipelines.length }}</div>
          <div v-if="pipelines.length > 0">Names: {{ pipelines.map(p => p.name).join(', ') }}</div>
              </div>
              <div>
          <strong>Stages:</strong>
          <div>Count: {{ stages.length }}</div>
          <div v-if="stages.length > 0">Names: {{ stages.map(s => s.name).join(', ') }}</div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
              <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Opportunities</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage sales opportunities</p>
              </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ opportunities.length }} opportunities
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
                v-model="searchQuery"
                @input="onSearchChange"
                type="text"
                placeholder="Search by title, contact, company, origin, destination, cargo, or description..."
                :disabled="opportunitiesStore.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="opportunitiesStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                <span>Searching across all fields for: "{{ searchQuery }}"</span>
                <button
                  @click="() => { paginationCurrentPage = 1; fetchOpportunities(); }"
                  class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Search Now
                </button>
              </span>
            </div>
          </div>

          <!-- Active Filters Section -->
          <div v-if="searchQuery || selectedPipeline || selectedStage || selectedUser" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Active Filters</h3>
          <button 
                @click="clearFilters"
                class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Clear All
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-if="searchQuery" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                Search: "{{ searchQuery }}"
                <button @click="searchQuery = ''; fetchOpportunities()" class="ml-2 text-blue-600 hover:text-blue-800">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
              </span>
              <span v-if="selectedPipeline" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Pipeline: {{ pipelines.find(p => p.id === parseInt(selectedPipeline))?.name }}
                <button @click="selectedPipeline = ''; fetchOpportunities()" class="ml-2 text-green-600 hover:text-green-800">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
              <span v-if="selectedStage" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Stage: {{ stages.find(s => s.id === parseInt(selectedStage))?.name }}
                <button @click="selectedStage = ''; fetchOpportunities()" class="ml-2 text-purple-600 hover:text-purple-800">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
              <span v-if="selectedUser" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                User: {{ users.find(u => u.id === parseInt(selectedUser))?.first_name }} {{ users.find(u => u.id === parseInt(selectedUser))?.last_name }}
                <button @click="selectedUser = ''; fetchOpportunities()" class="ml-2 text-orange-600 hover:text-orange-800">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
        </div>
      </div>
          
          <!-- Pipeline Filter -->
              <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pipeline</label>
            <select
              v-model="selectedPipeline"
              @change="onPipelineFilterChange"
              :disabled="opportunitiesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Pipelines</option>
              <option v-for="pipeline in pipelines" :key="pipeline.id" :value="pipeline.id">
                {{ pipeline.name }}
              </option>
            </select>
    </div>

          <!-- Stage Filter -->
              <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Stage</label>
            <select
              v-model="selectedStage"
              @change="onStageFilterChange"
              :disabled="opportunitiesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Stages</option>
              <option v-for="stage in stages" :key="stage.id" :value="stage.id">
                {{ stage.name }}
              </option>
            </select>
      </div>
      
          <!-- Refresh Button -->
          <div class="flex items-end">
          <button 
              @click="fetchOpportunities"
              :disabled="opportunitiesStore.loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
              Refresh
          </button>
        </div>
            </div>
        </div>
      </div>
      
    <!-- View Toggle -->
    <div class="flex items-center justify-center mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
        <div class="flex space-x-1">
            <button 
              @click="viewMode = 'table'" 
              :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2',
                viewMode === 'table' 
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
            <span>Table View</span>
            </button>
            <button 
              @click="viewMode = 'kanban'" 
              :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2',
                viewMode === 'kanban' 
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
            <span>Kanban View</span>
            </button>
        </div>
          </div>
        </div>
        
    <!-- Loading State with Skeletons -->
    <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
              <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Opportunities</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Loading opportunities...</p>
              </div>
              </div>
            </div>
          
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-4">Opportunity</th>
              <th scope="col" class="px-6 py-4">Contact</th>
              <th scope="col" class="px-6 py-4">Pipeline</th>
              <th scope="col" class="px-6 py-4">Stage</th>
              <th scope="col" class="px-6 py-4">Amount</th>
              <th scope="col" class="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 5" :key="i" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <!-- Opportunity Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse mr-4"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse mb-2"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
          </div>
                </div>
              </td>

              <!-- Contact Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse mb-2"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
              </td>

              <!-- Pipeline Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
              </td>

              <!-- Stage Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
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

    <!-- Error State -->
    <div v-else-if="error" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <div class="flex flex-col items-center justify-center py-16 px-6">
        <div class="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Error Loading Opportunities</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">{{ error }}</p>
        <button @click="fetchOpportunities" class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Try Again
        </button>
            </div>
          </div>
          
    <!-- Empty State -->
    <div v-else-if="opportunities.length === 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <div class="flex flex-col items-center justify-center py-16 px-6">
        <div class="relative">
          <div class="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-violet-500 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          {{ searchQuery || selectedPipeline || selectedStage ? 'No opportunities found' : 'No opportunities yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
          {{ searchQuery || selectedPipeline || selectedStage ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by adding opportunities to track potential sales and revenue.' }}
        </p>
        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            v-if="searchQuery || selectedPipeline || selectedStage"
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
            Add Opportunity
          </button>
              </div>
            </div>
          </div>
          
    <!-- Table View -->
    <div v-else-if="viewMode === 'table'" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Enhanced Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
        <div class="relative px-8 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
            </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Opportunities Table</h3>
                <p class="text-blue-100 text-sm mt-1">Comprehensive view of all sales opportunities</p>
              </div>
              </div>
            <div class="flex items-center space-x-4">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-white font-semibold">{{ opportunities.length }} Active</span>
            </div>
          </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <span class="text-white font-semibold">{{ formatCurrency(opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0), 1) }}</span>
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
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
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
                  <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
          </div>
                  Pipeline & Stage
        </div>
              </th>
              <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
      </div>
                  Financial
                </div>
              </th>
              <th scope="col" class="px-8 py-6 text-gray-700 dark:text-gray-300 font-semibold">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
                  Status
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
            <tr v-for="opportunity in opportunities" :key="opportunity.id" class="bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-200 group">
              <!-- Opportunity Column -->
              <td class="px-8 py-6">
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transition-all duration-200">
                      <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                    <div class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {{ opportunity.title }}
                    </h4>
                    <div class="flex items-center space-x-3">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        {{ opportunity.service_type }}
                </span>
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300">
                        {{ opportunity.type || 'N/A' }}
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
              
              <!-- Pipeline & Stage Column -->
              <td class="px-8 py-6">
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl flex items-center justify-center">
                      <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
            </div>
            <div>
                      <div class="font-semibold text-gray-900 dark:text-white">{{ getPipelineName(opportunity.pipeline_id) }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Pipeline</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
            </div>
            <div>
                      <div class="font-semibold text-gray-900 dark:text-white">{{ getStageName(opportunity.stage_id) }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Stage</div>
            </div>
          </div>
        </div>
              </td>
              
              <!-- Financial Column -->
              <td class="px-8 py-6">
                <div class="space-y-3">
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-3 border border-blue-200 dark:border-blue-800">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {{ formatCurrency(opportunity.amount, opportunity.currency_id) }}
      </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Total Value</div>
    </div>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300" :style="{ width: opportunity.probability + '%' }"></div>
                    </div>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white min-w-[3rem]">{{ opportunity.probability }}%</span>
                  </div>
                </div>
              </td>
              
              <!-- Status Column -->
              <td class="px-8 py-6">
                <div class="space-y-3">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-sm font-semibold text-green-600 dark:text-green-400">Active</span>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(opportunity.date_created) }}
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500">
                    Created {{ formatDate(opportunity.date_created) }}
                  </div>
                </div>
              </td>
              
              <!-- Actions Column -->
              <td class="px-8 py-6">
                <div class="flex items-center space-x-2">
                  <button @click="viewOpportunity(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 transition-all duration-200 group/btn">
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
                  <button @click="showActivitiesModal(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-200 group/btn">
                    <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Activities
                  </button>
                  <button @click="markAsWon(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 hover:border-emerald-300 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-900/30 transition-all duration-200 group/btn">
                    <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Mark as Won
                  </button>
                  <button @click="deleteOpportunity(opportunity)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30 transition-all duration-200 group/btn">
                    <svg class="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            v-model="paginationLimit" 
            @change="onLimitChange"
            :disabled="opportunitiesStore.loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            of {{ opportunitiesStore.pagination.total || 0 }} entries
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
            <button 
            @click="previousPage" 
            :disabled="paginationCurrentPage <= 1 || opportunitiesStore.loading"
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
              :disabled="opportunitiesStore.loading"
              :class="[
                'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                page === paginationCurrentPage
                  ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="nextPage" 
            :disabled="paginationCurrentPage >= totalPages || opportunitiesStore.loading"
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
        
    <!-- Kanban View -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <KanbanBoard
        :opportunities="opportunities"
        :stages="stages"
        :users="users"
        :currencies="currencies"
        @opportunity-moved="handleOpportunityMoved"
        @view-opportunity="viewOpportunity"
        @edit-opportunity="editOpportunity"
        @delete-opportunity="deleteOpportunity"
        @show-activities="showActivitiesModal"
      />
      </div>
      
    <!-- Add/Edit Opportunity Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
                        {{ showEditModal ? 'Edit Opportunity' : 'Add New Opportunity' }}
          </h3>
                    <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
                    </button>
    </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <form @submit.prevent="saveOpportunity" class="space-y-8">
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
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                                        <input
                                            v-model="formData.title"
                                            type="text"
                                            required
                                            placeholder="Enter opportunity title"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type *</label>
                                        <select
                                            v-model="formData.service_type"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="Freight">Freight</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Transport">Transport</option>
                                        </select>
            </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pipeline *</label>
                                        <select
                                            v-model="formData.pipeline_id"
                                            required
                                            @change="onPipelineChange"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select Pipeline</option>
                                            <option v-for="pipeline in pipelines" :key="pipeline.id" :value="pipeline.id">
                                                {{ pipeline.name }}
                                            </option>
                                        </select>
          </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stage *</label>
                                        <select
                                            v-model="formData.stage_id"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select Stage</option>
                                            <option v-for="stage in filteredStages" :key="stage.id" :value="stage.id">
                                                {{ stage.name }}
                                            </option>
                                        </select>
          </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                                        <select
                                            v-model="formData.type"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="one-time">One Time</option>
                                            <option value="contract">Contract</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                                        <select
                                            v-model="formData.currency_id"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select Currency</option>
                                            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                                                {{ currency.currency_name }} ({{ currency.symbol }})
                                            </option>
                                        </select>
                                    </div>
                                </div>
        </div>
      </div>

                        <!-- Financial Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
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
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
                                        <input
                                            v-model.number="formData.amount"
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter amount"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Probability (%)</label>
                                        <input
                                            v-model.number="formData.probability"
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="Enter probability"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
          </div>
        </div>
      </div>

                        <!-- Contact Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            v-model="formData.contact_name"
                                            type="text"
                                            required
                                            placeholder="Enter contact name"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                                        <input
                                            v-model="formData.contact_email"
                                            type="email"
                                            placeholder="Enter contact email"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Phone</label>
                                        <input
                                            v-model="formData.contact_phone"
                                            type="tel"
                                            placeholder="Enter contact phone"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
          </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                                        <input
                                            v-model="formData.company_name"
                                            type="text"
                                            required
                                            placeholder="Enter company name"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
          </div>
        </div>
      </div>

                        <!-- Cargo Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                    Cargo Information
          </h3>
        </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Origin *</label>
                                        <input
                                            v-model="formData.origin"
                                            type="text"
                                            required
                                            placeholder="Enter origin"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
                                    <div>
                                        <label class="label block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination *</label>
                                        <input
                                            v-model="formData.destination"
                                            type="text"
                                            required
                                            placeholder="Enter destination"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
          </div>
                                <div class="mt-6">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cargo Description *</label>
                                    <textarea
                                        v-model="formData.cargo_description"
                                        rows="3"
                                        required
                                        placeholder="Enter cargo description"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    ></textarea>
          </div>
        </div>
      </div>

                        <!-- Dates -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Important Dates
          </h3>
        </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Service Date *</label>
                                        <input
                                            v-model="formData.expected_service_date"
                                            type="date"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Close Date *</label>
                                        <input
                                            v-model="formData.expected_close_date"
                                            type="date"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
            </div>
          </div>
        </div>
      </div>

                        <!-- Description -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                                    Additional Information
          </h3>
        </div>
                            <div class="p-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                    <textarea
                                        v-model="formData.description"
                                        rows="4"
                                        placeholder="Enter additional description"
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
                        @click="closeModal" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="saveOpportunity" 
                        :disabled="saving"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="saving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {{ saving ? 'Saving...' : (showEditModal ? 'Update' : 'Create') }}
                    </button>
        </div>
      </div>
    </div>
  </div>
  
        <!-- View Opportunity Modal -->
    <div v-if="showViewModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-2xl">
        <!-- Modal header -->
                <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-2xl">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
                    <div class="relative flex items-center justify-between p-8">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white">Opportunity Details</h3>
                                <p class="text-blue-100 text-sm mt-1">Comprehensive view of opportunity information</p>
                            </div>
                        </div>
                        <button @click="closeModal" class="text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl text-sm w-10 h-10 inline-flex justify-center items-center transition-all duration-200 shadow-lg hover:shadow-xl">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
                    </div>
        </div>
        
        <!-- Modal body -->
                <div class="p-8 max-h-[70vh] overflow-y-auto">
                    <div v-if="selectedOpportunity" class="space-y-8">
                        <!-- Opportunity Title & Status -->
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">{{ selectedOpportunity.title }}</h2>
                            <div class="flex items-center justify-center space-x-4">
                                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    {{ selectedOpportunity.service_type || 'N/A' }}
                                </span>
                                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                    </svg>
                                    {{ selectedOpportunity.probability }}% Probability
                                </span>
                            </div>
              </div>
              
                        <!-- Key Metrics -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Amount</span>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ formatCurrency(selectedOpportunity.amount, selectedOpportunity.currency_id) }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Total opportunity value</p>
                </div>
                
                            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Stage</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ getStageName(selectedOpportunity.stage_id) }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Current pipeline stage</p>
                </div>
                
                            <div class="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Pipeline</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ getPipelineName(selectedOpportunity.pipeline_id) }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Sales pipeline</p>
                            </div>
                        </div>

                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
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
                                            <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ selectedOpportunity.type || 'N/A' }}</p>
                                        </div>
                                        <div>
                                            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Service Type</span>
                                            <p class="text-lg font-medium text-gray-900 dark:text-white mt-1">{{ selectedOpportunity.service_type || 'N/A' }}</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4">
                                        <div>
                                            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Probability</span>
                                            <div class="flex items-center mt-1">
                                                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                                                    <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" :style="{ width: selectedOpportunity.probability + '%' }"></div>
                                                </div>
                                                <span class="text-lg font-bold text-gray-900 dark:text-white">{{ selectedOpportunity.probability }}%</span>
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
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</span>
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatCurrency(selectedOpportunity.amount, selectedOpportunity.currency_id) }}</p>
                    </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Probability</span>
                                    <p class="text-sm text-gray-900 dark:text-white">{{ selectedOpportunity.probability }}%</p>
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
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedOpportunity.contact_name }}</p>
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
                                                <p class="text-lg font-medium text-gray-900 dark:text-white">{{ selectedOpportunity.contact_email || 'Not provided' }}</p>
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
                                                <p class="text-lg font-medium text-gray-900 dark:text-white">{{ selectedOpportunity.contact_phone || 'Not provided' }}</p>
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
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedOpportunity.company_name }}</p>
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
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                        <div class="flex items-center space-x-3 mb-3">
                                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m5-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                                </svg>
                                            </div>
                <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Origin</span>
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedOpportunity.origin }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                        <div class="flex items-center space-x-3 mb-3">
                                            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Destination</span>
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedOpportunity.destination }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </div>
                                        <div class="flex-1">
                                            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cargo Description</span>
                                            <p class="text-lg font-medium text-gray-900 dark:text-white mt-1 leading-relaxed">{{ selectedOpportunity.cargo_description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                
                                                <!-- Dates -->
                        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    Important Dates
                                </h4>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Service Date</span>
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatDate(selectedOpportunity.expected_service_date) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Close Date</span>
                                                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatDate(selectedOpportunity.expected_close_date) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                
                        <!-- Description -->
                        <div v-if="selectedOpportunity.description" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                </div>
                                    Additional Information
                                </h4>
              </div>
                            <div class="p-6">
                                <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
            </div>
                                        <div class="flex-1">
                                            <p class="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">{{ selectedOpportunity.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        
        <!-- Modal footer -->
                <div class="flex items-center justify-between p-8 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-b-2xl">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Last updated: {{ formatDate(selectedOpportunity.date_updated || selectedOpportunity.date_created) }}</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
          <button 
                            @click="closeModal" 
                            class="px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            Close
          </button>
          <button 
                            @click="editOpportunity(selectedOpportunity)" 
                            class="inline-flex items-center px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit Opportunity
          </button>
                    </div>
        </div>
      </div>
    </div>
  </div>
  
        <!-- Confirm Delete Modal -->
    <div v-if="showConfirmModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-600 to-pink-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        Confirm Delete
          </h3>
                    <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
        
        <!-- Modal body -->
                <div class="p-6">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Opportunity</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">
                            Are you sure you want to delete the opportunity <strong>"{{ opportunityToDelete?.title }}"</strong>?
                        </p>
                        <p class="text-sm text-red-600 dark:text-red-400 font-medium">This action cannot be undone.</p>
                    </div>
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
                        @click="deleteOpportunity" 
                        :disabled="deleting"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="deleting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {{ deleting ? 'Deleting...' : 'Delete' }}
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

  <!-- Opportunity Win Modal -->
  <OpportunityWinModal
    :show="showWinModal"
    :opportunity="opportunityToWin"
    :currencies="currencies"
    @close="showWinModal = false"
    @win-processed="handleWinProcessed"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useOpportunitiesStore } from '../../store/opportunities.store'
import { usePipelinesStore } from '../../store/pipelines.store'
import { useStagesStore } from '../../store/stages.store'
import { useUserStore } from '../../store/user.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import { useActivitiesStore } from '../../store/activities.store'
import KanbanBoard from '../../components/crm/KanbanBoard.vue'
import OpportunityWinModal from '../../components/crm/OpportunityWinModal.vue'

import type { Opportunities, CreateOpportunities, UpdateOpportunities } from '../../api/models/opportunities.model'
import type { Activity } from '../../api/models/activities.model'

// Stores
const opportunitiesStore = useOpportunitiesStore()
const pipelinesStore = usePipelinesStore()
const stagesStore = useStagesStore()
const usersStore = useUserStore()
const currenciesStore = useCurrenciesStore()
const activitiesStore = useActivitiesStore()

// Reactive data
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const activitiesLoading = ref(false)
const error = ref('')
const searchQuery = ref('')
const viewMode = ref<'table' | 'kanban'>('table')
const debug = ref(false)
const searchDebounceTimer = ref<NodeJS.Timeout | null>(null)
const isSearchDebouncing = ref(false)

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showWinModal = ref(false)
const showConfirmModal = ref(false)
const showActivitiesModalFlag = ref(false)
const showAddActivityModal = ref(false)
const showEditActivityModal = ref(false)

// Selected items
const selectedOpportunity = ref<Opportunities | null>(null)
const opportunityToWin = ref<Opportunities | null>(null)
const opportunityToDelete = ref<Opportunities | null>(null)
const selectedActivity = ref<Activity | null>(null)

// Filters
const selectedPipeline = ref('')
const selectedStage = ref('')
const selectedUser = ref('')

// Form data
const formData = reactive<Partial<CreateOpportunities>>({
  title: '',
  pipeline_id: 0,
  stage_id: 0,
  amount: 0,
  probability: 0,
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_position: '',
  company_name: '',
  company_website: '',
  company_address: '',
  currency_id: 0,
  type: 'one-time',
  service_type: 'Freight',
  origin: '',
  destination: '',
  cargo_description: '',
  expected_service_date: '',
  expected_close_date: '',
  description: '',
  is_active: true
})

// Activity form data
const activityForm = reactive({
  type: 'call',
  subject: '',
  description: '',
  status: 'pending',
  date_start: '',
  date_end: '',
  date_start_time: '',
  date_end_time: '',
  location: '',
  notes: '',
  entity_type: 'crm/opportunities',
  entity_id: 0
})

// Computed properties
const opportunities = computed(() => opportunitiesStore.opportunities)
const pipelines = computed(() => pipelinesStore.pipelines)
const stages = computed(() => stagesStore.stages)
const users = computed(() => usersStore.users)
const currencies = computed(() => currenciesStore.currencies)
const activities = computed(() => activitiesStore.activities)

// Pagination computed properties
const paginationLimit = computed({
  get: () => opportunitiesStore.pagination.limit,
  set: (value: number) => {
    opportunitiesStore.setLimit(value)
  }
})

const paginationCurrentPage = computed({
  get: () => opportunitiesStore.pagination.currentPage,
  set: (value: number) => {
    opportunitiesStore.setPage(value)
  }
})

const filteredStages = computed(() => {
  // Since stages don't have pipeline_id in the current model, return all stages
  // In a real implementation, you might want to filter by stage type or other criteria
  return stages.value
})

const totalPages = computed(() => {
  return Math.ceil(opportunitiesStore.pagination.total / opportunitiesStore.pagination.limit)
})

const visiblePages = computed(() => {
  const current = opportunitiesStore.pagination.currentPage || 1
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

// Search and filter functions
const onSearchChange = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
  isSearchDebouncing.value = true
  searchDebounceTimer.value = setTimeout(() => {
    paginationCurrentPage.value = 1
    fetchOpportunities()
    isSearchDebouncing.value = false
  }, 3000)
}

const onPipelineFilterChange = () => {
  paginationCurrentPage.value = 1
  fetchOpportunities()
}

const onStageFilterChange = () => {
  paginationCurrentPage.value = 1
  fetchOpportunities()
}

// Methods
const fetchOpportunities = async () => {
  loading.value = true
  error.value = ''
  
  try {
    let query: any = {
      $sort: { date_created: -1 },
      $skip: (paginationCurrentPage.value - 1) * paginationLimit.value,
      $limit: paginationLimit.value
    }

    // Add search filter (case-insensitive)
    if (searchQuery.value && searchQuery.value.trim()) {
      const searchTerm = searchQuery.value.trim()
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { contact_name: { $regex: searchTerm, $options: 'i' } },
        { contact_email: { $regex: searchTerm, $options: 'i' } },
        { company_name: { $regex: searchTerm, $options: 'i' } },
        { company_website: { $regex: searchTerm, $options: 'i' } },
        { origin: { $regex: searchTerm, $options: 'i' } },
        { destination: { $regex: searchTerm, $options: 'i' } },
        { cargo_description: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    }
    
    // Add pipeline filter
    if (selectedPipeline.value) {
      query.pipeline_id = parseInt(selectedPipeline.value)
    }
    
    // Add stage filter
    if (selectedStage.value) {
      query.stage_id = parseInt(selectedStage.value)
    }
    
    // Add user filter
    if (selectedUser.value) {
      query.owner_id = parseInt(selectedUser.value)
    }
    
    console.log('fetchOpportunities called with query:', query)
    console.log('Search term:', searchQuery.value)
    console.log('Search query structure:', query.$or)
    
    await opportunitiesStore.fetchOpportunities({ query })
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch opportunities'
  } finally {
    loading.value = false
  }
}

const fetchRelatedData = async () => {
  try {
    await Promise.all([
      pipelinesStore.fetchPipelines(),
      stagesStore.fetchStages(),
      usersStore.fetchUsers(),
      currenciesStore.fetchCurrencies()
    ])
  } catch (err: any) {
    console.error('Failed to fetch related data:', err)
  }
}

const resetForm = () => {
  Object.assign(formData, {
    title: '',
    pipeline_id: 0,
    stage_id: 0,
    amount: 0,
    probability: 0,
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_position: '',
    company_name: '',
    company_website: '',
    company_address: '',
    currency_id: 0,
    type: 'one-time',
    service_type: 'Freight',
    origin: '',
    destination: '',
    cargo_description: '',
    expected_service_date: '',
    expected_close_date: '',
    description: '',
    is_active: true
  })
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showConfirmModal.value = false
  showActivitiesModalFlag.value = false
  showAddActivityModal.value = false
  selectedOpportunity.value = null
  opportunityToDelete.value = null
  resetForm()
}

const saveOpportunity = async () => {
  saving.value = true
  
  try {
    // Basic validation
    if (!formData.title?.trim()) {
      error.value = 'Title is required'
      return
    }
    if (!formData.contact_name?.trim()) {
      error.value = 'Contact name is required'
      return
    }
    if (!formData.company_name?.trim()) {
      error.value = 'Company name is required'
      return
    }
    if (!formData.origin?.trim()) {
      error.value = 'Origin is required'
      return
    }
    if (!formData.destination?.trim()) {
      error.value = 'Destination is required'
      return
    }
    if (!formData.cargo_description?.trim()) {
      error.value = 'Cargo description is required'
      return
    }
    
    // Ensure numeric fields are properly typed and dates are formatted
    const dataToSave = {
      ...formData,
      amount: typeof formData.amount === 'string' ? parseFloat(formData.amount) || 0 : formData.amount,
      probability: typeof formData.probability === 'string' ? parseFloat(formData.probability) || 0 : formData.probability,
      pipeline_id: typeof formData.pipeline_id === 'string' ? parseInt(formData.pipeline_id) || 0 : formData.pipeline_id,
      stage_id: typeof formData.stage_id === 'string' ? parseInt(formData.stage_id) || 0 : formData.stage_id,
      currency_id: typeof formData.currency_id === 'string' ? parseInt(formData.currency_id) || 0 : formData.currency_id,
      expected_service_date: formData.expected_service_date ? new Date(formData.expected_service_date).toISOString() : '',
      expected_close_date: formData.expected_close_date ? new Date(formData.expected_close_date).toISOString() : ''
    }
    
    console.log('Saving opportunity data:', dataToSave)
    
    if (showEditModal.value && selectedOpportunity.value) {
      await opportunitiesStore.updateOpportunity(selectedOpportunity.value.id, dataToSave as UpdateOpportunities)
  } else {
      await opportunitiesStore.createOpportunity(dataToSave as CreateOpportunities)
    }
    
    closeModal()
    await fetchOpportunities()
  } catch (err: any) {
    console.error('Error saving opportunity:', err)
    error.value = err.message || 'Failed to save opportunity'
  } finally {
    saving.value = false
  }
}

const viewOpportunity = (opportunity: Opportunities) => {
  selectedOpportunity.value = opportunity
  showViewModal.value = true
}

const editOpportunity = (opportunity: Opportunities) => {
  selectedOpportunity.value = opportunity
  Object.assign(formData, {
    title: opportunity.title,
    pipeline_id: opportunity.pipeline_id,
    stage_id: opportunity.stage_id,
    amount: typeof opportunity.amount === 'string' ? parseFloat(opportunity.amount) || 0 : opportunity.amount,
    probability: typeof opportunity.probability === 'string' ? parseFloat(opportunity.probability) || 0 : opportunity.probability,
    contact_name: opportunity.contact_name,
    contact_email: opportunity.contact_email,
    contact_phone: opportunity.contact_phone,
    contact_position: opportunity.contact_position,
    company_name: opportunity.company_name,
    company_website: opportunity.company_website,
    company_address: opportunity.company_address,
    currency_id: opportunity.currency_id,
    type: opportunity.type,
    service_type: opportunity.service_type,
    origin: opportunity.origin,
    destination: opportunity.destination,
    cargo_description: opportunity.cargo_description,
    expected_service_date: opportunity.expected_service_date ? new Date(opportunity.expected_service_date).toISOString().split('T')[0] : '',
    expected_close_date: opportunity.expected_close_date ? new Date(opportunity.expected_close_date).toISOString().split('T')[0] : '',
    description: opportunity.description,
    is_active: opportunity.is_active
  })
  showEditModal.value = true
}

const confirmDelete = (opportunity: Opportunities) => {
  opportunityToDelete.value = opportunity
  showConfirmModal.value = true
}

const deleteOpportunity = async () => {
  if (!opportunityToDelete.value) return
  
  deleting.value = true
  
  try {
    await opportunitiesStore.deleteOpportunity(opportunityToDelete.value.id)
    closeModal()
    await fetchOpportunities()
  } catch (err: any) {
    error.value = err.message || 'Failed to delete opportunity'
  } finally {
    deleting.value = false
  }
}

const markAsWon = (opportunity: Opportunities) => {
  opportunityToWin.value = opportunity
  showWinModal.value = true
}

const handleWinProcessed = async (result: any) => {
  console.log('Opportunity win processed:', result)
  // Refresh opportunities to show updated status
  await fetchOpportunities()
}

const showActivitiesModal = async (opportunity: Opportunities) => {
  selectedOpportunity.value = opportunity
  showActivitiesModalFlag.value = true
  await fetchActivities(opportunity.id)
}

const fetchActivities = async (opportunityId: number) => {
  activitiesLoading.value = true
  
  try {
    await activitiesStore.fetchActivities({ opportunity_id: opportunityId })
  } catch (err: any) {
    console.error('Failed to fetch activities:', err)
  } finally {
    activitiesLoading.value = false
  }
}

const onPipelineChange = () => {
  formData.stage_id = 0
}

const clearFilters = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
    searchDebounceTimer.value = null
  }
  isSearchDebouncing.value = false
  searchQuery.value = ''
  selectedPipeline.value = ''
  selectedStage.value = ''
  selectedUser.value = ''
  paginationCurrentPage.value = 1
  fetchOpportunities()
}

// Helper methods
const getPipelineName = (pipelineId: number) => {
  const pipeline = pipelines.value.find(p => p.id === pipelineId)
  return pipeline?.name || 'Unknown'
}

const getStageName = (stageId: number) => {
  const stage = stages.value.find(s => s.id === stageId)
  return stage?.name || 'Unknown'
}

const getUserName = (userId: number) => {
  const user = users.value.find(u => u.id === userId)
  return user ? `${user.first_name} ${user.last_name}` : 'Unassigned'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number | string, currencyId: number) => {
  const currency = currencies.value.find(c => c.id === currencyId)
  const numAmount = typeof amount === 'number' ? amount : parseFloat(amount || '0')
  if (!currency || !numAmount) return '$0.00'
  return `${currency.symbol}${numAmount.toFixed(2)}`
}

const getOpportunitiesByStage = (stageId: number) => {
  return opportunities.value.filter(opp => opp.stage_id === stageId)
}

// Pagination functions
const onLimitChange = async () => {
  console.log('onLimitChange called, new limit:', paginationLimit.value)
  // Reset to first page when changing limit
  paginationCurrentPage.value = 1
  await fetchOpportunities()
}

const previousPage = () => {
  console.log('previousPage called, current page:', paginationCurrentPage.value)
  if (paginationCurrentPage.value > 1) {
    paginationCurrentPage.value = paginationCurrentPage.value - 1
    fetchOpportunities()
  }
}

const nextPage = () => {
  console.log('nextPage called, current page:', paginationCurrentPage.value, 'total pages:', totalPages.value)
  if (paginationCurrentPage.value < totalPages.value) {
    paginationCurrentPage.value = paginationCurrentPage.value + 1
    fetchOpportunities()
  }
}

const goToPage = (page: number | string) => {
  console.log('goToPage called, page:', page)
  if (typeof page === 'number') {
    paginationCurrentPage.value = page
    fetchOpportunities()
  }
}

// Activity helper functions
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

// Activity functions
const openAddActivityModal = () => {
  resetActivityForm()
  activityForm.entity_id = selectedOpportunity.value?.id || 0
  showAddActivityModal.value = true
}

const openEditActivityModal = (activity: Activity) => {
  selectedActivity.value = activity
  Object.assign(activityForm, {
    type: activity.type,
    subject: activity.subject,
    description: activity.description || '',
    status: activity.status,
    date_start: activity.date_start ? new Date(activity.date_start).toISOString().split('T')[0] : '',
    date_end: activity.date_end ? new Date(activity.date_end).toISOString().split('T')[0] : '',
    date_start_time: activity.date_start_time || '',
    date_end_time: activity.date_end_time || '',
    location: activity.location || '',
    notes: activity.notes || '',
    entity_type: 'crm/opportunities',
    entity_id: selectedOpportunity.value?.id || 0
  })
  showEditActivityModal.value = true
}

const resetActivityForm = () => {
  const today = new Date().toISOString().split('T')[0]
  Object.assign(activityForm, {
    type: 'call',
    subject: '',
    description: '',
    status: 'pending',
    date_start: today,
    date_end: today,
    date_start_time: '09:00',
    date_end_time: '10:00',
    location: '',
    notes: '',
    entity_type: 'crm/opportunities',
    entity_id: 0
  })
}

const createActivity = async () => {
  try {
    // Ensure dates are properly formatted as YYYY-MM-DD
    const formatDate = (dateStr: string) => {
      if (!dateStr) return new Date().toISOString().split('T')[0]
      
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr
      }
      
      // Try to parse and format the date
      try {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) {
          return new Date().toISOString().split('T')[0]
        }
        return date.toISOString().split('T')[0]
      } catch {
        return new Date().toISOString().split('T')[0]
      }
    }
    
    // Create clean data object with only allowed fields
    const formattedData = {
      type: activityForm.type,
      subject: activityForm.subject,
      description: activityForm.description,
      status: activityForm.status,
      date_start: formatDate(activityForm.date_start),
      date_end: formatDate(activityForm.date_end),
      date_start_time: activityForm.date_start_time || '09:00',
      date_end_time: activityForm.date_end_time || '10:00',
      location: activityForm.location,
      notes: activityForm.notes,
      entity_type: 'crm/opportunities',
      entity_id: selectedOpportunity.value?.id || 0,
      user_id: usersStore.currentUser?.id || 1,
      company_id: usersStore.currentUser?.company_id || 1
    }
    
    console.log('Creating activity with data:', formattedData)
    console.log('date_start type:', typeof formattedData.date_start, 'value:', formattedData.date_start)
    console.log('date_end type:', typeof formattedData.date_end, 'value:', formattedData.date_end)
    console.log('date_start matches YYYY-MM-DD:', /^\d{4}-\d{2}-\d{2}$/.test(formattedData.date_start))
    console.log('date_end matches YYYY-MM-DD:', /^\d{4}-\d{2}-\d{2}$/.test(formattedData.date_end))
    
    await activitiesStore.createNewActivity(formattedData)
    showAddActivityModal.value = false
    resetActivityForm()
    await fetchActivities()
  } catch (err: any) {
    error.value = err.message || 'Failed to create activity'
  }
}

const updateActivity = async () => {
  if (!selectedActivity.value) return
  
  try {
    // Ensure dates are properly formatted as YYYY-MM-DD
    const formatDate = (dateStr: string) => {
      if (!dateStr) return new Date().toISOString().split('T')[0]
      
      // If it's already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr
      }
      
      // Try to parse and format the date
      try {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) {
          return new Date().toISOString().split('T')[0]
        }
        return date.toISOString().split('T')[0]
      } catch {
        return new Date().toISOString().split('T')[0]
      }
    }
    
    // Create clean data object with only allowed fields for update
    const formattedData = {
      type: activityForm.type,
      subject: activityForm.subject,
      description: activityForm.description,
      status: activityForm.status,
      date_start: formatDate(activityForm.date_start),
      date_end: formatDate(activityForm.date_end),
      date_start_time: activityForm.date_start_time || '09:00',
      date_end_time: activityForm.date_end_time || '10:00',
      location: activityForm.location,
      notes: activityForm.notes,
      entity_type: 'crm/opportunities',
      entity_id: selectedOpportunity.value?.id || 0,
      user_id: usersStore.currentUser?.id || selectedActivity.value.user_id,
      company_id: usersStore.currentUser?.company_id || selectedActivity.value.company_id
    }
    
    console.log('Updating activity with data:', formattedData)
    console.log('date_start type:', typeof formattedData.date_start, 'value:', formattedData.date_start)
    console.log('date_end type:', typeof formattedData.date_end, 'value:', formattedData.date_end)
    console.log('date_start matches YYYY-MM-DD:', /^\d{4}-\d{2}-\d{2}$/.test(formattedData.date_start))
    console.log('date_end matches YYYY-MM-DD:', /^\d{4}-\d{2}-\d{2}$/.test(formattedData.date_end))
    
    await activitiesStore.updateExistingActivity(selectedActivity.value.id, formattedData)
    showEditActivityModal.value = false
    resetActivityForm()
    selectedActivity.value = null
    await fetchActivities()
  } catch (err: any) {
    error.value = err.message || 'Failed to update activity'
  }
}

const deleteActivity = async (activityId: number) => {
  if (confirm('Are you sure you want to delete this activity?')) {
    try {
      await activitiesStore.deleteExistingActivity(activityId)
      await fetchActivities()
    } catch (err: any) {
      error.value = err.message || 'Failed to delete activity'
    }
  }
}

// Handle opportunity movement in kanban board
const handleOpportunityMoved = async (opportunityId: number, newStageId: number) => {
  try {
    const opportunity = opportunities.value.find(opp => opp.id === opportunityId)
    if (!opportunity) {
      console.error('Opportunity not found:', opportunityId)
      return
    }

    // Only update the stage_id field to avoid validation issues with other fields
    const updateData = {
      stage_id: newStageId
    }

    console.log('Moving opportunity to stage:', updateData)
    await opportunitiesStore.updateOpportunity(opportunityId, updateData)
    
    // Show success feedback
    console.log(`Opportunity ${opportunity.title} moved to stage ${newStageId}`)
    
    // Optionally refresh the opportunities list
    await fetchOpportunities()
  } catch (err: any) {
    console.error('Failed to move opportunity:', err)
    error.value = err.message || 'Failed to move opportunity'
  }
}

// Lifecycle
onMounted(async () => {
  await fetchRelatedData()
  await fetchOpportunities()
})

// No watchers needed - using direct function calls like in Leads.vue
</script>

<style scoped>
/* Custom styles for line-clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

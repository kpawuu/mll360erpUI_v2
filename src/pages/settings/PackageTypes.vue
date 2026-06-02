<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Package Types Management</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage different types of packages for your operations</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="exportCsv"
            :disabled="packageTypeStore.loading || displayedPackageTypes.length === 0"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export CSV
          </button>
          <button @click="showCreateModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 border border-blue-500">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Package Type
          </button>
        </div>
      </div>
    </div>

        <!-- Search and Filters Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Package Types</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage your package types</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {{ packageTypeStore.pagination?.total ?? 0 }} types
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Card Body -->
            <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    <!-- Search Input -->
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Package Types</label>
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
                                placeholder="Search by type name, description, or notes..."
                                :disabled="packageTypeStore.loading"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                            <div v-if="packageTypeStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                                <button type="button" @click="packageTypeStore.setPage(1); loadPackageTypes()" class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800">Search Now</button>
                            </span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sort by</label>
                        <select v-model="sortField" @change="onSortOrModeChange" :disabled="packageTypeStore.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50">
                            <option value="type">Type name</option>
                            <option value="date_created">Date created</option>
                            <option value="mode">Mode</option>
                            <option value="defined_quantity">Defined quantity</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mode</label>
                        <select v-model="filterMode" @change="onSortOrModeChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="">All</option>
                            <option value="Air">Air</option>
                            <option value="Sea">Sea</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>
                    <!-- Refresh Button -->
                    <div class="flex items-end">
        <button 
          @click="loadPackageTypes" 
          :disabled="packageTypeStore.loading"
                            class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
                            <div v-if="packageTypeStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
          Refresh
        </button>
      </div>
                    
                    <!-- View Mode Toggle -->
                    <div class="flex items-end justify-end">
                        <div class="w-full">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">View</label>
                            <div class="inline-flex rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden" role="group">
                                <button
                                    @click="viewMode = 'table'"
                                    :class="['px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center', viewMode === 'table' ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20']"
                                    :disabled="packageTypeStore.loading"
                                    title="Table view"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    Table
                                </button>
                                <button 
                                    @click="viewMode = 'grid'"
                                    :class="[
                                        'px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center',
                                        viewMode === 'grid'
                                            ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm'
                                            : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'
                                    ]"
                                    :disabled="packageTypeStore.loading"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                    </svg>
                                    Grid
                                </button>
                                <button 
                                    @click="viewMode = 'list'"
                                    :class="[
                                        'px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center',
                                        viewMode === 'list'
                                            ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm'
                                            : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'
                                    ]"
                                    :disabled="packageTypeStore.loading"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                    </svg>
                                    List
                                </button>
                            </div>
                        </div>
                    </div>
    </div>

                <div v-if="hasFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Found {{ packageTypeStore.pagination?.total ?? 0 }} result(s)</span>
                    <button @click="clearFilters" class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>

        <!-- Error message -->
        <div v-if="packageTypeStore.error" class="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-between">
            <p class="text-red-700 dark:text-red-300 text-sm">{{ packageTypeStore.error }}</p>
            <button @click="packageTypeStore.clearError(); loadPackageTypes()" class="text-red-600 dark:text-red-400 hover:underline text-sm font-medium">Dismiss</button>
        </div>

        <!-- Loading State with Skeleton Loaders -->
    <div v-if="packageTypeStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <!-- Header skeleton -->
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    </div>
                    <div class="flex space-x-2">
                        <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
                
                <!-- Info skeleton -->
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
      </div>
    </div>

                <!-- Buttons skeleton -->
                <div class="flex space-x-2">
                    <div class="flex-1 h-9 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    <div class="flex-1 h-9 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Package Types Display -->
        <div v-else>
            <!-- Empty State -->
            <div v-if="displayedPackageTypes.length === 0" class="flex flex-col items-center justify-center py-20">
                <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {{ hasFilters ? 'No package types match filters' : 'No package types yet' }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
                    {{ hasFilters ? 'Try adjusting your search or clear filters.' : 'Get started by adding your first package type to organize your operations.' }}
                </p>
                <div class="flex space-x-4">
                    <button 
                        v-if="hasFilters"
                        @click="clearFilters"
                        class="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-colors"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Clear Filters
                    </button>
                    <button 
                        @click="showCreateModal = true"
                        class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Package Type
                    </button>
                </div>
            </div>

            <!-- Table View -->
            <div v-else-if="viewMode === 'table'" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Package Types</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ packageTypeStore.pagination?.total ?? 0 }} type(s) found</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-4">Type</th>
                                <th scope="col" class="px-6 py-4">Description</th>
                                <th scope="col" class="px-6 py-4">Mode</th>
                                <th scope="col" class="px-6 py-4">Defined quantity</th>
                                <th scope="col" class="px-6 py-4">Created</th>
                                <th scope="col" class="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="packageType in displayedPackageTypes" :key="packageType.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                                <td class="px-6 py-4">
                                    <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ packageType.type }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ packageType.description || '—' }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">{{ packageType.mode }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ packageType.defined_quantity }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ formatDate(packageType.date_created) }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <button @click="editPackageType(packageType)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            Edit
                                        </button>
                                        <button @click="deletePackageType(packageType.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Grid View -->
            <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="packageType in displayedPackageTypes" :key="packageType.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
        <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ packageType.type }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ packageType.mode }} • {{ packageType.defined_quantity }}</p>
          </div>
                        </div>
                        <div class="flex space-x-1">
                            <button @click="editPackageType(packageType)" class="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
                            <button @click="deletePackageType(packageType.id)" class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
                    <div class="space-y-3 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Type:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ packageType.type }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Description:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ packageType.description || 'N/A' }}</span>
          </div>
                        <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Mode:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ packageType.mode }}</span>
          </div>
                        <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Defined Quantity:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ packageType.defined_quantity }}</span>
          </div>
                        <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Created:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ formatDate(packageType.date_created) }}</span>
          </div>
        </div>

        <div class="flex space-x-2">
                        <button @click="editPackageType(packageType)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit Type
                        </button>
                        <button @click="deletePackageType(packageType.id)" class="flex-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Delete
          </button>
        </div>
      </div>
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
                <div v-for="packageType in displayedPackageTypes" :key="packageType.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ packageType.type }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ packageType.mode }} • {{ packageType.defined_quantity }}</p>
                                <div class="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Description: {{ packageType.description || 'N/A' }}</span>
                                    <span>Created: {{ formatDate(packageType.date_created) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="editPackageType(packageType)" class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button @click="deletePackageType(packageType.id)" class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                Delete
      </button>
                        </div>
                    </div>
                </div>
            </div>
                <!-- Pagination for List -->
                <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
                    <div class="flex items-center space-x-4">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
                        <select v-model.number="pageSize" @change="onPageSizeChange" :disabled="packageTypeStore.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50">
                            <option :value="10">10</option>
                            <option :value="25">25</option>
                            <option :value="50">50</option>
                        </select>
                        <span class="text-sm text-gray-600 dark:text-gray-400">of {{ packageTypeStore.pagination?.total ?? 0 }} entries</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button @click="goToPage(packageTypeStore.pagination.currentPage - 1)" :disabled="packageTypeStore.pagination.currentPage <= 1 || packageTypeStore.loading" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50">Previous</button>
                        <div class="flex space-x-1">
                            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :disabled="packageTypeStore.loading" :class="['inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50', page === packageTypeStore.pagination.currentPage ? 'text-blue-600 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700']">{{ page }}</button>
                        </div>
                        <button @click="goToPage(packageTypeStore.pagination.currentPage + 1)" :disabled="packageTypeStore.pagination.currentPage >= totalPages || packageTypeStore.loading" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50">Next</button>
                    </div>
                </div>
    </div>
  </div>

  <!-- Create/Edit Modal -->
  <div v-if="showCreateModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            {{ showEditModal ? 'Edit Package Type' : 'Create New Package Type' }}
        </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form @submit.prevent="savePackageType">
            <!-- Package Type Information Section -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  Package Type Details
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Define the type, mode, and quantity settings for this package category.</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Package Type Name -->
          <div>
                  <label for="package-type-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Type Name</label>
            <input 
                    id="package-type-name"
              v-model="packageTypeForm.type" 
              type="text" 
              required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
              placeholder="Container"
            >
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Enter a descriptive name for this package type.
                  </p>
          </div>
          
                <!-- Mode -->
          <div>
                  <label for="package-mode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mode</label>
            <select 
                    id="package-mode"
              v-model="packageTypeForm.mode" 
              required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
            >
              <option value="">Select Mode</option>
              <option value="Air">Air</option>
              <option value="Sea">Sea</option>
              <option value="Both">Both</option>
            </select>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Choose the transportation mode for this package type.
                  </p>
                </div>
              </div>
              
              <!-- Description -->
              <div>
                <label for="package-description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea 
                  id="package-description"
                  v-model="packageTypeForm.description" 
                  rows="3"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                  placeholder="Enter a detailed description of this package type..."
                ></textarea>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Provide a clear description to help identify this package type.
                </p>
              </div>
              
              <!-- Notes -->
              <div>
                <label for="package-notes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <textarea 
                  id="package-notes"
                  v-model="packageTypeForm.notes" 
                  rows="2"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                  placeholder="Enter additional notes or special instructions..."
                ></textarea>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Add any additional notes or special handling instructions.
                </p>
          </div>
          
              <!-- Defined Quantity -->
          <div>
                <label for="defined-quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Defined Quantity</label>
            <select 
                  id="defined-quantity"
              v-model="packageTypeForm.defined_quantity" 
              required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
            >
              <option value="">Select Quantity Type</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Specify whether this package type has a defined quantity.
                </p>
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
            @click="savePackageType" 
              :disabled="packageTypeStore.loading"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <div v-if="packageTypeStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ showEditModal ? 'Update Package Type' : 'Create Package Type' }}
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
                        @click="confirmAction()" 
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
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { usePackageTypeStore } from '../../store/package-type.store'
import type { PackageType } from '../../api/models/package-type.model'

const packageTypeStore = usePackageTypeStore()

const searchQuery = ref('')
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const isSearchDebouncing = ref(false)
const filterMode = ref('')
const sortField = ref<'type' | 'date_created' | 'mode' | 'defined_quantity'>('type')
const viewMode = ref<'table' | 'grid' | 'list'>('table')
const pageSize = ref(10)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedPackageType = ref<PackageType | null>(null)
const editingPackageType = ref<PackageType | null>(null)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => void)>(() => {})

const packageTypeForm = ref({
  type: '',
  description: '',
  notes: '',
  mode: '' as 'Air' | 'Sea' | 'Both',
  defined_quantity: '' as 'Yes' | 'No'
})

// Data comes from backend; no client-side filtering
const displayedPackageTypes = computed(() => packageTypeStore.packageTypes)

const hasFilters = computed(() => !!searchQuery.value || !!filterMode.value)

const totalPages = computed(() =>
  Math.max(1, Math.ceil((packageTypeStore.pagination?.total ?? 0) / (packageTypeStore.pagination?.limit || 10)))
)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = packageTypeStore.pagination?.currentPage ?? 1
  const delta = 2
  const range: number[] = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  return range
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

function loadPackageTypes() {
  const sortKey = sortField.value
  const query: Record<string, unknown> = {
    $sort: { [sortKey]: 1 },
    $limit: packageTypeStore.pagination.limit,
    $skip: packageTypeStore.pagination.skip
  }
  if (filterMode.value) query.mode = filterMode.value
  if (searchQuery.value.trim()) query.search = searchQuery.value.trim()
  packageTypeStore.fetchPackageTypes({ query })
}

const onSearchChange = () => {
  if (searchDebounceTimer.value) clearTimeout(searchDebounceTimer.value)
  isSearchDebouncing.value = true
  searchDebounceTimer.value = setTimeout(() => {
    isSearchDebouncing.value = false
    packageTypeStore.setPage(1)
    loadPackageTypes()
  }, 400)
}

function clearFilters() {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
    searchDebounceTimer.value = null
  }
  isSearchDebouncing.value = false
  searchQuery.value = ''
  filterMode.value = ''
  packageTypeStore.setPage(1)
  loadPackageTypes()
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  packageTypeStore.setPage(page)
  loadPackageTypes()
}

function onPageSizeChange() {
  packageTypeStore.setLimit(pageSize.value)
  loadPackageTypes()
}

function onSortOrModeChange() {
  packageTypeStore.setPage(1)
  loadPackageTypes()
}

function exportCsv() {
  const rows = displayedPackageTypes.value
  if (!rows.length) return
  const headers = ['Type', 'Description', 'Mode', 'Defined quantity', 'Created']
  const lines = [headers.join(',')]
  for (const p of rows) {
    const row = [
      `"${(p.type || '').replace(/"/g, '""')}"`,
      `"${(p.description || '').replace(/"/g, '""')}"`,
      p.mode || '',
      p.defined_quantity || '',
      p.date_created || ''
    ]
    lines.push(row.join(','))
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `package-types-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const editPackageType = (packageType: PackageType) => {
  editingPackageType.value = packageType
  packageTypeForm.value = {
    type: packageType.type,
    description: packageType.description || '',
    notes: packageType.notes || '',
    mode: packageType.mode,
    defined_quantity: packageType.defined_quantity
  }
  showEditModal.value = true
}

const savePackageType = async () => {
  try {
    const payload = {
      ...packageTypeForm.value,
      defined_quantity: (packageTypeForm.value.defined_quantity === 'Yes' ? 'Yes' : 'No') as 'Yes' | 'No'
    }
    if (showEditModal.value && editingPackageType.value) {
      await packageTypeStore.updatePackageType(editingPackageType.value.id, payload)
      showSuccessModal.value = true
      successMessage.value = 'Package type updated successfully!'
    } else {
      await packageTypeStore.createPackageType(payload)
      showSuccessModal.value = true
      successMessage.value = 'Package type created successfully!'
    }
    closeModal()
    // Refresh the data after create/update
    await loadPackageTypes()
  } catch (error) {
    console.error('Failed to save package type:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to save package type. Please try again.'
  }
}

const deletePackageType = async (id: number) => {
  confirmMessage.value = 'Are you sure you want to delete this package type? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await packageTypeStore.deletePackageType(id)
      showSuccessModal.value = true
      successMessage.value = 'Package type deleted successfully!'
      showConfirmModal.value = false
      // Refresh the data after deletion
      await loadPackageTypes()
    } catch (error) {
      console.error('Failed to delete package type:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete package type. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedPackageType.value = null
  editingPackageType.value = null
  packageTypeForm.value = {
    type: '',
    description: '',
    notes: '',
    mode: '' as 'Air' | 'Sea' | 'Both',
    defined_quantity: '' as 'Yes' | 'No'
  }
  packageTypeStore.clearError()
}

onMounted(async () => {
  if (!packageTypeStore.pagination.limit || packageTypeStore.pagination.limit < 1) {
    packageTypeStore.setLimit(10)
  }
  pageSize.value = packageTypeStore.pagination.limit
  loadPackageTypes()
})
</script> 
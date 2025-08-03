<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Commodities Management</h1>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">Manage commodities for your company operations</p>
        </div>
                <button @click="showCreateModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Commodity
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
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Commodities</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage your commodities</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {{ filteredCommodities.length }} commodities
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Card Body -->
            <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <!-- Search Input -->
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Commodities</label>
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
                                placeholder="Search by name or description..."
                                :disabled="commodityStore.loading"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                            <div v-if="commodityStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                    
                    <!-- Refresh Button -->
                    <div class="flex items-end">
        <button 
          @click="loadCommodities" 
          :disabled="commodityStore.loading"
                            class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
                            <div v-if="commodityStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
          Refresh
        </button>
      </div>
                    
                    <!-- View Mode Toggle -->
                    <div class="flex items-end justify-end">
                        <div class="w-full">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">View Mode</label>
                            <div class="inline-flex rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden" role="group">
                                <button 
                                    @click="viewMode = 'grid'"
                                    :class="[
                                        'px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center',
                                        viewMode === 'grid'
                                            ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm'
                                            : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'
                                    ]"
                                    :disabled="commodityStore.loading"
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
                                    :disabled="commodityStore.loading"
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

                <!-- Quick Actions -->
                <div v-if="searchQuery" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                Found {{ filteredCommodities.length }} result{{ filteredCommodities.length !== 1 ? 's' : '' }}
                            </span>
                            <button 
                                @click="clearFilters"
                                class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                            >
                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                Clear Search
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

        <!-- Loading State with Skeleton Loaders -->
    <div v-if="commodityStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <!-- Commodities Display -->
        <div v-else>
            <!-- Empty State -->
            <div v-if="filteredCommodities.length === 0" class="flex flex-col items-center justify-center py-20">
                <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {{ searchQuery ? 'No commodities found' : 'No commodities yet' }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
                    {{ searchQuery ? 'Try adjusting your search criteria or clear the filters.' : 'Get started by adding your first commodity to organize your operations.' }}
                </p>
                <div class="flex space-x-4">
                    <button 
                        v-if="searchQuery"
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
                        Add Commodity
                    </button>
                </div>
            </div>

            <!-- Grid View -->
            <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="commodity in filteredCommodities" :key="commodity.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
        <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ commodity.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ commodity.company?.name || 'Company' }}</p>
          </div>
                        </div>
                        <div class="flex space-x-1">
                            <button @click="editCommodity(commodity)" class="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
                            <button @click="deleteCommodity(commodity.id)" class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
                    <div class="space-y-3 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Name:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ commodity.name }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Description:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ commodity.description || 'N/A' }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Company:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ commodity.company?.name || 'N/A' }}</span>
          </div>
                        <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Created:</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ formatDate(commodity.date_created) }}</span>
          </div>
        </div>

        <div class="flex space-x-2">
                        <button @click="editCommodity(commodity)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit Commodity
                        </button>
                        <button @click="deleteCommodity(commodity.id)" class="flex-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center">
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
                <div v-for="commodity in filteredCommodities" :key="commodity.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ commodity.name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ commodity.company?.name || 'Company' }}</p>
                                <div class="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Description: {{ commodity.description || 'N/A' }}</span>
                                    <span>Created: {{ formatDate(commodity.date_created) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="editCommodity(commodity)" class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button @click="deleteCommodity(commodity.id)" class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {{ showEditModal ? 'Edit Commodity' : 'Create New Commodity' }}
        </h3>
          <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form @submit.prevent="saveCommodity">
            <!-- Commodity Information Section -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  Commodity Details
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Define the name and description for this commodity.</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Commodity Name -->
          <div>
                  <label for="commodity-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commodity Name</label>
            <input 
                    id="commodity-name"
              v-model="commodityForm.name" 
              type="text" 
              required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
              placeholder="Electronics"
            >
          </div>
          
                <!-- Company ID (Hidden but required) -->
                <div class="hidden">
                  <input v-model="commodityForm.company_id" type="hidden">
                </div>
              </div>
              
              <!-- Description -->
          <div>
                <label for="commodity-description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea 
                  id="commodity-description"
              v-model="commodityForm.description" 
                  rows="4"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                  placeholder="Enter a detailed description of this commodity..."
            ></textarea>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Provide a clear description to help identify and categorize this commodity.
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
            @click="saveCommodity" 
              :disabled="commodityStore.loading"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="commodityStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ showEditModal ? 'Update Commodity' : 'Create Commodity' }}
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
import { ref, computed, onMounted } from 'vue'
import { useCommodityStore } from '../../store/commodity.store'
import { useAuthStore } from '../../store/auth.store'
import type { Commodity } from '../../api/models/commodity.model'

const commodityStore = useCommodityStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedCommodity = ref<Commodity | null>(null)
const editingCommodity = ref<Commodity | null>(null)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => void)>(() => {})

const commodityForm = ref({
  name: '',
  description: '',
  company_id: 0
})

const filteredCommodities = computed(() => {
  const commodities = commodityStore.commodities
  if (!searchQuery.value) return commodities
  
  const query = searchQuery.value.toLowerCase()
  return commodities.filter(commodity => 
    commodity.name.toLowerCase().includes(query) ||
    (commodity.description && commodity.description.toLowerCase().includes(query))
  )
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const loadCommodities = async () => {
  try {
    // Filter commodities by the logged-in user's company
    if (authStore.user?.company_id) {
      await commodityStore.fetchCommodities({
        query: {
          company_id: authStore.user.company_id,
          $sort: { name: 1 }
        }
      })
    }
  } catch (error) {
    console.error('Failed to load commodities:', error)
  }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const onSearchChange = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
  // Search is handled by computed property
  }, 500)
}

const clearFilters = () => {
  searchQuery.value = ''
}

const editCommodity = (commodity: Commodity) => {
  editingCommodity.value = commodity
  commodityForm.value = {
    name: commodity.name,
    description: commodity.description || '',
    company_id: commodity.company_id
  }
  showEditModal.value = true
}

const saveCommodity = async () => {
  try {
    // Ensure company_id is set to the logged-in user's company
    if (authStore.user?.company_id) {
      commodityForm.value.company_id = authStore.user.company_id
    }
    
    if (showEditModal.value && editingCommodity.value) {
      await commodityStore.updateCommodity(editingCommodity.value.id, commodityForm.value)
      showSuccessModal.value = true
      successMessage.value = 'Commodity updated successfully!'
    } else {
      await commodityStore.createCommodity(commodityForm.value)
      showSuccessModal.value = true
      successMessage.value = 'Commodity created successfully!'
    }
    closeModal()
    // Refresh the data after create/update
    await loadCommodities()
  } catch (error) {
    console.error('Failed to save commodity:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to save commodity. Please try again.'
  }
}

const deleteCommodity = async (id: number) => {
  confirmMessage.value = 'Are you sure you want to delete this commodity? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await commodityStore.deleteCommodity(id)
      showSuccessModal.value = true
      successMessage.value = 'Commodity deleted successfully!'
      showConfirmModal.value = false
      // Refresh the data after deletion
      await loadCommodities()
    } catch (error) {
      console.error('Failed to delete commodity:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete commodity. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedCommodity.value = null
  editingCommodity.value = null
  commodityForm.value = {
    name: '',
    description: '',
    company_id: 0
  }
  commodityStore.clearError()
}

onMounted(async () => {
  await loadCommodities()
})
</script> 
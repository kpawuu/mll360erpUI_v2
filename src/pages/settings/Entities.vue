<template>
    <div class="p-4">
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Entities Management</h1>
                    <p class="text-gray-600 dark:text-gray-400">Manage all entities (clients, suppliers, partners, etc.)</p>
                </div>
                <button @click="showCreateModal = true" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Entity
                </button>
            </div>
        </div>

        <!-- Search and Filters -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
                    <input 
                        v-model="searchQuery" 
                        @input="onSearchChange"
                        type="text" 
                        placeholder="Search entities..."
                        :disabled="entityStore.loading"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Group Filter</label>
                    <select 
                        v-model="selectedGroupId" 
                        @change="onGroupFilterChange"
                        :disabled="entityStore.loading"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">All Groups</option>
                        <option v-for="group in entityGroups" :key="group.id" :value="group.id">
                            {{ group.group_name }}
                        </option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button 
                        @click="loadEntities" 
                        :disabled="entityStore.loading"
                        class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <div v-if="entityStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Refresh
                    </button>
                </div>
                <div class="flex items-end justify-end">
                    <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button 
                            @click="viewMode = 'grid'"
                            :class="[
                                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                viewMode === 'grid'
                                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            ]"
                            :disabled="entityStore.loading"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                        </button>
                        <button 
                            @click="viewMode = 'list'"
                            :class="[
                                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                viewMode === 'list'
                                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            ]"
                            :disabled="entityStore.loading"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State with Skeleton Loaders -->
        <div v-if="entityStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
                <!-- Header skeleton -->
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                        <div>
                            <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2"></div>
                            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
                
                <!-- Contact info skeleton -->
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                </div>
                
                <!-- Group info skeleton -->
                <div class="pt-4 border-t border-gray-200 dark:border-gray-700 mb-4">
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    </div>
                </div>
                
                <!-- Buttons skeleton -->
                <div class="flex space-x-2">
                    <div class="flex-1 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div class="flex-1 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!entityStore.loading && filteredEntities.length === 0" class="flex flex-col items-center justify-center py-12 px-4">
            <div class="text-center">
                <!-- Empty State Icon -->
                <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                </div>
                
                <!-- Empty State Text -->
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {{ searchQuery || selectedGroupId ? 'No entities found' : 'No entities yet' }}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    {{ searchQuery || selectedGroupId 
                        ? 'Try adjusting your search terms or filters to find what you\'re looking for.' 
                        : 'Get started by creating your first entity. Entities can be clients, suppliers, partners, or any other business contacts.' 
                    }}
                </p>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                        v-if="searchQuery || selectedGroupId"
                        @click="clearFilters"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Clear Filters
                    </button>
                    <button 
                        @click="showCreateModal = true"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        {{ searchQuery || selectedGroupId ? 'Create New Entity' : 'Create First Entity' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Entity Display -->
        <div v-else>
            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="entity in filteredEntities" :key="entity.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                                <span class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ entity.name.charAt(0).toUpperCase() }}</span>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ entity.name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ entity.group?.group_name || 'No Group' }}</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="editEntity(entity)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button @click="deleteEntity(entity.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div v-if="entity.email" class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Email:</span>
                            <span class="text-gray-900 dark:text-white">{{ entity.email }}</span>
                        </div>
                        <div v-if="entity.phonenumber" class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Phone:</span>
                            <span class="text-gray-900 dark:text-white">{{ entity.phonenumber }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Created:</span>
                            <span class="text-gray-900 dark:text-white">{{ formatDate(entity.date_created) }}</span>
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between text-sm mb-2">
                            <span class="text-gray-500 dark:text-gray-400">Company:</span>
                            <span class="text-gray-900 dark:text-white">{{ entity.company?.name || 'N/A' }}</span>
                        </div>
                        <div v-if="entity.address" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {{ entity.address }}
                        </div>
                    </div>

                    <div class="mt-4 flex space-x-2">
                        <button @click="viewDetails(entity)" class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            View Details
                        </button>
                        <button @click="editEntity(entity)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit Entity
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- List View -->
            <div v-else class="space-y-4">
                <div v-for="entity in filteredEntities" :key="entity.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span class="text-lg font-medium text-blue-600 dark:text-blue-400">{{ entity.name.charAt(0).toUpperCase() }}</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ entity.name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ entity.group?.group_name || 'No Group' }}</p>
                                <div class="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span v-if="entity.email">{{ entity.email }}</span>
                                    <span v-if="entity.phonenumber">{{ entity.phonenumber }}</span>
                                    <span>Created: {{ formatDate(entity.date_created) }}</span>
                                </div>
                                <div v-if="entity.address" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {{ entity.address }}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="viewDetails(entity)" class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                View
                            </button>
                            <button @click="editEntity(entity)" class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button @click="deleteEntity(entity.id)" class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pagination Controls -->
            <div class="mt-8 flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <label class="text-sm text-gray-600 dark:text-gray-400">Show:</label>
                    <select 
                        v-model="entityStore.pagination.limit" 
                        @change="onLimitChange"
                        :disabled="entityStore.loading"
                        class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                        of {{ entityStore.pagination.total }} entries
                    </span>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button 
                        @click="previousPage" 
                        :disabled="entityStore.pagination.currentPage <= 1 || entityStore.loading"
                        class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                    >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Previous
                    </button>
                    
                    <div class="flex space-x-1">
                        <button 
                            v-for="page in visiblePages" 
                            :key="page"
                            @click="goToPage(page)"
                            :disabled="entityStore.loading"
                            :class="[
                                'px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                                page === entityStore.pagination.currentPage
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            ]"
                        >
                            {{ page }}
                        </button>
                    </div>
                    
                    <button 
                        @click="nextPage" 
                        :disabled="entityStore.pagination.currentPage >= totalPages || entityStore.loading"
                        class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                    >
                        Next
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Create/Edit Modal -->
        <div v-if="showCreateModal || showEditModal" id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-55 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-700 dark:to-violet-700">
                        <h3 class="text-xl font-semibold text-white">
                            <div class="flex items-center">
                                <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {{ showEditModal ? 'Edit Entity' : 'Create New Entity' }}
                            </div>
                        </h3>
                        <button type="button" class="text-white bg-transparent hover:bg-violet-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                        <form @submit.prevent="saveEntity">
                            <!-- Entity Information Section -->
                            <div class="space-y-6">
                                <div>
                                    <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                                        <svg class="w-5 h-5 me-2 text-violet-600 dark:text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Entity Information
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Basic information about the entity.</p>
                                </div>
                                
                                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <!-- Entity Name -->
                                    <div class="col-span-2">
                                        <label for="entity-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entity Name</label>
                                        <input 
                                            id="entity-name"
                                            v-model="entityForm.name" 
                                            type="text" 
                                            required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                            placeholder="e.g. John Doe"
                                        >
                                    </div>
                                    
                                    <!-- Group -->
                                    <div>
                                        <label for="entity-group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
                                        <select 
                                            id="entity-group"
                                            v-model="entityForm.group_id" 
                                            required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        >
                                            <option value="">Select Group</option>
                                            <option v-for="group in entityGroups" :key="group.id" :value="group.id">
                                                {{ group.group_name }}
                                            </option>
                                        </select>
                                    </div>
                                    
                                    <!-- Email -->
                                    <div>
                                        <label for="entity-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input 
                                            id="entity-email"
                                            v-model="entityForm.email" 
                                            type="email" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                            placeholder="e.g. john.doe@example.com"
                                        >
                                    </div>
                                    
                                    <!-- Phone Number -->
                                    <div>
                                        <label for="entity-phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                        <input 
                                            id="entity-phone"
                                            v-model="entityForm.phonenumber" 
                                            type="tel" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                            placeholder="e.g. (555) 123-4567"
                                        >
                                    </div>
                                    
                                    <!-- Username -->
                                    <div>
                                        <label for="entity-username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input 
                                            id="entity-username"
                                            v-model="entityForm.username" 
                                            type="text" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                            placeholder="e.g. johndoe"
                                        >
                                    </div>
                                    
                                    <!-- Password -->
                                    <div>
                                        <label for="entity-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input 
                                            id="entity-password"
                                            v-model="entityForm.password" 
                                            type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                            placeholder="Enter password"
                                        >
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Address Section -->
                            <div class="mt-8 space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
                                <div>
                                    <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                                        <svg class="w-5 h-5 me-2 text-violet-600 dark:text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                        </svg>
                                        Address Information
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Physical address details for this entity.</p>
                                </div>
                                
                                <div>
                                    <label for="entity-address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <textarea 
                                        id="entity-address"
                                        v-model="entityForm.address" 
                                        rows="3"
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="Enter full address..."
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                        <button 
                            type="button" 
                            @click="closeModal" 
                            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                        >
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            Cancel
                        </button>
                        &nbsp;
                        <button 
                            type="button" 
                            @click="saveEntity" 
                            :disabled="entityStore.loading"
                            class="text-white bg-gradient-to-br from-purple-600 to-violet-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div v-if="entityStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            <svg v-else class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                            </svg>
                            {{ showEditModal ? 'Update Entity' : 'Create Entity' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showDetailsModal && selectedEntity" id="detailsModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
                    <h3 class="text-xl font-semibold text-white">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Entity Details
                        </div>
                    </h3>
                    <button type="button" class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="showDetailsModal = false">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                    <!-- Entity Header -->
                    <div class="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                        <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ selectedEntity.name.charAt(0).toUpperCase() }}</span>
                        </div>
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedEntity.name }}</h2>
                            <p class="text-blue-600 dark:text-blue-400 font-medium">{{ selectedEntity.group?.group_name || 'No Group Assigned' }}</p>
                            <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Created: {{ formatDate(selectedEntity.date_created) }}
                                </span>
                                <span v-if="selectedEntity.date_updated" class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Updated: {{ formatDate(selectedEntity.date_updated) }}
                                </span>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button 
                                @click="editEntity(selectedEntity)"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                        </div>
                    </div>

                    <!-- Entity Information Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Contact Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div class="flex items-center mb-4">
                                <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                            </div>
                            
                            <div class="space-y-4">
                                <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                        <p class="font-medium text-gray-900 dark:text-white">{{ selectedEntity.name }}</p>
                                    </div>
                                </div>
                                
                                <div v-if="selectedEntity.email" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p class="font-medium text-gray-900 dark:text-white">{{ selectedEntity.email }}</p>
                                    </div>
                                </div>
                                
                                <div v-if="selectedEntity.phonenumber" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                        <p class="font-medium text-gray-900 dark:text-white">{{ selectedEntity.phonenumber }}</p>
                                    </div>
                                </div>
                                
                                <div v-if="selectedEntity.username" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Username</p>
                                        <p class="font-medium text-gray-900 dark:text-white">{{ selectedEntity.username }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Group & Company Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div class="flex items-center mb-4">
                                <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Organization</h3>
                            </div>
                            
                            <div class="space-y-4">
                                <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Group</p>
                                        <p class="font-medium text-gray-900 dark:text-white">{{ selectedEntity.group?.group_name || 'No Group Assigned' }}</p>
                                    </div>
                                </div>
                                
                                <div v-if="selectedEntity.company" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Company</p>
                                        <p class="font-medium text-gray-900 dark:text-white">{{ selectedEntity.company.name }}</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Entity ID</p>
                                        <p class="font-medium text-gray-900 dark:text-white">#{{ selectedEntity.id }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Address Information -->
                    <div v-if="selectedEntity.address" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Address Information</h3>
                        </div>
                        
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p class="text-gray-900 dark:text-white leading-relaxed">{{ selectedEntity.address }}</p>
                        </div>
                    </div>

                    <!-- System Information -->
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">System Information</h3>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <div class="flex-1">
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Created Date</p>
                                    <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(selectedEntity.date_created) }}</p>
                                </div>
                            </div>
                            
                            <div v-if="selectedEntity.date_updated" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div class="flex-1">
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                    <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(selectedEntity.date_updated) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button 
                        type="button" 
                        @click="showDetailsModal = false" 
                        class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    >
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        Close
                    </button>
                    <button 
                        type="button" 
                        @click="editEntity(selectedEntity)"
                        class="text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-3 inline-flex items-center"
                    >
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        </svg>
                        Edit Entity
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div v-if="entityStore.error" id="errorModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-60 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center dark:bg-red-900">
                            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                            Error
                        </h3>
                    </div>
                    <button @click="entityStore.clearError()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {{ entityStore.error }}
                    </p>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="entityStore.clearError()" type="button" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" id="successModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-60 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900">
                            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                            Success
                        </h3>
                    </div>
                    <button @click="showSuccessModal = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {{ successMessage }}
                    </p>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="showSuccessModal = false" type="button" class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" id="confirmModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-60 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center dark:bg-yellow-900">
                            <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                            Confirm Action
                        </h3>
                    </div>
                    <button @click="showConfirmModal = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {{ confirmMessage }}
                    </p>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 space-x-2">
                    <button @click="showConfirmModal = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 border border-gray-200 text-sm font-medium rounded-lg px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Cancel
                    </button>
                    <button @click="confirmAction" type="button" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEntityStore } from '../../store/entity.store'
import { useEntityGroupStore } from '../../store/entity-group.store'
import type { Entity, CreateEntity, UpdateEntity } from '../../api/models/entity.model'

const entityStore = useEntityStore()
const entityGroupStore = useEntityGroupStore()

const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const selectedGroupId = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const selectedEntity = ref<Entity | null>(null)
const editingEntity = ref<Entity | null>(null)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => void)>(() => {})

const entityForm = ref({
    name: '',
    group_id: '',
    email: '',
    phonenumber: '',
    address: '',
    username: '',
    password: ''
})

// Get user's company from auth store
import { useAuthStore } from '../../store/auth.store'
const authStore = useAuthStore()

const entityGroups = computed(() => entityGroupStore.entityGroups)

const filteredEntities = computed(() => {
    const entities = entityStore.entities;
    if (!Array.isArray(entities)) {
        console.log('entities is not an array:', entities);
        return [];
    }
    return entities;
})

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

const loadEntities = async () => {
    try {
        let query: any = {};
        
        // Add search filter (case-insensitive)
        if (searchQuery.value) {
            const searchTerm = searchQuery.value;
            query.$or = [
                { name: { $ilike: `%${searchTerm}%` } },
                { email: { $ilike: `%${searchTerm}%` } }
            ];
        }
        
        // Add group filter
        if (selectedGroupId.value) {
            query.group_id = Number(selectedGroupId.value);
        }
        
        const params = Object.keys(query).length > 0 ? { query } : undefined;
        await entityStore.fetchEntities(params)
    } catch (error) {
        console.error('Failed to load entities:', error)
    }
}

// Pagination computed properties
const totalPages = computed(() => {
    return Math.ceil(entityStore.pagination.total / entityStore.pagination.limit)
})

const visiblePages = computed(() => {
    const current = entityStore.pagination.currentPage
    const total = totalPages.value
    const pages = []
    
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

// Pagination methods
const goToPage = async (page: number | string) => {
    if (typeof page === 'number') {
        entityStore.setPage(page)
        await loadEntities()
    }
}

const nextPage = async () => {
    if (entityStore.pagination.currentPage < totalPages.value) {
        entityStore.setPage(entityStore.pagination.currentPage + 1)
        await loadEntities()
    }
}

const previousPage = async () => {
    if (entityStore.pagination.currentPage > 1) {
        entityStore.setPage(entityStore.pagination.currentPage - 1)
        await loadEntities()
    }
}

const onLimitChange = async () => {
    entityStore.setLimit(Number(entityStore.pagination.limit))
    entityStore.setPage(1) // Reset to first page when changing limit
    await loadEntities()
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const onSearchChange = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        entityStore.setPage(1) // Reset to first page when searching
        await loadEntities()
    }, 300)
}

const onGroupFilterChange = async () => {
    entityStore.setPage(1) // Reset to first page when filtering
    await loadEntities()
}

const clearFilters = async () => {
    searchQuery.value = ''
    selectedGroupId.value = ''
    entityStore.setPage(1) // Reset to first page
    await loadEntities()
}

const editEntity = (entity: Entity) => {
    editingEntity.value = entity
    entityForm.value = {
        name: entity.name,
        group_id: entity.group_id.toString(),
        email: entity.email || '',
        phonenumber: entity.phonenumber || '',
        address: entity.address || '',
        username: entity.username || '',
        password: ''
    }
    showEditModal.value = true
}

const saveEntity = async () => {
    try {
        // Get company_id from logged-in user
        const userCompanyId = authStore.user?.company_id
        if (!userCompanyId) {
            throw new Error('User company not found. Please login again.')
        }

        if (showEditModal.value && editingEntity.value) {
            // Update existing entity
            await entityStore.updateEntity(editingEntity.value.id, {
                name: entityForm.value.name,
                company_id: userCompanyId,
                group_id: Number(entityForm.value.group_id),
                email: entityForm.value.email || undefined,
                phonenumber: entityForm.value.phonenumber || undefined,
                address: entityForm.value.address || undefined,
                username: entityForm.value.username || undefined,
                password: entityForm.value.password || undefined
            })
            showSuccessModal.value = true
            successMessage.value = 'Entity updated successfully!'
        } else {
            // Create new entity
            await entityStore.createEntity({
                name: entityForm.value.name,
                company_id: userCompanyId,
                group_id: Number(entityForm.value.group_id),
                email: entityForm.value.email || undefined,
                phonenumber: entityForm.value.phonenumber || undefined,
                address: entityForm.value.address || undefined,
                username: entityForm.value.username || undefined,
                password: entityForm.value.password || undefined
            })
            showSuccessModal.value = true
            successMessage.value = 'Entity created successfully!'
        }
        closeModal()
    } catch (error) {
        console.error('Failed to save entity:', error)
    }
}

const deleteEntity = async (id: number) => {
    confirmMessage.value = 'Are you sure you want to delete this entity? This action cannot be undone.'
    confirmAction.value = async () => {
        try {
            await entityStore.deleteEntity(id)
            showSuccessModal.value = true
            successMessage.value = 'Entity deleted successfully!'
            showConfirmModal.value = false
        } catch (error) {
            console.error('Failed to delete entity:', error)
        }
    }
    showConfirmModal.value = true
}

const viewDetails = (entity: Entity) => {
    selectedEntity.value = entity
    showDetailsModal.value = true
}

const closeModal = () => {
    showCreateModal.value = false
    showEditModal.value = false
    showDetailsModal.value = false
    selectedEntity.value = null
    editingEntity.value = null
    entityForm.value = {
        name: '',
        group_id: '',
        email: '',
        phonenumber: '',
        address: '',
        username: '',
        password: ''
    }
    entityStore.clearError()
}

onMounted(async () => {
    await Promise.all([
        loadEntities(),
        entityGroupStore.fetchEntityGroups()
    ])
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style> 
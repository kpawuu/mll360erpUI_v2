<template>
    <div class="p-4">
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h1>
                    <p class="text-gray-600 dark:text-gray-400">Manage company users and their permissions</p>
                </div>
                <button @click="showCreateModal = true" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add User
                </button>
            </div>
        </div>

        <!-- Search and Filters -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
                    <div class="relative">
                        <input 
                            v-model="searchQuery" 
                            @input="onSearchChange"
                            type="text" 
                            placeholder="Search by name, email, staff ID, phone, or job title..."
                            :disabled="userStore.loading"
                            class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        <div v-if="userStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                        <div v-else-if="searchQuery" class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button 
                                @click="clearFilters"
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex items-end">
                    <button 
                        @click="loadUsers" 
                        :disabled="userStore.loading"
                        class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <div v-if="userStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
                            :disabled="userStore.loading"
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
                            :disabled="userStore.loading"
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
        <div v-if="userStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                
                <!-- Info skeleton -->
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                </div>
                
                <!-- Buttons skeleton -->
                <div class="flex space-x-2">
                    <div class="flex-1 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div class="flex-1 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
            </div>
        </div>

        <!-- Users Display -->
        <div v-else>
            <!-- Empty State -->
            <div v-if="filteredUsers.length === 0" class="flex flex-col items-center justify-center py-12">
                <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {{ searchQuery ? 'No users found' : 'No users yet' }}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                    {{ searchQuery ? 'Try adjusting your search criteria or clear the filters.' : 'Get started by adding your first user to the company.' }}
                </p>
                <div class="flex space-x-3">
                    <button 
                        v-if="searchQuery"
                        @click="clearFilters"
                        class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                    <button 
                        @click="showCreateModal = true"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add User
                    </button>
                </div>
            </div>

            <!-- Grid View -->
            <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="user in filteredUsers" :key="user.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                                <span class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ user.first_name.charAt(0).toUpperCase() }}</span>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ user.first_name }} {{ user.last_name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.job_title }}</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="viewDetails(user)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                            <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Email:</span>
                            <span class="text-gray-900 dark:text-white">{{ user.email }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Phone:</span>
                            <span class="text-gray-900 dark:text-white">{{ user.phone_number }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Staff ID:</span>
                            <span class="text-gray-900 dark:text-white">{{ user.staffid }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Created:</span>
                            <span class="text-gray-900 dark:text-white">{{ formatDate(user.date_created) }}</span>
                        </div>
                    </div>

                    <div class="mt-4 flex space-x-2">
                        <button @click="viewDetails(user)" class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            View Details
                        </button>
                        <button @click="editUser(user)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit User
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- List View -->
            <div v-else class="space-y-4">
                <div v-for="user in filteredUsers" :key="user.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span class="text-lg font-medium text-blue-600 dark:text-blue-400">{{ user.first_name.charAt(0).toUpperCase() }}</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ user.first_name }} {{ user.last_name }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.job_title }} • {{ user.email }}</p>
                                <div class="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Staff ID: {{ user.staffid }}</span>
                                    <span>Phone: {{ user.phone_number }}</span>
                                    <span>Created: {{ formatDate(user.date_created) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="viewDetails(user)" class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                View
                            </button>
                            <button @click="editUser(user)" class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                            </button>
                            <button @click="deleteUser(user.id)" class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center">
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
                        v-model="userStore.pagination.limit" 
                        @change="onLimitChange"
                        :disabled="userStore.loading"
                        class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                        of {{ userStore.pagination.total }} entries
                    </span>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button 
                        @click="previousPage" 
                        :disabled="userStore.pagination.currentPage <= 1 || userStore.loading"
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
                            :disabled="userStore.loading"
                            :class="[
                                'px-3 py-1 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                                page === userStore.pagination.currentPage
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            ]"
                        >
                            {{ page }}
                        </button>
                    </div>
                    
                    <button 
                        @click="nextPage" 
                        :disabled="userStore.pagination.currentPage >= totalPages || userStore.loading"
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
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-700 dark:to-violet-700">
                    <h3 class="text-xl font-semibold text-white">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            {{ showEditModal ? 'Edit User' : 'Create New User' }}
                        </div>
                    </h3>
                    <button type="button" class="text-white bg-transparent hover:bg-violet-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeEditModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    <form @submit.prevent="saveUser">
                        <!-- Personal Information Section -->
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 me-2 text-violet-600 dark:text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                    Personal Information
                                </h3>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Basic personal details of the user.</p>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- First Name -->
                                <div>
                                    <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input 
                                        id="first-name"
                                        v-model="userForm.first_name" 
                                        type="text" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="John"
                                    >
                                </div>
                                
                                <!-- Last Name -->
                                <div>
                                    <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input 
                                        id="last-name"
                                        v-model="userForm.last_name" 
                                        type="text" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="Doe"
                                    >
                                </div>
                                
                                <!-- Email -->
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input 
                                        id="email"
                                        v-model="userForm.email" 
                                        type="email" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="john.doe@company.com"
                                    >
                                </div>
                                
                                <!-- Phone Number -->
                                <div>
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input 
                                        id="phone"
                                        v-model="userForm.phone_number" 
                                        type="tel" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="+1234567890"
                                    >
                                </div>
                                
                                <!-- Gender -->
                                <div>
                                    <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <select 
                                        id="gender"
                                        v-model="userForm.gender" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                
                                <!-- Date of Birth -->
                                <div>
                                    <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <input 
                                            id="dob"
                                            v-model="userForm.dob" 
                                            type="date" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Employment Information Section -->
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 me-2 text-violet-600 dark:text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                    Employment Information
                                </h3>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Work-related details and identification.</p>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Job Title -->
                                <div>
                                    <label for="job-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                                    <input 
                                        id="job-title"
                                        v-model="userForm.job_title" 
                                        type="text" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="Software Engineer"
                                    >
                                </div>
                                
                                <!-- Staff ID -->
                                <div>
                                    <label for="staff-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Staff ID</label>
                                    <input 
                                        id="staff-id"
                                        v-model="userForm.staffid" 
                                        type="text" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="EMP001"
                                    >
                                </div>
                                
                                <!-- Social Security Number -->
                                <div>
                                    <label for="ss-no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social Security Number</label>
                                    <input 
                                        id="ss-no"
                                        v-model="userForm.ss_no" 
                                        type="text" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="123-45-6789"
                                    >
                                </div>
                                
                                <!-- User Type -->
                                <div>
                                    <label for="user-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Type</label>
                                    <select 
                                        id="user-type"
                                        v-model="userForm.usertype" 
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                    >
                                        <option value="">Select User Type</option>
                                        <option 
                                            v-for="usertype in usertypeStore.usertypes" 
                                            :key="usertype.id" 
                                            :value="usertype.id"
                                        >
                                            {{ usertype.type }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Government ID Information Section -->
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 me-2 text-violet-600 dark:text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Government ID Information
                                </h3>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Government-issued identification details.</p>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <!-- Government ID Number -->
                                <div>
                                    <label for="gov-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Government ID Number</label>
                                    <input 
                                        id="gov-id"
                                        v-model="userForm.government_issued_id_number" 
                                        type="text" 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        placeholder="ID123456789"
                                    >
                                </div>
                                
                                <!-- Issue Date -->
                                <div>
                                    <label for="issue-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue Date</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <input 
                                            id="issue-date"
                                            v-model="userForm.issue_date" 
                                            type="date" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        >
                                    </div>
                                </div>
                                
                                <!-- Expiry Date -->
                                <div>
                                    <label for="expiry-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <input 
                                            id="expiry-date"
                                            v-model="userForm.expiry_date" 
                                            type="date" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button 
                        type="button" 
                        @click="closeEditModal" 
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
                        @click="saveUser" 
                        :disabled="userStore.loading"
                        class="text-white bg-gradient-to-br from-purple-600 to-violet-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="userStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        <svg v-else class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                        </svg>
                        {{ showEditModal ? 'Update User' : 'Create User' }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- User Details Modal -->
    <div v-if="showDetailsModal && selectedUser" id="userDetailsModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-55 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
                    <h3 class="text-xl font-semibold text-white">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            User Details
                        </div>
                    </h3>
                    <button type="button" class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                    <!-- User Profile Header -->
                    <div class="flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900 rounded-lg">
                        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                            {{ selectedUser.first_name.charAt(0).toUpperCase() }}{{ selectedUser.last_name.charAt(0).toUpperCase() }}
                        </div>
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</h2>
                            <p class="text-lg text-gray-600 dark:text-gray-300">{{ selectedUser.job_title }}</p>
                            <div class="flex items-center space-x-4 mt-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    {{ selectedUser.isVerified ? 'Verified' : 'Not Verified' }}
                                </span>
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    Staff ID: {{ selectedUser.staffid }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Information Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Personal Information -->
                        <div class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Information
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.email }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.phone_number }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.gender }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ formatDate(selectedUser.dob) }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Social Security</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.ss_no || 'N/A' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Employment Information -->
                        <div class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                </svg>
                                Employment Information
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.job_title }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Staff ID</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.staffid }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">User Type</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.type?.type_name || 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Branch</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.branch?.branch_name || 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Company</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.company?.company_name || 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Department ID</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.department_id || 'N/A' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Government ID Information -->
                        <div class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Government ID Information
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">ID Number</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.government_issued_id_number || 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">ID Type</span>
                                    <span class="text-sm text-gray-900 dark:text-white">N/A</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Issue Date</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.issue_date ? formatDate(selectedUser.issue_date) : 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Expiry Date</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.expiry_date ? formatDate(selectedUser.expiry_date) : 'N/A' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- System Information -->
                        <div class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                System Information
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                        Active
                                    </span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Date Created</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ formatDateTime(selectedUser.date_created) }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.date_updated ? formatDateTime(selectedUser.date_updated) : 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</span>
                                    <span class="text-sm text-gray-900 dark:text-white">N/A</span>
                                </div>
                                <div class="flex justify-between items-center py-2">
                                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Current IP</span>
                                    <span class="text-sm text-gray-900 dark:text-white">{{ selectedUser.current_ip_address || 'N/A' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- User Roles Section -->
                    <div v-if="selectedUser.user_roles && selectedUser.user_roles.length > 0" class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            User Roles
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="role in selectedUser.user_roles" :key="role.id" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                Role ID: {{ role.role_id }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button 
                        type="button" 
                        @click="editUser(selectedUser)" 
                        class="text-white bg-gradient-to-br from-blue-600 to-indigo-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3"
                    >
                        <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit User
                    </button>
                    <button 
                        type="button" 
                        @click="closeModal" 
                        class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    >
                        <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-md">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Success!</h3>
                    <p class="text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
                </div>
                <div class="flex justify-center p-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        @click="showSuccessModal = false; successMessage = ''" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div v-if="showConfirmModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-md">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Confirm Action</h3>
                    <p class="text-gray-600 dark:text-gray-400">{{ confirmMessage }}</p>
                </div>
                <div class="flex justify-center space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        @click="showConfirmModal = false; confirmMessage = ''" 
                        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="confirmAction()" 
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


import { ref, computed, onMounted, nextTick } from 'vue'
import { useUserStore } from '../../store/user.store'
import { useAuthStore } from '../../store/auth.store'
import { useUsertypeStore } from '../../store/usertype.store'
import type { User } from '../../api/models/user.model'

const userStore = useUserStore()
const authStore = useAuthStore()
const usertypeStore = useUsertypeStore()

const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const selectedUser = ref<User | null>(null)
const editingUser = ref<User | null>(null)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => void)>(() => {})

const userForm = ref({
    first_name: '',
    last_name: '',
    phone_number: '',
    job_title: '',
    staffid: '',
    gender: '',
    email: '',
    ss_no: '',
    usertype: 1,
    dob: '',
    issue_date: '',
    expiry_date: '',
    government_issued_id_number: ''
})

const filteredUsers = computed(() => {
    const users = userStore.users;
    if (!Array.isArray(users)) {
        console.log('users is not an array:', users);
        return [];
    }
    return users;
})

const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString()
}

const loadUsers = async () => {
    try {
        let query: any = {};
        
        // Add search filter - trim whitespace and check if not empty
        if (searchQuery.value && searchQuery.value.trim()) {
            const searchTerm = searchQuery.value.trim();
            query.$or = [
                { first_name: { $like: `%${searchTerm}%` } },
                { last_name: { $like: `%${searchTerm}%` } },
                { email: { $like: `%${searchTerm}%` } },
                { staffid: { $like: `%${searchTerm}%` } },
                { phone_number: { $like: `%${searchTerm}%` } },
                { job_title: { $like: `%${searchTerm}%` } }
            ];
        }
        
        // Add company filter from auth store
        if (authStore.user?.company_id) {
            query.company_id = authStore.user.company_id;
        }
        
        // Add pagination parameters
        query.$limit = userStore.pagination.limit;
        query.$skip = userStore.pagination.skip;
        
        // Add sorting by date_created descending (newest first)
        query.$sort = { date_created: -1 };
        
        const params = Object.keys(query).length > 0 ? { query } : undefined;
        await userStore.fetchUsers(params)
    } catch (error) {
        console.error('Failed to load users:', error)
        // Show error message to user
        showSuccessModal.value = true
        successMessage.value = 'Failed to load users. Please try again.'
    }
}

// Pagination computed properties
const totalPages = computed(() => {
    return Math.ceil(userStore.pagination.total / userStore.pagination.limit)
})

const visiblePages = computed(() => {
    const current = userStore.pagination.currentPage
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
    if (typeof page === 'number' && page > 0 && page <= totalPages.value) {
        userStore.setPage(page)
        await loadUsers()
    }
}

const nextPage = async () => {
    if (userStore.pagination.currentPage < totalPages.value && !userStore.loading) {
        userStore.setPage(userStore.pagination.currentPage + 1)
        await loadUsers()
    }
}

const previousPage = async () => {
    if (userStore.pagination.currentPage > 1 && !userStore.loading) {
        userStore.setPage(userStore.pagination.currentPage - 1)
        await loadUsers()
    }
}

const onLimitChange = async () => {
    const newLimit = Number(userStore.pagination.limit)
    if (newLimit > 0) {
        userStore.setLimit(newLimit)
        userStore.setPage(1) // Reset to first page when changing limit
        await loadUsers()
    }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const onSearchChange = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        userStore.setPage(1) // Reset to first page when searching
        await loadUsers()
    }, 500) // Increased debounce time for better performance
}

const clearFilters = async () => {
    searchQuery.value = ''
    userStore.setPage(1)
    await loadUsers()
}

const viewDetails = (user: User) => {
    selectedUser.value = user
    showDetailsModal.value = true
}

const editUser = (user: User) => {
    editingUser.value = user
    
    // Helper function to format date for HTML date input (YYYY-MM-DD)
    const formatDateForInput = (dateString: string | null | undefined) => {
        if (!dateString) return ''
        try {
            return new Date(dateString).toISOString().split('T')[0]
        } catch (error) {
            console.warn('Invalid date format:', dateString)
            return ''
        }
    }
    
    userForm.value = {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        job_title: user.job_title,
        staffid: user.staffid,
        gender: user.gender,
        email: user.email,
        ss_no: user.ss_no,
        usertype: user.usertype,
        dob: formatDateForInput(user.dob),
        issue_date: formatDateForInput(user.issue_date),
        expiry_date: formatDateForInput(user.expiry_date),
        government_issued_id_number: user.government_issued_id_number || ''
    }
    showEditModal.value = true
}

const saveUser = async () => {
    try {
        // Format date fields to date only (not datetime)
        const formatDateField = (dateString: string) => {
            if (!dateString) return dateString
            return new Date(dateString).toISOString().split('T')[0]
        }

        const userData = {
            ...userForm.value,
            dob: formatDateField(userForm.value.dob),
            issue_date: formatDateField(userForm.value.issue_date),
            expiry_date: formatDateField(userForm.value.expiry_date)
        }

        if (showEditModal.value && editingUser.value) {
            // Update existing user
            await userStore.updateUser(editingUser.value.id, userData)
            showSuccessModal.value = true
            successMessage.value = 'User updated successfully!'
        } else {
            // Create new user
            const createData = {
                ...userData,
                company_id: authStore.user?.company_id
            }
            await userStore.createUser(createData)
            showSuccessModal.value = true
            successMessage.value = 'User created successfully!'
        }
        closeEditModal()
        // If we were editing from details modal, close it too
        if (showDetailsModal.value) {
            showDetailsModal.value = false
            selectedUser.value = null
        }
        // Refresh the current page data after create/update
        await loadUsers()
    } catch (error) {
        console.error('Failed to save user:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to save user. Please try again.'
    }
}

const deleteUser = async (id: number) => {
    confirmMessage.value = 'Are you sure you want to delete this user? This action cannot be undone.'
    confirmAction.value = async () => {
        try {
            await userStore.deleteUser(id)
            showSuccessModal.value = true
            successMessage.value = 'User deleted successfully!'
            showConfirmModal.value = false
            // Refresh the current page data after deletion
            await loadUsers()
        } catch (error) {
            console.error('Failed to delete user:', error)
            showSuccessModal.value = true
            successMessage.value = 'Failed to delete user. Please try again.'
            showConfirmModal.value = false
        }
    }
    showConfirmModal.value = true
}

const closeModal = () => {
    showCreateModal.value = false
    showEditModal.value = false
    showDetailsModal.value = false
    selectedUser.value = null
    editingUser.value = null
    userForm.value = {
        first_name: '',
        last_name: '',
        phone_number: '',
        job_title: '',
        staffid: '',
        gender: '',
        email: '',
        ss_no: '',
        usertype: 1,
        dob: '',
        issue_date: '',
        expiry_date: '',
        government_issued_id_number: ''
    }
    userStore.clearError()
}

const closeEditModal = () => {
    showEditModal.value = false
    editingUser.value = null
    userForm.value = {
        first_name: '',
        last_name: '',
        phone_number: '',
        job_title: '',
        staffid: '',
        gender: '',
        email: '',
        ss_no: '',
        usertype: 1,
        dob: '',
        issue_date: '',
        expiry_date: '',
        government_issued_id_number: ''
    }
    userStore.clearError()
}

onMounted(async () => {
    // Set default pagination limit if not already set
    if (!userStore.pagination.limit || userStore.pagination.limit < 1) {
        userStore.setLimit(10)
    }
    
    await Promise.all([
        loadUsers(),
        usertypeStore.fetchUsertypes()
    ])
})
</script> 
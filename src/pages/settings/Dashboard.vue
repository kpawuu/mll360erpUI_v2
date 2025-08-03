<template>
    <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        <svg class="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Settings Dashboard
                    </h1>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">System configuration and management overview</p>
                </div>
                <div class="flex items-center space-x-3">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        System Online
                    </span>
                    <button 
                        @click="refreshDashboard" 
                        :disabled="isRefreshing"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg 
                            :class="['w-4 h-4 mr-2', { 'animate-spin': isRefreshing }]" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
                    </button>
                    
                    <!-- Temporary test button for debugging -->
                    <button 
                        @click="createTestAuditLogs" 
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-700 transition-colors"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Test Audit Logs
                    </button>
                </div>
            </div>
        </div>

        <!-- Statistics Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Company Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div v-if="companyStore.loading" class="animate-pulse">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl mr-4"></div>
                        <div class="flex-1">
                            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2"></div>
                            <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12 mb-1"></div>
                            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Company</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.company }}</p>
                        <p class="text-xs text-green-600 dark:text-green-400 flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Active
                        </p>
                    </div>
                </div>
            </div>

            <!-- Users Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div v-if="userStore.loading" class="animate-pulse">
                <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl mr-4"></div>
                        <div class="flex-1">
                            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
                            <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12 mb-1"></div>
                            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Users</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.users }}</p>
                        <p class="text-xs text-green-600 dark:text-green-400 flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            {{ stats.activeUsers }} active
                        </p>
                    </div>
                </div>
            </div>

            <!-- Entities Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div v-if="entityStore.loading" class="animate-pulse">
                <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl mr-4"></div>
                        <div class="flex-1">
                            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2"></div>
                            <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-1"></div>
                            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v4m5-6h8M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0h3a2 2 0 012 2v4m0 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"></path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Entities</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.entities }}</p>
                        <p class="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                            {{ stats.entityGroups }} groups
                        </p>
                    </div>
                </div>
            </div>

            <!-- Shipments Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div v-if="shipmentStore.loading" class="animate-pulse">
                <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-xl mr-4"></div>
                        <div class="flex-1">
                            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
                            <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-1"></div>
                            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Shipments</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.shipments }}</p>
                        <p class="text-xs text-orange-600 dark:text-orange-400 flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                            {{ stats.shipmentTypes }} types
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <!-- Quick Actions -->
            <div class="lg:col-span-2">
                <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            Quick Actions
                        </h3>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <router-link to="/settings/users" class="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Add User</h4>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Create new user account</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                        Get started
                                    </div>
                                </div>
                            </router-link>

                            <router-link to="/settings/entities" class="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Add Entity</h4>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Create new client/supplier</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                        Get started
                                    </div>
                                </div>
                            </router-link>

                            <router-link to="/settings/user-role-assignment" class="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Assign Roles</h4>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Manage user permissions</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                        Get started
                                    </div>
                                </div>
                            </router-link>

                            <router-link to="/settings/company" class="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Company Settings</h4>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Update company details</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                        Get started
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Health -->
            <div>
                <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                            System Health
                        </h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">Database Connection</span>
                                </div>
                                <span class="text-sm text-green-600 dark:text-green-400 font-medium">Healthy</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">API Services</span>
                                </div>
                                <span class="text-sm text-green-600 dark:text-green-400 font-medium">Online</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">File Storage</span>
                                </div>
                                <span class="text-sm text-green-600 dark:text-green-400 font-medium">Available</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">Email Service</span>
                                </div>
                                <span class="text-sm text-green-600 dark:text-green-400 font-medium">Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity Section - Full Width -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Recent Activity
                    </h3>
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            {{ auditlogsStore.pagination.total || 0 }} activities
                        </span>
                        <button @click="loadActivityData" class="inline-flex items-center p-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Search -->
                    <div class="lg:col-span-2">
                        <label for="activity-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Activities</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                id="activity-search"
                                v-model="activitySearchQuery"
                                @input="onActivitySearchChange"
                                type="text"
                                class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                                placeholder="Search by action, entity, or user..."
                            />
                        </div>
                    </div>

                    <!-- Action Filter -->
                    <div>
                        <label for="action-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Action</label>
                        <select
                            id="action-filter"
                            v-model="selectedAction"
                            @change="onActionFilterChange"
                            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                        >
                            <option value="">All Actions</option>
                            <option value="CREATE">Create</option>
                            <option value="UPDATE">Update</option>
                            <option value="PATCH">Patch</option>
                            <option value="REMOVE">Remove</option>
                        </select>
                    </div>

                    <!-- Category Filter -->
                    <div>
                        <label for="category-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                        <select
                            id="category-filter"
                            v-model="selectedCategory"
                            @change="onCategoryFilterChange"
                            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                        >
                            <option value="">All Categories</option>
                            <option value="user_management">User Management</option>
                            <option value="customer_management">Customer Management</option>
                            <option value="authorization">Authorization</option>
                            <option value="shipment_management">Shipment Management</option>
                            <option value="company_management">Company Management</option>
                        </select>
                    </div>
                </div>

                <!-- Clear Filters Button -->
                <div class="mt-4 flex justify-end">
                    <button
                        @click="clearActivityFilters"
                        v-if="activitySearchQuery || selectedAction || selectedCategory"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-purple-400 dark:focus:border-purple-400 transition-colors"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Clear Filters
                    </button>
                </div>
            </div>

            <!-- Activity Table -->
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    <span>Action</span>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    <span>Entity</span>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    <span>User</span>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    <span>Category</span>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    <span>Time</span>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    <span>Status</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loading Skeleton -->
                        <tr v-if="auditlogsStore.loading" v-for="i in 5" :key="`skeleton-${i}`" class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 animate-pulse">
                            <td class="px-6 py-4">
                                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                            </td>
                        </tr>

                        <!-- Activity Data -->
                        <tr v-else-if="auditlogsStore.auditlogs && auditlogsStore.auditlogs.length > 0" v-for="activity in auditlogsStore.auditlogs" :key="activity.id" class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" @click="showActivityDetails(activity)">
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': activity.action === 'CREATE',
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': activity.action === 'UPDATE',
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': activity.action === 'PATCH',
                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': activity.action === 'REMOVE'
                                }">
                                    {{ activity.action }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <span class="font-medium text-gray-900 dark:text-white capitalize">{{ activity.entity_type }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                        <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                                            {{ activity.user ? `${activity.user.first_name} ${activity.user.last_name}` : 'System' }}
                                        </div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">
                                            {{ activity.user ? activity.user.email : 'system@example.com' }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 capitalize">
                                    {{ activity.category }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 dark:text-white">{{ formatActivityTime(activity.date_created) }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">{{ formatRelativeTime(activity.date_created) }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': activity.level === 'info',
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': activity.level === 'warn',
                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': activity.level === 'error'
                                }">
                                    {{ activity.level }}
                                </span>
                            </td>
                        </tr>

                        <!-- Empty State -->
                        <tr v-else class="bg-white dark:bg-gray-800">
                            <td colspan="6" class="px-6 py-12 text-center">
                                <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg class="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Activities Found</h3>
                                <p class="text-gray-600 dark:text-gray-400 mb-4">
                                    {{ activitySearchQuery || selectedAction || selectedCategory ? 'Try adjusting your filters' : 'Activity will appear here as you use the system' }}
                                </p>
                                <button v-if="!activitySearchQuery && !selectedAction && !selectedCategory" @click="createTestAuditLogs" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Generate Sample Activity
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <label for="activity-limit" class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
                            <select
                                id="activity-limit"
                                v-model="activityLimit"
                                @change="onActivityLimitChange"
                                class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">
                            Showing {{ (auditlogsStore.pagination.currentPage - 1) * auditlogsStore.pagination.limit + 1 }} to {{ Math.min(auditlogsStore.pagination.currentPage * auditlogsStore.pagination.limit, auditlogsStore.pagination.total) }} of {{ auditlogsStore.pagination.total }} entries
                        </span>
                    </div>

                    <div class="flex items-center space-x-2">
                        <button
                            @click="previousActivityPage"
                            :disabled="auditlogsStore.pagination.currentPage <= 1"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Previous
                        </button>

                        <div class="flex items-center space-x-1">
                            <template v-for="page in visibleActivityPages" :key="page">
                                <button
                                    v-show="page !== -1"
                                    @click="goToActivityPage(page)"
                                    :class="[
                                        'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                        page === auditlogsStore.pagination.currentPage
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600'
                                    ]"
                                >
                                    {{ page }}
                                </button>
                                <span
                                    v-show="page === -1"
                                    class="px-3 py-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                                >
                                    ...
                                </span>
                            </template>
                        </div>

                        <button
                            @click="nextActivityPage"
                            :disabled="auditlogsStore.pagination.currentPage >= auditlogsStore.getTotalPages"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600"
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

        <!-- Activity Details Modal -->
        <div v-if="selectedActivity" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
            <div class="relative w-full max-w-6xl max-h-full">
                <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-xl">
                        <h3 class="text-xl font-semibold text-white flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Activity Details
                        </h3>
                        <button @click="closeActivityDetails" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <!-- Activity Summary -->
                        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    {{ formatActivityTitle(selectedActivity) }}
                                </h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    {{ formatActivityDescription(selectedActivity) }}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Activity metadata -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Action</div>
                                <div class="text-sm text-gray-900 dark:text-white font-semibold">{{ selectedActivity.action }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Entity Type</div>
                                <div class="text-sm text-gray-900 dark:text-white font-semibold capitalize">{{ selectedActivity.entity_type }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</div>
                                <div class="text-sm text-gray-900 dark:text-white font-semibold capitalize">{{ selectedActivity.category }}</div>
                            </div>
                        </div>

                        <!-- Audit Changes Section -->
                        <div>
                            <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Audit Changes
                            </h5>
                            
                            <!-- Structured Changes -->
                            <div v-if="selectedActivity.changes && Object.keys(selectedActivity.changes).length > 0" class="space-y-4">
                                <div v-for="(change, field) in selectedActivity.changes" :key="field" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                                        <div class="text-sm font-semibold text-gray-900 dark:text-white capitalize">{{ field }}</div>
                                    </div>
                                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        <div class="p-4 border-r border-gray-200 dark:border-gray-600">
                                            <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                                                <svg class="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                                Previous Value
                                            </div>
                                            <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-l-4 border-red-400">
                                                <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">{{ formatChangeValue(change, 'from') }}</pre>
                                            </div>
                                        </div>
                                        <div class="p-4">
                                            <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                                                <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                New Value
                                            </div>
                                            <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-400">
                                                <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">{{ formatChangeValue(change, 'to') }}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Created Data -->
                            <div v-else-if="selectedActivity.new_data && Object.keys(selectedActivity.new_data).length > 0" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div class="bg-green-50 dark:bg-green-900/20 px-4 py-3 border-b border-green-200 dark:border-green-700">
                                    <div class="text-sm font-semibold text-green-900 dark:text-green-100 flex items-center">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        Created Data
                                    </div>
                                </div>
                                <div class="p-4">
                                    <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-700 p-3 rounded">{{ JSON.stringify(selectedActivity.new_data, null, 2) }}</pre>
                                </div>
                            </div>
                            
                            <!-- Deleted Data -->
                            <div v-else-if="selectedActivity.old_data && Object.keys(selectedActivity.old_data).length > 0" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div class="bg-red-50 dark:bg-red-900/20 px-4 py-3 border-b border-red-200 dark:border-red-700">
                                    <div class="text-sm font-semibold text-red-900 dark:text-red-100 flex items-center">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                        Deleted Data
                                    </div>
                                </div>
                                <div class="p-4">
                                    <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-700 p-3 rounded">{{ JSON.stringify(selectedActivity.old_data, null, 2) }}</pre>
                                </div>
                            </div>
                            
                            <!-- No Changes -->
                            <div v-else class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <div class="text-sm text-gray-500 dark:text-gray-400">No detailed changes available</div>
                            </div>
                        </div>

                        <!-- Technical Details -->
                        <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
                            <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Technical Details
                            </h5>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date & Time</div>
                                    <div class="text-sm text-gray-900 dark:text-white font-mono">{{ formatActivityTime(selectedActivity.date_created) }}</div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">IP Address</div>
                                    <div class="text-sm text-gray-900 dark:text-white font-mono">{{ selectedActivity.ip_address || 'N/A' }}</div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">HTTP Method</div>
                                    <div class="text-sm text-gray-900 dark:text-white font-mono">{{ selectedActivity.method || 'N/A' }}</div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Endpoint</div>
                                    <div class="text-sm text-gray-900 dark:text-white font-mono">{{ selectedActivity.endpoint || 'N/A' }}</div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Status Code</div>
                                    <div class="text-sm text-gray-900 dark:text-white font-mono">{{ selectedActivity.status_code || 'N/A' }}</div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Duration</div>
                                    <div class="text-sm text-gray-900 dark:text-white font-mono">{{ selectedActivity.duration ? `${selectedActivity.duration}ms` : 'N/A' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                        <button 
                            @click="closeActivityDetails" 
                            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../../store/user.store'
import { useEntityStore } from '../../store/entity.store'
import { useRolesStore } from '../../store/roles.store'
import { useShipmentStore } from '../../store/shipment.store'
import { useCompanyStore } from '../../store/company.store'
import { useEntityGroupStore } from '../../store/entity-group.store'
import { useShipmentTypeStore } from '../../store/shipment-type.store'
import { useAuditlogsStore } from '../../store/auditlogs.store'

// Store instances
const userStore = useUserStore()
const entityStore = useEntityStore()
const rolesStore = useRolesStore()
const shipmentStore = useShipmentStore()
const companyStore = useCompanyStore()
const entityGroupStore = useEntityGroupStore()
const shipmentTypeStore = useShipmentTypeStore()
const auditlogsStore = useAuditlogsStore()

// Local state
const isRefreshing = ref(false)

// Activity filtering and pagination state
const activitySearchQuery = ref('')
const selectedAction = ref('')
const selectedCategory = ref('')
const activityLimit = ref(10)

// Activity details modal state
const selectedActivity = ref<any>(null)

// Computed stats from API data
const stats = computed(() => ({
    company: companyStore.companies.length || 1, // At least 1 company exists
                users: userStore.pagination.total || userStore.users.length || 0,
            activeUsers: userStore.users.filter(user => !user.date_deleted).length || 0,
    entities: entityStore.pagination.total || entityStore.entities.length || 0,
    entityGroups: entityGroupStore.entityGroups.length || 0,
    shipments: shipmentStore.pagination.total || shipmentStore.shipments.length || 0,
    shipmentTypes: shipmentTypeStore.shipmentTypes.length || 0
}))

// Use real audit logs data
const recentActivity = computed(() => auditlogsStore.getRecentActivity)

// Load all dashboard data
const loadDashboardData = async () => {
    try {
        console.log('🔄 Loading dashboard data...')
        
        // Load all data in parallel for better performance
        await Promise.all([
            userStore.fetchUsers({ query: { $limit: 1000 } }),
            entityStore.fetchEntities({ $limit: 1000 }),
            rolesStore.fetchRoles(),
            shipmentStore.fetchShipments({ query: { $limit: 1000 } }),
            companyStore.fetchCompanies({ query: { $limit: 1000 } }),
            entityGroupStore.fetchEntityGroups(),
            shipmentTypeStore.fetchShipmentTypes(),
            auditlogsStore.fetchRecentActivity(10) // Load recent activity
        ])
        
        console.log('✅ Dashboard data loaded successfully')
        console.log('📊 Audit logs count:', auditlogsStore.auditlogs.length)
        console.log('📊 Recent activity count:', recentActivity.value.length)
        console.log('📊 Recent activity data:', recentActivity.value)
        
    } catch (error) {
        console.error('❌ Failed to load dashboard data:', error)
    }
}

// Refresh dashboard
const refreshDashboard = async () => {
    isRefreshing.value = true
    try {
        await loadDashboardData()
    } catch (error) {
        console.error('Failed to refresh dashboard:', error)
    } finally {
        isRefreshing.value = false
    }
}

// Temporary test function to create sample audit logs
const createTestAuditLogs = async () => {
    try {
        console.log('🧪 Creating test audit logs...')
        
        const testLogs = [
            {
                user_id: 1,
                company_id: 1,
                action: 'CREATE',
                entity_type: 'users',
                entity_id: 1,
                old_data: {},
                new_data: { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
                changes: { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
                ip_address: '127.0.0.1',
                user_agent: 'Test Browser',
                session_id: 'test-session',
                request_id: 'test-request',
                method: 'POST',
                endpoint: '/users',
                status_code: 201,
                duration: 150,
                level: 'info',
                category: 'user_management',
                metadata: { test: true }
            },
            {
                user_id: 1,
                company_id: 1,
                action: 'UPDATE',
                entity_type: 'entities',
                entity_id: 1,
                old_data: { name: 'Old Company' },
                new_data: { name: 'New Company' },
                changes: { name: { from: 'Old Company', to: 'New Company' } },
                ip_address: '127.0.0.1',
                user_agent: 'Test Browser',
                session_id: 'test-session',
                request_id: 'test-request',
                method: 'PATCH',
                endpoint: '/entities/1',
                status_code: 200,
                duration: 100,
                level: 'info',
                category: 'customer_management',
                metadata: { test: true }
            },
            {
                user_id: 1,
                company_id: 1,
                action: 'CREATE',
                entity_type: 'roles',
                entity_id: 1,
                old_data: {},
                new_data: { name: 'Admin', description: 'Administrator role' },
                changes: { name: 'Admin', description: 'Administrator role' },
                ip_address: '127.0.0.1',
                user_agent: 'Test Browser',
                session_id: 'test-session',
                request_id: 'test-request',
                method: 'POST',
                endpoint: '/roles',
                status_code: 201,
                duration: 120,
                level: 'info',
                category: 'authorization',
                metadata: { test: true }
            },
            {
                user_id: 1,
                company_id: 1,
                action: 'REMOVE',
                entity_type: 'shipments',
                entity_id: 1,
                old_data: { id: 1, tracking_number: 'TRK123' },
                new_data: {},
                changes: { deleted: true },
                ip_address: '127.0.0.1',
                user_agent: 'Test Browser',
                session_id: 'test-session',
                request_id: 'test-request',
                method: 'DELETE',
                endpoint: '/shipments/1',
                status_code: 200,
                duration: 80,
                level: 'info',
                category: 'shipment_management',
                metadata: { test: true }
            },
            {
                user_id: 1,
                company_id: 1,
                action: 'PATCH',
                entity_type: 'company',
                entity_id: 1,
                old_data: { name: 'Old Company Name' },
                new_data: { name: 'Updated Company Name' },
                changes: { name: { from: 'Old Company Name', to: 'Updated Company Name' } },
                ip_address: '127.0.0.1',
                user_agent: 'Test Browser',
                session_id: 'test-session',
                request_id: 'test-request',
                method: 'PATCH',
                endpoint: '/company/1',
                status_code: 200,
                duration: 95,
                level: 'info',
                category: 'company_management',
                metadata: { test: true }
            }
        ]
        
        for (const log of testLogs) {
            try {
                await auditlogsStore.createAuditlog(log)
                console.log('✅ Created test audit log:', log.action, log.entity_type)
            } catch (err) {
                console.error('❌ Failed to create test audit log:', err)
            }
        }
        
        // Refresh the recent activity
        await auditlogsStore.fetchRecentActivity(10)
        console.log('🔄 Refreshed recent activity after creating test logs')
        
    } catch (error) {
        console.error('❌ Error creating test audit logs:', error)
    }
}

// Activity data loading function
const loadActivityData = async () => {
    try {
        const query: any = {
            $limit: activityLimit.value,
            $skip: (auditlogsStore.pagination.currentPage - 1) * activityLimit.value,
            $sort: { date_created: -1 }
        }

        // Add search filter
        if (activitySearchQuery.value.trim()) {
            query.search = activitySearchQuery.value.trim()
        }

        // Add action filter (only if a specific action is selected, otherwise backend handles the filtering)
        if (selectedAction.value) {
            query.action = selectedAction.value
        }

        // Add category filter
        if (selectedCategory.value) {
            query.category = selectedCategory.value
        }

        await auditlogsStore.fetchAuditlogs({ query })
    } catch (error) {
        console.error('Failed to load activity data:', error)
    }
}

// Activity search and filter handlers
const onActivitySearchChange = () => {
    auditlogsStore.setPage(1)
    loadActivityData()
}

const onActionFilterChange = () => {
    auditlogsStore.setPage(1)
    loadActivityData()
}

const onCategoryFilterChange = () => {
    auditlogsStore.setPage(1)
    loadActivityData()
}

const clearActivityFilters = () => {
    activitySearchQuery.value = ''
    selectedAction.value = ''
    selectedCategory.value = ''
    auditlogsStore.setPage(1)
    loadActivityData()
}

// Activity pagination handlers
const onActivityLimitChange = () => {
    auditlogsStore.setLimit(activityLimit.value)
    auditlogsStore.setPage(1)
    loadActivityData()
}

const goToActivityPage = (page: number) => {
    auditlogsStore.setPage(page)
    loadActivityData()
}

const nextActivityPage = () => {
    if (auditlogsStore.pagination.currentPage < auditlogsStore.getTotalPages) {
        auditlogsStore.setPage(auditlogsStore.pagination.currentPage + 1)
        loadActivityData()
    }
}

const previousActivityPage = () => {
    if (auditlogsStore.pagination.currentPage > 1) {
        auditlogsStore.setPage(auditlogsStore.pagination.currentPage - 1)
        loadActivityData()
    }
}

// Activity pagination computed properties
const visibleActivityPages = computed(() => {
    const current = auditlogsStore.pagination.currentPage
    const total = auditlogsStore.getTotalPages
    const pages: number[] = []

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        if (current <= 4) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i)
            }
            pages.push(-1) // Ellipsis
            pages.push(total)
        } else if (current >= total - 3) {
            pages.push(1)
            pages.push(-1) // Ellipsis
            for (let i = total - 4; i <= total; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)
            pages.push(-1) // Ellipsis
            for (let i = current - 1; i <= current + 1; i++) {
                pages.push(i)
            }
            pages.push(-1) // Ellipsis
            pages.push(total)
        }
    }

    return pages
})

// Time formatting functions
const formatActivityTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const formatRelativeTime = (dateString: string): string => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
        const days = Math.floor(diffInSeconds / 86400)
        return `${days} day${days > 1 ? 's' : ''} ago`
    }
}

// Activity details modal functions
const showActivityDetails = (activity: any) => {
    selectedActivity.value = activity
}

const closeActivityDetails = () => {
    selectedActivity.value = null
}

// Activity formatting functions
const formatActivityTitle = (activity: any): string => {
    const actionMap: Record<string, string> = {
        'CREATE': 'Created',
        'UPDATE': 'Updated',
        'DELETE': 'Deleted',
        'PATCH': 'Modified',
        'REMOVE': 'Removed',
        'GET': 'Viewed'
    }

    const entityMap: Record<string, string> = {
        'users': 'User',
        'entities': 'Entity',
        'roles': 'Role',
        'user-roles': 'User Role',
        'company': 'Company',
        'company-branches': 'Company Branch',
        'company-departments': 'Department',
        'shipments': 'Shipment',
        'shipment-types': 'Shipment Type',
        'entity-groups': 'Entity Group'
    }

    const action = actionMap[activity.action] || activity.action
    const entity = entityMap[activity.entity_type] || activity.entity_type

    return `${action} ${entity}`
}

const formatActivityDescription = (activity: any): string => {
    const user = activity.user
    const userName = user ? `${user.first_name} ${user.last_name}` : 'System'

    if (activity.action === 'CREATE') {
        return `${userName} created a new ${activity.entity_type}`
    } else if (activity.action === 'UPDATE' || activity.action === 'PATCH') {
        return `${userName} updated ${activity.entity_type} details`
    } else if (activity.action === 'DELETE' || activity.action === 'REMOVE') {
        return `${userName} deleted a ${activity.entity_type}`
    } else {
        return `${userName} performed ${activity.action.toLowerCase()} on ${activity.entity_type}`
    }
}

const formatChangeValue = (change: any, type: 'from' | 'to'): string => {
    if (typeof change === 'object' && change !== null) {
        if (change.from !== undefined && change.to !== undefined) {
            return type === 'from' ? change.from : change.to
        } else {
            return JSON.stringify(change, null, 2)
        }
    }
    return String(change || 'N/A')
}

onMounted(async () => {
    await loadDashboardData()
    await loadActivityData()
})
</script>

<style scoped>
/* Add your styles here */
</style> 
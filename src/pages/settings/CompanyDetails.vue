<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Company Profile</h1>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">Manage your company information and organizational structure</p>
                </div>
                <button @click="showEditModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit Company
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="companyStore.loading" class="space-y-8">
            <!-- Company Overview Skeleton -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
                            <div>
                                <div class="h-8 bg-white/20 rounded-lg w-48 animate-pulse mb-2"></div>
                                <div class="h-4 bg-white/20 rounded w-32 animate-pulse"></div>
                            </div>
                        </div>
                        <div class="w-20 h-8 bg-white/20 rounded-full animate-pulse"></div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Contact Details Skeleton -->
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse mb-1"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse mb-1"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse mb-1"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Location Skeleton -->
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="w-5 h-5 bg-green-600 rounded mr-2"></div>
                                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse mb-1"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse mb-1"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Info Skeleton -->
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="w-5 h-5 bg-purple-600 rounded mr-2"></div>
                                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse mb-1"></div>
                                        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                    <div class="flex-1">
                                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse mb-1"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Branches Skeleton -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-white/20 rounded-lg animate-pulse"></div>
                            <div>
                                <div class="h-6 bg-white/20 rounded w-40 animate-pulse mb-1"></div>
                                <div class="h-4 bg-white/20 rounded w-48 animate-pulse"></div>
                            </div>
                        </div>
                        <div class="w-24 h-8 bg-white/20 rounded-lg animate-pulse"></div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="i in 3" :key="i" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24 animate-pulse mb-2"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Departments Skeleton -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-white/20 rounded-lg animate-pulse"></div>
                            <div>
                                <div class="h-6 bg-white/20 rounded w-44 animate-pulse mb-1"></div>
                                <div class="h-4 bg-white/20 rounded w-52 animate-pulse"></div>
                            </div>
                        </div>
                        <div class="w-28 h-8 bg-white/20 rounded-lg animate-pulse"></div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="i in 3" :key="i" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-28 animate-pulse mb-2"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-36 animate-pulse"></div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Company Details -->
        <div v-else-if="company" class="space-y-8">
            <!-- Company Overview Card -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-white">{{ company.name }}</h2>
                                <p class="text-blue-100">{{ company.description || 'Software Company' }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                                <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                Active
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Contact Information -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Contact Details
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.email }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.phone_number || 'N/A' }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Website</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.website || 'N/A' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Location & Country -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                </svg>
                                Location
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.location || 'N/A' }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Country</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.country?.name || 'N/A' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Information -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Additional Information
                            </h3>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">License Status</p>
                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="company.is_active_license ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">
                                            {{ company.is_active_license ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                </div>
                                
                               
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Date Created</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(company.date_created) }}</p>
                                    </div>
                                </div>
                                <div v-if="company.date_updated" class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(company.date_updated) }}</p>
                                    </div>
                                </div>
                                <div v-if="company.user_id" class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.user_id }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            <!-- Description -->
            <div v-if="company.description" class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Description
                </h3>
                <p class="text-gray-700 dark:text-gray-300">{{ company.description }}</p>
            </div>

            <!-- Company Branches -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Company Branches</h3>
                                <p class="text-orange-100">Manage your business locations</p>
                            </div>
                        </div>
                        <button @click="showBranchesModal = true" class="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-600 bg-white hover:bg-orange-50 rounded-lg shadow-sm transition-colors duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add Branch
                        </button>
                    </div>
                </div>
                
                <div class="p-6">
                    <!-- Loading State -->
                    <div v-if="branchesStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="i in 3" :key="i" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24 animate-pulse mb-2"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Branches List -->
                    <div v-else-if="branchesStore.branches.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="branch in branchesStore.branches" :key="branch.id" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 dark:text-white">{{ branch.name }}</h4>
                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            {{ branch.location_type || 'branch' }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <button @click="editBranch(branch)" class="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>
                                    <button @click="deleteBranch(branch.id)" class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                    </svg>
                                    <span>{{ branch.location || 'No address' }}</span>
                                </div>
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>{{ formatDateTime(branch.date_created) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else class="text-center py-12">
                        <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Branches Found</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Get started by adding your first company branch</p>
                        <button @click="showBranchesModal = true" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add First Branch
                        </button>
                    </div>
                </div>
            </div>

            <!-- Company Departments -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Company Departments</h3>
                                <p class="text-indigo-100">Manage your organizational structure</p>
                            </div>
                        </div>
                        <button @click="showDepartmentsModal = true" class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg shadow-sm transition-colors duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add Department
                        </button>
                    </div>
                </div>
                
                <div class="p-6">
                    <!-- Loading State -->
                    <div v-if="departmentsStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="i in 3" :key="i" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-28 animate-pulse mb-2"></div>
                                        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                                    </div>
                                </div>
                                <div class="flex space-x-1">
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-36 animate-pulse"></div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Departments List -->
                    <div v-else-if="departmentsStore.departments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="department in departmentsStore.departments" :key="department.id" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 dark:text-white">{{ department.name }}</h4>
                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                            Department
                                        </span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <button @click="editDepartment(department)" class="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>
                                    <button @click="deleteDepartment(department.id)" class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <span class="font-medium">Manager:</span>
                                    <span>{{ department.manager_details ? `${department.manager_details.first_name} ${department.manager_details.last_name}` : 'Not assigned' }}</span>
                                </div>
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    <span class="font-medium">Supervisor:</span>
                                    <span>{{ department.supervisor_details ? `${department.supervisor_details.first_name} ${department.supervisor_details.last_name}` : 'Not assigned' }}</span>
                                </div>
                                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>{{ formatDateTime(department.date_created) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else class="text-center py-12">
                        <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Departments Found</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Get started by adding your first company department</p>
                        <button @click="showDepartmentsModal = true" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add First Department
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Company Not Found</h3>
            <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
                We couldn't load your company information. This might be a temporary issue.
            </p>
            <div class="flex space-x-4">
                <button @click="loadCompany" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Refresh Page
                </button>
                <button @click="showEditModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Setup Company
                </button>
            </div>
        </div>
    </div>

    <!-- Edit Company Modal -->
    <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl max-h-full">
                            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Company Details
                    </h3>
                    <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form @submit.prevent="saveCompany">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                                <input v-model="companyForm.name" type="text" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input v-model="companyForm.email" type="email" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input v-model="companyForm.phone_number" type="tel" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                <input v-model="companyForm.website" type="url" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input v-model="companyForm.location" type="text" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea v-model="companyForm.description" rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"></textarea>
                            </div>
                            <div class="md:col-span-2">
                                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    <input v-model="companyForm.is_active_license" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-white">Active License</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                    <button @click="closeModal" class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button @click="saveCompany" :disabled="companyStore.loading" class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <div v-if="companyStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Update Company
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
                    <button @click="showSuccessModal = false; successMessage = ''" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Branches Modal -->
    <div v-if="showBranchesModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-lg">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        {{ editingBranch ? 'Edit Branch' : 'Add New Branch' }}
                    </h3>
                    <button @click="closeBranchesModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="saveBranch" class="p-6">
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch Name</label>
                            <input v-model="branchForm.name" type="text" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-colors">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch Location</label>
                            <textarea v-model="branchForm.location" rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-colors"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location Type</label>
                            <select v-model="branchForm.location_type" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-colors">
                                <option value="branch">Branch</option>
                                <option value="headquarter">Headquarters</option>
                                <option value="warehouse">Warehouse</option>
                                <option value="agent">Agent</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 mt-8">
                        <button type="button" @click="closeBranchesModal" class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ editingBranch ? 'Update' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Departments Modal -->
    <div v-if="showDepartmentsModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        {{ editingDepartment ? 'Edit Department' : 'Add New Department' }}
                    </h3>
                    <button @click="closeDepartmentsModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="saveDepartment" class="p-6">
                    <div class="space-y-6">
                        <!-- Department Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <span class="text-red-500">*</span> Department Name
                            </label>
                            <input 
                                v-model="departmentForm.name" 
                                type="text" 
                                required 
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Enter department name"
                            >
                        </div>

                        <!-- Manager Selection -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Department Manager
                            </label>
                            <div class="relative">
                                <select 
                                    v-model="departmentForm.manager_id" 
                                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors appearance-none bg-white dark:bg-gray-700"
                                >
                                    <option :value="undefined">Select a manager (optional)</option>
                                    <option 
                                        v-for="user in userStore.users" 
                                        :key="user.id" 
                                        :value="user.id"
                                        :disabled="user.id === departmentForm.supervisor_id"
                                    >
                                        {{ user.first_name }} {{ user.last_name }} - {{ user.job_title }}
                                    </option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Choose a manager to oversee this department
                            </p>
                        </div>

                        <!-- Supervisor Selection -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Department Supervisor
                            </label>
                            <div class="relative">
                                <select 
                                    v-model="departmentForm.supervisor_id" 
                                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors appearance-none bg-white dark:bg-gray-700"
                                >
                                    <option :value="undefined">Select a supervisor (optional)</option>
                                    <option 
                                        v-for="user in userStore.users" 
                                        :key="user.id" 
                                        :value="user.id"
                                        :disabled="user.id === departmentForm.manager_id"
                                    >
                                        {{ user.first_name }} {{ user.last_name }} - {{ user.job_title }}
                                    </option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Choose a supervisor to assist with department management
                            </p>
                        </div>

                        <!-- Info Box -->
                        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div class="flex items-start">
                                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <p class="text-sm text-blue-800 dark:text-blue-200 mb-2">
                                        <strong>Manager & Supervisor Guidelines:</strong>
                                    </p>
                                    <ul class="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                        <li>• A user cannot be both manager and supervisor of the same department</li>
                                        <li>• Only users from your company are available for selection</li>
                                        <li>• These assignments can be updated later in department settings</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 mt-8">
                        <button type="button" @click="closeDepartmentsModal" class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {{ editingDepartment ? 'Update' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCompanyStore } from '../../store/company.store'
import { useCompanyBranchesStore } from '../../store/company-branches.store'
import { useCompanyDepartmentsStore } from '../../store/company-departments.store'
import { useUserStore } from '../../store/user.store'
import { useAuthStore } from '../../store/auth.store'
import type { Company } from '../../api/models/company.model'
import type { CompanyBranch } from '../../api/models/company-branches.model'
import type { CompanyDepartment } from '../../api/models/company-departments.model'
import type { User } from '../../api/models/user.model'

const companyStore = useCompanyStore()
const branchesStore = useCompanyBranchesStore()
const departmentsStore = useCompanyDepartmentsStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const showEditModal = ref(false)
const showSuccessModal = ref(false)
const showBranchesModal = ref(false)
const showDepartmentsModal = ref(false)
const successMessage = ref('')

const company = ref<Company | null>(null)
const editingBranch = ref<CompanyBranch | null>(null)
const editingDepartment = ref<CompanyDepartment | null>(null)

const companyForm = ref({
    name: '',
    email: '',
    phone_number: '',
    website: '',
    location: '',
    description: '',
    is_active_license: false
})

const branchForm = ref({
    name: '',
    location: '',
    location_type: 'branch' as 'branch' | 'headquarter' | 'warehouse' | 'agent',
    company_id: 0
})

const departmentForm = ref({
    name: '',
    company_id: 0,
    manager_id: undefined as number | undefined,
    supervisor_id: undefined as number | undefined
})

const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
}

const loadCompany = async () => {
    try {
        console.log('Loading company...')
        console.log('User:', authStore.user)
        console.log('Company ID:', authStore.user?.company_id)
        
        if (authStore.user?.company_id) {
            console.log('Fetching company with ID:', authStore.user.company_id)
            const response = await companyStore.fetchCompany(authStore.user.company_id)
            company.value = response
            console.log('Company loaded:', response)
            
            // Populate form for editing
            companyForm.value = {
                name: response.name,
                email: response.email,
                phone_number: response.phone_number || '',
                website: response.website || '',
                location: response.location || '',
                description: response.description || '',
                is_active_license: response.is_active_license || false
            }
            
            // Load branches, departments, and users for this company
            await loadBranches()
            await loadDepartments()
            await loadCompanyUsers()
        } else {
            console.error('No company_id found in user data')
        }
    } catch (error) {
        console.error('Failed to load company:', error)
    }
}

const loadBranches = async () => {
    try {
        if (authStore.user?.company_id) {
            await branchesStore.fetchBranches({
                query: {
                    company_id: authStore.user.company_id,
                    $sort: { name: 1 }
                }
            })
        }
    } catch (error) {
        console.error('Failed to load branches:', error)
    }
}

const loadDepartments = async () => {
    try {
        if (authStore.user?.company_id) {
            await departmentsStore.fetchDepartments({
                query: {
                    company_id: authStore.user.company_id,
                    $sort: { name: 1 }
                }
            })
        }
    } catch (error) {
        console.error('Failed to load departments:', error)
    }
}

const loadCompanyUsers = async () => {
    try {
        if (authStore.user?.company_id) {
            await userStore.fetchUsers({
                query: {
                    company_id: authStore.user.company_id,
                    $sort: { first_name: 1 }
                }
            })
        }
    } catch (error) {
        console.error('Failed to load company users:', error)
    }
}

const saveCompany = async () => {
    try {
        if (company.value) {
            await companyStore.updateCompany(company.value.id, companyForm.value)
            showSuccessModal.value = true
            successMessage.value = 'Company updated successfully!'
            closeModal()
            await loadCompany() // Refresh data
        }
    } catch (error) {
        console.error('Failed to save company:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to update company. Please try again.'
    }
}

const saveBranch = async () => {
    try {
        if (authStore.user?.company_id) {
            const branchData = {
                name: branchForm.value.name,
                location: branchForm.value.location,
                location_type: branchForm.value.location_type,
                company_id: authStore.user.company_id
            }
            
            if (editingBranch.value) {
                await branchesStore.updateBranch(editingBranch.value.id, branchData)
                successMessage.value = 'Branch updated successfully!'
            } else {
                await branchesStore.createBranch(branchData)
                successMessage.value = 'Branch created successfully!'
            }
            
            showSuccessModal.value = true
            closeBranchesModal()
            await loadBranches()
        }
    } catch (error) {
        console.error('Failed to save branch:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to save branch. Please try again.'
    }
}

const saveDepartment = async () => {
    try {
        if (authStore.user?.company_id) {
            const departmentData = {
                name: departmentForm.value.name,
                company_id: authStore.user.company_id,
                manager_id: departmentForm.value.manager_id,
                supervisor_id: departmentForm.value.supervisor_id
            }
            
            if (editingDepartment.value) {
                await departmentsStore.updateDepartment(editingDepartment.value.id, departmentData)
                successMessage.value = 'Department updated successfully!'
            } else {
                await departmentsStore.createDepartment(departmentData)
                successMessage.value = 'Department created successfully!'
            }
            
            showSuccessModal.value = true
            closeDepartmentsModal()
            await loadDepartments()
        }
    } catch (error) {
        console.error('Failed to save department:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to save department. Please try again.'
    }
}

const editBranch = (branch: CompanyBranch) => {
    editingBranch.value = branch
    branchForm.value = {
        name: branch.name,
        location: branch.location,
        location_type: branch.location_type || 'branch',
        company_id: branch.company_id
    }
    showBranchesModal.value = true
}

const editDepartment = (department: CompanyDepartment) => {
    editingDepartment.value = department
    departmentForm.value = {
        name: department.name,
        company_id: department.company_id,
        manager_id: department.manager_id,
        supervisor_id: department.supervisor_id
    }
    showDepartmentsModal.value = true
}

const deleteBranch = async (id: number) => {
    if (confirm('Are you sure you want to delete this branch?')) {
        try {
            await branchesStore.deleteBranch(id)
            successMessage.value = 'Branch deleted successfully!'
            showSuccessModal.value = true
            await loadBranches()
        } catch (error) {
            console.error('Failed to delete branch:', error)
            showSuccessModal.value = true
            successMessage.value = 'Failed to delete branch. Please try again.'
        }
    }
}

const deleteDepartment = async (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
        try {
            await departmentsStore.deleteDepartment(id)
            successMessage.value = 'Department deleted successfully!'
            showSuccessModal.value = true
            await loadDepartments()
        } catch (error) {
            console.error('Failed to delete department:', error)
            showSuccessModal.value = true
            successMessage.value = 'Failed to delete department. Please try again.'
        }
    }
}

const closeModal = () => {
    showEditModal.value = false
    companyStore.clearError()
}

const closeBranchesModal = () => {
    showBranchesModal.value = false
    editingBranch.value = null
    branchForm.value = {
        name: '',
        location: '',
        location_type: 'branch' as 'branch' | 'headquarter' | 'warehouse' | 'agent',
        company_id: 0
    }
    branchesStore.clearError()
}

const closeDepartmentsModal = () => {
    showDepartmentsModal.value = false
    editingDepartment.value = null
    departmentForm.value = {
        name: '',
        company_id: 0,
        manager_id: undefined,
        supervisor_id: undefined
    }
    departmentsStore.clearError()
}

onMounted(() => {
    loadCompany()
})
</script> 
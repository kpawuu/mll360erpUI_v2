<template>
    <nav class="bg-white border-b border-gray-200 px-4 py-3 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <!-- Left Section: Logo, Mobile Menu -->
            <div class="flex justify-start items-center space-x-4">
                <!-- Mobile Menu Button -->
                <button 
                    data-drawer-target="drawer-navigation" 
                    data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    class="p-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                >
                    <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Toggle sidebar</span>
                </button>

                <!-- Logo -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                    <div class="hidden sm:block">
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white">MLL 360 ERP</h1>
                        <p style="font-size: 10px;" class="text-gray-500 dark:text-gray-400">Enterprise Resource Planning</p>
                    </div>
                </div>
            </div>

            <!-- Center Section: Enhanced Search Bar -->
            <div class="flex-1 max-w-2xl mx-4 hidden lg:block">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    </div>
                    <input 
                        v-model="searchQuery"
                        @input="handleSearch"
                        @focus="handleSearchFocus"
                        @blur="handleSearchBlur"
                        type="text" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        placeholder="Search across users, entities, shipments, opportunities, and more..." 
                    />
                    
                    <!-- Search Results Dropdown -->
                    <div v-if="showSearchResults && searchResults.length > 0" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Search Results</h3>
                                <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{{ searchResults.length }} results</span>
                            </div>
                        </div>
                        <div class="p-2 space-y-1">
                            <div v-for="result in searchResults" :key="result.id" class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-150">
                                <div class="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="result.icon"></path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900 dark:text-white">{{ result.title }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ result.subtitle }}</div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <span class="text-xs px-3 py-1 rounded-full font-medium" :class="result.badgeClass">{{ result.type }}</span>
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                                </div>
                        <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    <span>Press Enter to search all results</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    <span>ESC to close</span>
                                </div>
                            </div>
                        </div>
                                </div>
                                </div>
                            </div>

            <!-- Right Section: Notifications, Quick Actions, User Menu -->
            <div class="flex items-center space-x-4">
                <!-- Mobile Search Button -->
                <button 
                    @click="toggleMobileSearch"
                    class="p-2 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>

                <!-- Notifications Dropdown -->
                <div class="relative">
                    <button 
                        id="notification-dropdown-button"
                        data-dropdown-toggle="notification-dropdown"
                        data-dropdown-placement="bottom-end"
                        class="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-colors"
                        type="button"
                    >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                                    </svg>

                        <!-- Notification Badge -->
                        <span v-if="unreadNotifications > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                            {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
                        </span>
                    </button>

                    <!-- Notifications Dropdown -->
                    <div id="notification-dropdown" class="hidden z-50 w-80 max-w-sm my-4 text-base list-none bg-white rounded-lg shadow-lg dark:bg-gray-700" data-popper-placement="bottom-end">
                        <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300 rounded-t-lg">
                            <div class="flex items-center justify-between">
                                <span>Notifications</span>
                                <button @click="markAllAsRead" class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                    Mark all as read
                </button>
                            </div>
                                </div>
                        <div class="max-h-96 overflow-y-auto">
                            <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                                <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v7.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 17.25V9.75a6 6 0 00-6-6z"></path>
                                    </svg>
                                <p class="text-sm">No notifications</p>
                            </div>
                            <div v-else>
                                <div v-for="notification in notifications" :key="notification.id" class="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <div class="flex-shrink-0">
                                        <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="notification.color">
                                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="notification.icon"></path>
                                    </svg>
                                </div>
                            </div>
                                    <div class="ml-3 flex-1">
                                        <p class="text-sm text-gray-900 dark:text-white">{{ notification.message }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formatTime(notification.timestamp) }}</p>
                                </div>
                                    <div v-if="!notification.read" class="w-2 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                    </div>
                        <div class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline rounded-b-lg">
                            <router-link to="/notifications" class="inline-flex items-center">
                                <svg class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                            </svg>
                                View all notifications
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions Dropdown -->
                <div class="relative">
                    <button 
                        id="quick-actions-dropdown-button"
                        data-dropdown-toggle="quick-actions-dropdown"
                        data-dropdown-placement="bottom-end"
                        class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-colors"
                        type="button"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>

                    <!-- Quick Actions Dropdown -->
                    <div id="quick-actions-dropdown" class="hidden z-50 w-64 my-4 text-base list-none bg-white rounded-lg shadow-lg dark:bg-gray-700" data-popper-placement="bottom-end">
                        <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300 rounded-t-lg">
                            Quick Actions
                    </div>
                        <div class="p-2 space-y-1">
                            <router-link to="/settings/users" class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                <svg class="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                                Add New User
                            </router-link>
                            <router-link to="/settings/entities" class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                <svg class="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                                Add New Entity
                            </router-link>
                            <router-link to="/cs/shipments" class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                <svg class="w-4 h-4 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                                Create Shipment
                            </router-link>
                            <router-link to="/crm/opportunities" class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                <svg class="w-4 h-4 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                                New Opportunity
                            </router-link>
                        </div>
                    </div>
                            </div>

                <!-- User Menu Dropdown -->
                <div class="relative">
                    <button 
                        id="user-dropdown-button"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom-end"
                        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-colors"
                        type="button"
                    >
                        <!-- User Status Indicator -->
                        
                        
                        <!-- User Info -->
                        <div class="hidden md:block text-right">
                            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ userFullName }}</div>
                            <div  style="font-size: 10px;" class="text-gray-500 dark:text-gray-400">{{ userRole }}</div>
                            </div>
                        
                        <!-- User Avatar -->
                        <div class="flex items-center space-x-2">
                            <div class="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            </div>
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                            </div>
                    </button>

                    <!-- User Dropdown -->
                    <div id="user-dropdown" class="hidden z-50 w-64 my-4 text-base list-none bg-white rounded-lg shadow-lg dark:bg-gray-700" data-popper-placement="bottom-end">
                        <!-- User Header -->
                        <div class="py-3 px-4 border-b border-gray-200 dark:border-gray-600">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                                </div>
                                <div>
                                    <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ userFullName }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ userEmail }}</div>
                                    <div class="text-xs text-blue-600 dark:text-blue-400">{{ userRole }}</div>
                            </div>
                            </div>
                    </div>
                        
                        <!-- User Actions -->
                        <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="user-dropdown">
                            <li>
                                <router-link to="/settings/profile" class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    <svg class="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    My Profile
                                </router-link>
                        </li>
                        <li>
                                <router-link to="/settings/account" class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    <svg class="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    Account Settings
                                </router-link>
                        </li>
                    </ul>
                        <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="user-dropdown">
                            <li>
                                <button 
                                    @click="handleLogout" 
                                    class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Sign Out
                                </button>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Search Overlay -->
        <div v-if="showMobileSearch" class="md:hidden mt-3">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input 
                    v-model="searchQuery"
                    @input="handleSearch"
                    type="text" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search..." 
                />
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../../store/auth.store';
import { useRouter } from 'vue-router';
import type { User } from '../../api/models/user.model';
import { initializeFlowbite } from '../../utils/flowbite';

const authStore = useAuthStore();
const router = useRouter();

// Reactive state
const searchQuery = ref('');
const showMobileSearch = ref(false);
const showSearchResults = ref(false);

// Dummy search results data
const searchResults = ref([
    {
        id: 1,
        title: 'John Doe',
        subtitle: 'john.doe@company.com',
        type: 'User',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    },
    {
        id: 2,
        title: 'ABC Company Ltd',
        subtitle: 'Client - Active',
        type: 'Entity',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    },
    {
        id: 3,
        title: 'SHIP-2024-001',
        subtitle: 'In Transit - Lagos to Accra',
        type: 'Shipment',
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
        badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    },
    {
        id: 4,
        title: 'OPP-2024-005',
        subtitle: 'New Business Opportunity',
        type: 'Opportunity',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    },
    {
        id: 5,
        title: 'XYZ Logistics',
        subtitle: 'Supplier - Inactive',
        type: 'Entity',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
]);

// Mock data for demonstration
const notifications = ref([
    {
        id: 1,
        message: 'New shipment created successfully',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        color: 'bg-green-500',
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
    },
    {
        id: 2,
        message: 'User John Doe logged in from new device',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
        color: 'bg-blue-500',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
        id: 3,
        message: 'System maintenance scheduled for tonight',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        read: true,
        color: 'bg-yellow-500',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
    }
]);

// Computed properties
const userFullName = computed(() => {
    const user = authStore.user as User | null;
    if (user) {
        return `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User';
    }
    return 'User';
});

const userEmail = computed(() => {
    const user = authStore.user as User | null;
    return user?.email || 'user@example.com';
});

const userRole = computed(() => {
    const user = authStore.user as User | null;
    if (user?.usertype === 1) return 'Administrator';
    if (user?.department_id === 11) return 'CRM User';
    return 'Staff Member';
});

const userAvatar = computed(() => {
    // Always return null to use placeholder image
    return null;
});

const unreadNotifications = computed(() => {
    return notifications.value.filter(n => !n.read).length;
});

// Methods
const handleSearch = () => {
    // Show search results when user types
    if (searchQuery.value.trim().length > 0) {
        showSearchResults.value = true;
        // In a real implementation, this would call the API
        console.log('Searching for:', searchQuery.value);
    } else {
        showSearchResults.value = false;
    }
};

const handleSearchFocus = () => {
    if (searchQuery.value.trim().length > 0) {
        showSearchResults.value = true;
    }
};

const handleSearchBlur = () => {
    // Delay hiding to allow clicking on results
    window.setTimeout(() => {
        showSearchResults.value = false;
    }, 200);
};

const toggleMobileSearch = () => {
    showMobileSearch.value = !showMobileSearch.value;
};

const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true);
};

const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};

const handleLogout = async () => {
    try {
        await (authStore as any).logout();
        router.push('/auth/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

// Lifecycle
onMounted(() => {
    // Initialize Flowbite components
    setTimeout(() => {
        initializeFlowbite();
    }, 100);
});

onUnmounted(() => {
    // Cleanup if needed
});
</script>

<style scoped>
/* Custom styles for better animations */
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
}

/* Smooth transitions */
.transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

/* Flowbite dropdown styles */
[data-dropdown-toggle] {
    cursor: pointer;
}

[data-dropdown-toggle]:focus {
    outline: none;
}

/* Custom dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
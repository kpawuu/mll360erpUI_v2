<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Activities & Tasks</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage and track your activities and tasks</p>
        </div>
        <button
          @click="showAddModal = true"
          class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Activity
        </button>
      </div>
    </div>

    <!-- Debug Section (temporary) -->
    <div v-if="showDebug" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <h4 class="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Debug Info:</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <strong>Activities:</strong>
          <div>Loading: {{ activitiesStore.loading }}</div>
          <div>Error: {{ activitiesStore.error || 'None' }}</div>
          <div>Count: {{ activitiesStore.activities.length }}</div>
          <button @click="loadActivities()" class="mt-1 px-2 py-1 bg-blue-500 text-white rounded text-xs">
            Refresh Activities
          </button>
        </div>
        <div>
          <strong>Auth:</strong>
          <div>User ID: {{ authStore.user?.id || 'None' }}</div>
          <div>Company ID: {{ authStore.user?.company_id || 'None' }}</div>
          <div>Authenticated: {{ !!authStore.user }}</div>
        </div>
        <div>
          <strong>Filters:</strong>
          <div>Search: "{{ searchQuery }}"</div>
          <div>Status: {{ statusFilter || 'All' }}</div>
          <div>Type: {{ typeFilter || 'All' }}</div>
          <div>Date Range: {{ dateRangeFilter || 'All' }}</div>
        </div>
      </div>
    </div>

    <!-- Search and Filters Card -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      <!-- Card Header -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Activities</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage your activities and tasks</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ activitiesStore.pagination.total || 0 }} activities
            </span>
            <button
              @click="showDebug = !showDebug"
              class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              title="Toggle debug info"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Activities</label>
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
                placeholder="Search by subject, description, or notes..."
                :disabled="activitiesStore.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="activitiesStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                  @click="clearSearch"
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
                  @click="() => { activitiesStore.setPage(1); loadActivities(); }"
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
              v-model="statusFilter"
              @change="onFilterChange"
              :disabled="activitiesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Type</label>
            <select
              v-model="typeFilter"
              @change="onFilterChange"
              :disabled="activitiesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Types</option>
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="online_meeting">Online Meeting</option>
              <option value="physical_visit">Physical Visit</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Date Range Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Date Range</label>
            <select
              v-model="dateRangeFilter"
              @change="onFilterChange"
              :disabled="activitiesStore.loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <!-- Clear Filters -->
          <div class="flex items-end">
            <button
              @click="clearFilters"
              :disabled="activitiesStore.loading"
              class="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="mb-6">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li class="mr-2" role="presentation">
            <button @click="activeTab = 'list'" :class="['inline-block p-4 rounded-t-lg border-b-2', activeTab === 'list' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300']" type="button" role="tab">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Activities List
              </div>
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button @click="activeTab = 'calendar'" :class="['inline-block p-4 rounded-t-lg border-b-2', activeTab === 'calendar' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300']" type="button" role="tab">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Calendar View
              </div>
            </button>
          </li>
          <li role="presentation">
            <button @click="activeTab = 'dashboard'" :class="['inline-block p-4 rounded-t-lg border-b-2', activeTab === 'dashboard' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300']" type="button" role="tab">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Dashboard
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Activities List Tab Content -->
    <div v-if="activeTab === 'list'" class="mt-4 animate-fadeIn">
      <!-- Activities Table Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activities List</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">View and manage all your activities</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {{ filteredActivities.length }} of {{ activitiesStore.pagination.total || 0 }} activities
              </span>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="activitiesStore.loading" class="p-8 text-center">
          <div class="inline-flex items-center space-x-2">
            <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
            <span class="text-gray-600 dark:text-gray-400">Loading activities...</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="activitiesStore.error" class="p-8 text-center">
          <div class="inline-flex items-center space-x-2 text-red-600 dark:text-red-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ activitiesStore.error }}</span>
          </div>
          <button @click="loadActivities()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Try Again
          </button>
        </div>

        <!-- Activities Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="activity in filteredActivities" :key="activity.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span class="text-sm font-medium text-white">{{ activity.subject.charAt(0).toUpperCase() }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.subject }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description || 'No description' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    activity.type === 'call' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    activity.type === 'email' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                    activity.type === 'online_meeting' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    activity.type === 'physical_visit' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  ]">
                    {{ formatActivityType(activity.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    activity.status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    activity.status === 'in_progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                    activity.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    activity.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  ]">
                    {{ formatStatus(activity.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <div>{{ formatDate(activity.date_start) }}</div>
                  <div class="text-gray-500 dark:text-gray-400">{{ formatTime(activity.date_start_time) }} - {{ formatTime(activity.date_end_time) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ activity.location || 'No location' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="editActivity(activity)"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                      title="Edit activity"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      v-if="activity.status !== 'completed'"
                      @click="completeActivity(activity)"
                      class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                      title="Mark as completed"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </button>
                    <button
                      @click="deleteActivity(activity)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                      title="Delete activity"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="!activitiesStore.loading && filteredActivities.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No activities found</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ searchQuery || statusFilter || typeFilter || dateRangeFilter ? 'Try adjusting your filters.' : 'Get started by creating a new activity.' }}
            </p>
            <div class="mt-6">
              <button
                @click="showAddModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Dashboard Tab Content -->
    <div v-if="activeTab === 'dashboard'" class="mt-4 animate-fadeIn">
      <!-- Dashboard Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              Activities Dashboard
            </h2>
            <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">Monitor your activities performance and insights</p>
          </div>
          <button 
            @click="showAddModal = true" 
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create Activity
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Pending Activities Card -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg dark:bg-blue-900">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ pendingActivitiesCount }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ pendingPercentage }}%</span>
              <div class="w-full bg-gray-200 rounded-full h-2 ml-2 dark:bg-gray-700">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: pendingPercentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- In Progress Activities Card -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-orange-100 rounded-lg dark:bg-orange-900">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ inProgressActivitiesCount }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-sm font-medium text-orange-600 dark:text-orange-400">{{ inProgressPercentage }}%</span>
              <div class="w-full bg-gray-200 rounded-full h-2 ml-2 dark:bg-gray-700">
                <div class="bg-orange-600 h-2 rounded-full" :style="{ width: inProgressPercentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Completed Activities Card -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg dark:bg-green-900">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ completedActivitiesCount }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-sm font-medium text-green-600 dark:text-green-400">{{ completedPercentage }}%</span>
              <div class="w-full bg-gray-200 rounded-full h-2 ml-2 dark:bg-gray-700">
                <div class="bg-green-600 h-2 rounded-full" :style="{ width: completedPercentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Activities Card -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-cyan-100 rounded-lg dark:bg-cyan-900">
              <svg class="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ todayActivitiesCount }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-sm font-medium text-cyan-600 dark:text-cyan-400">{{ activitiesStore.activities.length > 0 ? Math.round((todayActivitiesCount / activitiesStore.activities.length) * 100) : 0 }}%</span>
              <div class="w-full bg-gray-200 rounded-full h-2 ml-2 dark:bg-gray-700">
                <div class="bg-cyan-600 h-2 rounded-full" :style="{ width: (activitiesStore.activities.length > 0 ? Math.round((todayActivitiesCount / activitiesStore.activities.length) * 100) : 0) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <!-- Analytics & Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Activity Status Progress -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Status</h3>
              <div class="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-4">
              <!-- Pending Progress -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Pending</span>
                  <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">{{ pendingPercentage }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500" :style="{ width: pendingPercentage + '%' }"></div>
                </div>
              </div>
              
              <!-- In Progress -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
                  <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">{{ inProgressPercentage }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div class="bg-orange-600 h-2.5 rounded-full transition-all duration-500" :style="{ width: inProgressPercentage + '%' }"></div>
                </div>
              </div>
              
              <!-- Completed -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
                  <span class="text-sm font-semibold text-green-600 dark:text-green-400">{{ completedPercentage }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div class="bg-green-600 h-2.5 rounded-full transition-all duration-500" :style="{ width: completedPercentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Types Distribution -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Types</h3>
              <div class="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-3">
              <div v-for="type in ['call','email','online_meeting','physical_visit','other']" :key="type" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-3" :class="{
                    'bg-blue-500': type === 'call',
                    'bg-purple-500': type === 'email',
                    'bg-green-500': type === 'online_meeting',
                    'bg-yellow-500': type === 'physical_visit',
                    'bg-gray-500': type === 'other'
                  }"></div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ formatActivityType(type) }}</span>
                </div>
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2 dark:bg-gray-700">
                    <div class="h-2 rounded-full transition-all duration-500" :class="{
                      'bg-blue-500': type === 'call',
                      'bg-purple-500': type === 'email',
                      'bg-green-500': type === 'online_meeting',
                      'bg-yellow-500': type === 'physical_visit',
                      'bg-gray-500': type === 'other'
                    }" :style="{ width: (activitiesStore.activities.filter(a => a.type === type).length / activitiesStore.activities.length * 100 || 0) + '%' }"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ activitiesStore.activities.filter(a => a.type === type).length }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Activity Trend -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Weekly Trend</h3>
              <div class="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-3">
              <div v-for="(day, index) in weekDays" :key="day" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ day }}</span>
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2 dark:bg-gray-700">
                    <div class="bg-green-500 h-2 rounded-full transition-all duration-500" :style="{ width: Math.random() * 100 + '%' }"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ Math.floor(Math.random() * 10) + 1 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities Section -->
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900 mr-3">
                  <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Latest activities and their current status</p>
                </div>
              </div>
              <button 
                @click="activeTab = 'list'" 
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-900/30"
              >
                View All
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Activity
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="activity in activitiesStore.activities.slice(0,5)" :key="activity.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span class="text-sm font-medium text-white">{{ activity.subject.charAt(0).toUpperCase() }}</span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.subject }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description || 'No description' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      activity.type === 'call' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      activity.type === 'email' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      activity.type === 'online_meeting' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      activity.type === 'physical_visit' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    ]">
                      {{ formatActivityType(activity.type) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ formatDate(activity.date_start) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      activity.status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      activity.status === 'in_progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                      activity.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      activity.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    ]">
                      {{ formatStatus(activity.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <button
                        @click="editActivity(activity)"
                        class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                        title="Edit activity"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        v-if="activity.status !== 'completed'"
                        @click="completeActivity(activity)"
                        class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                        title="Mark as completed"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Empty state for recent activities -->
            <div v-if="activitiesStore.activities.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No activities yet</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating your first activity.</p>
              <div class="mt-6">
                <button
                  @click="showAddModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- Calendar Tab Content -->
    <div v-if="activeTab === 'calendar'" class="mt-4 animate-fadeIn">
      <!-- Calendar Container -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <!-- Calendar Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <!-- Calendar Title and Navigation -->
            <div class="flex items-center justify-between lg:justify-start gap-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Activities Calendar</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">View and manage your activities schedule</p>
                </div>
              </div>
            </div>

            <!-- Calendar Controls -->
            <div class="flex items-center gap-3">
              <!-- Month Navigation -->
              <div class="flex items-center gap-2">
                <button 
                  @click="previousMonth"
                  class="inline-flex items-center justify-center p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-800"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <div class="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ currentMonthName }} {{ currentYear }}</span>
                </div>
                <button 
                  @click="nextMonth"
                  class="inline-flex items-center justify-center p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-800"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <!-- Today Button -->
              <button 
                @click="setCurrentMonth"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Today
              </button>

              <!-- View Toggle -->
              <div class="inline-flex rounded-lg shadow-sm" role="group">
                <button 
                  @click="calendarView = 'month'"
                  :class="[
                    'px-4 py-2 text-sm font-medium border rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
                    calendarView === 'month' 
                      ? 'text-blue-700 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' 
                      : 'text-gray-900 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white'
                  ]"
                >
                  Month
                </button>
                <button 
                  @click="calendarView = 'week'"
                  :class="[
                    'px-4 py-2 text-sm font-medium border-t border-b border-gray-300 focus:z-10 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
                    calendarView === 'week' 
                      ? 'text-blue-700 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' 
                      : 'text-gray-900 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white'
                  ]"
                >
                  Week
                </button>
                <button 
                  @click="calendarView = 'day'"
                  :class="[
                    'px-4 py-2 text-sm font-medium border rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800',
                    calendarView === 'day' 
                      ? 'text-blue-700 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' 
                      : 'text-gray-900 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white'
                  ]"
                >
                  Day
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Month View -->
        <div v-if="calendarView === 'month'" class="p-6">
          <!-- Weekday Headers -->
          <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
            <div v-for="day in weekDays" :key="day" class="bg-gray-50 dark:bg-gray-800 p-3 text-center">
              <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ day }}</span>
            </div>
          </div>
          
          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index" 
              :class="[
                'min-h-[120px] p-3 transition-all duration-200',
                day.isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900',
                day.isToday ? 'ring-2 ring-blue-500 ring-inset' : '',
                'hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              <!-- Date Header -->
              <div class="flex items-center justify-between mb-2">
                <span 
                  :class="[
                    'text-sm font-medium',
                    day.isToday 
                      ? 'bg-blue-600 text-white px-2 py-1 rounded-full' 
                      : day.isCurrentMonth 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-400 dark:text-gray-500'
                  ]"
                >
                  {{ day.date.getDate() }}
                </span>
                <button 
                  v-if="day.isCurrentMonth"
                  @click="() => { activityForm.date_start = day.date.toISOString().split('T')[0]; activityForm.date_end = day.date.toISOString().split('T')[0]; showAddModal = true; }"
                  class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200 dark:hover:bg-blue-900/20"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
              
              <!-- Activities for this day -->
              <div class="space-y-1">
                <div 
                  v-for="activity in getActivitiesForDate(day.date).slice(0, 3)" 
                  :key="activity.id" 
                  @click="editActivity(activity)"
                  class="group/activity cursor-pointer p-2 rounded-md text-xs transition-all duration-200 hover:shadow-sm"
                  :class="[
                    activity.status === 'completed' ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                    activity.status === 'cancelled' ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                    activity.status === 'in_progress' ? 'bg-orange-50 border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' :
                    'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                  ]"
                >
                  <div class="flex items-center gap-2">
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full',
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'cancelled' ? 'bg-red-500' :
                        activity.status === 'in_progress' ? 'bg-orange-500' :
                        'bg-blue-500'
                      ]"
                    ></div>
                    <span class="font-medium text-gray-900 dark:text-white truncate">{{ activity.subject }}</span>
                  </div>
                  <div class="mt-1 text-gray-600 dark:text-gray-400 text-[10px]">
                    {{ formatTime(activity.date_start_time) }}
                  </div>
                </div>
                
                <!-- More activities indicator -->
                <div 
                  v-if="getActivitiesForDate(day.date).length > 3" 
                  class="text-center py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  +{{ getActivitiesForDate(day.date).length - 3 }} more
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Week View -->
        <div v-if="calendarView === 'week'" class="p-6">
          <!-- Week Header -->
          <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
            <div v-for="(day, index) in currentWeekDays" :key="index" class="bg-gray-50 dark:bg-gray-800 p-4 text-center">
              <div class="flex flex-col items-center">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ weekDays[day.date.getDay()] }}</span>
                <div 
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                    day.isToday 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-200 dark:ring-blue-800' 
                      : 'bg-white text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                  ]"
                >
                  {{ day.date.getDate() }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Week Timeline -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <!-- Time Header -->
            <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <div class="bg-gray-50 dark:bg-gray-800 p-3 text-center">
                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Time</span>
              </div>
              <div v-for="(day, index) in currentWeekDays" :key="index" class="bg-gray-50 dark:bg-gray-800 p-3 text-center">
                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ weekDays[day.date.getDay()] }}</span>
              </div>
            </div>
            
            <!-- Time Slots -->
            <div class="max-h-[500px] overflow-y-auto">
              <div v-for="hour in 24" :key="hour" class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                <!-- Time Label -->
                <div class="bg-gray-50 dark:bg-gray-800 p-2 text-center border-r border-gray-200 dark:border-gray-700">
                  <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ formatHour(hour - 1) }}</span>
                </div>
                
                <!-- Day Columns -->
                <div 
                  v-for="(day, dayIndex) in currentWeekDays" 
                  :key="dayIndex" 
                  class="relative min-h-[60px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
                  :class="{ 'bg-blue-50 dark:bg-blue-900/10': day.isToday }"
                >
                  <!-- Activities for this hour and day -->
                  <div 
                    v-for="activity in getTasksForHourAndDate(hour - 1, day.date)" 
                    :key="activity.id" 
                    @click="editActivity(activity)"
                    class="absolute left-1 right-1 top-1 cursor-pointer p-2 rounded-md text-xs shadow-sm transition-all duration-200 hover:shadow-md"
                    :class="[
                      activity.status === 'completed' ? 'bg-green-100 border border-green-300 dark:bg-green-900/30 dark:border-green-700' :
                      activity.status === 'cancelled' ? 'bg-red-100 border border-red-300 dark:bg-red-900/30 dark:border-red-700' :
                      activity.status === 'in_progress' ? 'bg-orange-100 border border-orange-300 dark:bg-orange-900/30 dark:border-orange-700' :
                      'bg-blue-100 border border-blue-300 dark:bg-blue-900/30 dark:border-blue-700'
                    ]"
                    :style="getTaskPositionStyle(activity, hour - 1)"
                  >
                    <div class="flex items-center gap-1 mb-1">
                      <div 
                        :class="[
                          'w-2 h-2 rounded-full',
                          activity.status === 'completed' ? 'bg-green-500' :
                          activity.status === 'cancelled' ? 'bg-red-500' :
                          activity.status === 'in_progress' ? 'bg-orange-500' :
                          'bg-blue-500'
                        ]"
                      ></div>
                      <span class="font-medium text-gray-900 dark:text-white truncate">{{ activity.subject }}</span>
                    </div>
                    <div class="text-gray-600 dark:text-gray-400 text-[10px]">
                      {{ formatTime(activity.date_start_time) }}
                    </div>
                  </div>
                  
                  <!-- Current time indicator (only for today) -->
                  <div 
                    v-if="day.isToday && hour === new Date().getHours() + 1"
                    class="absolute left-0 right-0 z-10 border-t-2 border-red-500"
                    :style="{ top: (new Date().getMinutes() / 60) * 60 + 'px' }"
                  >
                    <div class="absolute -top-1.5 -left-2 h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Day View -->
        <div v-if="calendarView === 'day'" class="p-6">
          <!-- Day Header -->
          <div class="text-center mb-6">
            <div class="flex items-center justify-center gap-4 mb-4">
              <button 
                @click="previousDay"
                class="inline-flex items-center justify-center p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <div class="flex flex-col items-center">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg mb-2">
                  {{ currentDate.getDate() }}
                </div>
                <div class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ weekDays[currentDate.getDay()] }}, {{ currentMonthName }} {{ currentDate.getDate() }}, {{ currentYear }}
                </div>
              </div>
              
              <button 
                @click="nextDay"
                class="inline-flex items-center justify-center p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <!-- Quick Stats -->
            <div class="flex justify-center gap-4">
              <div class="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                <span class="text-sm font-medium text-blue-700 dark:text-blue-300">{{ getActivitiesForDate(currentDate).length }} Activities</span>
              </div>
              <div class="px-4 py-2 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                <span class="text-sm font-medium text-green-700 dark:text-green-300">{{ getActivitiesForDate(currentDate).filter(a => a.status === 'completed').length }} Completed</span>
              </div>
            </div>
          </div>
          
          <!-- Day Timeline -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <!-- Timeline Header -->
            <div class="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <div class="bg-gray-50 dark:bg-gray-800 p-3 text-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Time</span>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 p-3 text-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Activities</span>
              </div>
            </div>
            
            <!-- Timeline Slots -->
            <div class="max-h-[500px] overflow-y-auto">
              <div v-for="hour in 24" :key="hour" class="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-700">
                <!-- Time Label -->
                <div class="bg-gray-50 dark:bg-gray-800 p-3 text-center border-r border-gray-200 dark:border-gray-700">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ formatHour(hour - 1) }}</span>
                </div>
                
                <!-- Activities Column -->
                <div class="relative min-h-[80px] bg-white dark:bg-gray-800 p-2">
                  <!-- Activities for this hour -->
                  <div 
                    v-for="activity in getTasksForHourAndDate(hour - 1, currentDate)" 
                    :key="activity.id" 
                    @click="editActivity(activity)"
                    class="mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md"
                    :class="[
                      activity.status === 'completed' ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700' :
                      activity.status === 'cancelled' ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-700' :
                      activity.status === 'in_progress' ? 'bg-orange-50 border border-orange-200 dark:bg-orange-900/20 dark:border-orange-700' :
                      'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                    ]"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <div 
                          :class="[
                            'w-3 h-3 rounded-full',
                            activity.status === 'completed' ? 'bg-green-500' :
                            activity.status === 'cancelled' ? 'bg-red-500' :
                            activity.status === 'in_progress' ? 'bg-orange-500' :
                            'bg-blue-500'
                          ]"
                        ></div>
                        <span class="font-medium text-gray-900 dark:text-white">{{ activity.subject }}</span>
                      </div>
                      <span class="text-xs text-gray-600 dark:text-gray-400">
                        {{ formatTime(activity.date_start_time) }} - {{ formatTime(activity.date_end_time) }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ activity.description || 'No description' }}
                    </div>
                    <div class="mt-2 flex items-center gap-2">
                      <span 
                        :class="[
                          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                          activity.type === 'call' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          activity.type === 'email' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                          activity.type === 'online_meeting' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          activity.type === 'physical_visit' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        ]"
                      >
                        {{ formatActivityType(activity.type) }}
                      </span>
                      <span 
                        :class="[
                          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                          activity.status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          activity.status === 'in_progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                          activity.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          activity.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        ]"
                      >
                        {{ formatStatus(activity.status) }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Current time indicator -->
                  <div 
                    v-if="hour === new Date().getHours() + 1"
                    class="absolute left-0 right-0 z-10 border-t-2 border-red-500"
                    :style="{ top: (new Date().getMinutes() / 60) * 80 + 'px' }"
                  >
                    <div class="absolute -top-1.5 -left-2 h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Timeline Tab Content -->
    <div v-if="activeTab === 'timeline'" class="mt-4 animate-fadeIn">
      <div class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
        <!-- Timeline Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="mb-4 md:mb-0">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v2H4V2Zm0 4h2v2H4V6Zm0 4h2v2H4v-2Zm0 4h2v2H4v-2Z"/>
                </svg>
                Activity Timeline
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Track task history and activity over time</p>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button 
                  type="button" 
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  :class="activityFilter === 'all' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : ''"
                  @click="activityFilter = 'all'"
                >
                  All
                </button>
                <button 
                  type="button" 
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  :class="activityFilter === 'created' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : ''"
                  @click="activityFilter = 'created'"
                >
                  Created
                </button>
                <button 
                  type="button" 
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  :class="activityFilter === 'completed' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : ''"
                  @click="activityFilter = 'completed'"
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Timeline with activities -->
          <div v-if="filteredTimelineActivities.length > 0" class="relative">
            <ol class="relative border-l border-gray-200 dark:border-gray-700">
              <li v-for="(activity, index) in filteredTimelineActivities" :key="index" class="mb-10 ml-6">
                <span 
                  class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800"
                  :class="activity.type === 'created' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'"
                >
                  <svg v-if="activity.type === 'created'" class="w-3 h-3 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                  </svg>
                  <svg v-else class="w-3 h-3 text-green-800 dark:text-green-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                </span>
                <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div class="flex items-center justify-between mb-3">
                    <time class="text-xs font-normal text-gray-500 dark:text-gray-400">
                      {{ formatDateTime(activity.timestamp) }}
                    </time>
                    <span 
                      class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                      :class="activity.type === 'created' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'"
                    >
                      {{ activity.type === 'created' ? 'Created' : 'Completed' }}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ activity.activity.subject }}</h3>
                  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {{ activity.activity.description || 'No description provided' }}
                  </p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {{ formatActivityType(activity.activity.type) }}
                    </span>
                    <span 
                      class="text-xs font-medium px-2.5 py-0.5 rounded"
                      :class="getActivityStatusColor(activity.activity.status)"
                    >
                      {{ formatStatus(activity.activity.status) }}
                    </span>
                    <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {{ formatDate(activity.activity.date_start) }}
                    </span>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      type="button" 
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      @click="editActivity(activity.activity)"
                    >
                      <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                      </svg>
                      View Activity
                    </button>
                    <button 
                      v-if="activity.activity.status !== 'completed'"
                      type="button" 
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      @click="completeActivity(activity.activity)"
                    >
                      <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg>
                      Complete
                    </button>
                  </div>
                </div>
              </li>
            </ol>
          </div>
          
          <!-- Empty state when no activities -->
          <div v-if="filteredTimelineActivities.length === 0" class="flex flex-col items-center justify-center py-16">
            <div class="mb-4">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 1v18M1 9h18M5 5.5 8 3m0 0 3 2.5M8 3v6m4-3.5L15 3m0 0 3 2.5m-3-2.5v6"/>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">No activities found</h3>
            <p class="mb-6 text-center text-gray-500 dark:text-gray-400 max-w-md">There are no activities matching your current filter criteria. Try changing your filter or create new activities.</p>
            <button 
              type="button" 
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="activityFilter = 'all'"
            >
              Show All Activities
            </button>
          </div>
        </div>
      </div>
    </div>

        <!-- Add Activity Modal -->
    <div v-if="showAddModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New Activity
                    </h3>
                    <button @click="closeAddModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <form @submit.prevent="saveActivity" class="space-y-8">
                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
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
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                                        <input
                                            v-model="activityForm.subject"
                                            type="text"
                                            required
                                            placeholder="Enter activity subject"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                                        <select
                                            v-model="activityForm.type"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="call">Call</option>
                                            <option value="email">Email</option>
                                            <option value="online_meeting">Online Meeting</option>
                                            <option value="physical_visit">Physical Visit</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
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
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                        <input
                                            v-model="activityForm.location"
                                            type="text"
                                            placeholder="Enter activity location"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Date & Time Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Date & Time
                                </h3>
                            </div>
                            <div class="p-6">
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
                            </div>
                        </div>

                        <!-- Description & Notes -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Description & Notes
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="space-y-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                        <textarea
                                            v-model="activityForm.description"
                                            rows="4"
                                            placeholder="Enter activity description"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                                        <textarea
                                            v-model="activityForm.notes"
                                            rows="3"
                                            placeholder="Enter additional notes"
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
                        @click="closeAddModal" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="saveActivity" 
                        :disabled="activitiesStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="activitiesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Create Activity
                    </button>
                </div>
            </div>
        </div>
    </div>

        <!-- Edit Activity Modal -->
    <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
            <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Activity
                    </h3>
                    <button @click="closeEditModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <form @submit.prevent="saveActivity" class="space-y-8">
                        <!-- Basic Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
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
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                                        <input
                                            v-model="activityForm.subject"
                                            type="text"
                                            required
                                            placeholder="Enter activity subject"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                                        <select
                                            v-model="activityForm.type"
                                            required
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="call">Call</option>
                                            <option value="email">Email</option>
                                            <option value="online_meeting">Online Meeting</option>
                                            <option value="physical_visit">Physical Visit</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
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
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                        <input
                                            v-model="activityForm.location"
                                            type="text"
                                            placeholder="Enter activity location"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Date & Time Information -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Date & Time
                                </h3>
                            </div>
                            <div class="p-6">
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
                            </div>
                        </div>

                        <!-- Description & Notes -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Description & Notes
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="space-y-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                        <textarea
                                            v-model="activityForm.description"
                                            rows="4"
                                            placeholder="Enter activity description"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                                        <textarea
                                            v-model="activityForm.notes"
                                            rows="3"
                                            placeholder="Enter additional notes"
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
                        @click="closeEditModal" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="saveActivity" 
                        :disabled="activitiesStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="activitiesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Update Activity
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Activity Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Create New Activity
                </h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Subject</label>
                    <input v-model="activityForm.subject" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Activity subject" required>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Type</label>
                      <select v-model="activityForm.type" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="online_meeting">Online Meeting</option>
                        <option value="physical_visit">Physical Visit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Status</label>
                      <select v-model="activityForm.status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Start Date</label>
                      <input v-model="activityForm.date_start" type="date" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">End Date</label>
                      <input v-model="activityForm.date_end" type="date" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Start Time</label>
                      <input v-model="activityForm.date_start_time" type="time" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">End Time</label>
                      <input v-model="activityForm.date_end_time" type="time" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Location</label>
                    <input v-model="activityForm.location" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Activity location">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="activityForm.description" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Activity description"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea v-model="activityForm.notes" rows="2" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Additional notes"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" @click="saveActivity">
              Create Activity
            </button>
            <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeAddModal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Activity Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Edit Activity
                </h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Subject</label>
                    <input v-model="activityForm.subject" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Activity subject" required>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Type</label>
                      <select v-model="activityForm.type" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="online_meeting">Online Meeting</option>
                        <option value="physical_visit">Physical Visit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Status</label>
                      <select v-model="activityForm.status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Start Date</label>
                      <input v-model="activityForm.date_start" type="date" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">End Date</label>
                      <input v-model="activityForm.date_end" type="date" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Start Time</label>
                      <input v-model="activityForm.date_start_time" type="time" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">End Time</label>
                      <input v-model="activityForm.date_end_time" type="time" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Location</label>
                    <input v-model="activityForm.location" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Activity location">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="activityForm.description" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Activity description"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea v-model="activityForm.notes" rows="2" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Additional notes"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" @click="saveActivity">
              Update Activity
            </button>
            <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeEditModal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useActivitiesStore } from '../../store/activities.store';
import { useAuthStore } from '../../store/auth.store';

// Stores
const activitiesStore = useActivitiesStore();
const authStore = useAuthStore();

// Tab navigation
const activeTab = ref('list');

// Modal state
const showAddModal = ref(false);
const showEditModal = ref(false);
const currentActivity = ref(null);

// Filters
const searchQuery = ref('');
const statusFilter = ref('');
const typeFilter = ref('');
const dateRangeFilter = ref('');
const showDebug = ref(false);
const isSearchDebouncing = ref(false);
let searchDebounceTimer = null;

// Calendar state
const currentDate = ref(new Date());
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const activityFilter = ref('all');
const calendarView = ref('month');

// Activity form data
const activityForm = reactive({
  subject: '',
  type: 'call',
  status: 'pending',
  date_start: new Date().toISOString().split('T')[0],
  date_end: new Date().toISOString().split('T')[0],
  date_start_time: '09:00',
  date_end_time: '10:00',
  location: '',
  description: '',
  notes: '',
  user_id: 0,
  entity_type: 'entity',
  entity_id: null,
  company_id: 0
});

// Reset form
const resetForm = () => {
  activityForm.subject = '';
  activityForm.type = 'call';
  activityForm.status = 'pending';
  activityForm.date_start = new Date().toISOString().split('T')[0];
  activityForm.date_end = new Date().toISOString().split('T')[0];
  activityForm.date_start_time = '09:00';
  activityForm.date_end_time = '10:00';
  activityForm.location = '';
  activityForm.description = '';
  activityForm.notes = '';
  activityForm.user_id = authStore.user?.id || 0;
  activityForm.entity_type = 'entity';
  activityForm.entity_id = null;
  activityForm.company_id = authStore.user?.company_id || 0;
};

// Computed properties for activity counts
const pendingActivitiesCount = computed(() => {
  return activitiesStore.activities.filter(activity => activity.status === 'pending').length;
});

const inProgressActivitiesCount = computed(() => {
  return activitiesStore.activities.filter(activity => activity.status === 'in_progress').length;
});

const completedActivitiesCount = computed(() => {
  return activitiesStore.activities.filter(activity => activity.status === 'completed').length;
});

// Today's activities count
const todayActivitiesCount = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return activitiesStore.activities.filter(activity => {
    const activityDate = new Date(activity.date_start);
    activityDate.setHours(0, 0, 0, 0);
    return activityDate.getTime() === today.getTime();
  }).length;
});

// Activity progress percentages
const pendingPercentage = computed(() => {
  const pendingCount = activitiesStore.activities.filter(activity => activity.status === 'pending').length;
  return activitiesStore.activities.length > 0 ? Math.round((pendingCount / activitiesStore.activities.length) * 100) : 0;
});

const inProgressPercentage = computed(() => {
  const inProgressCount = activitiesStore.activities.filter(activity => activity.status === 'in_progress').length;
  return activitiesStore.activities.length > 0 ? Math.round((inProgressCount / activitiesStore.activities.length) * 100) : 0;
});

const completedPercentage = computed(() => {
  return activitiesStore.activities.length > 0 ? Math.round((completedActivitiesCount.value / activitiesStore.activities.length) * 100) : 0;
});

// Priority percentages for donut chart
const urgentPercentage = computed(() => {
  const urgentCount = activitiesStore.activities.filter(activity => activity.priority === 'urgent').length;
  return activitiesStore.activities.length > 0 ? Math.round((urgentCount / activitiesStore.activities.length) * 100) : 0;
});

const highPercentage = computed(() => {
  const highCount = activitiesStore.activities.filter(activity => activity.priority === 'high').length;
  return activitiesStore.activities.length > 0 ? Math.round((highCount / activitiesStore.activities.length) * 100) : 0;
});

const mediumPercentage = computed(() => {
  const mediumCount = activitiesStore.activities.filter(activity => activity.priority === 'medium').length;
  return activitiesStore.activities.length > 0 ? Math.round((mediumCount / activitiesStore.activities.length) * 100) : 0;
});

const lowPercentage = computed(() => {
  const lowCount = activitiesStore.activities.filter(activity => activity.priority === 'low').length;
  return activitiesStore.activities.length > 0 ? Math.round((lowCount / activitiesStore.activities.length) * 100) : 0;
});

// Filtered activities based on search and filters
const filteredActivities = computed(() => {
  return activitiesStore.activities.filter(activity => {
    // Search term filter
    const matchesSearch = searchQuery.value === '' || 
      activity.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (activity.description && activity.description.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (activity.notes && activity.notes.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    // Status filter
    const matchesStatus = statusFilter.value === '' || activity.status === statusFilter.value;
    
    // Type filter
    const matchesType = typeFilter.value === '' || activity.type === typeFilter.value;
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRangeFilter.value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const activityDate = new Date(activity.date_start);
      activityDate.setHours(0, 0, 0, 0);
      
      switch (dateRangeFilter.value) {
        case 'today':
          matchesDateRange = activityDate.getTime() === today.getTime();
          break;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          matchesDateRange = activityDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          matchesDateRange = activityDate >= monthAgo;
          break;
        case 'quarter':
          const quarterAgo = new Date(today);
          quarterAgo.setMonth(today.getMonth() - 3);
          matchesDateRange = activityDate >= quarterAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });
});

// Format date (YYYY-MM-DD to MMM DD, YYYY)
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Format date and time for timeline
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Format status for display
const formatStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

// Format activity type for display
const formatActivityType = (type) => {
  switch (type) {
    case 'call':
      return 'Call';
    case 'email':
      return 'Email';
    case 'online_meeting':
      return 'Online Meeting';
    case 'physical_visit':
      return 'Physical Visit';
    case 'other':
      return 'Other';
    default:
      return type;
  }
};

// Get activity status color for calendar
const getActivityStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'in_progress':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

// Get activity type color
const getActivityTypeColor = (type) => {
  switch (type) {
    case 'created':
      return 'bg-blue-500 dark:bg-blue-600';
    case 'completed':
      return 'bg-green-500 dark:bg-green-600';
    case 'updated':
      return 'bg-yellow-500 dark:bg-yellow-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
};

// Get tasks for a specific date
const getTasksForDate = (date) => {
  return activitiesStore.activities.filter(activity => {
    const activityDate = new Date(activity.date_start);
    return activityDate.toDateString() === date.toDateString();
  });
};

// Calendar computed properties
const currentMonthName = computed(() => {
  return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).toLocaleString('default', { month: 'long' });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generate array of days for the calendar
  const days = [];
  
  // Add days from previous month to fill the first row
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPrevMonth - i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  // Add days from next month to fill the last row
  const totalDaysNeeded = 42; // 6 rows of 7 days
  const remainingDays = totalDaysNeeded - days.length;
  
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  return days;
});

// Timeline activities
const activities = computed(() => {
  const result = [];
  
  // Add created activities
  activitiesStore.activities.forEach(activity => {
    result.push({
      id: `created-${activity.id}`,
      type: 'created',
      activity: { ...activity },
      timestamp: activity.date_created
    });
    
    // Add completed activities
    if (activity.status === 'completed') {
      result.push({
        id: `completed-${activity.id}`,
        type: 'completed',
        activity: { ...activity },
        timestamp: activity.date_updated || activity.date_created
      });
    }
  });
  
  // Sort by timestamp, newest first
  return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

// Get activities for a specific date
const getActivitiesForDate = (date) => {
  return activitiesStore.activities.filter(activity => {
    const activityDate = new Date(activity.date_start);
    return activityDate.toDateString() === date.toDateString();
  });
};

// Get activities for timeline
const timelineActivities = computed(() => {
  const result = [];
  
  // Add created activities
  activitiesStore.activities.forEach(activity => {
    result.push({
      id: `created-${activity.id}`,
      type: 'created',
      activity: { ...activity },
      timestamp: activity.date_created
    });
    
    // Add completed activities
    if (activity.status === 'completed') {
      result.push({
        id: `completed-${activity.id}`,
        type: 'completed',
        activity: { ...activity },
        timestamp: activity.date_updated || activity.date_created
      });
    }
  });
  
  // Sort by timestamp, newest first
  return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

// Filtered timeline activities
const filteredTimelineActivities = computed(() => {
  if (activityFilter.value === 'all') {
    return timelineActivities.value;
  }
  
  return timelineActivities.value.filter(activity => activity.type === activityFilter.value);
});

// Calendar navigation
const previousMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() - 1);
  currentDate.value = date;
};

const nextMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  currentDate.value = date;
};

const previousDay = () => {
  const date = new Date(currentDate.value);
  date.setDate(date.getDate() - 1);
  currentDate.value = date;
};

const nextDay = () => {
  const date = new Date(currentDate.value);
  date.setDate(date.getDate() + 1);
  currentDate.value = date;
};

const setCurrentMonth = () => {
  currentDate.value = new Date();
};

// Edit activity
const editActivity = (activity) => {
  currentActivity.value = activity;
  
  // Populate form with activity data
  activityForm.subject = activity.subject;
  activityForm.type = activity.type;
  activityForm.status = activity.status;
  activityForm.date_start = activity.date_start;
  activityForm.date_end = activity.date_end;
  activityForm.date_start_time = activity.date_start_time;
  activityForm.date_end_time = activity.date_end_time;
  activityForm.location = activity.location || '';
  activityForm.description = activity.description || '';
  activityForm.notes = activity.notes || '';
  activityForm.user_id = activity.user_id;
  activityForm.entity_type = activity.entity_type;
  activityForm.entity_id = activity.entity_id;
  activityForm.company_id = activity.company_id;
  
  showEditModal.value = true;
};

// Close modals
const closeAddModal = () => {
  showAddModal.value = false;
  resetForm();
};

const closeEditModal = () => {
  showEditModal.value = false;
  currentActivity.value = null;
  resetForm();
};

// Save activity
const saveActivity = async () => {
  try {
    if (currentActivity.value) {
      // Update existing activity
      await activitiesStore.updateExistingActivity(currentActivity.value.id, {
        subject: activityForm.subject,
        type: activityForm.type,
        status: activityForm.status,
        date_start: activityForm.date_start,
        date_end: activityForm.date_end,
        date_start_time: activityForm.date_start_time,
        date_end_time: activityForm.date_end_time,
        location: activityForm.location,
        description: activityForm.description,
        notes: activityForm.notes
      });
      closeEditModal();
    } else {
      // Create new activity
      await activitiesStore.createNewActivity({
        subject: activityForm.subject,
        type: activityForm.type,
        status: activityForm.status,
        date_start: activityForm.date_start,
        date_end: activityForm.date_end,
        date_start_time: activityForm.date_start_time,
        date_end_time: activityForm.date_end_time,
        location: activityForm.location,
        description: activityForm.description,
        notes: activityForm.notes,
        user_id: authStore.user?.id || 0,
        entity_type: 'entity',
        entity_id: null,
        company_id: authStore.user?.company_id || 0
      });
      closeAddModal();
    }
  } catch (error) {
    console.error('Error saving activity:', error);
  }
};

// Complete activity
const completeActivity = async (activity) => {
  try {
    await activitiesStore.updateExistingActivity(activity.id, {
      status: 'completed'
    });
  } catch (error) {
    console.error('Error completing activity:', error);
  }
};

// Delete activity
const deleteActivity = async (activity) => {
  if (confirm('Are you sure you want to delete this activity?')) {
    try {
      await activitiesStore.deleteExistingActivity(activity.id);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  }
};

// Clear all filters
const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  typeFilter.value = '';
  dateRangeFilter.value = '';
};

// Search and filter handlers
const onSearchChange = () => {
  isSearchDebouncing.value = true;
  
  // Clear existing timer
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
  
  // Set new timer
  searchDebounceTimer = setTimeout(() => {
    isSearchDebouncing.value = false;
    loadActivities();
  }, 500);
};

const onFilterChange = () => {
  loadActivities();
};

const clearSearch = () => {
  searchQuery.value = '';
  isSearchDebouncing.value = false;
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
  loadActivities();
};

const loadActivities = async () => {
  try {
    const params = {
      $skip: activitiesStore.pagination.skip,
      $limit: activitiesStore.pagination.limit
    };
    
    // Add search query
    if (searchQuery.value) {
      params.$search = searchQuery.value;
    }
    
    // Add status filter
    if (statusFilter.value) {
      params.status = statusFilter.value;
    }
    
    // Add type filter
    if (typeFilter.value) {
      params.type = typeFilter.value;
    }
    
    // Add date range filter
    if (dateRangeFilter.value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (dateRangeFilter.value) {
        case 'today':
          params.date_start = today.toISOString().split('T')[0];
          break;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          params.date_start = weekAgo.toISOString().split('T')[0];
          break;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          params.date_start = monthAgo.toISOString().split('T')[0];
          break;
        case 'quarter':
          const quarterAgo = new Date(today);
          quarterAgo.setMonth(today.getMonth() - 3);
          params.date_start = quarterAgo.toISOString().split('T')[0];
          break;
      }
    }
    
    await activitiesStore.fetchActivities(params);
  } catch (error) {
    console.error('Error loading activities:', error);
  }
};

// Format hour for time display
const formatHour = (hour) => {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h} ${ampm}`;
};

// Get tasks for a specific hour and date
const getTasksForHourAndDate = (hour, date) => {
  return activitiesStore.activities.filter(activity => {
    const activityDate = new Date(activity.date_start);
    return activityDate.toDateString() === date.toDateString() && 
           activityDate.getHours() === hour;
  });
};

// Get priority color for calendar
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

// Check if activity is overdue
const isOverdue = (activity) => {
  const now = new Date();
  const activityDate = new Date(activity.date_start);
  return activityDate < now && activity.status !== 'completed';
};

// Get position style for task in hour cell
const getTaskPositionStyle = (task, hour) => {
  const taskDate = new Date(task.date_start);
  if (taskDate.getHours() !== hour) return {};
  
  const minutes = taskDate.getMinutes();
  const top = (minutes / 60) * 100;
  const height = 30; // Height in percentage
  
  return {
    top: `${top}%`,
    height: `${height}%`,
    zIndex: 5
  };
};

// Get current time position for day view
const getCurrentTimePosition = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Calculate position based on 24 hours * 16px height per hour
  return (hours * 16) + ((minutes / 60) * 16);
};

// Current week days
const currentWeekDays = computed(() => {
  const date = new Date(currentDate.value);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Set to beginning of week (Sunday)
  date.setDate(date.getDate() - day);
  
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Create array of 7 days starting from Sunday
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(date);
    days.push({
      date: currentDay,
      isToday: currentDay.toDateString() === today.toDateString(),
      isCurrentMonth: currentDay.getMonth() === currentDate.value.getMonth()
    });
    date.setDate(date.getDate() + 1);
  }
  
  return days;
});



// Format time for display
const formatTime = (timeString) => {
  if (!timeString) return '';
  
  // Handle both HH:MM:SS and HH:MM formats
  const time = timeString.split(':');
  const hours = parseInt(time[0]);
  const minutes = parseInt(time[1]);
  
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Load activities on component mount
onMounted(async () => {
  try {
    await loadActivities();
  } catch (error) {
    console.error('Error loading activities:', error);
  }
});

// Watch for changes in filters and reload activities
watch([searchQuery, statusFilter, typeFilter, dateRangeFilter], () => {
  loadActivities();
}, { deep: true });
</script>

<style scoped>
/* Custom styles for calendar */
.calendar-day {
  min-height: 100px;
}
</style>
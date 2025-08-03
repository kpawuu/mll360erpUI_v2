<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Role Assignment</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Assign roles to users across different departments</p>
        </div>
        <button @click="showAssignModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Assign Role
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
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Role Assignments</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage user role assignments</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {{ userRolesStore.pagination.total || 0 }} assignments
                    </span>
                </div>
            </div>
        </div>
        
        <!-- Card Body -->
        <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
                <!-- Search Input -->
                <div class="lg:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Assignments</label>
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
                            placeholder="Search by name, email, job title, staff ID, role, department, or company..."
                            :disabled="userRolesStore.loading"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                        <div v-if="userRolesStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                
                <!-- Role Filter -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Role Filter</label>
                    <select 
                        v-model="selectedRoleId" 
                        @change="onRoleFilterChange"
                        :disabled="userRolesStore.loading"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <option value="">All Roles</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                </div>
                
                <!-- Department Filter -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Department Filter</label>
                    <select 
                        v-model="selectedDepartmentId" 
                        @change="onDepartmentFilterChange"
                        :disabled="userRolesStore.loading"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <option value="">All Departments</option>
                        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                            {{ dept.name }}
                        </option>
                    </select>
                </div>
                
                <!-- Refresh Button -->
                <div class="flex items-end">
                    <button 
                        @click="loadUserRoles" 
                        :disabled="userRolesStore.loading"
                        class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <div v-if="userRolesStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Refresh
                    </button>
                </div>
                
                <!-- Quick Actions -->
                <div class="flex items-end justify-end">
                    <div class="w-full">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</label>
                        <button
                            @click="showAssignModal = true"
                            class="w-full text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            New Assignment
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div v-if="searchQuery || selectedRoleId || selectedDepartmentId" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                            Found {{ userRolesStore.pagination.total || 0 }} result{{ (userRolesStore.pagination.total || 0) !== 1 ? 's' : '' }}
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
    <div v-if="userRolesStore.loading" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"></div>
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
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
              <!-- User Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="relative">
                    <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                  </div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-1 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-28 animate-pulse"></div>
                  </div>
                </div>
              </td>
              
              <!-- Role Column Skeleton -->
              <td class="px-6 py-4">
                <div class="space-y-2">
                  <div class="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                  <div class="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </td>
              
              <!-- Department Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </td>
              
              <!-- Access Level Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </td>
              
              <!-- Assigned Date Column Skeleton -->
              <td class="px-6 py-4">
                <div class="space-y-1">
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                  <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
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
      <!-- Statistics Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assignments</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ userRolesStore.pagination.total }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Users</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ uniqueUsersCount }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
          </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ uniqueDepartmentsCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.61-2.016a1 1 0 00-1.414 0L9 14.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Roles</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ uniqueRolesCount }}</p>
            </div>
        </div>
      </div>
    </div>

    <!-- User Roles Display -->
      <div>
        <!-- Enhanced Empty State -->
        <div v-if="!userRolesStore.loading && (!userRolesStore.userRoles || userRolesStore.userRoles.length === 0)" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <div class="flex flex-col items-center justify-center py-16 px-6">
            <div class="relative">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {{ searchQuery || selectedRoleId || selectedDepartmentId ? 'No role assignments found' : 'No role assignments yet' }}
        </h3>
            <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
              {{ searchQuery || selectedRoleId || selectedDepartmentId ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by assigning roles to users in your organization to manage permissions effectively.' }}
        </p>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
                v-if="searchQuery || selectedRoleId || selectedDepartmentId"
            @click="clearFilters"
                class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Clear Filters
          </button>
          <button 
            @click="showAssignModal = true"
                class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Assign Role
          </button>
            </div>
        </div>
      </div>

        <!-- Enhanced Table View -->
        <div v-else-if="userRolesStore.userRoles && userRolesStore.userRoles.length > 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <!-- Table Header with Summary -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Role Assignments</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ userRolesStore.pagination.total || 0 }} assignment{{ (userRolesStore.pagination.total || 0) !== 1 ? 's' : '' }} found</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  Active
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    User
                  </div>
                </th>
                  <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.61-2.016a1 1 0 00-1.414 0L9 14.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"></path>
                    </svg>
                    Role
                  </div>
                </th>
                  <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Department
                  </div>
                </th>
                  <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Access Level
                  </div>
                </th>
                  <th scope="col" class="px-6 py-4">
                  <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                      Assigned Date
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
                <tr v-for="userRole in (userRolesStore.userRoles || [])" :key="userRole.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <!-- User Column -->
                  <td class="px-6 py-4">
                  <div class="flex items-center">
                      <div class="relative">
                        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span class="text-white font-semibold text-sm">
                        {{ getUserInitials(userRole.user) }}
                      </span>
                    </div>
                        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div class="flex-1">
                        <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {{ getUserFullName(userRole.user) }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                          {{ userRole.user?.email }}
                        </div>
                        <div class="text-xs text-gray-400 dark:text-gray-500 flex items-center mt-1">
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                          </svg>
                          {{ userRole.user?.job_title }} • {{ userRole.user?.staffid }}
                        </div>
                    </div>
                  </div>
                </td>
                  
                  <!-- Role Column -->
                  <td class="px-6 py-4">
                    <div class="space-y-2">
                      <div class="flex items-center">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 shadow-sm">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    {{ userRole.role?.name }}
                  </span>
                      </div>
                      <div v-if="userRole.role?.description" class="flex items-center">
                        <button @click="toggleRoleDescription(userRole.id)" class="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {{ expandedRoles.includes(userRole.id) ? 'Hide' : 'Show' }} details
                        </button>
                      </div>
                      <div v-if="expandedRoles.includes(userRole.id) && userRole.role?.description" class="text-xs text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                        <div class="flex items-start">
                          <svg class="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <p class="leading-relaxed">{{ userRole.role.description }}</p>
                        </div>
                      </div>
                    </div>
                </td>
                  
                  <!-- Department Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 shadow-sm">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                    </svg>
                    {{ userRole.department?.name }}
                  </span>
                    </div>
                </td>
                  
                  <!-- Access Level Column -->
                  <td class="px-6 py-4">
                  <div class="flex items-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                        </svg>
                      Level {{ userRole.role?.access_level }}
                    </span>
                  </div>
                </td>
                  
                  <!-- Assigned Date Column -->
                  <td class="px-6 py-4">
                  <div class="flex items-center">
                      <div class="text-sm text-gray-900 dark:text-white">
                        <div class="font-medium">{{ formatDate(userRole.date_created) }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                          {{ formatTime(userRole.date_created) }}
                        </div>
                      </div>
                  </div>
                </td>
                  
                  <!-- Actions Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button @click="editUserRole(userRole)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                      <button @click="deleteUserRole(userRole.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200 shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      
      <!-- Pagination Controls -->
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
          <select 
            v-model="userRolesStore.pagination.limit" 
            @change="onLimitChange"
            :disabled="userRolesStore.loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            of {{ userRolesStore.pagination.total || 0 }} entries
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="previousPage" 
            :disabled="userRolesStore.pagination.currentPage <= 1 || userRolesStore.loading"
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
              :disabled="userRolesStore.loading"
              :class="[
                'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                page === userRolesStore.pagination.currentPage
                  ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="nextPage" 
            :disabled="userRolesStore.pagination.currentPage >= totalPages || userRolesStore.loading"
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

    <!-- Assign/Edit Role Modal -->
    <div v-if="showAssignModal || showEditModal" class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        {{ showEditModal ? 'Edit Role Assignment' : 'Assign Role to User' }}
                    </h3>
                    <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form @submit.prevent="saveUserRole">
                        <!-- Assignment Information Section -->
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    Assignment Details
                                </h3>
                                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Select the user, role, and department for this assignment.</p>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- User Selection -->
                                <div>
                                    <label for="userId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User</label>
                                    <select
                                        id="userId"
                                        v-model="userRoleForm.user_id"
                                        :disabled="showEditModal"
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select user</option>
                                        <option v-for="user in users" :key="user.id" :value="user.id">
                                            {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
                                        </option>
                                    </select>
                                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Choose the user to assign the role to.
                                    </p>
                                </div>
                                
                                <!-- Role Selection -->
                                <div>
                                    <label for="roleId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                    <select
                                        id="roleId"
                                        v-model="userRoleForm.role_id"
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select role</option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }} (Level {{ role.access_level }})
                                        </option>
                                    </select>
                                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Choose the role to assign to the user.
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Department Selection -->
                            <div>
                                <label for="departmentId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <select
                                    id="departmentId"
                                    v-model="userRoleForm.department_id"
                                    required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                                >
                                    <option value="">Select department</option>
                                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                                        {{ dept.name }}
                                    </option>
                                </select>
                                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Choose the department where this role will be active.
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
                        @click="saveUserRole" 
                        :disabled="userRolesStore.loading"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div v-if="userRolesStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {{ showEditModal ? 'Update Assignment' : 'Assign Role' }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserRolesStore } from '../../store/user-roles.store'
import { useRolesStore } from '../../store/roles.store'
import { useUserStore } from '../../store/user.store'
import { useCompanyDepartmentsStore } from '../../store/company-departments.store'
import { useAuthStore } from '../../store/auth.store'
import type { UserRoles } from '../../api/models/user-roles.model'

const userRolesStore = useUserRolesStore()
const rolesStore = useRolesStore()
const userStore = useUserStore()
const companyDepartmentsStore = useCompanyDepartmentsStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedRoleId = ref('')
const selectedDepartmentId = ref('')
const showAssignModal = ref(false)
const showEditModal = ref(false)
const editingUserRole = ref<UserRoles | null>(null)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => void)>(() => {})
const expandedRoles = ref<number[]>([])

const userRoleForm = ref({
  user_id: 0,
  company_id: 0,
  role_id: 0,
  department_id: 0
})

// Pagination computed properties
const totalPages = computed(() => {
  const total = userRolesStore.pagination.total || 0
  const limit = userRolesStore.pagination.limit || 10
  return userRolesStore.pagination.totalPages || Math.ceil(total / limit)
})

const visiblePages = computed(() => {
  const current = userRolesStore.pagination.currentPage || 1
  const total = totalPages.value || 1
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

const users = computed(() => userStore.users)
const roles = computed(() => rolesStore.roles)
const departments = computed(() => companyDepartmentsStore.departments)

// Statistics computed properties
const uniqueUsersCount = computed(() => {
  if (!userRolesStore.userRoles || !Array.isArray(userRolesStore.userRoles)) {
    return 0
  }
  const uniqueUserIds = new Set(userRolesStore.userRoles.map(ur => ur.user_id))
  return uniqueUserIds.size
})

const uniqueDepartmentsCount = computed(() => {
  if (!userRolesStore.userRoles || !Array.isArray(userRolesStore.userRoles)) {
    return 0
  }
  const uniqueDeptIds = new Set(userRolesStore.userRoles.map(ur => ur.department_id))
  return uniqueDeptIds.size
})

const uniqueRolesCount = computed(() => {
  if (!userRolesStore.userRoles || !Array.isArray(userRolesStore.userRoles)) {
    return 0
  }
  const uniqueRoleIds = new Set(userRolesStore.userRoles.map(ur => ur.role_id))
  return uniqueRoleIds.size
})

const getUserFullName = (user: any) => {
  console.log('🔍 getUserFullName called with user:', user)
  if (!user) {
    console.log('❌ User is null/undefined, returning Unknown User')
    return 'Unknown User'
  }
  const fullName = `${user.first_name} ${user.last_name}`
  console.log('✅ Returning full name:', fullName)
  return fullName
}

const getUserInitials = (user: any) => {
  if (!user) return 'U'
  return `${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}`.toUpperCase()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const loadUserRoles = async () => {
  try {
    if (authStore.user?.company_id) {
      let query: any = {
          company_id: authStore.user.company_id,
        $sort: { date_created: -1 },
        $skip: (userRolesStore.pagination.currentPage - 1) * userRolesStore.pagination.limit,
        $limit: userRolesStore.pagination.limit
      }
      
      // Add search filter - we'll handle this in the backend hooks
      if (searchQuery.value) {
        query.search = searchQuery.value
      }
      
      // Add role filter
      if (selectedRoleId.value) {
        query.role_id = Number(selectedRoleId.value)
      }
      
      // Add department filter
      if (selectedDepartmentId.value) {
        query.department_id = Number(selectedDepartmentId.value)
      }
      
      await userRolesStore.fetchUserRoles({ query })
    }
  } catch (error) {
    console.error('Failed to load user roles:', error)
  }
}

const loadUsers = async () => {
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
    console.error('Failed to load users:', error)
  }
}

const loadRoles = async () => {
  try {
    await rolesStore.fetchRoles({
      query: {
        $sort: { name: 1 }
      }
    })
  } catch (error) {
    console.error('Failed to load roles:', error)
  }
}

const loadDepartments = async () => {
  try {
    if (authStore.user?.company_id) {
      await companyDepartmentsStore.fetchDepartments({
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

// Pagination methods
const goToPage = async (page: number | string) => {
  if (typeof page === 'number') {
    userRolesStore.setPage(page)
    await loadUserRoles()
  }
}

const nextPage = async () => {
  if (userRolesStore.pagination.currentPage < totalPages.value) {
    userRolesStore.setPage(userRolesStore.pagination.currentPage + 1)
    await loadUserRoles()
  }
}

const previousPage = async () => {
  if (userRolesStore.pagination.currentPage > 1) {
    userRolesStore.setPage(userRolesStore.pagination.currentPage - 1)
    await loadUserRoles()
  }
}

const onLimitChange = async () => {
  userRolesStore.setLimit(Number(userRolesStore.pagination.limit))
  userRolesStore.setPage(1) // Reset to first page when changing limit
  await loadUserRoles()
}

// Filter methods
let searchTimeout: NodeJS.Timeout
const onSearchChange = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    userRolesStore.setPage(1) // Reset to first page when searching
    await loadUserRoles()
  }, 300)
}

const onRoleFilterChange = async () => {
  userRolesStore.setPage(1) // Reset to first page when filtering
  await loadUserRoles()
}

const onDepartmentFilterChange = async () => {
  userRolesStore.setPage(1) // Reset to first page when filtering
  await loadUserRoles()
}

const clearFilters = async () => {
  searchQuery.value = ''
  selectedRoleId.value = ''
  selectedDepartmentId.value = ''
  userRolesStore.setPage(1) // Reset to first page
  await loadUserRoles()
}

const editUserRole = (userRole: UserRoles) => {
  editingUserRole.value = userRole
  userRoleForm.value = {
    user_id: userRole.user_id,
    company_id: userRole.company_id,
    role_id: userRole.role_id,
    department_id: userRole.department_id
  }
  showEditModal.value = true
}

const saveUserRole = async () => {
  try {
    if (authStore.user?.company_id) {
      userRoleForm.value.company_id = authStore.user.company_id
    }
    
    if (showEditModal.value && editingUserRole.value) {
      await userRolesStore.updateUserRole(editingUserRole.value.id, {
        role_id: userRoleForm.value.role_id,
        department_id: userRoleForm.value.department_id
      })
      showSuccessModal.value = true
      successMessage.value = 'Role assignment updated successfully!'
    } else {
      await userRolesStore.createUserRole(userRoleForm.value)
      showSuccessModal.value = true
      successMessage.value = 'Role assigned successfully!'
    }
    closeModal()
    await loadUserRoles()
  } catch (error) {
    console.error('Failed to save user role:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to save role assignment. Please try again.'
  }
}

const deleteUserRole = async (id: number) => {
  confirmMessage.value = 'Are you sure you want to remove this role assignment? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await userRolesStore.deleteUserRole(id)
      showSuccessModal.value = true
      successMessage.value = 'Role assignment removed successfully!'
      showConfirmModal.value = false
      await loadUserRoles()
    } catch (error) {
      console.error('Failed to delete user role:', error)
      showSuccessModal.value = true
      successMessage.value = 'Failed to remove role assignment. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const toggleRoleDescription = (roleId: number) => {
  const index = expandedRoles.value.indexOf(roleId)
  if (index > -1) {
    expandedRoles.value.splice(index, 1)
  } else {
    expandedRoles.value.push(roleId)
  }
}

const closeModal = () => {
  showAssignModal.value = false
  showEditModal.value = false
  editingUserRole.value = null
  userRoleForm.value = {
    user_id: 0,
    company_id: 0,
    role_id: 0,
    department_id: 0
  }
  userRolesStore.clearError()
}

onMounted(async () => {
  await Promise.all([
    loadUserRoles(),
    loadUsers(),
    loadRoles(),
    loadDepartments()
  ])
})
</script> 
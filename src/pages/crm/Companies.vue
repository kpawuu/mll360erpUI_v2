<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <!-- Modern Header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <!-- Left: Title and Description -->
        <div class="mb-4 md:mb-0">
          <div class="flex items-center mb-2">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Companies</h1>
            <span class="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {{ filteredCompanies.length }} total
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Manage your client companies and business relationships</p>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex items-center space-x-3">
          <!-- Import Button -->
          <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            Import
          </button>

          <!-- Add Company Button -->
          <button type="button" @click="openCompanyModal('add')" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Company
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Companies</dt>
                <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ companies.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Companies</dt>
                <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ companies.filter(c => c.status === 'active').length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Renewals This Month</dt>
                <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ getCompaniesRenewingThisMonth() }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Avg Health Score</dt>
                <dd class="text-lg font-semibold text-gray-900 dark:text-white">{{ getAverageHealthScore() }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modern Tabs Navigation -->
    <div class="mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button @click="activeTab = 'companies'"
            :class="[
              'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
              activeTab === 'companies' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
            ]">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"></path>
            </svg>
            Companies
            <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {{ companies.length }}
            </span>
          </button>
          
          <button @click="activeTab = 'contracts'"
            :class="[
              'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
              activeTab === 'contracts' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
            ]">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"></path>
            </svg>
            Contracts
            <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {{ allContracts.length }}
            </span>
          </button>
        </nav>
      </div>
    </div>
  
      <!-- Companies Tab Content -->
      <div v-if="activeTab === 'companies'" class="animate-fadeIn">
      <!-- Modern Search and Filters -->
      <div class="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input v-model="searchTerm" type="text" 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search companies...">
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Industry Filter -->
            <select v-model="filters.industry" 
              class="block px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Consulting">Consulting</option>
            </select>

            <!-- Status Filter -->
            <select v-model="filters.status" 
              class="block px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            <!-- View Toggle -->
            <div class="flex border border-gray-300 rounded-lg dark:border-gray-600">
              <button @click="viewMode = 'cards'" 
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-l-lg transition-colors',
                  viewMode === 'cards' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                ]">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
              <button @click="viewMode = 'table'" 
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-r-lg transition-colors border-l border-gray-300 dark:border-gray-600',
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                ]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            <!-- Clear Filters -->
            <button v-if="searchTerm || filters.industry || filters.status" @click="clearFilters" 
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear
            </button>
          </div>
        </div>
      </div>
  

  
        <!-- Companies Grid -->
        <div v-if="viewMode === 'cards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="company in filteredCompanies" :key="company.id"
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
            
            <!-- Company Card Header -->
            <div class="p-6 border-b border-gray-100 dark:border-gray-700">
              <div class="flex items-start justify-between">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {{ getInitials(company.name) }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">{{ company.name }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ company.industry }}</p>
                  </div>
                </div>
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  company.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  company.status === 'inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                ]">
                  {{ company.status }}
                </span>
              </div>
            </div>

            <!-- Company Details -->
            <div class="p-6 space-y-4">
              <!-- Key Information -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">{{ company.location }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Size</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">{{ company.size }}</p>
                </div>
              </div>

              <!-- Contact Information -->
              <div>
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Primary Contact</p>
                <div class="mt-2 flex items-center">
                  <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                    <span class="text-xs font-medium text-gray-600 dark:text-gray-300">{{ getInitials(company.primaryContact.name) }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ company.primaryContact.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ company.primaryContact.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Health Score -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Health Score</span>
                  <span :class="[
                    'text-sm font-semibold',
                    getHealthScoreColor(company.customerSuccessScore)
                  ]">{{ company.customerSuccessScore }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div :class="[
                    'h-2 rounded-full transition-all duration-300',
                    getHealthScoreBarColor(company.customerSuccessScore)
                  ]" :style="{ width: company.customerSuccessScore + '%' }"></div>
                </div>
              </div>

              <!-- Renewal Information -->
              <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Next Renewal</span>
                  <div class="text-right">
                    <p :class="[
                      'text-sm font-medium',
                      getRenewalDateColor(company.renewalDate)
                    ]">{{ formatDate(company.renewalDate) }}</p>
                    <span v-if="isRenewalSoon(company.renewalDate)"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <button @click="viewCompanyDetails(company)"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  View
                </button>
                <button @click="openCompanyModal('edit', company)"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredCompanies.length === 0"
            class="col-span-full flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No companies found</h3>
            <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">We couldn't find any companies matching your search criteria. Try adjusting your filters or add a new company.</p>
            <button type="button" @click="openCompanyModal('add')"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add New Company
            </button>
          </div>
        </div>
  
        <!-- Companies Table View -->
        <div v-else class="relative overflow-x-auto border border-gray-200 sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Company Name
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Industry
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Location
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Size
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Primary Contact
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Customer Since
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Renewal Date
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="company in filteredCompanies" :key="company.id"
                class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm overflow-hidden border border-blue-100 dark:border-blue-800 mr-3">
                      {{ company.name.charAt(0) }}
                    </div>
                    {{ company.name }}
                  </div>
                </th>
                <td class="px-6 py-4">
                  {{ company.industry }}
                </td>
                <td class="px-6 py-4">
                  {{ company.location }}
                </td>
                <td class="px-6 py-4">
                  {{ company.size }}
                </td>
                <td class="px-6 py-4">
                  {{ company.primaryContact.name }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(company.createdAt) }}
                </td>
                <td class="px-6 py-4">
                  <span :class="getRenewalDateColor(company.renewalDate)">
                    {{ formatDate(company.renewalDate) }}
                    <span v-if="isRenewalSoon(company.renewalDate)"
                      class="ml-2 bg-yellow-50 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-md border border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                      Soon
                    </span>
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <button @click="openCompanyModal('edit', company)"
                      class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Edit Company">
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button @click="viewCompanyDetails(company)"
                      class="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50"
                      title="View Details">
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
  
              <!-- Empty State Row -->
              <tr v-if="filteredCompanies.length === 0">
                <td colspan="8" class="px-6 py-10 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No companies found</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">We couldn't find any companies
                      matching
                      your search criteria. Try adjusting your filters or add a new company.</p>
                    <button type="button" @click="openCompanyModal('add')"
                      class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"
                          d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add New Company
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Contracts Tab Content -->
      <div v-if="activeTab === 'contracts'" class="animate-fadeIn">
        <!-- Contracts Header with Stats -->
        <div
          class="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-500" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Contracts
            </h3>
            <span class="text-sm text-gray-500 dark:text-gray-300">Total: {{ filteredContracts.length }}</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" @click="openContractModal('add')"
              class="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 rounded-lg shadow-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Contract
            </button>
          </div>
        </div>
  
        <!-- Search and Filters -->
        <div
          class="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
          <!-- Search -->
          <div class="relative flex-grow max-w-md w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
              </svg>
            </div>
            <input v-model="contractSearch" type="text"
              class="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
              placeholder="Search contracts...">
          </div>
          <!-- Status Filter -->
          <select v-model="contractStatusFilter"
            class="block w-full md:w-auto px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <!-- Contracts Table -->
        <div class="relative overflow-x-auto border border-gray-200 sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Contract Name
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Company
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Value
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Start Date
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  End Date
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contract in filteredContracts" :key="contract.id"
                class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                      <path
                        d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a1 1 0 1 0 0-2Zm-6 8.375A1.626 1.626 0 0 1 11.375 17H9a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h2.375A1.626 1.626 0 0 1 13 11.625v3.75Z" />
                    </svg>
                    {{ contract.name }}
                  </div>
                </th>
                <td class="px-6 py-4">
                  {{ getCompanyNameById(contract.companyId) }}
                </td>
                <td class="px-6 py-4">
                  ${{ contract.value.toLocaleString() }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(contract.startDate) }}
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    'text-xs font-medium',
                    isContractExpiringSoon(contract) ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                  ]">
                    {{ formatDate(contract.endDate) }}
                    <span v-if="isContractExpiringSoon(contract)"
                      class="ml-2 bg-red-50 text-red-700 text-xs font-medium px-2 py-0.5 rounded-md border border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                      Soon
                    </span>
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="flex items-center">
                    <div class="h-2.5 w-2.5 rounded-full mr-2" :class="[
                      contract.status === 'active' ? 'bg-green-500' :
                        contract.status === 'expired' ? 'bg-red-500' :
                          contract.status === 'pending' ? 'bg-yellow-500' :
                            'bg-blue-500'
                    ]"></div>
                    {{ contract.status.charAt(0).toUpperCase() + contract.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end">
                    <button type="button" @click="viewDocuments(contract)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50"
                      title="View Documents">
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </button>
                    <button type="button" @click="openContractModal('edit', contract)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 ml-2"
                      title="Edit Contract">
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button type="button" @click="openRenewalModal(contract)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 ml-2"
                      title="Renew Contract">
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
  
              <!-- Empty State Row -->
              <tr v-if="filteredContracts.length === 0">
                <td colspan="7" class="px-6 py-10 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No contracts found</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">We couldn't find any contracts
                      matching
                      your search criteria. Try adjusting your filters or add a new contract.</p>
                    <button type="button" @click="openContractModal('add')"
                      class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"
                          d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add New Contract
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Contract Modal (Add/Edit) -->
      <div v-if="contractModalOpen" id="contractModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
              <h3 class="text-xl font-semibold text-white">
                <div class="flex items-center">
                  <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3.5a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                  </svg>
                  {{ editMode ? 'Edit Contract' : 'Add New Contract' }}
                </div>
              </h3>
              <button type="button"
                class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                @click="closeContractModal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
  
            <div class="p-4 md:p-5 space-y-4">
              <form @submit.prevent="saveContract">
                <!-- Contract Name -->
                <div class="mb-5">
                  <label for="contract-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract
                    Name</label>
                  <input type="text" id="contract-name" v-model="contractForm.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter contract name" required />
                </div>
  
                <!-- Company Selection -->
                <div class="mb-5">
                  <label for="contract-company"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                  <select id="contract-company" v-model="contractForm.companyId"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select company</option>
                    <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
                  </select>
                </div>
  
                <!-- Contract Type -->
                <div class="mb-5">
                  <label for="contract-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract
                    Type</label>
                  <select id="contract-type" v-model="contractForm.type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select type</option>
                    <option value="service">Service Agreement</option>
                    <option value="product">Product License</option>
                    <option value="subscription">Subscription</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="custom">Custom Agreement</option>
                  </select>
                </div>
  
                <!-- Contract Duration -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label for="contract-start-date"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                        </svg>
                      </div>
                      <input type="date" id="contract-start-date" v-model="contractForm.startDate"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                    </div>
  
                    <div>
                      <label for="contract-end-date"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                            </svg>
                          </div>
                          <input type="date" id="contract-end-date" v-model="contractForm.endDate"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                        </div>
                      </div>
                    </div>
                </div>
  
                <!-- Contract Value -->
                <div class="mb-5">
                  <label for="contract-value"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract Value</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <span class="text-gray-500 dark:text-gray-400">$</span>
                    </div>
                    <input type="text" id="contract-value" v-model="contractForm.value"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.00" required />
                  </div>
                </div>
  
                <!-- Contract Status -->
                <div class="mb-5">
                  <label for="contract-status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                  <select id="contract-status" v-model="contractForm.status"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>
                    <option value="" disabled>Select status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
  
                <!-- Contract Notes -->
                <div class="mb-5">
                  <label for="contract-notes"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                  <textarea id="contract-notes" v-model="contractForm.notes" rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add any important notes about this contract..."></textarea>
                </div>
  
                <!-- Form Actions -->
                <div class="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    @click="closeContractModal">
                    Cancel
                  </button>
                  <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    {{ editMode ? 'Update Contract' : 'Save Contract' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Document Management Modal -->
      <div v-if="documentModalOpen" id="documentModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-4xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
              <h3 class="text-xl font-semibold text-white">
                <div class="flex items-center">
                  <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path
                      d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  </svg>
                  Document Management
                </div>
              </h3>
              <button type="button"
                class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                @click="closeDocumentModal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
  
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
              <!-- Contract Info -->
              <div
                class="p-4 mb-5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg shadow-sm dark:bg-gradient-to-r dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-800/50">
                <div class="flex flex-wrap items-center justify-between mb-3">
                  <h5 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-500" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3.5a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                    </svg>
                    {{ currentContract?.name }}
                  </h5>
                  <span :class="[
                    'px-2.5 py-1 text-xs font-medium rounded-full flex items-center',
                    currentContract?.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      currentContract?.status === 'expired' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  ]">
                    <div class="w-2 h-2 rounded-full mr-1.5" :class="[
                      currentContract?.status === 'active' ? 'bg-green-500' :
                        currentContract?.status === 'expired' ? 'bg-red-500' :
                          'bg-yellow-500'
                    ]"></div>
                    {{ currentContract?.status.charAt(0).toUpperCase() + currentContract?.status.slice(1) }}
                  </span>
                </div>
  
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">{{
                      getCompanyNameById(currentContract?.companyId) }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">
                      {{ formatDate(currentContract?.startDate) }} - {{ formatDate(currentContract?.endDate) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Value</p>
                    <p class="text-base font-semibold text-gray-900 dark:text-white">{{ currentContract?.value }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Document Upload -->
              <div class="mb-4">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Document</h4>
                <div class="flex items-center justify-center w-full">
                  <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 3-3V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                          upload</span> or drag and drop</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, XLSX, or images (MAX. 10MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
                  </label>
                </div>
              </div>
  
              <!-- Document List -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Documents</h4>
                <div class="relative overflow-x-auto border border-gray-200 sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">Document Name</th>
                        <th scope="col" class="px-6 py-3">Type</th>
                        <th scope="col" class="px-6 py-3">Upload Date</th>
                        <th scope="col" class="px-6 py-3">Version</th>
                        <th scope="col" class="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(doc, index) in currentContract?.documents" :key="index"
                        class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div class="flex items-center">
                            <svg v-if="doc.type === 'pdf'" class="w-4 h-4 mr-2 text-red-500" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                              <path
                                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a1 1 0 1 0 0-2Zm-6 8.375A1.626 1.626 0 0 1 11.375 17H9a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h2.375A1.626 1.626 0 0 1 13 11.625v3.75Z" />
                            </svg>
                            <svg v-else-if="doc.type === 'docx'" class="w-4 h-4 mr-2 text-blue-600" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                              <path
                                d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                            </svg>
                            <svg v-else-if="doc.type === 'xlsx'" class="w-4 h-4 mr-2 text-green-600" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a1 1 0 1 0 0-2Zm-6 8.375A1.626 1.626 0 0 1 11.375 17H9a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h2.375A1.626 1.626 0 0 1 13 11.625v3.75Z" />
                            </svg>
                            <svg v-else class="w-4 h-4 mr-2 text-gray-500" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                              <path
                                d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                            </svg>
                            {{ doc.name }}
                          </div>
                        </th>
                        <td class="px-6 py-4">
                          {{ doc.type.toUpperCase() }}
                        </td>
                        <td class="px-6 py-4">
                          {{ formatDate(doc.uploadedAt) }}
                        </td>
                        <td class="px-6 py-4">
                          {{ doc.version }}
                        </td>
                        <td class="px-6 py-4 text-right">
                          <div class="flex items-center justify-end space-x-3">
                            <button type="button" @click="downloadDocument(doc)"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50"
                              title="Download">
                              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  d="M14.707 7.578-1.414-1.414 1.793-1.793a4.035 4.035 0 0 1 5.657 5.657l-9.9 9.9a1 1 0 0 1-.707.293H6v-3.172a1 1 0 0 1 .293-.707l7.542-7.542a.999.999 0 0 0 0-1.414l-.586-.586a.997.997 0 0 0-1.414 0L4.292 14.835a1 1 0 0 0-.707.293H0v-3.172a1 1 0 0 1 .293-.707l10.35-10.35a4.034 4.034 0 0 1 5.657 5.657l-1.793 1.793-1.414-1.414 1.793-1.793a2.036 2.036 0 0 0-2.828-2.828L1.707 13.128 1 16.97l3.842-.707 7.807-7.807 1.982-1.982a2.034 2.034 0 0 0-2.828 0l.232.232 1.985 1.986Z" />
                              </svg>
                            </button>
                            <button type="button" @click="deleteDocument(doc)"
                              class="font-medium text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50"
                              title="Delete">
                              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  d="M17 4h-4V2a2 2 0 0 0-2-2H7v5a2 2 0 0 1-2 2H0v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2Zm-3 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm-4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
  
                      <!-- Empty State -->
                      <tr v-if="!currentContract?.documents || currentContract.documents.length === 0">
                        <td colspan="5" class="px-6 py-10 text-center">
                          <div class="flex flex-col items-center justify-center">
                            <svg class="w-12 h-12 text-gray-400 mb-4" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No documents found</h3>
                            <p class="text-gray-500 dark:text-gray-400 max-w-md text-center mb-4">Upload a document to get
                              started.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
  
              <!-- Modal Footer -->
              <div class="flex items-center justify-end pt-5 border-t border-gray-200 dark:border-gray-700">
                <button type="button"
                  class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  @click="closeDocumentModal">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Contract Renewal Modal -->
        <div v-if="renewalModalOpen" id="renewalModal" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <!-- Modal header -->
              <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700">
                <h3 class="text-xl font-semibold text-white">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    Renew Contract
                  </div>
                </h3>
                <button type="button"
                  class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  @click="renewalModalOpen = false">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
  
              <!-- Modal body -->
              <div class="p-4 md:p-5 space-y-4">
                <!-- Current Contract Info -->
                <div
                  class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                  <div class="flex flex-wrap items-center justify-between mb-3">
                    <h5 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <svg class="w-5 h-5 text-blue-600 dark:text-blue-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3.5a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                      </svg>
                      {{ currentContract?.name }}
                    </h5>
                    <span :class="[
                      'px-2.5 py-1 text-xs font-medium rounded-full flex items-center',
                      currentContract?.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        currentContract?.status === 'expired' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    ]">
                      <div class="w-2 h-2 rounded-full mr-1.5" :class="[
                        currentContract?.status === 'active' ? 'bg-green-500' :
                          currentContract?.status === 'expired' ? 'bg-red-500' :
                            'bg-yellow-500'
                      ]"></div>
                      {{ currentContract?.status.charAt(0).toUpperCase() + currentContract?.status.slice(1) }}
                    </span>
                  </div>
  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                      <p class="text-base font-semibold text-gray-900 dark:text-white">{{
                        getCompanyNameById(currentContract?.companyId) }}</p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                      <p class="text-base font-semibold text-gray-900 dark:text-white">
                        {{ formatDate(currentContract?.startDate) }} - {{ formatDate(currentContract?.endDate) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Value</p>
                      <p class="text-base font-semibold text-gray-900 dark:text-white">{{ currentContract?.value }}</p>
                    </div>
                  </div>
                </div>
  
                <form @submit.prevent="processRenewal">
                  <!-- Renewal Options -->
                  <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Renewal Type</label>
                    <div class="flex flex-col space-y-2">
                      <div class="flex items-center">
                        <input id="renewal-same-terms" type="radio" v-model="renewalForm.type" value="same-terms"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="renewal-same-terms"
                          class="ms-2 text-sm font-medium text-gray-900 dark:text-white">Renew
                          with same terms</label>
                      </div>
                      <div class="flex items-center">
                        <input id="renewal-new-terms" type="radio" v-model="renewalForm.type" value="new-terms"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="renewal-new-terms"
                          class="ms-2 text-sm font-medium text-gray-900 dark:text-white">Renew
                          with new terms</label>
                      </div>
                    </div>
                  </div>
  
                  <!-- New Terms Section (conditional) -->
                  <div v-if="renewalForm.type === 'new-terms'"
                    class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <h5 class="text-md font-medium text-gray-900 dark:text-white mb-4">New Contract Terms</h5>
  
                    <!-- New Duration -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label for="renewal-start-date"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Start Date</label>
                        <div class="relative">
                          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                            </svg>
                          </div>
                          <input type="date" id="renewal-start-date" v-model="renewalForm.startDate"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                        </div>
  
                        <div>
                          <label for="renewal-end-date"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New End Date</label>
                          <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                              </svg>
                            </div>
                            <input type="date" id="renewal-end-date" v-model="renewalForm.endDate"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <!-- New Value -->
                  <div class="mb-4">
                    <label for="renewal-value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
                      Contract Value</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <span class="text-gray-500 dark:text-gray-400">$</span>
                      </div>
                      <input type="number" id="renewal-value" v-model="renewalForm.value" min="0" step="0.01"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0.00" required />
                    </div>
                  </div>
  
                  <!-- Duration for Same Terms -->
                  <div v-if="renewalForm.type === 'same-terms'" class="mb-4">
                    <label for="renewal-duration"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Renewal Duration</label>
                    <select id="renewal-duration" v-model="renewalForm.duration"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required>
                      <option value="" disabled>Select duration</option>
                      <option value="1">1 Year</option>
                      <option value="2">2 Years</option>
                      <option value="3">3 Years</option>
                      <option value="5">5 Years</option>
                    </select>
                  </div>
  
                  <!-- Notes -->
                  <div class="mb-4">
                    <label for="renewal-notes"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Renewal Notes</label>
                    <textarea id="renewal-notes" v-model="renewalForm.notes" rows="3"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Add any notes about this renewal..."></textarea>
                  </div>
                </form>
  
                <!-- Modal footer -->
                <div class="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b dark:border-gray-700">
                  <button type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    @click="renewalModalOpen = false">
                    Cancel
                  </button>
                  <button type="submit" @click="processRenewal"
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Process Renewal
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Company Modal (Add/Edit) -->
          <div v-if="companyModalOpen" id="companyModal" tabindex="-1" aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
            <div class="relative w-full max-w-2xl max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div
                  class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-blue-600 dark:bg-blue-700">
                  <h3 class="text-xl font-semibold text-white">
                    {{ editMode ? 'Edit Company' : 'Add New Company' }}
                  </h3>
                  <button type="button"
                    class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    @click="closeCompanyModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
  
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                  <form @submit.prevent="saveCompany">
                    <!-- Company Name -->
                    <div class="mb-5">
                      <label for="company-name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company
                        Name</label>
                      <input type="text" id="company-name" v-model="companyForm.name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter company name" required>
                    </div>
  
                    <!-- Industry and Size -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label for="company-industry"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry</label>
                        <select id="company-industry" v-model="companyForm.industry"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                          <option value="" disabled>Select industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Finance">Finance</option>
                          <option value="Education">Education</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Retail">Retail</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label for="company-size"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                        <select id="company-size" v-model="companyForm.size"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                          <option value="" disabled>Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501+">501+ employees</option>
                        </select>
                      </div>
                    </div>
  
                    <!-- Location -->
                    <div class="mb-5">
                      <label for="company-location"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                      <input type="text" id="company-location" v-model="companyForm.location"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter company location" required>
                    </div>
  
                    <!-- Primary Contact -->
                    <div class="mb-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Primary Contact</label>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <input type="text" v-model="companyForm.primaryContact.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Contact name" required>
                        </div>
                        <div>
                          <input type="email" v-model="companyForm.primaryContact.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Contact email" required>
                        </div>
                      </div>
                    </div>
  
                    <!-- Status and Customer Success Score -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label for="company-status"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select id="company-status" v-model="companyForm.status"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                          <option value="" disabled>Select status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <div>
                        <label for="customer-success-score"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Health Score
                          (%)</label>
                        <input type="number" id="customer-success-score" v-model="companyForm.customerSuccessScore"
                          min="0" max="100"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0-100" required>
                      </div>
                    </div>
  
                    <!-- Dates -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label for="company-created-at"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Since</label>
                        <div class="relative">
                          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input datepicker datepicker-format="yyyy-mm-dd" type="date" id="company-created-at"
                            v-model="companyForm.createdAt"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date" required>
                        </div>
                      </div>
                      <div>
                        <label for="company-renewal-date"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Renewal Date</label>
                        <div class="relative">
                          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input datepicker datepicker-format="yyyy-mm-dd" type="date" id="company-renewal-date"
                            v-model="companyForm.renewalDate"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date" required>
                        </div>
                      </div>
                    </div>
  
                    <!-- Notes -->
                    <div class="mb-5">
                      <label for="company-notes"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                      <textarea id="company-notes" v-model="companyForm.notes" rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Add any important notes about this company..."></textarea>
                    </div>
  
                    <!-- Form Actions -->
                    <div class="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button type="button"
                        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        @click="closeCompanyModal">
                        Cancel
                      </button>
                      <button type="submit"
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {{ editMode ? 'Update Company' : 'Save Company' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // View mode (cards or table)
  const viewMode = ref('cards');
  
  // Tab navigation
  const activeTab = ref('companies');
  
  // UI state
  const showExportMenu = ref(false);
  const companyModalOpen = ref(false);
  const editMode = ref(false);
  const currentCompany = ref(null);
  
  // Company form data
  const companyForm = ref({
    name: '',
    industry: '',
    size: '',
    location: '',
    primaryContact: {
      name: '',
      email: ''
    },
    status: 'active',
    customerSuccessScore: 85,
    createdAt: '',
    renewalDate: '',
    notes: ''
  });
  
  // Search and filters
  const searchTerm = ref('');
  const filters = ref({
    industry: '',
    size: '',
    status: ''
  });
  
  // Contract management state
  const contractSearchTerm = ref('');
  const contractCompanyFilter = ref('');
  const contractStatusFilter = ref('');
  const contractModalOpen = ref(false);
  const documentModalOpen = ref(false);
  const currentContract = ref(null);
  const currentDocument = ref(null);
  const contractForm = ref({
    id: null,
    name: '',
    companyId: '',
    type: '',
    startDate: '',
    endDate: '',
    value: '',
    status: 'active',
    notes: '',
    documents: []
  });
  
  // Renewal form
  const renewalModalOpen = ref(false);
  const renewalForm = ref({
    type: 'same-terms',
    startDate: '',
    endDate: '',
    value: '',
    duration: '1',
    notes: ''
  });
  
  // Sample company data
  const companies = ref([
    {
      id: 1,
      name: 'TechnoGlobal Industries',
      industry: 'Technology',
      size: 'Enterprise',
      location: 'San Francisco, CA',
      website: 'https://technoglobal.com',
      status: 'active',
      logo: '/path/to/logo1.png',
      primaryContact: {
        name: 'John Smith',
        email: 'john.smith@technoglobal.com',
        phone: '+1 (555) 123-4567',
        title: 'CTO'
      },
      onboardingStatus: 'completed',
      implementationStatus: 'in-progress',
      customerSuccessScore: 85,
      renewalDate: '2026-05-15',
      createdAt: '2025-01-10',
      contracts: [
        {
          id: 101,
          name: 'Enterprise License Agreement',
          type: 'subscription',
          status: 'active',
          startDate: '2025-01-15',
          endDate: '2026-01-14',
          value: '$120,000',
          documents: [
            { id: 1001, name: 'Contract.pdf', type: 'pdf', uploadedAt: '2025-01-12' },
            { id: 1002, name: 'SOW.docx', type: 'docx', uploadedAt: '2025-01-12' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'NexGen Robotics',
      industry: 'Manufacturing',
      size: 'Mid-Market',
      location: 'Boston, MA',
      website: 'https://nexgenrobotics.com',
      status: 'active',
      logo: '/path/to/logo2.png',
      primaryContact: {
        name: 'Sarah Johnson',
        email: 'sarah.j@nexgenrobotics.com',
        phone: '+1 (555) 987-6543',
        title: 'Operations Director'
      },
      onboardingStatus: 'in-progress',
      implementationStatus: 'planning',
      customerSuccessScore: 65,
      renewalDate: '2026-07-20',
      createdAt: '2025-03-05',
      contracts: [
        {
          id: 102,
          name: 'Manufacturing Solution',
          type: 'subscription',
          status: 'active',
          startDate: '2025-03-10',
          endDate: '2026-03-09',
          value: '$75,000',
          documents: [
            { id: 1003, name: 'Contract.pdf', type: 'pdf', uploadedAt: '2025-03-07' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'GlobalTech Solutions',
      industry: 'Consulting',
      size: 'Enterprise',
      location: 'Chicago, IL',
      website: 'https://globaltechsolutions.com',
      status: 'active',
      logo: '/path/to/logo3.png',
      primaryContact: {
        name: 'Michael Rodriguez',
        email: 'm.rodriguez@globaltechsolutions.com',
        phone: '+1 (555) 456-7890',
        title: 'CEO'
      },
      onboardingStatus: 'completed',
      implementationStatus: 'completed',
      customerSuccessScore: 92,
      renewalDate: '2025-12-31',
      createdAt: '2025-01-01',
      contracts: [
        {
          id: 103,
          name: 'Enterprise Consulting Package',
          type: 'subscription',
          status: 'active',
          startDate: '2025-01-01',
          endDate: '2025-12-31',
          value: '$200,000',
          documents: [
            { id: 1004, name: 'Contract.pdf', type: 'pdf', uploadedAt: '2024-12-15' },
            { id: 1005, name: 'SOW.docx', type: 'docx', uploadedAt: '2024-12-15' },
            { id: 1006, name: 'Addendum.pdf', type: 'pdf', uploadedAt: '2025-02-10' }
          ]
        }
      ]
    }
  ]);
  
  // Filtered companies based on search and filters
  const filteredCompanies = computed(() => {
    return companies.value.filter(company => {
      const nameMatch = company.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      const industryMatch = filters.value.industry === '' || company.industry === filters.value.industry;
      const sizeMatch = filters.value.size === '' || company.size === filters.value.size;
      const statusMatch = filters.value.status === '' || company.status === filters.value.status;
      return nameMatch && industryMatch && sizeMatch && statusMatch;
    });
  });
  
  // Company modal functions
  function openCompanyModal(mode, company = null) {
    companyModalOpen.value = true;
    editMode.value = mode === 'edit';
  
    if (mode === 'edit' && company) {
      currentCompany.value = company;
      // Populate form with company data
      companyForm.value = {
        name: company.name,
        industry: company.industry,
        size: company.size,
        location: company.location,
        primaryContact: {
          name: company.primaryContact.name,
          email: company.primaryContact.email
        },
        status: company.status,
        customerSuccessScore: company.customerSuccessScore,
        createdAt: company.createdAt,
        renewalDate: company.renewalDate,
        notes: company.notes || ''
      };
    } else {
      // Reset form for new company
      currentCompany.value = null;
      companyForm.value = {
        name: '',
        industry: '',
        size: '',
        location: '',
        primaryContact: {
          name: '',
          email: ''
        },
        status: 'active',
        customerSuccessScore: 85,
        createdAt: new Date().toISOString().split('T')[0],
        renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        notes: ''
      };
    }
  }
  
  function closeCompanyModal() {
    companyModalOpen.value = false;
    currentCompany.value = null;
  }
  
  function saveCompany() {
    if (editMode.value && currentCompany.value) {
      // Update existing company
      const index = companies.value.findIndex(c => c.id === currentCompany.value.id);
      if (index !== -1) {
        companies.value[index] = {
          ...companies.value[index],
          name: companyForm.value.name,
          industry: companyForm.value.industry,
          size: companyForm.value.size,
          location: companyForm.value.location,
          primaryContact: companyForm.value.primaryContact,
          status: companyForm.value.status,
          customerSuccessScore: companyForm.value.customerSuccessScore,
          createdAt: companyForm.value.createdAt,
          renewalDate: companyForm.value.renewalDate,
          notes: companyForm.value.notes
        };
      }
    } else {
      // Add new company
      const newCompany = {
        id: `company-${Date.now()}`,
        name: companyForm.value.name,
        industry: companyForm.value.industry,
        size: companyForm.value.size,
        location: companyForm.value.location,
        primaryContact: companyForm.value.primaryContact,
        status: companyForm.value.status,
        customerSuccessScore: companyForm.value.customerSuccessScore,
        createdAt: companyForm.value.createdAt,
        renewalDate: companyForm.value.renewalDate,
        notes: companyForm.value.notes,
        contracts: [],
        documents: []
      };
      companies.value.push(newCompany);
    }
  
    closeCompanyModal();
  }
  
  // Export functions
  function exportCompanies(format) {
    console.log(`Exporting companies as ${format}`);
    showExportMenu.value = false;
  }
  
  // Clear filters
  function clearFilters() {
    searchTerm.value = '';
    filters.value.industry = '';
    filters.value.size = '';
    filters.value.status = '';
  }
  
  // Format date
  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Get health score color
  function getHealthScoreColor(score) {
    if (score >= 90) return 'text-green-800 dark:text-green-300';
    else if (score >= 70) return 'text-yellow-800 dark:text-yellow-300';
    else return 'text-red-800 dark:text-red-300';
  }
  
  // Get health score bar color
  function getHealthScoreBarColor(score) {
    if (score >= 90) return 'bg-green-500 dark:bg-green-900';
    else if (score >= 70) return 'bg-yellow-500 dark:bg-yellow-900';
    else return 'bg-red-500 dark:bg-red-900';
  }
  
  // Get renewal date color
  function getRenewalDateColor(date) {
    const today = new Date();
    const renewalDate = new Date(date);
    const daysUntilRenewal = Math.round((renewalDate - today) / (1000 * 60 * 60 * 24));
    if (daysUntilRenewal <= 30) return 'text-red-800 dark:text-red-300';
    else if (daysUntilRenewal <= 60) return 'text-yellow-800 dark:text-yellow-300';
    else return 'text-green-800 dark:text-green-300';
  }
  
  // Check if renewal is soon
  function isRenewalSoon(date) {
    const today = new Date();
    const renewalDate = new Date(date);
    const daysUntilRenewal = Math.round((renewalDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilRenewal <= 30;
  }
  
  // View company details
  function viewCompanyDetails(company) {
    console.log(`Viewing company details for ${company.name}`);
  }
  
  // Contract management functions
  function getContractCountByStatus(status) {
    let count = 0;
    companies.value.forEach(company => {
      if (company.contracts) {
        count += company.contracts.filter(contract => contract.status === status).length;
      }
    });
    return count;
  }
  
  function getContractsExpiringSoon() {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
  
    let expiringSoonContracts = [];
    companies.value.forEach(company => {
      if (company.contracts) {
        company.contracts.forEach(contract => {
          const endDate = new Date(contract.endDate);
          if (endDate > today && endDate <= thirtyDaysFromNow && contract.status === 'active') {
            expiringSoonContracts.push({ ...contract, companyId: company.id });
          }
        });
      }
    });
    return expiringSoonContracts;
  }
  
  function getTotalRenewalValue() {
    const expiringSoonContracts = getContractsExpiringSoon();
    let totalValue = 0;
  
    expiringSoonContracts.forEach(contract => {
      // Extract numeric value from contract value string (e.g., "$120,000" -> 120000)
      const valueString = contract.value.replace(/[^0-9]/g, '');
      totalValue += parseInt(valueString, 10) || 0;
    });
  
    return totalValue.toLocaleString();
  }
  
  // Get all contracts across all companies
  const allContracts = computed(() => {
    let contracts = [];
    companies.value.forEach(company => {
      if (company.contracts) {
        contracts = contracts.concat(
          company.contracts.map(contract => ({
            ...contract,
            companyId: company.id
          }))
        );
      }
    });
    return contracts;
  });
  
  // Filtered contracts based on search and filters
  const filteredContracts = computed(() => {
    return allContracts.value.filter(contract => {
      const nameMatch = contract.name.toLowerCase().includes(contractSearchTerm.value.toLowerCase());
      const companyMatch = contractCompanyFilter.value === '' || contract.companyId === parseInt(contractCompanyFilter.value);
      const statusMatch = contractStatusFilter.value === '' || contract.status === contractStatusFilter.value;
      return nameMatch && companyMatch && statusMatch;
    });
  });
  
  // Get company name by ID
  function getCompanyNameById(companyId) {
    const company = companies.value.find(c => c.id === companyId);
    return company ? company.name : 'Unknown';
  }
  
  // Check if contract is expiring soon
  function isContractExpiringSoon(contract) {
    const today = new Date();
    const endDate = new Date(contract.endDate);
    const daysUntilExpiration = Math.round((endDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  }
  
  // Contract modal functions
  function openContractModal(mode, contract = null) {
    contractModalOpen.value = true;
    editMode.value = mode === 'edit';
    currentContract.value = contract;
  
    // Reset form
    contractForm.value = {
      id: null,
      name: '',
      companyId: '',
      type: '',
      startDate: '',
      endDate: '',
      value: '',
      status: 'active',
      notes: '',
      documents: []
    };
  
    // If editing, populate form with contract data
    if (mode === 'edit' && contract) {
      currentContract.value = contract;
      contractForm.value = {
        id: contract.id,
        name: contract.name,
        companyId: contract.companyId,
        type: contract.type,
        startDate: contract.startDate,
        endDate: contract.endDate,
        value: contract.value.replace('$', ''),
        status: contract.status,
        notes: contract.notes || '',
        documents: contract.documents || []
      };
    }
  }
  
  function closeContractModal() {
    contractModalOpen.value = false;
    currentContract.value = null;
  }
  
  function saveContract() {
    console.log('Saving contract:', contractForm.value);
  
    // Format the contract value to include $ sign if not present
    let formattedValue = contractForm.value.value;
    if (!formattedValue.startsWith('$')) {
      formattedValue = '$' + formattedValue;
    }
  
    const contractData = {
      ...contractForm.value,
      value: formattedValue
    };
  
    if (editMode.value) {
      // Update existing contract
      const companyIndex = companies.value.findIndex(c => c.id === contractData.companyId);
      if (companyIndex !== -1) {
        const contractIndex = companies.value[companyIndex].contracts.findIndex(c => c.id === contractData.id);
        if (contractIndex !== -1) {
          companies.value[companyIndex].contracts[contractIndex] = contractData;
        }
      }
    } else {
      // Add new contract
      const newContract = {
        ...contractData,
        id: Date.now(), // Generate a unique ID
        documents: []
      };
  
      const companyIndex = companies.value.findIndex(c => c.id === newContract.companyId);
      if (companyIndex !== -1) {
        if (!companies.value[companyIndex].contracts) {
          companies.value[companyIndex].contracts = [];
        }
        companies.value[companyIndex].contracts.push(newContract);
      }
    }
  
    closeContractModal();
  }
  
  // Document management functions
  function viewDocuments(contract) {
    console.log(`Viewing documents for contract: ${contract.name}`);
    documentModalOpen.value = true;
    currentContract.value = contract;
  }
  
  function downloadDocument(doc) {
    console.log(`Downloading document: ${doc.name}`);
    // In a real application, this would trigger a download
    alert(`Downloading ${doc.name}`);
  }
  
  function deleteDocument(doc) {
    console.log(`Deleting document: ${doc.name}`);
  
    if (!currentContract.value || !currentContract.value.documents) return;
  
    const docIndex = currentContract.value.documents.findIndex(d => d.id === doc.id);
    if (docIndex !== -1) {
      currentContract.value.documents.splice(docIndex, 1);
  
      // Update the company's contract documents
      const companyIndex = companies.value.findIndex(c => c.id === currentContract.value.companyId);
      if (companyIndex !== -1) {
        const contractIndex = companies.value[companyIndex].contracts.findIndex(c => c.id === currentContract.value.id);
        if (contractIndex !== -1) {
          companies.value[companyIndex].contracts[contractIndex].documents = currentContract.value.documents;
        }
      }
    }
  }
  
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    console.log(`Uploading document: ${file.name}`);
  
    // Create a new document object
    const newDocument = {
      id: Date.now(),
      name: file.name,
      type: file.name.split('.').pop().toLowerCase(),
      uploadedAt: new Date().toISOString().split('T')[0],
      version: '1.0'
    };
  
    // Add document to current contract
    if (currentContract.value) {
      if (!currentContract.value.documents) {
        currentContract.value.documents = [];
      }
      currentContract.value.documents.push(newDocument);
  
      // Update the company's contract documents
      const companyIndex = companies.value.findIndex(c => c.id === currentContract.value.companyId);
      if (companyIndex !== -1) {
        const contractIndex = companies.value[companyIndex].contracts.findIndex(c => c.id === currentContract.value.id);
        if (contractIndex !== -1) {
          companies.value[companyIndex].contracts[contractIndex].documents = currentContract.value.documents;
        }
      }
    }
  
    // Reset file input
    event.target.value = '';
  }
  
  function closeDocumentModal() {
    documentModalOpen.value = false;
    currentContract.value = null;
  }
  
  // Renewal modal functions
  function openRenewalModal(contract) {
    renewalModalOpen.value = true;
    currentContract.value = contract;
  
    // Calculate default new dates based on current contract
    const currentEndDate = new Date(contract.endDate);
    const newStartDate = new Date(currentEndDate);
    newStartDate.setDate(newStartDate.getDate() + 1); // Start day after current end date
  
    const newEndDate = new Date(newStartDate);
    newEndDate.setFullYear(newEndDate.getFullYear() + 1); // Default to 1 year
  
    // Format dates for input fields
    const formatDateForInput = (date) => {
      return date.toISOString().split('T')[0];
    };
  
    // Reset form with default values
    renewalForm.value = {
      type: 'same-terms',
      startDate: formatDateForInput(newStartDate),
      endDate: formatDateForInput(newEndDate),
      value: contract.value.replace('$', ''),
      duration: '1',
      notes: ''
    };
  }
  
  function closeRenewalModal() {
    renewalModalOpen.value = false;
    currentContract.value = null;
  }
  
  function processRenewal() {
    console.log('Processing renewal...');
  
    if (!currentContract.value) return;
  
    // Create the renewed contract
    let renewedContract = {
      id: Date.now(), // Generate a unique ID
      name: currentContract.value.name + ' (Renewed)',
      companyId: currentContract.value.companyId,
      type: currentContract.value.type,
      documents: [],
      status: 'active'
    };
  
    if (renewalForm.value.type === 'same-terms') {
      // Calculate new dates based on duration
      const duration = parseInt(renewalForm.value.duration);
      const startDate = new Date(currentContract.value.endDate);
      startDate.setDate(startDate.getDate() + 1); // Start day after current end date
  
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + duration);
  
      renewedContract = {
        ...renewedContract,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        value: currentContract.value.value
      };
    } else {
      // Use new terms from form
      renewedContract = {
        ...renewedContract,
        startDate: renewalForm.value.startDate,
        endDate: renewalForm.value.endDate,
        value: '$' + renewalForm.value.value
      };
    }
  
    // Add notes if provided
    if (renewalForm.value.notes) {
      renewedContract.notes = renewalForm.value.notes;
    }
  
    // Add the renewed contract to the company
    const companyIndex = companies.value.findIndex(c => c.id === renewedContract.companyId);
    if (companyIndex !== -1) {
      if (!companies.value[companyIndex].contracts) {
        companies.value[companyIndex].contracts = [];
      }
      companies.value[companyIndex].contracts.push(renewedContract);
  
      // Mark the old contract as expired
      const oldContractIndex = companies.value[companyIndex].contracts.findIndex(c => c.id === currentContract.value.id);
      if (oldContractIndex !== -1) {
        companies.value[companyIndex].contracts[oldContractIndex].status = 'expired';
      }
    }
  
    closeRenewalModal();
  }
  
  // Statistics functions
  function getCompaniesRenewingThisMonth() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return companies.value.filter(company => {
      const renewalDate = new Date(company.renewalDate);
      return renewalDate.getMonth() === currentMonth && renewalDate.getFullYear() === currentYear;
    }).length;
  }
  
  function getAverageHealthScore() {
    if (companies.value.length === 0) return 0;
    
    const totalScore = companies.value.reduce((sum, company) => sum + company.customerSuccessScore, 0);
    return Math.round(totalScore / companies.value.length);
  }
  
  // Get initials from name
  function getInitials(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  
<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Logistics Contract Invoices</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Manage invoices, track payments, and monitor financial performance</p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="showGenerateModal = true"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border border-green-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Invoice
          </button>
          <button
            @click="showPaymentModal = true"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Record Payment
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Invoices -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ calculatedStatistics.total_invoices || statistics.total_invoices || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Amount -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(calculatedStatistics.total_amount || statistics.total_amount || 0) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Paid Amount -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center border border-green-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Amount</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(calculatedStatistics.paid_amount || statistics.paid_amount || 0) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Outstanding Amount -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center border border-red-400">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(calculatedStatistics.outstanding_amount || statistics.outstanding_amount || 0) }}</p>
            </div>
          </div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Invoices</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage invoices</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {{ pagination.total || 0 }} invoices
            </span>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Invoices</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="filters.search"
                @input="onSearchChange"
                type="text"
                placeholder="Search by invoice number, opportunity..."
                :disabled="loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
              <div v-if="loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <div class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              </div>
              <div v-else-if="filters.search" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</label>
            <select
              v-model="filters.status"
              @change="onStatusFilterChange"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
              <option value="partial">Partial</option>
            </select>
          </div>

          <!-- From Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">From Date</label>
            <input
              v-model="filters.from_date"
              @change="onDateFilterChange"
              type="date"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            />
          </div>

          <!-- To Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">To Date</label>
            <input
              v-model="filters.to_date"
              @change="onDateFilterChange"
              type="date"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            />
          </div>

          <!-- Refresh Button -->
          <div class="flex items-end">
            <button
              @click="loadInvoices"
              :disabled="loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-blue-500"
            >
              <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Filter Summary -->
        <div v-if="filters.search || filters.status || filters.from_date || filters.to_date" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ pagination.total || 0 }} result{{ (pagination.total || 0) !== 1 ? 's' : '' }}
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
    <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
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
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Table Row Skeletons -->
            <tr v-for="n in 5" :key="n" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <!-- Invoice Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"></div>
                    <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </td>

              <!-- Opportunity Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
              </td>

              <!-- Amount Column Skeleton -->
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
              </td>

              <!-- Status Column Skeleton -->
              <td class="px-6 py-4">
                <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
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
      <!-- Enhanced Empty State -->
      <div v-if="!loading && (!invoices || invoices.length === 0)" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex flex-col items-center justify-center py-16 px-6">
          <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-violet-500 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            {{ filters.search || filters.status || filters.from_date || filters.to_date ? 'No invoices found' : 'No invoices yet' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed">
            {{ filters.search || filters.status || filters.from_date || filters.to_date ? 'Try adjusting your search criteria or clear the filters to see more results.' : 'Get started by generating invoices from opportunities.' }}
          </p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              v-if="filters.search || filters.status || filters.from_date || filters.to_date"
              @click="clearFilters"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear Filters
            </button>
            <button
              @click="showGenerateModal = true"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 border border-green-500 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Generate Invoice
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Table View -->
      <div v-else-if="invoices && invoices.length > 0" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Details
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opportunity
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ invoice.invoice_number }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ formatDate(invoice.invoice_date) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ invoice.opportunity?.title || 'N/A' }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ invoice.opportunity?.entity?.name || 'N/A' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatCurrency(calculateInvoiceTotalFromLineItems(invoice), invoice.currency_id) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ invoice.line_items?.length || 0 }} line items
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusClasses(invoice.status)
                    ]"
                  >
                    {{ formatStatus(invoice.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{{ formatDate(invoice.due_date) }}</div>
                  <div v-if="isOverdue(invoice)" class="text-red-600 text-xs">
                    {{ getDaysOverdue(invoice) }} days overdue
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatCurrency(invoice.paid_amount || 0, invoice.currency_id) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ getPaymentPercentage(invoice) }}% paid
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="viewInvoice(invoice)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      View
                    </button>
                    <button
                      v-if="invoice.status === 'draft'"
                      @click="sendInvoice(invoice)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                      Send
                    </button>
                    <button
                      v-if="invoice.status === 'sent' || invoice.status === 'partial'"
                      @click="recordPayment(invoice)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Pay
                    </button>
                    <button
                      @click="editInvoice(invoice)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      @click="manageLineItems(invoice)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-800 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                      Line Items
                    </button>

                    <button
                      v-if="invoice.status === 'draft'"
                      @click="deleteInvoice(invoice)"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:border-red-300 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-800 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800 transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination Controls -->
        <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pb-6">
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
            <select 
              v-model="pagination.limit" 
              @change="onLimitChange"
              :disabled="loading"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              of {{ pagination.total || 0 }} entries
            </span>
          </div>
          
          <div class="flex items-center space-x-2">
            <button 
              @click="previousPage" 
              :disabled="pagination.page <= 1 || loading"
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
                :disabled="loading"
                :class="[
                  'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                  page === pagination.page
                    ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="nextPage" 
              :disabled="pagination.page >= totalPages || loading"
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
    </div>

    <!-- Generate Invoice Modal -->
    <GenerateInvoiceModal
      :show="showGenerateModal"
      @close="showGenerateModal = false"
      @invoice-generated="handleGenerateInvoice"
    />

    <!-- Payment Modal -->
    <PaymentModal
      :show="showPaymentModal"
      :invoice="selectedInvoice"
      @close="closePaymentModal"
      @payment-recorded="handlePayment"
    />

    <!-- Invoice Detail Modal -->
    <InvoiceDetailModal
      :show="showDetailModal"
      :invoice="selectedInvoice"
      @close="showDetailModal = false"
    />

    <!-- Line Items Modal -->
    <InvoiceLineItemsModal
      :show="showLineItemsModal"
      :line-items="selectedInvoice?.line_items || []"
      :invoice="selectedInvoice"
      @close="showLineItemsModal = false"
      @save="handleSaveLineItems"
    />

    <!-- Edit Invoice Modal -->
    <EditInvoiceModal
      :show="showEditModal"
      :invoice="selectedInvoice"
      @close="showEditModal = false"
      @save="handleSaveEdit"
    />

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-md">
            <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
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
                        @click="showSuccessModal = false" 
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
            <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
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
                        @click="showConfirmModal = false" 
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        @click="confirmAction && confirmAction()" 
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth.store'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'
import { useOpportunitiesStore } from '../../store/opportunities.store'
import { useCurrenciesStore } from '../../store/currencies.store'
import GenerateInvoiceModal from '../../components/crm/GenerateInvoiceModal.vue'
import PaymentModal from '../../components/crm/PaymentModal.vue'
import InvoiceDetailModal from '../../components/crm/InvoiceDetailModal.vue'
import InvoiceLineItemsModal from '../../components/crm/InvoiceLineItemsModal.vue'
import EditInvoiceModal from '../../components/crm/EditInvoiceModal.vue'

// Store instances
const authStore = useAuthStore()
const invoicesStore = useLogisticsContractInvoicesStore()
const opportunitiesStore = useOpportunitiesStore()
const currenciesStore = useCurrenciesStore()

// Router
const router = useRouter()

// Reactive data
const loading = ref(false)
const error = ref('')
const invoices = ref<any[]>([])
const opportunities = ref<any[]>([])
const statistics = reactive({
  total_invoices: 0,
  total_amount: 0,
  paid_amount: 0,
  outstanding_amount: 0,
  overdue_amount: 0,
  by_status: {}
})
const showGenerateModal = ref(false)
const showPaymentModal = ref(false)
const showDetailModal = ref(false)
const showLineItemsModal = ref(false)
const showEditModal = ref(false)
const showSuccessModal = ref(false)
const showConfirmModal = ref(false)
const selectedInvoice = ref<any>(null)
const isSearchDebouncing = ref(false)
const successMessage = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => Promise<void>) | null>(null)

// Filters
const filters = reactive({
  search: '',
  status: '',
  from_date: '',
  to_date: ''
})

// Pagination
const pagination = reactive({
  page: 1,
  limit: 20,
  total: 0,
  pages: 0,
  start: 0,
  end: 0
})

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, pagination.page - 2)
  const end = Math.min(pagination.pages, pagination.page + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const totalPages = computed(() => {
  return Math.ceil(pagination.total / pagination.limit)
})

// Calculate statistics from loaded invoices as fallback
const calculatedStatistics = computed(() => {
  const totalInvoices = invoices.value.length
  const totalAmount = invoices.value.reduce((sum, invoice) => {
    return sum + calculateInvoiceTotalFromLineItems(invoice)
  }, 0)
  const paidAmount = invoices.value.reduce((sum, invoice) => {
    return sum + (invoice.paid_amount || 0)
  }, 0)
  const outstandingAmount = totalAmount - paidAmount
  
  return {
    total_invoices: totalInvoices,
    total_amount: totalAmount,
    paid_amount: paidAmount,
    outstanding_amount: outstandingAmount
  }
})

// Methods
const loadInvoices = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const query: any = {
      $skip: (pagination.page - 1) * pagination.limit,
      $limit: pagination.limit,
      $sort: { created_at: -1 }
    }

    // Add filters
    if (filters.status) {
      query.status = filters.status
    }
    if (filters.from_date && filters.to_date) {
      query.invoice_date = {
        $gte: filters.from_date,
        $lte: filters.to_date
      }
    }

    await invoicesStore.fetchInvoices({ query })
    invoices.value = invoicesStore.getInvoices
    pagination.total = invoicesStore.getPagination.total
    pagination.pages = Math.ceil(invoicesStore.getPagination.total / pagination.limit)
    pagination.start = (pagination.page - 1) * pagination.limit + 1
    pagination.end = Math.min(pagination.page * pagination.limit, invoicesStore.getPagination.total)
  } catch (err: any) {
    error.value = err.message || 'Failed to load invoices'
  } finally {
    loading.value = false
  }
}

const loadStatistics = async () => {
  try {
    const query: any = {}
    
    // Add filters (same logic as loadInvoices)
    if (filters.status) {
      query.status = filters.status
    }
    if (filters.from_date && filters.to_date) {
      query.invoice_date = {
        $gte: filters.from_date,
        $lte: filters.to_date
      }
    }
    
    const stats = await invoicesStore.getInvoiceStatistics({ query })
    Object.assign(statistics, stats)
  } catch (err) {
    console.error('Failed to load statistics:', err)
  }
}

const loadOpportunities = async () => {
  try {
    await opportunitiesStore.fetchOpportunities({ 
      query: { 
        $limit: 1000,
        $sort: { date_created: -1 } // Most recent first
      } 
    })
    opportunities.value = opportunitiesStore.getOpportunities
  } catch (err) {
    console.error('Failed to load opportunities:', err)
  }
}

// Filter methods
const onSearchChange = () => {
  isSearchDebouncing.value = true
  clearTimeout((window as any).searchTimeout)
  ;(window as any).searchTimeout = setTimeout(() => {
    isSearchDebouncing.value = false
    pagination.page = 1
    loadInvoices()
    loadStatistics()
  }, 500)
}

const onStatusFilterChange = () => {
  pagination.page = 1
  loadInvoices()
  loadStatistics()
}

const onDateFilterChange = () => {
  pagination.page = 1
  loadInvoices()
  loadStatistics()
}

const applyFilters = () => {
  pagination.page = 1
  loadInvoices()
  loadStatistics()
}

const clearFilters = () => {
  Object.assign(filters, {
    search: '',
    status: '',
    from_date: '',
    to_date: ''
  })
  isSearchDebouncing.value = false
  applyFilters()
}

const previousPage = () => {
  if (pagination.page > 1) {
    pagination.page--
    loadInvoices()
  }
}

const nextPage = () => {
  if (pagination.page < totalPages.value) {
    pagination.page++
    loadInvoices()
  }
}

const goToPage = (page: number) => {
  pagination.page = page
  loadInvoices()
}

const onLimitChange = () => {
  pagination.page = 1
  loadInvoices()
}

const viewInvoice = (invoice: any) => {
  selectedInvoice.value = invoice
  showDetailModal.value = true
}

const editInvoice = (invoice: any) => {
  selectedInvoice.value = invoice
  showEditModal.value = true
}

const sendInvoice = async (invoice: any) => {
  try {
    await invoicesStore.sendInvoice(invoice.id, authStore.user?.id)
    loadInvoices()
    loadStatistics()
  } catch (err) {
    console.error('Failed to send invoice:', err)
  }
}

const recordPayment = (invoice: any) => {
  selectedInvoice.value = invoice
  showPaymentModal.value = true
}

const closePaymentModal = () => {
  showPaymentModal.value = false
  selectedInvoice.value = null
}

const handlePayment = async (paymentData: any) => {
  try {
    if (selectedInvoice.value) {
      await invoicesStore.recordPayment(selectedInvoice.value.id, paymentData)
      closePaymentModal()
      showSuccessModal.value = true
      successMessage.value = 'Payment recorded successfully!'
      await loadInvoices()
      await loadStatistics()
    }
  } catch (err) {
    console.error('Failed to record payment:', err)
    showSuccessModal.value = true
    successMessage.value = 'Failed to record payment. Please try again.'
  }
}

const handleGenerateInvoice = async (data: any) => {
  try {
    await invoicesStore.generateInvoice(data)
    showGenerateModal.value = false
    showSuccessModal.value = true
    successMessage.value = 'Invoice generated successfully!'
    await loadInvoices()
    await loadStatistics()
  } catch (err) {
    console.error('Failed to generate invoice:', err)
    showSuccessModal.value = true
    successMessage.value = 'Failed to generate invoice. Please try again.'
  }
}

const deleteInvoice = async (invoice: any) => {
  confirmMessage.value = 'Are you sure you want to delete this invoice? This action cannot be undone.'
  confirmAction.value = async () => {
    try {
      await invoicesStore.deleteInvoice(invoice.id)
      showSuccessModal.value = true
      successMessage.value = 'Invoice deleted successfully!'
      showConfirmModal.value = false
      await loadInvoices()
      await loadStatistics()
    } catch (err) {
      console.error('Failed to delete invoice:', err)
      showSuccessModal.value = true
      successMessage.value = 'Failed to delete invoice. Please try again.'
      showConfirmModal.value = false
    }
  }
  showConfirmModal.value = true
}

const manageLineItems = (invoice: any) => {
  selectedInvoice.value = invoice
  showLineItemsModal.value = true
}

const handleSaveLineItems = async (lineItems: any[]) => {
  try {
    if (selectedInvoice.value) {
      console.log('Saving line items:', lineItems)
      console.log('Invoice ID:', selectedInvoice.value.id)
      
      // Convert string values to numbers for validation
      const processedLineItems = lineItems.map(item => ({
        ...item,
        quantity: Number(item.quantity) || 0,
        unit_price: Number(item.unit_price) || 0,
        total_amount: Number(item.total_amount) || 0,
        currency_id: Number(item.currency_id) || 1,
        rate_id: item.rate_id ? Number(item.rate_id) : undefined
      }))
      
      console.log('Processed line items:', processedLineItems)
      
      await invoicesStore.updateInvoice(selectedInvoice.value.id, {
        line_items: processedLineItems
      })
      showLineItemsModal.value = false
      showSuccessModal.value = true
      successMessage.value = 'Line items saved successfully!'
      await loadInvoices()
      await loadStatistics()
    }
  } catch (error) {
    console.error('Error saving line items:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to save line items. Please try again.'
  }
}

const handleSaveEdit = async (formData: any) => {
  try {
    if (selectedInvoice.value) {
      await invoicesStore.updateInvoice(selectedInvoice.value.id, formData)
      showEditModal.value = false
      selectedInvoice.value = null
      showSuccessModal.value = true
      successMessage.value = 'Invoice updated successfully!'
      await loadInvoices()
      await loadStatistics()
    }
  } catch (error) {
    console.error('Error saving invoice:', error)
    showSuccessModal.value = true
    successMessage.value = 'Failed to update invoice. Please try again.'
  }
}

// Utility methods
const formatCurrency = (amount: number, currencyId: number = 1) => {
  const currency = currenciesStore.getCurrencies.find((c: any) => c.id === currencyId)
  if (!currency) return `$${amount.toFixed(2)}`
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.currency_code || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
}

// Calculate total amount from line items for an invoice
const calculateInvoiceTotalFromLineItems = (invoice: any) => {
  if (!invoice.line_items || !Array.isArray(invoice.line_items)) {
    return invoice.total_amount || 0
  }
  
  return invoice.line_items.reduce((total: number, item: any) => {
    return total + (Number(item.total_amount) || 0)
  }, 0)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const getStatusClasses = (status: string) => {
  const classes: { [key: string]: string } = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
    partial: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const isOverdue = (invoice: any) => {
  if (invoice.status === 'paid' || invoice.status === 'cancelled') {
    return false
  }
  return new Date(invoice.due_date) < new Date()
}

const getDaysOverdue = (invoice: any) => {
  const dueDate = new Date(invoice.due_date)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - dueDate.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getPaymentPercentage = (invoice: any) => {
  const totalAmount = calculateInvoiceTotalFromLineItems(invoice)
  if (!totalAmount) return 0
  return Math.round((invoice.paid_amount || 0) / totalAmount * 100)
}

// Lifecycle
onMounted(() => {
  loadInvoices()
  loadStatistics()
  loadOpportunities()
  loadCurrencies()
})

const loadCurrencies = async () => {
  try {
    await currenciesStore.fetchCurrencies()
  } catch (err) {
    console.error('Failed to load currencies:', err)
  }
}

// Watch for filter changes
watch(filters, () => {
  // Debounce filter changes
  clearTimeout((window as any).filterTimeout)
  ;(window as any).filterTimeout = setTimeout(() => {
    applyFilters()
  }, 300)
}, { deep: true })
</script>

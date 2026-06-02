<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sales Orders</h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Order Management (OMS)</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="exportCsv"
            :disabled="store.loading || filteredOrders.length === 0"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export CSV
          </button>
          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-500 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Order
          </button>
        </div>
      </div>
    </div>

    <!-- Search and Filters Card -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Orders</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage sales orders</p>
            </div>
          </div>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {{ store.pagination.total || 0 }} orders
          </span>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Orders</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="onSearchChange"
                type="text"
                placeholder="Search by order number, customer..."
                :disabled="store.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              />
              <div v-if="store.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                  @click="clearFilters"
                  type="button"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Clear search"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
                  type="button"
                  @click="() => { store.setPage(1); loadOrders(); }"
                  class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  Search Now
                </button>
              </span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sort by</label>
            <select v-model="sortField" @change="loadOrders" :disabled="store.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50">
              <option value="date_created">Date created</option>
              <option value="order_date">Order date</option>
              <option value="total_amount">Total amount</option>
              <option value="status">Status</option>
              <option value="order_number">Order number</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</label>
            <select v-model="filterStatus" @change="onFilterChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">All</option>
              <option value="draft">Draft</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_fulfillment">In fulfillment</option>
              <option value="partially_shipped">Partially shipped</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Customer</label>
            <select v-model.number="filterEntityId" @change="onFilterChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option :value="0">All</option>
              <option v-for="e in entities" :key="e.id" :value="e.id">{{ e.name }}</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="loadOrders"
              :disabled="store.loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 border border-blue-500"
            >
              <div v-if="store.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Refresh
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date from</label>
            <input v-model="filterDateFrom" type="date" @change="onFilterChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date to</label>
            <input v-model="filterDateTo" type="date" @change="onFilterChange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>
        <div v-if="hasFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span class="text-sm text-gray-600 dark:text-gray-400">Found {{ store.pagination.total || 0 }} result(s)</span>
          <button @click="clearFilters" class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          <div>
            <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2 animate-pulse"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div></th>
              <th scope="col" class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div></th>
              <th scope="col" class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div></th>
              <th scope="col" class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div></th>
              <th scope="col" class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div></th>
              <th scope="col" class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 5" :key="n" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28 animate-pulse"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div></td>
              <td class="px-6 py-4"><div class="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16 animate-pulse"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div></td>
              <td class="px-6 py-4"><div class="flex gap-2"><div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div><div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredOrders.length === 0" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="flex flex-col items-center justify-center py-16 px-6">
        <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          {{ hasFilters ? 'No orders match filters' : 'No orders yet' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
          {{ hasFilters ? 'Try adjusting your search or clear filters.' : 'Create your first sales order.' }}
        </p>
        <div class="flex gap-4">
          <button v-if="hasFilters" @click="clearFilters" class="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            Clear Filters
          </button>
          <button @click="showAddModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg border border-blue-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add Order
          </button>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Orders</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ store.pagination.total || 0 }} order(s) found</p>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-4">Order</th>
              <th scope="col" class="px-6 py-4">Customer</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Order date</th>
              <th scope="col" class="px-6 py-4">Total</th>
              <th scope="col" class="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
              <td class="px-6 py-4">
                <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ order.order_number }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">{{ order.entity?.name || '—' }}</div>
              </td>
              <td class="px-6 py-4">
                <span :class="['inline-flex items-center px-3 py-1 rounded-full text-xs font-medium', statusClass(order.status)]">{{ order.status }}</span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">{{ formatDate(order.order_date) }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ order.currency?.symbol || '' }} {{ Number(order.total_amount).toLocaleString() }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button @click="openOrderDetail(order.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    View
                  </button>
                  <button v-if="canDeleteOrder(order)" @click="openDeleteConfirm(order.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
                  </button>
                  <span v-else :title="deleteDisabledReason(order)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-not-allowed">
                    Delete
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pb-6">
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
          <select v-model.number="pageSize" @change="onPageSizeChange" :disabled="store.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          <span class="text-sm text-gray-600 dark:text-gray-400">of {{ store.pagination.total || 0 }} entries</span>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="goToPage(store.pagination.currentPage - 1)" :disabled="store.pagination.currentPage <= 1 || store.loading" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            Previous
          </button>
          <div class="flex space-x-1">
            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :disabled="store.loading" :class="['inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50', page === store.pagination.currentPage ? 'text-blue-600 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700']">
              {{ page }}
            </button>
          </div>
          <button @click="goToPage(store.pagination.currentPage + 1)" :disabled="store.pagination.currentPage >= totalPages || store.loading" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50">
            Next
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Add Order Modal -->
    <div v-if="showAddModal" class="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-4xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add New Order
            </h3>
            <button @click="showAddModal = false" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
            </button>
          </div>
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <OrderCreateForm @created="onOrderCreated">
              <template #cancel>
                <button type="button" @click="showAddModal = false" class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">Cancel</button>
              </template>
            </OrderCreateForm>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="showDetailModal && selectedOrderId" class="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-5xl max-h-full">
        <div class="relative bg-white rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 flex flex-col max-h-[90vh]">
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl shrink-0">
            <h3 class="text-xl font-semibold text-white">Order details</h3>
            <button @click="closeDetailModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
            </button>
          </div>
          <div class="p-6 overflow-y-auto flex-1">
            <OrderDetailPanel :order-id="selectedOrderId" />
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal v-model="showDeleteModal" title="Delete order" message="Delete this order? This cannot be undone." confirm-label="Delete" :danger="true" @confirm="doDeleteOrder" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSalesOrdersStore } from '../../store/sales-orders.store'
import { useAuthStore } from '../../store/auth.store'
import { useEntityStore } from '../../store/entity.store'
import { useToastStore } from '../../store/toast.store'
import ConfirmModal from '../../components/ui/ConfirmModal.vue'
import OrderCreateForm from '../../components/cs/OrderCreateForm.vue'
import OrderDetailPanel from '../../components/cs/OrderDetailPanel.vue'
import type { SalesOrder } from '../../api/models/sales-order.model'

const store = useSalesOrdersStore()
const authStore = useAuthStore()
const entityStore = useEntityStore()
const toastStore = useToastStore()

const searchQuery = ref('')
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const isSearchDebouncing = ref(false)
const filterStatus = ref('')
const filterEntityId = ref(0)
const filterDateFrom = ref('')
const filterDateTo = ref('')
const pageSize = ref(10)
const sortField = ref<'date_created' | 'order_date' | 'total_amount' | 'status' | 'order_number'>('date_created')
const showDeleteModal = ref(false)
const deleteOrderId = ref<number | null>(null)
const showAddModal = ref(false)
const showDetailModal = ref(false)
const selectedOrderId = ref<number | null>(null)

const entities = computed(() => entityStore.entities || [])
const hasFilters = computed(() => !!searchQuery.value || !!filterStatus.value || filterEntityId.value > 0 || !!filterDateFrom.value || !!filterDateTo.value)
const totalPages = computed(() => Math.max(1, Math.ceil(store.pagination.total / store.pagination.limit)))

// Orders are searched and filtered on the backend; no client-side filtering
const filteredOrders = computed(() => store.salesOrders)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = store.pagination.currentPage
  const delta = 2
  const range: number[] = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  return range
})

function formatDate(d: string | null | undefined) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString()
}
function statusClass(status: string) {
  const map: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    in_fulfillment: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    partially_shipped: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}
const onSearchChange = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
  isSearchDebouncing.value = true
  searchDebounceTimer.value = setTimeout(() => {
    store.setPage(1)
    loadOrders()
    isSearchDebouncing.value = false
  }, 3000)
}

const onFilterChange = () => {
  store.setPage(1)
  loadOrders()
}

function clearFilters() {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
    searchDebounceTimer.value = null
  }
  isSearchDebouncing.value = false
  searchQuery.value = ''
  filterStatus.value = ''
  filterEntityId.value = 0
  filterDateFrom.value = ''
  filterDateTo.value = ''
  store.setPage(1)
  loadOrders()
}
function loadOrders() {
  const sortKey = sortField.value
  const query: Record<string, unknown> = {
    $sort: { [sortKey]: -1 },
    $limit: store.pagination.limit,
    $skip: store.pagination.skip
  }
  if (authStore.user?.company_id) query.company_id = authStore.user.company_id
  if (filterStatus.value) query.status = filterStatus.value
  if (filterEntityId.value > 0) query.entity_id = filterEntityId.value
  if (filterDateFrom.value) {
    query.order_date = { ...((query.order_date as object) || {}), $gte: filterDateFrom.value }
  }
  if (filterDateTo.value) {
    query.order_date = { ...((query.order_date as object) || {}), $lte: filterDateTo.value }
  }
  if (searchQuery.value.trim()) query.search = searchQuery.value.trim()
  store.fetchSalesOrders({ query })
}
function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  store.setPage(page)
  loadOrders()
}
function onPageSizeChange() {
  store.setLimit(pageSize.value)
  store.setPage(1)
  loadOrders()
}
const LOCKED_STATUSES = ['shipped', 'delivered']
function canDeleteOrder(order: { status?: string }) {
  return !LOCKED_STATUSES.includes(order?.status || '')
}
function deleteDisabledReason(order: { status?: string }) {
  if (LOCKED_STATUSES.includes(order?.status || '')) return 'Cannot delete an order that is shipped or delivered.'
  return ''
}
function openDeleteConfirm(id: number) {
  deleteOrderId.value = id
  showDeleteModal.value = true
}
async function doDeleteOrder() {
  const id = deleteOrderId.value
  deleteOrderId.value = null
  if (!id) return
  try {
    await store.removeSalesOrder(id)
    toastStore.success('Order deleted.')
  } catch (e: any) {
    toastStore.error(e?.message || 'Failed to delete order.')
  }
}
function openOrderDetail(id: number) {
  selectedOrderId.value = id
  showDetailModal.value = true
}
function closeDetailModal() {
  showDetailModal.value = false
  selectedOrderId.value = null
}
function onOrderCreated(order: SalesOrder) {
  showAddModal.value = false
  toastStore.success('Order created.')
  loadOrders()
  selectedOrderId.value = order.id
  showDetailModal.value = true
}
function exportCsv() {
  const rows = filteredOrders.value
  if (!rows.length) return
  const headers = ['Order number', 'Customer', 'Status', 'Order date', 'Total', 'Currency']
  const lines = [headers.join(',')]
  for (const o of rows) {
    const row = [
      `"${(o.order_number || '').replace(/"/g, '""')}"`,
      `"${(o.entity?.name || '').replace(/"/g, '""')}"`,
      o.status || '',
      o.order_date || '',
      String(o.total_amount ?? ''),
      o.currency?.symbol || ''
    ]
    lines.push(row.join(','))
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toastStore.success('CSV exported.')
}

onMounted(async () => {
  await entityStore.fetchEntities()
  if (!store.pagination.limit || store.pagination.limit < 1) store.setLimit(10)
  pageSize.value = store.pagination.limit
  loadOrders()
})
</script>

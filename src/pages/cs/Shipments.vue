<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shipments Management</h1>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">Manage and track your company shipments</p>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        @click="exportCsv"
                        :disabled="shipmentStore.loading || displayedShipments.length === 0"
                        class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-200"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Export CSV
                    </button>
                    <button @click="openCreateModal" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 border border-blue-500">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Shipment
                    </button>
                </div>
            </div>
        </div>

        <!-- Search and Filters Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-visible mb-6">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter Shipments</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Find and manage your shipments</p>
                        </div>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {{ shipmentStore.pagination?.total ?? 0 }} shipments
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Shipments</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                v-model="searchQuery"
                                @input="onSearchChange"
                                type="text"
                                placeholder="Search by client, cargo, PO numbers, file number..."
                                :disabled="shipmentStore.loading"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            />
                            <div v-if="shipmentStore.loading" class="absolute inset-y-0 right-0 flex items-center pr-4">
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
                                <button type="button" @click="clearFilters" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600" title="Clear search">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
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
                                <button type="button" @click="shipmentStore.setPage(1); loadShipments()" class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800">Search Now</button>
                            </span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sort by</label>
                        <select v-model="sortField" @change="onSortOrModeChange" :disabled="shipmentStore.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50">
                            <option value="date_created">Date created</option>
                            <option value="shipment_mode">Shipment mode</option>
                            <option value="client_id">Client</option>
                            <option value="file_number">File number</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Shipment mode</label>
                        <select v-model="filterShipmentMode" @change="onSortOrModeChange" :disabled="shipmentStore.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="">All</option>
                            <option value="Air">Air</option>
                            <option value="Sea">Sea</option>
                            <option value="Road">Road</option>
                            <option value="Rail">Rail</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <button
                            @click="loadShipments"
                            :disabled="shipmentStore.loading"
                            class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 border border-blue-500"
                        >
                            <div v-if="shipmentStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Refresh
                        </button>
                    </div>
                    <div class="flex items-end">
                        <div class="w-full">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">View</label>
                            <div class="inline-flex rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden" role="group">
                                <button
                                    @click="viewMode = 'table'"
                                    :class="['px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center', viewMode === 'table' ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20']"
                                    :disabled="shipmentStore.loading"
                                    title="Table view"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    Table
                                </button>
                                <button
                                    @click="viewMode = 'grid'"
                                    :class="['px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center', viewMode === 'grid' ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20']"
                                    :disabled="shipmentStore.loading"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg>
                                    Grid
                                </button>
                                <button
                                    @click="viewMode = 'list'"
                                    :class="['px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center', viewMode === 'list' ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' : 'text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20']"
                                    :disabled="shipmentStore.loading"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                    List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="hasFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Found {{ shipmentStore.pagination?.total ?? 0 }} result(s)</span>
                    <button @click="clearFilters" class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>

        <!-- Error message -->
        <div v-if="shipmentStore.error" class="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-between">
            <p class="text-red-700 dark:text-red-300 text-sm">{{ shipmentStore.error }}</p>
            <button @click="shipmentStore.clearError(); loadShipments()" class="text-red-600 dark:text-red-400 hover:underline text-sm font-medium">Dismiss</button>
        </div>

        <!-- Loading State with Skeleton Loaders -->
        <div v-if="shipmentStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    </div>
                    <div class="flex space-x-2">
                        <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <div class="flex-1 h-9 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    <div class="flex-1 h-9 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Shipments Display -->
        <div v-else>
            <!-- Empty State -->
            <div v-if="displayedShipments.length === 0" class="flex flex-col items-center justify-center py-20">
                <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {{ hasFilters ? 'No shipments match filters' : 'No shipments yet' }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
                    {{ hasFilters ? 'Try adjusting your search or filters, or clear filters.' : 'Get started by adding your first shipment.' }}
                </p>
                <div class="flex space-x-4">
                    <button
                        v-if="hasFilters"
                        @click="clearFilters"
                        class="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        Clear Filters
                    </button>
                    <button @click="openCreateModal" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Add Shipment
                    </button>
                </div>
            </div>

            <!-- Table View -->
            <div v-else-if="viewMode === 'table'" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-400">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Shipments</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ shipmentStore.pagination?.total ?? 0 }} shipment(s) found</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-4">Client</th>
                                <th scope="col" class="px-6 py-4">Mode</th>
                                <th scope="col" class="px-6 py-4">Cargo</th>
                                <th scope="col" class="px-6 py-4">File number</th>
                                <th scope="col" class="px-6 py-4">Created</th>
                                <th scope="col" class="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="shipment in displayedShipments" :key="shipment.id" class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                                <td class="px-6 py-4">
                                    <div class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ shipment.client?.name || '—' }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">{{ shipment.shipment_mode }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white max-w-xs truncate">{{ getCargoDisplay(shipment) }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ shipment.file_number || '—' }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ formatDate(shipment.date_created) }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <button @click="editShipment(shipment)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            Edit
                                        </button>
                                        <button @click="openDeleteConfirm(shipment.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Grid View -->
            <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="shipment in displayedShipments" :key="shipment.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ shipment.client?.name || 'Client' }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ shipment.shipment_mode }} • {{ shipment.category || 'N/A' }}</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="editShipment(shipment)" class="p-1 text-blue-600 hover:text-blue-800 rounded" title="Edit">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button @click="openDeleteConfirm(shipment.id)" class="p-1 text-red-600 hover:text-red-800 rounded" title="Delete">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Cargo:</span>
                            <span class="text-gray-900 dark:text-white ml-2">{{ getCargoDisplay(shipment) }}</span>
                        </div>
                        <div class="text-sm">
                            <span class="text-gray-500 dark:text-gray-400">PO Numbers:</span>
                            <span class="text-gray-900 dark:text-white ml-2">{{ shipment.po_numbers || 'N/A' }}</span>
                        </div>
                        <div class="text-sm">
                            <span class="text-gray-500 dark:text-gray-400">File Number:</span>
                            <span class="text-gray-900 dark:text-white ml-2">{{ shipment.file_number || 'N/A' }}</span>
                        </div>
                        <div class="text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Created:</span>
                            <span class="text-gray-900 dark:text-white ml-2">{{ formatDate(shipment.date_created) }}</span>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button @click="editShipment(shipment)" class="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
                <div v-for="shipment in displayedShipments" :key="shipment.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ shipment.client?.name || 'Client' }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ shipment.shipment_mode }} • {{ shipment.category || 'N/A' }}</p>
                                <div class="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Cargo: {{ getCargoDisplay(shipment) }}</span>
                                    <span>File: {{ shipment.file_number || 'N/A' }}</span>
                                    <span>Created: {{ formatDate(shipment.date_created) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="editShipment(shipment)" class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                Edit
                            </button>
                            <button @click="openDeleteConfirm(shipment.id)" class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
                <div class="flex items-center space-x-4">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
                    <select v-model.number="pageSize" @change="onPageSizeChange" :disabled="shipmentStore.loading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50">
                        <option :value="10">10</option>
                        <option :value="25">25</option>
                        <option :value="50">50</option>
                    </select>
                    <span class="text-sm text-gray-600 dark:text-gray-400">of {{ shipmentStore.pagination?.total ?? 0 }} entries</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button @click="goToPage((shipmentStore.pagination?.currentPage ?? 1) - 1)" :disabled="(shipmentStore.pagination?.currentPage ?? 1) <= 1 || shipmentStore.loading" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                        Previous
                    </button>
                    <div class="flex space-x-1">
                        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :disabled="shipmentStore.loading" :class="['inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50', page === (shipmentStore.pagination?.currentPage ?? 1) ? 'text-blue-600 bg-blue-50 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700']">
                            {{ page }}
                        </button>
                    </div>
                    <button @click="goToPage((shipmentStore.pagination?.currentPage ?? 1) + 1)" :disabled="(shipmentStore.pagination?.currentPage ?? 1) >= totalPages || shipmentStore.loading" class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50">
                        Next
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Create / Edit Shipment Modal -->
        <div v-if="showCreateModal || showEditModal" class="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
            <div class="relative w-full max-w-4xl max-h-full">
                <div class="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
                        <h3 class="text-xl font-semibold text-white flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            {{ editingShipment ? 'Edit Shipment' : 'Add Shipment' }}
                        </h3>
                        <button @click="closeModal" class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                        </button>
                    </div>
                    <form @submit.prevent="saveShipment" class="p-6 max-h-[75vh] overflow-y-auto space-y-6">
                        <div v-if="shipmentStore.error" class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm border border-red-200 dark:border-red-800">{{ shipmentStore.error }}</div>

                        <!-- 1. Parties & assignment -->
                        <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Parties & assignment</h4>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Client, supplier, and shipment status</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client <span class="text-red-500">*</span></label>
                                    <select v-model.number="shipmentForm.client_id" required class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="0">Select client</option>
                                        <option v-for="e in entities" :key="e.id" :value="e.id">{{ e.name }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier</label>
                                    <select v-model.number="shipmentForm.supplier_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="undefined">Select</option>
                                        <option v-for="e in entities" :key="e.id" :value="e.id">{{ e.name }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <select v-model.number="shipmentForm.status_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="undefined">Select</option>
                                        <option v-for="s in statuses" :key="s.id" :value="s.id">{{ s.status }}</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <!-- 2. Shipment classification -->
                        <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Shipment classification</h4>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Mode, category, and type</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipment mode</label>
                                    <select v-model="shipmentForm.shipment_mode" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="">Select</option>
                                        <option value="Air">Air</option>
                                        <option value="Sea">Sea</option>
                                        <option value="Road">Road</option>
                                        <option value="Rail">Rail</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <select v-model="shipmentForm.category" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="">Select</option>
                                        <option value="Onshore">Onshore</option>
                                        <option value="Offshore">Offshore</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipment type</label>
                                    <select v-model.number="shipmentForm.shipment_type_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="undefined">Select</option>
                                        <option v-for="st in shipmentTypes" :key="st.id" :value="st.id">{{ st.type }}</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <!-- 3. Packaging -->
                        <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Packaging</h4>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Select package type first, then unit and size</p>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <!-- Step 1: Package type (full width) -->
                                <div>
                                    <PackageTypeSearchInput
                                      v-model="shipmentForm.package_type_id"
                                      :display-value="editingShipment?.package_type?.type ?? ''"
                                      label="Package type"
                                      placeholder="Search or select package type..."
                                      input-id="shipment-package-type"
                                      allow-clear
                                    />
                                </div>
                                <!-- Step 2: Unit & size (dependent on type) -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Package unit</label>
                                        <select v-model.number="shipmentForm.package_unit_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :disabled="!shipmentForm.package_type_id">
                                            <option :value="undefined">{{ shipmentForm.package_type_id ? 'Select unit' : 'Select package type first' }}</option>
                                            <option v-for="pu in packageUnitsForSelectedType" :key="pu.id" :value="pu.id">{{ pu.unit }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Package size</label>
                                        <select v-model.number="shipmentForm.package_size_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" :disabled="!shipmentForm.package_type_id">
                                            <option :value="undefined">{{ shipmentForm.package_type_id ? 'Select size' : 'Select package type first' }}</option>
                                            <option v-for="ps in packageSizesForSelectedType" :key="ps.id" :value="ps.id">{{ ps.size }}</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- Step 3: Quantity & weight -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 border-t border-gray-200 dark:border-gray-600">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                                        <input v-model.number="shipmentForm.package_quantity" type="number" min="0" step="1" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Number of units" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight</label>
                                        <input v-model.number="shipmentForm.weight" type="number" min="0" step="0.01" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Total weight" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- 4. Origin & destination -->
                        <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Origin & destination</h4>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Country of origin, delivery location and date</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country of origin</label>
                                    <select v-model.number="shipmentForm.country_of_origin" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="undefined">Select</option>
                                        <option v-for="c in countries" :key="c.id" :value="c.id">{{ c.name }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery location</label>
                                    <select v-model.number="shipmentForm.delivery_location_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="undefined">Select</option>
                                        <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery date</label>
                                    <input v-model="shipmentForm.delivery_date" type="date" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                            </div>
                        </section>

                        <!-- 5. Cargo -->
                        <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Cargo</h4>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Commodity and description</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commodity</label>
                                    <select v-model.number="shipmentForm.commodity_id" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="undefined">Select</option>
                                        <option v-for="c in commodities" :key="c.id" :value="c.id">{{ c.name }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo description</label>
                                    <textarea v-model="shipmentForm.cargo_description" rows="3" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Describe the cargo..."></textarea>
                                </div>
                            </div>
                        </section>

                        <!-- 6. Documentation & references -->
                        <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Documentation & references</h4>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">PO numbers, invoices, vessel/flight, MBL/HBL</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PO numbers</label>
                                    <input v-model="shipmentForm.po_numbers" type="text" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g. PO-001, PO-002" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Agent invoice number</label>
                                    <input v-model="shipmentForm.agent_invoice_number" type="text" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vessel / flight name</label>
                                    <input v-model="shipmentForm.vessel_flight_name" type="text" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Vessel or flight identifier" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MBL</label>
                                    <input v-model="shipmentForm.mbl" type="text" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Master bill of lading" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HBL</label>
                                    <input v-model="shipmentForm.hbl" type="text" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="House bill of lading" />
                                </div>
                            </div>
                        </section>
                        <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button type="button" @click="closeModal" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                            <button type="submit" :disabled="saving" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 inline-flex items-center">
                                <span v-if="saving" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                                {{ editingShipment ? 'Update' : 'Create' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <ConfirmModal v-model="showDeleteModal" title="Delete shipment" message="Delete this shipment? This cannot be undone." confirm-label="Delete" :danger="true" @confirm="doDeleteShipment" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useShipmentStore } from '../../store/shipment.store'
import { useAuthStore } from '../../store/auth.store'
import { useToastStore } from '../../store/toast.store'
import { useEntityStore } from '../../store/entity.store'
import { useShipmentTypeStore } from '../../store/shipment-type.store'
import { usePackageTypeStore } from '../../store/package-type.store'
import { usePackageUnitStore } from '../../store/package-unit.store'
import { usePackageSizeStore } from '../../store/package-size.store'
import { useLocationsStore } from '../../store/locations.store'
import { useCommodityStore } from '../../store/commodity.store'
import { useStatusStore } from '../../store/status.store'
import { countryService } from '../../api/services/country.service'
import { packageUnitControllers } from '../../api/controllers/package-unit.controllers'
import { packageSizeControllers } from '../../api/controllers/package-size.controllers'
import ConfirmModal from '../../components/ui/ConfirmModal.vue'
import PackageTypeSearchInput from '../../components/ui/PackageTypeSearchInput.vue'
import type { Shipment } from '../../api/models/shipment.model'
import type { Country } from '../../api/models/country.model'
import type { PackageUnit } from '../../api/models/package-unit.model'
import type { PackageSize } from '../../api/models/package-size.model'

const shipmentStore = useShipmentStore()
const authStore = useAuthStore()
const toastStore = useToastStore()
const entityStore = useEntityStore()
const shipmentTypeStore = useShipmentTypeStore()
const packageTypeStore = usePackageTypeStore()
const packageUnitStore = usePackageUnitStore()
const packageSizeStore = usePackageSizeStore()
const locationsStore = useLocationsStore()
const commodityStore = useCommodityStore()
const statusStore = useStatusStore()

const searchQuery = ref('')
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const isSearchDebouncing = ref(false)
const sortField = ref<'date_created' | 'shipment_mode' | 'client_id' | 'file_number'>('date_created')
const filterShipmentMode = ref('')
const viewMode = ref<'table' | 'grid' | 'list'>('table')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingShipment = ref<Shipment | null>(null)
const showDeleteModal = ref(false)
const deleteShipmentId = ref<number | null>(null)
const saving = ref(false)
const pageSize = ref(10)
const countries = ref<Country[]>([])

const shipmentForm = ref({
    client_id: 0,
    shipment_type_id: undefined as number | undefined,
    package_type_id: undefined as number | undefined,
    package_unit_id: undefined as number | undefined,
    package_size_id: undefined as number | undefined,
    package_quantity: undefined as number | undefined,
    weight: undefined as number | undefined,
    supplier_id: undefined as number | undefined,
    delivery_location_id: undefined as number | undefined,
    delivery_date: '',
    shipment_mode: '' as 'Air' | 'Sea' | 'Road' | 'Rail' | 'Other',
    category: '' as 'Onshore' | 'Offshore' | 'Other',
    country_of_origin: undefined as number | undefined,
    commodity_id: undefined as number | undefined,
    cargo_description: '',
    po_numbers: '',
    agent_invoice_number: '',
    vessel_flight_name: '',
    mbl: '',
    hbl: '',
    status_id: undefined as number | undefined
})

const entities = computed(() => entityStore.entities || [])
const shipmentTypes = computed(() => shipmentTypeStore.shipmentTypes || [])
const packageTypes = computed(() => packageTypeStore.packageTypes || [])
const packageUnits = computed(() => packageUnitStore.packageUnits || [])
const packageSizes = computed(() => packageSizeStore.packageSizes || [])

// Loaded when a package type is selected (API fetch by package_type_id so both dropdowns get related data)
const shipmentPackageUnits = ref<PackageUnit[]>([])
const shipmentPackageSizes = ref<PackageSize[]>([])

const packageUnitsForSelectedType = computed(() => {
  const typeId = shipmentForm.value.package_type_id
  if (typeId == null || typeId === 0) return []
  return shipmentPackageUnits.value
})
const packageSizesForSelectedType = computed(() => {
  const typeId = shipmentForm.value.package_type_id
  if (typeId == null || typeId === 0) return []
  return shipmentPackageSizes.value
})

// When package type changes: clear unit/size, and load related package units and package sizes from API
watch(
  () => shipmentForm.value.package_type_id,
  async (newVal, oldVal) => {
    if (oldVal != null && newVal != null && oldVal !== newVal) {
      shipmentForm.value.package_unit_id = undefined
      shipmentForm.value.package_size_id = undefined
    }
    const typeId = newVal != null && newVal !== 0 ? newVal : null
    if (!typeId) {
      shipmentPackageUnits.value = []
      shipmentPackageSizes.value = []
      return
    }
    try {
      const [unitsRes, sizesRes] = await Promise.all([
        packageUnitControllers.getPackageUnits({ query: { package_type_id: typeId, $limit: 200 } }),
        packageSizeControllers.getPackageSizes({ query: { package_type_id: typeId, $limit: 200 } })
      ])
      shipmentPackageUnits.value = Array.isArray(unitsRes) ? unitsRes : (unitsRes as { data?: PackageUnit[] })?.data ?? []
      shipmentPackageSizes.value = Array.isArray(sizesRes) ? sizesRes : (sizesRes as { data?: PackageSize[] })?.data ?? []
    } catch (e) {
      console.warn('Failed to load package units/sizes for type:', e)
      shipmentPackageUnits.value = []
      shipmentPackageSizes.value = []
    }
  }
)
const locations = computed(() => locationsStore.locations || [])
const commodities = computed(() => commodityStore.commodities || [])
const statuses = computed(() => statusStore.statuses || [])

/** Display text for Cargo: commodity name when selected, else cargo_description */
function getCargoDisplay(shipment: { commodity?: { name: string }; commodity_id?: number; cargo_description?: string }) {
  if (shipment.commodity?.name) return shipment.commodity.name
  if (shipment.commodity_id) {
    const comm = commodities.value.find((c: { id: number }) => c.id === shipment.commodity_id)
    if (comm?.name) return comm.name
  }
  return shipment.cargo_description || '—'
}

const displayedShipments = computed(() => shipmentStore.shipments)
const hasFilters = computed(() => !!searchQuery.value.trim() || !!filterShipmentMode.value)

const totalPages = computed(() => Math.max(1, Math.ceil((shipmentStore.pagination?.total ?? 0) / (shipmentStore.pagination?.limit ?? 10))))
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = shipmentStore.pagination?.currentPage ?? 1
  const delta = 2
  const range: number[] = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  return range
})

const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
}

function loadShipments() {
    const query: Record<string, unknown> = {}
    if (authStore.user?.company_id) {
        query.company_id = authStore.user.company_id
    }
    const limit = shipmentStore.pagination?.limit ?? 10
    const skip = shipmentStore.pagination?.skip ?? 0
    const sortKey = sortField.value
    query.$limit = limit
    query.$skip = skip
    query.$sort = { [sortKey]: sortKey === 'date_created' ? -1 : 1 }
    const searchTerm = searchQuery.value?.trim()
    if (searchTerm) {
        query.$or = [
            { cargo_description: { $like: `%${searchTerm}%` } },
            { po_numbers: { $like: `%${searchTerm}%` } },
            { file_number: { $like: `%${searchTerm}%` } },
            { agent_invoice_number: { $like: `%${searchTerm}%` } },
            { vessel_flight_name: { $like: `%${searchTerm}%` } },
            { mbl: { $like: `%${searchTerm}%` } },
            { hbl: { $like: `%${searchTerm}%` } }
        ] as any
    }
    if (filterShipmentMode.value) {
        query.shipment_mode = filterShipmentMode.value
    }
    shipmentStore.fetchShipments({ query }).catch((err) => {
        console.error('Failed to load shipments:', err)
        toastStore.error('Failed to load shipments')
    })
}

const onSearchChange = () => {
    if (searchDebounceTimer.value) clearTimeout(searchDebounceTimer.value)
    isSearchDebouncing.value = true
    searchDebounceTimer.value = setTimeout(() => {
        isSearchDebouncing.value = false
        shipmentStore.setPage(1)
        loadShipments()
    }, 400)
}

function clearFilters() {
    if (searchDebounceTimer.value) {
        clearTimeout(searchDebounceTimer.value)
        searchDebounceTimer.value = null
    }
    isSearchDebouncing.value = false
    searchQuery.value = ''
    filterShipmentMode.value = ''
    shipmentStore.setPage(1)
    loadShipments()
}

function onSortOrModeChange() {
    shipmentStore.setPage(1)
    loadShipments()
}

function exportCsv() {
    const rows = displayedShipments.value
    if (!rows.length) return
    const headers = ['Client', 'Mode', 'Cargo', 'File number', 'PO numbers', 'Created']
    const lines = [headers.join(',')]
    for (const s of rows) {
        const row = [
            `"${(s.client?.name || '').replace(/"/g, '""')}"`,
            s.shipment_mode || '',
            `"${(getCargoDisplay(s) || '').replace(/"/g, '""')}"`,
            s.file_number || '',
            `"${(s.po_numbers || '').replace(/"/g, '""')}"`,
            s.date_created || ''
        ]
        lines.push(row.join(','))
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `shipments-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
}

const editShipment = (shipment: Shipment) => {
    editingShipment.value = shipment
    
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
    
    shipmentForm.value = {
        client_id: shipment.client_id,
        shipment_type_id: shipment.shipment_type_id,
        package_type_id: shipment.package_type_id,
        package_unit_id: shipment.package_unit_id,
        package_size_id: shipment.package_size_id,
        package_quantity: shipment.package_quantity,
        weight: shipment.weight,
        supplier_id: shipment.supplier_id,
        delivery_location_id: shipment.delivery_location_id,
        delivery_date: formatDateForInput(shipment.delivery_date),
        shipment_mode: shipment.shipment_mode,
        category: shipment.category || '' as 'Onshore' | 'Offshore' | 'Other',
        country_of_origin: shipment.country_of_origin,
        commodity_id: shipment.commodity_id,
        cargo_description: shipment.cargo_description || '',
        po_numbers: shipment.po_numbers || '',
        agent_invoice_number: shipment.agent_invoice_number || '',
        vessel_flight_name: shipment.vessel_flight_name || '',
        mbl: shipment.mbl || '',
        hbl: shipment.hbl || '',
        status_id: shipment.status_id
    }
    
    showEditModal.value = true
}

const saveShipment = async () => {
    if (shipmentForm.value.client_id === 0) {
        toastStore.error('Please select a client')
        return
    }
    saving.value = true
    shipmentStore.clearError()
    try {
        const formatDateField = (dateString: string): string | undefined => {
            if (!dateString || typeof dateString !== 'string' || !dateString.trim()) return undefined
            const dateOnly = new Date(dateString).toISOString().split('T')[0]
            return dateOnly
        }
        const deliveryDate = formatDateField(shipmentForm.value.delivery_date)
        const shipmentData: Record<string, unknown> = {
            ...shipmentForm.value,
            client_id: shipmentForm.value.client_id
        }
        if (deliveryDate !== undefined) {
            shipmentData.delivery_date = deliveryDate
        } else {
            delete shipmentData.delivery_date
        }
        if (showEditModal.value && editingShipment.value) {
            await shipmentStore.updateShipment(editingShipment.value.id, shipmentData)
            toastStore.success('Shipment updated')
        } else {
            const createData = {
                ...shipmentData,
                company_id: authStore.user?.company_id!,
                user_id: authStore.user?.id!
            }
            await shipmentStore.createShipment(createData)
            toastStore.success('Shipment created')
        }
        closeModal()
        await loadShipments()
    } catch (error: any) {
        console.error('Failed to save shipment:', error)
        toastStore.error(error?.message || 'Failed to save shipment')
    } finally {
        saving.value = false
    }
}

const openDeleteConfirm = (id: number) => {
    deleteShipmentId.value = id
    showDeleteModal.value = true
}

const doDeleteShipment = async () => {
    const id = deleteShipmentId.value
    if (id == null) return
    try {
        await shipmentStore.deleteShipment(id)
        toastStore.success('Shipment deleted')
        await loadShipments()
    } catch (error: any) {
        toastStore.error(error?.message || 'Failed to delete shipment')
    } finally {
        deleteShipmentId.value = null
    }
}

function goToPage(page: number) {
    if (page < 1 || page > totalPages.value) return
    shipmentStore.setPage(page)
    loadShipments()
}

function onPageSizeChange() {
    shipmentStore.setLimit(pageSize.value)
    loadShipments()
}

const resetForm = () => {
    editingShipment.value = null
    shipmentForm.value = {
        client_id: 0,
        shipment_type_id: undefined,
        package_type_id: undefined,
        package_unit_id: undefined,
        package_size_id: undefined,
        package_quantity: undefined,
        weight: undefined,
        supplier_id: undefined,
        delivery_location_id: undefined,
        delivery_date: '',
        shipment_mode: '' as 'Air' | 'Sea' | 'Road' | 'Rail' | 'Other',
        category: '' as 'Onshore' | 'Offshore' | 'Other',
        country_of_origin: undefined,
        commodity_id: undefined,
        cargo_description: '',
        po_numbers: '',
        agent_invoice_number: '',
        vessel_flight_name: '',
        mbl: '',
        hbl: '',
        status_id: undefined
    }
}

const closeModal = () => {
    showCreateModal.value = false
    showEditModal.value = false
    resetForm()
    shipmentStore.clearError()
}

const openCreateModal = () => {
    resetForm()
    showCreateModal.value = true
}

async function loadLookupData() {
    const companyId = authStore.user?.company_id
    const query = companyId ? { query: { company_id: companyId, $limit: 500 } } : { query: { $limit: 500 } }
    try {
        await Promise.all([
            entityStore.fetchEntities(query),
            shipmentTypeStore.fetchShipmentTypes(),
            packageTypeStore.fetchPackageTypes(),
            packageUnitStore.fetchPackageUnits(),
            packageSizeStore.fetchPackageSizes(),
            locationsStore.fetchLocations(),
            commodityStore.fetchCommodities(),
            statusStore.fetchStatuses()
        ])
    } catch (e) {
        console.warn('Some lookup data failed to load:', e)
    }
    try {
        const res = await countryService.find() as any
        countries.value = Array.isArray(res) ? res : (res?.data || [])
    } catch {
        countries.value = []
    }
}

onMounted(async () => {
    if (!shipmentStore.pagination?.limit || shipmentStore.pagination.limit < 1) {
        shipmentStore.setLimit(10)
    }
    pageSize.value = shipmentStore.pagination?.limit ?? 10
    await loadLookupData()
    loadShipments()
})
</script> 
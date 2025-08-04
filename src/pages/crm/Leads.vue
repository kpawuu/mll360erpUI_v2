<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Leads
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Manage and track potential customers
          </p>
        </div>
        <button
          @click="slidePanelOpen = true"
          class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Lead
        </button>
      </div>
    </div>

    <!-- Search and Filters Card -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6"
    >
      <!-- Card Header -->
      <div
        class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Search & Filter Leads
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Find and manage potential customers
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >
              {{ entityStore.pagination.total || 0 }} leads
            </span>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >Search Leads</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="onSearchChange"
                type="text"
                placeholder="Search by name, email, or phone..."
                :disabled="entityStore.loading"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              />
              <div
                v-if="entityStore.loading"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <div
                  class="animate-spin rounded-full h-5 w-5 border-2 border-violet-600 border-t-transparent"
                ></div>
              </div>
              <div
                v-else-if="isSearching && searchQuery"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <div class="flex items-center space-x-2">
                  <div
                    class="animate-pulse text-xs text-gray-500 dark:text-gray-400"
                  >
                    Searching...
                  </div>
                  <div
                    class="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"
                  ></div>
                </div>
              </div>
              <div
                v-else-if="searchQuery"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <button
                  @click="clearFilters"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Clear search"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              v-if="searchQuery"
              class="mt-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <span v-if="isSearching"
                >Searching for: "{{ searchQuery }}" (debounced)</span
              >
              <span v-else>Searching for: "{{ searchQuery }}"</span>
            </div>
          </div>

          <!-- Date Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >Date Range</label
            >
            <select
              v-model="dateFilter"
              @change="onDateFilterChange"
              :disabled="entityStore.loading"
                                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pr-8 pl-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <!-- Refresh Button -->
          <div class="flex items-end">
            <button
              @click="loadLeads"
              :disabled="entityStore.loading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div
                v-if="entityStore.loading"
                class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"
              ></div>
              <svg
                v-else
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Refresh
            </button>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-end justify-end">
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                >Quick Actions</label
              >
              <button
                @click="slidePanelOpen = true"
                class="w-full text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                New Lead
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          v-if="searchQuery || dateFilter"
          class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Found {{ entityStore.pagination.total || 0 }} result{{
                  (entityStore.pagination.total || 0) !== 1 ? "s" : ""
                }}
              </span>
              <button
                @click="clearFilters"
                class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Clear Filters
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500 dark:text-gray-400"
                >Search powered by</span
              >
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State with Table Skeleton Loaders -->
    <div
      v-if="entityStore.loading"
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg"
    >
      <!-- Table Header Skeleton -->
      <div
        class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"
            ></div>
            <div>
              <div
                class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"
              ></div>
              <div
                class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"
              ></div>
            </div>
          </div>
          <div
            class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"
          ></div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <!-- Table Header Skeleton -->
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"
                  ></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"
                  ></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"
                  ></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"
                  ></div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 animate-pulse"
                  ></div>
                  <div
                    class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"
                  ></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Table Row Skeletons -->
            <tr
              v-for="n in 5"
              :key="n"
              class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <!-- Lead Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 animate-pulse"
                  ></div>
                  <div class="flex-1">
                    <div
                      class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2 animate-pulse"
                    ></div>
                    <div
                      class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"
                    ></div>
                  </div>
                </div>
              </td>

              <!-- Contact Info Column Skeleton -->
              <td class="px-6 py-4">
                <div class="space-y-2">
                  <div
                    class="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                  ></div>
                  <div
                    class="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                  ></div>
                </div>
              </td>

              <!-- Address Column Skeleton -->
              <td class="px-6 py-4">
                <div
                  class="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                ></div>
              </td>

              <!-- Created Date Column Skeleton -->
              <td class="px-6 py-4">
                <div class="space-y-1">
                  <div
                    class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"
                  ></div>
                  <div
                    class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"
                  ></div>
                </div>
              </td>

              <!-- Actions Column Skeleton -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <div
                    class="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"
                  ></div>
                  <div
                    class="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"
                  ></div>
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
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mr-3"
            >
              <svg
                class="w-4 h-4 text-violet-600 dark:text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Leads
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ entityStore.pagination.total }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3"
            >
              <svg
                class="w-4 h-4 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                New This Week
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ newLeadsCount }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3"
            >
              <svg
                class="w-4 h-4 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Contacted
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ contactedLeadsCount }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3"
            >
              <svg
                class="w-4 h-4 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Conversion Rate
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ conversionRate }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Leads Display -->
      <div>
        <!-- Enhanced Empty State -->
        <div
          v-if="
            !entityStore.loading &&
            (!entityStore.entities || entityStore.entities.length === 0)
          "
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg"
        >
          <div class="flex flex-col items-center justify-center py-16 px-6">
            <div class="relative">
              <div
                class="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  class="w-12 h-12 text-violet-500 dark:text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-yellow-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <h3
              class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center"
            >
              {{
                searchQuery || dateFilter ? "No leads found" : "No leads yet"
              }}
            </h3>
            <p
              class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg leading-relaxed"
            >
              {{
                searchQuery || dateFilter
                  ? "Try adjusting your search criteria or clear the filters to see more results."
                  : "Get started by adding leads to your CRM to track potential customers effectively."
              }}
            </p>
            <div
              class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <button
                v-if="searchQuery || dateFilter"
                @click="clearFilters"
                class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Clear Filters
              </button>
              <button
                @click="slidePanelOpen = true"
                class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Lead
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Table View -->
        <div
          v-else-if="entityStore.entities && entityStore.entities.length > 0"
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg"
        >
          <!-- Table Header with Summary -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Leads
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ entityStore.pagination.total || 0 }} lead{{
                      (entityStore.pagination.total || 0) !== 1 ? "s" : ""
                    }}
                    found
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                >
                  <svg
                    class="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-2 text-violet-600 dark:text-violet-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                      Lead
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-2 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Contact Info
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      Address
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Created Date
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-4">
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                        ></path>
                      </svg>
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lead in entityStore.entities"
                  :key="lead.id"
                  class="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                >
                  <!-- Lead Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg"
                      >
                        <span class="text-white font-semibold text-sm">{{
                          getInitials(lead.name)
                        }}</span>
                      </div>
                      <div class="flex-1">
                        <div
                          class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors"
                        >
                          {{ lead.name }}
                        </div>
                        <div
                          class="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                        >
                          <svg
                            class="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 000 2h6a1 1 0 100-2H7z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Lead ID: {{ lead.id }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Contact Info Column -->
                  <td class="px-6 py-4">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2 text-sm">
                        <svg
                          class="w-3 h-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span class="text-gray-900 dark:text-white">{{
                          lead.email || "No email"
                        }}</span>
                      </div>
                      <div class="flex items-center space-x-2 text-sm">
                        <svg
                          class="w-3 h-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        <span class="text-gray-900 dark:text-white">{{
                          lead.phonenumber || "No phone"
                        }}</span>
                      </div>
                    </div>
                  </td>

                  <!-- Address Column -->
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 dark:text-white">
                      {{ lead.address || "No address" }}
                    </div>
                  </td>

                  <!-- Created Date Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="text-sm text-gray-900 dark:text-white">
                        <div class="font-medium">
                          {{ formatDate(lead.date_created) }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                          {{ formatTime(lead.date_created) }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Actions Column -->
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="openActivitiesModal(lead)"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-800 transition-all duration-200 shadow-sm"
                      >
                        <svg
                          class="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                        Activities
                      </button>
                      <button
                        @click="openContactPersonModal(lead)"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 hover:border-green-300 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-800 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800 transition-all duration-200 shadow-sm"
                      >
                        <svg
                          class="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                        Contacts
                      </button>
                      <button
                        @click="editLead(lead)"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-violet-700 bg-violet-100 border border-violet-200 rounded-lg hover:bg-violet-200 hover:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-800 dark:bg-violet-900 dark:text-violet-300 dark:border-violet-700 dark:hover:bg-violet-800 transition-all duration-200 shadow-sm"
                      >
                        <svg
                          class="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination Controls -->
          <div class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
              <select 
                v-model="entityStore.pagination.limit" 
                @change="onLimitChange"
                :disabled="entityStore.loading"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 pl-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                of {{ entityStore.pagination.total }} entries
              </span>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="previousPage" 
                :disabled="entityStore.pagination.currentPage <= 1 || entityStore.loading"
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
                  :disabled="entityStore.loading"
                  :class="[
                    'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
                    page === entityStore.pagination.currentPage
                      ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="nextPage" 
                :disabled="entityStore.pagination.currentPage >= totalPages || entityStore.loading"
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
    </div>
  </div>

  <!-- Add/Edit Lead Modal -->
  <div
    v-if="slidePanelOpen"
    class="fixed top-0 left-0 right-0 z-60 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <div
        class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl"
        >
          <h3 class="text-xl font-semibold text-white flex items-center">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            {{ editMode ? "Edit Lead" : "Add Lead" }}
          </h3>
          <button
            @click="closeSlidePanel"
            class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 14 14"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form @submit.prevent="saveLead">
            <!-- Lead Information Section -->
            <div class="space-y-6">
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Lead Details
                </h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Enter the lead information and contact details.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Lead Name -->
                <div>
                  <label
                    for="lead-name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Lead Name *</label
                  >
                  <input
                    id="lead-name"
                    v-model="leadForm.name"
                    type="text"
                    required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="lead-email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Email</label
                  >
                  <input
                    id="lead-email"
                    v-model="leadForm.email"
                    type="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="e.g. john@example.com"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Phone Number -->
                <div>
                  <label
                    for="lead-phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Phone Number</label
                  >
                  <input
                    id="lead-phone"
                    v-model="leadForm.phonenumber"
                    type="tel"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="e.g. +1234567890"
                  />
                </div>

                <!-- Address -->
                <div>
                  <label
                    for="lead-address"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Address</label
                  >
                  <input
                    id="lead-address"
                    v-model="leadForm.address"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="e.g. 123 Main St, City, State"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Username (optional) -->
                <div>
                  <label
                    for="lead-username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Username (Optional)</label
                  >
                  <input
                    id="lead-username"
                    v-model="leadForm.username"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="e.g. johndoe"
                  />
                </div>

                <!-- Password (optional) -->
                <div>
                  <label
                    for="lead-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Password (Optional)</label
                  >
                  <input
                    id="lead-password"
                    v-model="leadForm.password"
                    type="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div
                class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
              >
                <div class="flex items-start">
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h4
                      class="text-sm font-medium text-blue-800 dark:text-blue-200"
                    >
                      Contact Persons
                    </h4>
                    <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      You can add contact persons to this lead after creating
                      it. Use the "Contacts" button in the actions column to
                      manage contact persons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3"
        >
          <button
            @click="closeSlidePanel"
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveLead"
            :disabled="entityStore.loading"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div
              v-if="entityStore.loading"
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></div>
            {{ editMode ? "Update Lead" : "Add Lead" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Activities Modal -->
  <div
    v-if="activitiesModalOpen"
    class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80"
  >
    <div class="relative w-full max-w-[95vw] max-h-full">
      <div
        class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white">
                {{
                  editingActivity
                    ? "Edit Activity"
                    : "Lead Activities Management"
                }}
              </h3>
              <p class="text-sm text-blue-100">
                Manage and track activities for this lead
              </p>
            </div>
          </div>
          <button
            @click="closeActivitiesModal"
            class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 14 14"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-8">
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <!-- Left: Add New Activity Form -->
            <div class="xl:col-span-1 space-y-6">
              <div
                class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
              >
                <div class="flex items-center space-x-3 mb-6">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </div>
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {{ editingActivity ? "Edit Activity" : "Add New Activity" }}
                  </h4>
                </div>

                <form @submit.prevent="saveActivity" class="space-y-5">
                  <!-- Activity Type -->
                  <div>
                    <label
                      for="activity-type"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Activity Type *</label
                    >
                    <select
                      id="activity-type"
                      v-model="activityForm.type"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                      required
                    >
                      <option value="call">📞 Call</option>
                      <option value="email">📧 Email</option>
                      <option value="online_meeting">💻 Online Meeting</option>
                      <option value="physical_visit">🏢 Physical Visit</option>
                      <option value="other">📋 Other</option>
                    </select>
                  </div>

                  <!-- Subject -->
                  <div>
                    <label
                      for="activity-subject"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Subject *</label
                    >
                    <input
                      type="text"
                      id="activity-subject"
                      v-model="activityForm.subject"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                      placeholder="e.g. Follow up call, Product demo, etc."
                      required
                    />
                  </div>

                  <!-- Date Range -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        for="start-date"
                        class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Start Date *</label
                      >
                      <input
                        type="date"
                        id="start-date"
                        v-model="activityForm.date_start"
                        class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="end-date"
                        class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >End Date *</label
                      >
                      <input
                        type="date"
                        id="end-date"
                        v-model="activityForm.date_end"
                        class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <!-- Time Range -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        for="start-time"
                        class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Start Time *</label
                      >
                      <div class="relative">
                        <div
                          class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
                        >
                          <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="time"
                          id="start-time"
                          v-model="activityForm.date_start_time"
                          class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                          min="00:00"
                          max="23:59"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="end-time"
                        class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >End Time *</label
                      >
                      <div class="relative">
                        <div
                          class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
                        >
                          <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="time"
                          id="end-time"
                          v-model="activityForm.date_end_time"
                          class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                          min="00:00"
                          max="23:59"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Location -->
                  <div>
                    <label
                      for="activity-location"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Location</label
                    >
                    <input
                      type="text"
                      id="activity-location"
                      v-model="activityForm.location"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                      placeholder="e.g. Office, Zoom, Client premises, etc."
                    />
                  </div>

                  <!-- Status -->
                  <div>
                    <label
                      for="activity-status"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Status *</label
                    >
                    <select
                      id="activity-status"
                      v-model="activityForm.status"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                      required
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="in_progress">🔄 In Progress</option>
                      <option value="completed">✅ Completed</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                  </div>

                  <!-- Description -->
                  <div>
                    <label
                      for="activity-description"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Description</label
                    >
                    <textarea
                      id="activity-description"
                      v-model="activityForm.description"
                      rows="3"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                      placeholder="Provide detailed description of the activity..."
                    ></textarea>
                  </div>

                  <!-- Notes -->
                  <div>
                    <label
                      for="activity-notes"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Notes</label
                    >
                    <textarea
                      id="activity-notes"
                      v-model="activityForm.notes"
                      rows="2"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200"
                      placeholder="Additional notes, follow-up actions, etc."
                    ></textarea>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="activitiesStore.loading"
                    class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <span
                      v-if="activitiesStore.loading"
                      class="inline-flex items-center"
                    >
                      <div
                        class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"
                      ></div>
                      {{ editingActivity ? "Updating..." : "Creating..." }}
                    </span>
                    <span v-else>{{
                      editingActivity ? "Update Activity" : "Create Activity"
                    }}</span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Right: Recent Activities List -->
            <div class="xl:col-span-2 space-y-4">
              <!-- Activities Header -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      Recent Activities
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ activitiesStore.activities?.length || 0 }} activity{{
                        (activitiesStore.activities?.length || 0) !== 1
                          ? "ies"
                          : "y"
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Activities Content -->
              <div
                v-if="activitiesStore.loading"
                class="flex justify-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div class="text-center">
                  <div
                    class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"
                  ></div>
                  <p class="text-gray-600 dark:text-gray-400">
                    Loading activities...
                  </p>
                </div>
              </div>

              <div
                v-else-if="
                  !activitiesStore.activities ||
                  activitiesStore.activities.length === 0
                "
                class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div
                  class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </div>
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                >
                  No Activities
                </h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">
                  No activities found for this lead.
                </p>
                <p class="text-sm text-gray-400 dark:text-gray-500">
                  Add an activity using the form on the left.
                </p>
              </div>

              <div v-else class="overflow-hidden">
                <!-- Activities Table -->
                <div
                  class="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <table
                    class="w-full text-xs text-left text-gray-500 dark:text-gray-400"
                  >
                    <!-- Table Header -->
                    <thead
                      class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600"
                    >
                      <tr>
                        <th scope="col" class="px-3 py-2.5 font-semibold">
                          <div class="flex items-center space-x-1">
                            <svg
                              class="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              ></path>
                            </svg>
                            <span>Type</span>
                          </div>
                        </th>
                        <th scope="col" class="px-3 py-2.5 font-semibold">
                          <div class="flex items-center space-x-1">
                            <svg
                              class="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                            <span>Subject</span>
                          </div>
                        </th>
                        <th scope="col" class="px-3 py-2.5 font-semibold">
                          <div class="flex items-center space-x-1">
                            <svg
                              class="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>Status</span>
                          </div>
                        </th>
                        <th scope="col" class="px-3 py-2.5 font-semibold">
                          <div class="flex items-center space-x-1">
                            <svg
                              class="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            <span>Date & Time</span>
                          </div>
                        </th>
                        <th scope="col" class="px-3 py-2.5 font-semibold">
                          <div class="flex items-center space-x-1">
                            <svg
                              class="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                            </svg>
                            <span>Location</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-2.5 font-semibold text-center"
                        >
                          <div
                            class="flex items-center justify-center space-x-1"
                          >
                            <svg
                              class="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                              ></path>
                            </svg>
                            <span>Actions</span>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <!-- Table Body -->
                    <tbody
                      class="divide-y divide-gray-100 dark:divide-gray-700"
                    >
                      <tr
                        v-for="activity in activitiesStore.activities"
                        :key="activity.id"
                        class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <!-- Activity Type -->
                        <td class="px-3 py-2.5">
                          <div class="flex items-center space-x-2">
                            <div
                              class="w-6 h-6 rounded-md flex items-center justify-center border border-gray-200 dark:border-gray-600"
                              :class="{
                                'bg-blue-50 dark:bg-blue-900/20':
                                  activity.type === 'call',
                                'bg-green-50 dark:bg-green-900/20':
                                  activity.type === 'email',
                                'bg-purple-50 dark:bg-purple-900/20':
                                  activity.type === 'online_meeting',
                                'bg-orange-50 dark:bg-orange-900/20':
                                  activity.type === 'physical_visit',
                                'bg-gray-50 dark:bg-gray-700':
                                  activity.type === 'other',
                              }"
                            >
                              <svg
                                class="w-3 h-3"
                                :class="{
                                  'text-blue-600 dark:text-blue-400':
                                    activity.type === 'call',
                                  'text-green-600 dark:text-green-400':
                                    activity.type === 'email',
                                  'text-purple-600 dark:text-purple-400':
                                    activity.type === 'online_meeting',
                                  'text-orange-600 dark:text-orange-400':
                                    activity.type === 'physical_visit',
                                  'text-gray-600 dark:text-gray-400':
                                    activity.type === 'other',
                                }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  v-if="activity.type === 'call'"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                ></path>
                                <path
                                  v-else-if="activity.type === 'email'"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                                <path
                                  v-else-if="activity.type === 'online_meeting'"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                                <path
                                  v-else-if="activity.type === 'physical_visit'"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                ></path>
                                <path
                                  v-else
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </div>
                            <span
                              class="font-medium text-gray-900 dark:text-white text-xs"
                            >
                              {{
                                activity.type.replace("_", " ").toUpperCase()
                              }}
                            </span>
                          </div>
                        </td>

                        <!-- Subject -->
                        <td class="px-3 py-2.5">
                          <div class="max-w-xs">
                            <div
                              class="font-medium text-gray-900 dark:text-white truncate text-xs"
                              :title="activity.subject"
                            >
                              {{ activity.subject }}
                            </div>
                            <div
                              v-if="activity.description"
                              class="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5"
                              :title="activity.description"
                            >
                              {{ activity.description }}
                            </div>
                          </div>
                        </td>

                        <!-- Status -->
                        <td class="px-3 py-2.5">
                          <div class="flex items-center space-x-1">
                            <div
                              class="w-2 h-2 rounded-full"
                              :class="{
                                'bg-yellow-400': activity.status === 'pending',
                                'bg-blue-400':
                                  activity.status === 'in_progress',
                                'bg-green-400': activity.status === 'completed',
                                'bg-red-400': activity.status === 'cancelled',
                              }"
                            ></div>
                            <span
                              class="text-xs font-medium"
                              :class="{
                                'text-yellow-700 dark:text-yellow-300':
                                  activity.status === 'pending',
                                'text-blue-700 dark:text-blue-300':
                                  activity.status === 'in_progress',
                                'text-green-700 dark:text-green-300':
                                  activity.status === 'completed',
                                'text-red-700 dark:text-red-300':
                                  activity.status === 'cancelled',
                              }"
                            >
                              {{
                                activity.status.replace("_", " ").toUpperCase()
                              }}
                            </span>
                          </div>
                        </td>

                        <!-- Date & Time -->
                        <td class="px-3 py-2.5">
                          <div class="text-xs">
                            <div
                              class="font-medium text-gray-900 dark:text-white flex items-center space-x-1"
                            >
                              <svg
                                class="w-3 h-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                              <span>{{ formatDate(activity.date_start) }}</span>
                            </div>
                            <div
                              class="text-gray-500 dark:text-gray-400 flex items-center space-x-1 mt-0.5"
                            >
                              <svg
                                class="w-3 h-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span>{{
                                formatTime(activity.date_start_time)
                              }}</span>
                            </div>
                          </div>
                        </td>

                        <!-- Location -->
                        <td class="px-3 py-2.5">
                          <div
                            v-if="activity.location"
                            class="flex items-center space-x-1"
                          >
                            <svg
                              class="w-3 h-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                            </svg>
                            <span
                              class="text-xs text-gray-900 dark:text-white truncate max-w-24"
                              :title="activity.location"
                            >
                              {{ activity.location }}
                            </span>
                          </div>
                          <div v-else class="flex items-center space-x-1">
                            <svg
                              class="w-3 h-3 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            <span class="text-xs text-gray-400"
                              >No location</span
                            >
                          </div>
                        </td>

                        <!-- Actions -->
                        <td class="px-3 py-2.5">
                          <div
                            class="flex items-center justify-center space-x-1"
                          >
                            <button
                              @click="editActivity(activity)"
                              class="inline-flex items-center p-1 text-xs font-medium text-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-gray-400 dark:hover:text-blue-400 rounded border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                              title="Edit Activity"
                            >
                              <svg
                                class="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                ></path>
                              </svg>
                            </button>
                            <button
                              @click="deleteActivity(activity.id)"
                              class="inline-flex items-center p-1 text-xs font-medium text-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-gray-400 dark:hover:text-red-400 rounded border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all duration-200"
                              title="Delete Activity"
                            >
                              <svg
                                class="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Notes Section (if any activity has notes) -->
                <div
                  v-if="
                    activitiesStore.activities.some(
                      (activity) => activity.notes
                    )
                  "
                  class="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <h4
                    class="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                  >
                    <svg
                      class="w-3 h-3 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Activity Notes
                  </h4>
                  <div class="space-y-1.5">
                    <div
                      v-for="activity in activitiesStore.activities.filter(
                        (a) => a.notes
                      )"
                      :key="`notes-${activity.id}`"
                      class="text-xs"
                    >
                      <span class="font-medium text-gray-900 dark:text-white"
                        >{{ activity.subject }}:</span
                      >
                      <span class="text-gray-600 dark:text-gray-400 ml-1">{{
                        activity.notes
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Contact Person Modal -->
  <div
    v-if="contactPersonModalOpen"
    class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80"
  >
    <div class="relative w-full max-w-6xl max-h-full">
      <div
        class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-2xl"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-xl"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white">
                {{
                  editingContactPerson
                    ? "Edit Contact Person"
                    : "Contact Persons Management"
                }}
              </h3>
              <p class="text-sm text-emerald-100">
                Manage contact persons for this lead
              </p>
            </div>
          </div>
          <button
            @click="closeContactPersonModal"
            class="text-white bg-transparent hover:bg-white/20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 14 14"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-8">
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <!-- Left: Add New Contact Person Form -->
            <div class="space-y-6">
              <div
                class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
              >
                <div class="flex items-center space-x-3 mb-6">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </div>
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {{
                      editingContactPerson
                        ? "Edit Contact Person"
                        : "Add New Contact Person"
                    }}
                  </h4>
                </div>

                <form @submit.prevent="saveContactPerson" class="space-y-5">
                  <!-- Name -->
                  <div>
                    <label
                      for="contact-name"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Full Name *</label
                    >
                    <input
                      type="text"
                      id="contact-name"
                      v-model="contactPersonForm.name"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all duration-200"
                      placeholder="e.g. John Smith"
                      required
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label
                      for="contact-email"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Email Address</label
                    >
                    <input
                      type="email"
                      id="contact-email"
                      v-model="contactPersonForm.email_address"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all duration-200"
                      placeholder="e.g. john.smith@company.com"
                    />
                  </div>

                  <!-- Phone -->
                  <div>
                    <label
                      for="contact-phone"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Phone Number</label
                    >
                    <input
                      type="tel"
                      id="contact-phone"
                      v-model="contactPersonForm.phone_number"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all duration-200"
                      placeholder="e.g. +1234567890"
                    />
                  </div>

                  <!-- Job Title -->
                  <div>
                    <label
                      for="contact-job-title"
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >Job Title</label
                    >
                    <input
                      type="text"
                      id="contact-job-title"
                      v-model="contactPersonForm.job_title"
                      class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all duration-200"
                      placeholder="e.g. Sales Manager"
                    />
                  </div>

                  <!-- Primary Contact -->
                  <div
                    class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                  >
                    <div class="flex items-center">
                      <input
                        id="contact-primary"
                        v-model="contactPersonForm.is_primary"
                        type="checkbox"
                        class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="contact-primary"
                        class="ml-3 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Set as Primary Contact
                      </label>
                    </div>
                    <p
                      class="text-xs text-gray-600 dark:text-gray-400 mt-2 ml-7"
                    >
                      Only one contact person can be primary per lead. Setting
                      this contact as primary will remove the primary status
                      from other contacts.
                    </p>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="entityContactPersonStore.loading"
                    class="w-full text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <span
                      v-if="entityContactPersonStore.loading"
                      class="inline-flex items-center"
                    >
                      <div
                        class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"
                      ></div>
                      {{ editingContactPerson ? "Updating..." : "Adding..." }}
                    </span>
                    <span v-else>{{
                      editingContactPerson
                        ? "Update Contact Person"
                        : "Add Contact Person"
                    }}</span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Right: Contact Persons List -->
            <div class="space-y-6">
              <div
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div
                  class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-t-xl"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"
                      >
                        <svg
                          class="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4
                          class="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                          Contact Persons
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {{
                            entityContactPersonStore.contactPersons?.length || 0
                          }}
                          contact{{
                            (entityContactPersonStore.contactPersons?.length ||
                              0) !== 1
                              ? "s"
                              : ""
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-6">
                  <div
                    v-if="entityContactPersonStore.loading"
                    class="flex justify-center py-12"
                  >
                    <div class="text-center">
                      <div
                        class="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mx-auto mb-4"
                      ></div>
                      <p class="text-gray-600 dark:text-gray-400">
                        Loading contacts...
                      </p>
                    </div>
                  </div>

                  <div
                    v-else-if="
                      !entityContactPersonStore.contactPersons ||
                      entityContactPersonStore.contactPersons.length === 0
                    "
                    class="text-center py-12"
                  >
                    <div
                      class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg
                        class="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3
                      class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                    >
                      No Contact Persons
                    </h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-4">
                      No contact persons found for this lead.
                    </p>
                    <p class="text-sm text-gray-400 dark:text-gray-500">
                      Add a contact person using the form on the left.
                    </p>
                  </div>

                  <div v-else class="space-y-4">
                    <div
                      v-for="contact in entityContactPersonStore.contactPersons"
                      :key="contact.id"
                      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div class="p-6">
                        <!-- Header with Avatar, Name, and Actions -->
                        <div class="flex items-start justify-between mb-5">
                          <div class="flex items-center space-x-4">
                            <!-- Contact Avatar -->
                            <div class="flex-shrink-0">
                              <div
                                class="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-lg"
                              >
                                {{ getInitials(contact.name) }}
                              </div>
                            </div>

                            <!-- Contact Info -->
                            <div class="flex-1 min-w-0">
                              <h5
                                class="text-xl font-semibold text-gray-900 dark:text-white truncate mb-2"
                              >
                                {{ contact.name }}
                              </h5>
                              <p
                                v-if="contact.job_title"
                                class="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2"
                              >
                                {{ contact.job_title }}
                              </p>
                              <span
                                v-if="contact.is_primary"
                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                              >
                                <svg
                                  class="w-2.5 h-2.5 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                Primary
                              </span>
                            </div>
                          </div>

                          <!-- Action Buttons -->
                          <div class="flex items-center space-x-2 ml-4">
                            <button
                              @click="editContactPerson(contact)"
                              class="inline-flex items-center p-2.5 text-sm font-medium text-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:text-gray-400 dark:hover:text-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                              title="Edit Contact"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                ></path>
                              </svg>
                            </button>
                            <button
                              @click="deleteContactPerson(contact.id)"
                              class="inline-flex items-center p-2.5 text-sm font-medium text-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-gray-400 dark:hover:text-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                              title="Delete Contact"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <!-- Contact Details -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <!-- Email -->
                          <div
                            v-if="contact.email_address"
                            class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div
                              class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0"
                            >
                              <svg
                                class="w-5 h-5 text-blue-600 dark:text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                              </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                              <p
                                class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium"
                              >
                                Email
                              </p>
                              <p
                                class="text-gray-900 dark:text-white truncate font-medium"
                              >
                                {{ contact.email_address }}
                              </p>
                            </div>
                          </div>

                          <!-- Phone -->
                          <div
                            v-if="contact.phone_number"
                            class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div
                              class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0"
                            >
                              <svg
                                class="w-5 h-5 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                ></path>
                              </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                              <p
                                class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium"
                              >
                                Phone
                              </p>
                              <p
                                class="text-gray-900 dark:text-white font-medium"
                              >
                                {{ contact.phone_number }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3"
        >
          <button
            @click="closeContactPersonModal"
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Delete Modal -->
  <div
    v-if="showConfirmModal"
    class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80"
  >
    <div class="relative w-full max-w-md">
      <div
        class="relative bg-white rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
      >
        <div
          class="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <div
            class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="p-6 text-center">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Confirm Action
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            {{ confirmMessage }}
          </p>
        </div>
        <div
          class="flex justify-center space-x-3 p-6 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            @click="showConfirmModal = false"
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmAction()"
            class="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg transition-all duration-200"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import { useEntityStore } from "../../store/entity.store";
import { useEntityContactPersonStore } from "../../store/entity-contact-person.store";
import { useActivitiesStore } from "../../store/activities.store";
import { useAuthStore } from "../../store/auth.store";
import type { Entity, CreateEntity } from "../../api/models/entity.model";
import type {
  Activity,
  CreateActivity,
} from "../../api/models/activities.model";
import type {
  EntityContactPerson,
  CreateEntityContactPerson,
} from "../../api/models/entity-contact-person.model";

// Store instances
const entityStore = useEntityStore();
const entityContactPersonStore = useEntityContactPersonStore();
const activitiesStore = useActivitiesStore();
const authStore = useAuthStore();

// Reactive data
const searchQuery = ref("");
const dateFilter = ref("");
const isSearching = ref(false);
const slidePanelOpen = ref(false);
const editMode = ref(false);
const currentLead = ref<Entity | null>(null);

// Lead form data
const leadForm = reactive<CreateEntity>({
  company_id: authStore.user?.company_id || 0,
  group_id: 10, // Leads group
  name: "",
  address: "",
  phonenumber: "",
  email: "",
  username: "",
  password: "",
});

// Contact person form
const contactPersonForm = reactive<CreateEntityContactPerson>({
  entity_id: 0,
  company_id: authStore.user?.company_id || 0,
  name: "",
  email_address: "",
  phone_number: "",
  job_title: "",
  is_primary: false,
});

// Activity form
const activityForm = reactive<CreateActivity>({
  type: "call",
  subject: "",
  description: "",
  user_id: authStore.user?.id || 0,
  entity_type: "entity",
  entity_id: 0,
  company_id: authStore.user?.company_id || 0,
  status: "pending",
  date_start: "",
  date_end: "",
  date_start_time: "",
  date_end_time: "",
  location: "",
  notes: "",
});

// Modal states
const activitiesModalOpen = ref(false);
const contactPersonModalOpen = ref(false);

// Edit states
const editingActivity = ref<Activity | null>(null);
const editingContactPerson = ref<EntityContactPerson | null>(null);

// Delete confirmation modal
const showConfirmModal = ref(false);
const confirmMessage = ref("");
const confirmAction = ref<() => void>(() => {});

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const formatTime = (timeString: string) => {
  if (!timeString) return "";
  // Convert HH:MM:SS to HH:MM for display, or handle HH:MM format
  return timeString.length > 5 ? timeString.substring(0, 5) : timeString;
};

const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  // Convert date to YYYY-MM-DD format for HTML date input
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Computed properties
const newLeadsCount = computed(() => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return entityStore.entities.filter(
    (lead) => new Date(lead.date_created) >= oneWeekAgo
  ).length;
});

const contactedLeadsCount = computed(() => {
  return entityStore.entities.length; // Placeholder - would need activity data
});

const conversionRate = computed(() => {
  return entityStore.entities.length > 0
    ? Math.round(
        (entityStore.entities.length / entityStore.entities.length) * 100
      )
    : 0;
});

// Load leads data
const loadLeads = async () => {
  try {
    let query: any = {
      group_id: 10, // Leads group
      $sort: { date_created: -1 },
    };

    // Add search filter
    if (searchQuery.value) {
      query.$or = [
        { name: { $ilike: `%${searchQuery.value}%` } },
        { email: { $ilike: `%${searchQuery.value}%` } },
        { phonenumber: { $ilike: `%${searchQuery.value}%` } },
      ];
    }

    // Add date filter
    if (dateFilter.value) {
      const now = new Date();
      let startDate = new Date();

      switch (dateFilter.value) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          startDate.setMonth(now.getMonth() - 3);
          break;
      }

      query.date_created = {
        $gte: startDate.toISOString(),
      };
    }

    await entityStore.fetchEntities({ query });
  } catch (err: any) {
    console.error("Error loading leads:", err);
  }
};

// Debounced search function
let searchTimeout: NodeJS.Timeout | null = null;

const onSearchChange = () => {
  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Show searching indicator
  isSearching.value = true;

  // Set new timeout for 3 seconds
  searchTimeout = setTimeout(() => {
    entityStore.setPage(1);
    loadLeads();
    isSearching.value = false;
  }, 3000);
};

const onDateFilterChange = () => {
  entityStore.setPage(1);
  loadLeads();
};

const clearFilters = () => {
  // Clear search timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
    searchTimeout = null;
  }

  searchQuery.value = "";
  dateFilter.value = "";
  isSearching.value = false;
  entityStore.setPage(1);
  loadLeads();
};

const editLead = (lead: Entity) => {
  currentLead.value = lead;
  editMode.value = true;
  leadForm.name = lead.name;
  leadForm.address = lead.address || "";
  leadForm.phonenumber = lead.phonenumber || "";
  leadForm.email = lead.email || "";
  leadForm.username = lead.username || "";
  leadForm.password = lead.password || "";
  slidePanelOpen.value = true;
};

const openActivitiesModal = (lead: Entity) => {
  activityForm.entity_id = lead.id;
  activitiesModalOpen.value = true;
  loadActivitiesForLead(lead.id);
};

const openContactPersonModal = (lead: Entity) => {
  contactPersonForm.entity_id = lead.id;
  contactPersonModalOpen.value = true;
  loadContactPersonsForLead(lead.id);
};

const loadActivitiesForLead = async (entityId: number) => {
  try {
    await activitiesStore.fetchActivities({
      query: {
        entity_id: entityId,
        entity_type: "entity",
        $sort: { date_created: -1 },
      },
    });
  } catch (err: any) {
    console.error("Error loading activities for lead:", err);
  }
};

const loadContactPersonsForLead = async (entityId: number) => {
  try {
    await entityContactPersonStore.fetchContactPersons(entityId);
  } catch (err: any) {
    console.error("Error loading contact persons for lead:", err);
  }
};

// Initialize data on component mount
onMounted(() => {
  loadLeads();
});

// Modal close methods
const closeSlidePanel = () => {
  slidePanelOpen.value = false;
  editMode.value = false;
  currentLead.value = null;
  // Reset form
  leadForm.name = "";
  leadForm.address = "";
  leadForm.phonenumber = "";
  leadForm.email = "";
  leadForm.username = "";
  leadForm.password = "";
};

const closeActivitiesModal = () => {
  activitiesModalOpen.value = false;
  editingActivity.value = null;
  // Reset form
  activityForm.type = "call";
  activityForm.subject = "";
  activityForm.description = "";
  activityForm.date_start = "";
  activityForm.date_end = "";
  activityForm.date_start_time = "";
  activityForm.date_end_time = "";
  activityForm.location = "";
  activityForm.status = "pending";
  activityForm.notes = "";
};

const closeContactPersonModal = () => {
  contactPersonModalOpen.value = false;
  editingContactPerson.value = null;
  // Reset form
  contactPersonForm.name = "";
  contactPersonForm.email_address = "";
  contactPersonForm.phone_number = "";
  contactPersonForm.job_title = "";
  contactPersonForm.is_primary = false;
};

// Save methods
const saveLead = async () => {
  try {
    if (editMode.value && currentLead.value) {
      // Update existing lead
      await entityStore.updateEntity(currentLead.value.id, {
        name: leadForm.name,
        address: leadForm.address,
        phonenumber: leadForm.phonenumber,
        email: leadForm.email,
        username: leadForm.username,
        password: leadForm.password,
      });
    } else {
      // Create new lead
      const newLeadData: CreateEntity = {
        company_id: authStore.user?.company_id || 0,
        group_id: 10, // Leads group
        name: leadForm.name,
        address: leadForm.address,
        phonenumber: leadForm.phonenumber,
        email: leadForm.email,
        username: leadForm.username,
        password: leadForm.password,
      };
      await entityStore.createEntity(newLeadData);
    }

    closeSlidePanel();
    await loadLeads();
  } catch (err: any) {
    console.error("Error saving lead:", err);
  }
};

const saveActivity = async () => {
  try {
    const activityData = {
      ...activityForm,
      user_id: authStore.user?.id || 0,
      entity_type: "entity" as const,
    };

    if (editingActivity.value) {
      // Update existing activity
      await activitiesStore.updateExistingActivity(
        editingActivity.value.id,
        activityData
      );
      editingActivity.value = null;
    } else {
      // Create new activity
      await activitiesStore.createNewActivity(activityData);
    }
    // Reset form
    activityForm.subject = "";
    activityForm.description = "";
    activityForm.date_start = "";
    activityForm.date_end = "";
    activityForm.date_start_time = "";
    activityForm.date_end_time = "";
    activityForm.location = "";
    activityForm.notes = "";
    // Reload activities
    await loadActivitiesForLead(activityForm.entity_id);
  } catch (err: any) {
    console.error("Error saving activity:", err);
  }
};

const saveContactPerson = async () => {
  try {
    if (editingContactPerson.value) {
      // Update existing contact person
      await entityContactPersonStore.updateContactPerson(
        editingContactPerson.value.id,
        contactPersonForm
      );
      editingContactPerson.value = null;
    } else {
      // Create new contact person
      await entityContactPersonStore.createContactPerson(contactPersonForm);
    }
    // Reset form
    contactPersonForm.name = "";
    contactPersonForm.email_address = "";
    contactPersonForm.phone_number = "";
    contactPersonForm.job_title = "";
    contactPersonForm.is_primary = false;
    // Reload contact persons
    await loadContactPersonsForLead(contactPersonForm.entity_id);
  } catch (err: any) {
    console.error("Error saving contact person:", err);
  }
};

// Edit and delete methods
const editActivity = (activity: Activity) => {
  editingActivity.value = activity;
  // Populate form with activity data
  activityForm.type = activity.type;
  activityForm.subject = activity.subject;
  activityForm.description = activity.description || "";
  activityForm.date_start = formatDateForInput(activity.date_start);
  activityForm.date_end = formatDateForInput(activity.date_end);
  activityForm.date_start_time = formatTime(activity.date_start_time);
  activityForm.date_end_time = formatTime(activity.date_end_time);
  activityForm.location = activity.location || "";
  activityForm.status = activity.status;
  activityForm.notes = activity.notes || "";
};

const deleteActivity = async (activityId: number) => {
  confirmMessage.value =
    "Are you sure you want to delete this activity? This action cannot be undone.";
  confirmAction.value = async () => {
    try {
      await activitiesStore.deleteExistingActivity(activityId);
      // Reload activities
      await loadActivitiesForLead(activityForm.entity_id);
      showConfirmModal.value = false;
    } catch (err: any) {
      console.error("Error deleting activity:", err);
    }
  };
  showConfirmModal.value = true;
};

const editContactPerson = (contact: EntityContactPerson) => {
  editingContactPerson.value = contact;
  // Populate form with contact data
  contactPersonForm.name = contact.name;
  contactPersonForm.email_address = contact.email_address || "";
  contactPersonForm.phone_number = contact.phone_number || "";
  contactPersonForm.job_title = contact.job_title || "";
  contactPersonForm.is_primary = contact.is_primary || false;
};

const deleteContactPerson = async (contactId: number) => {
  confirmMessage.value =
    "Are you sure you want to delete this contact person? This action cannot be undone.";
  confirmAction.value = async () => {
    try {
      await entityContactPersonStore.deleteContactPerson(contactId);
      // Reload contact persons
      await loadContactPersonsForLead(contactPersonForm.entity_id);
      showConfirmModal.value = false;
    } catch (err: any) {
      console.error("Error deleting contact person:", err);
    }
  };
  showConfirmModal.value = true;
};

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(entityStore.pagination.total / entityStore.pagination.limit)
})

const visiblePages = computed(() => {
  const current = entityStore.pagination.currentPage
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
  if (typeof page === 'number') {
    entityStore.setPage(page)
    await loadLeads()
  }
}

const nextPage = async () => {
  if (entityStore.pagination.currentPage < totalPages.value) {
    entityStore.setPage(entityStore.pagination.currentPage + 1)
    await loadLeads()
  }
}

const previousPage = async () => {
  if (entityStore.pagination.currentPage > 1) {
    entityStore.setPage(entityStore.pagination.currentPage - 1)
    await loadLeads()
  }
}

const onLimitChange = async () => {
  entityStore.setLimit(Number(entityStore.pagination.limit))
  entityStore.setPage(1) // Reset to first page when changing limit
  await loadLeads()
}
</script>

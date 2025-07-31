<template>
  <div class="p-6 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your customer relationships and contact information</p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-3">
        <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Import
        </button>
        <button @click="showAddModal = true" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Contact
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">2,847</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">1,923</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">+127</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Segments</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <!-- Search -->
        <div class="relative flex-1 max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input v-model="searchQuery" type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Search contacts...">
        </div>

        <!-- Filters -->
        <div class="flex items-center space-x-3">
          <select v-model="selectedSegment" class="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
            <option value="">All Segments</option>
            <option value="vip">VIP Customers</option>
            <option value="prospects">Prospects</option>
            <option value="partners">Partners</option>
            <option value="inactive">Inactive</option>
          </select>

          <select v-model="selectedStatus" class="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <button @click="toggleView" class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <svg v-if="viewMode === 'grid'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Contacts Grid -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="contact in filteredContacts" :key="contact.id" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer group">
        <!-- Contact Avatar and Info -->
        <div class="flex items-center mb-4">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {{ getInitials(contact.name) }}
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800" :class="{
              'bg-green-500': contact.status === 'active',
              'bg-gray-400': contact.status === 'inactive',
              'bg-yellow-500': contact.status === 'pending'
            }"></div>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ contact.name }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ contact.company }}</p>
          </div>
        </div>

        <!-- Contact Details -->
        <div class="space-y-2 mb-4">
          <div class="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            {{ contact.email }}
          </div>
          <div class="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            {{ contact.phone }}
          </div>
        </div>

        <!-- Tags and Actions -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-1">
            <span v-for="tag in contact.tags.slice(0, 2)" :key="tag" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="{
              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': tag === 'VIP',
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': tag === 'Customer',
              'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400': tag === 'Prospect',
              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400': tag === 'Partner'
            }">
              {{ tag }}
            </span>
            <span v-if="contact.tags.length > 2" class="text-xs text-gray-500 dark:text-gray-400">+{{ contact.tags.length - 2 }}</span>
          </div>
          <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="editContact(contact)" class="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button @click="deleteContact(contact.id)" class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Last Contact -->
        <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Last contact</span>
            <span>{{ formatDate(contact.lastContact) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tags</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Contact</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="contact in filteredContacts" :key="contact.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="relative">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {{ getInitials(contact.name) }}
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800" :class="{
                      'bg-green-500': contact.status === 'active',
                      'bg-gray-400': contact.status === 'inactive',
                      'bg-yellow-500': contact.status === 'pending'
                    }"></div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ contact.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ contact.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ contact.company }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ contact.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': contact.status === 'active',
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': contact.status === 'inactive',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': contact.status === 'pending'
                }">
                  {{ contact.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-1">
                  <span v-for="tag in contact.tags.slice(0, 2)" :key="tag" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="{
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': tag === 'VIP',
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': tag === 'Customer',
                    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400': tag === 'Prospect',
                    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400': tag === 'Partner'
                  }">
                    {{ tag }}
                  </span>
                  <span v-if="contact.tags.length > 2" class="text-xs text-gray-500 dark:text-gray-400">+{{ contact.tags.length - 2 }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(contact.lastContact) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="viewContact(contact)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click="editContact(contact)" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button @click="deleteContact(contact.id)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Showing <span class="font-medium">1</span> to <span class="font-medium">20</span> of <span class="font-medium">{{ filteredContacts.length }}</span> results
      </div>
      <div class="flex items-center space-x-2">
        <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          Previous
        </button>
        <button class="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors">
          1
        </button>
        <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          2
        </button>
        <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          3
        </button>
        <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          Next
        </button>
      </div>
    </div>
  </div>

  <!-- Add Contact Modal -->
  <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New Contact</h3>
        <button @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="submitForm" class="pt-6 space-y-6">
        <!-- Personal Information Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Personal Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name <span class="text-red-500">*</span>
              </label>
              <input v-model="newContact.firstName" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter first name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input v-model="newContact.lastName" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter last name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input v-model="newContact.email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email address">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input v-model="newContact.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter phone number">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title
              </label>
              <input v-model="newContact.jobTitle" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter job title">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select v-model="newContact.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Company Information Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Company Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name <span class="text-red-500">*</span>
              </label>
              <input v-model="newContact.company" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter company name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <select v-model="newContact.industry" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Size
              </label>
              <select v-model="newContact.companySize" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <input v-model="newContact.website" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com">
            </div>
          </div>
        </div>

        <!-- Address Information Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Address Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address
              </label>
              <input v-model="newContact.address" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter street address">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input v-model="newContact.city" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter city">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State/Province
              </label>
              <input v-model="newContact.state" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter state/province">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ZIP/Postal Code
              </label>
              <input v-model="newContact.zipCode" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter ZIP/postal code">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <select v-model="newContact.country" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tags and Notes Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Additional Information</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tag in selectedTags" :key="tag" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {{ tag }}
                  <button @click="removeTag(tag)" type="button" class="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="tag in availableTags.filter(t => !selectedTags.includes(t))" :key="tag" @click="addTag(tag)" type="button" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors">
                  + {{ tag }}
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <textarea v-model="newContact.notes" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add any additional notes about this contact..."></textarea>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button @click="closeModal" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-colors">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Edit Contact Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeEditModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Contact</h3>
        <button @click="closeEditModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="updateContact" class="pt-6 space-y-6">
        <!-- Personal Information Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Personal Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name <span class="text-red-500">*</span>
              </label>
              <input v-model="editingContact.firstName" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter first name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input v-model="editingContact.lastName" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter last name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input v-model="editingContact.email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email address">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input v-model="editingContact.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter phone number">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title
              </label>
              <input v-model="editingContact.jobTitle" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter job title">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select v-model="editingContact.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Company Information Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Company Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name <span class="text-red-500">*</span>
              </label>
              <input v-model="editingContact.company" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter company name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <select v-model="editingContact.industry" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tags Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Tags</h4>
          <div class="space-y-4">
            <div>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tag in editingTags" :key="tag" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {{ tag }}
                  <button @click="removeEditTag(tag)" type="button" class="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="tag in availableTags.filter(t => !editingTags.includes(t))" :key="tag" @click="addEditTag(tag)" type="button" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors">
                  + {{ tag }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button @click="closeEditModal" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-colors">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Update Contact
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeDeleteModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Delete Contact</h3>
        <button @click="closeDeleteModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="pt-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900/30">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
        </div>
        <div class="text-center">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Are you sure?</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            This action cannot be undone. This will permanently delete the contact 
            <span class="font-medium text-gray-900 dark:text-white">{{ contactToDelete?.name }}</span> 
            and remove all associated data.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-center space-x-3">
          <button @click="closeDeleteModal" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button @click="confirmDelete" type="button" class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 transition-colors">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Delete Contact
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- View Contact Modal -->
  <div v-if="showViewModal && viewingContact" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeViewModal">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-lg rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
            {{ getInitials(viewingContact.name) }}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ viewingContact.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ viewingContact.company }}</p>
          </div>
        </div>
        <button @click="closeViewModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="pt-6 space-y-6">
        <!-- Contact Information Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Contact Details -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Contact Information</h4>
            
            <div class="space-y-3">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ viewingContact.email }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                </div>
              </div>

              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ viewingContact.phone }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                </div>
              </div>

              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clip-rule="evenodd"></path>
                  <path fill-rule="evenodd" d="M9 9a1 1 0 112 0v2a1 1 0 11-2 0V9z" clip-rule="evenodd"></path>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ viewingContact.company }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Company</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Status and Activity -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Status & Activity</h4>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': viewingContact.status === 'active',
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': viewingContact.status === 'inactive',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': viewingContact.status === 'pending'
                }">
                  {{ viewingContact.status }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Last Contact</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(viewingContact.lastContact) }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Added</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(viewingContact.lastContact) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tags Section -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Tags</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in viewingContact.tags" :key="tag" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="{
              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': tag === 'VIP',
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': tag === 'Customer',
              'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400': tag === 'Prospect',
              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400': tag === 'Partner',
              'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400': tag === 'Lead',
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': tag === 'Hot Lead',
              'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': tag === 'Cold Lead'
            }">
              {{ tag }}
            </span>
            <span v-if="viewingContact.tags.length === 0" class="text-sm text-gray-500 dark:text-gray-400 italic">No tags assigned</span>
          </div>
        </div>

        <!-- Recent Activity Timeline -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Recent Activity</h4>
          <div class="space-y-3">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Email sent</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(viewingContact.lastContact) }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Phone call completed</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Contact created</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Quick Actions</h4>
          <div class="flex flex-wrap gap-3">
            <button @click="editContact(viewingContact)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-800/40 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Edit Contact
            </button>
            
            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-800/40 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              Send Email
            </button>

            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-800/40 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              Call Contact
            </button>

            <button @click="deleteContact(viewingContact.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-800/40 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Delete Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Define Contact interface
interface Contact {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: 'active' | 'inactive' | 'pending'
  tags: string[]
  lastContact: Date
}

// Reactive data
const searchQuery = ref('')
const selectedSegment = ref('')
const selectedStatus = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showViewModal = ref(false)
const contactToDelete = ref<Contact | null>(null)
const viewingContact = ref<Contact | null>(null)

// New contact form data
const newContact = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  company: '',
  industry: '',
  companySize: '',
  website: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  status: 'active',
  notes: ''
})

// Edit contact form data
const editingContact = ref({
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  company: '',
  industry: '',
  status: 'active' as 'active' | 'inactive' | 'pending'
})

// Tags system
const selectedTags = ref<string[]>([])
const editingTags = ref<string[]>([])
const availableTags = ['VIP', 'Customer', 'Prospect', 'Partner', 'Lead', 'Hot Lead', 'Cold Lead']

// Sample contacts data
const contacts = ref<Contact[]>([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    status: 'active' as const,
    tags: ['VIP', 'Customer'],
    lastContact: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@innovate.io',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Labs',
    status: 'pending' as const,
    tags: ['Prospect'],
    lastContact: new Date('2024-01-12')
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@globalventures.com',
    phone: '+1 (555) 345-6789',
    company: 'Global Ventures',
    status: 'active' as const,
    tags: ['Partner', 'VIP'],
    lastContact: new Date('2024-01-10')
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.t@startup.co',
    phone: '+1 (555) 456-7890',
    company: 'Startup Co.',
    status: 'inactive' as const,
    tags: ['Customer'],
    lastContact: new Date('2023-12-28')
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@enterprise.net',
    phone: '+1 (555) 567-8901',
    company: 'Enterprise Networks',
    status: 'active' as const,
    tags: ['VIP', 'Customer'],
    lastContact: new Date('2024-01-14')
  },
  {
    id: 6,
    name: 'James Wilson',
    email: 'james.wilson@consulting.biz',
    phone: '+1 (555) 678-9012',
    company: 'Wilson Consulting',
    status: 'active' as const,
    tags: ['Prospect'],
    lastContact: new Date('2024-01-13')
  }
])

// Computed properties
const filteredContacts = computed(() => {
  return contacts.value.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesSegment = !selectedSegment.value || 
                          contact.tags.some(tag => tag.toLowerCase() === selectedSegment.value)
    
    const matchesStatus = !selectedStatus.value || contact.status === selectedStatus.value
    
    return matchesSearch && matchesSegment && matchesStatus
  })
})

// Methods
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const closeModal = () => {
  showAddModal.value = false
  // Reset form
  newContact.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    industry: '',
    companySize: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    status: 'active',
    notes: ''
  }
  selectedTags.value = []
}

const submitForm = () => {
  // Create new contact object
  const contact: Contact = {
    id: contacts.value.length + 1,
    name: `${newContact.value.firstName} ${newContact.value.lastName}`,
    email: newContact.value.email,
    phone: newContact.value.phone,
    company: newContact.value.company,
    status: newContact.value.status as 'active' | 'inactive' | 'pending',
    tags: [...selectedTags.value],
    lastContact: new Date()
  }
  
  // Add to contacts list
  contacts.value.unshift(contact)
  
  // Close modal
  closeModal()
  
  // You could add a success notification here
  console.log('Contact added successfully:', contact)
}

const removeTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag)
}

const addTag = (tag: string) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
  }
}

const editContact = (contact: Contact) => {
  // Parse the full name into first and last name
  const nameParts = contact.name.split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''
  
  // Populate the edit form with contact data
  editingContact.value = {
    id: contact.id,
    firstName: firstName,
    lastName: lastName,
    email: contact.email,
    phone: contact.phone,
    jobTitle: '', // Add if available in your contact data
    company: contact.company,
    industry: '', // Add if available in your contact data
    status: contact.status
  }
  
  // Set the tags for editing
  editingTags.value = [...contact.tags]
  
  // Show the edit modal
  showEditModal.value = true
}

const deleteContact = (id: number) => {
  // Find the contact to delete
  const contact = contacts.value.find(c => c.id === id)
  if (contact) {
    contactToDelete.value = contact
    showDeleteModal.value = true
  }
}

const viewContact = (contact: Contact) => {
  console.log('View contact:', contact)
  // You could implement a detailed view modal here
  viewingContact.value = contact
  showViewModal.value = true
}

const updateContact = () => {
  // Find and update the contact in the contacts array
  const index = contacts.value.findIndex(c => c.id === editingContact.value.id)
  if (index !== -1) {
    // Update the contact with new data
    contacts.value[index] = {
      ...contacts.value[index],
      name: `${editingContact.value.firstName} ${editingContact.value.lastName}`,
      email: editingContact.value.email,
      phone: editingContact.value.phone,
      company: editingContact.value.company,
      status: editingContact.value.status,
      tags: [...editingTags.value],
      lastContact: new Date() // Update last contact time
    }
    
    console.log('Contact updated successfully:', contacts.value[index])
  }
  
  // Close the edit modal
  closeEditModal()
}

const removeEditTag = (tag: string) => {
  editingTags.value = editingTags.value.filter(t => t !== tag)
}

const addEditTag = (tag: string) => {
  if (!editingTags.value.includes(tag)) {
    editingTags.value.push(tag)
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  // Reset form
  editingContact.value = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    industry: '',
    status: 'active' as 'active' | 'inactive' | 'pending'
  }
  editingTags.value = []
}

const confirmDelete = () => {
  if (contactToDelete.value) {
    // Remove the contact from the contacts array
    contacts.value = contacts.value.filter(c => c.id !== contactToDelete.value.id)
    console.log('Contact deleted successfully:', contactToDelete.value.name)
  }
  
  // Close the delete modal
  closeDeleteModal()
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  contactToDelete.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingContact.value = null
}
</script>

<style scoped>
/* Custom scrollbar for tables */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode scrollbar */
.dark .overflow-x-auto::-webkit-scrollbar-track {
  background: #374151;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>

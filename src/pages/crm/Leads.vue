<template>
  <!-- Main page content -->
  <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <!-- Left: Title with badge -->
        <div class="mb-4 md:mb-0 flex items-center">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Leads</h1>
          <span class="bg-violet-100 text-violet-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300 ml-3">
            {{ filteredCustomers.length }} total
          </span>
        </div>

        <!-- Right: Actions -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Export button with dropdown -->
          <div class="relative">
            <button 
              type="button" 
              class="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
              @click="showExportMenu = !showExportMenu"
            >
              <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4-4-4m11 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
              </svg>
              Export
              <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div 
              v-if="showExportMenu" 
              class="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a href="#" @click.prevent="exportLeads('csv')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Export as CSV
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent="exportLeads('json')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Export as JSON
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent="exportLeads('excel')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Export as Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Add lead button -->
          <button 
            type="button" 
            class="text-white bg-gradient-to-br from-purple-600 to-violet-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:ring-violet-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            @click="openSlidePanel('add')"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            Add Lead
          </button>
        </div>
      </div>
    </div>

    <!-- Filters and search -->
    <div class="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Left side: Filters -->
        <div class="flex flex-wrap items-center gap-3 flex-grow">
          <!-- View toggle -->
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button 
              type="button" 
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-2 focus:ring-violet-500 focus:text-violet-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-violet-500 dark:focus:text-white"
              :class="viewMode === 'table' ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : ''"
              @click="viewMode = 'table'"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-10 10H1v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
              </svg>
            </button>
            <button 
              type="button" 
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-2 focus:ring-violet-500 focus:text-violet-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-violet-500 dark:focus:text-white"
              :class="viewMode === 'card' ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : ''"
              @click="viewMode = 'card'"
            >
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
            </button>
          </div>
          
          <!-- Status filter -->
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            v-model="statusFilter"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          
          <!-- Industry filter -->
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            v-model="industryFilter"
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Energy">Energy</option>
            <option value="Transportation">Transportation</option>
          </select>
          
          <!-- Date filter -->
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            v-model="dateFilter"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <!-- Clear filters button -->
          <button
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            @click="clearFilters"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
        
        <!-- Right side: Search -->
        <div class="relative w-full md:w-auto md:min-w-[260px]">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input 
            type="search" 
            class="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" 
            placeholder="Search leads..." 
            v-model="searchTerm"
          >
        </div>
      </div>
    </div>
    
    <!-- Batch actions bar (appears when items are selected) -->
    <div class="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg  p-3 mb-5 flex items-center justify-between" v-if="selectedLeads.length > 0">
      <div class="flex items-center">
        <span class="bg-violet-100 text-violet-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300">
          {{ selectedLeads.length }}
        </span>
        <span class="text-sm font-medium text-violet-800 dark:text-violet-200">
          lead{{ selectedLeads.length !== 1 ? 's' : '' }} selected
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" class="py-2 px-3 text-xs font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
          Edit
        </button>
        <button type="button" class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Change Status
        </button>
        <button type="button" class="py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Delete
        </button>
      </div>
    </div>

    <!-- Table view -->
    <div v-if="viewMode === 'table'" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          All Leads
          <span class="bg-violet-100 text-violet-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300 ml-3">
            {{ filteredCustomers.length }}
          </span>
        </h2>
      </div>
      
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input 
                    id="checkbox-all" 
                    type="checkbox" 
                    class="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 dark:focus:ring-violet-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                  >
                  <label for="checkbox-all" class="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Company
                  <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Contact
                  <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">Industry</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Value
                  <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">Last Contact</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in filteredCustomers" :key="index" class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input 
                    :id="'checkbox-' + index" 
                    type="checkbox" 
                    class="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 dark:focus:ring-violet-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    v-model="customer.selected"
                  >
                  <label :for="'checkbox-' + index" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div v-if="customer.logo" class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <img class="w-10 h-10 rounded-full" :src="customer.logo" :alt="customer.name">
                </div>
                <div v-else class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-violet-100 rounded-full dark:bg-violet-600">
                  <span class="font-medium text-violet-800 dark:text-violet-300">{{ getInitials(customer.name) }}</span>
                </div>
                <div class="ps-3">
                  <div class="text-base font-semibold">{{ customer.name }}</div>
                  <div class="font-normal text-gray-500">{{ customer.location }}</div>
                </div>  
              </th>
              <td class="px-6 py-4">
                <div class="font-medium">{{ customer.contactName }}</div>
                <div class="flex items-center text-gray-500">
                  <svg class="w-4 h-4 me-1.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="M10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                  {{ customer.email }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="{
                  'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300': customer.industry === 'Technology',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': customer.industry === 'Manufacturing',
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': customer.industry === 'Healthcare',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': customer.industry === 'Finance',
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': customer.industry === 'Retail',
                  'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300': customer.industry === 'Energy',
                  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300': customer.industry === 'Transportation',
                  'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full': true
                }">
                  {{ customer.industry }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div :class="{
                  'flex items-center': true,
                  'text-green-500 dark:text-green-400': customer.status === 'active',
                  'text-yellow-500 dark:text-yellow-400': customer.status === 'pending',
                  'text-gray-500 dark:text-gray-400': customer.status === 'inactive'
                }">
                  <div :class="{
                    'h-2.5 w-2.5 rounded-full me-2': true,
                    'bg-green-500': customer.status === 'active',
                    'bg-yellow-500': customer.status === 'pending',
                    'bg-gray-500': customer.status === 'inactive'
                  }"></div>
                  {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                </div>
              </td>
              <td class="px-6 py-4 font-medium">
                <div class="flex items-center">
                  <svg class="w-4 h-4 me-1.5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                  </svg>
                  {{ customer.value }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <svg class="w-4 h-4 me-1.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                  </svg>
                  {{ customer.lastContact }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button 
                    type="button" 
                    class="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                    @click="openSlidePanel('edit', customer)"
                  >
                    <svg class="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    type="button" 
                    style="background: linear-gradient(to right, #3b82f6, #06b6d4);"
                    class="text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                    @click="convertToOpportunity(customer)"
                  >
                    <svg class="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                    </svg>
                    Convert
                  </button>
                  <button 
                    type="button" 
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                    @click="openTaskModal(customer)"
                  >
                    <svg class="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                    </svg>
                    Add Task
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredCustomers.length === 0">
              <td colspan="8" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg class="w-10 h-10 mb-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                  </svg>
                  No leads found matching your criteria
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Card view -->
    <div v-if="viewMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(customer, index) in filteredCustomers" :key="index" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
        <div class="p-5">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div v-if="customer.logo" class="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <img class="w-12 h-12 rounded-full" :src="customer.logo" :alt="customer.name">
                </div>
                <div v-else class="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-violet-100 rounded-full dark:bg-violet-600">
                  <span class="font-medium text-violet-800 dark:text-violet-300 text-lg">{{ getInitials(customer.name) }}</span>
                </div>
              </div>
              <div class="ms-4">
                <h5 class="text-xl font-semibold text-gray-900 dark:text-white">{{ customer.name }}</h5>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ customer.location }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <input 
                :id="'card-checkbox-' + index" 
                type="checkbox" 
                class="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 dark:focus:ring-violet-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 me-2"
                v-model="customer.selected"
              >
              <div :class="{
                'flex items-center': true,
                'text-green-500 dark:text-green-400': customer.status === 'active',
                'text-yellow-500 dark:text-yellow-400': customer.status === 'pending',
                'text-gray-500 dark:text-gray-400': customer.status === 'inactive'
              }">
                <div :class="{
                  'h-2.5 w-2.5 rounded-full me-1.5': true,
                  'bg-green-500': customer.status === 'active',
                  'bg-yellow-500': customer.status === 'pending',
                  'bg-gray-500': customer.status === 'inactive'
                }"></div>
                <span class="text-xs font-medium">
                  {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <span :class="{
              'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300': customer.industry === 'Technology',
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': customer.industry === 'Manufacturing',
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': customer.industry === 'Healthcare',
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': customer.industry === 'Finance',
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': customer.industry === 'Retail',
              'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300': customer.industry === 'Energy',
              'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300': customer.industry === 'Transportation',
              'text-xs font-medium me-2 px-2.5 py-0.5 rounded': true
            }">
              {{ customer.industry }}
            </span>
          </div>
          
          <dl class="grid grid-cols-1 gap-2 text-sm">
            <div class="flex items-center">
              <dt class="font-medium text-gray-500 dark:text-gray-400 w-24">Contact:</dt>
              <dd class="text-gray-900 dark:text-white">{{ customer.contactName }}</dd>
            </div>
            <div class="flex items-center">
              <dt class="font-medium text-gray-500 dark:text-gray-400 w-24">Email:</dt>
              <dd class="text-gray-900 dark:text-white">{{ customer.email }}</dd>
            </div>
            <div class="flex items-center">
              <dt class="font-medium text-gray-500 dark:text-gray-400 w-24">Value:</dt>
              <dd class="text-gray-900 dark:text-white font-medium">{{ customer.value }}</dd>
            </div>
            <div class="flex items-center">
              <dt class="font-medium text-gray-500 dark:text-gray-400 w-24">Last Contact:</dt>
              <dd class="text-gray-900 dark:text-white">{{ customer.lastContact }}</dd>
            </div>
          </dl>
          
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button 
              type="button" 
              class="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
              @click="openSlidePanel('edit', customer)"
            >
              <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
              </svg>
              Edit Lead
            </button>
            <button 
              type="button" 
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
              @click="openTaskModal(customer)"
            >
              <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
              </svg>
              Add Task
            </button>
          </div>
        </div>
      </div>
      <div v-if="filteredCustomers.length === 0" class="col-span-full">
        <div class="p-8 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <p class="text-gray-500 dark:text-gray-400">No leads found matching your criteria</p>
        </div>
      </div>
    </div>
  
  <!-- Modal for Add/Edit Lead -->
  <div v-if="slidePanelOpen" id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-700 dark:to-violet-700">
          <h3 class="text-xl font-semibold text-white">
            <div class="flex items-center">
              {{ editMode ? 'Edit Lead' : 'Add New Lead' }}
            </div>
          </h3>
          <button type="button" class="text-white bg-transparent hover:bg-violet-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeSlidePanel">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <form @submit.prevent="saveLead">
            <!-- Company Information Section -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                  Company Information
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Basic information about the company.</p>
              </div>
              
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Company Name -->
                <div class="col-span-2">
                  <label for="company-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                  <input type="text" id="company-name" v-model="leadForm.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. Acme Inc." required>
                </div>
                
                <!-- Location -->
                <div>
                  <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                  <input type="text" id="location" v-model="leadForm.location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. New York, NY">
                </div>
                
                <!-- Industry -->
                <div>
                  <label for="industry" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry</label>
                  <select id="industry" v-model="leadForm.industry" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500">
                    <option value="">Select an industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Energy">Energy</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                </div>
                
                <!-- Status -->
                <div>
                  <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                  <select id="status" v-model="leadForm.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <!-- Value -->
                <div>
                  <label for="value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Potential Value</label>
                  <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input type="text" id="value" v-model="leadForm.value" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-violet-500 focus:border-violet-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. 10000">
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Contact Information Section -->
            <div class="mt-8 space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                  Contact Information
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Primary contact details for this lead.</p>
              </div>
              
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Contact Name -->
                <div>
                  <label for="contact-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Name</label>
                  <input type="text" id="contact-name" v-model="leadForm.contactName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. John Doe">
                </div>
                
                <!-- Email -->
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" id="email" v-model="leadForm.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. john.doe@example.com">
                </div>
                
                <!-- Phone -->
                <div>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                  <input type="tel" id="phone" v-model="leadForm.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. (555) 123-4567">
                </div>
              </div>
            </div>
            
            <!-- Notes Section -->
            <div class="mt-8 space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                  Additional Information
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Any other relevant details about this lead.</p>
              </div>
              
              <div>
                <label for="notes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <textarea id="notes" v-model="leadForm.notes" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Add any notes or additional information here..."></textarea>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Modal footer -->
        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
          <button 
            type="button" 
            @click="closeSlidePanel" 
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            Cancel
          </button>
          &nbsp;
          <button 
            type="button" 
            @click="saveLead" 
            class="text-white bg-gradient-to-br from-purple-600 to-violet-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
            </svg>
            {{ editMode ? 'Update Lead' : 'Create Lead' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Task Modal -->
  <div v-if="taskModalOpen" id="taskModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600">
          <h3 class="text-xl font-semibold text-white">
            <div class="flex items-center">
              <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm7 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/>
              </svg>
              Add Task for {{ currentLead ? currentLead.name : '' }}
            </div>
          </h3>
          <button type="button" class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeTaskModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="saveTask">
            <!-- Task Information -->
            <div class="space-y-4">
              <!-- Task Title -->
              <div>
                <label for="task-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                <input type="text" id="task-title" v-model="taskForm.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Follow up call" required>
              </div>
              
              <!-- Task Type -->
              <div>
                <label for="task-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Type</label>
                <select id="task-type" v-model="taskForm.type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <!-- Due Date -->
              <div>
                <label for="due-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                    </svg>
                  </div>
                  <input type="date" id="due-date" v-model="taskForm.dueDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
              </div>
              
              <!-- Priority -->
              <div>
                <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                <select id="priority" v-model="taskForm.priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <!-- Assigned To -->
              <div>
                <label for="assigned-to" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assigned To</label>
                <select id="assigned-to" v-model="taskForm.assignedTo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Robert Johnson">Robert Johnson</option>
                  <option value="Emily Davis">Emily Davis</option>
                </select>
              </div>
              
              <!-- Description -->
              <div>
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="description" v-model="taskForm.description" rows="3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task details..."></textarea>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Modal footer -->
        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
          <button 
            type="button" 
            class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="closeTaskModal"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-2"
            @click="saveTask"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

// Sample customer data
const customers = ref([
  {
    name: 'TechnoGlobal Industries',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
    location: 'San Francisco, CA',
    contactName: 'Sarah Johnson',
    email: 'sarah.johnson@technoglobal.com',
    industry: 'Technology',
    status: 'active',
    value: '$2.5M',
    lastContact: 'Today',
    selected: false
  },
  {
    name: 'NexGen Robotics',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
    location: 'Boston, MA',
    contactName: 'David Chen',
    email: 'david.chen@nexgenrobotics.com',
    industry: 'Manufacturing',
    status: 'active',
    value: '$450K',
    lastContact: 'Yesterday',
    selected: false
  },
  {
    name: 'GlobalTech Solutions',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
    location: 'Chicago, IL',
    contactName: 'Michael Rodriguez',
    email: 'michael.r@globaltechsolutions.com',
    industry: 'Technology',
    status: 'active',
    value: '$1.2M',
    lastContact: '2 days ago',
    selected: false
  },
  {
    name: 'Quantum Logistics',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
    location: 'Atlanta, GA',
    contactName: 'Robert Kim',
    email: 'robert.kim@quantumlogistics.com',
    industry: 'Transportation',
    status: 'pending',
    value: '$350K',
    lastContact: '1 week ago',
    selected: false
  },
  {
    name: 'Pinnacle Manufacturing',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    location: 'Detroit, MI',
    contactName: 'Jennifer Lee',
    email: 'jennifer.lee@pinnaclemfg.com',
    industry: 'Manufacturing',
    status: 'inactive',
    value: '$750K',
    lastContact: '2 weeks ago',
    selected: false
  },
  {
    name: 'MediCore Health Systems',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
    location: 'Houston, TX',
    contactName: 'Thomas Wilson',
    email: 'thomas.wilson@medicore.com',
    industry: 'Healthcare',
    status: 'active',
    value: '$1.8M',
    lastContact: '3 days ago',
    selected: false
  },
  {
    name: 'FinServe Partners',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
    location: 'New York, NY',
    contactName: 'Emily Zhang',
    email: 'emily.zhang@finserve.com',
    industry: 'Finance',
    status: 'active',
    value: '$3.2M',
    lastContact: '5 days ago',
    selected: false
  },
  {
    name: 'EcoSmart Solutions',
    logo: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
    location: 'Portland, OR',
    contactName: 'Alex Morgan',
    email: 'alex.morgan@ecosmart.com',
    industry: 'Energy',
    status: 'pending',
    value: '$620K',
    lastContact: '1 month ago',
    selected: false
  }
]);

// Filter states
const searchTerm = ref('');
const statusFilter = ref('');
const industryFilter = ref('');
const dateFilter = ref('');
const selectAll = ref(false);
const viewMode = ref('table');
const showExportMenu = ref(false);

// Open slide panel
const slidePanelOpen = ref(false);
const editMode = ref(false);
const currentLead = ref(null);

// Lead form data
const leadForm = reactive({
  name: '',
  logo: '',
  location: '',
  contactName: '',
  email: '',
  phone: '',
  industry: '',
  status: 'active',
  value: '',
  lastContact: 'Today',
  notes: '',
  selected: false
});

// Task modal
const taskModalOpen = ref(false);
const taskForm = reactive({
  title: '',
  type: 'call',
  dueDate: new Date().toISOString().split('T')[0], // Today's date
  priority: 'medium',
  assignedTo: 'John Doe',
  description: '',
  status: 'not-started',
  relatedTo: {
    type: 'lead',
    id: null,
    name: ''
  }
});

// Tasks
const tasks = ref([]);

// Open slide panel for add or edit
const openSlidePanel = (mode, lead = null) => {
  slidePanelOpen.value = true;
  
  if (mode === 'edit' && lead) {
    editMode.value = true;
    currentLead.value = lead;
    
    // Populate form with lead data
    leadForm.name = lead.name;
    leadForm.logo = lead.logo;
    leadForm.location = lead.location;
    leadForm.contactName = lead.contactName;
    leadForm.email = lead.email;
    leadForm.phone = lead.phone || '';
    leadForm.industry = lead.industry;
    leadForm.status = lead.status;
    leadForm.value = lead.value.replace('$', '');
    leadForm.notes = lead.notes || '';
  } else {
    editMode.value = false;
    currentLead.value = null;
    
    // Reset form for new lead
    leadForm.name = '';
    leadForm.logo = '';
    leadForm.location = '';
    leadForm.contactName = '';
    leadForm.email = '';
    leadForm.phone = '';
    leadForm.industry = '';
    leadForm.status = 'active';
    leadForm.value = '';
    leadForm.notes = '';
  }
};

// Close slide panel
const closeSlidePanel = () => {
  slidePanelOpen.value = false;
};

// Open task modal
const openTaskModal = (lead) => {
  taskModalOpen.value = true;
  currentLead.value = lead;
  
  // Reset form and set related lead
  taskForm.title = '';
  taskForm.type = 'call';
  taskForm.dueDate = new Date().toISOString().split('T')[0];
  taskForm.priority = 'medium';
  taskForm.assignedTo = 'John Doe';
  taskForm.description = '';
  taskForm.status = 'not-started';
  taskForm.relatedTo = {
    type: 'lead',
    id: lead.id,
    name: lead.name
  };
};

// Close task modal
const closeTaskModal = () => {
  taskModalOpen.value = false;
};

// Save lead
const saveLead = () => {
  // Format value to include $ sign if it doesn't already
  if (leadForm.value && !leadForm.value.startsWith('$')) {
    leadForm.value = '$' + leadForm.value;
  }
  
  if (editMode.value && currentLead.value) {
    // Update existing lead
    currentLead.value.name = leadForm.name;
    currentLead.value.location = leadForm.location;
    currentLead.value.contactName = leadForm.contactName;
    currentLead.value.email = leadForm.email;
    currentLead.value.industry = leadForm.industry;
    currentLead.value.status = leadForm.status;
    currentLead.value.value = leadForm.value;
    // Note: We don't update lastContact here as it would reset the timestamp
  } else {
    // Add new lead to the beginning of the array
    customers.value.unshift({
      name: leadForm.name,
      logo: '', // Would typically be handled by file upload
      location: leadForm.location,
      contactName: leadForm.contactName,
      email: leadForm.email,
      industry: leadForm.industry,
      status: leadForm.status,
      value: leadForm.value,
      lastContact: 'Today',
      selected: false
    });
  }
  
  // Close the panel
  closeSlidePanel();
};

// Save task
const saveTask = () => {
  // Create a new task
  const newTask = {
    id: tasks.value.length > 0 ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1,
    title: taskForm.title,
    type: taskForm.type,
    dueDate: taskForm.dueDate,
    priority: taskForm.priority,
    assignedTo: taskForm.assignedTo,
    description: taskForm.description,
    status: taskForm.status,
    relatedTo: { ...taskForm.relatedTo },
    createdAt: new Date().toISOString(),
    completedAt: null
  };
  
  // Add to tasks array
  tasks.value.push(newTask);
  
  // Close the modal
  closeTaskModal();
};

// Export leads data
const exportLeads = (format) => {
  // Get filtered leads
  const dataToExport = filteredCustomers.value;
  
  // Hide export menu
  showExportMenu.value = false;
  
  if (dataToExport.length === 0) {
    alert('No data to export');
    return;
  }
  
  // Prepare data for export
  const exportData = dataToExport.map(lead => {
    return {
      'Company Name': lead.name,
      'Contact Name': lead.contactName,
      'Email': lead.email,
      'Location': lead.location,
      'Industry': lead.industry,
      'Status': lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
      'Value': lead.value,
      'Last Contact': lead.lastContact
    };
  });
  
  if (format === 'csv') {
    exportToCSV(exportData, 'leads_export.csv');
  } else if (format === 'json') {
    exportToJSON(exportData, 'leads_export.json');
  } else if (format === 'excel') {
    // In a real application, this would use a library like xlsx
    alert('Excel export would be implemented with a proper library in production');
    exportToCSV(exportData, 'leads_export.csv');
  }
};

// Export to CSV format
const exportToCSV = (data, filename) => {
  if (data.length === 0) return;
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        // Handle values with commas by wrapping in quotes
        const cell = row[header] ? String(row[header]) : '';
        return cell.includes(',') ? `"${cell}"` : cell;
      }).join(',')
    )
  ];
  
  // Create blob and download
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create download link and trigger click
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to JSON format
const exportToJSON = (data, filename) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Get initials from name
const getInitials = (name) => {
  const names = name.split(' ');
  return names.length > 1 
    ? names[0][0] + names[names.length - 1][0] 
    : names[0].substring(0, 2);
};

// Clear all filters
const clearFilters = () => {
  searchTerm.value = '';
  statusFilter.value = '';
  industryFilter.value = '';
  dateFilter.value = '';
};

// Toggle select all
const toggleSelectAll = () => {
  customers.value.forEach(customer => {
    customer.selected = selectAll.value;
  });
};

// Computed property for filtered customers
const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    // Search term filter
    const matchesSearch = !searchTerm.value || 
      customer.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.value.toLowerCase());
    
    // Status filter
    const matchesStatus = !statusFilter.value || customer.status === statusFilter.value;
    
    // Industry filter
    const matchesIndustry = !industryFilter.value || customer.industry === industryFilter.value;
    
    // Date filter (simplified implementation)
    let matchesDate = true;
    if (dateFilter.value === 'today') {
      matchesDate = customer.lastContact === 'Today';
    } else if (dateFilter.value === 'yesterday') {
      matchesDate = customer.lastContact === 'Yesterday';
    } else if (dateFilter.value === 'week') {
      matchesDate = ['Today', 'Yesterday', '2 days ago', '3 days ago', '4 days ago', '5 days ago', '6 days ago'].includes(customer.lastContact);
    } else if (dateFilter.value === 'month') {
      // This is a simplified check - in a real app, you'd parse actual dates
      matchesDate = !customer.lastContact.includes('month') || customer.lastContact.includes('1 month');
    }
    
    return matchesSearch && matchesStatus && matchesIndustry && matchesDate;
  });
});

// Computed property for selected leads
const selectedLeads = computed(() => {
  return customers.value.filter(customer => customer.selected);
});

// Convert lead to opportunity
const convertToOpportunity = (lead) => {
  // Create a modal for confirmation
  const confirmModal = document.createElement('div');
  confirmModal.className = 'fixed inset-0 z-50 overflow-y-auto';
  confirmModal.innerHTML = `
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor" d="M9 12.75L11.25 15 15 9.75M21 10a9 9 0 11-18 0 9 9 0 0118 0Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
              </svg>
              <span class="sr-only">Success icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">Are you sure you want to convert <strong>${lead.name}</strong> to an opportunity? This will move the lead to your opportunities pipeline.</div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" id="confirm-convert" class="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">Convert</button>
          <button type="button" id="cancel-convert" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
        </div>
      </div>
    </div>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  `;
  
  document.body.appendChild(confirmModal);
  
  // Add event listeners to buttons
  document.getElementById('confirm-convert').addEventListener('click', () => {
    // In a real application, you would:
    // 1. Send API request to create a new opportunity
    // 2. Update the lead status or remove it from the leads list
    // 3. Redirect to the opportunity page or show a success message
    
    // For this demo, we'll update the lead status and remove from list
    lead.status = 'converted';
    
    // Remove from leads list
    const index = customers.value.findIndex(c => c === lead);
    if (index !== -1) {
      customers.value.splice(index, 1);
    }
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-50';
    notification.innerHTML = `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
        </svg>
        <span class="sr-only">Success icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">Lead "${lead.name}" has been successfully converted to an opportunity!</div>
      <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
    
    // Remove modal
    confirmModal.remove();
  });
  
  document.getElementById('cancel-convert').addEventListener('click', () => {
    confirmModal.remove();
  });
};
</script>

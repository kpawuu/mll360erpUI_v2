<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <!-- Left: Title with badge -->
        <div class="mb-4 md:mb-0 flex items-center">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Opportunities</h1>
          <span class="bg-violet-100 text-violet-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300 ml-3">
            {{ filteredOpportunities.length }} total
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
            <div v-if="showExportMenu" class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:border dark:border-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a href="#" @click="exportOpportunities('csv')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Export as CSV</a>
                </li>
                <li>
                  <a href="#" @click="exportOpportunities('json')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Export as JSON</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Add New Opportunity button -->
          <button 
            type="button" 
            class="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            @click="openSlidePanel('add')"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
            </svg>
            New Opportunity
          </button>
        </div>
      </div>
    </div>

    <!-- Pipeline Process Visualization -->
    <div class="mb-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Sales Pipeline</h3>
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
          Total Pipeline Value: <span class="text-violet-600 dark:text-violet-400 font-bold">${{ getTotalPipelineValue() }}</span>
        </div>
      </div>
      
      <div class="relative mb-8">
        <!-- Pipeline progress bar -->
        <div class="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
          <div class="flex h-full">
            <div class="bg-purple-500 h-full" :style="{ width: getPipelinePercentage('qualification') + '%' }"></div>
            <div class="bg-blue-500 h-full" :style="{ width: getPipelinePercentage('discovery') + '%' }"></div>
            <div class="bg-yellow-500 h-full" :style="{ width: getPipelinePercentage('proposal') + '%' }"></div>
            <div class="bg-orange-500 h-full" :style="{ width: getPipelinePercentage('negotiation') + '%' }"></div>
            <div class="bg-green-500 h-full" :style="{ width: getPipelinePercentage('closed-won') + '%' }"></div>
            <div class="bg-red-500 h-full" :style="{ width: getPipelinePercentage('closed-lost') + '%' }"></div>
          </div>
        </div>
        
        <!-- Pipeline stages -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Qualification</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ getOpportunitiesByStage('qualification').length }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Opportunities</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-purple-600 dark:text-purple-400">${{ getTotalValueByStage('qualification') }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Value</div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Discovery</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ getOpportunitiesByStage('discovery').length }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Opportunities</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${{ getTotalValueByStage('discovery') }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Value</div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Proposal</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ getOpportunitiesByStage('proposal').length }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Opportunities</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400">${{ getTotalValueByStage('proposal') }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Value</div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Negotiation</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ getOpportunitiesByStage('negotiation').length }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Opportunities</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-orange-600 dark:text-orange-400">${{ getTotalValueByStage('negotiation') }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Value</div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Closed Won</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ getOpportunitiesByStage('closed-won').length }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Opportunities</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-green-600 dark:text-green-400">${{ getTotalValueByStage('closed-won') }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Value</div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">Closed Lost</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ getOpportunitiesByStage('closed-lost').length }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Opportunities</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-red-600 dark:text-red-400">${{ getTotalValueByStage('closed-lost') }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile pipeline summary -->
      <div class="block md:hidden">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white">Pipeline Summary</h4>
          <button 
            type="button" 
            @click="showMobileSummary = !showMobileSummary"
            class="text-gray-500 dark:text-gray-400"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" :class="{ 'rotate-180': showMobileSummary }">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7m11 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
            </svg>
          </button>
        </div>
        
        <div v-if="showMobileSummary" class="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Total Opportunities</div>
              <div class="text-lg font-bold text-gray-900 dark:text-white">{{ filteredOpportunities.length }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Avg. Deal Size</div>
              <div class="text-lg font-bold text-violet-600 dark:text-violet-400">${{ getAverageDealSize() }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Win Rate</div>
              <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ getWinRate() }}%</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Avg. Sales Cycle</div>
              <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ getAverageSalesCycle() }} days</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and search -->
    <div class="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Left side: View toggle -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
            <button 
              type="button" 
              @click="viewMode = 'table'" 
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                viewMode === 'table' 
                  ? 'text-white bg-gradient-to-r from-purple-500 to-violet-500 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              ]"
            >
              <span class="flex items-center">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5zm-1 9v-1h5v2H5a1 1 0 0 1-1-1zm7 1h4a1 1 0 0 0 1-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"/>
                </svg>
                Table
              </span>
            </button>
            <button 
              type="button" 
              @click="viewMode = 'kanban'" 
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                viewMode === 'kanban' 
                  ? 'text-white bg-gradient-to-r from-purple-500 to-violet-500 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              ]"
            >
              <span class="flex items-center">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zM5 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5zM11 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5zM11 13a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2z"/>
                </svg>
                Kanban
              </span>
            </button>
          </div>
        </div>
        
        <!-- Right side: Filters -->
        <div class="flex flex-wrap items-center gap-3 flex-grow">
          <!-- Stage filter -->
          <div class="relative flex-grow max-w-xs">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M.75 15a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 0-1.5H.75ZM0 8.5A.75.75 0 0 1 .75 8h18.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.5Zm.75-7a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 0-1.5H.75Z"/>
              </svg>
            </div>
            <select 
              id="stage-filter" 
              v-model="stageFilter" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            >
              <option value="">All Stages</option>
              <option value="qualification">Qualification</option>
              <option value="discovery">Discovery</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed-won">Closed Won</option>
              <option value="closed-lost">Closed Lost</option>
            </select>
          </div>
          
          <!-- Search -->
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM7 7l6-6M7 7l-6 6"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="opportunity-search" 
              v-model="searchTerm" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" 
              placeholder="Search opportunities..."
            >
          </div>
          
          <!-- Clear filters button -->
          <button
            type="button"
            class="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
            @click="clearFilters"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-if="viewMode === 'table'" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          All Opportunities
          <span class="bg-violet-100 text-violet-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-violet-900 dark:text-violet-300 ml-3">
            {{ filteredOpportunities.length }}
          </span>
        </h2>
      </div>
      
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Opportunity</th>
              <th scope="col" class="px-6 py-3">Customer</th>
              <th scope="col" class="px-6 py-3">Stage</th>
              <th scope="col" class="px-6 py-3">Value</th>
              <th scope="col" class="px-6 py-3">Owner</th>
              <th scope="col" class="px-6 py-3">Probability</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(opportunity, index) in filteredOpportunities" :key="index" class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ opportunity.name }}
              </th>
              <td class="px-6 py-4">{{ opportunity.customer }}</td>
              <td class="px-6 py-4">
                <span :class="getStageClass(opportunity.stage)">
                  {{ formatStage(opportunity.stage) }}
                </span>
              </td>
              <td class="px-6 py-4 font-medium">{{ opportunity.value }}</td>
              
              <td class="px-6 py-4">{{ opportunity.owner }}</td>
              <td class="px-6 py-4">
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div :class="getProbabilityColorClass(opportunity.probability)" class="h-2.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
                </div>
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 block">{{ opportunity.probability }}%</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button 
                    type="button" 
                    class="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                    @click="openSlidePanel('edit', opportunity)"
                  >
                    <svg class="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    type="button" 
                    style="background: linear-gradient(to right, #ef4444, #f87171);"
                    class="text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                    @click="archiveOpportunity(opportunity)"
                  >
                    <svg class="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M1 5h18M7 8v8m6-8v8"/>
                    </svg>
                    Archive
                  </button>
                  <button 
                    type="button" 
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center"
                    @click="openTaskModal(opportunity)"
                  >
                    <svg class="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm7 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                    </svg>
                    Add Task
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredOpportunities.length === 0">
              <td colspan="8" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg class="w-10 h-10 mb-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p>No opportunities found matching your criteria</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <nav class="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 p-4 border-t border-gray-200 dark:border-gray-700" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-900 dark:text-white">1-{{ Math.min(filteredOpportunities.length, 10) }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ filteredOpportunities.length }}</span>
        </span>
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Previous</span>
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-violet-600 border border-violet-300 bg-violet-50 hover:bg-violet-100 hover:text-violet-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
          </li>
          <li>
            <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Next</span>
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Kanban View -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <!-- Qualification Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span class="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
            Qualification
          </h3>
          <span class="text-sm font-medium bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
            ${{ getTotalValueByStage('qualification') }}
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="opportunity in getOpportunitiesByStage('qualification')" :key="opportunity.id" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
            <h4 class="font-medium text-gray-900 dark:text-white">{{ opportunity.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.customer }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ opportunity.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {{ opportunity.closeDate }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div :class="getProbabilityColorClass(opportunity.probability)" class="h-1.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
            </div>
          </div>
          <div v-if="getOpportunitiesByStage('qualification').length === 0" class="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            No opportunities in this stage
          </div>
        </div>
      </div>

      <!-- Discovery Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span class="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            Discovery
          </h3>
          <span class="text-sm font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            ${{ getTotalValueByStage('discovery') }}
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="opportunity in getOpportunitiesByStage('discovery')" :key="opportunity.id" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <h4 class="font-medium text-gray-900 dark:text-white">{{ opportunity.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.customer }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ opportunity.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {{ opportunity.closeDate }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div :class="getProbabilityColorClass(opportunity.probability)" class="h-1.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
            </div>
          </div>
          <div v-if="getOpportunitiesByStage('discovery').length === 0" class="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            No opportunities in this stage
          </div>
        </div>
      </div>

      <!-- Proposal Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span class="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            Proposal
          </h3>
          <span class="text-sm font-medium bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            ${{ getTotalValueByStage('proposal') }}
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="opportunity in getOpportunitiesByStage('proposal')" :key="opportunity.id" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-700 transition-colors">
            <h4 class="font-medium text-gray-900 dark:text-white">{{ opportunity.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.customer }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ opportunity.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {{ opportunity.closeDate }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div :class="getProbabilityColorClass(opportunity.probability)" class="h-1.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
            </div>
          </div>
          <div v-if="getOpportunitiesByStage('proposal').length === 0" class="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            No opportunities in this stage
          </div>
        </div>
      </div>

      <!-- Negotiation Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span class="inline-block w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
            Negotiation
          </h3>
          <span class="text-sm font-medium bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
            ${{ getTotalValueByStage('negotiation') }}
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="opportunity in getOpportunitiesByStage('negotiation')" :key="opportunity.id" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
            <h4 class="font-medium text-gray-900 dark:text-white">{{ opportunity.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.customer }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ opportunity.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {{ opportunity.closeDate }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div :class="getProbabilityColorClass(opportunity.probability)" class="h-1.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
            </div>
          </div>
          <div v-if="getOpportunitiesByStage('negotiation').length === 0" class="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            No opportunities in this stage
          </div>
        </div>
      </div>

      <!-- Closed Won Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span class="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            Closed Won
          </h3>
          <span class="text-sm font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            ${{ getTotalValueByStage('closed-won') }}
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="opportunity in getOpportunitiesByStage('closed-won')" :key="opportunity.id" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <h4 class="font-medium text-gray-900 dark:text-white">{{ opportunity.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.customer }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ opportunity.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {{ opportunity.closeDate }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div :class="getProbabilityColorClass(opportunity.probability)" class="h-1.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
            </div>
          </div>
          <div v-if="getOpportunitiesByStage('closed-won').length === 0" class="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            No opportunities in this stage
          </div>
        </div>
      </div>

      <!-- Closed Lost Column -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span class="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            Closed Lost
          </h3>
          <span class="text-sm font-medium bg-red-100 text-red-800 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            ${{ getTotalValueByStage('closed-lost') }}
          </span>
        </div>
        <div class="space-y-3">
          <div v-for="opportunity in getOpportunitiesByStage('closed-lost')" :key="opportunity.id" class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700 transition-colors">
            <h4 class="font-medium text-gray-900 dark:text-white">{{ opportunity.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ opportunity.customer }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ opportunity.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                {{ opportunity.closeDate }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div :class="getProbabilityColorClass(opportunity.probability)" class="h-1.5 rounded-full" :style="{ width: opportunity.probability + '%' }"></div>
            </div>
          </div>
          <div v-if="getOpportunitiesByStage('closed-lost').length === 0" class="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            No opportunities in this stage
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal for Add/Edit Opportunity -->
  <div v-if="slidePanelOpen" id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-700 dark:to-violet-700">
          <h3 class="text-xl font-semibold text-white">
            <div class="flex items-center">
              {{ editMode ? 'Edit Opportunity' : 'Add New Opportunity' }}
            </div>
          </h3>
          <button type="button" class="text-white bg-transparent hover:bg-violet-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeSlidePanel">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <form @submit.prevent="saveOpportunity">
            <!-- Opportunity Information Section -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
                  Opportunity Information
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Basic information about the opportunity.</p>
              </div>
              
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Opportunity Name -->
                <div class="col-span-2">
                  <label for="opportunity-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opportunity Name</label>
                  <input type="text" id="opportunity-name" v-model="opportunityForm.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. Global Expansion Project" required>
                </div>
                
                <!-- Customer -->
                <div>
                  <label for="customer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer</label>
                  <input type="text" id="customer" v-model="opportunityForm.customer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. Acme Inc." required>
                </div>
                
                <!-- Stage -->
                <div>
                  <label for="stage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stage</label>
                  <select id="stage" v-model="opportunityForm.stage" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" required>
                    <option value="qualification">Qualification</option>
                    <option value="discovery">Discovery</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                  </select>
                </div>
                
                <!-- Value -->
                <div>
                  <label for="value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Value</label>
                  <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input type="text" id="value" v-model="opportunityForm.value" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-violet-500 focus:border-violet-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. 1.5M" required>
                  </div>
                </div>
                
                <!-- Close Date -->
                <div>
                  <label for="close-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Close Date</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                      </svg>
                    </div>
                    <input type="date" id="close-date" v-model="opportunityForm.closeDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" required>
                  </div>
                </div>
                
                <!-- Owner -->
                <div>
                  <label for="owner" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner</label>
                  <input type="text" id="owner" v-model="opportunityForm.owner" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. John Smith" required>
                </div>
                
                <!-- Probability -->
                <div>
                  <label for="probability" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Probability (%)</label>
                  <input type="number" id="probability" v-model="opportunityForm.probability" min="0" max="100" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="e.g. 50" required>
                </div>
                
                <!-- Notes -->
                <div class="col-span-2">
                  <label for="notes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                  <textarea id="notes" v-model="opportunityForm.notes" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" placeholder="Additional notes about this opportunity..."></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Modal footer -->
        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
          <button 
            type="button" 
            class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="closeSlidePanel"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="text-white bg-gradient-to-r from-purple-500 to-violet-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-2"
            @click="saveOpportunity"
          >
            {{ editMode ? 'Update' : 'Create' }}
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
              Add Task for {{ currentOpportunity ? currentOpportunity.name : '' }}
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
</template>

<script setup>
import { ref, computed } from 'vue';

// View mode state (table or kanban)
const viewMode = ref('table');
const searchTerm = ref('');
const stageFilter = ref('');
const showExportMenu = ref(false);
const showMobileSummary = ref(false);
const slidePanelOpen = ref(false);
const editMode = ref(false);
const currentOpportunity = ref(null);
const taskModalOpen = ref(false);

// Form for opportunity data
const opportunityForm = ref({
  name: '',
  customer: '',
  stage: 'qualification',
  value: '',
  closeDate: '',
  owner: '',
  probability: 50,
  notes: ''
});

// Form for task data
const taskForm = ref({
  title: '',
  type: 'call',
  dueDate: new Date().toISOString().split('T')[0], // Today's date
  priority: 'medium',
  assignedTo: 'John Doe',
  description: '',
  status: 'not-started',
  relatedTo: {
    type: 'opportunity',
    id: null,
    name: ''
  }
});

// Sample opportunity data
const opportunities = ref([
  {
    id: 1,
    name: 'TechnoGlobal Asia Expansion Project',
    customer: 'TechnoGlobal Industries',
    stage: 'proposal',
    value: '$2.5M',
    closeDate: 'Jun 30, 2025',
    owner: 'Sarah Johnson',
    probability: 70
  },
  {
    id: 2,
    name: 'NexGen Robotics Supply Chain',
    customer: 'NexGen Robotics',
    stage: 'discovery',
    value: '$450K',
    closeDate: 'Jul 15, 2025',
    owner: 'David Chen',
    probability: 40
  },
  {
    id: 3,
    name: 'GlobalTech Warehouse Expansion',
    customer: 'GlobalTech Solutions',
    stage: 'closed-won',
    value: '$1.2M',
    closeDate: 'May 1, 2025',
    owner: 'Michael Rodriguez',
    probability: 100
  },
  {
    id: 4,
    name: 'Quantum Logistics Fleet Management',
    customer: 'Quantum Logistics',
    stage: 'qualification',
    value: '$350K',
    closeDate: 'Aug 10, 2025',
    owner: 'Robert Kim',
    probability: 20
  },
  {
    id: 5,
    name: 'Pinnacle Manufacturing Automation',
    customer: 'Pinnacle Manufacturing',
    stage: 'negotiation',
    value: '$750K',
    closeDate: 'Jun 15, 2025',
    owner: 'Jennifer Lee',
    probability: 80
  },
  {
    id: 6,
    name: 'MediCore Health Systems Integration',
    customer: 'MediCore Health Systems',
    stage: 'proposal',
    value: '$1.8M',
    closeDate: 'Jul 30, 2025',
    owner: 'Thomas Wilson',
    probability: 65
  },
  {
    id: 7,
    name: 'FinServe Digital Transformation',
    customer: 'FinServe Partners',
    stage: 'closed-won',
    value: '$3.2M',
    closeDate: 'Apr 15, 2025',
    owner: 'Emily Zhang',
    probability: 100
  },
  {
    id: 8,
    name: 'EcoSmart Energy Solutions',
    customer: 'EcoSmart Solutions',
    stage: 'closed-lost',
    value: '$620K',
    closeDate: 'May 20, 2025',
    owner: 'Alex Morgan',
    probability: 0
  }
]);

// Sample task data
const tasks = ref([]);

// Filtered opportunities based on search and filters
const filteredOpportunities = computed(() => {
  return opportunities.value.filter(opportunity => {
    // Search term filter
    const matchesSearch = !searchTerm.value || 
      opportunity.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      opportunity.customer.toLowerCase().includes(searchTerm.value.toLowerCase());
    
    // Stage filter
    const matchesStage = !stageFilter.value || opportunity.stage === stageFilter.value;
    
    return matchesSearch && matchesStage;
  });
});

// Get opportunities by stage for kanban view
const getOpportunitiesByStage = (stage) => {
  return filteredOpportunities.value.filter(opportunity => opportunity.stage === stage);
};

// Format stage name for display
const formatStage = (stage) => {
  if (stage === 'closed-won') return 'Closed Won';
  if (stage === 'closed-lost') return 'Closed Lost';
  return stage.charAt(0).toUpperCase() + stage.slice(1);
};

// Get CSS class for stage badge
const getStageClass = (stage) => {
  const baseClass = 'bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
  
  if (stage === 'qualification') {
    return 'bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300';
  } else if (stage === 'discovery') {
    return 'bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
  } else if (stage === 'proposal') {
    return 'bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300';
  } else if (stage === 'negotiation') {
    return 'bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300';
  } else if (stage === 'closed-won') {
    return 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300';
  } else if (stage === 'closed-lost') {
    return 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300';
  }
  
  return baseClass;
};

// Get CSS class for probability bar color
const getProbabilityColorClass = (probability) => {
  if (probability === 100) return 'bg-green-600';
  if (probability === 0) return 'bg-red-600';
  if (probability >= 70) return 'bg-primary-600';
  if (probability >= 40) return 'bg-yellow-500';
  return 'bg-orange-500';
};

// Clear filters
const clearFilters = () => {
  searchTerm.value = '';
  stageFilter.value = '';
};

// Export opportunities
const exportOpportunities = (format) => {
  // Implement export logic here
};

// Get total value by stage
const getTotalValueByStage = (stage) => {
  const opportunitiesInStage = getOpportunitiesByStage(stage);
  const totalValue = opportunitiesInStage.reduce((acc, opportunity) => {
    const value = parseFloat(opportunity.value.replace('$', '').replace('M', '000000'));
    return acc + value;
  }, 0);
  return `$${(totalValue / 1000000).toFixed(1)}M`;
};

// Get pipeline percentage by stage
const getPipelinePercentage = (stage) => {
  const opportunitiesInStage = getOpportunitiesByStage(stage);
  const totalOpportunities = filteredOpportunities.value.length;
  return (opportunitiesInStage.length / totalOpportunities) * 100;
};

// Get total pipeline value
const getTotalPipelineValue = () => {
  const totalValue = filteredOpportunities.value.reduce((acc, opportunity) => {
    const value = parseFloat(opportunity.value.replace('$', '').replace('M', '000000'));
    return acc + value;
  }, 0);
  return `$${(totalValue / 1000000).toFixed(1)}M`;
};

// Get average deal size
const getAverageDealSize = () => {
  const totalValue = filteredOpportunities.value.reduce((acc, opportunity) => {
    const value = parseFloat(opportunity.value.replace('$', '').replace('M', '000000'));
    return acc + value;
  }, 0);
  return `$${(totalValue / filteredOpportunities.value.length / 1000000).toFixed(1)}M`;
};

// Get win rate
const getWinRate = () => {
  const wonOpportunities = filteredOpportunities.value.filter(opportunity => opportunity.stage === 'closed-won').length;
  return ((wonOpportunities / filteredOpportunities.value.length) * 100).toFixed(0);
};

// Get average sales cycle
const getAverageSalesCycle = () => {
  const totalDays = filteredOpportunities.value.reduce((acc, opportunity) => {
    const closeDate = new Date(opportunity.closeDate);
    const createDate = new Date(opportunity.createDate);
    const days = Math.round((closeDate - createDate) / (1000 * 3600 * 24));
    return acc + days;
  }, 0);
  return Math.round(totalDays / filteredOpportunities.value.length);
};

// Open slide panel for add or edit
const openSlidePanel = (mode, opportunity = null) => {
  slidePanelOpen.value = true;
  
  if (mode === 'edit' && opportunity) {
    editMode.value = true;
    currentOpportunity.value = opportunity;
    
    // Populate form with opportunity data
    opportunityForm.value.name = opportunity.name;
    opportunityForm.value.customer = opportunity.customer;
    opportunityForm.value.stage = opportunity.stage;
    opportunityForm.value.value = opportunity.value.replace('$', '');
    opportunityForm.value.closeDate = formatDateForInput(opportunity.closeDate);
    opportunityForm.value.owner = opportunity.owner;
    opportunityForm.value.probability = opportunity.probability;
    opportunityForm.value.notes = opportunity.notes || '';
  } else {
    editMode.value = false;
    currentOpportunity.value = null;
    
    // Reset form for new opportunity
    opportunityForm.value.name = '';
    opportunityForm.value.customer = '';
    opportunityForm.value.stage = 'qualification';
    opportunityForm.value.value = '';
    opportunityForm.value.closeDate = '';
    opportunityForm.value.owner = '';
    opportunityForm.value.probability = 50;
    opportunityForm.value.notes = '';
  }
};

// Close slide panel
const closeSlidePanel = () => {
  slidePanelOpen.value = false;
};

// Open task modal
const openTaskModal = (opportunity) => {
  taskModalOpen.value = true;
  currentOpportunity.value = opportunity;
  
  // Reset form and set related opportunity
  taskForm.value.title = '';
  taskForm.value.type = 'call';
  taskForm.value.dueDate = new Date().toISOString().split('T')[0];
  taskForm.value.priority = 'medium';
  taskForm.value.assignedTo = 'John Doe';
  taskForm.value.description = '';
  taskForm.value.status = 'not-started';
  taskForm.value.relatedTo = {
    type: 'opportunity',
    id: opportunity.id,
    name: opportunity.name
  };
};

// Close task modal
const closeTaskModal = () => {
  taskModalOpen.value = false;
};

// Save opportunity
const saveOpportunity = () => {
  // Format value to include $ sign if it doesn't already
  if (opportunityForm.value.value && !opportunityForm.value.value.startsWith('$')) {
    opportunityForm.value.value = '$' + opportunityForm.value.value;
  }
  
  // Format the date
  const formattedDate = formatDateFromInput(opportunityForm.value.closeDate);
  
  if (editMode.value && currentOpportunity.value) {
    // Update existing opportunity
    const index = opportunities.value.findIndex(o => o.id === currentOpportunity.value.id);
    if (index !== -1) {
      opportunities.value[index] = {
        ...currentOpportunity.value,
        name: opportunityForm.value.name,
        customer: opportunityForm.value.customer,
        stage: opportunityForm.value.stage,
        value: opportunityForm.value.value,
        closeDate: formattedDate,
        owner: opportunityForm.value.owner,
        probability: parseInt(opportunityForm.value.probability),
        notes: opportunityForm.value.notes
      };
    }
  } else {
    // Create new opportunity
    const newId = opportunities.value.length > 0 
      ? Math.max(...opportunities.value.map(o => o.id)) + 1 
      : 1;
      
    opportunities.value.push({
      id: newId,
      name: opportunityForm.value.name,
      customer: opportunityForm.value.customer,
      stage: opportunityForm.value.stage,
      value: opportunityForm.value.value,
      closeDate: formattedDate,
      owner: opportunityForm.value.owner,
      probability: parseInt(opportunityForm.value.probability),
      notes: opportunityForm.value.notes,
      createDate: new Date().toISOString().split('T')[0] // Today's date
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
    title: taskForm.value.title,
    type: taskForm.value.type,
    dueDate: taskForm.value.dueDate,
    priority: taskForm.value.priority,
    assignedTo: taskForm.value.assignedTo,
    description: taskForm.value.description,
    status: taskForm.value.status,
    relatedTo: { ...taskForm.value.relatedTo },
    createdAt: new Date().toISOString(),
    completedAt: null
  };
  
  // Add to tasks array
  tasks.value.push(newTask);
  
  // Close the modal
  closeTaskModal();
};

// Archive opportunity
const archiveOpportunity = (opportunity) => {
  // In a real app, you might set a status to 'archived' instead of removing
  // For this demo, we'll just remove it from the list
  const index = opportunities.value.findIndex(o => o.id === opportunity.id);
  if (index !== -1) {
    // You could also move it to an archived list
    opportunities.value.splice(index, 1);
  }
};

// Format date for input field (MM/DD/YYYY to YYYY-MM-DD)
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  const months = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  
  // Parse date in format "Jun 30, 2025"
  const parts = dateString.split(' ');
  if (parts.length === 3) {
    const month = months[parts[0]];
    const day = parts[1].replace(',', '').padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  
  return '';
};

// Format date from input (YYYY-MM-DD to MMM DD, YYYY)
const formatDateFromInput = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};
</script>

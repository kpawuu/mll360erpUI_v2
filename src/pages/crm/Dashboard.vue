<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Dashboard Header -->
    <div class="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-4 sm:mb-0">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p class="mt-1 text-gray-600 dark:text-gray-400">Welcome back! Here's your sales overview</p>
        </div>
        <div class="flex items-center space-x-3">
          <select class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
            <option>Last 30 days</option>
            <option>Last quarter</option>
            <option>This year</option>
          </select>
          <button @click="goToNewDeal" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Deal
          </button>
        </div>
      </div>
    </div>

    <div class="p-6">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Revenue Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
                  </svg>
                </div>
            </div>
            <!-- Dropdown menu for card actions -->
            <div class="relative">
              <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
            <div class="flex items-baseline mt-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(totalRevenue) }}</h3>
              <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
                      </svg>
                +8.2%
                    </span>
                  </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Goal: $120K</span>
                <span class="font-medium text-gray-700 dark:text-gray-300">72%</span>
              </div>
              <div class="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: 72%"></div>
              </div>
              </div>
            </div>
          </div>

          <!-- Customers Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
            </div>
            <div class="relative">
              <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
            <div class="flex items-baseline mt-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalCustomers.toLocaleString() }}</h3>
              <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
                      </svg>
                +12.5%
                    </span>
                  </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Goal: 2,500</span>
                <span class="font-medium text-gray-700 dark:text-gray-300">85%</span>
              </div>
              <div class="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full transition-all" style="width: 85%"></div>
              </div>
              </div>
            </div>
          </div>

          <!-- Conversion Rate Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
            </div>
            <div class="relative">
              <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
            <div class="flex items-baseline mt-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ conversionRate }}%</h3>
              <span class="ml-2 text-sm font-medium text-red-600 dark:text-red-400 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd"></path>
                      </svg>
                -3.1%
                    </span>
                  </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Goal: 28%</span>
                <span class="font-medium text-gray-700 dark:text-gray-300">65%</span>
              </div>
              <div class="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full transition-all" style="width: 65%"></div>
              </div>
              </div>
            </div>
          </div>

          <!-- Active Deals Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                </div>
            </div>
            <div class="relative">
              <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Deals</p>
            <div class="flex items-baseline mt-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ activeOpportunities.length }}</h3>
              <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
                      </svg>
                +5.8%
                    </span>
                  </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Goal: 40</span>
                <span class="font-medium text-gray-700 dark:text-gray-300">90%</span>
              </div>
              <div class="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-orange-600 h-2 rounded-full transition-all" style="width: 90%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sales Pipeline & Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Pipeline Chart -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
                  <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sales Pipeline</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatValue(pipelineTotalValue) }} total value · {{ opportunities.length }} opportunities</p>
                  </div>
            <div class="flex items-center space-x-3">
              <select class="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
                      <option>Last 30 days</option>
                      <option>Last quarter</option>
                      <option>Year to date</option>
                    </select>
              <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40 rounded-lg transition-colors">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Export
                  </button>
                </div>
              </div>

          <!-- Modern Funnel Pipeline -->
          <div class="relative">
            <div class="space-y-3" v-if="dashboardLoading">
              <div class="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div class="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div class="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div class="space-y-3" v-else>
              <template v-for="(stage, idx) in pipelineByStage" :key="stage.id">
                <div class="group relative">
                  <div :class="[
                    'flex items-center p-4 rounded-xl border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer',
                    stage.color === 'green' ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-500' :
                    stage.color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-500' :
                    stage.color === 'indigo' ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-500' :
                    stage.color === 'purple' ? 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-500' :
                    'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-500'
                  ]">
                    <div class="flex items-center flex-1">
                      <div :class="[
                        'flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold text-sm mr-4',
                        stage.color === 'green' ? 'bg-green-500' : stage.color === 'blue' ? 'bg-blue-500' : stage.color === 'indigo' ? 'bg-indigo-500' : stage.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                      ]">
                        <span v-if="stage.color !== 'green'">{{ idx + 1 }}</span>
                        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      </div>
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ stage.name }}</h4>
                          <div class="text-xs">
                            <span class="font-medium">{{ stage.count }} deals</span>
                            <span class="mx-1">·</span>
                            <span class="font-bold">{{ formatValue(stage.value) }}</span>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-4">
                            <div class="h-2 rounded-full transition-all duration-500" :style="{ width: pipelineTotalValue ? Math.round((stage.value / pipelineTotalValue) * 100) + '%' : '0%' }" :class="stage.color === 'green' ? 'bg-green-500' : stage.color === 'blue' ? 'bg-blue-500' : stage.color === 'indigo' ? 'bg-indigo-500' : stage.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'"></div>
                          </div>
                          <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ pipelineTotalValue ? Math.round((stage.value / pipelineTotalValue) * 100) : 0 }}% of pipeline</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="idx < pipelineByStage.length - 1" class="flex justify-center py-2">
                    <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>
              </template>
              <div v-if="!dashboardLoading && pipelineByStage.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">No pipeline stages. Configure stages in Settings.</div>
            </div>

            <!-- Pipeline Summary -->
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="grid grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ opportunities.length }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Total Opportunities</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ conversionRate }}%</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Overall Win Rate</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ activeOpportunities.length }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Active Deals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats with Charts -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Stats</h3>
          
          <div class="space-y-6">
            <!-- Total Pipeline with Mini Bar Chart -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Total Pipeline</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">$3.0M</span>
              </div>
              <div class="flex items-end space-x-1 h-8">
                <div class="w-2 bg-blue-200 dark:bg-blue-800 rounded-t" style="height: 60%"></div>
                <div class="w-2 bg-blue-300 dark:bg-blue-700 rounded-t" style="height: 80%"></div>
                <div class="w-2 bg-blue-400 dark:bg-blue-600 rounded-t" style="height: 100%"></div>
                <div class="w-2 bg-blue-500 dark:bg-blue-500 rounded-t" style="height: 90%"></div>
                <div class="w-2 bg-blue-600 dark:bg-blue-400 rounded-t" style="height: 70%"></div>
                <div class="w-2 bg-blue-700 dark:bg-blue-300 rounded-t" style="height: 85%"></div>
                <div class="w-2 bg-blue-800 dark:bg-blue-200 rounded-t" style="height: 95%"></div>
              </div>
            </div>

            <!-- Win Rate with Circular Progress -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Win Rate</span>
                <span class="text-sm font-semibold text-green-600 dark:text-green-400">24%</span>
              </div>
              <div class="flex items-center space-x-4">
                <div class="relative w-16 h-16">
                  <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      class="text-gray-200 dark:text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      class="text-green-500"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-dasharray="24, 100"
                      stroke-linecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">24%</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-xs text-gray-500 dark:text-gray-400">vs last month</div>
                  <div class="flex items-center text-xs text-green-600 dark:text-green-400">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
                    </svg>
                    +3.2%
                  </div>
                </div>
              </div>
                  </div>

            <!-- Avg Deal Size with Trend Line -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Avg. Deal Size</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">$250K</span>
                    </div>
              <div class="h-6 flex items-end">
                <svg class="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    stroke-width="2"
                    points="0,15 20,12 40,8 60,10 80,6 100,4"
                  />
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    stroke-width="1"
                    stroke-opacity="0.3"
                    points="0,20 20,17 40,13 60,15 80,11 100,9"
                  />
                </svg>
                        </div>
                      </div>

            <!-- Sales Cycle with Progress Bars -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Sales Cycle</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">45 days</span>
                    </div>
              <div class="space-y-1">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Target: 30 days</span>
                  <span>Current: 45 days</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-orange-500 h-2 rounded-full" style="width: 67%"></div>
                        </div>
                      </div>
                    </div>

            <!-- Monthly Forecast with Donut Chart -->
            <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Monthly Forecast</span>
                <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">+18%</span>
              </div>
              <div class="flex items-center space-x-4">
                <div class="relative w-14 h-14">
                  <svg class="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      class="text-gray-200 dark:text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      class="text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-dasharray="72, 100"
                      stroke-linecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">72%</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-xs text-gray-500 dark:text-gray-400">of target achieved</div>
                  <div class="text-xs font-medium text-gray-700 dark:text-gray-300">$2.16M / $3.0M</div>
                    </div>
                        </div>
                      </div>

            <!-- Quick Performance Indicators -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Performance</h4>
              <div class="grid grid-cols-2 gap-3">
                <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div class="text-xs text-green-600 dark:text-green-400 font-medium">Deals Won</div>
                  <div class="text-lg font-bold text-green-700 dark:text-green-300">24</div>
                  <div class="flex justify-center mt-1">
                    <div class="flex space-x-1">
                      <div class="w-1 h-1 bg-green-400 rounded-full"></div>
                      <div class="w-1 h-2 bg-green-500 rounded-full"></div>
                      <div class="w-1 h-3 bg-green-600 rounded-full"></div>
                      <div class="w-1 h-2 bg-green-500 rounded-full"></div>
                      <div class="w-1 h-1 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="text-xs text-blue-600 dark:text-blue-400 font-medium">Active</div>
                  <div class="text-lg font-bold text-blue-700 dark:text-blue-300">36</div>
                  <div class="flex justify-center mt-1">
                    <div class="flex space-x-1">
                      <div class="w-1 h-2 bg-blue-400 rounded-full"></div>
                      <div class="w-1 h-3 bg-blue-500 rounded-full"></div>
                      <div class="w-1 h-1 bg-blue-600 rounded-full"></div>
                      <div class="w-1 h-3 bg-blue-500 rounded-full"></div>
                      <div class="w-1 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Recent Activities & Opportunities -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <!-- Recent Opportunities -->
        <div class="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Opportunities</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Latest deals in your pipeline</p>
              </div>
              <button @click="goToOpportunities" class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40 rounded-lg transition-colors">
                View All
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="opp in recentOpportunities" :key="opp.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full mr-3" :class="opp.color === 'green' ? 'bg-green-500' : opp.color === 'blue' ? 'bg-blue-500' : opp.color === 'indigo' ? 'bg-indigo-500' : opp.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'"></div>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ opp.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ opp.company }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="opp.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : opp.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'">{{ opp.stage }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ formatValue(opp.value) }}</td>
                </tr>
                <tr v-if="recentOpportunities.length === 0 && !dashboardLoading">
                  <td colspan="4" class="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No opportunities yet. <button @click="goToNewDeal" class="text-blue-600 dark:text-blue-400 font-medium">Create one</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          
        <!-- Recent Activities -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
            <button @click="goToActivities" class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>
          
          <div class="space-y-4">
            <div v-for="act in recentActivitiesFormatted" :key="act.id" class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900 dark:text-white">{{ act.message }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ act.time }}</p>
              </div>
            </div>
            <div v-if="recentActivitiesFormatted.length === 0 && !dashboardLoading" class="text-center py-6 text-sm text-gray-500 dark:text-gray-400">No recent activities.</div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
            <div class="grid grid-cols-2 gap-3">
              <button @click="goToNewDeal" class="inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Deal
              </button>
              <button @click="goToActivities" class="inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h2m12 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h2"></path>
                </svg>
                Schedule
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOpportunitiesStore } from '../../store/opportunities.store'
import { useStagesStore } from '../../store/stages.store'
import { useActivitiesStore } from '../../store/activities.store'
import { useLogisticsContractInvoicesStore } from '../../store/logistics-contract-invoices.store'
import { useEntityStore } from '../../store/entity.store'
import { useAuthStore } from '../../store/auth.store'

const router = useRouter()
const opportunitiesStore = useOpportunitiesStore()
const stagesStore = useStagesStore()
const activitiesStore = useActivitiesStore()
const invoicesStore = useLogisticsContractInvoicesStore()
const entityStore = useEntityStore()
const authStore = useAuthStore()

const dashboardLoading = ref(true)

// Load all dashboard data
async function loadDashboardData() {
  dashboardLoading.value = true
  try {
    const companyId = authStore.user?.company_id
    if (!companyId) {
      dashboardLoading.value = false
      return
    }
    await Promise.all([
      opportunitiesStore.fetchOpportunities({ query: { $limit: 500, $sort: { date_created: -1 } } }),
      stagesStore.fetchStages({ query: { $limit: 100 } }),
      activitiesStore.fetchActivities({ $limit: 20, $sort: { date_created: -1 } }),
      invoicesStore.fetchInvoices({ query: { $limit: 500 } }),
      entityStore.fetchEntitiesByCompany(companyId)
    ])
  } catch (e) {
    console.error('Dashboard load error:', e)
  } finally {
    dashboardLoading.value = false
  }
}

const stages = computed(() => stagesStore.getStages || [])
const opportunities = computed(() => opportunitiesStore.getOpportunities || [])
const activities = computed(() => activitiesStore.getActivitiesList || [])
const invoices = computed(() => invoicesStore.getInvoices || [])
const entities = computed(() => entityStore.getEntities || [])

// Won stage: typically the last stage or one named "Closed Won" / "Won"
const wonStageNames = ['closed won', 'won', 'closed']
const wonStageIds = computed(() =>
  stages.value
    .filter(s => wonStageNames.some(n => (s.name || '').toLowerCase().includes(n)))
    .map(s => s.id)
)
const isWonStage = (stageId: number) => wonStageIds.value.includes(stageId)

const activeOpportunities = computed(() =>
  opportunities.value.filter(o => !isWonStage(o.stage_id))
)
const wonOpportunities = computed(() =>
  opportunities.value.filter(o => isWonStage(o.stage_id))
)

const totalRevenue = computed(() => {
  return invoices.value
    .filter(inv => (inv as any).status === 'paid')
    .reduce((sum, inv) => sum + (inv.paid_amount ?? inv.total_amount ?? 0), 0)
})

const totalCustomers = computed(() => entities.value.length || 0)

const conversionRate = computed(() => {
  const total = opportunities.value.length
  const won = wonOpportunities.value.length
  return total > 0 ? Math.round((won / total) * 1000) / 10 : 0
})

const pipelineTotalValue = computed(() =>
  opportunities.value.reduce((sum, o) => sum + (o.amount || 0), 0)
)

const pipelineByStage = computed(() => {
  const stageColors: Record<number, string> = {}
  const colorList = ['blue', 'indigo', 'purple', 'orange', 'green']
  stages.value.forEach((s, i) => {
    stageColors[s.id] = colorList[Math.min(i, colorList.length - 1)]
  })
  const byStage = new Map<number, { count: number; value: number; name: string; color: string }>()
  stages.value.forEach(s => {
    byStage.set(s.id, { count: 0, value: 0, name: s.name || '', color: stageColors[s.id] || 'blue' })
  })
  opportunities.value.forEach(o => {
    const entry = byStage.get(o.stage_id)
    if (entry) {
      entry.count += 1
      entry.value += o.amount || 0
    }
  })
  return Array.from(byStage.entries())
    .map(([id, v]) => ({ id, ...v }))
    .filter(s => s.name)
    .sort((a, b) => {
      const sa = stages.value.find(s => s.id === a.id)
      const sb = stages.value.find(s => s.id === b.id)
      return (sa?.position ?? 0) - (sb?.position ?? 0)
    })
})

const recentOpportunities = computed(() =>
  opportunities.value.slice(0, 5).map(o => {
    const stage = stages.value.find(s => s.id === o.stage_id)
    return {
      id: o.id,
      name: o.title,
      company: o.company_name || '',
      stage: stage?.name || '',
      stageId: o.stage_id,
      value: o.amount || 0,
      color: pipelineByStage.value.find(p => p.id === o.stage_id)?.color || 'blue'
    }
  })
)

const recentActivitiesFormatted = computed(() =>
  activities.value.slice(0, 8).map(a => {
    const subj = (a as any).subject || 'Activity'
    const desc = (a as any).description || ''
    const msg = desc ? `${subj}: ${desc.slice(0, 50)}${desc.length > 50 ? '...' : ''}` : subj
    const created = (a as any).date_created || (a as any).created_at || ''
    let timeAgo = ''
    if (created) {
      const d = new Date(created)
      const now = new Date()
      const diffMs = now.getTime() - d.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      if (diffMins < 60) timeAgo = `${diffMins} min ago`
      else if (diffHours < 24) timeAgo = `${diffHours} hours ago`
      else timeAgo = `${diffDays} days ago`
    }
    return { id: (a as any).id, message: msg, time: timeAgo, type: (a as any).activity_type || 'task', color: 'blue' }
  })
)

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const formatValue = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

function goToOpportunities() {
  router.push('/crm/opportunities')
}
function goToActivities() {
  router.push('/crm/tasks')
}
function goToNewDeal() {
  router.push('/crm/opportunities')
}

onMounted(() => {
  loadDashboardData()
})
</script>
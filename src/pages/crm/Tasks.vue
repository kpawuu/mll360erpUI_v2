<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <!-- Page header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <!-- Left: Title with badge -->
        <div class="mb-4 md:mb-0 flex items-center">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Task Management</h1>
          <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
            {{ filteredTasks.length }} total
          </span>
        </div>

        <!-- Right: Actions -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Filter button -->
          <button 
            type="button" 
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            @click="showFilters = !showFilters"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7 1 7 1 5 4 5m6 0H20v2H10M4 5V1h2v4M4 13v4H2v-4m8 4V9h2v8m-6 0h10v-2H6m8-6h6v2h-6m0 0v4h-2V9"/>
            </svg>
            Filter
            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          <!-- Create Task button -->
          <button 
            type="button" 
            class="text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            @click="openTaskModal()"
          >
            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            Create New Task
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="mb-6">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li class="mr-2" role="presentation">
            <button @click="activeTab = 'dashboard'" :class="['inline-block p-4 rounded-t-lg border-b-2', activeTab === 'dashboard' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300']" type="button" role="tab">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
                Dashboard
              </div>
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button @click="activeTab = 'calendar'" :class="['inline-block p-4 rounded-t-lg border-b-2', activeTab === 'calendar' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300']" type="button" role="tab">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                </svg>
                Calendar
              </div>
            </button>
          </li>
          <li role="presentation">
            <button @click="activeTab = 'timeline'" :class="['inline-block p-4 rounded-t-lg border-b-2', activeTab === 'timeline' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300']" type="button" role="tab">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v2H4V2Zm0 4h2v2H4V6Zm0 4h2v2H4v-2Zm0 4h2v2H4v-2Z"/>
                </svg>
                Activity Timeline
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Task Dashboard Tab Content -->
    <div v-if="activeTab === 'dashboard'" class="mt-4 animate-fadeIn">
      <!-- Modern Flat Task Dashboard Section -->
      <section>
        <!-- Header -->
        <!-- <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 pt-6">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Task Dashboard
            </h2>
            <p class="mt-2 text-base text-gray-500 dark:text-gray-400 max-w-xl">All your task insights, progress, and quick actions in one place.</p>
          </div>
          <button @click="openTaskModal(null)" class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition border border-blue-400 dark:border-blue-700 shadow-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            New Task
          </button>
        </div> -->

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-0">
          <div class="flex flex-col items-center rounded-2xl bg-white dark:bg-gray-900 p-6 border border-blue-200 dark:border-blue-800">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-2 border border-blue-100 dark:border-blue-900">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4M12 12v9"/></svg>
            </span>
            <span class="text-3xl font-bold">{{ upcomingTasksCount }}</span>
            <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">Upcoming</span>
          </div>
          <div class="flex flex-col items-center rounded-2xl bg-white dark:bg-gray-900 p-6 border border-red-200 dark:border-red-800">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300 mb-2 border border-red-100 dark:border-red-900">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </span>
            <span class="text-3xl font-bold">{{ overdueTasksCount }}</span>
            <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">Overdue</span>
          </div>
          <div class="flex flex-col items-center rounded-2xl bg-white dark:bg-gray-900 p-6 border border-green-200 dark:border-green-800">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300 mb-2 border border-green-100 dark:border-green-900">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <span class="text-3xl font-bold">{{ completedTasksCount }}</span>
            <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">Completed</span>
          </div>
          <div class="flex flex-col items-center rounded-2xl bg-white dark:bg-gray-900 p-6 border border-cyan-200 dark:border-cyan-800">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300 mb-2 border border-cyan-100 dark:border-cyan-900">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/></svg>
            </span>
            <span class="text-3xl font-bold">{{ todayTasksCount }}</span>
            <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">Due Today</span>
          </div>
        </div>

        <!-- Progress & Distribution -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 px-0">
          <!-- Progress Bars -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col gap-6 border border-gray-200 dark:border-gray-800">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17v-6a2 2 0 0 1 2-2h2"/></svg>
              Task Status
            </h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-blue-600 dark:text-blue-400">Not Started</span>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ notStartedPercentage }}%</span>
              </div>
              <div class="w-full bg-blue-50 dark:bg-blue-900 rounded-full h-3 border border-blue-100 dark:border-blue-900">
                <div class="bg-blue-500 h-3 rounded-full transition-all duration-700" :style="{ width: notStartedPercentage + '%' }"></div>
              </div>
              <div class="flex items-center justify-between mb-1 mt-4">
                <span class="text-sm font-medium text-purple-600 dark:text-purple-400">In Progress</span>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ inProgressPercentage }}%</span>
              </div>
              <div class="w-full bg-purple-50 dark:bg-purple-900 rounded-full h-3 border border-purple-100 dark:border-purple-900">
                <div class="bg-purple-500 h-3 rounded-full transition-all duration-700" :style="{ width: inProgressPercentage + '%' }"></div>
              </div>
              <div class="flex items-center justify-between mb-1 mt-4">
                <span class="text-sm font-medium text-green-600 dark:text-green-400">Completed</span>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ completedPercentage }}%</span>
              </div>
              <div class="w-full bg-green-50 dark:bg-green-900 rounded-full h-3 border border-green-100 dark:border-green-900">
                <div class="bg-green-500 h-3 rounded-full transition-all duration-700" :style="{ width: completedPercentage + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Priority Donut Chart (placeholder) -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
              Priority Distribution
            </h4>
            <!-- Replace with real chart if Chart.js is available -->
            <div class="w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 36 36" class="w-full h-full">
                <circle cx="18" cy="18" r="16" fill="#f3f4f6" />
                
                <!-- Urgent (red) -->
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke="#ef4444" 
                  stroke-width="4" 
                  :stroke-dasharray="`${urgentPercentage} ${100 - urgentPercentage}`" 
                  stroke-dashoffset="0" 
                />
                
                <!-- High (orange) -->
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke="#f59e42" 
                  stroke-width="4" 
                  :stroke-dasharray="`${highPercentage} ${100 - highPercentage}`" 
                  :stroke-dashoffset="`${-urgentPercentage}`" 
                />
                
                <!-- Medium (blue) -->
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke="#3b82f6" 
                  stroke-width="4" 
                  :stroke-dasharray="`${mediumPercentage} ${100 - mediumPercentage}`" 
                  :stroke-dashoffset="`${-(urgentPercentage + highPercentage)}`" 
                />
                
                <!-- Low (green) -->
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke="#22c55e" 
                  stroke-width="4" 
                  :stroke-dasharray="`${lowPercentage} ${100 - lowPercentage}`" 
                  :stroke-dashoffset="`${-(urgentPercentage + highPercentage + mediumPercentage)}`" 
                />
              </svg>
            </div>
            <div class="flex flex-wrap gap-2 mt-4 text-xs">
              <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-red-500"></span>Urgent</span>
              <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-orange-500"></span>High</span>
              <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-blue-500"></span>Medium</span>
              <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-green-500"></span>Low</span>
            </div>
          </div>

          <!-- Type Bar Chart (placeholder) -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
              Task Types
            </h4>
            <div class="w-full flex flex-col gap-2 mt-2">
              <div v-for="type in ['call','email','meeting','follow-up','other']" :key="type" class="flex items-center gap-2">
                <span class="capitalize w-20 text-xs text-gray-600 dark:text-gray-400">{{ type }}</span>
                <div class="flex-1 h-3 rounded bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-900 relative">
                  <div class="h-3 rounded bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 transition-all duration-700" :style="{ width: (tasks.filter(t => t.type === type).length / tasks.length * 100 || 0) + '%' }"></div>
                </div>
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ tasks.filter(t => t.type === type).length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- My Tasks Table -->
        <div class="mt-10 px-0 pb-8">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/></svg>
              My Tasks (Next 5)
            </h4>
            <a href="#" class="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View All</a>
          </div>
          <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Title</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Due Date</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Status</th>
                  <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800"></th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                <tr v-for="task in tasks.slice(0,5)" :key="task.id" class="hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{{ task.title }}</td>
                  <td class="px-4 py-3 text-xs">
                    <span :class="[
                      'inline-flex items-center px-2 py-0.5 rounded font-semibold',
                      task.type === 'call' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300' :
                      task.type === 'email' ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300' :
                      task.type === 'meeting' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300' :
                      task.type === 'follow-up' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    ]">
                      {{ task.type.charAt(0).toUpperCase() + task.type.slice(1) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-xs text-gray-700 dark:text-gray-200">{{ formatDate(task.dueDate) }}</td>
                  <td class="px-4 py-3 text-xs">
                    <span :class="[
                      'inline-flex items-center px-2 py-0.5 rounded font-semibold',
                      task.status === 'not-started' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300' :
                      task.status === 'in-progress' ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300' :
                      task.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    ]">
                      {{ formatStatus(task.status) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button @click="openTaskModal(task)" class="inline-flex items-center px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-700 transition border border-cyan-400 dark:border-cyan-700 shadow-none">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <!-- Calendar Tab Content -->
    <div v-if="activeTab === 'calendar'" class="mt-4 animate-fadeIn">
      <div class="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
        <!-- Calendar Header -->
        <div class="relative overflow-hidden border-b border-gray-200 p-6 dark:border-gray-700">
          <div class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-3xl filter dark:from-blue-700/20 dark:to-indigo-800/20"></div>
          <div class="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex items-center space-x-4">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Task Calendar</h3>
              <div class="flex items-center space-x-2">
                <button 
                  type="button" 
                  class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-500 transition-all hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-500"
                  @click="previousMonth"
                >
                  <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                  </svg>
                </button>
                <h4 class="text-xl font-medium text-gray-900 dark:text-white">{{ currentMonthName }} {{ currentYear }}</h4>
                <button 
                  type="button" 
                  class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-500 transition-all hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-500"
                  @click="nextMonth"
                >
                  <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.91.91 0 0 0 0-1.348L1 1"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="mt-4 flex items-center space-x-3 md:mt-0">
              <button 
                type="button" 
                class="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-md transition-all hover:bg-gradient-to-br hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                @click="setCurrentMonth"
              >
                <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
                Today
              </button>
              <div class="inline-flex overflow-hidden rounded-lg shadow-sm" role="group">
                <button 
                  type="button" 
                  class="relative overflow-hidden border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-500"
                  :class="{ 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300': calendarView === 'month' }"
                  @click="calendarView = 'month'"
                >
                  <span class="relative z-10">Month</span>
                  <div v-if="calendarView === 'month'" class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/20"></div>
                </button>
                <button 
                  type="button" 
                  class="relative overflow-hidden border-y border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-500"
                  :class="{ 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300': calendarView === 'week' }"
                  @click="calendarView = 'week'"
                >
                  <span class="relative z-10">Week</span>
                  <div v-if="calendarView === 'week'" class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/20"></div>
                </button>
                <button 
                  type="button" 
                  class="relative overflow-hidden border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-blue-500"
                  :class="{ 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300': calendarView === 'day' }"
                  @click="calendarView = 'day'"
                >
                  <span class="relative z-10">Day</span>
                  <div v-if="calendarView === 'day'" class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/20"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Month View -->
        <div v-if="calendarView === 'month'" class="p-6">
          <!-- Weekday Headers -->
          <div class="mb-4 grid grid-cols-7 gap-4">
            <div v-for="day in weekDays" :key="day" class="text-center">
              <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ day }}</span>
            </div>
          </div>
          
          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-4">
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index" 
              :class="[
                'group relative min-h-[130px] overflow-hidden rounded-xl border border-gray-200 p-2 transition-all dark:border-gray-700',
                day.isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900',
                day.isToday ? 'ring-2 ring-blue-500 dark:ring-blue-600' : '',
                day.date.getDay() === 0 || day.date.getDay() === 6 ? 'bg-gray-50/80 dark:bg-gray-900/80' : ''
              ]"
            >
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-gray-800/50"></div>
              <div class="relative flex justify-between">
                <span 
                  :class="[
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                    day.isToday ? 'bg-blue-500 text-white' : day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                  ]"
                >
                  {{ day.date.getDate() }}
                </span>
                <button 
                  v-if="day.isCurrentMonth"
                  type="button" 
                  class="invisible rounded-full bg-gray-100 p-1.5 text-gray-500 opacity-0 transition-all hover:bg-blue-100 hover:text-blue-600 group-hover:visible group-hover:opacity-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-500"
                  @click="openTaskModal(null, day.date)"
                >
                  <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
                </button>
              </div>
              
              <!-- Tasks for this day -->
              <div class="mt-2 space-y-1.5 overflow-y-auto">
                <div 
                  v-for="task in getTasksForDate(day.date)" 
                  :key="task.id" 
                  :class="[
                    'group/task cursor-pointer overflow-hidden rounded-lg p-1.5 text-xs shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
                    getPriorityColor(task.priority)
                  ]"
                  @click="openTaskModal(task)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <span v-if="task.status === 'completed'" class="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                      <span v-else-if="isOverdue(task)" class="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                      <span v-else class="mr-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                      <span class="truncate font-medium">{{ task.title }}</span>
                    </div>
                    <span class="invisible ml-1 rounded bg-white/80 px-1 text-[10px] opacity-0 transition-opacity group-hover/task:visible group-hover/task:opacity-100 dark:bg-gray-900/80">
                      {{ formatTime(task.dueDate) }}
                    </span>
                  </div>
                </div>
                <div 
                  v-if="getTasksForDate(day.date).length > 3" 
                  class="mt-1 cursor-pointer rounded-lg bg-gray-100 px-2 py-1 text-center text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  +{{ getTasksForDate(day.date).length - 3 }} more
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Week View -->
        <div v-if="calendarView === 'week'" class="p-6">
          <div class="flex flex-col">
            <!-- Week header with dates -->
            <div class="mb-4 grid grid-cols-7 gap-4">
              <div v-for="(day, index) in currentWeekDays" :key="index" class="flex flex-col items-center">
                <span class="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">{{ weekDays[day.date.getDay()] }}</span>
                <div 
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium',
                    day.isToday ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                  ]"
                >
                  {{ day.date.getDate() }}
                </div>
              </div>
            </div>
            
            <!-- Week view time slots -->
            <div class="relative mt-4 h-[600px] overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <!-- Time indicators -->
              <div class="absolute top-0 left-0 h-full w-16 border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                <div v-for="hour in 24" :key="hour" class="flex h-12 items-center justify-center border-b border-gray-200 dark:border-gray-700">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ formatHour(hour - 1) }}</span>
                </div>
              </div>
              
              <!-- Day columns -->
              <div class="ml-16 grid h-full grid-cols-7">
                <div 
                  v-for="(day, dayIndex) in currentWeekDays" 
                  :key="dayIndex" 
                  class="relative border-r border-gray-200 dark:border-gray-700"
                  :class="{ 'bg-blue-50 dark:bg-blue-900/10': day.isToday }"
                >
                  <!-- Hour rows -->
                  <div v-for="hour in 24" :key="hour" class="relative h-12 border-b border-gray-200 dark:border-gray-700">
                    <!-- Tasks for this hour and day -->
                    <div 
                      v-for="task in getTasksForHourAndDate(hour - 1, day.date)" 
                      :key="task.id" 
                      :class="[
                        'group/task absolute left-0 right-0 mx-1 cursor-pointer overflow-hidden rounded-lg p-1.5 text-xs shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
                        getPriorityColor(task.priority)
                      ]"
                      :style="getTaskPositionStyle(task, hour - 1)"
                      @click="openTaskModal(task)"
                    >
                      <div class="flex items-center">
                        <span v-if="task.status === 'completed'" class="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                        <span v-else-if="isOverdue(task)" class="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                        <span v-else class="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span class="truncate font-medium">{{ task.title }}</span>
                      </div>
                      <div class="invisible mt-0.5 truncate text-[10px] opacity-0 transition-opacity group-hover/task:visible group-hover/task:opacity-100">
                        {{ task.description }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Current time indicator (only for today) -->
                  <div 
                    v-if="day.isToday"
                    class="absolute left-0 right-0 z-10 border-t-2 border-red-500" 
                    :style="{ top: getCurrentTimePosition() + 'px' }"
                  >
                    <div class="absolute -top-1.5 -left-2 h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Day View -->
        <div v-if="calendarView === 'day'" class="p-6">
          <div class="flex flex-col">
            <!-- Day header -->
            <div class="mb-6 flex flex-col items-center">
              <div 
                class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-lg"
              >
                {{ currentDate.getDate() }}
              </div>
              <div class="text-lg font-medium text-gray-900 dark:text-white">
                {{ weekDays[currentDate.getDay()] }}, {{ currentMonthName }} {{ currentDate.getDate() }}, {{ currentYear }}
              </div>
            </div>
            
            <!-- Day view time slots -->
            <div class="relative mt-4 h-[600px] overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <!-- Time indicators -->
              <div class="absolute top-0 left-0 h-full w-20 border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                <div v-for="hour in 24" :key="hour" class="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ formatHour(hour - 1) }}</span>
                </div>
              </div>
              
              <!-- Day column -->
              <div class="ml-20 h-full bg-white dark:bg-gray-800">
                <!-- Hour rows -->
                <div v-for="hour in 24" :key="hour" class="relative h-16 border-b border-gray-200 dark:border-gray-700">
                  <!-- Tasks for this hour -->
                  <div 
                    v-for="task in getTasksForHourAndDate(hour - 1, currentDate)" 
                    :key="task.id" 
                    :class="[
                      'group/task absolute left-0 right-0 mx-2 cursor-pointer overflow-hidden rounded-lg p-2 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
                      getPriorityColor(task.priority)
                    ]"
                    :style="getTaskPositionStyle(task, hour - 1)"
                    @click="openTaskModal(task)"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <span v-if="task.status === 'completed'" class="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                        <span v-else-if="isOverdue(task)" class="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                        <span v-else class="mr-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span class="font-medium">{{ task.title }}</span>
                      </div>
                      <span class="ml-2 rounded-full bg-white/80 px-2 py-0.5 text-xs dark:bg-gray-900/80">
                        {{ formatTime(task.dueDate) }}
                      </span>
                    </div>
                    <div class="mt-1 truncate text-xs opacity-80">{{ task.description }}</div>
                  </div>
                </div>
                
                <!-- Current time indicator -->
                <div 
                  class="absolute left-0 right-0 z-10 border-t-2 border-red-500" 
                  :style="{ top: getCurrentTimePosition() + 'px' }"
                >
                  <div class="absolute -top-1.5 -left-2.5 h-3 w-3 rounded-full bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Timeline Tab Content -->
    <div v-if="activeTab === 'timeline'" class="mt-4 animate-fadeIn">
      <div class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
        <!-- Timeline Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="mb-4 md:mb-0">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v2H4V2Zm0 4h2v2H4V6Zm0 4h2v2H4v-2Zm0 4h2v2H4v-2Z"/>
                </svg>
                Activity Timeline
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Track task history and activity over time</p>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button 
                  type="button" 
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  :class="activityFilter === 'all' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : ''"
                  @click="activityFilter = 'all'"
                >
                  All
                </button>
                <button 
                  type="button" 
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  :class="activityFilter === 'created' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : ''"
                  @click="activityFilter = 'created'"
                >
                  Created
                </button>
                <button 
                  type="button" 
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  :class="activityFilter === 'completed' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : ''"
                  @click="activityFilter = 'completed'"
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Timeline with activities -->
          <div v-if="filteredActivities.length > 0" class="relative">
            <ol class="relative border-l border-gray-200 dark:border-gray-700">
              <li v-for="(activity, index) in filteredActivities" :key="index" class="mb-10 ml-6">
                <span 
                  class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-800"
                  :class="activity.type === 'created' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'"
                >
                  <svg v-if="activity.type === 'created'" class="w-3 h-3 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                  </svg>
                  <svg v-else class="w-3 h-3 text-green-800 dark:text-green-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                </span>
                <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div class="flex items-center justify-between mb-3">
                    <time class="text-xs font-normal text-gray-500 dark:text-gray-400">
                      {{ formatDateTime(activity.timestamp) }}
                    </time>
                    <span 
                      class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                      :class="activity.type === 'created' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'"
                    >
                      {{ activity.type === 'created' ? 'Created' : 'Completed' }}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ activity.task.title }}</h3>
                  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {{ activity.description }}
                  </p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {{ formatActivityType(activity.task.type) }}
                    </span>
                    <span 
                      class="text-xs font-medium px-2.5 py-0.5 rounded"
                      :class="getPriorityBadgeClass(activity.task.priority)"
                    >
                      {{ activity.task.priority.charAt(0).toUpperCase() + activity.task.priority.slice(1) }}
                    </span>
                    <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {{ activity.task.assignedTo }}
                    </span>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      type="button" 
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      @click="openTaskModal(activity.task)"
                    >
                      <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                      </svg>
                      View Task
                    </button>
                    <button 
                      v-if="activity.task.status !== 'completed'"
                      type="button" 
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      @click="markTaskAsCompleted(activity.task)"
                    >
                      <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg>
                      Complete
                    </button>
                  </div>
                </div>
              </li>
            </ol>
          </div>
          
          <!-- Empty state when no activities -->
          <div v-if="filteredActivities.length === 0" class="flex flex-col items-center justify-center py-16">
            <div class="mb-4">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 1v18M1 9h18M5 5.5 8 3m0 0 3 2.5M8 3v6m4-3.5L15 3m0 0 3 2.5m-3-2.5v6"/>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">No activities found</h3>
            <p class="mb-6 text-center text-gray-500 dark:text-gray-400 max-w-md">There are no activities matching your current filter criteria. Try changing your filter or create new tasks.</p>
            <button 
              type="button" 
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="activityFilter = 'all'"
            >
              Show All Activities
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Modal -->
    <div v-if="taskModalOpen" id="taskModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600">
            <div class="flex items-center">
              <svg class="w-5 h-5 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
              </svg>
              <h3 class="text-xl font-bold text-white">
                {{ editMode ? 'Edit Task' : 'Create New Task' }}
              </h3>
            </div>
            <button type="button" class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" @click="closeTaskModal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l-6 6M7 7l6-6" />
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
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-7 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
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
                
                <!-- Status (only for edit mode) -->
                <div v-if="editMode">
                  <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                  <select id="status" v-model="taskForm.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          
          <!-- Modal footer -->
          <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
            <button 
              type="button" 
              class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              @click="closeTaskModal"
            >
              Cancel
            </button>
            <button 
              type="button" 
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="saveTask"
            >
              {{ editMode ? 'Update Task' : 'Create Task' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// Tab navigation
const activeTab = ref('dashboard');

// Task modal state
const taskModalOpen = ref(false);
const editMode = ref(false);
const currentTask = ref(null);

// Filters
const searchTerm = ref('');
const statusFilter = ref('');
const priorityFilter = ref('');
const typeFilter = ref('');
const showFilters = ref(false);

// Calendar state
const currentDate = ref(new Date());
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const activityFilter = ref('all');
const calendarView = ref('month');

// Sample task data
const tasks = ref([
  {
    id: 1,
    title: 'Follow up with Acme Corp',
    type: 'call',
    dueDate: '2025-05-10',
    priority: 'high',
    assignedTo: 'John Doe',
    description: 'Call to discuss the proposal details',
    status: 'not-started',
    relatedTo: {
      type: 'lead',
      id: 2,
      name: 'Acme Corp'
    },
    createdAt: '2025-05-01T10:30:00Z',
    completedAt: null
  },
  {
    id: 2,
    title: 'Send contract to TechSolutions',
    type: 'email',
    dueDate: '2025-05-05',
    priority: 'urgent',
    assignedTo: 'Jane Smith',
    description: 'Send the final contract for review',
    status: 'in-progress',
    relatedTo: {
      type: 'opportunity',
      id: 3,
      name: 'TechSolutions Deal'
    },
    createdAt: '2025-05-01T11:45:00Z',
    completedAt: null
  },
  {
    id: 3,
    title: 'Quarterly review with GlobalTech',
    type: 'meeting',
    dueDate: '2025-05-15',
    priority: 'medium',
    assignedTo: 'Robert Johnson',
    description: 'Review Q2 performance and discuss next steps',
    status: 'not-started',
    relatedTo: {
      type: 'opportunity',
      id: 5,
      name: 'GlobalTech Partnership'
    },
    createdAt: '2025-05-02T09:15:00Z',
    completedAt: null
  },
  {
    id: 4,
    title: 'Update proposal for Nexus Inc',
    type: 'other',
    dueDate: '2025-05-04',
    priority: 'medium',
    assignedTo: 'Emily Davis',
    description: 'Update pricing and timeline in the proposal',
    status: 'completed',
    relatedTo: {
      type: 'lead',
      id: 7,
      name: 'Nexus Inc'
    },
    createdAt: '2025-04-30T14:20:00Z',
    completedAt: '2025-05-02T16:45:00Z'
  },
  {
    id: 5,
    title: 'Follow up with Quantum Systems',
    type: 'follow-up',
    dueDate: '2025-05-08',
    priority: 'low',
    assignedTo: 'John Doe',
    description: 'Check if they received our proposal',
    status: 'not-started',
    relatedTo: {
      type: 'lead',
      id: 9,
      name: 'Quantum Systems'
    },
    createdAt: '2025-05-02T11:30:00Z',
    completedAt: null
  }
]);

// Task form data
const taskForm = reactive({
  title: '',
  type: 'call',
  dueDate: new Date().toISOString().split('T')[0], // Today's date
  priority: 'medium',
  assignedTo: 'John Doe',
  description: '',
  status: 'not-started',
  relatedTo: {
    type: '',
    id: null,
    name: ''
  }
});

// Computed properties for task counts
const upcomingTasksCount = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return tasks.value.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate >= today && task.status !== 'completed';
  }).length;
});

const overdueTasksCount = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return tasks.value.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && task.status !== 'completed';
  }).length;
});

const completedTasksCount = computed(() => {
  return tasks.value.filter(task => task.status === 'completed').length;
});

// Today's tasks count
const todayTasksCount = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return tasks.value.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }).length;
});

// Task progress percentages
const notStartedPercentage = computed(() => {
  const notStartedCount = tasks.value.filter(task => task.status === 'not-started').length;
  return tasks.value.length > 0 ? Math.round((notStartedCount / tasks.value.length) * 100) : 0;
});

const inProgressPercentage = computed(() => {
  const inProgressCount = tasks.value.filter(task => task.status === 'in-progress').length;
  return tasks.value.length > 0 ? Math.round((inProgressCount / tasks.value.length) * 100) : 0;
});

const completedPercentage = computed(() => {
  return tasks.value.length > 0 ? Math.round((completedTasksCount.value / tasks.value.length) * 100) : 0;
});

// Priority distribution percentages
const urgentPercentage = computed(() => {
  const urgentCount = tasks.value.filter(task => task.priority === 'urgent').length;
  return tasks.value.length > 0 ? Math.round((urgentCount / tasks.value.length) * 100) : 0;
});

const highPercentage = computed(() => {
  const highCount = tasks.value.filter(task => task.priority === 'high').length;
  return tasks.value.length > 0 ? Math.round((highCount / tasks.value.length) * 100) : 0;
});

const mediumPercentage = computed(() => {
  const mediumCount = tasks.value.filter(task => task.priority === 'medium').length;
  return tasks.value.length > 0 ? Math.round((mediumCount / tasks.value.length) * 100) : 0;
});

const lowPercentage = computed(() => {
  const lowCount = tasks.value.filter(task => task.priority === 'low').length;
  return tasks.value.length > 0 ? Math.round((lowCount / tasks.value.length) * 100) : 0;
});

// Filtered tasks based on search and filters
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    // Search term filter
    const matchesSearch = searchTerm.value === '' || 
      task.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.value.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter.value === '' || task.status === statusFilter.value;
    
    // Priority filter
    const matchesPriority = priorityFilter.value === '' || task.priority === priorityFilter.value;
    
    // Type filter
    const matchesType = typeFilter.value === '' || task.type === typeFilter.value;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });
});

// Format date (YYYY-MM-DD to MMM DD, YYYY)
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Format date and time for timeline
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Format status for display
const formatStatus = (status) => {
  switch (status) {
    case 'not-started':
      return 'Not Started';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

// Get priority badge class
const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'urgent':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

// Get status badge class
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'not-started':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

// Check if task is overdue
const isOverdue = (task) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today && task.status !== 'completed';
};

// Get priority color for calendar
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

// Get activity type color
const getActivityTypeColor = (type) => {
  switch (type) {
    case 'created':
      return 'bg-blue-500 dark:bg-blue-600';
    case 'completed':
      return 'bg-green-500 dark:bg-green-600';
    case 'updated':
      return 'bg-yellow-500 dark:bg-yellow-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
};

// Get tasks for a specific date
const getTasksForDate = (date) => {
  return tasks.value.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === date.toDateString();
  });
};

// Calendar computed properties
const currentMonthName = computed(() => {
  return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).toLocaleString('default', { month: 'long' });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generate array of days for the calendar
  const days = [];
  
  // Add days from previous month to fill the first row
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPrevMonth - i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  // Add days from next month to fill the last row
  const totalDaysNeeded = 42; // 6 rows of 7 days
  const remainingDays = totalDaysNeeded - days.length;
  
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  return days;
});

// Timeline activities
const activities = computed(() => {
  const result = [];
  
  // Add created activities
  tasks.value.forEach(task => {
    result.push({
      id: `created-${task.id}`,
      type: 'created',
      task: { ...task },
      timestamp: task.createdAt
    });
    
    // Add completed activities
    if (task.completedAt) {
      result.push({
        id: `completed-${task.id}`,
        type: 'completed',
        task: { ...task },
        timestamp: task.completedAt
      });
    }
  });
  
  // Sort by timestamp, newest first
  return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

// Filtered activities
const filteredActivities = computed(() => {
  if (activityFilter.value === 'all') {
    return activities.value;
  }
  
  return activities.value.filter(activity => activity.type === activityFilter.value);
});

// Format activity type
const formatActivityType = (type) => {
  switch (type) {
    case 'created':
      return 'Created';
    case 'completed':
      return 'Completed';
    case 'updated':
      return 'Updated';
    default:
      return type;
  }
};

// Calendar navigation
const previousMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() - 1);
  currentDate.value = date;
};

const nextMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  currentDate.value = date;
};

const setCurrentMonth = () => {
  currentDate.value = new Date();
};

// Open task modal
const openTaskModal = (task = null, selectedDate = null) => {
  taskModalOpen.value = true;
  
  if (task) {
    // Edit existing task
    editMode.value = true;
    currentTask.value = task;
    
    // Populate form with task data
    taskForm.title = task.title;
    taskForm.type = task.type;
    taskForm.dueDate = task.dueDate;
    taskForm.priority = task.priority;
    taskForm.assignedTo = task.assignedTo;
    taskForm.description = task.description;
    taskForm.status = task.status;
    taskForm.relatedTo = { ...task.relatedTo };
  } else {
    // Create new task
    editMode.value = false;
    currentTask.value = null;
    
    // Reset form with default values
    taskForm.title = '';
    taskForm.type = 'call';
    taskForm.dueDate = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    taskForm.priority = 'medium';
    taskForm.assignedTo = 'John Doe';
    taskForm.description = '';
    taskForm.status = 'not-started';
    taskForm.relatedTo = {
      type: '',
      id: null,
      name: ''
    };
  }
};

// Close task modal
const closeTaskModal = () => {
  taskModalOpen.value = false;
};

// Save task
const saveTask = () => {
  if (editMode.value && currentTask.value) {
    // Update existing task
    const index = tasks.value.findIndex(t => t.id === currentTask.value.id);
    if (index !== -1) {
      tasks.value[index] = {
        ...currentTask.value,
        title: taskForm.title,
        type: taskForm.type,
        dueDate: taskForm.dueDate,
        priority: taskForm.priority,
        assignedTo: taskForm.assignedTo,
        description: taskForm.description,
        status: taskForm.status,
        relatedTo: { ...taskForm.relatedTo }
      };
    }
  } else {
    // Create new task
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
  }
  
  // Close the modal
  closeTaskModal();
};

// Complete task
const completeTask = (task) => {
  const taskIndex = tasks.value.findIndex(t => t.id === task.id);
  if (taskIndex !== -1) {
    tasks.value[taskIndex] = {
      ...task,
      status: 'completed',
      completedAt: new Date().toISOString()
    };
  }
};

// Clear all filters
const clearFilters = () => {
  searchTerm.value = '';
  statusFilter.value = '';
  priorityFilter.value = '';
  typeFilter.value = '';
};

// Format hour for time display
const formatHour = (hour) => {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h} ${ampm}`;
};

// Get tasks for a specific hour and date
const getTasksForHourAndDate = (hour, date) => {
  return tasks.value.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === date.toDateString() && 
           taskDate.getHours() === hour;
  });
};

// Get position style for task in hour cell
const getTaskPositionStyle = (task, hour) => {
  const taskDate = new Date(task.dueDate);
  if (taskDate.getHours() !== hour) return {};
  
  const minutes = taskDate.getMinutes();
  const top = (minutes / 60) * 100;
  const height = 30; // Height in percentage
  
  return {
    top: `${top}%`,
    height: `${height}%`,
    zIndex: 5
  };
};

// Get current time position for day view
const getCurrentTimePosition = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Calculate position based on 24 hours * 16px height per hour
  return (hours * 16) + ((minutes / 60) * 16);
};

// Current week days
const currentWeekDays = computed(() => {
  const date = new Date(currentDate.value);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Set to beginning of week (Sunday)
  date.setDate(date.getDate() - day);
  
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Create array of 7 days starting from Sunday
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(date);
    days.push({
      date: currentDay,
      isToday: currentDay.toDateString() === today.toDateString(),
      isCurrentMonth: currentDay.getMonth() === currentDate.value.getMonth()
    });
    date.setDate(date.getDate() + 1);
  }
  
  return days;
});

// Activity timeline functions
const getActivityIconClass = (type) => {
  switch (type) {
    case 'created':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  }
};

const getActivityBadgeClass = (type) => {
  switch (type) {
    case 'created':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const markTaskAsCompleted = (task) => {
  const taskIndex = tasks.value.findIndex(t => t.id === task.id);
  if (taskIndex !== -1) {
    tasks.value[taskIndex].status = 'completed';
    tasks.value[taskIndex].completedAt = new Date().toISOString();
    // Close modal if open
    if (taskModalOpen.value && currentTaskId.value === task.id) {
      closeTaskModal();
    }
  }
};

// Format time for display
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
/* Custom styles for calendar */
.calendar-day {
  min-height: 100px;
}
</style>
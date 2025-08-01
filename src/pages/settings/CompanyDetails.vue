<template>
    <div class="p-4">
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Company Details</h1>
                    <p class="text-gray-600 dark:text-gray-400">Manage your company information and settings</p>
                </div>
                <button @click="showEditModal = true" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit Company
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="companyStore.loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Company Details -->
        <div v-else-if="company" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Basic Information
                </h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.name }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.email }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.phone_number || 'N/A' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.location || 'N/A' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Website</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.website || 'N/A' }}</span>
                    </div>
                </div>
            </div>

            <!-- Additional Information -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Additional Information
                </h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">License Status</span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="company.is_active_license ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'">
                            {{ company.is_active_license ? 'Active' : 'Inactive' }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Country ID</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.country_id }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Date Created</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ formatDateTime(company.date_created) }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</span>
                        <span class="text-sm text-gray-900 dark:text-white">{{ company.date_updated ? formatDateTime(company.date_updated) : 'N/A' }}</span>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div v-if="company.description" class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Description
                </h3>
                <p class="text-gray-700 dark:text-gray-300">{{ company.description }}</p>
            </div>

            <!-- Company Branches -->
            <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <svg class="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        Company Branches
                    </h3>
                    <button @click="showBranchesModal = true" class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Branch
                    </button>
                </div>
                
                <!-- Loading State -->
                <div v-if="branchesStore.loading" class="flex justify-center items-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>

                <!-- Branches List -->
                <div v-else-if="branchesStore.branches.length > 0" class="space-y-3">
                    <div v-for="branch in branchesStore.branches" :key="branch.id" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">{{ branch.name }}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ branch.location || 'No address' }}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="editBranch(branch)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button @click="deleteBranch(branch.id)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-8">
                    <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <p class="text-gray-500 dark:text-gray-400">No branches found</p>
                </div>
            </div>

            <!-- Company Departments -->
            <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Company Departments
                    </h3>
                    <button @click="showDepartmentsModal = true" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Department
                    </button>
                </div>
                
                <!-- Loading State -->
                <div v-if="departmentsStore.loading" class="flex justify-center items-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>

                <!-- Departments List -->
                <div v-else-if="departmentsStore.departments.length > 0" class="space-y-3">
                    <div v-for="department in departmentsStore.departments" :key="department.id" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">{{ department.name }}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ department.manager_details ? `${department.manager_details.first_name} ${department.manager_details.last_name}` : 'No manager' }}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="editDepartment(department)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button @click="deleteDepartment(department.id)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-8">
                    <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <p class="text-gray-500 dark:text-gray-400">No departments found</p>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-12">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Company Found</h3>
            <p class="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                Company information could not be loaded. Please try refreshing the page.
            </p>
            <button @click="loadCompany" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Refresh
            </button>
        </div>
    </div>

    <!-- Edit Company Modal -->
    <div v-if="showEditModal" class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
                    <h3 class="text-xl font-semibold text-white">Edit Company Details</h3>
                    <button @click="closeModal" class="text-white bg-transparent hover:bg-blue-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <form @submit.prevent="saveCompany">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                                <input v-model="companyForm.name" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input v-model="companyForm.email" type="email" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input v-model="companyForm.phone_number" type="tel" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                <input v-model="companyForm.website" type="url" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input v-model="companyForm.location" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea v-model="companyForm.description" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
                            </div>
                            <div class="md:col-span-2">
                                <label class="flex items-center">
                                    <input v-model="companyForm.is_active_license" type="checkbox" class="mr-2">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">Active License</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button @click="closeModal" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Cancel
                    </button>
                    <button @click="saveCompany" :disabled="companyStore.loading" class="text-white bg-gradient-to-br from-blue-600 to-indigo-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                        <div v-if="companyStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Update Company
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-md">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Success!</h3>
                    <p class="text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
                </div>
                <div class="flex justify-center p-6 border-t border-gray-200 dark:border-gray-700">
                    <button @click="showSuccessModal = false; successMessage = ''" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Branches Modal -->
    <div v-if="showBranchesModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-md">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ editingBranch ? 'Edit Branch' : 'Add New Branch' }}
                    </h3>
                    <button @click="closeBranchesModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="saveBranch" class="p-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch Name</label>
                            <input v-model="branchForm.name" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch Location</label>
                            <textarea v-model="branchForm.location" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"></textarea>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="closeBranchesModal" class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                            {{ editingBranch ? 'Update' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Departments Modal -->
    <div v-if="showDepartmentsModal" class="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-gray-900/70 dark:bg-gray-900/80">
        <div class="relative w-full max-w-md">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ editingDepartment ? 'Edit Department' : 'Add New Department' }}
                    </h3>
                    <button @click="closeDepartmentsModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="saveDepartment" class="p-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department Name</label>
                            <input v-model="departmentForm.name" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="closeDepartmentsModal" class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            {{ editingDepartment ? 'Update' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCompanyStore } from '../../store/company.store'
import { useCompanyBranchesStore } from '../../store/company-branches.store'
import { useCompanyDepartmentsStore } from '../../store/company-departments.store'
import { useAuthStore } from '../../store/auth.store'
import type { Company } from '../../api/models/company.model'
import type { CompanyBranch } from '../../api/models/company-branches.model'
import type { CompanyDepartment } from '../../api/models/company-departments.model'

const companyStore = useCompanyStore()
const branchesStore = useCompanyBranchesStore()
const departmentsStore = useCompanyDepartmentsStore()
const authStore = useAuthStore()

const showEditModal = ref(false)
const showSuccessModal = ref(false)
const showBranchesModal = ref(false)
const showDepartmentsModal = ref(false)
const successMessage = ref('')

const company = ref<Company | null>(null)
const editingBranch = ref<CompanyBranch | null>(null)
const editingDepartment = ref<CompanyDepartment | null>(null)

const companyForm = ref({
    name: '',
    email: '',
    phone_number: '',
    website: '',
    location: '',
    description: '',
    is_active_license: false
})

const branchForm = ref({
    name: '',
    location: '',
    location_type: 'branch' as 'branch' | 'headquarter' | 'warehouse' | 'agent',
    company_id: 0
})

const departmentForm = ref({
    name: '',
    company_id: 0
})

const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
}

const loadCompany = async () => {
    try {
        console.log('Loading company...')
        console.log('Auth store state:', (authStore as any).getAuthState())
        console.log('User:', authStore.user)
        console.log('Company ID:', authStore.user?.company_id)
        
        if (authStore.user?.company_id) {
            console.log('Fetching company with ID:', authStore.user.company_id)
            const response = await companyStore.fetchCompany(authStore.user.company_id)
            company.value = response
            console.log('Company loaded:', response)
            
            // Populate form for editing
            companyForm.value = {
                name: response.name,
                email: response.email,
                phone_number: response.phone_number || '',
                website: response.website || '',
                location: response.location || '',
                description: response.description || '',
                is_active_license: response.is_active_license || false
            }
            
            // Load branches and departments for this company
            await loadBranches()
            await loadDepartments()
        } else {
            console.error('No company_id found in user data')
        }
    } catch (error) {
        console.error('Failed to load company:', error)
    }
}

const loadBranches = async () => {
    try {
        if (authStore.user?.company_id) {
            await branchesStore.fetchBranches({
                query: {
                    company_id: authStore.user.company_id,
                    $sort: { branch_name: 1 }
                }
            })
        }
    } catch (error) {
        console.error('Failed to load branches:', error)
    }
}

const loadDepartments = async () => {
    try {
        if (authStore.user?.company_id) {
            await departmentsStore.fetchDepartments({
                query: {
                    company_id: authStore.user.company_id,
                    $sort: { department_name: 1 }
                }
            })
        }
    } catch (error) {
        console.error('Failed to load departments:', error)
    }
}

const saveCompany = async () => {
    try {
        if (company.value) {
            await companyStore.updateCompany(company.value.id, companyForm.value)
            showSuccessModal.value = true
            successMessage.value = 'Company updated successfully!'
            closeModal()
            await loadCompany() // Refresh data
        }
    } catch (error) {
        console.error('Failed to save company:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to update company. Please try again.'
    }
}

const saveBranch = async () => {
    try {
        if (authStore.user?.company_id) {
            const branchData = {
                name: branchForm.value.name,
                location: branchForm.value.location,
                location_type: branchForm.value.location_type,
                company_id: authStore.user.company_id
            }
            
            if (editingBranch.value) {
                await branchesStore.updateBranch(editingBranch.value.id, branchData)
                successMessage.value = 'Branch updated successfully!'
            } else {
                await branchesStore.createBranch(branchData)
                successMessage.value = 'Branch created successfully!'
            }
            
            showSuccessModal.value = true
            closeBranchesModal()
            await loadBranches()
        }
    } catch (error) {
        console.error('Failed to save branch:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to save branch. Please try again.'
    }
}

const saveDepartment = async () => {
    try {
        if (authStore.user?.company_id) {
            const departmentData = {
                name: departmentForm.value.name,
                company_id: authStore.user.company_id
            }
            
            if (editingDepartment.value) {
                await departmentsStore.updateDepartment(editingDepartment.value.id, departmentData)
                successMessage.value = 'Department updated successfully!'
            } else {
                await departmentsStore.createDepartment(departmentData)
                successMessage.value = 'Department created successfully!'
            }
            
            showSuccessModal.value = true
            closeDepartmentsModal()
            await loadDepartments()
        }
    } catch (error) {
        console.error('Failed to save department:', error)
        showSuccessModal.value = true
        successMessage.value = 'Failed to save department. Please try again.'
    }
}

const editBranch = (branch: CompanyBranch) => {
    editingBranch.value = branch
    branchForm.value = {
        name: branch.name,
        location: branch.location,
        location_type: branch.location_type || 'branch',
        company_id: branch.company_id
    }
    showBranchesModal.value = true
}

const editDepartment = (department: CompanyDepartment) => {
    editingDepartment.value = department
    departmentForm.value = {
        name: department.name,
        company_id: department.company_id
    }
    showDepartmentsModal.value = true
}

const deleteBranch = async (id: number) => {
    if (confirm('Are you sure you want to delete this branch?')) {
        try {
            await branchesStore.deleteBranch(id)
            successMessage.value = 'Branch deleted successfully!'
            showSuccessModal.value = true
            await loadBranches()
        } catch (error) {
            console.error('Failed to delete branch:', error)
            showSuccessModal.value = true
            successMessage.value = 'Failed to delete branch. Please try again.'
        }
    }
}

const deleteDepartment = async (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
        try {
            await departmentsStore.deleteDepartment(id)
            successMessage.value = 'Department deleted successfully!'
            showSuccessModal.value = true
            await loadDepartments()
        } catch (error) {
            console.error('Failed to delete department:', error)
            showSuccessModal.value = true
            successMessage.value = 'Failed to delete department. Please try again.'
        }
    }
}

const closeModal = () => {
    showEditModal.value = false
    companyStore.clearError()
}

const closeBranchesModal = () => {
    showBranchesModal.value = false
    editingBranch.value = null
    branchForm.value = {
        name: '',
        location: '',
        location_type: 'branch' as 'branch' | 'headquarter' | 'warehouse' | 'agent',
        company_id: 0
    }
    branchesStore.clearError()
}

const closeDepartmentsModal = () => {
    showDepartmentsModal.value = false
    editingDepartment.value = null
    departmentForm.value = {
        name: '',
        company_id: 0
    }
    departmentsStore.clearError()
}

onMounted(() => {
    loadCompany()
})
</script> 
<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shipments Management</h1>
                    <p class="text-gray-600 dark:text-gray-400 text-lg">Manage and track your company shipments</p>
                </div>
                <button @click="showCreateModal = true" class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Shipment
                </button>
            </div>
        </div>

        <!-- Search and Filters Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Search Input -->
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search Shipments</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input 
                                v-model="searchQuery" 
                                @input="onSearchChange"
                                type="text" 
                                placeholder="Search by client, cargo description, PO numbers, file number..."
                                :disabled="shipmentStore.loading"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                        </div>
                    </div>
                    
                    <!-- Refresh Button -->
                    <div class="flex items-end">
                        <button 
                            @click="loadShipments" 
                            :disabled="shipmentStore.loading"
                            class="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium rounded-xl text-sm px-5 py-3 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <div v-if="shipmentStore.loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="shipmentStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
        </div>

        <!-- Shipments Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="shipment in filteredShipments" :key="shipment.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
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
                        <button @click="editShipment(shipment)" class="p-1 text-blue-600 hover:text-blue-800 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button @click="deleteShipment(shipment.id)" class="p-1 text-red-600 hover:text-red-800 rounded">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="space-y-2 mb-4">
                    <div class="text-sm">
                        <span class="text-gray-500 dark:text-gray-400">Cargo:</span>
                        <span class="text-gray-900 dark:text-white ml-2">{{ shipment.cargo_description || 'N/A' }}</span>
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

        <!-- Empty State -->
        <div v-if="!shipmentStore.loading && filteredShipments.length === 0" class="text-center py-20">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {{ searchQuery ? 'No shipments found' : 'No shipments yet' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
                {{ searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding your first shipment.' }}
            </p>
            <button 
                @click="showCreateModal = true"
                class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200"
            >
                Add Shipment
            </button>
                 </div>
     </div>
 </template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useShipmentStore } from '../../store/shipment.store'
import { useAuthStore } from '../../store/auth.store'
import type { Shipment } from '../../api/models/shipment.model'

const shipmentStore = useShipmentStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingShipment = ref<Shipment | null>(null)

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
    file_number: '',
    sequence: '',
    year: '',
    status_id: undefined as number | undefined
})

const filteredShipments = computed(() => {
    const shipments = shipmentStore.shipments
    if (!searchQuery.value) return shipments
    
    const query = searchQuery.value.toLowerCase()
    return shipments.filter(shipment => 
        (shipment.client?.name && shipment.client.name.toLowerCase().includes(query)) ||
        (shipment.cargo_description && shipment.cargo_description.toLowerCase().includes(query)) ||
        (shipment.po_numbers && shipment.po_numbers.toLowerCase().includes(query)) ||
        (shipment.file_number && shipment.file_number.toLowerCase().includes(query)) ||
        (shipment.agent_invoice_number && shipment.agent_invoice_number.toLowerCase().includes(query)) ||
        (shipment.vessel_flight_name && shipment.vessel_flight_name.toLowerCase().includes(query)) ||
        (shipment.mbl && shipment.mbl.toLowerCase().includes(query)) ||
        (shipment.hbl && shipment.hbl.toLowerCase().includes(query))
    )
})

const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
}

const loadShipments = async () => {
    try {
        let query: any = {};
        
        // Add search filter
        if (searchQuery.value && searchQuery.value.trim()) {
            const searchTerm = searchQuery.value.trim();
            query.$or = [
                { 'client.name': { $like: `%${searchTerm}%` } },
                { cargo_description: { $like: `%${searchTerm}%` } },
                { po_numbers: { $like: `%${searchTerm}%` } },
                { file_number: { $like: `%${searchTerm}%` } },
                { agent_invoice_number: { $like: `%${searchTerm}%` } },
                { vessel_flight_name: { $like: `%${searchTerm}%` } },
                { mbl: { $like: `%${searchTerm}%` } },
                { hbl: { $like: `%${searchTerm}%` } }
            ];
        }
        
        // Add company filter from auth store
        if (authStore.user?.company_id) {
            query.company_id = authStore.user.company_id;
        }
        
        // Add pagination parameters
        query.$limit = shipmentStore.pagination.limit;
        query.$skip = shipmentStore.pagination.skip;
        
        // Add sorting by date_created descending (newest first)
        query.$sort = { date_created: -1 };
        
        const params = Object.keys(query).length > 0 ? { query } : undefined;
        await shipmentStore.fetchShipments(params)
    } catch (error) {
        console.error('Failed to load shipments:', error)
    }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const onSearchChange = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        shipmentStore.setPage(1) // Reset to first page when searching
        await loadShipments()
    }, 500)
}

const clearFilters = async () => {
    searchQuery.value = ''
    shipmentStore.setPage(1)
    await loadShipments()
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
        file_number: shipment.file_number || '',
        sequence: shipment.sequence || '',
        year: shipment.year || '',
        status_id: shipment.status_id
    }
    
    showEditModal.value = true
}

const saveShipment = async () => {
    try {
        // Format date fields to date only (not datetime)
        const formatDateField = (dateString: string) => {
            if (!dateString) return dateString
            return new Date(dateString).toISOString().split('T')[0]
        }

        const shipmentData = {
            ...shipmentForm.value,
            delivery_date: formatDateField(shipmentForm.value.delivery_date)
        }

        if (showEditModal.value && editingShipment.value) {
            // Update existing shipment
            await shipmentStore.updateShipment(editingShipment.value.id, shipmentData)
        } else {
            // Create new shipment
            const createData = {
                ...shipmentData,
                company_id: authStore.user?.company_id,
                user_id: authStore.user?.id
            }
            await shipmentStore.createShipment(createData)
        }
        closeModal()
        await loadShipments()
    } catch (error) {
        console.error('Failed to save shipment:', error)
    }
}

const deleteShipment = async (id: number) => {
    if (confirm('Are you sure you want to delete this shipment?')) {
        try {
            await shipmentStore.deleteShipment(id)
            await loadShipments()
        } catch (error) {
            console.error('Failed to delete shipment:', error)
        }
    }
}

const closeModal = () => {
    showCreateModal.value = false
    showEditModal.value = false
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
        file_number: '',
        sequence: '',
        year: '',
        status_id: undefined
    }
    shipmentStore.clearError()
}

onMounted(async () => {
    // Set default pagination limit if not already set
    if (!shipmentStore.pagination.limit || shipmentStore.pagination.limit < 1) {
        shipmentStore.setLimit(10)
    }
    
    await loadShipments()
})
</script> 
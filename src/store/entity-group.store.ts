import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { entityGroupController } from '../api/controllers/entity-group.controllers';
import type { EntityGroup, CreateEntityGroup, UpdateEntityGroup } from '../api/models/entity-group.model';

export const useEntityGroupStore = defineStore('entityGroup', () => {
    // State
    const entityGroups = ref<EntityGroup[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const selectedEntityGroup = ref<EntityGroup | null>(null);
    
    // Pagination state
    const pagination = ref({
        total: 0,
        limit: 10,
        skip: 0,
        currentPage: 1
    });

    // Getters
    const getEntityGroups = computed(() => entityGroups.value);
    const getEntityGroupById = computed(() => (id: number) => entityGroups.value.find(group => group.id === id));
    const getEntityGroupsByName = computed(() => (name: string) => entityGroups.value.filter(group => group.group_name.toLowerCase().includes(name.toLowerCase())));

    // Actions
    const fetchEntityGroups = async (params?: any) => {
        try {
            loading.value = true;
            error.value = null;
            
            // Prepare query parameters with pagination
            const queryParams = {
                ...params,
                $limit: pagination.value.limit,
                $skip: pagination.value.skip
            };
            
            const response = await entityGroupController.getAll(queryParams);
            console.log('API response:', response);
            
            // Handle both paginated and non-paginated responses
            if (Array.isArray(response)) {
                entityGroups.value = response;
                pagination.value.total = response.length;
            } else {
                entityGroups.value = (response as any).data || [];
                pagination.value.total = (response as any).total || 0;
            }
            
            console.log('Processed entityGroups:', entityGroups.value);
            return entityGroups.value;
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entity groups';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchEntityGroupById = async (id: string | number) => {
        try {
            loading.value = true;
            error.value = null;
            const data = await entityGroupController.getById(id);
            selectedEntityGroup.value = data;
            return data;
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entity group';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const createEntityGroup = async (entityGroup: CreateEntityGroup) => {
        try {
            loading.value = true;
            error.value = null;
            const data = await entityGroupController.create(entityGroup);
            entityGroups.value.push(data);
            return data;
        } catch (err: any) {
            error.value = err.message || 'Failed to create entity group';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateEntityGroup = async (id: string | number, entityGroup: UpdateEntityGroup) => {
        try {
            loading.value = true;
            error.value = null;
            const data = await entityGroupController.update(id, entityGroup);
            
            // Update in local state
            const index = entityGroups.value.findIndex(group => group.id === Number(id));
            if (index !== -1) {
                entityGroups.value[index] = data;
            }
            
            // Update selected entity group if it's the one being updated
            if (selectedEntityGroup.value?.id === Number(id)) {
                selectedEntityGroup.value = data;
            }
            
            return data;
        } catch (err: any) {
            error.value = err.message || 'Failed to update entity group';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const deleteEntityGroup = async (id: string | number) => {
        try {
            loading.value = true;
            error.value = null;
            await entityGroupController.delete(id);
            
            // Remove from local state
            entityGroups.value = entityGroups.value.filter(group => group.id !== Number(id));
            
            // Clear selected entity group if it's the one being deleted
            if (selectedEntityGroup.value?.id === Number(id)) {
                selectedEntityGroup.value = null;
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to delete entity group';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchEntityGroupsByName = async (name: string) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await entityGroupController.getByName(name);
            // Handle both paginated and non-paginated responses
            return Array.isArray(response) ? response : ((response as any).data || []);
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entity groups by name';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const setSelectedEntityGroup = (entityGroup: EntityGroup | null) => {
        selectedEntityGroup.value = entityGroup;
    };

    const clearError = () => {
        error.value = null;
    };

    const setPage = (page: number) => {
        pagination.value.currentPage = page;
        pagination.value.skip = (page - 1) * pagination.value.limit;
    };

    const setLimit = (limit: number) => {
        pagination.value.limit = limit;
        pagination.value.skip = 0;
        pagination.value.currentPage = 1;
    };

    const reset = () => {
        entityGroups.value = [];
        selectedEntityGroup.value = null;
        loading.value = false;
        error.value = null;
        pagination.value = {
            total: 0,
            limit: 10,
            skip: 0,
            currentPage: 1
        };
    };

    return {
        // State
        entityGroups,
        loading,
        error,
        selectedEntityGroup,
        pagination,
        
        // Getters
        getEntityGroups,
        getEntityGroupById,
        getEntityGroupsByName,
        
        // Actions
        fetchEntityGroups,
        fetchEntityGroupById,
        createEntityGroup,
        updateEntityGroup,
        deleteEntityGroup,
        fetchEntityGroupsByName,
        setSelectedEntityGroup,
        setPage,
        setLimit,
        clearError,
        reset
    };
}, {
    persist: true
}); 
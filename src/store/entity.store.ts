import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { entityController } from '../api/controllers/entity.controllers';
import type { Entity, CreateEntity, UpdateEntity } from '../api/models/entity.model';
import { useAuthStore } from './auth.store';

export const useEntityStore = defineStore('entity', () => {
    // State
    const entities = ref<Entity[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const selectedEntity = ref<Entity | null>(null);
    
    // Pagination state
    const pagination = ref({
        total: 0,
        limit: 10,
        skip: 0,
        currentPage: 1
    });

    // Getters
    const getEntities = computed(() => entities.value);
    const getEntityById = computed(() => (id: number) => entities.value.find(entity => entity.id === id));
    const getEntitiesByName = computed(() => (name: string) => entities.value.filter(entity => entity.name.toLowerCase().includes(name.toLowerCase())));

    // Actions
    const fetchEntities = async (params?: any) => {
        try {
            loading.value = true;
            error.value = null;
            
            // Prepare query parameters with pagination
            const queryParams = {
                ...params,
                $limit: pagination.value.limit,
                $skip: pagination.value.skip
            };
            
            const response = await entityController.getAll(queryParams);
            console.log('API response:', response);
            
            // Handle both paginated and non-paginated responses
            if (Array.isArray(response)) {
                entities.value = response;
                pagination.value.total = response.length;
            } else {
                entities.value = (response as any).data || [];
                pagination.value.total = (response as any).total || 0;
            }
            
            console.log('Processed entities:', entities.value);
            return entities.value;
        } catch (err: any) {
            handleAuthError(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchEntityById = async (id: string | number) => {
        try {
            loading.value = true;
            error.value = null;
            const data = await entityController.getById(id);
            selectedEntity.value = data;
            return data;
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entity';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const createEntity = async (entity: CreateEntity) => {
        try {
            loading.value = true;
            error.value = null;
            const data = await entityController.create(entity);
            entities.value.push(data);
            return data;
        } catch (err: any) {
            error.value = err.message || 'Failed to create entity';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateEntity = async (id: string | number, entity: UpdateEntity) => {
        try {
            loading.value = true;
            error.value = null;
            const data = await entityController.update(id, entity);
            
            // Update in local state
            const index = entities.value.findIndex(ent => ent.id === Number(id));
            if (index !== -1) {
                entities.value[index] = data;
            }
            
            // Update selected entity if it's the one being updated
            if (selectedEntity.value?.id === Number(id)) {
                selectedEntity.value = data;
            }
            
            return data;
        } catch (err: any) {
            error.value = err.message || 'Failed to update entity';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const deleteEntity = async (id: string | number) => {
        try {
            loading.value = true;
            error.value = null;
            await entityController.delete(id);
            
            // Remove from local state
            entities.value = entities.value.filter(ent => ent.id !== Number(id));
            
            // Clear selected entity if it's the one being deleted
            if (selectedEntity.value?.id === Number(id)) {
                selectedEntity.value = null;
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to delete entity';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchEntitiesByName = async (name: string) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await entityController.getByName(name);
            // Handle both paginated and non-paginated responses
            return Array.isArray(response) ? response : ((response as any).data || []);
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entities by name';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchEntitiesByGroup = async (groupId: number) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await entityController.getByGroup(groupId);
            return Array.isArray(response) ? response : ((response as any).data || []);
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entities by group';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchEntitiesByCompany = async (companyId: number) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await entityController.getByCompany(companyId);
            return Array.isArray(response) ? response : ((response as any).data || []);
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch entities by company';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const setSelectedEntity = (entity: Entity | null) => {
        selectedEntity.value = entity;
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

    const clearError = () => {
        error.value = null;
    };

    const handleAuthError = (err: any) => {
        if (err.message?.includes('Authentication required')) {
            error.value = 'Session expired. Please login again.';
            const authStore = useAuthStore();
            // Optionally redirect to login or clear auth state
            authStore.logout();
        } else {
            error.value = err.message || 'An error occurred';
        }
    };

    const reset = () => {
        entities.value = [];
        selectedEntity.value = null;
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
        entities,
        loading,
        error,
        selectedEntity,
        pagination,
        
        // Getters
        getEntities,
        getEntityById,
        getEntitiesByName,
        
        // Actions
        fetchEntities,
        fetchEntityById,
        createEntity,
        updateEntity,
        deleteEntity,
        fetchEntitiesByName,
        fetchEntitiesByGroup,
        fetchEntitiesByCompany,
        setSelectedEntity,
        setPage,
        setLimit,
        clearError,
        reset
    };
}, {
    persist: true
}); 
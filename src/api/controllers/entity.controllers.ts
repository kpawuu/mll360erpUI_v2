import { entityService } from "../services/entity.service.ts";
import type { Entity, CreateEntity, UpdateEntity } from "../models/entity.model.ts";
import { useAuthStore } from "../../store/auth.store";

export const entityController = {
    // Get all entities
    async getAll(params?: any): Promise<Entity[]> {
        try {
            // Check if user is authenticated
            const authStore = useAuthStore();
            const isValid = await (authStore as any).isAccessTokenValid();
            if (!isValid) {
                throw new Error('Authentication required. Please login again.');
            }
            
            return await entityService.find(params);
        } catch (error) {
            console.error('Error fetching entities:', error);
            throw error;
        }
    },

    // Get entity by ID
    async getById(id: string | number): Promise<Entity> {
        try {
            // Check if user is authenticated
            const authStore = useAuthStore();
            const isValid = await (authStore as any).isAccessTokenValid();
            if (!isValid) {
                throw new Error('Authentication required. Please login again.');
            }
            
            return await entityService.get(id);
        } catch (error) {
            console.error('Error fetching entity:', error);
            throw error;
        }
    },

    // Create new entity
    async create(entity: CreateEntity): Promise<Entity> {
        try {
            // Check if user is authenticated
            const authStore = useAuthStore();
            const isValid = await authStore.isAccessTokenValid();
            if (!isValid) {
                throw new Error('Authentication required. Please login again.');
            }
            
            return await entityService.create(entity);
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    },

    // Update entity
    async update(id: string | number, entity: UpdateEntity): Promise<Entity> {
        try {
            // Check if user is authenticated
            const authStore = useAuthStore();
            const isValid = await authStore.isAccessTokenValid();
            if (!isValid) {
                throw new Error('Authentication required. Please login again.');
            }
            
            return await entityService.patch(id, entity);
        } catch (error) {
            console.error('Error updating entity:', error);
            throw error;
        }
    },

    // Delete entity
    async delete(id: string | number): Promise<Entity> {
        try {
            // Check if user is authenticated
            const authStore = useAuthStore();
            const isValid = await authStore.isAccessTokenValid();
            if (!isValid) {
                throw new Error('Authentication required. Please login again.');
            }
            
            return await entityService.remove(id);
        } catch (error) {
            console.error('Error deleting entity:', error);
            throw error;
        }
    },

    // Get entities by name
    async getByName(name: string): Promise<Entity[]> {
        try {
            return await entityService.find({
                query: {
                    name: {
                        $like: `%${name}%`
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching entities by name:', error);
            throw error;
        }
    },

    // Get entities by group
    async getByGroup(groupId: number): Promise<Entity[]> {
        try {
            return await entityService.find({
                query: {
                    group_id: groupId
                }
            });
        } catch (error) {
            console.error('Error fetching entities by group:', error);
            throw error;
        }
    },

    // Get entities by company
    async getByCompany(companyId: number): Promise<Entity[]> {
        try {
            return await entityService.find({
                query: {
                    company_id: companyId
                }
            });
        } catch (error) {
            console.error('Error fetching entities by company:', error);
            throw error;
        }
    }
}; 
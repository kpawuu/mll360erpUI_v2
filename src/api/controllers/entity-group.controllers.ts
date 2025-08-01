import { entityGroupService } from "../services/entity-group.service.ts";
import type { EntityGroup, CreateEntityGroup, UpdateEntityGroup } from "../models/entity-group.model.ts";

export const entityGroupController = {
    // Get all entity groups
    async getAll(params?: any): Promise<EntityGroup[]> {
        try {
            return await entityGroupService.find(params);
        } catch (error) {
            console.error('Error fetching entity groups:', error);
            throw error;
        }
    },

    // Get entity group by ID
    async getById(id: string | number): Promise<EntityGroup> {
        try {
            return await entityGroupService.get(id);
        } catch (error) {
            console.error('Error fetching entity group:', error);
            throw error;
        }
    },

    // Create new entity group
    async create(entityGroup: CreateEntityGroup): Promise<EntityGroup> {
        try {
            return await entityGroupService.create(entityGroup);
        } catch (error) {
            console.error('Error creating entity group:', error);
            throw error;
        }
    },

    // Update entity group
    async update(id: string | number, entityGroup: UpdateEntityGroup): Promise<EntityGroup> {
        try {
            return await entityGroupService.patch(id, entityGroup);
        } catch (error) {
            console.error('Error updating entity group:', error);
            throw error;
        }
    },

    // Delete entity group
    async delete(id: string | number): Promise<EntityGroup> {
        try {
            return await entityGroupService.remove(id);
        } catch (error) {
            console.error('Error deleting entity group:', error);
            throw error;
        }
    },

    // Get entity groups by name
    async getByName(name: string): Promise<EntityGroup[]> {
        try {
            return await entityGroupService.find({
                query: {
                    group_name: {
                        $like: `%${name}%`
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching entity groups by name:', error);
            throw error;
        }
    }
}; 
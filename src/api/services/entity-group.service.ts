import feathersClient from "../feathers.ts";
import type { EntityGroup, CreateEntityGroup, UpdateEntityGroup } from "../models/entity-group.model.ts";

// This properly types the service with its methods and the data type it works with
export const entityGroupService = feathersClient.service('entity-group') as {
  find(params?: any): Promise<EntityGroup[]>;
  get(id: string | number): Promise<EntityGroup>;
  create(data: CreateEntityGroup): Promise<EntityGroup>;
  update(id: string | number, data: EntityGroup): Promise<EntityGroup>;
  patch(id: string | number, data: UpdateEntityGroup): Promise<EntityGroup>;
  remove(id: string | number): Promise<EntityGroup>;
}; 
import feathersClient from "../feathers.ts";
import type { Entity, CreateEntity, UpdateEntity } from "../models/entity.model.ts";

// This properly types the service with its methods and the data type it works with
export const entityService = feathersClient.service('entity') as {
  find(params?: any): Promise<Entity[]>;
  get(id: string | number): Promise<Entity>;
  create(data: CreateEntity): Promise<Entity>;
  update(id: string | number, data: Entity): Promise<Entity>;
  patch(id: string | number, data: UpdateEntity): Promise<Entity>;
  remove(id: string | number): Promise<Entity>;
}; 
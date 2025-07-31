import feathersClient from "../feathers.ts";
import type { Users } from "../models/users.model.ts";

// This properly types the service with its methods and the data type it works with
export const usersService = feathersClient.service('users') as {
  find(): Promise<Users[]>;
  get(id: string): Promise<Users>;
  create(data: Partial<Users>): Promise<Users>;
  update(id: string, data: Users): Promise<Users>;
  patch(id: string, data: Partial<Users>): Promise<Users>;
  remove(id: string): Promise<Users>;
};
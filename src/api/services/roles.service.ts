import feathersClient from '../feathers'
import type { Roles, CreateRolesData, UpdateRolesData } from '../models/roles.model'

export const rolesService = feathersClient.service('roles')

export type { Roles, CreateRolesData, UpdateRolesData } 
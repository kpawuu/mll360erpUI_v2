import feathersClient from '../feathers'
import type { UserRoles, CreateUserRolesData, UpdateUserRolesData } from '../models/user-roles.model'

export const userRolesService = feathersClient.service('user-roles')

export type { UserRoles, CreateUserRolesData, UpdateUserRolesData } 
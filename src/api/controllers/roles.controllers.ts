import { rolesService } from '../services/roles.service'
import type { Roles, CreateRolesData, UpdateRolesData } from '../models/roles.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const rolesControllers = {
  async getRoles(params?: { query?: any }) {
    await authenticateFeathersClient()
    return await rolesService.find(params)
  },

  async getRole(id: number) {
    await authenticateFeathersClient()
    return await rolesService.get(id)
  },

  async createRole(roleData: CreateRolesData) {
    await authenticateFeathersClient()
    return await rolesService.create(roleData)
  },

  async updateRole(id: number, roleData: UpdateRolesData) {
    await authenticateFeathersClient()
    return await rolesService.patch(id, roleData)
  },

  async deleteRole(id: number) {
    await authenticateFeathersClient()
    return await rolesService.remove(id)
  }
} 
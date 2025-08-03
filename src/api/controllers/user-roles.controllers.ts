import { userRolesService } from '../services/user-roles.service'
import type { UserRoles, CreateUserRolesData, UpdateUserRolesData } from '../models/user-roles.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const userRolesControllers = {
  async getUserRoles(params?: { query?: any }) {
    await authenticateFeathersClient()
    return await userRolesService.find(params)
  },

  async getUserRole(id: number) {
    await authenticateFeathersClient()
    return await userRolesService.get(id)
  },

  async createUserRole(userRoleData: CreateUserRolesData) {
    await authenticateFeathersClient()
    return await userRolesService.create(userRoleData)
  },

  async updateUserRole(id: number, userRoleData: UpdateUserRolesData) {
    await authenticateFeathersClient()
    return await userRolesService.patch(id, userRoleData)
  },

  async deleteUserRole(id: number) {
    await authenticateFeathersClient()
    return await userRolesService.remove(id)
  },

  async getUserRolesByUser(userId: number, companyId: number) {
    await authenticateFeathersClient()
    return await userRolesService.find({
      query: {
        user_id: userId,
        company_id: companyId,
        $sort: { date_created: -1 }
      }
    })
  }
} 
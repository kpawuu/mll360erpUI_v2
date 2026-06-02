import { salesOrdersService } from '../services/sales-orders.service'
import type { CreateSalesOrder, UpdateSalesOrder } from '../models/sales-order.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const salesOrdersControllers = {
  async getSalesOrders(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    await authenticateFeathersClient()
    return salesOrdersService.find(params)
  },

  async getSalesOrder(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    await authenticateFeathersClient()
    return salesOrdersService.get(id)
  },

  async createSalesOrder(data: CreateSalesOrder) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    await authenticateFeathersClient()
    return salesOrdersService.create(data)
  },

  async updateSalesOrder(id: number, data: UpdateSalesOrder) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    await authenticateFeathersClient()
    return salesOrdersService.patch(id, data)
  },

  async removeSalesOrder(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) {
      throw new Error('Authentication required')
    }
    await authenticateFeathersClient()
    return salesOrdersService.remove(id)
  }
}

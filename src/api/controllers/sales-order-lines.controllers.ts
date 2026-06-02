import { salesOrderLinesService } from '../services/sales-order-lines.service'
import type { CreateSalesOrderLine, UpdateSalesOrderLine } from '../models/sales-order-line.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const salesOrderLinesControllers = {
  async find(params?: { query?: any }) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) throw new Error('Authentication required')
    await authenticateFeathersClient()
    return salesOrderLinesService.find(params)
  },
  async create(data: CreateSalesOrderLine) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) throw new Error('Authentication required')
    await authenticateFeathersClient()
    return salesOrderLinesService.create(data)
  },
  async patch(id: number, data: UpdateSalesOrderLine) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) throw new Error('Authentication required')
    await authenticateFeathersClient()
    return salesOrderLinesService.patch(id, data)
  },
  async remove(id: number) {
    const authStore = useAuthStore()
    if (!(await authStore.isAccessTokenValid())) throw new Error('Authentication required')
    await authenticateFeathersClient()
    return salesOrderLinesService.remove(id)
  }
}

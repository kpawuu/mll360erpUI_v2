import feathersClient from '../feathers'
import type { CompanyDepartment } from '../models/company-departments.model'

export const companyDepartmentsService = feathersClient.service('company-departments') as any

export type CompanyDepartmentsService = typeof companyDepartmentsService 
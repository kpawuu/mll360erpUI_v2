import feathersClient from '../feathers'
import type { Company } from '../models/company.model'

export const companyService = feathersClient.service('company') as any

export type CompanyService = typeof companyService 
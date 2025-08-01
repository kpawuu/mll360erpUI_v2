import feathersClient from '../feathers'
import type { CompanyBranch } from '../models/company-branches.model'

export const companyBranchesService = feathersClient.service('company-branches') as any

export type CompanyBranchesService = typeof companyBranchesService 
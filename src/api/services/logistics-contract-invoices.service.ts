import feathersClient from '../feathers'
import type { LogisticsContractInvoice } from '../models/logistics-contract-invoices.model'

export const logisticsContractInvoicesService = feathersClient.service('logistics-contract-invoices') as any

export type LogisticsContractInvoicesService = typeof logisticsContractInvoicesService

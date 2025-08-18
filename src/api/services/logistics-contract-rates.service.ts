import feathersClient from '../feathers'
import type { LogisticsContractRate } from '../models/logistics-contract-rates.model'

export const logisticsContractRatesService = feathersClient.service('logistics-contract-rates') as any

export type LogisticsContractRatesService = typeof logisticsContractRatesService

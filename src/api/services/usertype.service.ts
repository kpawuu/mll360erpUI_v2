import feathersClient from '../feathers'
import type { Usertype } from '../models/usertype.model'

export const usertypeService = feathersClient.service('usertype') as any

export type UsertypeService = typeof usertypeService 
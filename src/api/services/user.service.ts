import feathersClient from '../feathers'
import type { User } from '../models/user.model'

export const userService = feathersClient.service('users') as any

export type UserService = typeof userService 
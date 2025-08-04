import feathersClient from '../feathers'
import type { Activity, CreateActivity, UpdateActivity } from '../models/activities.model'

export const getActivities = async (params?: any) => {
  return await feathersClient.service('crm/activities').find(params)
}

export const getActivity = async (id: number) => {
  return await feathersClient.service('crm/activities').get(id)
}

export const createActivity = async (data: CreateActivity) => {
  return await feathersClient.service('crm/activities').create(data)
}

export const updateActivity = async (id: number, data: UpdateActivity) => {
  return await feathersClient.service('crm/activities').patch(id, data)
}

export const deleteActivity = async (id: number) => {
  return await feathersClient.service('crm/activities').remove(id)
} 
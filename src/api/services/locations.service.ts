import feathersClient from '../feathers'
import type { Locations, CreateLocationsData, UpdateLocationsData } from '../models/locations.model'

export const locationsService = feathersClient.service('locations')

export type { Locations, CreateLocationsData, UpdateLocationsData } 
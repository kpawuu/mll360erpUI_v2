import feathersClient from '../feathers'
import type { File, CreateFile, UpdateFile } from '../models/file.model'

export const fileService = feathersClient.service('files') as any

export type FileService = typeof fileService

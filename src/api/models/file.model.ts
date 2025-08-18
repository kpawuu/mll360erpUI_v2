export interface File {
  id: number
  entity_id: number
  entity_type: string
  company_id: number
  file_name: string
  file_description?: string
  file_type: string
  file_size: number
  file_url: string
  file_hash: string
  file_extension: string
  file_tags?: string
  file_metadata?: any
  file_thumbnail?: string
  file_preview?: string
  file_download_count?: number
  date_created: string
  date_updated?: string
  date_deleted?: string
  cloudinary?: {
    secure_url: string
    public_id: string
    etag: string
    format: string
    description?: string
    tags?: string[]
    metadata?: any
    thumbnail?: string
    preview?: string
    download_count?: number
  }
}

export interface CreateFile {
  entity_id: number
  entity_type: string
  company_id: number
  file_name: string
  file_description?: string
  file_type: string
  file_size: number
  file_url: string
  file_hash: string
  file_extension: string
  file_tags?: string
  file_metadata?: any
  file_thumbnail?: string
  file_preview?: string
  file_download_count?: number
}

export interface UpdateFile {
  file_name?: string
  file_description?: string
  file_tags?: string
  file_metadata?: any
}

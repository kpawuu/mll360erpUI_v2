export interface Entity {
  id: number;
  company_id: number;
  group_id: number;
  name: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  username?: string;
  password?: string;
  date_created: string;
  date_updated?: string;
  date_deleted?: string;
  company?: Company;
  group?: EntityGroup;
  contact_persons?: EntityContactPerson[];
  documents?: File[];
}

export interface CreateEntity {
  company_id: number;
  group_id: number;
  name: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  username?: string;
  password?: string;
}

export interface UpdateEntity {
  company_id?: number;
  group_id?: number;
  name?: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  username?: string;
  password?: string;
}

// Related interfaces
export interface Company {
  id: number;
  name: string;
  // Add other company fields as needed
}

export interface EntityGroup {
  id: number;
  group_name: string;
  group_description: string;
  // Add other entity group fields as needed
}

export interface EntityContactPerson {
  id: number;
  company_id: number;
  entity_id: number;
  name: string;
  email_address: string;
  phone_number: string;
  date_created: string;
  date_updated?: string;
  date_deleted?: string;
}

export interface File {
  id: number;
  entity_id: number;
  entity_type: string;
  file_name: string;
  file_description: string;
  file_type: string;
  file_size?: number;
  file_url: string;
  file_hash: string;
  file_extension: string;
  date_created: string;
} 
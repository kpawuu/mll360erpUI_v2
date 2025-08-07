export interface Activity {
  id: number;
  type: 'call' | 'email' | 'online_meeting' | 'physical_visit' | 'other';
  subject: string;
  description?: string;
  user_id: number;
  entity_type: 'entity' | 'crm/leads' | 'crm/opportunities';
  entity_id?: number;
  company_id: number;
  status: 'pending' | 'completed' | 'cancelled' | 'in_progress';
  date_start: string;
  date_end: string;
  date_start_time: string;
  date_end_time: string;
  location?: string;
  notes?: string;
  date_created: string;
  date_updated?: string;
  date_deleted?: string;
  user?: User;
  entity?: Entity;
  company?: Company;
  lead?: Lead;
  opportunity?: Opportunity;
}

export interface CreateActivity {
  type: 'call' | 'email' | 'online_meeting' | 'physical_visit' | 'other';
  subject: string;
  description?: string;
  user_id: number;
  entity_type: 'entity' | 'crm/leads' | 'crm/opportunities';
  entity_id?: number;
  company_id: number;
  status: 'pending' | 'completed' | 'cancelled' | 'in_progress';
  date_start: string;
  date_end: string;
  date_start_time: string;
  date_end_time: string;
  location?: string;
  notes?: string;
}

export interface UpdateActivity {
  type?: 'call' | 'email' | 'online_meeting' | 'physical_visit' | 'other';
  subject?: string;
  description?: string;
  user_id?: number;
  entity_type?: 'entity' | 'crm/leads' | 'crm/opportunities';
  entity_id?: number;
  company_id?: number;
  status?: 'pending' | 'completed' | 'cancelled' | 'in_progress';
  date_start?: string;
  date_end?: string;
  date_start_time?: string;
  date_end_time?: string;
  location?: string;
  notes?: string;
}

// Related interfaces
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  // Add other user fields as needed
}

export interface Entity {
  id: number;
  name: string;
  // Add other entity fields as needed
}

export interface Company {
  id: number;
  name: string;
  // Add other company fields as needed
}

export interface Lead {
  id: number;
  title: string;
  contact_name: string;
  company_name: string;
  // Add other lead fields as needed
}

export interface Opportunity {
  id: number;
  title: string;
  contact_name: string;
  company_name: string;
  // Add other opportunity fields as needed
} 
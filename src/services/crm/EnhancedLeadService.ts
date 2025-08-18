import { CustomerDetectionService } from './CustomerDetectionService.ts'
import type { CustomerDetectionResult, LeadCreationData } from './CustomerDetectionService.ts'
import { useLeadsStore } from '../../store/leads.store.ts'
import { useOpportunitiesStore } from '../../store/opportunities.store.ts'
import { useAuthStore } from '../../store/auth.store.ts'

export interface LeadCreationResult {
  success: boolean
  leadId?: number
  entityId?: number
  contactId?: number
  customerType: 'existing' | 'new'
  message: string
  error?: string
}

export class EnhancedLeadService {
  private customerDetectionService: CustomerDetectionService
  
  constructor() {
    this.customerDetectionService = new CustomerDetectionService()
  }
  
  // Lazy-load stores to avoid Pinia initialization issues
  private get leadsStore() {
    return useLeadsStore()
  }
  
  private get opportunitiesStore() {
    return useOpportunitiesStore()
  }
  
  private get authStore() {
    return useAuthStore()
  }

  /**
   * Create lead with customer detection
   */
  async createLeadWithCustomerDetection(leadData: LeadCreationData): Promise<LeadCreationResult> {
    try {
      // 1. Detect existing customer
      const detectionResult = await this.customerDetectionService.detectExistingCustomer(leadData)
      
      let entityId: number
      let contactId: number | undefined
      let customerType: 'existing' | 'new'
      
      // 2. Handle customer creation/linking based on detection result
      if (detectionResult.isExisting && detectionResult.existingCustomer) {
        // Use existing customer
        const result = await this.customerDetectionService.linkToExistingCustomer(
          leadData, 
          detectionResult.existingCustomer
        )
        entityId = result.entityId
        contactId = result.contactId
        customerType = 'existing'
      } else {
        // Create new customer
        const result = await this.customerDetectionService.createNewCustomer(leadData)
        entityId = result.entityId
        contactId = result.contactId
        customerType = 'new'
      }
      
      // 3. Create lead with proper entity and contact references
      const leadPayload = {
        ...leadData,
        entity_id: entityId,
        contact_id: contactId,
        // Keep required fields but use entity/contact references
        company_name: leadData.company_name,
        contact_name: leadData.contact_name,
        contact_email: leadData.contact_email,
        contact_phone: leadData.contact_phone,
        // Ensure service_type is a valid enum value
        service_type: leadData.service_type as 'Freight' | 'Warehouse' | 'Transport',
        // Ensure estimated_value is always a number
        estimated_value: leadData.estimated_value || 0,
        // Ensure expected_service_date is always a string
        expected_service_date: leadData.expected_service_date || new Date().toISOString().split('T')[0]
      }
      
      const createdLead = await this.leadsStore.createLead(leadPayload)
      
      return {
        success: true,
        leadId: createdLead.id,
        entityId,
        contactId,
        customerType,
        message: customerType === 'existing' 
          ? 'Lead created successfully with existing customer' 
          : 'Lead created successfully with new customer'
      }
      
    } catch (error: any) {
      console.error('Error creating lead with customer detection:', error)
      return {
        success: false,
        customerType: 'new',
        message: 'Failed to create lead',
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  /**
   * Create opportunity with customer detection
   */
  async createOpportunityWithCustomerDetection(opportunityData: LeadCreationData): Promise<LeadCreationResult> {
    try {
      // 1. Detect existing customer
      const detectionResult = await this.customerDetectionService.detectExistingCustomer(opportunityData)
      
      let entityId: number
      let contactId: number | undefined
      let customerType: 'existing' | 'new'
      
      // 2. Handle customer creation/linking based on detection result
      if (detectionResult.isExisting && detectionResult.existingCustomer) {
        // Use existing customer
        const result = await this.customerDetectionService.linkToExistingCustomer(
          opportunityData, 
          detectionResult.existingCustomer
        )
        entityId = result.entityId
        contactId = result.contactId
        customerType = 'existing'
      } else {
        // Create new customer
        const result = await this.customerDetectionService.createNewCustomer(opportunityData)
        entityId = result.entityId
        contactId = result.contactId
        customerType = 'new'
      }
      
      // 3. Create opportunity with proper entity and contact references
      const opportunityPayload = {
        ...opportunityData,
        entity_id: entityId,
        contact_id: contactId,
        // Add required fields for opportunities
        company_id: this.authStore.user?.company_id || 1,
        owner_id: this.authStore.user?.id || 1,
        currency_id: 1, // Default currency
        type: 'one-time' as 'one-time' | 'contract', // Default type
        // Ensure amount is always a number
        amount: opportunityData.amount || 0,
        // Ensure probability is always a number
        probability: opportunityData.probability || 0,
        // Keep required fields but use entity/contact references
        company_name: opportunityData.company_name,
        contact_name: opportunityData.contact_name,
        contact_email: opportunityData.contact_email,
        contact_phone: opportunityData.contact_phone,
        // Ensure service_type is a valid enum value
        service_type: opportunityData.service_type as 'Freight' | 'Warehouse' | 'Transport'
      }
      
      const createdOpportunity = await this.opportunitiesStore.createOpportunity(opportunityPayload)
      
      return {
        success: true,
        leadId: createdOpportunity.id, // Using leadId field for opportunity ID
        entityId,
        contactId,
        customerType,
        message: customerType === 'existing' 
          ? 'Opportunity created successfully with existing customer' 
          : 'Opportunity created successfully with new customer'
      }
      
    } catch (error: any) {
      console.error('Error creating opportunity with customer detection:', error)
      return {
        success: false,
        customerType: 'new',
        message: 'Failed to create opportunity',
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  /**
   * Convert lead to opportunity with customer detection
   */
  async convertLeadToOpportunity(leadId: number, opportunityData: Partial<LeadCreationData>): Promise<LeadCreationResult> {
    try {
      // 1. Get existing lead to extract customer information
      const lead = await this.leadsStore.fetchLead(leadId)
      
      // 2. Merge lead data with opportunity data
      const mergedData: LeadCreationData = {
        ...opportunityData,
        // Use lead's customer data if not provided in opportunity data
        company_name: opportunityData.company_name || lead.company_name,
        company_website: opportunityData.company_website || lead.company_website,
        company_address: opportunityData.company_address || lead.company_address,
        contact_name: opportunityData.contact_name || lead.contact_name,
        contact_email: opportunityData.contact_email || lead.contact_email,
        contact_phone: opportunityData.contact_phone || lead.contact_phone,
        contact_position: opportunityData.contact_position || lead.contact_position,
        // Use lead's service data if not provided
        service_type: opportunityData.service_type || lead.service_type,
        origin: opportunityData.origin || lead.origin,
        destination: opportunityData.destination || lead.destination,
        cargo_description: opportunityData.cargo_description || lead.cargo_description
      } as LeadCreationData
      
      // 3. Create opportunity with customer detection
      const result = await this.createOpportunityWithCustomerDetection(mergedData)
      
      if (result.success) {
        // 4. Update lead to mark as converted
        await this.leadsStore.updateLead(leadId, {
          converted_to_deal_id: result.leadId,
          converted_at: new Date().toISOString(),
          converted_by: 1, // Current user ID
          is_active: false // Deactivate the lead
        })
      }
      
      return result
      
    } catch (error: any) {
      console.error('Error converting lead to opportunity:', error)
      return {
        success: false,
        customerType: 'new',
        message: 'Failed to convert lead to opportunity',
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  /**
   * Update lead with customer detection
   */
  async updateLeadWithCustomerDetection(leadId: number, leadData: LeadCreationData): Promise<LeadCreationResult> {
    try {
      // 1. Detect existing customer
      const detectionResult = await this.customerDetectionService.detectExistingCustomer(leadData)
      
      let entityId: number
      let contactId: number | undefined
      let customerType: 'existing' | 'new'
      
      // 2. Handle customer creation/linking based on detection result
      if (detectionResult.isExisting && detectionResult.existingCustomer) {
        // Use existing customer
        const result = await this.customerDetectionService.linkToExistingCustomer(
          leadData, 
          detectionResult.existingCustomer
        )
        entityId = result.entityId
        contactId = result.contactId
        customerType = 'existing'
      } else {
        // Create new customer
        const result = await this.customerDetectionService.createNewCustomer(leadData)
        entityId = result.entityId
        contactId = result.contactId
        customerType = 'new'
      }
      
      // 3. Update lead with proper entity and contact references
      const leadPayload = {
        ...leadData,
        entity_id: entityId,
        contact_id: contactId,
        // Keep required fields but use entity/contact references
        company_name: leadData.company_name,
        contact_name: leadData.contact_name,
        contact_email: leadData.contact_email,
        contact_phone: leadData.contact_phone,
        // Ensure service_type is a valid enum value
        service_type: leadData.service_type as 'Freight' | 'Warehouse' | 'Transport',
        // Ensure estimated_value is always a number
        estimated_value: leadData.estimated_value || 0,
        // Ensure expected_service_date is always a string
        expected_service_date: leadData.expected_service_date || new Date().toISOString().split('T')[0]
      }
      
      const updatedLead = await this.leadsStore.updateLead(leadId, leadPayload)
      
      return {
        success: true,
        leadId: updatedLead.id,
        entityId,
        contactId,
        customerType,
        message: customerType === 'existing' 
          ? 'Lead updated successfully with existing customer' 
          : 'Lead updated successfully with new customer'
      }
      
    } catch (error: any) {
      console.error('Error updating lead with customer detection:', error)
      return {
        success: false,
        customerType: 'new',
        message: 'Failed to update lead',
        error: error.message || 'Unknown error occurred'
      }
    }
  }

  /**
   * Detect customer for UI integration
   */
  async detectCustomer(customerData: any): Promise<CustomerDetectionResult> {
    return await this.customerDetectionService.detectExistingCustomer(customerData)
  }

  /**
   * Get customer detection result for preview
   */
  async getCustomerDetectionPreview(customerData: any): Promise<CustomerDetectionResult> {
    return await this.customerDetectionService.detectExistingCustomer(customerData)
  }

  /**
   * Handle customer selection from detection modal
   */
  async handleCustomerSelection(
    customerData: any, 
    selection: 'existing' | 'new', 
    existingCustomer?: any
  ): Promise<{ entityId: number; contactId?: number }> {
    if (selection === 'existing' && existingCustomer) {
      return await this.customerDetectionService.linkToExistingCustomer(customerData, existingCustomer)
    } else {
      return await this.customerDetectionService.createNewCustomer(customerData)
    }
  }
}

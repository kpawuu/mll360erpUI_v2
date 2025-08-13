import { useOpportunitiesStore } from '../../store/opportunities.store'
import { useEntityStore } from '../../store/entity.store'
import { useEntityContactPersonStore } from '../../store/entity-contact-person.store'
import { useShipmentStore } from '../../store/shipment.store'
import { useUserStore } from '../../store/user.store'
import { useCompanyStore } from '../../store/company.store'

export interface OpportunityWinData {
  opportunityId: number
  wonDate: string
  actualAmount?: number
  notes?: string
  nextSteps?: string[]
}

export interface WinProcessResult {
  success: boolean
  message: string
  data?: {
    customerId?: number
    contactId?: number
    projectId?: number
    invoiceId?: number
  }
  errors?: string[]
}

export class OpportunityWinService {
  // Lazy-load stores to avoid Pinia initialization issues
  private get opportunitiesStore() {
    return useOpportunitiesStore()
  }
  
  private get entityStore() {
    return useEntityStore()
  }
  
  private get entityContactPersonStore() {
    return useEntityContactPersonStore()
  }
  
  private get shipmentStore() {
    return useShipmentStore()
  }
  
  private get userStore() {
    return useUserStore()
  }
  
  private get companyStore() {
    return useCompanyStore()
  }

  /**
   * Process an opportunity win - the main orchestrator function
   */
  async processOpportunityWin(winData: OpportunityWinData): Promise<WinProcessResult> {
    const result: WinProcessResult = {
      success: false,
      message: '',
      data: {},
      errors: []
    }

    try {
      console.log('Processing opportunity win:', winData)

      // 1. Get the opportunity details
      const opportunity = await this.getOpportunity(winData.opportunityId)
      if (!opportunity) {
        result.errors?.push('Opportunity not found')
        return result
      }

      // 2. Update opportunity status to "Won"
      await this.markOpportunityAsWon(opportunity.id, winData)

      // 3. Create or update customer entity
      const customerResult = await this.processCustomerCreation(opportunity)
      if (customerResult.success && customerResult.customerId) {
        result.data!.customerId = customerResult.customerId
      }

      // 4. Create or update contact person
      const contactResult = await this.processContactCreation(opportunity, customerResult.customerId)
      if (contactResult.success && contactResult.contactId) {
        result.data!.contactId = contactResult.contactId
      }

      // 5. Create initial shipment/project (if applicable)
      const projectResult = await this.createInitialProject(opportunity, customerResult.customerId)
      if (projectResult.success && projectResult.projectId) {
        result.data!.projectId = projectResult.projectId
      }

      // 6. Generate invoice (if applicable)
      const invoiceResult = await this.generateInvoice(opportunity, customerResult.customerId)
      if (invoiceResult.success && invoiceResult.invoiceId) {
        result.data!.invoiceId = invoiceResult.invoiceId
      }

      // 7. Update analytics and reporting
      await this.updateAnalytics(opportunity)

      // 8. Send notifications
      await this.sendNotifications(opportunity, result.data)

      result.success = true
      result.message = `Opportunity "${opportunity.title}" successfully marked as won!`
      
      console.log('Opportunity win process completed successfully:', result)
      return result

    } catch (error: any) {
      console.error('Error processing opportunity win:', error)
      result.errors?.push(error.message || 'Unknown error occurred')
      return result
    }
  }

  /**
   * Get opportunity details
   */
  private async getOpportunity(opportunityId: number) {
    try {
      // This would typically call your opportunities store
      // For now, we'll simulate getting the opportunity
      const opportunities = this.opportunitiesStore.opportunities
      return opportunities.find(opp => opp.id === opportunityId)
    } catch (error) {
      console.error('Error getting opportunity:', error)
      throw error
    }
  }

  /**
   * Mark opportunity as won and update relevant fields
   */
  private async markOpportunityAsWon(opportunityId: number, winData: OpportunityWinData) {
    try {
      const updateData = {
        stage_id: this.getWonStageId(), // You'll need to implement this
        probability: 100,
        actual_amount: winData.actualAmount,
        won_date: winData.wonDate,
        status: 'won',
        notes: winData.notes ? `${opportunity.notes || ''}\n\nWON: ${winData.notes}` : opportunity.notes
      }

      await this.opportunitiesStore.updateOpportunity(opportunityId, updateData)
      console.log('Opportunity marked as won:', opportunityId)
    } catch (error) {
      console.error('Error marking opportunity as won:', error)
      throw error
    }
  }

  /**
   * Process customer creation - create entity if it doesn't exist
   */
  private async processCustomerCreation(opportunity: any): Promise<{ success: boolean; customerId?: number }> {
    try {
      // Check if entity already exists
      if (opportunity.entity_id) {
        console.log('Customer entity already exists:', opportunity.entity_id)
        return { success: true, customerId: opportunity.entity_id }
      }

      // Get the logged-in company (service provider)
      const currentCompany = this.companyStore.company
      if (!currentCompany) {
        console.error('No logged-in company found')
        return { success: false }
      }

      // Create new entity for the customer (client)
      const entityData = {
        company_id: currentCompany.id,  // The service provider's company
        group_id: 1,                    // Customer group
        name: opportunity.company_name,
        email: opportunity.contact_email,
        phonenumber: opportunity.contact_phone,
        address: opportunity.company_address,
        description: `Customer from opportunity: ${opportunity.title}`
      }

      // This would call your entity store to create the entity
      // const newEntity = await this.entityStore.createEntity(entityData)
      console.log('Creating new customer entity:', entityData)
      
      // For now, return a mock success
      return { success: true, customerId: 999 } // Mock ID
    } catch (error) {
      console.error('Error creating customer entity:', error)
      return { success: false }
    }
  }

  /**
   * Process contact person creation
   */
  private async processContactCreation(opportunity: any, customerId?: number): Promise<{ success: boolean; contactId?: number }> {
    try {
      // Check if contact already exists
      if (opportunity.contact_id) {
        console.log('Contact person already exists:', opportunity.contact_id)
        return { success: true, contactId: opportunity.contact_id }
      }

      if (!customerId) {
        console.log('No customer ID provided for contact creation')
        return { success: false }
      }

      // Get the logged-in company (service provider)
      const currentCompany = this.companyStore.company
      if (!currentCompany) {
        console.error('No logged-in company found')
        return { success: false }
      }

      // Create new contact person
      const contactData = {
        company_id: currentCompany.id,  // The service provider's company
        entity_id: customerId,          // The client entity
        name: opportunity.contact_name,
        email_address: opportunity.contact_email,
        phone_number: opportunity.contact_phone,
        job_title: opportunity.contact_position,
        is_primary: true
      }

      // This would call your entity contact person store
      // const newContact = await this.entityContactPersonStore.createEntityContactPerson(contactData)
      console.log('Creating new contact person:', contactData)
      
      return { success: true, contactId: 888 } // Mock ID
    } catch (error) {
      console.error('Error creating contact person:', error)
      return { success: false }
    }
  }

  /**
   * Create initial project/shipment based on opportunity
   */
  private async createInitialProject(opportunity: any, customerId?: number): Promise<{ success: boolean; projectId?: number }> {
    try {
      if (!customerId) {
        console.log('No customer ID provided for project creation')
        return { success: false }
      }

      // Create shipment/project based on opportunity details
      const projectData = {
        company_id: opportunity.company_id,
        client_id: customerId,
        user_id: opportunity.owner_id,
        shipment_mode: this.getShipmentMode(opportunity.service_type),
        cargo_description: opportunity.cargo_description,
        // Add other relevant fields based on your shipment schema
        status_id: this.getActiveStatusId(), // You'll need to implement this
        date_created: new Date().toISOString()
      }

      // This would call your shipment store
      // const newProject = await this.shipmentStore.createShipment(projectData)
      console.log('Creating initial project/shipment:', projectData)
      
      return { success: true, projectId: 777 } // Mock ID
    } catch (error) {
      console.error('Error creating initial project:', error)
      return { success: false }
    }
  }

  /**
   * Generate invoice for the won opportunity
   */
  private async generateInvoice(opportunity: any, customerId?: number): Promise<{ success: boolean; invoiceId?: number }> {
    try {
      if (!customerId) {
        console.log('No customer ID provided for invoice generation')
        return { success: false }
      }

      // This would integrate with your invoicing system
      // For now, we'll just log the invoice creation
      const invoiceData = {
        customer_id: customerId,
        amount: opportunity.actual_amount || opportunity.amount,
        currency_id: opportunity.currency_id,
        description: `Invoice for opportunity: ${opportunity.title}`,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        status: 'pending'
      }

      console.log('Generating invoice:', invoiceData)
      
      return { success: true, invoiceId: 666 } // Mock ID
    } catch (error) {
      console.error('Error generating invoice:', error)
      return { success: false }
    }
  }

  /**
   * Update analytics and reporting data
   */
  private async updateAnalytics(opportunity: any) {
    try {
      // Update win rate calculations
      // Update sales performance metrics
      // Update revenue forecasting
      // Update conversion rates
      
      console.log('Updating analytics for won opportunity:', opportunity.id)
    } catch (error) {
      console.error('Error updating analytics:', error)
      // Don't throw error as this is not critical
    }
  }

  /**
   * Send notifications about the won opportunity
   */
  private async sendNotifications(opportunity: any, resultData: any) {
    try {
      // Send email to sales manager
      // Send notification to opportunity owner
      // Send notification to customer
      // Update activity feed
      
      console.log('Sending notifications for won opportunity:', opportunity.id)
    } catch (error) {
      console.error('Error sending notifications:', error)
      // Don't throw error as this is not critical
    }
  }

  /**
   * Helper method to get shipment mode based on service type
   */
  private getShipmentMode(serviceType: string): string {
    switch (serviceType) {
      case 'Freight':
        return 'Air' // or 'Sea' based on your business logic
      case 'Transport':
        return 'Road'
      case 'Warehouse':
        return 'Other'
      default:
        return 'Other'
    }
  }

  /**
   * Helper methods - these would need to be implemented based on your data
   */
  private getWonStageId(): number {
    // This should return the ID of your "Won" or "Closed Won" stage
    // You might want to store this in a configuration or fetch it dynamically
    return 999 // Mock ID
  }

  private getCustomerGroupId(): number {
    // This should return the ID of your customer group
    return 1 // Mock ID
  }

  private getActiveStatusId(): number {
    // This should return the ID of your active status
    return 1 // Mock ID
  }
}

// Export singleton instance
export const opportunityWinService = new OpportunityWinService()

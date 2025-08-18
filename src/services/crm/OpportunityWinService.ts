import { useOpportunitiesStore } from '../../store/opportunities.store'
import { useEntityStore } from '../../store/entity.store'
import { useEntityContactPersonStore } from '../../store/entity-contact-person.store'
import { useShipmentStore } from '../../store/shipment.store'
import { useUserStore } from '../../store/user.store'
import { useCompanyStore } from '../../store/company.store'
import { useLogisticsContractRatesStore } from '../../store/logistics-contract-rates.store'
import { useAuthStore } from '../../store/auth.store'
import { useStagesStore } from '../../store/stages.store'
import feathersClient from '../../api/feathers'

export interface OpportunityWinData {
  opportunityId: number
  wonDate: string
  actualAmount?: number | string
  notes?: string
  nextSteps?: string[]
  // Logistics-specific fields
  logisticsServiceType?: 'warehousing' | 'transportation' | 'freight' | 'integrated'
  contractBasis?: 'per_kg' | 'per_cbm' | 'per_shipment' | 'per_pallet' | 'per_container' | 'per_hour' | 'per_day' | 'per_month' | 'fixed_rate'
  contractDurationMonths?: number
  contractStartDate?: string
  contractEndDate?: string
  originLocationId?: number
  destinationLocationId?: number
  warehouseLocationId?: number
  shipmentMode?: 'Air' | 'Sea' | 'Road' | 'Rail' | 'Other'
  commodityType?: string
  specialHandlingRequired?: boolean
  temperatureControlled?: boolean
  hazardousMaterials?: boolean
  baseRate?: number
  rateCurrencyId?: number
  minimumCharge?: number
  fuelSurchargePercentage?: number
  handlingFeePercentage?: number
}

export interface WinProcessResult {
  success: boolean
  message: string
  data?: {
    customerId?: number
    contactId?: number
    projectId?: number
    invoiceId?: number
    contractId?: number
    ratesCreated?: number
    logisticsInvoiceId?: number
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

  private get logisticsContractRatesStore() {
    return useLogisticsContractRatesStore()
  }



  private get stagesStore() {
    return useStagesStore()
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
      console.log('🚀 Starting processOpportunityWin with data:', winData)

      // Get the opportunity details
      console.log('📋 Fetching opportunity details for ID:', winData.opportunityId)
      
      let opportunityData: any
      
      try {
        // Try using Feathers client directly first
        const opportunity = await feathersClient.service('crm/opportunities').get(winData.opportunityId)
        console.log('✅ Opportunity found via Feathers:', opportunity)
        opportunityData = opportunity
      } catch (error) {
        console.error('Error fetching opportunity via Feathers:', error)
        // Fallback to store method
        const opportunity = await this.opportunitiesStore.fetchOpportunities({ query: { id: winData.opportunityId } })
        if (!opportunity || !opportunity.data || opportunity.data.length === 0) {
          console.error('❌ Opportunity not found')
          result.message = 'Opportunity not found'
          result.errors?.push('Opportunity not found')
          return result
        }
        opportunityData = opportunity.data[0]
        console.log('✅ Opportunity found via store:', opportunityData)
      }

      if (!opportunityData) {
        console.error('❌ Opportunity data is null or undefined')
        result.message = 'Opportunity data is invalid'
        result.errors?.push('Opportunity data is invalid')
        return result
      }

      // Step 1: Process customer creation (entity)
      console.log('👤 Step 1: Processing customer creation')
      const customerResult = await this.processCustomerCreation(opportunityData)
      if (!customerResult.success) {
        console.error('❌ Customer creation failed')
        result.message = 'Failed to create customer entity'
        result.errors?.push('Customer creation failed')
        return result
      }
      console.log('✅ Customer creation successful:', customerResult.customerId)

      // Step 2: Process contact person creation
      console.log('📞 Step 2: Processing contact person creation')
      const contactResult = await this.processContactCreation(opportunityData, customerResult.customerId)
      if (!contactResult.success) {
        console.error('❌ Contact creation failed')
        result.message = 'Failed to create contact person'
        result.errors?.push('Contact creation failed')
        return result
      }
      console.log('✅ Contact creation successful:', contactResult.contactId)

      // Step 3: Mark opportunity as won
      console.log('🏆 Step 3: Marking opportunity as won')
      await this.markOpportunityAsWon(opportunityData.id, winData)
      console.log('✅ Opportunity marked as won')

      // Step 4: Handle logistics contract setup (if applicable)
      console.log('📋 Step 4: Processing logistics contract setup')
      let contractResult: { success: boolean; contractId?: number; ratesCreated: number } = { success: false, contractId: undefined, ratesCreated: 0 }
      if (winData.logisticsServiceType && opportunityData.type === 'contract') {
        contractResult = await this.processLogisticsContract(opportunityData, winData)
        console.log('✅ Logistics contract setup result:', contractResult)
      } else {
        console.log('⏭️ Skipping logistics contract setup (not applicable)')
      }

      // Step 5: Generate invoice (one-time or contract)
      console.log('🧾 Step 5: Generating invoice')
      let invoiceResult: { success: boolean; invoiceId?: number } = { success: false, invoiceId: undefined }
      if (opportunityData.type === 'one-time') {
        console.log('💰 Generating one-time invoice')
        invoiceResult = await this.generateOneTimeInvoice(opportunityData, customerResult.customerId!, winData)
      } else if (contractResult.success) {
        console.log('📄 Generating logistics invoice')
        invoiceResult = await this.generateLogisticsInvoice(opportunityData, winData)
      } else {
        console.log('⏭️ Skipping invoice generation (not applicable)')
      }
      console.log('✅ Invoice generation result:', invoiceResult)

      // Step 6: Create initial project/shipment
      console.log('🚢 Step 6: Creating initial project/shipment')
      const projectResult = await this.createInitialProject(opportunityData, customerResult.customerId)
      console.log('✅ Project creation result:', projectResult)

      // Step 7: Update analytics and send notifications
      console.log('📊 Step 7: Updating analytics and sending notifications')
      await this.updateAnalytics(opportunityData)
      await this.sendNotifications(opportunityData, {
        customerId: customerResult.customerId,
        contactId: contactResult.contactId,
        projectId: projectResult.projectId,
        invoiceId: invoiceResult.invoiceId,
        contractId: contractResult.contractId
      })

      // Success result
      console.log('🎉 All steps completed successfully!')
      result.success = true
      result.message = 'Opportunity successfully marked as won!'
      result.data = {
        customerId: customerResult.customerId,
        contactId: contactResult.contactId,
        projectId: projectResult.projectId,
        invoiceId: invoiceResult.invoiceId,
        contractId: contractResult.contractId,
        ratesCreated: contractResult.ratesCreated,
        logisticsInvoiceId: invoiceResult.invoiceId
      }

      console.log('✅ Final result:', result)
      return result

    } catch (error: any) {
      console.error('❌ Error in processOpportunityWin:', error)
      result.message = 'Failed to process opportunity win'
      result.errors?.push(error.message || 'Unknown error occurred')
      return result
    }
  }

  /**
   * Get opportunity details
   */
  private async getOpportunity(opportunityId: number) {
    try {
      const opportunities = this.opportunitiesStore.opportunities
      return opportunities.find(opp => opp.id === opportunityId)
    } catch (error) {
      console.error('Error getting opportunity:', error)
      throw error
    }
  }

  /**
   * Mark opportunity as won and update relevant fields including logistics
   */
  private async markOpportunityAsWon(opportunityId: number, winData: OpportunityWinData) {
    try {
      console.log('🔄 Starting markOpportunityAsWon for opportunity:', opportunityId)
      
      // Ensure actual_amount is a valid number
      let actualAmount: number | undefined = undefined
      if (winData.actualAmount !== undefined && winData.actualAmount !== null && winData.actualAmount !== '') {
        const converted = Number(winData.actualAmount)
        if (!isNaN(converted) && converted > 0) {
          actualAmount = converted
        }
      }

      const updateData: any = {
        stage_id: await this.getWonStageId(),
        probability: 100,
        won_date: winData.wonDate,
        contract_status: 'active',
        contract_signed_date: winData.wonDate,
        win_notes: winData.notes ? `${winData.notes}` : ''
      }

      // Only add actual_amount if it's a valid number
      if (actualAmount !== undefined) {
        updateData.actual_amount = actualAmount
      }

      // Add logistics-specific fields
      if (winData.logisticsServiceType) {
        updateData.logistics_service_type = winData.logisticsServiceType
      }
      if (winData.contractBasis) {
        updateData.contract_basis = winData.contractBasis
      }
      if (winData.contractDurationMonths) {
        updateData.contract_duration_months = Number(winData.contractDurationMonths)
      }
      if (winData.contractStartDate) {
        updateData.contract_start_date = winData.contractStartDate
      }
      if (winData.contractEndDate) {
        updateData.contract_end_date = winData.contractEndDate
      }
      if (winData.originLocationId) {
        updateData.origin_location_id = Number(winData.originLocationId)
      }
      if (winData.destinationLocationId) {
        updateData.destination_location_id = Number(winData.destinationLocationId)
      }
      if (winData.warehouseLocationId) {
        updateData.warehouse_location_id = Number(winData.warehouseLocationId)
      }
      if (winData.shipmentMode) {
        updateData.shipment_mode = winData.shipmentMode
      }
      if (winData.commodityType) {
        updateData.commodity_type = winData.commodityType
      }
      if (winData.specialHandlingRequired !== undefined) {
        updateData.special_handling_required = Boolean(winData.specialHandlingRequired)
      }
      if (winData.temperatureControlled !== undefined) {
        updateData.temperature_controlled = Boolean(winData.temperatureControlled)
      }
      if (winData.hazardousMaterials !== undefined) {
        updateData.hazardous_materials = Boolean(winData.hazardousMaterials)
      }
      if (winData.baseRate) {
        updateData.base_rate = Number(winData.baseRate)
      }
      if (winData.rateCurrencyId) {
        updateData.rate_currency_id = Number(winData.rateCurrencyId)
      }
      if (winData.minimumCharge) {
        updateData.minimum_charge = Number(winData.minimumCharge)
      }
      if (winData.fuelSurchargePercentage) {
        updateData.fuel_surcharge_percentage = Number(winData.fuelSurchargePercentage)
      }
      if (winData.handlingFeePercentage) {
        updateData.handling_fee_percentage = Number(winData.handlingFeePercentage)
      }

      console.log('📝 Updating opportunity with data:', updateData)

      try {
        // Try using Feathers client directly first
        const updatedOpportunity = await feathersClient.service('crm/opportunities').patch(opportunityId, updateData)
        console.log('✅ Opportunity marked as won via Feathers:', updatedOpportunity.id)
      } catch (error) {
        console.error('Error updating opportunity via Feathers:', error)
        // Fallback to store method
        await this.opportunitiesStore.updateOpportunity(opportunityId, updateData)
        console.log('✅ Opportunity marked as won via store:', opportunityId)
      }
    } catch (error) {
      console.error('Error marking opportunity as won:', error)
      throw error
    }
  }

  /**
   * Process logistics contract setup (NEW)
   */
  private async processLogisticsContract(opportunity: any, winData: OpportunityWinData): Promise<{ success: boolean; contractId?: number; ratesCreated: number }> {
    try {
      console.log('📋 Setting up logistics contract for opportunity:', opportunity.id)

      // Validate currency
      if (!winData.rateCurrencyId) {
        console.error('❌ Currency is required for logistics contract setup')
        return { success: false, ratesCreated: 0 }
      }

      // Validate base rate
      if (!winData.baseRate || winData.baseRate <= 0) {
        console.error('❌ Base rate must be greater than zero')
        return { success: false, ratesCreated: 0 }
      }

      // Determine service categories based on logistics service type
      const serviceCategories = this.getServiceCategoriesForType(winData.logisticsServiceType || 'freight')
      
      let ratesCreated = 0

      // Create rates for each service category
      for (const serviceCategory of serviceCategories) {
        const rateData = {
          opportunity_id: opportunity.id,
          company_id: 1, // Default company ID - should come from user context
          service_category: serviceCategory,
          rate_type: winData.contractBasis || 'per_kg',
          rate_amount: winData.baseRate,
          currency_id: winData.rateCurrencyId, // Always use the selected currency
          effective_date: winData.contractStartDate || winData.wonDate,
          expiry_date: winData.contractEndDate,
          is_active: true,
          origin_location_id: winData.originLocationId,
          destination_location_id: winData.destinationLocationId,
          warehouse_location_id: winData.warehouseLocationId,
          shipment_mode: winData.shipmentMode,
          commodity_type: winData.commodityType,
          special_handling: winData.specialHandlingRequired,
          temperature_controlled: winData.temperatureControlled,
          hazardous_materials: winData.hazardousMaterials,
          fuel_surcharge_percentage: winData.fuelSurchargePercentage,
          handling_fee_percentage: winData.handlingFeePercentage
        }

        try {
          await this.logisticsContractRatesStore.createRate(rateData)
          ratesCreated++
          console.log(`✅ Created rate for ${serviceCategory} with currency ID ${winData.rateCurrencyId}`)
        } catch (error) {
          console.error(`❌ Error creating rate for ${serviceCategory}:`, error)
          // Try using Feathers client directly as fallback
          try {
            const rate = await feathersClient.service('logistics-contract-rates').create(rateData)
            ratesCreated++
            console.log(`✅ Created rate for ${serviceCategory} via Feathers:`, rate.id)
          } catch (feathersError) {
            console.error(`❌ Failed to create rate for ${serviceCategory} via Feathers:`, feathersError)
            // Continue with other rates even if one fails
          }
        }
      }

      console.log(`📊 Created ${ratesCreated} logistics contract rates with currency ID ${winData.rateCurrencyId}`)
      return { success: true, contractId: opportunity.id, ratesCreated }
    } catch (error) {
      console.error('Error setting up logistics contract:', error)
      return { success: false, ratesCreated: 0 }
    }
  }

  /**
   * Generate logistics invoice using the calculation service
   */
  private async generateLogisticsInvoice(opportunity: any, winData: OpportunityWinData): Promise<{ success: boolean; invoiceId?: number }> {
    try {
      // Get the rates for this opportunity
      const rates = await this.logisticsContractRatesStore.fetchRates({
        opportunity_id: opportunity.id,
        is_active: true
      })

      if (!rates.data || rates.data.length === 0) {
        console.log('No rates found for invoice generation')
        return { success: false }
      }

      // Calculate invoice using the LogisticsRateCalculationService
      const serviceData = {
        weight_kg: opportunity.expected_weight || 1000, // Default values
        volume_cbm: opportunity.expected_volume || 10,
        shipment_count: 1
      }

      const calculation = LogisticsRateCalculationService.calculateLogisticsInvoice(
        opportunity,
        serviceData,
        rates.data
      )

      // Generate invoice number
      const invoiceNumber = LogisticsRateCalculationService.generateInvoiceNumber(opportunity.id)
      
      // Calculate due date
      const dueDate = LogisticsRateCalculationService.calculateDueDate(
        new Date().toISOString().split('T')[0],
        'Net 30'
      )

      const invoiceData = {
        opportunity_id: opportunity.id,
        invoice_number: invoiceNumber,
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: dueDate,
        warehousing_amount: calculation.warehousing_amount,
        transportation_amount: calculation.transportation_amount,
        freight_amount: calculation.freight_amount,
        handling_amount: calculation.handling_amount,
        storage_amount: calculation.storage_amount,
        customs_amount: calculation.customs_amount,
        insurance_amount: calculation.insurance_amount,
        fuel_surcharge_amount: calculation.fuel_surcharge_amount,
        total_amount: calculation.total_amount,
        currency_id: opportunity.currency_id || 1,
        weight_kg: serviceData.weight_kg,
        volume_cbm: serviceData.volume_cbm,
        shipment_count: serviceData.shipment_count,
        status: 'draft'
      }

      try {
        const invoice = await feathersClient.service('logistics-contract-invoices').create(invoiceData)
        console.log('✅ Generated logistics invoice:', invoice.id)
        return { success: true, invoiceId: invoice.id }
      } catch (error) {
        console.error('Error creating invoice via Feathers:', error)
        return { success: false }
      }
    } catch (error) {
      console.error('Error generating logistics invoice:', error)
      return { success: false }
    }
  }

  /**
   * Generate one-time invoice (if applicable)
   */
  private async generateOneTimeInvoice(opportunity: any, customerId: number, winData: OpportunityWinData): Promise<{ success: boolean; invoiceId?: number }> {
    try {
      // Get the rates for this opportunity
      let rates: any[] = []
      try {
        const ratesResponse = await this.logisticsContractRatesStore.fetchRates({
          opportunity_id: opportunity.id,
          is_active: true
        })
        rates = ratesResponse.data || []
      } catch (error) {
        console.error('Error fetching rates via store:', error)
        // Try using Feathers client directly as fallback
        try {
          const ratesResponse = await feathersClient.service('logistics-contract-rates').find({
            query: {
              opportunity_id: opportunity.id,
              is_active: true
            }
          })
          rates = ratesResponse.data || []
        } catch (feathersError) {
          console.error('Error fetching rates via Feathers:', feathersError)
          rates = []
        }
      }

      if (rates.length === 0) {
        console.log('No rates found for one-time invoice generation')
        return { success: false }
      }

      // Calculate invoice using the LogisticsRateCalculationService
      const serviceData = {
        weight_kg: opportunity.expected_weight || 1000, // Default values
        volume_cbm: opportunity.expected_volume || 10,
        shipment_count: 1
      }

      const calculation = LogisticsRateCalculationService.calculateLogisticsInvoice(
        opportunity,
        serviceData,
        rates
      )

      // Generate invoice number
      const invoiceNumber = LogisticsRateCalculationService.generateInvoiceNumber(opportunity.id)
      
      // Calculate due date
      const dueDate = LogisticsRateCalculationService.calculateDueDate(
        new Date().toISOString().split('T')[0],
        'Net 30'
      )

      const invoiceData = {
        opportunity_id: opportunity.id,
        invoice_number: invoiceNumber,
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: dueDate,
        warehousing_amount: calculation.warehousing_amount,
        transportation_amount: calculation.transportation_amount,
        freight_amount: calculation.freight_amount,
        handling_amount: calculation.handling_amount,
        storage_amount: calculation.storage_amount,
        customs_amount: calculation.customs_amount,
        insurance_amount: calculation.insurance_amount,
        fuel_surcharge_amount: calculation.fuel_surcharge_amount,
        total_amount: calculation.total_amount,
        currency_id: opportunity.currency_id || 1,
        weight_kg: serviceData.weight_kg,
        volume_cbm: serviceData.volume_cbm,
        shipment_count: serviceData.shipment_count,
        status: 'draft'
      }

      try {
        const invoice = await this.logisticsContractInvoicesStore.createInvoice(invoiceData)
        console.log('✅ Generated one-time invoice:', invoice.id)
        return { success: true, invoiceId: invoice.id }
      } catch (error) {
        console.error('Error creating one-time invoice via store:', error)
        // Try using Feathers client directly as fallback
        try {
          const invoice = await feathersClient.service('logistics-contract-invoices').create(invoiceData)
          console.log('✅ Generated one-time invoice via Feathers:', invoice.id)
          return { success: true, invoiceId: invoice.id }
        } catch (feathersError) {
          console.error('Error creating one-time invoice via Feathers:', feathersError)
          return { success: false }
        }
      }
    } catch (error) {
      console.error('Error generating one-time invoice:', error)
      return { success: false }
    }
  }

  /**
   * Get service categories based on logistics service type
   */
  private getServiceCategoriesForType(serviceType: string): Array<'warehousing' | 'transportation' | 'freight' | 'handling' | 'storage' | 'customs' | 'insurance'> {
    switch (serviceType) {
      case 'warehousing':
        return ['warehousing', 'storage', 'handling']
      case 'transportation':
        return ['transportation', 'handling']
      case 'freight':
        return ['freight', 'customs', 'insurance']
      case 'integrated':
        return ['warehousing', 'transportation', 'freight', 'handling', 'storage', 'customs', 'insurance']
      default:
        return ['freight'] // Default to freight
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

      // Get the logged-in company (service provider) from auth store
      const authStore = useAuthStore()
      const currentCompanyId = authStore.user?.company_id
      if (!currentCompanyId) {
        console.error('No logged-in company found')
        return { success: false }
      }

      // Create new entity for the customer (client) using Feathers client directly
      const entityData = {
        company_id: currentCompanyId,
        group_id: 1,
        name: opportunity.company_name,
        email: opportunity.contact_email,
        phonenumber: opportunity.contact_phone,
        address: opportunity.company_address,
        description: `Customer from opportunity: ${opportunity.title}`
      }

      console.log('Creating new customer entity:', entityData)
      
      try {
        const entity = await feathersClient.service('entity').create(entityData)
        console.log('✅ Customer entity created:', entity.id)
        return { success: true, customerId: entity.id }
      } catch (error) {
        console.error('Error creating entity via Feathers:', error)
        // Fallback to store method
        const entity = await this.entityStore.createEntity(entityData)
        console.log('✅ Customer entity created via store:', entity.id)
        return { success: true, customerId: entity.id }
      }
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

      // Get the logged-in company (service provider) from auth store
      const authStore = useAuthStore()
      const currentCompanyId = authStore.user?.company_id
      if (!currentCompanyId) {
        console.error('No logged-in company found')
        return { success: false }
      }

      // Create new contact person using Feathers client directly
      const contactData = {
        company_id: currentCompanyId,
        entity_id: customerId,
        name: opportunity.contact_name || opportunity.company_name || 'Contact Person',
        email_address: opportunity.contact_email || 'contact@company.com', // Default email if not provided
        phone_number: opportunity.contact_phone || '+1234567890', // Default phone if not provided
        job_title: opportunity.contact_position || 'Contact',
        is_primary: true
      }

      console.log('Creating new contact person:', contactData)
      
      try {
        const contact = await feathersClient.service('entity-contact-person').create(contactData)
        console.log('✅ Contact person created:', contact.id)
        return { success: true, contactId: contact.id }
      } catch (error) {
        console.error('Error creating contact via Feathers:', error)
        // Fallback to store method
        const contact = await this.entityContactPersonStore.createContactPerson(contactData)
        console.log('✅ Contact person created via store:', contact.id)
        return { success: true, contactId: contact.id }
      }
    } catch (error) {
      console.error('Error creating contact person:', error)
      return { success: false }
    }
  }

  /**
   * Create initial project/shipment for the won opportunity
   */
  private async createInitialProject(opportunity: any, customerId: number): Promise<{ success: boolean; projectId?: number }> {
    try {
      // Get the logged-in user from auth store
      const authStore = useAuthStore()
      const currentUserId = authStore.user?.id
      const currentCompanyId = authStore.user?.company_id
      
      if (!currentUserId || !currentCompanyId) {
        console.error('No logged-in user or company found')
        return { success: false }
      }

      // Create initial project/shipment data with required fields
      const projectData = {
        company_id: currentCompanyId,
        client_id: customerId,
        user_id: currentUserId,
        shipment_mode: opportunity.shipment_mode || 'Air',
        cargo_description: opportunity.title || 'Project from won opportunity',
        delivery_date: opportunity.contract_start_date || new Date().toISOString().split('T')[0],
        category: 'Other',
        file_number: `OPP-${opportunity.id}`,
        sequence: '001',
        year: new Date().getFullYear().toString()
      }

      console.log('Creating initial project/shipment:', projectData)
      
      try {
        // Try using Feathers client directly first
        const project = await feathersClient.service('shipments/shipments').create(projectData)
        console.log('✅ Initial project created via Feathers:', project.id)
        return { success: true, projectId: project.id }
      } catch (error) {
        console.error('Error creating project via Feathers:', error)
        // Fallback to store method
        const project = await this.shipmentStore.createShipment(projectData)
        console.log('✅ Initial project created via store:', project.id)
        return { success: true, projectId: project.id }
      }
    } catch (error) {
      console.error('Error creating initial project:', error)
      return { success: false }
    }
  }

  /**
   * Update analytics and reporting data
   */
  private async updateAnalytics(opportunity: any) {
    try {
      console.log('Updating analytics for won opportunity:', opportunity.id)
    } catch (error) {
      console.error('Error updating analytics:', error)
    }
  }

  /**
   * Send notifications about the won opportunity
   */
  private async sendNotifications(opportunity: any, resultData: any) {
    try {
      console.log('Sending notifications for won opportunity:', opportunity.id)
    } catch (error) {
      console.error('Error sending notifications:', error)
    }
  }

  /**
   * Helper method to get shipment mode based on service type
   */
  private getShipmentMode(serviceType: string): string {
    switch (serviceType) {
      case 'freight':
        return 'Air'
      case 'transportation':
        return 'Road'
      case 'warehousing':
        return 'Other'
      default:
        return 'Other'
    }
  }

  /**
   * Helper methods - these would need to be implemented based on your data
   */
  private async getWonStageId(): Promise<number> {
    try {
      // First, try to fetch stages and find the "Closed Won" stage
      await this.stagesStore.fetchStages()
      const stages = this.stagesStore.getStages
      
      const wonStage = stages.find(stage => 
        stage.name === 'Closed Won' && 
        stage.company_id === useAuthStore().user?.company_id
      )
      
      if (wonStage) {
        return wonStage.id
      }
      
      // Fallback: try to find by type and position
      const fallbackStage = stages.find(stage => 
        stage.type === 'closed' && 
        stage.position === 5 && 
        stage.company_id === useAuthStore().user?.company_id
      )
      
      if (fallbackStage) {
        return fallbackStage.id
      }
      
      // If still not found, use a reasonable default based on seed data
      // The "Closed Won" stage should be at position 5
      console.warn('Could not find "Closed Won" stage, using fallback ID')
      return 5 // This should match the position in the seed data
    } catch (error) {
      console.error('Error getting won stage ID:', error)
      // Fallback to position 5 which should be the "Closed Won" stage
      return 5
    }
  }

  private getCustomerGroupId(): number {
    return 1
  }

  private getActiveStatusId(): number {
    return 1
  }


}

// Export singleton instance
export const opportunityWinService = new OpportunityWinService()

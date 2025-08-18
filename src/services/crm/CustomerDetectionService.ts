import { useEntityStore } from '../../store/entity.store'
import { useEntityContactPersonStore } from '../../store/entity-contact-person.store'
import { useAuthStore } from '../../store/auth.store'

export interface CustomerDetectionResult {
  isExisting: boolean
  confidence: number
  existingCustomer?: Entity
  matchType: 'exact' | 'fuzzy' | 'none'
  matchFields: string[]
  suggestions: Entity[]
  reason: string
}

export interface LeadCreationData {
  // Lead/Opportunity data
  title: string
  service_type: string
  origin: string
  destination: string
  cargo_description: string
  estimated_value?: number
  amount?: number
  probability?: number
  pipeline_id: number
  stage_id: number
  expected_service_date?: string
  expected_close_date?: string
  description?: string
  is_active: boolean
  
  // Customer data
  company_name: string
  company_website?: string
  company_address?: string
  contact_name: string
  contact_email?: string
  contact_phone?: string
  contact_position?: string
}

export interface Entity {
  id: number
  company_id: number
  group_id: number
  name: string
  address?: string
  phonenumber?: string
  email?: string
  description?: string
  date_created: string
  date_updated?: string
  date_deleted?: string
}

export class CustomerDetectionService {
  // Lazy-load stores to avoid Pinia initialization issues
  private get entityStore() {
    return useEntityStore()
  }
  
  private get entityContactPersonStore() {
    return useEntityContactPersonStore()
  }
  
  private get authStore() {
    return useAuthStore()
  }

  /**
   * Check if customer exists when creating lead/opportunity
   */
  async detectExistingCustomer(customerData: any): Promise<CustomerDetectionResult> {
    const result: CustomerDetectionResult = {
      isExisting: false,
      confidence: 0,
      matchType: 'none',
      matchFields: [],
      suggestions: [],
      reason: ''
    }
    
    // Get current company context
    const currentCompany = this.authStore.user?.company_id
    if (!currentCompany) {
      result.reason = 'No company context found'
      return result
    }
    
    // 1. Exact match check
    const exactMatch = await this.findExactMatch(customerData, currentCompany)
    if (exactMatch) {
      result.isExisting = true
      result.existingCustomer = exactMatch
      result.matchType = 'exact'
      result.confidence = 1.0
      result.matchFields = this.getMatchingFields(customerData, exactMatch)
      result.reason = 'Exact match found'
      return result
    }
    
    // 2. Fuzzy match check
    const fuzzyMatches = await this.findFuzzyMatches(customerData, currentCompany)
    if (fuzzyMatches.length > 0) {
      const bestMatch = fuzzyMatches[0]
      const confidence = this.calculateFuzzyConfidence(customerData, bestMatch)
      
      if (confidence >= 0.8) {
        result.isExisting = true
        result.existingCustomer = bestMatch
        result.matchType = 'fuzzy'
        result.confidence = confidence
        result.matchFields = this.getMatchingFields(customerData, bestMatch)
        result.suggestions = fuzzyMatches.slice(1, 5) // Top 5 suggestions
        result.reason = `High confidence fuzzy match (${Math.round(confidence * 100)}%)`
      } else {
        result.suggestions = fuzzyMatches.slice(0, 5)
        result.confidence = confidence
        result.reason = `Potential matches found but confidence too low (${Math.round(confidence * 100)}%)`
      }
    } else {
      result.reason = 'No existing customer found - likely new customer'
    }
    
    return result
  }
  
  /**
   * Find exact match based on multiple criteria
   */
  private async findExactMatch(customerData: any, currentCompany: number): Promise<Entity | null> {
    const searchCriteria = []
    
    // Company name exact match
    if (customerData.company_name) {
      searchCriteria.push({ name: customerData.company_name })
    }
    
    // Email exact match
    if (customerData.contact_email) {
      searchCriteria.push({ email: customerData.contact_email })
    }
    
    // Phone exact match
    if (customerData.contact_phone) {
      searchCriteria.push({ phonenumber: customerData.contact_phone })
    }
    
    // Search with OR conditions
    for (const criteria of searchCriteria) {
      const entities = await this.entityStore.fetchEntities({
        ...criteria,
        company_id: currentCompany, // Same company context
        group_id: 1, // Client group
        $limit: 1
      })
      
      if (entities.length > 0) {
        return entities[0]
      }
    }
    
    return null
  }
  
  /**
   * Find fuzzy matches using similarity algorithms
   */
  private async findFuzzyMatches(customerData: any, currentCompany: number): Promise<Entity[]> {
    const fuzzyMatches = []
    
    // Get all entities for the company
    const allEntities = await this.entityStore.fetchEntities({
      company_id: currentCompany,
      group_id: 1, // Client group
      $limit: 100
    })
    
    for (const entity of allEntities) {
      const similarityScore = this.calculateSimilarity(customerData, entity)
      
      if (similarityScore >= 0.6) { // Threshold for fuzzy matching
        fuzzyMatches.push({
          ...entity,
          similarityScore
        })
      }
    }
    
    // Sort by similarity score (highest first)
    return fuzzyMatches
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .map(match => {
        const { similarityScore, ...entity } = match
        return entity
      })
  }
  
  /**
   * Calculate similarity between customer data and existing entity
   */
  private calculateSimilarity(customerData: any, entity: Entity): number {
    let totalScore = 0
    let maxScore = 0
    
    // Company name similarity
    if (customerData.company_name && entity.name) {
      const nameSimilarity = this.calculateStringSimilarity(
        customerData.company_name.toLowerCase(),
        entity.name.toLowerCase()
      )
      totalScore += nameSimilarity * 0.4 // 40% weight
      maxScore += 0.4
    }
    
    // Email similarity
    if (customerData.contact_email && entity.email) {
      const emailSimilarity = this.calculateStringSimilarity(
        customerData.contact_email.toLowerCase(),
        entity.email.toLowerCase()
      )
      totalScore += emailSimilarity * 0.3 // 30% weight
      maxScore += 0.3
    }
    
    // Phone similarity
    if (customerData.contact_phone && entity.phonenumber) {
      const phoneSimilarity = this.calculatePhoneSimilarity(
        customerData.contact_phone,
        entity.phonenumber
      )
      totalScore += phoneSimilarity * 0.3 // 30% weight
      maxScore += 0.3
    }
    
    return maxScore > 0 ? totalScore / maxScore : 0
  }
  
  /**
   * Calculate string similarity using Levenshtein distance
   */
  private calculateStringSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length)
    if (maxLength === 0) return 1.0
    
    const distance = this.levenshteinDistance(str1, str2)
    return 1 - (distance / maxLength)
  }
  
  /**
   * Calculate phone number similarity
   */
  private calculatePhoneSimilarity(phone1: string, phone2: string): number {
    // Normalize phone numbers (remove spaces, dashes, etc.)
    const normalized1 = phone1.replace(/\D/g, '')
    const normalized2 = phone2.replace(/\D/g, '')
    
    if (normalized1 === normalized2) return 1.0
    
    // Check if one is contained in the other (partial match)
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
      return 0.8
    }
    
    // Calculate similarity
    return this.calculateStringSimilarity(normalized1, normalized2)
  }
  
  /**
   * Levenshtein distance algorithm
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = []
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    
    return matrix[str2.length][str1.length]
  }
  
  /**
   * Get matching fields between customer data and entity
   */
  private getMatchingFields(customerData: any, entity: Entity): string[] {
    const matches = []
    
    if (customerData.company_name && entity.name && 
        customerData.company_name.toLowerCase() === entity.name.toLowerCase()) {
      matches.push('company_name')
    }
    
    if (customerData.contact_email && entity.email && 
        customerData.contact_email.toLowerCase() === entity.email.toLowerCase()) {
      matches.push('contact_email')
    }
    
    if (customerData.contact_phone && entity.phonenumber && 
        customerData.contact_phone.replace(/\D/g, '') === entity.phonenumber.replace(/\D/g, '')) {
      matches.push('contact_phone')
    }
    
    return matches
  }
  
  /**
   * Calculate fuzzy confidence score
   */
  private calculateFuzzyConfidence(customerData: any, entity: Entity): number {
    return this.calculateSimilarity(customerData, entity)
  }
  
  /**
   * Create new customer entity and contact person
   */
  async createNewCustomer(customerData: any): Promise<{ entityId: number; contactId: number }> {
    const currentCompany = this.authStore.user?.company_id
    if (!currentCompany) {
      throw new Error('No company context found')
    }
    
    // 1. Create new entity (customer)
    const entityData = {
      company_id: currentCompany,
      group_id: 1, // Client group
      name: customerData.company_name,
      email: customerData.contact_email,
      phonenumber: customerData.contact_phone,
      address: customerData.company_address,
      description: `Customer created from ${customerData.source || 'lead/opportunity'}`
    }
    
    const newEntity = await this.entityStore.createEntity(entityData)
    
    // 2. Create contact person
    const contactData = {
      company_id: currentCompany,
      entity_id: newEntity.id,
      name: customerData.contact_name,
      email_address: customerData.contact_email,
      phone_number: customerData.contact_phone,
      job_title: customerData.contact_position,
      is_primary: true
    }
    
    const newContact = await this.entityContactPersonStore.createContactPerson(contactData)
    
    return {
      entityId: newEntity.id,
      contactId: newContact.id
    }
  }
  
  /**
   * Link to existing customer
   */
  async linkToExistingCustomer(customerData: any, existingEntity: Entity): Promise<{ entityId: number; contactId?: number }> {
    const currentCompany = this.authStore.user?.company_id
    if (!currentCompany) {
      throw new Error('No company context found')
    }
    
    // Check if contact person already exists
    const existingContacts = await this.entityContactPersonStore.fetchContactPersons(existingEntity.id, {
      query: {
        company_id: currentCompany
      }
    })
    
    let contactId: number | undefined
    
    // If no contact person exists, create one
    if (existingContacts.length === 0) {
      const contactData = {
        company_id: currentCompany,
        entity_id: existingEntity.id,
        name: customerData.contact_name,
        email_address: customerData.contact_email,
        phone_number: customerData.contact_phone,
        job_title: customerData.contact_position,
        is_primary: true
      }
      
      const newContact = await this.entityContactPersonStore.createContactPerson(contactData)
      contactId = newContact.id
    }
    
    return {
      entityId: existingEntity.id,
      contactId
    }
  }
}

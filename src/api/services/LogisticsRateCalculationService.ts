/**
 * Logistics Rate Calculation Service
 * Handles complex rate calculations for different logistics services and contract types
 */

export interface LogisticsInvoiceCalculation {
  warehousing_amount: number;
  transportation_amount: number;
  freight_amount: number;
  handling_amount: number;
  storage_amount: number;
  customs_amount: number;
  insurance_amount: number;
  fuel_surcharge_amount: number;
  total_amount: number;
  breakdown: Array<{
    service: string;
    rate_type: string;
    rate_amount: number;
    volume: number;
    amount: number;
  }>;
}

export interface ServiceData {
  weight_kg?: number;
  volume_cbm?: number;
  shipment_count?: number;
  pallet_count?: number;
  container_count?: number;
  hours?: number;
  days?: number;
}

export interface RateData {
  id: number;
  service_category: string;
  rate_type: string;
  rate_amount: number;
  min_volume?: number;
  max_volume?: number;
  fuel_surcharge_percentage?: number;
  handling_fee_percentage?: number;
  customs_clearance_fee?: number;
  insurance_fee_percentage?: number;
}

export class LogisticsRateCalculationService {
  
  /**
   * Calculate logistics invoice based on service type and volume
   */
  static calculateLogisticsInvoice(
    opportunity: any,
    serviceData: ServiceData,
    rates: RateData[]
  ): LogisticsInvoiceCalculation {
    
    // Validate that all rates have the same currency
    const currencies = [...new Set(rates.map(rate => rate.currency_id))]
    if (currencies.length > 1) {
      throw new Error('All rates must use the same currency for invoice calculation')
    }

    const calculation: LogisticsInvoiceCalculation = {
      warehousing_amount: 0,
      transportation_amount: 0,
      freight_amount: 0,
      handling_amount: 0,
      storage_amount: 0,
      customs_amount: 0,
      insurance_amount: 0,
      fuel_surcharge_amount: 0,
      total_amount: 0,
      breakdown: []
    };

    // Calculate each service category
    for (const rate of rates) {
      const amount = this.calculateServiceAmount(rate, serviceData);
      calculation[`${rate.service_category}_amount` as keyof LogisticsInvoiceCalculation] = amount;
      calculation.total_amount += amount;
      
      calculation.breakdown.push({
        service: rate.service_category,
        rate_type: rate.rate_type,
        rate_amount: rate.rate_amount,
        volume: this.getVolumeForRate(rate.rate_type, serviceData),
        amount: amount
      });
    }

    // Calculate surcharges
    calculation.fuel_surcharge_amount = this.calculateFuelSurcharge(calculation.total_amount, opportunity.fuel_surcharge_percentage);
    calculation.total_amount += calculation.fuel_surcharge_amount;

    // Apply minimum charge if applicable
    if (opportunity.minimum_charge && calculation.total_amount < opportunity.minimum_charge) {
      calculation.total_amount = opportunity.minimum_charge;
    }

    return calculation;
  }

  /**
   * Calculate amount for a specific service
   */
  private static calculateServiceAmount(rate: RateData, serviceData: ServiceData): number {
    const volume = this.getVolumeForRate(rate.rate_type, serviceData);
    
    switch (rate.rate_type) {
      case 'per_kg':
        return rate.rate_amount * (serviceData.weight_kg || 0);
      case 'per_cbm':
        return rate.rate_amount * (serviceData.volume_cbm || 0);
      case 'per_shipment':
        return rate.rate_amount * (serviceData.shipment_count || 0);
      case 'per_pallet':
        return rate.rate_amount * (serviceData.pallet_count || 0);
      case 'per_container':
        return rate.rate_amount * (serviceData.container_count || 0);
      case 'per_hour':
        return rate.rate_amount * (serviceData.hours || 0);
      case 'per_day':
        return rate.rate_amount * (serviceData.days || 0);
      case 'per_month':
        return rate.rate_amount; // Fixed monthly rate
      case 'fixed_rate':
        return rate.rate_amount;
      default:
        return 0;
    }
  }

  /**
   * Get volume for rate calculation
   */
  private static getVolumeForRate(rateType: string, serviceData: ServiceData): number {
    switch (rateType) {
      case 'per_kg': return serviceData.weight_kg || 0;
      case 'per_cbm': return serviceData.volume_cbm || 0;
      case 'per_shipment': return serviceData.shipment_count || 0;
      case 'per_pallet': return serviceData.pallet_count || 0;
      case 'per_container': return serviceData.container_count || 0;
      case 'per_hour': return serviceData.hours || 0;
      case 'per_day': return serviceData.days || 0;
      default: return 0;
    }
  }

  /**
   * Calculate fuel surcharge
   */
  private static calculateFuelSurcharge(baseAmount: number, surchargePercentage: number): number {
    if (!surchargePercentage) return 0;
    return baseAmount * (surchargePercentage / 100);
  }

  /**
   * Find applicable rate tier based on volume
   */
  static findApplicableRate(volume: number, rates: RateData[]): RateData | null {
    // Sort rates by min_volume to find the applicable tier
    const sortedRates = rates
      .filter(rate => rate.min_volume !== undefined)
      .sort((a, b) => (a.min_volume || 0) - (b.min_volume || 0));

    // Find the highest tier that applies to this volume
    let applicableRate: RateData | null = null;
    
    for (const rate of sortedRates) {
      if (volume >= (rate.min_volume || 0) && 
          (rate.max_volume === undefined || volume <= rate.max_volume)) {
        applicableRate = rate;
      }
    }

    // If no tiered rate found, look for fixed rates
    if (!applicableRate) {
      const fixedRates = rates.filter(rate => rate.min_volume === undefined);
      if (fixedRates.length > 0) {
        applicableRate = fixedRates[0]; // Use the first fixed rate
      }
    }

    return applicableRate;
  }

  /**
   * Generate invoice number
   */
  static generateInvoiceNumber(opportunityId: number): string {
    const timestamp = Date.now().toString().slice(-6);
    return `INV-${opportunityId}-${timestamp}`;
  }

  /**
   * Calculate due date based on payment terms
   */
  static calculateDueDate(invoiceDate: string, paymentTerms: string): string {
    const date = new Date(invoiceDate);
    
    if (paymentTerms.includes('Net 30')) {
      date.setDate(date.getDate() + 30);
    } else if (paymentTerms.includes('Net 60')) {
      date.setDate(date.getDate() + 60);
    } else if (paymentTerms.includes('Net 90')) {
      date.setDate(date.getDate() + 90);
    } else {
      // Default to 30 days
      date.setDate(date.getDate() + 30);
    }
    
    return date.toISOString().split('T')[0];
  }

  /**
   * Validate service data
   */
  static validateServiceData(serviceData: ServiceData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!serviceData.weight_kg && !serviceData.volume_cbm && 
        !serviceData.shipment_count && !serviceData.pallet_count && 
        !serviceData.container_count && !serviceData.hours && 
        !serviceData.days) {
      errors.push('At least one volume metric must be provided');
    }
    
    if (serviceData.weight_kg && serviceData.weight_kg < 0) {
      errors.push('Weight cannot be negative');
    }
    
    if (serviceData.volume_cbm && serviceData.volume_cbm < 0) {
      errors.push('Volume cannot be negative');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

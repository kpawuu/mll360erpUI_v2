import { companyService } from '../services/company.service'
import type { Company, CreateCompany, UpdateCompany } from '../models/company.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const companyControllers = {
  // Get all companies with optional query parameters
  async getCompanies(params?: { query?: any }) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyService.find(params);
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  },

  // Get a single company by ID
  async getCompany(id: number) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyService.get(id);
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  },

  // Create a new company
  async createCompany(companyData: CreateCompany) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyService.create(companyData);
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  // Update an existing company
  async updateCompany(id: number, companyData: UpdateCompany) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyService.patch(id, companyData);
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  // Delete a company
  async deleteCompany(id: number) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyService.remove(id);
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  }
} 
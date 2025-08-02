import { companyBranchesService } from '../services/company-branches.service'
import type { CompanyBranch, CreateCompanyBranch, UpdateCompanyBranch } from '../models/company-branches.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const companyBranchesControllers = {
  // Get all company branches with optional query parameters
  async getCompanyBranches(params?: { query?: any }) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyBranchesService.find(params);
    } catch (error) {
      console.error('Error fetching company branches:', error);
      throw error;
    }
  },

  // Get a single company branch by ID
  async getCompanyBranch(id: number) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyBranchesService.get(id);
    } catch (error) {
      console.error('Error fetching company branch:', error);
      throw error;
    }
  },

  // Create a new company branch
  async createCompanyBranch(branchData: CreateCompanyBranch) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyBranchesService.create(branchData);
    } catch (error) {
      console.error('Error creating company branch:', error);
      throw error;
    }
  },

  // Update an existing company branch
  async updateCompanyBranch(id: number, branchData: UpdateCompanyBranch) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyBranchesService.patch(id, branchData);
    } catch (error) {
      console.error('Error updating company branch:', error);
      throw error;
    }
  },

  // Delete a company branch
  async deleteCompanyBranch(id: number) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyBranchesService.remove(id);
    } catch (error) {
      console.error('Error deleting company branch:', error);
      throw error;
    }
  }
} 
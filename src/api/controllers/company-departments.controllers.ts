import { companyDepartmentsService } from '../services/company-departments.service'
import type { CompanyDepartment, CreateCompanyDepartment, UpdateCompanyDepartment } from '../models/company-departments.model'
import { useAuthStore } from '../../store/auth.store'
import { authenticateFeathersClient } from '../feathers'

export const companyDepartmentsControllers = {
  // Get all company departments with optional query parameters
  async getCompanyDepartments(params?: { query?: any }) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyDepartmentsService.find(params);
    } catch (error) {
      console.error('Error fetching company departments:', error);
      throw error;
    }
  },

  // Get a single company department by ID
  async getCompanyDepartment(id: number) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyDepartmentsService.get(id);
    } catch (error) {
      console.error('Error fetching company department:', error);
      throw error;
    }
  },

  // Create a new company department
  async createCompanyDepartment(departmentData: CreateCompanyDepartment) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyDepartmentsService.create(departmentData);
    } catch (error) {
      console.error('Error creating company department:', error);
      throw error;
    }
  },

  // Update an existing company department
  async updateCompanyDepartment(id: number, departmentData: UpdateCompanyDepartment) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyDepartmentsService.patch(id, departmentData);
    } catch (error) {
      console.error('Error updating company department:', error);
      throw error;
    }
  },

  // Delete a company department
  async deleteCompanyDepartment(id: number) {
    try {
      // Check if user is authenticated
      const authStore = useAuthStore();
      const isValid = await (authStore as any).isAccessTokenValid();
      if (!isValid) {
        throw new Error('Authentication required. Please login again.');
      }
      
      // Ensure Feathers client is authenticated
      await authenticateFeathersClient()
      return await companyDepartmentsService.remove(id);
    } catch (error) {
      console.error('Error deleting company department:', error);
      throw error;
    }
  }
} 
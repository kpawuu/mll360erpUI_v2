import type { RouteRecordRaw } from 'vue-router'
import CRMLayout from '../../layouts/CRMLayout.vue'

export const crmRoutes: RouteRecordRaw[] = [
  {
    path: '/crm',
    component: CRMLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/crm/dashboard'
      },
      {
        path: 'dashboard',
        name: 'crm-dashboard',
        component: () => import('../../pages/crm/Dashboard.vue'),
        meta: { title: 'CRM Dashboard' }
      },
      {
        path: 'leads',
        name: 'crm-leads',
        component: () => import('../../pages/crm/Leads.vue'),
        meta: { title: 'Leads' }
      },
      {
        path: 'opportunities',
        name: 'crm-opportunities',
        component: () => import('../../pages/crm/Opportunities.vue'),
        meta: { title: 'Opportunities' }
      },
      {
        path: 'won-opportunities',
        name: 'crm-won-opportunities',
        component: () => import('../../pages/crm/WonOpportunities.vue'),
        meta: { title: 'Won Opportunities' }
      },
      {
        path: 'tasks',
        name: 'crm-tasks',
        component: () => import('../../pages/crm/Tasks.vue'),
        meta: { title: 'Tasks & Activities' }
      },
      {
        path: 'companies',
        name: 'crm-companies',
        component: () => import('../../pages/crm/Companies.vue'),
        meta: { title: 'Companies' }
      },
      {
        path: 'contacts',
        name: 'crm-contacts',
        component: () => import('../../pages/crm/Contacts.vue'),
        meta: { title: 'Contacts' }
      },
      {
        path: 'test-logistics',
        name: 'crm-test-logistics',
        component: () => import('../../pages/crm/TestLogisticsServices.vue'),
        meta: { title: 'Test Logistics Services' }
      },
      {
        path: 'logistics-rates',
        name: 'crm-logistics-rates',
        component: () => import('../../pages/crm/LogisticsContractRates.vue'),
        meta: { title: 'Logistics Contract Rates' }
      },
      {
        path: 'logistics-invoices',
        name: 'crm-logistics-invoices',
        component: () => import('../../pages/crm/LogisticsContractInvoices.vue'),
        meta: { title: 'Logistics Contract Invoices' }
      }
    ]
  }
] 
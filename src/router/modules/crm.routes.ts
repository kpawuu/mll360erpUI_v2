import type { AppRouteModule } from '../types';
import MainLayout from "../../layouts/CRMLayout.vue";
import Dashboard from "../../pages/crm/Dashboard.vue";
import Leads from "../../pages/crm/Leads.vue";
import Opportunities from "../../pages/crm/Opportunities.vue";
import Tasks from "../../pages/crm/Tasks.vue";
import Companies from "../../pages/crm/Companies.vue";
import Contacts from "../../pages/crm/Contacts.vue";

export const crmRoutes: AppRouteModule = [
  {
    path: "/crm",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
        meta: { 
          requiresAuth: true,
          title: 'Dashboard'
        },
      },
      {
        path: "leads",
        name: "leads",
        component: Leads,
        meta: { 
          requiresAuth: true,
          title: 'Leads'
        },
      },
      {
        path: "opportunities",
        name: "opportunities",
        component: Opportunities,
        meta: { 
          requiresAuth: true,
          title: 'Opportunities'
        },
      },
      {
        path: "tasks",
        name: "tasks",
        component: Tasks,
        meta: { 
          requiresAuth: true,
          title: 'Tasks'
        },
      },
      {
        path: "companies",
        name: "companies",
        component: Companies,
        meta: { 
          requiresAuth: true,
          title: 'Companies'
        },
      },
      {
        path: "contacts",
        name: "contacts",
        component: Contacts,
        meta: { 
          requiresAuth: true,
          title: 'Contacts'
        },
      },
    ],
  },
]; 
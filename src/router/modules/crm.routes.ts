import type { RouteRecordRaw } from "vue-router";
import CRMLayout from "../../layouts/CRMLayout.vue";
import Leads from "../../pages/crm/Leads.vue";
import Opportunities from "../../pages/crm/Opportunities.vue";
import Tasks from "../../pages/crm/Tasks.vue";
import Companies from "../../pages/crm/Companies.vue";
import Contacts from "../../pages/crm/Contacts.vue";
import Dashboard from "../../pages/crm/Dashboard.vue";

export const crmRoutes: RouteRecordRaw[] = [
  {
    path: "/crm",
    component: CRMLayout,
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        name: "crm-dashboard",
        component: Dashboard,
        meta: { 
          requiresAuth: true,
          title: 'Dashboard'
        },
      },
      {
        path: "leads",
        name: "crm-leads",
        component: Leads,
        meta: { 
          requiresAuth: true,
          title: 'Leads'
        },
      },
      {
        path: "opportunities",
        name: "crm-opportunities",
        component: Opportunities,
        meta: { 
          requiresAuth: true,
          title: 'Opportunities'
        },
      },
      {
        path: "tasks",
        name: "crm-tasks",
        component: Tasks,
        meta: { 
          requiresAuth: true,
          title: 'Tasks'
        },
      },
      {
        path: "companies",
        name: "crm-companies",
        component: Companies,
        meta: { 
          requiresAuth: true,
          title: 'Companies'
        },
      },
      {
        path: "contacts",
        name: "crm-contacts",
        component: Contacts,
        meta: { 
          requiresAuth: true,
          title: 'Contacts'
        },
      },
    ],
  },
]; 
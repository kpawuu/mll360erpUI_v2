import type { RouteRecordRaw } from "vue-router";
import MainLayout from "../../layouts/CSLayout.vue";
import Dashboard from "../../pages/cs/Dashboard.vue";
import ETACalendar from '../../pages/cs/ETACalendar.vue';
import Files from '../../pages/cs/Files.vue';
import Reports from '../../pages/cs/Reports.vue';
import TruckRequests from '../../pages/cs/TruckRequests.vue';
import Contacts from '../../pages/crm/Contacts.vue';

export const csRoutes: RouteRecordRaw[] = [
  {
    path: "/cs",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "cs-dashboard",
        component: Dashboard,
        meta: { 
          requiresAuth: true,
          title: 'Dashboard'
        },
      },
      {
        path: "eta-calendar",
        name: "cs-eta-calendar",
        component: ETACalendar,
        meta: { 
          requiresAuth: true,
          title: 'ETA - Calendar'
        },
      },
      {
        path: "files",
        name: "cs-files",
        component: Files,
        meta: { 
          requiresAuth: true,
          title: 'Files'
        },
      },
      {
        path: "reports",
        name: "cs-reports",
        component: Reports,
        meta: { 
          requiresAuth: true,
          title: 'Reports'
        },
      },
      {
        path: "truck-requests",
        name: "cs-truck-requests",
        component: TruckRequests,
        meta: { 
          requiresAuth: true,
          title: 'Truck Requests'
        },
      },
      {
        path: "contacts",
        name: "cs-contacts",
        component: Contacts,
        meta: { 
          requiresAuth: true,
          title: 'Contacts'
        },
      },
    ],
  },
]; 
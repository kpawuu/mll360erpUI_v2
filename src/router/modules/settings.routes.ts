import type { RouteRecordRaw } from "vue-router";
import SettingsLayout from "../../layouts/SettingsLayout.vue";
import Entities from "../../pages/settings/Entities.vue";
import EntityGroups from "../../pages/settings/EntityGroups.vue";
import Users from "../../pages/settings/Users.vue";
import Dashboard from "../../pages/settings/Dashboard.vue";
import CompanyDetails from "../../pages/settings/CompanyDetails.vue";

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: "/settings",
    component: SettingsLayout,
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        name: "settings-dashboard",
        component: Dashboard,
        meta: { 
          requiresAuth: true,
          title: 'Settings Dashboard'
        },
      },
      {
        path: "entities",
        name: "settings-entities",
        component: Entities,
        meta: { 
          requiresAuth: true,
          title: 'Entities Management'
        },
      },
      {
        path: "entity-groups",
        name: "settings-entity-groups",
        component: EntityGroups,
        meta: { 
          requiresAuth: true,
          title: 'Entity Groups'
        },
      },
      {
        path: "users",
        name: "settings-users",
        component: Users,
        meta: { 
          requiresAuth: true,
          title: 'Users Management'
        },
      },
      {
        path: "company",
        name: "settings-company",
        component: CompanyDetails,
        meta: { 
          requiresAuth: true,
          title: 'Company Details'
        },
      },
    ],
  },
]; 
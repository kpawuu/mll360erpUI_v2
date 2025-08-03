import type { RouteRecordRaw } from "vue-router";
import SettingsLayout from "../../layouts/SettingsLayout.vue";
import Entities from "../../pages/settings/Entities.vue";
import EntityGroups from "../../pages/settings/EntityGroups.vue";
import Users from "../../pages/settings/Users.vue";
import Dashboard from "../../pages/settings/Dashboard.vue";
import CompanyDetails from "../../pages/settings/CompanyDetails.vue";
import ShipmentTypes from "../../pages/settings/ShipmentTypes.vue";
import Commodities from "../../pages/settings/Commodities.vue";
import PackageTypes from "../../pages/settings/PackageTypes.vue";
import PackageUnits from "../../pages/settings/PackageUnits.vue";
import PackageSizes from "../../pages/settings/PackageSizes.vue";
import Statuses from "../../pages/settings/Statuses.vue";
import Locations from "../../pages/settings/Locations.vue";
import Roles from "../../pages/settings/Roles.vue";
import UserRoleAssignment from "../../pages/settings/UserRoleAssignment.vue";

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
      {
        path: "shipment-types",
        name: "settings-shipment-types",
        component: ShipmentTypes,
        meta: { 
          requiresAuth: true,
          title: 'Shipment Types'
        },
      },
      {
        path: "commodities",
        name: "settings-commodities",
        component: Commodities,
        meta: { 
          requiresAuth: true,
          title: 'Commodities Management'
        },
      },
      {
        path: "package-types",
        name: "settings-package-types",
        component: PackageTypes,
        meta: { 
          requiresAuth: true,
          title: 'Package Types'
        },
      },
      {
        path: "package-units",
        name: "settings-package-units",
        component: PackageUnits,
        meta: { 
          requiresAuth: true,
          title: 'Package Units'
        },
      },
      {
        path: "package-sizes",
        name: "settings-package-sizes",
        component: PackageSizes,
        meta: { 
          requiresAuth: true,
          title: 'Package Sizes'
        },
      },
      {
        path: "statuses",
        name: "settings-statuses",
        component: Statuses,
        meta: { 
          requiresAuth: true,
          title: 'Status Management'
        },
      },
      {
        path: "locations",
        name: "settings-locations",
        component: Locations,
        meta: { 
          requiresAuth: true,
          title: 'Locations Management'
        },
      },
      {
        path: "roles",
        name: "settings-roles",
        component: Roles,
        meta: { 
          requiresAuth: true,
          title: 'Roles Management'
        },
      },
      {
        path: "user-role-assignment",
        name: "settings-user-role-assignment",
        component: UserRoleAssignment,
        meta: { 
          requiresAuth: true,
          title: 'User Role Assignment'
        },
      },
    ],
  },
]; 
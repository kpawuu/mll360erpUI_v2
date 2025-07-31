import type { RouteRecordRaw } from "vue-router";

// Extend the RouteRecordRaw type to include our custom meta fields
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
  meta?: {
    requiresAuth?: boolean;
    title?: string;
  };
  children?: AppRouteRecordRaw[];
}

export type AppRouteModule = AppRouteRecordRaw[]; 
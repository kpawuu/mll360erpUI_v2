import type { RouteRecordRaw } from "vue-router";
import AuthLayout from "../../layouts/AuthLayout.vue";
import Login from "../../pages/auth/Login.vue";
import VerifyOTP from "../../pages/auth/VerifyOTP.vue";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          title: 'Login'
        }
      },
      {
        path: "verifyotp",
        name: "verifyotp",
        component: VerifyOTP,
        meta: {
          title: 'Verify OTP'
        }
      },
    ],
  },
]; 
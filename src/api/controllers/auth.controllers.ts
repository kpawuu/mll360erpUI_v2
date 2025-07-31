import feathersClient from "../feathers.ts";
import type { AuthManagement } from "../models/authManagement.model.ts";
import type {Users} from "../models/users.model.ts";

export const authController = {
    //login
    async login(email: string, password: string){
        return await feathersClient.service('authentication').create({
            strategy: 'local',
            email,
            password
        })
    },

    //register
    async register(user: Users) {
        return await feathersClient.service('users').create(user)
    },

    //authenticationManagement
    async authenticationManagement(params: AuthManagement) {
        return await feathersClient.service('auth-management').create(params)
    },

    //logout
    async logout (){
        return await feathersClient.logout()
    }
}
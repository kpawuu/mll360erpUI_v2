import { feathers } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client"
import auth from "@feathersjs/authentication-client"
import io from "socket.io-client"
const socket = io("/")

const feathersClient = feathers().configure(socketio(socket)).configure(auth({
    header: "Authorization",
    storageKey: "feathers-jwt",
    jwtStrategy: "jwt",
    // path: "/authentication",
    // entity: "user",
    // service: "users",
    storage: window.localStorage
}));

// Function to manually authenticate the client with stored token
export const authenticateFeathersClient = async () => {
    try {
        const token = localStorage.getItem('feathers-jwt');
        if (token) {
            await feathersClient.authenticate({
                strategy: 'jwt',
                accessToken: token
            });
            console.log('Feathers client authenticated successfully');
        }
    } catch (error) {
        console.error('Failed to authenticate Feathers client:', error);
        // Clear invalid token
        localStorage.removeItem('feathers-jwt');
    }
};

export default feathersClient
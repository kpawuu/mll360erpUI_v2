import { feathers } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client"
import auth from "@feathersjs/authentication-client"
import io from "socket.io-client"
const socket = io("/")

const feathersClient = feathers().configure(socketio(socket)).configure(auth({
    header: "Authorization",
    // storageKey: "logi360",
    jwtStrategy: "jwt",
    // path: "/authentication",
    // entity: "user",
    // service: "users",
    storage: window.localStorage
}));

export default feathersClient
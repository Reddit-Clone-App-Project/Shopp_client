import { io } from "socket.io-client";
import { store } from "./redux/store";

const URL = 'http://localhost:3000';

// Getting access token
const getAccessToken = () => {
    const token = store.getState().auth.accessToken;
    return token;
};

// INIT socket
export const socket = io(URL, {
    autoConnect: false, //Don't connect automatically
    auth: (cb) => {
        cb({ token: getAccessToken() });
    }
})
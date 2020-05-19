import io from 'socket.io-client';
import config from "../config/server.json"
import API from "../config/API"
import uuid from "uuid"

const socket = io.connect("http://localhost:" + config.port)

export function sendClientId(updater) {
    socket.on(API.UPDATE_BEERS, (b) => {
        console.log(b)
        updater(b)
    });
    socket.emit(API.UPDATE_BEERS, uuid.v4())
}

export function placeOrder(order, clientDetails) {
    socket.emit(API.PLACE_ORDER, order, clientDetails)
}
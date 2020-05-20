import io from 'socket.io-client';
import config from "../config/server.json"
import API from "../config/API"

const socket = io.connect("http://localhost:" + config.port)

export function sendClientId(updater) {
    socket.on(API.UPDATE_BEERS, (b) => {
        console.log(b)
        updater(b)
    });
    socket.emit(API.UPDATE_BEERS)
}

export function deleteBeer(beer) {
    socket.emit(API.DELETE_BEERS, beer)
}

export function pushBeer(beer) {
    socket.emit(API.PUSH_BEERS, beer)
}

export function executeOrder(order) {
    socket.emit(API.EXEC_ORDER, order)
}

export function subscribeGetOrder(clientDetails, updater) {
    socket.on(API.GET_ORDERS, (orders) => updater(orders))
    socket.emit(API.GET_ORDERS)
}

export function placeOrder(order, clientDetails) {
    // handle empty orders
    socket.emit(API.PLACE_ORDER, order, clientDetails)
}
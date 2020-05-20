const API = require("./client/src/config/API.js")
const db_controller = require("./db_controller")

//setInterval(waver, 200, 4)

module.exports = (client, io) => {
    console.log("connection recived!")

    client.on(API.EXEC_ORDER, (order) => {
        db_controller.executeOrder(order, () => {
            db_controller.getOrders((doc) => {
                io.sockets.emit(API.GET_ORDERS, doc)
            })
        })
    })

    client.on(API.UPDATE_BEERS, () => {
        db_controller.getBeers((doc) => client.emit(API.UPDATE_BEERS, doc))
    })

    client.on(API.PLACE_ORDER, (order, clientDetails) => {
        console.log("Received order: ", order)
        db_controller.placeOrder(order, clientDetails, () => {
            db_controller.getBeers((doc) => {
                io.sockets.emit(API.UPDATE_BEERS, doc)
                db_controller.getOrders((doc) => {
                    io.sockets.emit(API.GET_ORDERS, doc)
                })
            })
        })
    })

    client.on(API.GET_ORDERS, () => {
        db_controller.getOrders(
            (doc) => {
                client.emit(API.GET_ORDERS, doc)
            }
        )
    })

    client.on(API.DELETE_BEERS, (beer) => {
        db_controller.deleteBeer(
            beer,
            () => {
                db_controller.getBeers((doc) => io.sockets.emit(API.UPDATE_BEERS, doc))
            }
        )
    })

    client.on(API.PUSH_BEERS, (beer) => {
        db_controller.updateBeer(
            beer,
            () => {
                db_controller.getBeers((doc) => io.sockets.emit(API.UPDATE_BEERS, doc))
            }
        )
    })
}
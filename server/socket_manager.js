const API = require("../client/src/config/API.js")
const mongo = require('mongodb').MongoClient

var beerData = require("./data.json")
const mongoURL = "mongodb://172.18.0.3:27017"
const mongoAuth = {
    auth: {
        user: "root",
        password: "example"
    }
}
const dbname = "beerSE"

function getBeers() {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("SERVE BEERLIST")

        var collection = mClient.db(dbname).collection("beers")
        var beers = collection.find().toArray([])
        console.log("BEERS: ", beers)
        return beers
    })
}

function placeOrder(order, clientDetails) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("MONGO CONNECTED, PLACE ORDER, ORDER: ", order, "CLIENT DETAILS: ", clientDetails)

        var collection = mClient.db(dbname).collection("orders")
        collection.insertOne({
            clientDetails,
            order
        })
    })
}

var flag = true
function waver(index) {
    if (flag && beerData[index].price.min < beerData[index].price.current) {
        beerData[index].price.current -= 0.1
        flag = true
    } else if (!flag || beerData[index].price.max > beerData[index].price.current) {
        beerData[index].price.current += 0.1
        flag = false
        if (beerData[index].price.max < beerData[index].price.current) {
            flag = true
        }
    }
    console.log(beerData[index])
}

//setInterval(waver, 200, 4)

module.exports = (client) => {
    console.log("connection recived!")
    client.on(API.UPDATE_BEERS, (clientId) => {
        console.log("clientId: " + clientId)
        client.emit(API.UPDATE_BEERS, getBeers())
    })

    client.on(API.PLACE_ORDER, (order, clientDetails) => {
        console.log("Received order: ", order)
        placeOrder(order, clientDetails)
    })
}
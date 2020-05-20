const {ObjectId} = require('mongodb')
const mongo = require("mongodb").MongoClient

const mongoURL = "mongodb://172.18.0.3:27017"
const mongoAuth = {
    auth: {
        user: "root",
        password: "example"
    }
}
const dbname = "beerSE"

function updatePrices(emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("PRICE UPDATE")

        var collection = mClient.db(dbname).collection("beers")
        collection.find().toArray().then((doc) => {
            var totalProduct = doc.reduce((pre, cur) => {
                return pre + cur.quantity
            }, 0)
            var averageProductCount = totalProduct / (doc.length ? 1 : doc.length)
            
            var op = doc.map((beer) => {
                beer.price.current = beer.price.default * (averageProductCount / beer.quantity)
                beer.price.min = beer.price.current < beer.price.min ? beer.price.current : beer.price.min
                beer.price.max = beer.price.current > beer.price.max ? beer.price.current : beer.price.max

                return {
                    updateOne: {
                        filter: { id: beer.id },
                        update: { $set: beer }
                    }
                }
            })

            collection.bulkWrite(op).then(
                emitFunc()
            )
        })
    })
}

function getOrders(emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("GET ORDERS ")

        var collection = mClient.db(dbname).collection("orders")
        collection.find().toArray().then((doc) => {
            console.log("GET ORDERS, Orders: ", doc)
            emitFunc(doc)
        })
    })
}

function updateBeer(beer, emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("PUSH BEERS ", beer)
        
        if (beer._id) {
            delete beer._id
        }

        var query = {
            "id": beer.id
        }

        var collection = mClient.db(dbname).collection("beers")
        collection.updateOne(query, {
            $set: beer
        },  { upsert: true }).then(
            updatePrices(emitFunc())
        )
    })
}

function deleteBeer(beer, emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("DELETE BEERS ", beer)

        var query = {
            "id": beer.id
        }

        var collection = mClient.db(dbname).collection("beers")
        collection.deleteOne(query).then(
            updatePrices(emitFunc())
        )
    })
}

function executeOrder(order, emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("EXECUTE ORDER", order)

        var query = {
            "_id": ObjectId(order._id)
        }

        var collection = mClient.db(dbname).collection("orders")
        collection.deleteOne(query).then(
            emitFunc()
        )
    })
}

function getBeers(emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("SERVE BEERLIST")
        
        var collection = mClient.db(dbname).collection("beers")
        var beers = collection.find().toArray().then((doc) => {
            emitFunc(doc)
        })
    })
}

function placeOrder(order, clientDetails, emitFunc) {
    mongo.connect(mongoURL, mongoAuth, (err, mClient) => {
        console.log("MONGO CONNECTED, PLACE ORDER, ORDER: ", order, "CLIENT DETAILS: ", clientDetails)

        var query = {
            $or: Object.keys(order).map((id) => {return {id: id}})
        }

        console.log(query)

        var ccollection = mClient.db(dbname).collection("orders")
        var bcollection = mClient.db(dbname).collection("beers")
        bcollection.find(query).toArray().then((doc) => {
            console.log(doc)
            var enoughStorage = doc.map((beer) => {
                return beer.quantity >= order[beer.id].quantity ? true : false
            }).reduce((pre, cur) => {
                return pre && cur
            })

            if (enoughStorage) {
                var op = doc.map((beer) => {
                    beer.quantity -= order[beer.id].quantity
                    return {
                        updateOne: {
                            filter: {id: beer.id},
                            update: {$set: beer}
                        }
                    }
                })

                bcollection.bulkWrite(op).then(
                    ccollection.insertOne({
                        clientDetails,
                        order
                    }).then(
                        updatePrices(emitFunc)
                    )
                )
            } else {
                console.log("NOT ENOUGH STORAGE")
            }
        })
    })
}

module.exports = {
    getOrders,
    getBeers,
    placeOrder,
    updateBeer,
    deleteBeer,
    executeOrder
}
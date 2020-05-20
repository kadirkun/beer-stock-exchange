var http = require("http").createServer()
var io = module.exports.io = require("socket.io")(http)
var socket = require("./socket_manager.js")
var config = require("../client/src/config/server.json")

const PORT = config.port

io.on("connection", (soc) => socket(soc, io))
io.listen(PORT)
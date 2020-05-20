const express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = module.exports.io = require("socket.io")(http)
var socket = require("./socket_manager.js")
const path = require('path')
var config = require("./client/src/config/server.json")

const PORT = config.port

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
});

io.on("connection", (soc) => socket(soc, io))
http.listen(PORT)
// Require express, http, and socket.io
var express = require('express'),
	app = require('express')(),
	server = require('http').createServer( app ),
	io = require('socket.io').listen( server );

// Make all files under the "static" directory public
// (Includes client-side HTML, CSS, and JavaScript)
app.use( express.static('static') );

// Listen for incoming connections on port 80
server.listen(80);


io.sockets.on('connection', function (socket) {
// Run when receiving an incoming connection

	socket.on('chat', function (data) {
	// Run when receiving an incoming message on the "chat" event
		// Relay chat message back to all clients on the "chat" event
    	io.sockets.emit('chat', data);
	});

});
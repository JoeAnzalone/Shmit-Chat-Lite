var socket = io.connect('/');

socket.on('chat', function (data) {
// Run when receiving an incoming message on the "chat" event

	// Enclose each message in a list item
	var message = document.createElement('li');
	$(message).addClass('message');
	$(message).append( '<span class="user">' + data.header.user + '</span>' );
	$(message).append( '<span class="body">' + data.body + '</span>' );

	// Add the message to the chat list
	$('.chat ul').append( message );

	// Set up <audio> element for notification sound
	audio = document.createElement('audio');
	var source_mp3 = document.createElement('source');
	var source_ogg = document.createElement('source');

	// Add both MP3 and OGG sources for <audio> element
	audio.appendChild( source_mp3 );
	audio.appendChild( source_ogg );
	source_mp3.src = '/alert.mp3';
	source_ogg.src = '/alert.ogg';

	// Play the audio
	if( audio.play ) {
		audio.play();
	}

});


$(document).ready(function(){
	$('form').submit(function(e){
		// Prevent the default form submission behavior
		e.preventDefault();
		
		var username = $('input.user', this).val();

		// Set the outgoing username as "Anonymous" in case the user leaves it blank
		if (! username) {
			username = 'Anonymous';
		}

		// Send the message body to the server on the "chat" event
		socket.emit('chat', {
			body: $('input.body', this).val(),
			header: {user: username }
		});

		// Clear the input box when sending a message
		$('.body', this).val('');

		return false;
	});
});
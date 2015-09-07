var io = require('socket.io')();

io.on('connection', function(socket){
	console.log(socket.id + ':connected');
	socket.emit('makerdata', '200-100');

	socket.on('disconnect', function(){
		console.log(socket.id + ':disconnected');
	});

	socket.on('makerdata', function(forkid){
		console.log(socket.id + JSON.stringify(forkid));
		//socket.emit('makerdata', forkid);
		socket.emit('makerdata', {hello: 'word'});
	});

	socket.on('setCommand', function(cmddata){
		console.log(socket.id + ':cmddata' + cmddata);
		//socket.emit('makerdata', cmddata);
	})
});

exports.sendDataToHtml = function(dataEvent, data){
	//console.log('Send Data to Html'+'dataEvent'+dataEvent);
	io.sockets.emit(dataEvent, data);
}

exports.listen = function(server){
	return io.listen(server);
};
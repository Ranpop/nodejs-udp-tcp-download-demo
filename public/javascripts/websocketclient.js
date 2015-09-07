//var socket_server = 'http://' + '192.168.1.112' + ':3000';
var socket_server = 'http://' + location.hostname + ':3000';
console.log('server: ' + socket_server);
var socket = io.connect(socket_server);

socket.on('makerdata', function (makerdata) {
	console.log('makerdata: ' + makerdata);
	//document.getElementById("forkpos").text = makerdata;
	document.getElementById("tableid").rows[1].cells[3].innerHTML = makerdata;
});

socket.on('message', function(cmddata){
	console.log('cmddata '+cmddata);
});

socket.on('ImageBase64Data', function(imagedata){
	//console.log("recv imge base64 data");
	var imagesrc = "data:image/jpg;base64," + imagedata;
	loadWarehouse(imagesrc);
});

function setCommand() {
    socket.emit('setCommand', document.getElementById("cmdid").value);
    console.log('setCommand: ' + document.getElementById("cmdid").value);
    document.getElementById("cmdid").value = "";
}

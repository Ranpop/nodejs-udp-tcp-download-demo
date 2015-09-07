var dgram = require('dgram');
var udpserver = dgram.createSocket('udp4');
var parseData = require('../models/parseJsonData.js');

udpserver.on('listening', function () {
    var address = udpserver.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

udpserver.on('message', function (message, remote) {
    //console.log(remote.address + ':' + remote.port +' - ' + message);
    var StringData = message.toString();
    //console.log(StringData);
    var datapayload0 = ''; 
    var dataJsonObj = eval('(' + StringData + ')');

    //parseDataFromJson(dataJsonObj);
    parseData.parseDataFromJson(dataJsonObj);


});

udpserver.bind(3002);
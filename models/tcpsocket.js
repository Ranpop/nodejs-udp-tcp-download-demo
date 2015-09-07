var net = require('net');
var netserver = net.createServer();
netserver.listen(3001, '192.168.1.112');

var mdata = ''; 
console.log('Tcp Server listening on port : ' + 3001 +' host ip:'+ '192.168.1.112');
netserver.on('connection', function(sock) {
    sock.setEncoding();
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sock.write('connection' + 'now is connected');
    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
          mdata += data.toString();
          if (-1 != mdata.indexOf('{') && (-1 != mdata.indexOf('}'))){
              var datapayload0 = ''; 
              datapayload0 += mdata.match(/{[^}{]*?}/g);

              var mdataleft = '';

              var dataJsonObj = eval('(' + datapayload0 + ')');
              for (var key in dataJsonObj) {
                    console.log("key:" + key + " length: "+dataJsonObj.AllLength + " filename: "+dataJsonObj.FileName);
              } 

              if (!dataJsonObj){
                  console.log("some wrong key ")
              }
              else{
                  io_ser.sockets.emit('ImageBase64Data', dataJsonObj.Data);
              }

              
              mdata = mdataleft;
              //console.log('after: '+mdata);
          }
          else{
              //mdata += data.toString();
          }

        //sock.write('Okay!');
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

    sock.on('error', function(data){
      console.log('ERROR: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});


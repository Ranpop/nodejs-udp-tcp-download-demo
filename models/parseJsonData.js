var socketio = require('../models/websocket.js');

exports.parseDataFromJson = function(data){
  var bigOrSmallData = data.BigSmallType;
  var PayLoadData = data.PayLoad;

  if (1 == bigOrSmallData){
     parseAndSendImageData(PayLoadData[0]);
  }   
  else{
      parseAndSendSmallData(PayLoadData);
  }
}

var rcvTypeArray = new Array('Position', 'Rate', 'Orientation', 'LineDistance');
function parseDataType(rcvType, callback){
    callback(rcvTypeArray[rcvType]);
};

function parseAndSendSmallData(dataObj){
    var dataLen = dataObj.length;
    if (0 == dataLen){
        console.log('Small Data is empty!');
        return; 
    }

    for (var i = 0; i < dataLen; i++) {
        parseDataType(dataObj[i].Type, function(type){
            socketio.sendDataToHtml(type, dataObj[i].Data);
        });
    }
};

var ImageBase64Data = '';
var nSn;
var nSsn;
var recvAllLength = 0;
var calcLength = 0;
var recvDataLen = 0;
var iCount = 0;
var recvCount = 0;
function parseAndSendImageData(jsondata){
  //console.log('Recv Data : Sn='+jsondata.nSn+' Ssn='+jsondata.nSsn +' nfed : ' + jsondata.nFed);
  if (0 != jsondata.AllLength && 0 == jsondata.nSsn){
      recvAllLength = jsondata.AllLength;
      nSn = jsondata.nSn;
      nSsn = jsondata.nSsn;
      calcLength += jsondata.SsnLength;
      ImageBase64Data += jsondata.Data;

      return ;
  }

  if ((nSsn+1 == jsondata.nSsn) && (nSn == jsondata.nSn) ){
      nSsn = jsondata.nSsn;
      calcLength += jsondata.SsnLength;
      ImageBase64Data += jsondata.Data;

      //recvCount += 1;

      if (1 == jsondata.nFed){
        if ( (recvAllLength != calcLength) || (recvAllLength != ImageBase64Data.length) ){
          console.log('Image Data Has different length: ' + recvAllLength + ' : ' + calcLength + ' : ' + ImageBase64Data.length);
          recvAllLength = 0;
          calcLength = 0;
          ImageBase64Data = '';
          return;
        }
        console.log('Send Image to brower : ' + iCount);
        iCount += 1;
        socketio.sendDataToHtml('ImageBase64Data', ImageBase64Data);

        recvAllLength = 0;
        calcLength = 0;
        ImageBase64Data = '';
      }

      return;
  }
  else{
    recvAllLength = 0;
    calcLength = 0;
    ImageBase64Data = '';

    console.log('Received Error pakege');
    return ;
  }
}

var imgecount = 0;
function writeImageFile(ImageString){
  if (0 == imgecount){
      var filename = 'test0.jpg';
      imgecount = 1;
  }
  else{
     var filename = 'test1.jpg';
  }

  var imagedata = new Buffer(ImageString, 'base64');
  fs.writeFile(filename, imagedata, function(err){
    if (err){
      console.log('Write Image file failed');
    }
    else{
      console.log('Write Image file Okay');
      imgecount = 1;
    }
    //console.log(mk.vars);
  });
}
var httpclient = require('http');
var fs = require('fs');

exports.GetResource = function(httppath, callback){
    httpclient.get(httppath, function(res){
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    var writestream = fs.createWriteStream('public/images/imageszip/1234.zip');
    writestream.on('close', function() {
            callback(null, res);
    });
    res.pipe(writestream);
    res.on('end', function(data) {
             console.log('Get data Okay!');
             callback(true);
     });

     }).on('error', function(e) {
        console.error('Get Error: '+ e);
    });
}

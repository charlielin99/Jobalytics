var express = require("express");
var app = express();
extractor = require('unfluff');
var fs = require('fs');
data = extractor(fs.readFileSync('https://stackoverflow.com/questions/28908547/node-js-does-not-recognise-the-url-in-the-unfluff-module'));

/*
fs.readFile('test.html', function(err, html){
    var data = extractor(html);
    console.log(data);
});
*/


app.get("/hello", function(req,res){
	res.send(data.text);
});

app.listen(3000, () => {
        console.log("good");
    });





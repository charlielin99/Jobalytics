var express = require("express");
var app = express();
var extractor = require('unfluff');
var fs = require('fs');
var request = require('request');


var url="https://job-openings.monster.ca/Product-Manager-San-Francisco-San-Francisco-CA-Prolific-Interactive/31/d407fb84-a170-41ae-9fc2-e4e69877524b";
var destination = fs.createWriteStream('jobDescription.html');
request (url).pipe(destination);


app.get("/test", function(req,res){
	data = extractor(fs.readFileSync('jobDescription.html'));
	res.send(data.text)
	//console.log(data.text)
});





app.listen(3000, () => {
    console.log("good");
});





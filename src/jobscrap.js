var express = require("express");
var app = express();
var extractor = require('unfluff');
var fs = require('fs');
var request = require('request');


var url="https://www.npmjs.com/package/unfluff"
var destination = fs.createWriteStream('jobDescription.html');
request (url).pipe(destination);


app.get("/", function(req,res){
	data = extractor(fs.readFileSync('jobDescription.html'));
	res.send(data.text)
	console.log(data.text)
});


//LINKEDIN SCRAPPING
/*
// require pupetter
async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ca.linkedin.com/in/charlielin10');
  await page.screenshot({path: 'linkedin.jpg'});
  await browser.close();
}

getPic();
*/



app.listen(3000, () => {
    console.log("good");
});





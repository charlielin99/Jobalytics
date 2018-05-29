const port = 3000;

var express = require('express'),
    helmet = require('helmet'),
    formidable = require('formidable'),
    fs = require('fs'),
    extractor = require('unfluff'),
    PythonShell = require('python-shell'),
    request = require('request'),
    bodyParser = require('body-parser');

var app = express(), form, link;
var firstRun = true;

const resumePdfPath = __dirname + "/data/resumePDF.pdf",
      resumeTxtPath = __dirname + "/data/resume.txt",
      descrPath = __dirname + "/data/jobDescr.txt";
var filePath, resumeJson, resumeText, resumeAuthor, descrText, jobReqs, matchJson;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.set("view engine", "ejs");

////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/jobalytics', (req, res) => {
    form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = resumePdfPath;
    });
    form.on('file', (name, file) => {
        (new PythonShell('src/myResume.py')).on('message', (message) => {
            resumeJson = JSON.parse(message);
            resumeText = resumeJson['text'];
            resumeAuthor = resumeText.split('\n')[1] || resumeText.split('\n')[0] || 'YOU';
            fs.writeFile(resumeTxtPath, resumeText, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Hi, " + resumeAuthor); //use case undetermined
            });
        });
    });
    form.on('end', (name, file) => res.sendFile(__dirname + '/public/main.html'));
});

app.post('/home', (req, res) => {
    firstRun = true;
    res.sendFile(__dirname + '/public/main.html');
});
app.post('/jobmatch', (req, res) => {
    if (firstRun){ //first run, return empty string
        firstRun = false;
        res.render('jobmatch', {returnedmatch: ""});
    } else {
        link = req.body.joblink;
        if (link != ""){
            request(link, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    descrText = extractor(body).text;
                    fs.writeFile(descrPath, descrText, (err) => {
                        if (err){
                            return console.log(err);
                        }
                        console.log("Description parse was successful!");
                    });
                    PythonShell.run('src/job_matching.py', (err, msg) => {
                        res.render('jobmatch', {returnedmatch: msg.join("\n")});
                    });
                } else {
                    console.log(error);
                    console.log("Status code = " + response.statusCode);
                }
            });
        }
    }
});
app.post('/accomplishments', (req, res) => res.sendFile(__dirname + '/public/pros.html'));
app.post('/radials', (req, res) => res.sendFile(__dirname + '/public/radials.html'));
app.post('/improveyourself', (req, res) => res.sendFile(__dirname + '/public/cons.html'));
app.post('/personas', (req, res) => res.sendFile(__dirname + '/public/personas.html'));
app.post('/keywords', (req, res) => res.sendFile(__dirname + '/public/frequent.html'));

////////////////////////////
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
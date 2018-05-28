const port = 3000;

var express = require('express'),
    helmet = require('helmet'),
    formidable = require('formidable'),
    fs = require('fs'),
    extractor = require('unfluff'),
    PythonShell = require('python-shell'),
    request = require('request');

var app = express(),
    pyshell;

const dataPath = __dirname + "/data/resume.txt";
var filePath, resumeJson, resumeText, resumeAuthor, jobReqs, matchJson;

app.use(express.static('FrontEnd'));
app.use(helmet());

////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/hi', (req, res) =>{ //testing
    fs.readFile('test1.txt', function(err, data) {  
        if (err) throw err;
        var returnedVal = data;
        console.log(returnedVal);
        res.render('jobmatch.ejs', {output1: returnedVal});
    });
});

app.post('/jobalytics', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', async (name, file) => {
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', async (name, file) => {
        pyshell = new PythonShell('src/myResume.py')
        pyshell.send('uploads/' + file.name);
        pyshell.on('message', function (message) {
            resumeJson = JSON.parse(message);
            resumeText = resumeJson['text'];
            resumeAuthor = resumeText.split('\n')[1] || resumeText.split('\n')[0] || 'YOU';
            fs.writeFile(dataPath, resumeText, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Resume parse was successful!");
            });
        });
        console.log(resumeAuthor); //use case undetermined
    });
    form.on('end', (name, file) => res.sendFile(__dirname + '/frontend/main.html'));
});

app.post('/home', (req, res) => res.sendFile(__dirname + '/frontend/main.html'));
app.post('/jobmatch', (req, res) => {
    res.sendFile(__dirname + '/frontend/jobmatch.html')
});
app.post('/accomplishments', (req, res) => res.sendFile(__dirname + '/frontend/pros.html'));
app.post('/radials', (req, res) => res.sendFile(__dirname + '/frontend/radials.html'));
app.post('/improveyourself', (req, res) => res.sendFile(__dirname + '/frontend/cons.html'));
app.post('/personas', (req, res) => res.sendFile(__dirname + '/frontend/personas.html'));
app.post('/keywords', (req, res) => res.sendFile(__dirname + '/frontend/frequent.html'));

////////////////////////////
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


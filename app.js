const port = 3000;

var express = require('express'),
    helmet = require('helmet'),
    formidable = require('formidable'),
    PythonShell = require('python-shell');
    // extractor = require('unfluff'),
    // fs = require('fs'),
    // request = require('request');   

var app = express(),
    pyshell;

var resumeJson, resumeText, resumeAuthor, jobReqs, matchJson;

app.use(express.static('FrontEnd'));
app.use(helmet());

// var url="https://job-openings.monster.ca/Product-Manager-San-Francisco-San-Francisco-CA-Prolific-Interactive/31/d407fb84-a170-41ae-9fc2-e4e69877524b";
// var destination = fs.createWriteStream('jobDescription.html');
// var data = extractor(fs.readFileSync('jobDescription.html'));
// request (url).pipe(destination);

////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

// app.get('/scrape', (req, res) => {
//     console.log(data);
//     console.log(data.text + "1");
// 	res.send(data.text);
// });

app.post('/jobalytics', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', async (name, file) => {
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', async (name, file) => {
        // console.log('uploads/' + file.name);
        pyshell = new PythonShell('src/myResume.py')
        pyshell.send('uploads/' + file.name);
        pyshell.on('message', function (message) {
            resumeJson = JSON.parse(message);
            resumeText = resumeJson['text'];
            resumeAuthor = resumeText.split('\n')[1] || resumeText.split('\n')[0] || 'YOU';
        });
        // console.log(resumeText);
        console.log(resumeAuthor);
    });
    form.on('end', (name, file) => res.sendFile(__dirname + '/frontend/main.html'));
});

app.post('/home', (req, res) => res.sendFile(__dirname + '/frontend/main.html'));
app.post('/jobmatch', (req, res) => res.sendFile(__dirname + '/frontend/jobmatch.html'));
app.post('/jobmatch/results', (req, res) => {
    // precondition: resumeText is populated
    // jobReqs = req;
    // pyshell = new PythonShell('src/job_matching.py');
    // pyshell.send(resumeText);
    // pyshell.send(jobReqs);
    // pyshell.on('message', function (message) {
    //     matchJson = JSON.parse(message);
    // });
    // TODO
    // console.log(req)
    console.log(req)
});
app.post('/accomplishments', (req, res) => res.sendFile(__dirname + '/frontend/pros.html'));
app.post('/radials', (req, res) => res.sendFile(__dirname + '/frontend/radials.html'));
app.post('/improveyourself', (req, res) => {
    res.sendFile(__dirname + '/frontend/cons.html');
});
app.post('/personas', (req, res) => res.sendFile(__dirname + '/frontend/personas.html'));
app.post('/keywords', (req, res) => res.sendFile(__dirname + '/frontend/frequent.html'));

////////////////////////////
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// $.post('/jobmatch');
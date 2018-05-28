const port = 3000;

var express = require('express'),
    helmet = require('helmet'),
    formidable = require('formidable'),
    fs = require('fs'),
    extractor = require('unfluff'),
    PythonShell = require('python-shell'),
    request = require('request'),
    bodyParser = require('body-parser');

var app = express(),
    pyshell;

const dataPath = __dirname + "/data/resume.txt";
var filePath, resumeJson, resumeText, resumeAuthor, jobReqs, matchJson;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.set("view engine", "ejs");

var data= ""; //initial value
var x = false; //initial value

////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
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
    form.on('end', (name, file) => res.sendFile(__dirname + '/public/main.html'));
});

app.post('/home', (req, res) => res.sendFile(__dirname + '/public/main.html'));








//JOBMATCH PRONG
app.post('/jobmatch', (req, res) => {

    if (x === false){ //first run, return empty string
        x = true;
        res.render('jobmatch', {returnedmatch: data.text});
    }

    if (x === true){
        var link = req.body.joblink;
        //request(link).pipe(fs.createWriteStream('jobDescr.html'));
        request(link, function(error,response,body){
            if (!error && response.statusCode == 200) {
                data = extractor(body);
                res.render('jobmatch', {returnedmatch: data.text});
            }
        });
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


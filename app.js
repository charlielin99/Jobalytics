const port = 3000;

var express = require('express'),
    helmet = require('helmet'),
    formidable = require('formidable');
    PythonShell = require('python-shell');

var app = express(),
    pyshell;

var resumeJson, resumeText, resumeAuthor;

app.use(express.static('FrontEnd'));
app.use(helmet());

////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.post('/jobalytics', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', async (name, file) => {
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', async (name, file) => {
        console.log('uploads/' + file.name);
        pyshell = new PythonShell('src/myResume.py')
        pyshell.send('uploads/' + file.name);
        pyshell.on('message', function (message) {
            resumeJson = JSON.parse(message);
            resumeText = resumeJson['text'];
            console.log(resumeText);
            resumeAuthor = resumeText.split('\n')[1] || 'YOU';
            console.log(resumeAuthor);
        });
    });
    form.on('end', (name, file) => {
        res.sendFile(__dirname + '/frontend/main.html');
    });
});

////////////////////////////
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
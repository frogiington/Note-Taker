const path = require('path');
const fs = require('node:fs');
const fileStream = require('fs');
const express = require('express')
const app = express()
const port = process.env.PORT || 10000
var jsonTest = JSON.parse(`{"title": "", "text": "t"}`)
const noteArray = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

readJSONFile();

app.get('/notes', (request, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}); 

app.get ('/api/notes', (req,res) => {
    res.status(200).send(noteArray);
})

app.get ('/api.notes/:id', (req,res) =>{
    const notesID = req.params.id;
    res.send(noteArray[notesID]);
   
})
//saves new notes into sidebar. 
app.post('/api/notes', (req,res) => {
var bodytext = req.body;
bodytext.id = noteArray.length+1;
noteArray[noteArray.length] = bodytext;
console.log(bodytext)
saveJSONObject(bodytext);
res.status(200).end()
 
})


app.get('*', (request, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => {
    console.log(`port running at ${port}`);
})

function saveJSONObject(){
    var convertedData = JSON.stringify(noteArray)
    fs.writeFile('db/db.json', convertedData,  (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function readJSONFile(){
    fs.readFile('db/db.json','utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}
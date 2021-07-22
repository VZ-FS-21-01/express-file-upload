const express = require('express')
const formidable = require('formidable');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('uploads'))
// wir können auch mehrere statische Ordner nutzen
// Diese werden von Express wie EIN Ordner verwendet
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let myUploads = []

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/', (req, res, next) => {

    // console.log(req.body)
    const form = formidable({
        // multiples: true,
        uploadDir: './uploads', // Wohin soll die Datei gespeichert werden
        keepExtensions: true // Dateiendungen bleiben vorhanden
    });
    // console.log(form)
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        // console.log(fields.input)
        // console.log(path.basename(files.myFile.path))
        myUploads.push({
            description: fields.input,
            fileName: files.myFile.name,
            url: path.basename(files.myFile.path)
        })
        res.redirect('/')
        // res.json({ fields, files });
    });
    // res.end()
})
app.get('/gallery', (req, res) => {
    res.render('gallery', { data: myUploads })
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
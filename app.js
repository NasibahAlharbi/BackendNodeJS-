const express = require('express')
const app = express()
const fileHandler = require('fs');
app.use(express.json)


app.get('/people', function(req, res) {
    fileHandler.readFile('person.json', (err, data) => {
        if (err) res.send('File not found. First post to create file.');
        else
            res.send(`${data}`);
    })
})
  
// app.put('/people', (req, res) => {
//     fileHandler.writeFile('person.json', `{name: ${req.params.name}}`, (err) => {
//         if (err) throw err;
//         res.send('File updated!');
//         res.send(names)
//     });
// })

    // app.use(function(err, req, res, next) {
    //     console.log(err.stack)
    //     res.status(500).send('Something broke!')
    // })
    

app.post('/people', (req, res) => {
    fileHandler.writeFile('person.json', `{name: ${req.query.name}}`, (err) => {
        if (err) throw err;
        res.send('File created!');
    });
})
app.delete('/people', (req, res) => {
    fileHandler.unlink('person.json', (err) => {
        if (err) res.send('File not found. First post to create file.');
        else
            res.send('File deleted!');
    });
})
app.put('/:name', (req, res) => {
    fileHandler.writeFile('person.json', `{name: ${req.params.name}}`, (err) => {
        if (err) throw err;
        res.send('File updated!');
    });
})

app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
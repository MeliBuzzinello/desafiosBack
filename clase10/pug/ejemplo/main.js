const express = require('express');

const app = express();

app.set('views', './views');
app.set('views engine', 'pug');

app.get('/hello', (req, res)=>{
    res.render('hello.pug',{ mensaje: 'usando pug js en express' });
});

app.listen(8080);
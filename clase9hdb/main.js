const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');

fakeApi = () => [
    { name: 'Katarina', lane: 'midlaner' },
    { name: 'Jayce', lane: 'toplaner' },
    { name: 'Azir', lane: 'midlaner' },
    { name: 'Prueba', lane: 'midlaner' }
]

fakeApi2 = () => [
    { name: 'Katarina', lane: 'midlaner' },
    { name: 'Jayce', lane: 'toplaner' },
    { name: 'Azir', lane: 'midlaner' },
    { name: 'Prueba', lane: 'midlaner' }
]

app.get('/', (req, res) => {
    res.render('main', { suggestedChamps: fakeApi(), listExists: true });
})

app.get('/', (req, res) => {
    res.render('meli', { suggestedChamps: fakeApi2(), listExists: true });
})

app.listen(8080);
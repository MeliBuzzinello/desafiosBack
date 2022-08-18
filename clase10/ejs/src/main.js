const express = require('express');

const app = express();

app.set('views', './views');
app.set('view engine','ejs');

app.get('/', (req, res)=>{
    const pets = [
        { name: 'sami', raza: 'perro', edad: 8 },
        { name: 'tita', raza: 'cobayo', edad: 2 },
        { name: 'emma', raza: 'gato', edad: 5 }

    ];

    const tagline = 'La vida secreta de tu mascota';

    res.render('pages/index',{
        pets,
        tagline
    });
});

app.get('/about', (req, res)=>{
    res.render('pages/about');
});



const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
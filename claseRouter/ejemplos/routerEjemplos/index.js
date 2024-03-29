const express = require('express');
const { Router } = express;

const app = express();

app.use(express.static('public'));

/////////// MASCOTAS
const routerMascotas = new Router();

routerMascotas.use(express.json());
routerMascotas.use(express.urlencoded({ extended: true }));

const mascotas = [];

routerMascotas.get('/mascotas', (req, res)=>{
    res.send(mascotas);
});

routerMascotas.post('/mascotas', (req, res)=>{
    mascotas.push(req.body);
    res.send(mascotas);
});

///////////PERSONAS 
const routerPersonas = new Router();

routerPersonas.use(express.json());
routerPersonas.use(express.urlencoded({ extended: true }));
const personas = [];
routerPersonas.get('/personas', (req, res)=>{
    res.send(personas);
});

routerPersonas.post('/personas', (req, res)=>{
    personas.push(req.body);
    res.send(personas);
});

////////
app.use('/api', routerMascotas);
app.use('/api', routerPersonas);



server = app.listen(8080, () => {
    console.log(`El servidor esta escuchando en el puerto ${server.address().port}`)});
    
server.on('error', error => console.log(`Error en servidor ${error}`));
const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>');
});

let contador = 0;

app.get("/visitas", (req, res) => {
    res.send(`La cantidad de visitas es ${contador++}`);
});

const date = new Date();

app.get("/fyh", (req, res) => {
    res.send({ fyh: date.toLocaleString() });
});

const server = app.listen(8080, ()=>{
    console.log(`servidor http express en el puerto ${server.address().port}`)
});

server.on('error',error => console.log(`error en servidor ${error}`));

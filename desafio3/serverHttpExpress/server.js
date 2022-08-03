const express = require('express');
const Contenedor = require('./contenedor');

const app = express();

const productos = new Contenedor('./producto.txt');

async function mostrarProd(){
    return await productos.getAll();
};

async function prodRandom(){
    let allProducts = await productos.getAll();
    return await allProducts[Math.floor(Math.random() * allProducts.length)];
};

app.get('/', async (req, res)=>{
    res.send('Desafio 3');
});

app.get('/productos', async (req, res)=>{
    res.send(await mostrarProd());
});

app.get('/productoRandom',async(req, res)=>{
    res.send(await prodRandom());
});

const server = app.listen(8080, ()=>{
    console.log('servidor ok')
});

server.on('error', error => console.log(`error en servidor ${error}`));
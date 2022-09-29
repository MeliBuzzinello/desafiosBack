import express from 'express'
const { Router } = express;

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'

import config from './config.js'

import faker from 'faker';

import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const schema = normalizr.schema;

import util from 'util';

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

//--------------------------------------------
// desafio 9 con Faker

const test = new Router();

function productosFaker(){
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.fashion()
    }
};

test.get('/', (req, res)=>{
    console.log('entre')
    const produ = [];
    for (let i = 0; i < 20; i++) {
        produ.push(productosFaker());
    }
    res.json(produ);
});

// normalizr

const idSchema = new schema.Entity('id');

    const textSchema = new schema.Entity('text');

    const messageSchema = new schema.Entity('message', {
        author: idSchema,
        text: [textSchema]
    });

    function print(objeto) {
        util.inspect(objeto, false, 12, true)
    };

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //Implementación productos
    const allProducts = await productosApi.listarAll();
    socket.emit('productos', allProducts);

    socket.on('update', async  (data) => {
        await productosApi.guardar(data);
        const allProducts = await productosApi.listarAll();
        io.sockets.emit('productos', allProducts);
    })

    //Implementacion mensajes
    const allMsj = await mensajesApi.listarAll();
    const normalizrData = normalize(allMsj, messageSchema);
    print(normalizrData)
    socket.emit('mensajes', print(normalizrData));

    socket.on('nuevoMensaje', async  (data) => {
        await mensajesApi.guardar(data);
        const allMsj = await mensajesApi.listarAll();
        io.sockets.emit('mensajes', allMsj);
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos-test', test)

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
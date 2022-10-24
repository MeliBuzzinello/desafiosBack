import express from 'express';

import cookieParser from 'cookie-parser';
import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import infoRouter from './routers/api/info.js'
import productosApiRouter from './routers/api/productos.js'
import randomRouter from './routers/api/random.js'

import authWebRouter from './routers/web/auth.js'
import productosWebRouter from './routers/web/home.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'


//--------------------------------------------
// instancio servidor, socket 

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

// io.on('connection', async socket => {
//   const productos = await productosApi.listarAll();
//   io.sockets.emit("productos", productos);
//   const msgData = await mensajesApi.getAll();
//   const mensajes = processMsgData(msgData);
//   io.sockets.emit("mensajes", mensajes);

//   console.log("Nueva conexion");
//   socket.on("newProduct", async (data) => {
//     await productosApi.guardar(data);
//     const productos = await productosApi.listarAll();
//     io.sockets.emit("productos", productos);
//   });
//   socket.on("newMessage", async (data) => {
//     await mensajesApi.createNew(data);
//     const msgData = await mensajesApi.getAll();
//     const mensajes = processMsgData(msgData);
//     io.sockets.emit("mensajes", mensajes);
//   });
// });

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))

app.set('view engine', 'ejs');

//--------------------------------------------
// rutas del servidor

app.use('/info', infoRouter)
app.use('/api/randoms',randomRouter)
app.use('/', authWebRouter)
app.use('/', productosWebRouter)
app.use('/api-productos-test', productosApiRouter)
app.use('/ws-productos', addProductosHandlers)
app.use('/ws-mensajes', addMensajesHandlers)

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
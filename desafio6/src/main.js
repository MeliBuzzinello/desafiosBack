const express = require('express');
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IoServer } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

//--------------------------------------------
// instancio servidor, socket y api

const contenedorMemoria = new ContenedorMemoria();
const contenedorArchivo = new ContenedorArchivo( './mensajes.txt');

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

//--------------------------------------------
// configuro el socket

io.on('connection', socket => {
    //Este evento carga el historial de mensajes cuando un nuevo cliente se conecta
    //socket.emit('new-product', data);

    // escucha cliente alta de productos
    socket.on('new-product', async  (data) => {
        await contenedorMemoria.guardar(data);
        const allProducts = contenedorMemoria.listarAll();
    // le responde a todos los usuarios conectados a New items
        io.sockets.emit('new-product', allProducts);
  });
});



//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
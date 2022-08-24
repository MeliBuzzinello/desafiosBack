const express = require('express');
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IoServer } = require('socket.io')

// const ContenedorMemoria = require('../contenedores/ContenedorMemoria')
// const ContenedorArchivos = require('../contenedores/ContenedorArchivos')

//--------------------------------------------
// instancio servidor, socket y api

// const contenedorMemoria = new ContenedorMemoria();
// const contenedorArchivos = new ContenedorArchivos('./producto.txt');

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

//--------------------------------------------

app.engine(
    'hbs', 
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);

app.set('view engine', 'hbs'); //hbs: extensions
app.set('views', './views');


//--------------------------------------------
// configuro el socket

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    //Este evento carga el historial de mensajes cuando un nuevo cliente se conecta
    // socket.emit('new-product', productos);

    socket.on('new-product', data => {
        // productos.push(data);
        console.log(data)
        //Este evento envía un nuevo mensaje a todos los clientes que estén conectado en ese momento
        io.sockets.emit('new-product', data);
    });
});

// app.post('/', (req, res) => {
//     contenedorArchivos.guardar(req.body)
//     res.send('contenedorArchivos');
// });

// app.get('/', (req, res)=>{
//     res.render('tabla-productos',{ contenedorArchivos, listExists: true });
// });



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
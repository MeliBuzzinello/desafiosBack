const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});


const messages = [
    { author: "Alejandro", text: "hola! que tal?" },
    { author: "Jean", text: "Muy bien! y tu?" },
    { author: "Facundo", text: "Genial" }
];

io.on('connection', socket => {
    console.log('nuevo cliente conectado');
    socket.emit('messages', messages); // este evento carga el historial de msj cuando un nuevo cl se conecta
    
    socket.on('new-message', data =>{
        messages.push(data);
        //este evento manda un mensaje a todos los cl conectados
        io.sockets.emit('messages', messages);
    });
});


httpServer.listen(8080, () => console.log('server is running'));
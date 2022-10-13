import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApiRouter from './routers/api/productos.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
  const productos = await productosApi.listarAll();
  io.sockets.emit("productos", productos);
  const msgData = await mensajesApi.getAll();
  const mensajes = processMsgData(msgData);
  io.sockets.emit("mensajes", mensajes);

  console.log("Nueva conexion");
  socket.on("newProduct", async (data) => {
    await productosApi.guardar(data);
    const productos = await productosApi.listarAll();
    io.sockets.emit("productos", productos);
  });
  socket.on("newMessage", async (data) => {
    await mensajesApi.createNew(data);
    const msgData = await mensajesApi.getAll();
    const mensajes = processMsgData(msgData);
    io.sockets.emit("mensajes", mensajes);
  });
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set("views", "./views");
app.set('view engine', 'ejs');

const advancedOpcions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(session({
    store: MongoStore.create({mongoUrl: 'mongodb+srv://melisabuzzinello:rHoBiwDQak6rrRlq@cluster0.8wjkcvd.mongodb.net/sesiones?retryWrites=true&w=majority',
    mongoOptions: advancedOpcions
}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}))
//--------------------------------------------
// MIDDLEWARES de login
const isLoggedIn = (req, res, next) => {
    if (!req.session.nombre) return res.redirect("/login");
    next();
  };

const isLoggedOut = (req, res, next) => {
    if (req.session.nombre) return res.redirect("/");
    next();
  };


//--------------------------------------------
// rutas del servidor API REST
app.get("/login", isLoggedOut, (req, res) => {
    res.render("login");
  });
  
  app.post("/login", isLoggedOut, (req, res) => {
    if (req.body.nombre) {
      req.session.nombre = req.body.nombre;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
  
  app.get("/", isLoggedIn, (req, res) => {
    res.render("index", { nombre: req.session.nombre });
  });
  
  app.get("/api/productos-test", (req, res) => {
    const fakeProds = fakeProdApi.generateMany(5);
    res.send(fakeProds);
  });


  app.get("/logout", isLoggedIn, (req, res) => {
    // cargo temporalmente el nombre de la sesion
    const nombre = req.session.nombre;
    req.session.destroy((err) => {
      if (err) {
        res.json({ status: "Logout Error", body: err });
      } else {
        // uso el nombre de la sesion
        res.render("logout", { nombre: nombre });
      }
    });
  });
  

//--------------------------------------------
// rutas del servidor web


//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
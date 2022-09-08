const express = require('express')
const { Router } = express
const ProductosApi = require('./api/productos.js')

// router de productos

const productosApi = new ProductosApi()

const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

productosRouter.use(express.static( __dirname + '/public'));

//rutas usando productosRouter

productosRouter.get('/productos', (req , res)=>{
    productosApi.listarAll(); 
    res.send(productosApi);
});

productosRouter.get('/productos/:pos', (req , res)=>{
    const { pos } = req.params;
    res.send(productosApi.listar(pos));
});

productosRouter.post('/productos', (req , res)=>{
    productosApi.guardar(req.body)
    res.send(productosApi);
});

productosRouter.put('/productos/:pos', (req , res)=>{
    const { pos } = req.params;
    res.send(productosApi.actualizar(req.body, pos));
});

productosRouter.delete('/productos/:pos', (req , res)=>{
    const { pos } = req.params;
    const prod = JSON.stringify(productosApi.borrar(pos));
    res.send(`Producto eliminado. Lista de productos actualizada ${prod}`);
});


// servidor

const app = express()
app.use(express.static('public'))
app.use('/api', productosRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
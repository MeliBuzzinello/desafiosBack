import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    res.render( 'pages/home', { nombre: req.session.nombre } )
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    
})

export default productosWebRouter
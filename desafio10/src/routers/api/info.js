import { Router } from 'express'

const infoRouter = new Router()


infoRouter.get('/', (req, res) => { 
    res.send( 
        `Argumentos de entrada: ${process.argv},
         Nombre de la plataforma(so): ${process.platform},
         Version de Node: ${process.version},
         Memoria total reservada(rss): ${process.memoryUsage()},
         Path de ejecucion: ${process.StartInfo},
         Process Id: ${process.pid},
         Carpeta del proyecto: ${process.cwd()}`
     )
})

export default infoRouter
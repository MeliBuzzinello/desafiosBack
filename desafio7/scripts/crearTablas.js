import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

(async ()=> {
try {
    const mariaDbClient = knex(config.mariaDb)

    //Implementar creación de tabla

    await mariaDbClient.schema.createTable('productos', table =>{
        table.increments('id')
        table.string('name')
        table.float('price')
        table.string('foto')
    })
    console.log('tabla productos en mariaDb creada con éxito')
} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}})

//------------------------------------------
// mensajes en SQLite3
(async ()=> {
try {
    const sqliteClient = knex(config.sqlite3)

    //Implementar creación de tabla

    await sqliteClient.schema.createTable('mensajes', table =>{
        table.string('mensaje')
        table.string('email')
    })

    console.log('tabla mensajes en sqlite3 creada con éxito')
} catch (error) {
    console.log('error al crear tabla mensajes en sqlite3')
}})
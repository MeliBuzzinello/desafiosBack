import normalizr from 'normalizr';
const normalize = normalizr.normalize;

import ContenedorArchivo from './contenedores/ContenedorArchivo.js';
import config from './config.js';

import util from 'util';

const mensajesApi = new ContenedorArchivo(config.fileSystem, 'mensajes')

const schema = normalizr.schema;

const allMsj = await mensajesApi.listarAll();

// const ejemplo = [{
//     id: '1',
//     nombre: 'nombre del usuario',
//     apellido: 'apellido del usuario',
//     edad: 'edad del usuario',
//     alias: 'alias del usuario',
//     avatar: 'url avatar (foto, logo) del usuario', PUNTO 33pun
//             text: 'mensaje del usuario'
// },
// {
//     id: '2',
//     nombre: 'nombre del usuario',
//     apellido: 'apellido del usuario',
//     edad: 'edad del usuario',
//     alias: 'alias del usuario',
//     avatar: 'url avatar (foto, logo) del usuario',
//     text: 'mensaje del usuario'
// }, {
//     id: '3',
//     nombre: 'nombre del usuario',
//     apellido: 'apellido del usuario',
//     edad: 'edad del usuario',
//     alias: 'alias del usuario',
//     avatar: 'url avatar (foto, logo) del usuario',
//     text: 'mensaje del usuario'
// }]

function normal(allMsj) {
    const idSchema = new schema.Entity('id');

    const textSchema = new schema.Entity('text');

    const messageSchema = new schema.Entity('message', {
        author: idSchema,
        text: [textSchema]
    });

    function print(objeto) {
        console.log(util.inspect(objeto, false, 12, true))
    };

    const normalizrData = normalize(allMsj, messageSchema);
    print(normalizrData)
}

export default normal();
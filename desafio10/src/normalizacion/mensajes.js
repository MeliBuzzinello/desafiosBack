import normalizr from 'normalizr';
import config from '../config.js';

const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

import util from 'util';

import ContenedorArchivo from '../contenedores/ContenedorArchivo.js';
const mensajesApi = new ContenedorArchivo(config.fileSystem, 'mensajes');
const allMsj = await mensajesApi.listarAll();

// Definimos un esquema de autor
const autor = new schema.Entity('autor');

// Definimos un esquema de mensaje
const mensaje = new schema.Entity('mensaje', {
    mensaje: autor
});

// Definimos un esquema de posts
const posts = new schema.Entity('posts', {
    posts: [mensaje]
});

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
};

const normalizarMensajes = normalize(allMsj, posts);
print(normalizarMensajes);

export { normalizarMensajes }
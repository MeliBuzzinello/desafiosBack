const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listarAll() {
        try {
            const mensajes = await fs.readFile(this.ruta , 'utf-8');
            return JSON.parse(mensajes);
        } catch (error) {
            return [];
        }
    }

    async guardar(msj) {
        try {
            const mensajes = await fs.readFile(this.ruta , 'utf-8');
            const mensajesObj = [JSON.parse(mensajes)]; 
            mensajesObj.push(msj);
            await fs.writeFile(this.ruta , JSON.stringify(mensajesObj, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ContenedorArchivo
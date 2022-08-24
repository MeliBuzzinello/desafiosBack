const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        const products = await this.getAll();
        const productById = products.find(p => p.id == id);
        return productById;
    }

    async listarAll() {
        try {
            const productos = await fs.readFile(this.ruta , 'utf-8');
            return JSON.parse(productos);
        } catch (error) {
            return [];
        }
    }

    async guardar(obj) {
        try {
            const products = await fs.readFile(this.ruta , 'utf-8');
            if(products  === ''){
                const primerProducto = [{
                    title: obj.title,
                    price: obj.price,
                    thumbnail: obj.thumbnail,
                    id: 1
                }]
                await fs.writeFile(this.ruta , JSON.stringify(primerProducto, null, 2));
                return 1;
            } else {
                    const productObj = JSON.parse(products); 
                    let idMax = productObj[productObj.length -1].id +1;
                    const produId = {
                       title: obj.title,
                       price: obj.price,
                       thumbnail: obj.thumbnail,
                       id: idMax
                    }
                    productObj.push(produId);
                    await fs.writeFile(this.ruta , JSON.stringify(productObj, null, 2));
                    return produId.id;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async actualizar(elem, id) {
        const products = await fs.readFile(this.ruta , 'utf-8');
        products[parseInt(id) -1 ] = {id:id, ...prod};
        return await fs.writeFile(this.ruta , JSON.stringify(products, null, 2));
    }

    async borrar(id) {
        const products = await this.getAll()
        if(products === ''){
            console.log('No hay productos')
        }
        const product = products.find(e => e.id == id)
        const newProducts = products.filter(e => e != product)
        try {
            await fs.writeFile(this.route, JSON.stringify(newProducts, null, 2))
        } catch (error) {
            console.error(error)
        }
        
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.route, "")
        } catch (error) {
            console.error(error)
        }
    }
        
}

module.exports = ContenedorArchivo;
class ContenedorMemoria {
    constructor() {
        this.productos = [];
      }

    listar(id) {
        const products =  this.listarAll();
        const productById = products.find(p => p.id == id);
            if(!productById){
                return `{'error': 'producto no encontrado'}`;
            }
            return productById;
    }

    listarAll() {
        try {
            if(this.productos.length === 0){
               return `{'error': 'producto no encontrado'}`;
            }
            return this.productos;
        } catch (error) {
            console.error(error);
        }
    }

    guardar(prod) {
        // const prodId = {id:this.productos.length + 1, ...prod};
        this.productos.push(prod);
        return this.productos;
    }

    actualizar(prod, id) {
        this.productos[parseInt(id) -1 ] = {id:id, ...prod};
        return this.productos;
    }

    borrar(id) {
        const products = this.listarAll()
        if(products === ''){
            console.log('No hay productos')
        }
        const product = products.find(e => e.id == id)
        const newProducts = products.filter(e => e != product)
        this.productos = newProducts;
        try {
             return this.productos;
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = ContenedorMemoria;
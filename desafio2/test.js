const Contenedor = require('./ejercicio');

const prod1 = {
    title: 'arroz',
    price: 56,
    thumbnail: 'url'
}
const prod2 = {
    title: 'fideos',
    price: 78,
    thumbnail: 'url'
}
const prod3 = {
    title: 'harina',
    price: 34,
    thumbnail: 'url'
}

async function main() {
    const product = new Contenedor('./producto.txt');

    let idProduct = await product.save(prod1);
    console.log(`El id del producto agregado es: ${idProduct}`);

    let allProducts = await product.getAll();
    console.log(`Los productos son: ${allProducts}`);

    const idToSearch = 1;
    let productById = await product.getById(idToSearch);
    console.log(`Muestro el producto con id ${idToSearch}:  Producto: ${productById}`);

    const clearId = 3
    let clearById = await product.deleteById(clearId);
    console.log('Elemento Id: ${clearId} eliminado');

    let clearAll = await product.deleteAll();
    console.log('Elementos eliminados con exito.')
}

main();
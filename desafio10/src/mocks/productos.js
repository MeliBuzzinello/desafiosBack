import faker from 'faker'
faker.locale = 'es'

function productosFaker(){
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.fashion()
    }
};

function createNFakeProducts(n) {
    const produ = [];
    for (let i = 0; i < n; i++) {
        produ.push(productosFaker());
    }
    return produ;
}

// function createFakeProduct(id) {
    
// }

export default createNFakeProducts;
import mongoose from "mongoose";

const URL = 'mongodb+srv://melisabuzzinello:rHoBiwDQak6rrRlq@cluster0.8wjkcvd.mongodb.net/ecommerce2?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: { type: String, unique: true}
});

try {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Base de datos conectada')

    const users = await user
}
catch (error) {
    console.log(`Error de conexión a la base de datos ${error}`)
}

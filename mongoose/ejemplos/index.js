import mongoose from "mongoose";
import * as model from "./models/usuario.js";  // o import { users } from "./models/usuarios";

async function CRUD() {
    try {
        // conexion a la base de datos
        const URL = 'mongodb://localhost:27017/ecommerce32065';
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('base de datos conectada')
    } catch (error) {
        
    }

} 
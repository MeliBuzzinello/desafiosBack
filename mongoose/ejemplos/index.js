import mongoose from "mongoose";
import * as model from "./models/usuario.js";  // o import { user } from "./models/usuarios";


CRUD()

async function CRUD() {
    try {
        // conexion a la base de datos
        const URL = 'mongodb://localhost:27017/ecommerce32065';
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('base de datos conectada')

        // Create
        const user = { 
            nombre: 'Melisa', 
            apellido: 'buzzinello', 
            email: 'mb@gmail.com', 
            usuario: 'ml',
            password: 1234
        };

        const userSaveModel = new model.user(user);
        // const savedUser = await userSaveModel.save();

        // console.log(savedUser)

        //Read
        // const usersRead = await model.user.find({nombre: 'Melisa'});
        // console.log(usersRead);

        //Update
        // const updateUser = await model.user.updateOne({nombre: "Melisa"},{$set:{password:5555}});
        // console.log(updateUser)

        //Delete 
        const deleteUser = await model.user.deleteOne({ nombre: 'Melisa' });        


    } catch (error) {
        console.log(error)
    }

} 
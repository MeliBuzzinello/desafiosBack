import { options } from "./options/mysqlDB.js";
import knex from "knex";

const knexConnection = knex(options);

// knexConnection.from('cars').select('*')
knexConnection.from('cars').select('*')
   .where('price', '>', '5000')
   .andWhere('name', '=', 'Audi')
   .orderBy('price', 'desc')
   .then((rows)=> {
       //for of permite codigo asincrono, en cambio foreach no!
       for(let row of rows) { 
        // row[''] se usa para evaluar si existe el atributo en el objeto
        // row.id se usa si sabes q existe el atributo id
            console.log(`${row['id']} ${row['name']} ${row['price']}`)
       }
   })
   .catch((err) => { console.log(err); throw err })
   .finally(() => {
     knexConnection.destroy()
   });
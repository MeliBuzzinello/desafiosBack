import { options } from "./options/mysqlDB.js";
import knex from "knex";

const knexConnection = knex(options);

knexConnection('cars').where('id', 5)
   .del()
   .then(() => console.log('registro eliminado'))
   .catch((err) => { console.log(err); throw err })
   .finally(() => {
     knexConnection.destroy()
   });
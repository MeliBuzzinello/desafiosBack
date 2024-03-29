import knex from "knex";
import config from "../src/config.js";

//------------------------------------------
// productos en MariaDb

(async () => {
    try {
      const sqliteClient = knex(config.sqlite3);

      await sqliteClient.schema.dropTableIfExists("mensajes");
      //Implementar creación de tabla

      await sqliteClient.schema.createTable("mensajes", (table) => {
        table.string("autor");
        table.integer("fyh");
        table.string("texto")
      });

      console.log("tabla mensajes en sqlite3 creada con éxito");
    } catch (error) {
      console.log("error al crear tabla mensajes en sqlite3");
    } 
  }
)

(async () => {
  try {
    const mariaDbClient = knex(config.mariaDb);
    //borramos la tabla si existe
    await mariaDbClient.schema.dropTableIfExists("productos");

    //Implementar creación de tabla

    await mariaDbClient.schema.createTable("productos", (table) => {
      table.increments("id");
      table.string("title");
      table.float("price");
      table.string("thumbnail");
    });
    console.log("tabla productos en mariaDb creada con éxito");
  } catch (error) {
    console.log("error al crear tabla productos en mariaDb");
    console.log(error);
  } 
})
 //------------------------------------------
  // mensajes en SQLite3


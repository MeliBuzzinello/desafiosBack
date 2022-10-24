import dotenv from 'dotenv';
dotenv.config()

import minimist from 'minimist'

const parseArgs = minimist;

const args = parseArgs(process.argv.slice(2));

const option = { 
    default: { puerto: 8080 },
    alias: { p: 'puerto' }
 }

 
export default {
    PORT: process.env.PUERTO,
    mongoLocal: {
        cnxStr: 'mongodb://localhost:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    mongoRemote: {
        
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_HOST
        }
    },
    fileSystem: {
        path: './DB'
    }
}
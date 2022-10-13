export default {
    PORT: process.env.PORT || 8080,
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
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'coderhouse',
            port: 3306
        }
    },
    fileSystem: {
        path: './DB'
    }
}